"use client";

import TourCard from "@/components/TourCard";
import { getTourContent } from "@/data/tour-content";
import {
  defaultTourFilters,
  matchesTourFilters,
  type TourFilters,
} from "@/data/tour-filters";
import { tourMeta, type TourId } from "@/data/tours";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

type ToursListProps = {
  limit?: number;
  showAllLink?: boolean;
  filters?: TourFilters;
};

export default function ToursList({
  limit,
  showAllLink = false,
  filters = defaultTourFilters,
}: ToursListProps = {}) {
  const t = useTranslations("Tours");
  const locale = useLocale();
  const [openId, setOpenId] = useState<TourId | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const items = useMemo(
    () =>
      tourMeta
        .filter((tour) => matchesTourFilters(tour, filters))
        .map((tour) => ({
          tour,
          content: getTourContent(locale, tour.id),
        })),
    [filters, locale],
  );

  const visibleItems = limit !== undefined ? items.slice(0, limit) : items;
  const hiddenCount =
    limit !== undefined ? Math.max(0, items.length - limit) : 0;

  const handleOpen = useCallback((id: TourId) => {
    setOpenId(id);
  }, []);

  const handleClose = useCallback(() => {
    setOpenId(null);
  }, []);

  const stretchCards = isReady && openId === null;

  return (
    <>
      {visibleItems.length === 0 ? (
        <p className="rounded-2xl border border-black/10 bg-white px-6 py-10 text-center text-[16px] text-black/70 md:text-[18px]">
          {t("noResults")}
        </p>
      ) : null}

      <div
        className={`grid gap-6 sm:grid-cols-2 xl:grid-cols-3 ${
          stretchCards ? "items-stretch" : "items-start"
        } ${visibleItems.length === 0 ? "hidden" : ""}`}
      >
        {visibleItems.map((item, index) => (
          <TourCard
            key={item.tour.id}
            tour={item.tour}
            content={item.content}
            index={index}
            isOpen={isReady && openId === item.tour.id}
            stretchCard={stretchCards}
            onOpen={() => handleOpen(item.tour.id)}
            onClose={handleClose}
          />
        ))}
      </div>

      {hiddenCount > 0 && showAllLink && (
        <div className="mt-10 flex justify-center">
          <Link
            href="/tours"
            className="rounded-xl border border-black/20 bg-white px-8 py-3 text-[15px] font-medium text-black shadow-[0_4px_24px_rgba(15,79,79,0.06)] transition-colors hover:bg-brand/5 md:text-[20px]"
          >
            {t("showAll")}
          </Link>
        </div>
      )}
    </>
  );
}
