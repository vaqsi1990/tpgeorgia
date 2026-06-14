"use client";

import type { TourContent } from "@/data/tour-content";
import type { TourMeta } from "@/data/tours";
import { useTranslations } from "next-intl";

type Props = {
  tour: TourMeta;
  content: TourContent;
  index: number;
  stretchCard: boolean;
  onOpenDetails: () => void;
};

export default function TourCard({
  tour,
  content,
  index,
  stretchCard,
  onOpenDetails,
}: Props) {
  const t = useTranslations("Tours");

  const priceLabel =
    tour.priceFrom > 0
      ? t("priceFrom", { price: tour.priceFrom })
      : t("priceOnRequest");

  const durationLabel =
    tour.durationKey === "11nights12days"
      ? t("durationDays", { days: 12, nights: 11 })
      : t(`durations.${tour.durationKey}` as const);

  const previewOutline = content.outline.slice(0, 3);

  return (
    <article
      className={`relative flex w-full flex-col rounded-2xl border border-black/10 bg-white shadow-[0_4px_24px_rgba(15,79,79,0.06)] transition-[box-shadow] hover:shadow-[0_8px_32px_rgba(15,79,79,0.1)] ${
        stretchCard ? "h-full" : ""
      }`}
    >
      {tour.popular ? (
        <span
          className="absolute -right-1.5 -top-4 z-10 flex size-10 items-center justify-center rounded-full bg-amber-400 text-center text-[9px] font-bold uppercase leading-none tracking-wide text-black shadow-[0_2px_8px_rgba(245,158,11,0.4)] ring-2 ring-white sm:size-11 sm:text-[10px]"
          aria-label={t("popularBadge")}
        >
          {t("popularBadge")}
        </span>
      ) : null}

      <div className="flex shrink-0 items-center justify-between rounded-t-2xl bg-[#38ab8a] px-5 py-3 sm:px-6">
        <span className="font-afacad text-lg font-semibold text-white/90">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="rounded-full bg-white/15 px-3 py-1 text-[16px] font-medium text-white md:text-[18px]">
          {durationLabel}
        </span>
      </div>

      <div
        className={`flex flex-col px-5 py-5 sm:px-6 sm:py-6 ${stretchCard ? "flex-1" : ""}`}
      >
        <h3 className="font-afacad mb-1 text-xl font-semibold leading-snug text-black">
          {content.title}
        </h3>
        <p className="mb-2 text-[15px] font-medium text-[#38ab8a] md:text-[16px]">
          {content.routeLabel}
        </p>
        {content.subtitle ? (
          <p className="mb-4 line-clamp-2 text-[15px] text-black/70 md:text-[16px]">
            {content.subtitle}
          </p>
        ) : null}

        <dl className="mb-4 grid gap-2 text-[16px] md:text-[18px]">
          {tour.startTime ? (
            <div className="flex justify-between gap-3 border-b border-black pb-2">
              <dt className="text-black">{t("startTime")}</dt>
              <dd className="text-right font-medium text-black">
                {tour.startTime}
              </dd>
            </div>
          ) : null}
          <div className="flex justify-between gap-3 border-b border-black pb-2">
            <dt className="text-black">{t("duration")}</dt>
            <dd className="text-right font-medium text-black">{durationLabel}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-black">{t("price")}</dt>
            <dd className="text-right font-semibold text-black">{priceLabel}</dd>
          </div>
        </dl>

        {previewOutline.length > 0 ? (
          <div className="mb-4">
            <h4 className="mb-2 text-[16px] font-semibold text-black">
              {t("outlineTitle")}
            </h4>
            <ul className="space-y-1.5">
              {previewOutline.map((item, i) => (
                <li
                  key={`${tour.id}-outline-${i}`}
                  className="flex items-start gap-2 text-[15px] text-black/80 md:text-[16px]"
                >
                  <span
                    className="mt-2 size-2 shrink-0 rounded-full bg-[#38ab8a] ring-[3px] ring-[#38ab8a]/25"
                    aria-hidden
                  />
                  <span className="line-clamp-2">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <button
          type="button"
          onClick={onOpenDetails}
          className={`w-full cursor-pointer rounded-xl border border-black bg-[#38ab8a] py-2.5 text-[16px] font-medium text-white transition-colors hover:bg-[#2f9a7c] md:text-[18px] ${
            stretchCard ? "mt-auto" : "mt-4"
          }`}
        >
          {t("showMore")}
        </button>
      </div>
    </article>
  );
}
