"use client";

import ExcursionsFilter from "@/components/ExcursionsFilter";
import ExcursionsList from "@/components/ExcursionsList";
import FadeUp from "@/components/FadeUp";
import { defaultExcursionFilters, type ExcursionFilters } from "@/data/excursion-filters";
import { useState } from "react";

export default function ExcursionsPageContent() {
  const [filters, setFilters] = useState<ExcursionFilters>(
    defaultExcursionFilters,
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(240px,280px)_1fr] lg:items-start lg:gap-8 xl:gap-10">
      <FadeUp trigger="load">
        <ExcursionsFilter filters={filters} onChange={setFilters} />
      </FadeUp>
      <FadeUp trigger="load" delay={60} className="min-w-0">
        <ExcursionsList filters={filters} />
      </FadeUp>
    </div>
  );
}
