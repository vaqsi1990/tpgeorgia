"use client";

import FadeUp from "@/components/FadeUp";
import ToursFilter from "@/components/ToursFilter";
import ToursList from "@/components/ToursList";
import type { TourDestination } from "@/data/tour-destinations";
import { defaultTourFilters, type TourFilters } from "@/data/tour-filters";
import { useState } from "react";

type ToursPageContentProps = {
  initialDestination?: TourDestination;
};

export default function ToursPageContent({
  initialDestination,
}: ToursPageContentProps) {
  const [filters, setFilters] = useState<TourFilters>(() => ({
    ...defaultTourFilters,
    destination: initialDestination ?? "all",
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(240px,280px)_1fr] lg:items-start lg:gap-8 xl:gap-10">
      <FadeUp trigger="load">
        <ToursFilter filters={filters} onChange={setFilters} />
      </FadeUp>
      <FadeUp trigger="load" delay={60} className="min-w-0">
        <ToursList filters={filters} />
      </FadeUp>
    </div>
  );
}
