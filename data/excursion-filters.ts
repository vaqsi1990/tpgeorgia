import {
  excursionIds,
  excursionMeta,
  type DurationKey,
  type ExcursionId,
  type ExcursionMeta,
} from "@/data/excursions";
import {
  getItemReviewStats,
  isAutoTopRated,
  type ReviewStatsRecord,
} from "@/lib/review-stats-types";

export type ExcursionDurationFilter = "all" | "short" | "longDay" | "multiDay";
export type ExcursionGradeFilter = "all" | "vToViii" | "viToXii" | "ixToXii";

export type ExcursionFilters = {
  duration: ExcursionDurationFilter;
  grade: ExcursionGradeFilter;
  priceMin: number | null;
  priceMax: number | null;
};

export const defaultExcursionFilters: ExcursionFilters = {
  duration: "all",
  grade: "all",
  priceMin: null,
  priceMax: null,
};

const pricedExcursions = excursionMeta.filter(
  (excursion) => excursion.priceFrom > 0,
);

export const excursionPriceBounds = {
  min: pricedExcursions.length
    ? Math.min(...pricedExcursions.map((excursion) => excursion.priceFrom))
    : 0,
  max: pricedExcursions.length
    ? Math.max(...pricedExcursions.map((excursion) => excursion.priceFrom))
    : 0,
};

const shortDurations = new Set<DurationKey>(["7hours", "8hours", "9hours"]);
const longDayDurations = new Set<DurationKey>([
  "10hours",
  "11hours",
  "12hours",
]);
const multiDayDurations = new Set<DurationKey>([
  "1night2days",
  "2nights3days",
]);

const gradeMatches: Record<
  Exclude<ExcursionGradeFilter, "all">,
  Set<string>
> = {
  vToViii: new Set(["V–VIII"]),
  viToXii: new Set(["VI–XII", "VI–IX", "VII–XII"]),
  ixToXii: new Set(["VIII–XII", "IX–XII"]),
};

function matchesPriceRange(
  excursion: ExcursionMeta,
  priceMin: number | null,
  priceMax: number | null,
): boolean {
  if (priceMin === null && priceMax === null) {
    return true;
  }

  if (excursion.priceFrom === 0) {
    return false;
  }

  if (priceMin !== null && excursion.priceFrom < priceMin) {
    return false;
  }

  if (priceMax !== null && excursion.priceFrom > priceMax) {
    return false;
  }

  return true;
}

export function matchesExcursionFilters(
  excursion: ExcursionMeta,
  filters: ExcursionFilters,
): boolean {
  if (filters.duration !== "all") {
    const durationSets: Record<
      Exclude<ExcursionDurationFilter, "all">,
      Set<DurationKey>
    > = {
      short: shortDurations,
      longDay: longDayDurations,
      multiDay: multiDayDurations,
    };
    if (!durationSets[filters.duration].has(excursion.durationKey)) {
      return false;
    }
  }

  if (filters.grade !== "all") {
    if (!gradeMatches[filters.grade].has(excursion.grades)) {
      return false;
    }
  }

  if (!matchesPriceRange(excursion, filters.priceMin, filters.priceMax)) {
    return false;
  }

  return true;
}

export function getExcursionPriceBoundsFromCatalog(
  excursions: Array<{ meta: { priceFrom: number } }>,
): { min: number; max: number } {
  const priced = excursions.filter(
    (excursion) => excursion.meta.priceFrom > 0,
  );
  if (!priced.length) {
    return excursionPriceBounds;
  }

  return {
    min: Math.min(...priced.map((excursion) => excursion.meta.priceFrom)),
    max: Math.max(...priced.map((excursion) => excursion.meta.priceFrom)),
  };
}

export function matchesStoredExcursionFilters(
  stored: {
    id: string;
    meta: {
      durationKey: DurationKey | string;
      priceFrom: number;
      grades: string;
    };
  },
  filters: ExcursionFilters,
): boolean {
  return matchesExcursionFilters(
    { id: stored.id as ExcursionMeta["id"], ...stored.meta } as ExcursionMeta,
    filters,
  );
}

export function hasActiveExcursionFilters(
  filters: ExcursionFilters,
  baseline: ExcursionFilters = defaultExcursionFilters,
): boolean {
  return (
    filters.duration !== baseline.duration ||
    filters.grade !== baseline.grade ||
    filters.priceMin !== baseline.priceMin ||
    filters.priceMax !== baseline.priceMax
  );
}

const excursionCatalogOrder = new Map<ExcursionId, number>(
  excursionIds.map((id, index) => [id, index]),
);

type ExcursionDisplaySortable = {
  id: string;
  meta: { popular?: boolean };
  createdAt?: string;
};

function isTopExcursion(
  excursion: ExcursionDisplaySortable,
  reviewStats?: ReviewStatsRecord,
): boolean {
  if (excursion.meta.popular) {
    return true;
  }

  return isAutoTopRated(
    getItemReviewStats(reviewStats, "excursion", excursion.id),
  );
}

export function compareExcursionsForDisplay(
  a: ExcursionDisplaySortable,
  b: ExcursionDisplaySortable,
  reviewStats?: ReviewStatsRecord,
): number {
  const topDiff =
    Number(isTopExcursion(b, reviewStats)) - Number(isTopExcursion(a, reviewStats));
  if (topDiff !== 0) {
    return topDiff;
  }

  const orderA =
    excursionCatalogOrder.get(a.id as ExcursionId) ?? Number.MAX_SAFE_INTEGER;
  const orderB =
    excursionCatalogOrder.get(b.id as ExcursionId) ?? Number.MAX_SAFE_INTEGER;
  if (orderA !== orderB) {
    return orderA - orderB;
  }

  if (a.createdAt && b.createdAt) {
    return b.createdAt.localeCompare(a.createdAt);
  }

  return 0;
}

export function sortExcursionsForDisplay<T extends ExcursionDisplaySortable>(
  excursions: T[],
  reviewStats?: ReviewStatsRecord,
): T[] {
  return [...excursions].sort((a, b) =>
    compareExcursionsForDisplay(a, b, reviewStats),
  );
}
