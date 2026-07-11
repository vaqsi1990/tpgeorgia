import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../lib/generated/prisma/client.ts";
import { buildSeedExcursions } from "../lib/seed-catalog.ts";
import { routing } from "../i18n/routing.ts";

const connectionString =
  process.env.DIRECT_DATABASE_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL or DIRECT_DATABASE_URL is required.");
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

function excursionTranslationData(locale, content) {
  return {
    locale,
    title: content.title,
    highlights: content.highlights,
    includes: content.includes,
    optionalNote: content.optionalNote ?? null,
  };
}

async function seedExcursions() {
  const excursions = buildSeedExcursions();

  for (const excursion of excursions) {
    await prisma.$transaction(async (tx) => {
      await tx.excursion.upsert({
        where: { id: excursion.id },
        create: {
          id: excursion.id,
          destinations: excursion.destinations ?? [],
          durationKey: excursion.meta.durationKey,
          priceFrom: excursion.meta.priceFrom,
          grades: excursion.meta.grades,
          popular: excursion.meta.popular ?? false,
        },
        update: {
          destinations: excursion.destinations ?? [],
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
