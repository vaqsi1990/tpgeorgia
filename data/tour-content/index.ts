import type { TourId } from "@/data/tours";
import { dayTourContentEn } from "./day-tours/en";
import { dayTourContentKa } from "./day-tours/ka";
import { dayTourContentRu } from "./day-tours/ru";
import { dayTourContentZh } from "./day-tours/zh";
import { multiDayTourContentEn } from "./en";
import { multiDayTourContentKa } from "./ka";
import { multiDayTourContentRu } from "./ru";
import { multiDayTourContentZh } from "./zh";
import type { TourContent } from "./types";

const contentByLocale: Record<string, Record<TourId, TourContent>> = {
  ka: { ...dayTourContentKa, ...multiDayTourContentKa } as Record<
    TourId,
    TourContent
  >,
  en: { ...dayTourContentEn, ...multiDayTourContentEn } as Record<
    TourId,
    TourContent
  >,
  ru: { ...dayTourContentRu, ...multiDayTourContentRu } as Record<
    TourId,
    TourContent
  >,
  zh: { ...dayTourContentZh, ...multiDayTourContentZh } as Record<
    TourId,
    TourContent
  >,
};

export function getTourContent(locale: string, id: TourId): TourContent {
  const catalog = contentByLocale[locale] ?? contentByLocale.ka;
  return catalog[id];
}

export type { TourContent, TourDay, TourSection } from "./types";
