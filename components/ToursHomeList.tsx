"use client";

import ToursList from "@/components/ToursList";
import type { TourFilters } from "@/data/tour-filters";
import type { StoredTourRecord } from "@/lib/admin-types";
import type { ReviewStatsRecord } from "@/lib/review-stats-types";

type ToursHomeListProps = {
  initialTours?: StoredTourRecord[];
  limit?: number;
  showAllLink?: boolean;
  filters?: TourFilters;
  reviewStats?: ReviewStatsRecord;
};

export default function ToursHomeList(props: ToursHomeListProps) {
  return <ToursList {...props} staggerCards />;
}
