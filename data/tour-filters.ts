import {
  tourDestinationIds,
  toursByDestination,
  type TourDestination,
} from "@/data/tour-destinations";
import {
  tourIds,
  tourMeta,
  type TourDurationKey,
  type TourId,
  type TourMeta,
} from "@/data/tours";

export type TourDestinationFilter = TourDestination | "all";
export type TourDurationFilter = "all" | "short" | "longDay" | "multiDay";

export type TourFilters = {
  destination: TourDestinationFilter;
  duration: TourDurationFilter;
  priceMin: number | null;
  priceMax: number | null;
};

export const defaultTourFilters: TourFilters = {
  destination: "all",
  duration: "all",
  priceMin: null,
  priceMax: null,
};

const pricedTours = tourMeta.filter((tour) => tour.priceFrom > 0);

export const tourPriceBounds = {
  min: pricedTours.length
    ? Math.min(...pricedTours.map((tour) => tour.priceFrom))
    : 0,
  max: pricedTours.length
    ? Math.max(...pricedTours.map((tour) => tour.priceFrom))
    : 0,
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

const cityTourIds = new Set<TourId>(["eveningCity"]);

const tourCatalogOrder = new Map<TourId, number>(
  tourIds.map((id, index) => [id, index]),
);

type TourDisplaySortable = {
  id: string;
  meta: { durationKey: TourDurationKey | string };
  createdAt?: string;
};

function getTourDisplayGroup(tour: TourDisplaySortable): number {
  if (cityTourIds.has(tour.id as TourId)) {
    return 0;
  }

  if (multiDayDurations.has(tour.meta.durationKey as TourDurationKey)) {
    return 2;
  }

  return 1;
}

export function compareToursForDisplay(
  a: TourDisplaySortable,
  b: TourDisplaySortable,
): number {
  const groupDiff = getTourDisplayGroup(a) - getTourDisplayGroup(b);
  if (groupDiff !== 0) {
    return groupDiff;
  }

  const orderA = tourCatalogOrder.get(a.id as TourId) ?? Number.MAX_SAFE_INTEGER;
  const orderB = tourCatalogOrder.get(b.id as TourId) ?? Number.MAX_SAFE_INTEGER;
  if (orderA !== orderB) {
    return orderA - orderB;
  }

  if (a.createdAt && b.createdAt) {
    return b.createdAt.localeCompare(a.createdAt);
  }

  return 0;
}

export function sortToursForDisplay<T extends TourDisplaySortable>(
  tours: T[],
): T[] {
  return [...tours].sort(compareToursForDisplay);
}

const tourDestinationById = new Map<TourId, TourDestination>(
  tourDestinationIds.flatMap((destination) =>
    toursByDestination[destination].map((id) => [id, destination] as const),
  ),
);

export function getTourDestination(id: TourId): TourDestination | null {
  return tourDestinationById.get(id) ?? null;
}

function matchesPriceRange(
  tour: TourMeta,
  priceMin: number | null,
  priceMax: number | null,
): boolean {
  if (priceMin === null && priceMax === null) {
    return true;
  }

  if (tour.priceFrom === 0) {
    return false;
  }

  if (priceMin !== null && tour.priceFrom < priceMin) {
    return false;
  }

  if (priceMax !== null && tour.priceFrom > priceMax) {
    return false;
  }

  return true;
}

export function matchesTourFilters(
  tour: TourMeta,
  filters: TourFilters,
  destinationOverride?: TourDestination | null,
): boolean {
  if (filters.destination !== "all") {
    const destination = destinationOverride ?? getTourDestination(tour.id);
    if (destination !== filters.destination) {
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

  if (!matchesPriceRange(tour, filters.priceMin, filters.priceMax)) {
    return false;
  }

  return true;
}

export function getTourPriceBoundsFromCatalog(
  tours: Array<{ meta: { priceFrom: number } }>,
): { min: number; max: number } {
  const priced = tours.filter((tour) => tour.meta.priceFrom > 0);
  if (!priced.length) {
    return tourPriceBounds;
  }

  return {
    min: Math.min(...priced.map((tour) => tour.meta.priceFrom)),
    max: Math.max(...priced.map((tour) => tour.meta.priceFrom)),
  };
}

export function matchesStoredTourFilters(
  stored: {
    id: string;
    destination: TourDestination | null;
    meta: { durationKey: TourDurationKey | string; priceFrom: number };
  },
  filters: TourFilters,
): boolean {
  return matchesTourFilters(
    { id: stored.id as TourId, ...stored.meta } as TourMeta,
    filters,
    stored.destination,
  );
}

export function hasActiveFilters(
  filters: TourFilters,
  baseline: TourFilters = defaultTourFilters,
): boolean {
  return (
    filters.destination !== baseline.destination ||
    filters.duration !== baseline.duration ||
    filters.priceMin !== baseline.priceMin ||
    filters.priceMax !== baseline.priceMax
  );
}
