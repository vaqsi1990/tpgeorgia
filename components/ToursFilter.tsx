"use client";

import { tourDestinationIds } from "@/data/tour-destinations";
import {
  defaultTourFilters,
  hasActiveFilters,
  type TourDurationFilter,
  type TourFilters,
  type TourPriceFilter,
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
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
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

  const setPrice = (price: TourPriceFilter) => {
    onChange({ ...filters, price });
  };

  const durationOptions: TourDurationFilter[] = [
    "all",
    "short",
    "longDay",
    "multiDay",
  ];

  const priceOptions: TourPriceFilter[] = [
    "all",
    "under150",
    "mid",
    "over250",
    "onRequest",
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
        <FilterGroup label={t("filterCity")}>
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
        </FilterGroup>

        <FilterGroup label={t("filterDuration")}>
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
        </FilterGroup>

        <FilterGroup label={t("filterPrice")}>
          {priceOptions.map((price) => (
            <button
              key={price}
              type="button"
              onClick={() => setPrice(price)}
              className={optionClass(filters.price === price)}
            >
              {price === "all"
                ? t("filterAll")
                : t(`filterPriceOptions.${price}`)}
            </button>
          ))}
        </FilterGroup>
      </div>
    </aside>
  );
}
