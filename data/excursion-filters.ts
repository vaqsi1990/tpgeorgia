import {
  excursionMeta,
  type DurationKey,
  type ExcursionMeta,
} from "@/data/excursions";

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

export function hasActiveExcursionFilters(filters: ExcursionFilters): boolean {
  return (
    filters.duration !== "all" ||
    filters.grade !== "all" ||
    filters.priceMin !== null ||
    filters.priceMax !== null
  );
}
