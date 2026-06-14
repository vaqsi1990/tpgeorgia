"use client";

import CatalogDetailModal from "@/components/CatalogDetailModal";
import ExcursionCard from "@/components/ExcursionCard";
import ExcursionDetailPanel from "@/components/ExcursionDetailPanel";
import { staggerContainer, staggerItem } from "@/components/motionPresets";
import {
  defaultExcursionFilters,
  matchesStoredExcursionFilters,
  type ExcursionFilters,
} from "@/data/excursion-filters";
import type { ExcursionMeta } from "@/data/excursions";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import type { StoredExcursionRecord } from "@/lib/admin-types";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

type ExcursionsListProps = {
  initialExcursions?: StoredExcursionRecord[];
  limit?: number;
  showAllLink?: boolean;
  staggerCards?: boolean;
  filters?: ExcursionFilters;
};

export default function ExcursionsList({
  initialExcursions = [],
  limit,
  showAllLink = false,
  staggerCards = false,
  filters = defaultExcursionFilters,
}: ExcursionsListProps = {}) {
  const t = useTranslations("Excursions");
  const tGallery = useTranslations("Gallery.lightbox");
  const locale = useLocale();
  const [openId, setOpenId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const items = useMemo(() => {
    const appLocale = locale as AppLocale;

    return initialExcursions
      .filter((stored) => matchesStoredExcursionFilters(stored, filters))
      .map((stored) => ({
        excursion: { id: stored.id, ...stored.meta } as ExcursionMeta,
        content: stored.content[appLocale] ?? stored.content.ka,
      }));
  }, [filters, locale, initialExcursions]);

  const visibleItems =
    limit !== undefined ? items.slice(0, limit) : items;
  const hiddenCount =
    limit !== undefined ? Math.max(0, items.length - limit) : 0;

  const activeItem = useMemo(
    () => visibleItems.find((item) => item.excursion.id === openId) ?? null,
    [openId, visibleItems],
  );

  const handleOpen = useCallback((id: string) => {
    setOpenId(id);
  }, []);

  const handleClose = useCallback(() => {
    setOpenId(null);
  }, []);

  const activeDurationLabel = activeItem
    ? t(`durations.${activeItem.excursion.durationKey}` as const)
    : "";

  const activePriceLabel = activeItem
    ? activeItem.excursion.priceFrom > 0
      ? t("priceFrom", { price: activeItem.excursion.priceFrom })
      : t("priceOnRequest")
    : "";

  const activeMeta = activeItem
    ? [
        { label: t("duration"), value: activeDurationLabel },
        {
          label: t("type"),
          value: `${activeItem.excursion.grades} ${t("grade")} · ${t("cultural")}`,
        },
        { label: t("price"), value: activePriceLabel },
      ]
    : [];

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
          className={`grid gap-6 sm:grid-cols-2 xl:grid-cols-3 items-stretch ${
            visibleItems.length === 0 ? "hidden" : ""
          }`}
        >
          {visibleItems.map((item, index) => (
            <motion.div key={item.excursion.id} variants={staggerItem}>
              <ExcursionCard
                excursion={item.excursion}
                content={item.content}
                index={index}
                stretchCard={isReady}
                onOpenDetails={() => handleOpen(item.excursion.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div
          className={`grid gap-6 sm:grid-cols-2 xl:grid-cols-3 items-stretch ${
            visibleItems.length === 0 ? "hidden" : ""
          }`}
        >
          {visibleItems.map((item, index) => (
            <ExcursionCard
              key={item.excursion.id}
              excursion={item.excursion}
              content={item.content}
              index={index}
              stretchCard={isReady}
              onOpenDetails={() => handleOpen(item.excursion.id)}
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
            href="/excursions"
            className="rounded-xl border border-black/20 bg-white px-8 py-3 text-[15px] font-medium text-black shadow-[0_4px_24px_rgba(15,79,79,0.06)] transition-colors hover:bg-brand/5 md:text-[20px]"
          >
            {t("showMoreCatalog")}
          </Link>
        </motion.div>
      )}

      {activeItem ? (
        <CatalogDetailModal
          isOpen={openId !== null}
          onClose={handleClose}
          closeLabel={tGallery("close")}
          title={activeItem.content.title}
          popularLabel={t("popularBadge")}
          isPopular={activeItem.excursion.popular}
          meta={activeMeta}
        >
          <ExcursionDetailPanel
            content={activeItem.content}
            excursionId={activeItem.excursion.id}
          />
        </CatalogDetailModal>
      ) : null}
    </>
  );
}
