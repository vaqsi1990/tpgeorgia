"use client";

import ExcursionsFilter from "@/components/ExcursionsFilter";
import ExcursionsList from "@/components/ExcursionsList";
import FadeUp from "@/components/FadeUp";
import { defaultExcursionFilters, type ExcursionFilters } from "@/data/excursion-filters";
import type { StoredExcursionRecord } from "@/lib/admin-types";
import type { ReviewStatsRecord } from "@/lib/review-stats-types";
import { useState } from "react";

type ExcursionsPageContentProps = {
  initialExcursions: StoredExcursionRecord[];
  reviewStats?: ReviewStatsRecord;
};

export default function ExcursionsPageContent({
  initialExcursions,
  reviewStats,
}: ExcursionsPageContentProps) {
  const [filters, setFilters] = useState<ExcursionFilters>(
    defaultExcursionFilters,
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(240px,280px)_1fr] lg:items-start lg:gap-8 xl:gap-10">
      <FadeUp trigger="load">
        <ExcursionsFilter
          filters={filters}
          onChange={setFilters}
          catalog={initialExcursions}
        />
      </FadeUp>
      <FadeUp trigger="load" delay={60} className="min-w-0">
        <ExcursionsList
          initialExcursions={initialExcursions}
          filters={filters}
          reviewStats={reviewStats}
        />
      </FadeUp>
    </div>
  );
}
