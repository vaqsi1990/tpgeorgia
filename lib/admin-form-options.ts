import type { DurationKey } from "@/data/excursions";
import type { TourDurationKey } from "@/data/tours";

export const tourDurationLabels: Record<TourDurationKey, string> = {
  "4hours": "4 საათი",
  "6hours": "6 საათი",
  "7hours": "7 საათი",
  "10hours": "10 საათი",
  "12hours": "12 საათი",
  fullDay: "სრული დღე",
  "2nights3days": "2 ღამე / 3 დღე",
  "11nights12days": "11 ღამე / 12 დღე",
};

export const excursionDurationLabels: Record<DurationKey, string> = {
  "7hours": "7 საათი",
  "8hours": "8 საათი",
  "9hours": "9 საათი",
  "10hours": "10 საათი",
  "11hours": "11 საათი",
  "12hours": "12 საათი",
  "1night2days": "1 ღამე / 2 დღე",
  "2nights3days": "2 ღამე / 3 დღე",
};

export const excursionGradeOptions = [
  "V–VIII",
  "VI–IX",
  "VI–XII",
  "VII–XII",
  "VIII–XII",
  "IX–XII",
] as const;
