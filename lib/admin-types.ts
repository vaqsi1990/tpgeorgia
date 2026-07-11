import type { ExcursionContent } from "@/data/excursion-content";
import type { TourContent } from "@/data/tour-content";
import type { TourDestination } from "@/data/tour-destinations";
import type { AppLocale } from "@/i18n/routing";
import type { DurationKey, ExcursionMeta } from "@/data/excursions";
import type { TourDurationKey, TourMeta } from "@/data/tours";

export type LocaleContentMap<T> = Record<AppLocale, T>;

export type StoredTourRecord = {
  id: string;
  destinations: TourDestination[];
  meta: Omit<TourMeta, "id">;
  content: LocaleContentMap<TourContent>;
  images: string[];
  createdAt: string;
};

export type StoredExcursionRecord = {
  id: string;
  destinations: TourDestination[];
  meta: Omit<ExcursionMeta, "id">;
  content: LocaleContentMap<ExcursionContent>;
  images: string[];
  createdAt: string;
};

export type StoredTourInput = {
  id?: string;
  destinations?: TourDestination[];
  meta: Omit<TourMeta, "id">;
  content: LocaleContentMap<TourContent>;
  images?: string[];
};

export type StoredExcursionInput = {
  id?: string;
  destinations?: TourDestination[];
  meta: Omit<ExcursionMeta, "id">;
  content: LocaleContentMap<ExcursionContent>;
  images?: string[];
};

export const tourDurationKeys: TourDurationKey[] = [
  "4hours",
  "6hours",
  "7hours",
  "10hours",
  "12hours",
  "fullDay",
  "2nights3days",
  "11nights12days",
];

export const excursionDurationKeys: DurationKey[] = [
  "7hours",
  "8hours",
  "9hours",
  "10hours",
  "11hours",
  "12hours",
  "1night2days",
  "2nights3days",
];
