"use client";

import FadeUp from "@/components/FadeUp";
import ToursFilter from "@/components/ToursFilter";
import ToursList from "@/components/ToursList";
import type { TourDestination } from "@/data/tour-destinations";
import { defaultTourFilters, type TourFilters } from "@/data/tour-filters";
import type { StoredTourRecord } from "@/lib/admin-types";
import type { ReviewStatsRecord } from "@/lib/review-stats-types";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type ToursPageContentProps = {
  initialDestination?: TourDestination;
  initialTours: StoredTourRecord[];
  reviewStats?: ReviewStatsRecord;
};

export default function ToursPageContent({
  initialDestination,
  initialTours,
  reviewStats,
}: ToursPageContentProps) {
  const baselineFilters = useMemo<TourFilters>(
    () => ({
      ...defaultTourFilters,
      destination: initialDestination ?? "all",
    }),
    [initialDestination],
  );
  const [filters, setFilters] = useState<TourFilters>(baselineFilters);

  useEffect(() => {
    setFilters(baselineFilters);
  }, [baselineFilters]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(240px,280px)_1fr] lg:items-start lg:gap-8 xl:gap-10">
      <FadeUp trigger="load">
        <div className="space-y-6">
          <ToursFilter
            filters={filters}
            onChange={setFilters}
            catalog={initialTours}
            baselineFilters={baselineFilters}
          />
          <Image
            src="/bgimages/church.png"
            alt=""
            width={420}
            height={420}
            aria-hidden
            className="pointer-events-none mx-auto w-44 mix-blend-multiply opacity-70 sm:w-52 lg:mx-0 lg:w-56"
          />
        </div>
      </FadeUp>
      <FadeUp trigger="load" delay={60} className="min-w-0">
        <ToursList
          initialTours={initialTours}
          filters={filters}
          reviewStats={reviewStats}
        />
      </FadeUp>
    </div>
  );
}
