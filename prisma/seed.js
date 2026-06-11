import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient, Prisma } from "../lib/generated/prisma/client.ts";
import { buildSeedExcursions, buildSeedTours } from "../lib/seed-catalog.ts";
import { routing } from "../i18n/routing.ts";

const connectionString =
  process.env.DIRECT_DATABASE_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL or DIRECT_DATABASE_URL is required.");
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

function tourTranslationData(locale, content) {
  return {
    locale,
    title: content.title,
    routeLabel: content.routeLabel,
    subtitle: content.subtitle ?? null,
    outline: content.outline,
    sections: content.sections,
    includes: content.includes,
    highlights:
      content.highlights === undefined ? Prisma.DbNull : content.highlights,
    clothingNote: content.clothingNote ?? null,
  };
}

function excursionTranslationData(locale, content) {
  return {
    locale,
    title: content.title,
    highlights: content.highlights,
    includes: content.includes,
    optionalNote: content.optionalNote ?? null,
  };
}

async function seedTours() {
  const tours = buildSeedTours();

  for (const tour of tours) {
    await prisma.$transaction(async (tx) => {
      await tx.tour.upsert({
        where: { id: tour.id },
        create: {
          id: tour.id,
          destination: tour.destination,
          durationKey: tour.meta.durationKey,
          priceFrom: tour.meta.priceFrom,
          minPeople: tour.meta.minPeople,
          startTime: tour.meta.startTime ?? null,
          popular: tour.meta.popular ?? false,
        },
        update: {
          destination: tour.destination,
          durationKey: tour.meta.durationKey,
          priceFrom: tour.meta.priceFrom,
          minPeople: tour.meta.minPeople,
          startTime: tour.meta.startTime ?? null,
          popular: tour.meta.popular ?? false,
        },
      });

      for (const locale of routing.locales) {
        const data = tourTranslationData(locale, tour.content[locale]);
        await tx.tourTranslation.upsert({
          where: { tourId_locale: { tourId: tour.id, locale } },
          create: { tourId: tour.id, ...data },
          update: data,
        });
      }
    });
  }

  console.log(`Seeded ${tours.length} tours.`);
}

async function seedExcursions() {
  const excursions = buildSeedExcursions();

  for (const excursion of excursions) {
    await prisma.$transaction(async (tx) => {
      await tx.excursion.upsert({
        where: { id: excursion.id },
        create: {
          id: excursion.id,
          durationKey: excursion.meta.durationKey,
          priceFrom: excursion.meta.priceFrom,
          grades: excursion.meta.grades,
          popular: excursion.meta.popular ?? false,
        },
        update: {
          durationKey: excursion.meta.durationKey,
          priceFrom: excursion.meta.priceFrom,
          grades: excursion.meta.grades,
          popular: excursion.meta.popular ?? false,
        },
      });

      for (const locale of routing.locales) {
        const data = excursionTranslationData(locale, excursion.content[locale]);
        await tx.excursionTranslation.upsert({
          where: { excursionId_locale: { excursionId: excursion.id, locale } },
          create: { excursionId: excursion.id, ...data },
          update: data,
        });
      }
    });
  }

  console.log(`Seeded ${excursions.length} excursions.`);
}

async function main() {
  await seedTours();
  await seedExcursions();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
