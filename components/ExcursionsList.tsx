"use client";

import ExcursionCard from "@/components/ExcursionCard";
import { getExcursionContent } from "@/data/excursion-content";
import { excursionMeta, type ExcursionId } from "@/data/excursions";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

type ExcursionsListProps = {
  limit?: number;
  showAllLink?: boolean;
};

export default function ExcursionsList({
  limit,
  showAllLink = false,
}: ExcursionsListProps = {}) {
  const t = useTranslations("Excursions");
  const locale = useLocale();
  const [openId, setOpenId] = useState<ExcursionId | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const items = useMemo(
    () =>
      excursionMeta.map((excursion) => ({
        excursion,
        content: getExcursionContent(locale, excursion.id),
      })),
    [locale],
  );

  const visibleItems =
    limit !== undefined ? items.slice(0, limit) : items;
  const hiddenCount =
    limit !== undefined ? Math.max(0, items.length - limit) : 0;

  const handleOpen = useCallback((id: ExcursionId) => {
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
          <ExcursionCard
            key={item.excursion.id}
            excursion={item.excursion}
            content={item.content}
            index={index}
            isOpen={isReady && openId === item.excursion.id}
            stretchCard={stretchCards}
            onOpen={() => handleOpen(item.excursion.id)}
            onClose={handleClose}
          />
        ))}
      </div>

      {hiddenCount > 0 && showAllLink && (
        <div className="mt-10 flex justify-center">
          <Link
            href="/excursions"
            className="rounded-xl border border-black/20 bg-white px-8 py-3 text-[15px] font-medium text-black shadow-[0_4px_24px_rgba(15,79,79,0.06)] transition-colors hover:bg-brand/5 md:text-[20px]"
          >
            {t("showMoreCatalog")}
          </Link>
        </div>
      )}
    </>
  );
}
