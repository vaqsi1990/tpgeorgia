"use client";

import { tourDestinationIds } from "@/data/tour-destinations";
import {
  defaultTourFilters,
  hasActiveFilters,
  tourPriceBounds,
  type TourDurationFilter,
  type TourFilters,
} from "@/data/tour-filters";
import { useTranslations } from "next-intl";

type ToursFilterProps = {
  filters: TourFilters;
  onChange: (filters: TourFilters) => void;
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

export default function ToursFilter({ filters, onChange }: ToursFilterProps) {
  const t = useTranslations("Tours");
  const tHeader = useTranslations("Header");

  const setDestination = (destination: TourFilters["destination"]) => {
    onChange({ ...filters, destination });
  };

  const setDuration = (duration: TourDurationFilter) => {
    onChange({ ...filters, duration });
  };

  const setPriceMin = (value: string) => {
    onChange({ ...filters, priceMin: parsePriceInput(value) });
  };

  const setPriceMax = (value: string) => {
    onChange({ ...filters, priceMax: parsePriceInput(value) });
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
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-black/10 pb-4">
        <h2 className="font-afacad text-lg font-semibold text-black md:text-xl">
          {t("filterLabel")}
        </h2>
        {hasActiveFilters(filters) ? (
          <button
            type="button"
            onClick={() => onChange(defaultTourFilters)}
            className="shrink-0 text-[13px] font-medium text-[#38ab8a] underline-offset-2 transition-opacity hover:underline hover:opacity-80 md:text-[14px]"
          >
            {t("filterClear")}
          </button>
        ) : null}
      </div>

      <div className="space-y-5">
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
                max={tourPriceBounds.max}
                step={1}
                value={filters.priceMin ?? ""}
                onChange={(e) => setPriceMin(e.target.value)}
                placeholder={String(tourPriceBounds.min)}
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
                max={tourPriceBounds.max}
                step={1}
                value={filters.priceMax ?? ""}
                onChange={(e) => setPriceMax(e.target.value)}
                placeholder={String(tourPriceBounds.max)}
                className={inputClass}
              />
            </div>
          </div>
          <p className="text-[12px] leading-relaxed text-black/55 md:text-[13px]">
            {t("filterPriceHint", {
              min: tourPriceBounds.min,
              max: tourPriceBounds.max,
            })}
          </p>
        </FilterGroup>

        <FilterGroup label={t("filterCity")}>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setDestination("all")}
              className={optionClass(filters.destination === "all")}
            >
              {t("filterAll")}
            </button>
            {tourDestinationIds.map((destination) => (
              <button
                key={destination}
                type="button"
                onClick={() => setDestination(destination)}
                className={optionClass(filters.destination === destination)}
              >
                {tHeader(
                  `nav.toursDropdown.${destination}` as
                    | "nav.toursDropdown.batumi"
                    | "nav.toursDropdown.tbilisi"
                    | "nav.toursDropdown.kutaisi",
                )}
              </button>
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
