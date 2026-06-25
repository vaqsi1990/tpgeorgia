"use client";

import ExcursionsFilter from "@/components/ExcursionsFilter";
import ExcursionsList from "@/components/ExcursionsList";
import FadeUp from "@/components/FadeUp";
import { defaultExcursionFilters, type ExcursionFilters } from "@/data/excursion-filters";
import type { StoredExcursionRecord } from "@/lib/admin-types";
import type { ReviewStatsRecord } from "@/lib/review-stats-types";
import { business } from "@/lib/site";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaFacebook, FaTiktok } from "react-icons/fa";

type ExcursionsPageContentProps = {
  initialExcursions: StoredExcursionRecord[];
  reviewStats?: ReviewStatsRecord;
};

export default function ExcursionsPageContent({
  initialExcursions,
  reviewStats,
}: ExcursionsPageContentProps) {
  const t = useTranslations("Excursions");
  const [filters, setFilters] = useState<ExcursionFilters>(
    defaultExcursionFilters,
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(240px,280px)_1fr] lg:items-start lg:gap-8 xl:gap-10">
      <FadeUp trigger="load" className="flex w-full flex-col gap-5">
        <div className="w-full rounded-2xl border border-black/10 bg-brand/[0.02] p-4 text-center sm:p-5">
          <p className="mb-3 text-sm font-semibold text-black sm:text-base">
            {t("findUsOnSocialMedia")}
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href={business.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex transition-opacity hover:opacity-80"
            >
              <FaFacebook className="text-3xl text-[#1877F2]" />
            </a>
            <a
              href={business.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="inline-flex transition-opacity hover:opacity-80"
            >
              <FaTiktok className="text-3xl text-black" />
            </a>
          </div>
        </div>
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
