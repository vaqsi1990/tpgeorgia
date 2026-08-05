"use client";

import CatalogCardHeroImage from "@/components/CatalogCardHeroImage";
import type { TourContent } from "@/data/tour-content";
import type { TourMeta } from "@/data/tours";
import type { ItemReviewStats } from "@/lib/review-stats-types";
import { Link } from "@/i18n/navigation";
import StarRating from "@/components/StarRating";
import { useTranslations } from "next-intl";

type TourImageCardProps = {
  tour: TourMeta;
  content: TourContent;
  images: string[];
  index: number;
  stretchCard: boolean;
  href: string;
  reviewStats?: ItemReviewStats;
  showTopBadge?: boolean;
};

export default function TourImageCard({
  tour,
  content,
  images,
  index,
  stretchCard,
  href,
  reviewStats,
  showTopBadge = tour.popular,
}: TourImageCardProps) {
  const t = useTranslations("Tours");

  const priceLabel =
    tour.priceFrom > 0
      ? t("priceFrom", { price: tour.priceFrom })
      : t("priceOnRequest");

  const durationLabel =
    tour.durationKey === "11nights12days"
      ? t("durationDays", { days: 12, nights: 11 })
      : t(`durations.${tour.durationKey}` as const);

  const outline = content.outline
    .filter((item) => item.trim().length > 0)
    .slice(0, 4);

  return (
    <article
      className={`group relative flex w-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_4px_24px_rgba(15,79,79,0.06)] transition-[box-shadow] hover:shadow-[0_8px_32px_rgba(15,79,79,0.12)] ${
        stretchCard ? "h-full" : ""
      }`}
    >
      {showTopBadge ? (
        <span
          className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full bg-amber-400 text-center text-[9px] font-bold uppercase leading-none tracking-wide text-black shadow-[0_2px_8px_rgba(245,158,11,0.4)]  sm:size-11 sm:text-[10px]"
          aria-label={t("popularBadge")}
        >
          {t("popularBadge")}
        </span>
      ) : null}
      {tour.exclusive ? (
        <span
          className="absolute left-3 top-3 z-10 inline-flex max-w-[calc(100%-5.5rem)] items-center justify-center rounded-full bg-amber-400 px-3.5 py-2 text-center text-[9px] font-bold uppercase leading-tight tracking-wide text-black shadow-[0_2px_8px_rgba(245,158,11,0.4)]  sm:px-4 sm:py-2.5 sm:text-[10px]"
          aria-label={t("exclusiveBadge")}
        >
          {t("exclusiveBadge")}
        </span>
      ) : null}

      <Link href={href} className="relative block aspect-square shrink-0 overflow-hidden">
        <CatalogCardHeroImage images={images} alt={content.title} index={index} />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15"
          aria-hidden
        />
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
          <span className="mb-2 w-fit rounded-full bg-white/20 px-3 py-1 text-[14px] font-medium text-white backdrop-blur-sm md:text-[15px]">
            {durationLabel}
          </span>
          <h3 className="line-clamp-3 font-afacad text-xl font-semibold leading-snug text-white sm:text-2xl">
            {content.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-[14px] font-medium text-white/85 md:text-[15px]">
            {content.routeLabel}
          </p>
        </div>
      </Link>

      <div
        className={`flex flex-col px-4 py-4 sm:px-5 sm:py-5 ${stretchCard ? "flex-1" : ""}`}
      >
        {content.subtitle ? (
          <p className="mb-3 line-clamp-2 text-[15px] text-black/70 md:text-[16px]">
            {content.subtitle}
          </p>
        ) : null}

        {reviewStats && reviewStats.reviewCount > 0 ? (
          <div className="mb-3">
            <StarRating
              value={reviewStats.averageRating}
              size="sm"
              showValue
              reviewCount={reviewStats.reviewCount}
            />
          </div>
        ) : null}

        <div className="mb-4 flex items-start justify-between gap-3 border-b border-black/10 pb-3 text-[16px] md:text-[18px]">
          {tour.startTime ? (
            <span className="text-black/70">
              {t("startTime")}:{" "}
              <span className="font-medium text-black">{tour.startTime}</span>
            </span>
          ) : (
            <span />
          )}
          <span className="shrink-0 whitespace-nowrap text-right font-semibold text-black">
            {priceLabel}
          </span>
        </div>

        {outline.length > 0 ? (
          <div className="mb-4">
            <h4 className="mb-2 text-[16px] md:text-[18px] font-semibold text-black">
              {t("outlineTitle")}
            </h4>
            <ul className="space-y-1.5">
              {outline.map((item, i) => (
                <li
                  key={`${tour.id}-outline-${i}`}
                  className="flex items-start gap-2 text-[16px] text-black/80 md:text-[18px]"
                >
                  <span
                    className="mt-2 size-2 shrink-0 rounded-full bg-[#DC2626] ring-[3px] ring-[#DC2626]/25"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <Link
          href={href}
          className={`w-full rounded-xl border border-[#991B1B] bg-[#DC2626] py-2.5 text-center text-[16px] font-medium text-white transition-colors  md:text-[18px] ${
            stretchCard ? "mt-auto" : ""
          }`}
        >
          {t("showMore")}
        </Link>
      </div>
    </article>
  );
}
