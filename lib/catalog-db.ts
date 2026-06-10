import type { ExcursionContent } from "@/data/excursion-content";
import type { TourContent, TourSection } from "@/data/tour-content/types";
import type { TourDestination } from "@/data/tour-destinations";
import { routing, type AppLocale } from "@/i18n/routing";
import type {
  StoredExcursionInput,
  StoredExcursionRecord,
  StoredTourInput,
  StoredTourRecord,
} from "@/lib/admin-types";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma/client";
import type { Locale } from "@/lib/generated/prisma/enums";
import { resolveUniqueSlug, slugFromTitles } from "@/lib/slug";

function titlesFromContent(
  content: Record<AppLocale, { title: string }>,
): string[] {
  return routing.locales.map((locale) => content[locale]?.title?.trim() ?? "").filter(Boolean);
}

async function resolveTourId(input: StoredTourInput): Promise<string> {
  if (input.id?.trim()) return input.id.trim();

  const base = slugFromTitles(titlesFromContent(input.content));
  if (!base) {
    throw new Error("Tour title is required to generate an ID.");
  }

  return resolveUniqueSlug(base, async (slug) => {
    const existing = await prisma.tour.findUnique({ where: { id: slug } });
    return existing !== null;
  });
}

async function resolveExcursionId(input: StoredExcursionInput): Promise<string> {
  if (input.id?.trim()) return input.id.trim();

  const base = slugFromTitles(titlesFromContent(input.content));
  if (!base) {
    throw new Error("Excursion title is required to generate an ID.");
  }

  return resolveUniqueSlug(base, async (slug) => {
    const existing = await prisma.excursion.findUnique({ where: { id: slug } });
    return existing !== null;
  });
}

function toTourContent(translation: {
  title: string;
  routeLabel: string;
  subtitle: string | null;
  outline: unknown;
  sections: unknown;
  includes: unknown;
  highlights: unknown;
  clothingNote: string | null;
}): TourContent {
  return {
    title: translation.title,
    routeLabel: translation.routeLabel,
    subtitle: translation.subtitle ?? undefined,
    outline: translation.outline as string[],
    sections: translation.sections as TourSection[],
    includes: translation.includes as string[],
    highlights: (translation.highlights as string[] | null) ?? undefined,
    clothingNote: translation.clothingNote ?? undefined,
  };
}

function toExcursionContent(translation: {
  title: string;
  highlights: unknown;
  includes: unknown;
  optionalNote: string | null;
}): ExcursionContent {
  return {
    title: translation.title,
    highlights: translation.highlights as string[],
    includes: translation.includes as string[],
    optionalNote: translation.optionalNote ?? undefined,
  };
}

function emptyTourContent(): TourContent {
  return {
    title: "",
    routeLabel: "",
    outline: [],
    sections: [],
    includes: [],
  };
}

function emptyExcursionContent(): ExcursionContent {
  return {
    title: "",
    highlights: [],
    includes: [],
  };
}

function buildTourContentMap(
  translations: Array<{
    locale: Locale;
    title: string;
    routeLabel: string;
    subtitle: string | null;
    outline: unknown;
    sections: unknown;
    includes: unknown;
    highlights: unknown;
    clothingNote: string | null;
  }>,
): Record<AppLocale, TourContent> {
  const content = {
    ka: emptyTourContent(),
    en: emptyTourContent(),
    ru: emptyTourContent(),
    zh: emptyTourContent(),
  } satisfies Record<AppLocale, TourContent>;

  for (const translation of translations) {
    content[translation.locale as AppLocale] = toTourContent(translation);
  }

  return content;
}

function buildExcursionContentMap(
  translations: Array<{
    locale: Locale;
    title: string;
    highlights: unknown;
    includes: unknown;
    optionalNote: string | null;
  }>,
): Record<AppLocale, ExcursionContent> {
  const content = {
    ka: emptyExcursionContent(),
    en: emptyExcursionContent(),
    ru: emptyExcursionContent(),
    zh: emptyExcursionContent(),
  } satisfies Record<AppLocale, ExcursionContent>;

  for (const translation of translations) {
    content[translation.locale as AppLocale] = toExcursionContent(translation);
  }

  return content;
}

function tourTranslationData(locale: AppLocale, content: TourContent) {
  return {
    locale: locale as Locale,
    title: content.title,
    routeLabel: content.routeLabel,
    subtitle: content.subtitle ?? null,
    outline: content.outline,
    sections: content.sections,
    includes: content.includes,
    highlights:
      content.highlights === undefined
        ? Prisma.DbNull
        : content.highlights,
    clothingNote: content.clothingNote ?? null,
  };
}

function excursionTranslationData(locale: AppLocale, content: ExcursionContent) {
  return {
    locale: locale as Locale,
    title: content.title,
    highlights: content.highlights,
    includes: content.includes,
    optionalNote: content.optionalNote ?? null,
  };
}

export async function listTours(): Promise<StoredTourRecord[]> {
  const tours = await prisma.tour.findMany({
    include: { translations: true },
    orderBy: { createdAt: "desc" },
  });

  return tours.map((tour) => ({
    id: tour.id,
    destination: tour.destination as TourDestination | null,
    meta: {
      durationKey: tour.durationKey as StoredTourRecord["meta"]["durationKey"],
      priceFrom: tour.priceFrom,
      minPeople: tour.minPeople,
      startTime: tour.startTime ?? undefined,
      popular: tour.popular,
    },
    content: buildTourContentMap(tour.translations),
    createdAt: tour.createdAt.toISOString(),
  }));
}

export async function getTourById(id: string): Promise<StoredTourRecord | null> {
  const tour = await prisma.tour.findUnique({
    where: { id },
    include: { translations: true },
  });
  if (!tour) return null;

  return {
    id: tour.id,
    destination: tour.destination as TourDestination | null,
    meta: {
      durationKey: tour.durationKey as StoredTourRecord["meta"]["durationKey"],
      priceFrom: tour.priceFrom,
      minPeople: tour.minPeople,
      startTime: tour.startTime ?? undefined,
      popular: tour.popular,
    },
    content: buildTourContentMap(tour.translations),
    createdAt: tour.createdAt.toISOString(),
  };
}

export async function createTour(input: StoredTourInput): Promise<StoredTourRecord> {
  const id = await resolveTourId(input);

  const tour = await prisma.tour.create({
    data: {
      id,
      destination: input.destination,
      durationKey: input.meta.durationKey,
      priceFrom: input.meta.priceFrom,
      minPeople: input.meta.minPeople,
      startTime: input.meta.startTime ?? null,
      popular: input.meta.popular ?? false,
      translations: {
        create: routing.locales.map((locale) =>
          tourTranslationData(locale, input.content[locale]),
        ),
      },
    },
    include: { translations: true },
  });

  return {
    id: tour.id,
    destination: tour.destination as TourDestination | null,
    meta: {
      durationKey: tour.durationKey as StoredTourRecord["meta"]["durationKey"],
      priceFrom: tour.priceFrom,
      minPeople: tour.minPeople,
      startTime: tour.startTime ?? undefined,
      popular: tour.popular,
    },
    content: buildTourContentMap(tour.translations),
    createdAt: tour.createdAt.toISOString(),
  };
}

export async function updateTour(
  id: string,
  input: StoredTourInput,
): Promise<StoredTourRecord> {
  const existing = await prisma.tour.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("Tour not found.");
  }

  const tour = await prisma.$transaction(async (tx) => {
    await tx.tour.update({
      where: { id },
      data: {
        destination: input.destination,
        durationKey: input.meta.durationKey,
        priceFrom: input.meta.priceFrom,
        minPeople: input.meta.minPeople,
        startTime: input.meta.startTime ?? null,
        popular: input.meta.popular ?? false,
      },
    });

    for (const locale of routing.locales) {
      const data = tourTranslationData(locale, input.content[locale]);
      await tx.tourTranslation.upsert({
        where: { tourId_locale: { tourId: id, locale: locale as Locale } },
        create: { tourId: id, ...data },
        update: data,
      });
    }

    return tx.tour.findUniqueOrThrow({
      where: { id },
      include: { translations: true },
    });
  });

  return {
    id: tour.id,
    destination: tour.destination as TourDestination | null,
    meta: {
      durationKey: tour.durationKey as StoredTourRecord["meta"]["durationKey"],
      priceFrom: tour.priceFrom,
      minPeople: tour.minPeople,
      startTime: tour.startTime ?? undefined,
      popular: tour.popular,
    },
    content: buildTourContentMap(tour.translations),
    createdAt: tour.createdAt.toISOString(),
  };
}

export async function deleteTour(id: string): Promise<boolean> {
  try {
    await prisma.tour.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

export async function listExcursions(): Promise<StoredExcursionRecord[]> {
  const excursions = await prisma.excursion.findMany({
    include: { translations: true },
    orderBy: { createdAt: "desc" },
  });

  return excursions.map((excursion) => ({
    id: excursion.id,
    meta: {
      durationKey: excursion.durationKey as StoredExcursionRecord["meta"]["durationKey"],
      priceFrom: excursion.priceFrom,
      grades: excursion.grades,
      popular: excursion.popular,
    },
    content: buildExcursionContentMap(excursion.translations),
    createdAt: excursion.createdAt.toISOString(),
  }));
}

export async function getExcursionById(
  id: string,
): Promise<StoredExcursionRecord | null> {
  const excursion = await prisma.excursion.findUnique({
    where: { id },
    include: { translations: true },
  });
  if (!excursion) return null;

  return {
    id: excursion.id,
    meta: {
      durationKey: excursion.durationKey as StoredExcursionRecord["meta"]["durationKey"],
      priceFrom: excursion.priceFrom,
      grades: excursion.grades,
      popular: excursion.popular,
    },
    content: buildExcursionContentMap(excursion.translations),
    createdAt: excursion.createdAt.toISOString(),
  };
}

export async function createExcursion(
  input: StoredExcursionInput,
): Promise<StoredExcursionRecord> {
  const id = await resolveExcursionId(input);

  const excursion = await prisma.excursion.create({
    data: {
      id,
      durationKey: input.meta.durationKey,
      priceFrom: input.meta.priceFrom,
      grades: input.meta.grades,
      popular: input.meta.popular ?? false,
      translations: {
        create: routing.locales.map((locale) =>
          excursionTranslationData(locale, input.content[locale]),
        ),
      },
    },
    include: { translations: true },
  });

  return {
    id: excursion.id,
    meta: {
      durationKey: excursion.durationKey as StoredExcursionRecord["meta"]["durationKey"],
      priceFrom: excursion.priceFrom,
      grades: excursion.grades,
      popular: excursion.popular,
    },
    content: buildExcursionContentMap(excursion.translations),
    createdAt: excursion.createdAt.toISOString(),
  };
}

export async function updateExcursion(
  id: string,
  input: StoredExcursionInput,
): Promise<StoredExcursionRecord> {
  const existing = await prisma.excursion.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("Excursion not found.");
  }

  const excursion = await prisma.$transaction(async (tx) => {
    await tx.excursion.update({
      where: { id },
      data: {
        durationKey: input.meta.durationKey,
        priceFrom: input.meta.priceFrom,
        grades: input.meta.grades,
        popular: input.meta.popular ?? false,
      },
    });

    for (const locale of routing.locales) {
      const data = excursionTranslationData(locale, input.content[locale]);
      await tx.excursionTranslation.upsert({
        where: { excursionId_locale: { excursionId: id, locale: locale as Locale } },
        create: { excursionId: id, ...data },
        update: data,
      });
    }

    return tx.excursion.findUniqueOrThrow({
      where: { id },
      include: { translations: true },
    });
  });

  return {
    id: excursion.id,
    meta: {
      durationKey: excursion.durationKey as StoredExcursionRecord["meta"]["durationKey"],
      priceFrom: excursion.priceFrom,
      grades: excursion.grades,
      popular: excursion.popular,
    },
    content: buildExcursionContentMap(excursion.translations),
    createdAt: excursion.createdAt.toISOString(),
  };
}

export async function deleteExcursion(id: string): Promise<boolean> {
  try {
    await prisma.excursion.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}
