"use client";

import TourCard from "@/components/TourCard";
import { getTourContent } from "@/data/tour-content";
import {
  toursByDestination,
  type TourDestination,
} from "@/data/tour-destinations";
import { tourMeta, type TourId } from "@/data/tours";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

type ToursListProps = {
  limit?: number;
  showAllLink?: boolean;
  destination?: TourDestination;
};

export default function ToursList({
  limit,
  showAllLink = false,
  destination,
}: ToursListProps = {}) {
  const t = useTranslations("Tours");
  const locale = useLocale();
  const [openId, setOpenId] = useState<TourId | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const items = useMemo(() => {
    const allowedIds = destination
      ? new Set(toursByDestination[destination])
      : null;

    return tourMeta
      .filter((tour) => !allowedIds || allowedIds.has(tour.id))
      .map((tour) => ({
        tour,
        content: getTourContent(locale, tour.id),
      }));
  }, [destination, locale]);

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
      <div
        className={`grid gap-6 sm:grid-cols-2 xl:grid-cols-3 ${
          stretchCards ? "items-stretch" : "items-start"
        }`}
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
