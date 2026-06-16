"use client";

import ToursList from "@/components/ToursList";
import type { TourFilters } from "@/data/tour-filters";
import type { StoredTourRecord } from "@/lib/admin-types";

type ToursHomeListProps = {
  initialTours?: StoredTourRecord[];
  limit?: number;
  showAllLink?: boolean;
  filters?: TourFilters;
};

export default function ToursHomeList(props: ToursHomeListProps) {
  return <ToursList {...props} staggerCards />;
}
