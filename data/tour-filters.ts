import {
  tourDestinationIds,
  toursByDestination,
  type TourDestination,
} from "@/data/tour-destinations";
import type { TourDurationKey, TourId, TourMeta } from "@/data/tours";

export type TourDestinationFilter = TourDestination | "all";
export type TourDurationFilter = "all" | "short" | "longDay" | "multiDay";
export type TourPriceFilter =
  | "all"
  | "under150"
  | "mid"
  | "over250"
  | "onRequest";

export type TourFilters = {
  destination: TourDestinationFilter;
  duration: TourDurationFilter;
  price: TourPriceFilter;
};

export const defaultTourFilters: TourFilters = {
  destination: "all",
  duration: "all",
  price: "all",
};

const shortDurations = new Set<TourDurationKey>([
  "4hours",
  "6hours",
  "7hours",
]);

const longDayDurations = new Set<TourDurationKey>([
  "10hours",
  "12hours",
  "fullDay",
]);

const multiDayDurations = new Set<TourDurationKey>([
  "2nights3days",
  "11nights12days",
]);

const tourDestinationById = new Map<TourId, TourDestination>(
  tourDestinationIds.flatMap((destination) =>
    toursByDestination[destination].map((id) => [id, destination] as const),
  ),
);

export function getTourDestination(id: TourId): TourDestination | null {
  return tourDestinationById.get(id) ?? null;
}

export function matchesTourFilters(
  tour: TourMeta,
  filters: TourFilters,
): boolean {
  if (filters.destination !== "all") {
    if (getTourDestination(tour.id) !== filters.destination) {
      return false;
    }
  }

  if (filters.duration !== "all") {
    const durationSets: Record<
      Exclude<TourDurationFilter, "all">,
      Set<TourDurationKey>
    > = {
      short: shortDurations,
      longDay: longDayDurations,
      multiDay: multiDayDurations,
    };
    if (!durationSets[filters.duration].has(tour.durationKey)) {
      return false;
    }
  }

  if (filters.price !== "all") {
    if (filters.price === "onRequest" && tour.priceFrom !== 0) {
      return false;
    }
    if (filters.price === "under150" && (tour.priceFrom === 0 || tour.priceFrom >= 150)) {
      return false;
    }
    if (
      filters.price === "mid" &&
      (tour.priceFrom < 150 || tour.priceFrom > 250)
    ) {
      return false;
    }
    if (filters.price === "over250" && tour.priceFrom <= 250) {
      return false;
    }
  }

  return true;
}

export function hasActiveFilters(filters: TourFilters): boolean {
  return (
    filters.destination !== "all" ||
    filters.duration !== "all" ||
    filters.price !== "all"
  );
}
