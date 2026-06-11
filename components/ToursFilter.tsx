"use client";


import {
  defaultTourFilters,
  getTourPriceBoundsFromCatalog,
  hasActiveFilters,
  tourPriceBounds,
  type TourDurationFilter,
  type TourFilters,
} from "@/data/tour-filters";
import { tourDestinationIds } from "@/data/tour-destinations";
import { Link } from "@/i18n/navigation";
import type { StoredTourRecord } from "@/lib/admin-types";
import { useTranslations } from "next-intl";
import { useMemo, useState, type Dispatch, type SetStateAction } from "react";

type ToursFilterProps = {
  filters: TourFilters;
  onChange: Dispatch<SetStateAction<TourFilters>>;
  catalog?: StoredTourRecord[];
  baselineFilters?: TourFilters;
};

const optionClass = (isActive: boolean) =>
  `w-full rounded-xl border px-4 py-2.5 text-left text-[14px] font-medium transition-colors md:text-[15px] ${
    isActive
      ? "border-[#38ab8a] bg-[#38ab8a] text-white shadow-[0_4px_16px_rgba(56,171,138,0.2)]"
      : "border-black/10 bg-white text-black hover:border-[#38ab8a]/40 hover:bg-brand/5"
  }`;

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-[14px] text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#38ab8a] md:text-[15px]";

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <h3 className="text-[14px] font-semibold text-black md:text-[15px]">
        {label}
      </h3>
      {children}
    </div>
  );
}

function parsePriceInput(value: string): number | null {
  if (value.trim() === "") {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }

  return Math.round(parsed);
}

export default function ToursFilter({
  filters,
  onChange,
  catalog,
  baselineFilters = defaultTourFilters,
}: ToursFilterProps) {
  const t = useTranslations("Tours");
  const tHeader = useTranslations("Header");
  const [isExpanded, setIsExpanded] = useState(false);
  const priceBounds = useMemo(
    () =>
      catalog?.length
        ? getTourPriceBoundsFromCatalog(catalog)
        : tourPriceBounds,
    [catalog],
  );

  const setDuration = (duration: TourDurationFilter) => {
    onChange((prev) => ({ ...prev, duration }));
  };

  const setPriceMin = (value: string) => {
    onChange((prev) => ({ ...prev, priceMin: parsePriceInput(value) }));
  };

  const setPriceMax = (value: string) => {
    onChange((prev) => ({ ...prev, priceMax: parsePriceInput(value) }));
  };

  const durationOptions: TourDurationFilter[] = [
    "all",
    "short",
    "longDay",
    "multiDay",
  ];

  return (
    <aside
      className="rounded-2xl border border-black/10 bg-brand/[0.03] p-4 sm:p-5 lg:sticky lg:top-28 lg:self-start"
      aria-label={t("filterLabel")}
    >
      <div
        className={`flex items-center justify-between flex-col gap-3 ${
          isExpanded ? "mb-5 border-b border-black/10 pb-4" : "lg:mb-5 lg:border-b lg:border-black/10 lg:pb-4"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsExpanded((open) => !open)}
          className="flex min-w-0 flex-1 items-center gap-2 text-left lg:pointer-events-none"
          aria-expanded={isExpanded}
          aria-controls="tours-filter-panel"
          aria-label={isExpanded ? t("filterCollapse") : t("filterExpand")}
        >
          <h2 className="font-afacad text-lg font-semibold text-black md:text-xl">
            {t("filterLabel")}
          </h2>
          {hasActiveFilters(filters, baselineFilters) && !isExpanded ? (
            <span className="size-2 shrink-0 rounded-full bg-[#38ab8a]" aria-hidden />
          ) : null}
          <svg
            viewBox="0 0 20 20"
            className={`ml-auto size-5 shrink-0 text-black/60 transition-transform lg:hidden ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="currentColor"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {hasActiveFilters(filters, baselineFilters) ? (
          <button
            type="button"
            onClick={() => onChange(baselineFilters)}
            className="shrink-0 text-[13px] font-medium text-[#38ab8a] underline-offset-2 transition-opacity hover:underline hover:opacity-80 md:text-[14px]"
          >
            {t("filterClear")}
          </button>
        ) : null}
      </div>

      <div
        id="tours-filter-panel"
        className={`space-y-5 ${isExpanded ? "block" : "hidden lg:block"}`}
      >
        <FilterGroup label={t("filterPrice")}>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="tour-price-min"
                className="mb-1.5 block text-[13px] text-black/70"
              >
                {t("filterPriceMin")}
              </label>
              <input
                id="tour-price-min"
                type="number"
                min={0}
                max={priceBounds.max}
                step={1}
                value={filters.priceMin ?? ""}
                onChange={(e) => setPriceMin(e.target.value)}
                placeholder={String(priceBounds.min)}
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="tour-price-max"
                className="mb-1.5 block text-[13px] text-black/70"
              >
                {t("filterPriceMax")}
              </label>
              <input
                id="tour-price-max"
                type="number"
                min={0}
                max={priceBounds.max}
                step={1}
                value={filters.priceMax ?? ""}
                onChange={(e) => setPriceMax(e.target.value)}
                placeholder={String(priceBounds.max)}
                className={inputClass}
              />
            </div>
          </div>
          <p className="text-[12px] leading-relaxed text-black/55 md:text-[13px]">
            {t("filterPriceHint", {
              min: priceBounds.min,
              max: priceBounds.max,
            })}
          </p>
        </FilterGroup>

        <FilterGroup label={t("filterCity")}>
          <div className="flex flex-col gap-2">
            <Link
              href="/tours"
              className={optionClass(filters.destination === "all")}
            >
              {t("filterAll")}
            </Link>
            {tourDestinationIds.map((destination) => (
              <Link
                key={destination}
                href={`/tours/${destination}`}
                className={optionClass(filters.destination === destination)}
              >
                {tHeader(
                  `nav.toursDropdown.${destination}` as
                    | "nav.toursDropdown.batumi"
                    | "nav.toursDropdown.tbilisi"
                    | "nav.toursDropdown.kutaisi",
                )}
              </Link>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup label={t("filterDuration")}>
          <div className="flex flex-col gap-2">
            {durationOptions.map((duration) => (
              <button
                key={duration}
                type="button"
                onClick={() => setDuration(duration)}
                className={optionClass(filters.duration === duration)}
              >
                {duration === "all"
                  ? t("filterAll")
                  : t(`filterDurationOptions.${duration}`)}
              </button>
            ))}
          </div>
        </FilterGroup>
      </div>
    </aside>
  );
}
