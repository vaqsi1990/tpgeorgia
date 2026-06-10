"use client";

import { staggerContainer, staggerItem } from "@/components/motionPresets";
import TourCard from "@/components/TourCard";
import { getTourContent } from "@/data/tour-content";
import {
  defaultTourFilters,
  matchesTourFilters,
  type TourFilters,
} from "@/data/tour-filters";
import { tourMeta, type TourId, type TourMeta } from "@/data/tours";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import type { StoredTourRecord } from "@/lib/admin-types";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

type ToursListProps = {
  limit?: number;
  showAllLink?: boolean;
  filters?: TourFilters;
  staggerCards?: boolean;
};

export default function ToursList({
  limit,
  showAllLink = false,
  filters = defaultTourFilters,
  staggerCards = false,
}: ToursListProps = {}) {
  const t = useTranslations("Tours");
  const locale = useLocale();
  const [openId, setOpenId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [storedTours, setStoredTours] = useState<StoredTourRecord[]>([]);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    fetch("/api/catalog/tours")
      .then((response) => response.json())
      .then((data: { tours?: StoredTourRecord[] }) => {
        setStoredTours(data.tours ?? []);
      })
      .catch(() => setStoredTours([]));
  }, []);

  const items = useMemo(() => {
    const appLocale = locale as AppLocale;
    const staticItems = tourMeta
      .filter((tour) => matchesTourFilters(tour, filters))
      .map((tour) => ({
        tour,
        content: getTourContent(locale, tour.id),
      }));

    const dynamicItems = storedTours
      .filter((stored) =>
        matchesTourFilters(
          { id: stored.id as TourId, ...stored.meta },
          filters,
          stored.destination,
        ),
      )
      .map((stored) => ({
        tour: { id: stored.id, ...stored.meta } as TourMeta,
        content: stored.content[appLocale] ?? stored.content.ka,
      }));

    return [...staticItems, ...dynamicItems];
  }, [filters, locale, storedTours]);

  const visibleItems = limit !== undefined ? items.slice(0, limit) : items;
  const hiddenCount =
    limit !== undefined ? Math.max(0, items.length - limit) : 0;

  const handleOpen = useCallback((id: string) => {
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

      {staggerCards ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
          className={`grid gap-6 sm:grid-cols-2 xl:grid-cols-3 ${
            stretchCards ? "items-stretch" : "items-start"
          } ${visibleItems.length === 0 ? "hidden" : ""}`}
        >
          {visibleItems.map((item, index) => (
            <motion.div key={item.tour.id} variants={staggerItem}>
              <TourCard
                tour={item.tour}
                content={item.content}
                index={index}
                isOpen={isReady && openId === item.tour.id}
                stretchCard={stretchCards}
                onOpen={() => handleOpen(item.tour.id)}
                onClose={handleClose}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
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
      )}

      {hiddenCount > 0 && showAllLink && (
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/tours"
            className="rounded-xl border border-black/20 bg-white px-8 py-3 text-[15px] font-medium text-black shadow-[0_4px_24px_rgba(15,79,79,0.06)] transition-colors hover:bg-brand/5 md:text-[20px]"
          >
            {t("showAll")}
          </Link>
        </motion.div>
      )}
    </>
  );
}
