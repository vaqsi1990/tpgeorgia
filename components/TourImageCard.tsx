"use client";

import type { TourContent } from "@/data/tour-content";
import type { TourMeta } from "@/data/tours";
import { useTranslations } from "next-intl";

const FALLBACK_IMAGES = ["/images/1.png", "/images/2.png", "/images/3.png"] as const;

type TourImageCardProps = {
  tour: TourMeta;
  content: TourContent;
  imageSrc: string;
  index: number;
  stretchCard: boolean;
  onOpenDetails: () => void;
};

export default function TourImageCard({
  tour,
  content,
  imageSrc,
  index,
  stretchCard,
  onOpenDetails,
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

  return (
    <article
      className={`group relative flex w-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_4px_24px_rgba(15,79,79,0.06)] transition-[box-shadow] hover:shadow-[0_8px_32px_rgba(15,79,79,0.12)] ${
        stretchCard ? "h-full" : ""
      }`}
    >
      {tour.popular ? (
        <span
          className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full bg-amber-400 text-center text-[9px] font-bold uppercase leading-none tracking-wide text-black shadow-[0_2px_8px_rgba(245,158,11,0.4)] ring-2 ring-white sm:size-11 sm:text-[10px]"
          aria-label={t("popularBadge")}
        >
          {t("popularBadge")}
        </span>
      ) : null}

      <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
        <img
          src={imageSrc || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]}
          alt={content.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"
          aria-hidden
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-[14px] font-medium text-white backdrop-blur-sm md:text-[15px]">
          {durationLabel}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="font-afacad text-xl font-semibold leading-snug text-white sm:text-2xl">
            {content.title}
          </h3>
          <p className="mt-1 text-[14px] font-medium text-white/85 md:text-[15px]">
            {content.routeLabel}
          </p>
        </div>
      </div>

      <div
        className={`flex flex-col px-4 py-4 sm:px-5 sm:py-5 ${stretchCard ? "flex-1" : ""}`}
      >
        {content.subtitle ? (
          <p className="mb-3 line-clamp-2 text-[15px] text-black/70 md:text-[16px]">
            {content.subtitle}
          </p>
        ) : null}

        <div className="mb-4 flex items-center justify-between gap-3 border-b border-black/10 pb-3 text-[15px] md:text-[16px]">
          {tour.startTime ? (
            <span className="text-black/70">
              {t("startTime")}:{" "}
              <span className="font-medium text-black">{tour.startTime}</span>
            </span>
          ) : (
            <span />
          )}
          <span className="font-semibold text-black">{priceLabel}</span>
        </div>

        <button
          type="button"
          onClick={onOpenDetails}
          className={`w-full cursor-pointer rounded-xl border border-black bg-[#38ab8a] py-2.5 text-[16px] font-medium text-white transition-colors hover:bg-[#2f9a7c] md:text-[18px] ${
            stretchCard ? "mt-auto" : ""
          }`}
        >
          {t("showMore")}
        </button>
      </div>
    </article>
  );
}

export function getTourCoverImage(images: string[], index: number): string {
  const cover = images.find((url) => url && url.trim() !== "");
  return cover ?? FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}
