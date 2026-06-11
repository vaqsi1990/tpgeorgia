import { excursionContentEn } from "@/data/excursion-content/en";
import { excursionContentKa } from "@/data/excursion-content/ka";
import { excursionContentRu } from "@/data/excursion-content/ru";
import { excursionContentZh } from "@/data/excursion-content/zh";
import type { ExcursionContent } from "@/data/excursion-content";
import { excursionMeta } from "@/data/excursions";
import { dayTourContentEn } from "@/data/tour-content/day-tours/en";
import { dayTourContentKa } from "@/data/tour-content/day-tours/ka";
import { dayTourContentRu } from "@/data/tour-content/day-tours/ru";
import { dayTourContentZh } from "@/data/tour-content/day-tours/zh";
import { multiDayTourContentEn } from "@/data/tour-content/en";
import { multiDayTourContentKa } from "@/data/tour-content/ka";
import { multiDayTourContentRu } from "@/data/tour-content/ru";
import { multiDayTourContentZh } from "@/data/tour-content/zh";
import type { TourContent } from "@/data/tour-content/types";
import {
  toursByDestination,
  type TourDestination,
} from "@/data/tour-destinations";
import { tourMeta, type TourId } from "@/data/tours";
import { routing, type AppLocale } from "@/i18n/routing";
import type { StoredExcursionInput, StoredTourInput } from "@/lib/admin-types";

function tourDestinationFor(id: TourId): TourDestination | null {
  for (const destination of Object.keys(toursByDestination) as TourDestination[]) {
    if (toursByDestination[destination].includes(id)) {
      return destination;
    }
  }
  return null;
}

const tourContentByLocale: Record<AppLocale, Record<string, TourContent>> = {
  ka: { ...dayTourContentKa, ...multiDayTourContentKa },
  en: { ...dayTourContentEn, ...multiDayTourContentEn },
  ru: { ...dayTourContentRu, ...multiDayTourContentRu },
  zh: { ...dayTourContentZh, ...multiDayTourContentZh },
};

const excursionContentByLocale: Record<
  AppLocale,
  Record<string, ExcursionContent>
> = {
  ka: excursionContentKa,
  en: excursionContentEn,
  ru: excursionContentRu,
  zh: excursionContentZh,
};

export function buildSeedTours(): Array<StoredTourInput & { id: string }> {
  return tourMeta.map((meta) => ({
    id: meta.id,
    destination: tourDestinationFor(meta.id),
    meta: {
      durationKey: meta.durationKey,
      priceFrom: meta.priceFrom,
      minPeople: meta.minPeople,
      startTime: meta.startTime,
      popular: meta.popular,
    },
    content: Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        tourContentByLocale[locale][meta.id],
      ]),
    ) as Record<AppLocale, TourContent>,
  }));
}

export function buildSeedExcursions(): Array<StoredExcursionInput & { id: string }> {
  return excursionMeta.map((meta) => ({
    id: meta.id,
    meta: {
      durationKey: meta.durationKey,
      priceFrom: meta.priceFrom,
      grades: meta.grades,
      popular: meta.popular,
    },
    content: Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        excursionContentByLocale[locale][meta.id],
      ]),
    ) as Record<AppLocale, ExcursionContent>,
  }));
}
