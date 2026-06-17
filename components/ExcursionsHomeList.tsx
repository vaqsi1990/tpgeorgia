"use client";

import ExcursionsList from "@/components/ExcursionsList";
import type { ExcursionFilters } from "@/data/excursion-filters";
import type { StoredExcursionRecord } from "@/lib/admin-types";
import type { ReviewStatsRecord } from "@/lib/review-stats-types";

type ExcursionsHomeListProps = {
  initialExcursions?: StoredExcursionRecord[];
  limit?: number;
  showAllLink?: boolean;
  filters?: ExcursionFilters;
  reviewStats?: ReviewStatsRecord;
};

export default function ExcursionsHomeList(props: ExcursionsHomeListProps) {
  return <ExcursionsList {...props} staggerCards />;
}
