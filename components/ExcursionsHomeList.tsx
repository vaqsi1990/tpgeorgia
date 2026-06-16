"use client";

import ExcursionsList from "@/components/ExcursionsList";
import type { ExcursionFilters } from "@/data/excursion-filters";
import type { StoredExcursionRecord } from "@/lib/admin-types";

type ExcursionsHomeListProps = {
  initialExcursions?: StoredExcursionRecord[];
  limit?: number;
  showAllLink?: boolean;
  filters?: ExcursionFilters;
};

export default function ExcursionsHomeList(props: ExcursionsHomeListProps) {
  return <ExcursionsList {...props} staggerCards />;
}
