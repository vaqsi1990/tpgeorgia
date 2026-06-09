"use client";

import type { TourContent } from "@/data/tour-content";
import type { TourMeta } from "@/data/tours";
import { useTranslations } from "next-intl";

type Props = {
  tour: TourMeta;
  content: TourContent;
  index: number;
  isOpen: boolean;
  stretchCard: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export default function TourCard({
  tour,
  content,
  index,
  isOpen,
  stretchCard,
  onOpen,
  onClose,
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

  return (
    <article
      className={`flex w-full flex-col rounded-2xl border border-black/10 bg-white shadow-[0_4px_24px_rgba(15,79,79,0.06)] transition-[box-shadow] hover:shadow-[0_8px_32px_rgba(15,79,79,0.1)] ${
        stretchCard && !isOpen ? "h-full" : ""
      }`}
    >
      <div className="flex shrink-0 items-center justify-between rounded-t-2xl bg-[#38ab8a] px-5 py-3 sm:px-6">
        <span className="font-afacad text-lg font-semibold text-white/90">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="rounded-full bg-white/15 px-3 py-1 text-[16px] font-medium text-white md:text-[18px]">
          {durationLabel}
        </span>
      </div>

      <div
        className={`flex flex-col px-5 py-5 sm:px-6 sm:py-6 ${stretchCard && !isOpen ? "flex-1" : ""}`}
      >
        <h3 className="font-afacad mb-1 text-xl font-semibold leading-snug text-black">
          {content.title}
        </h3>
        <p className="mb-2 text-[15px] font-medium text-[#38ab8a] md:text-[16px]">
          {content.routeLabel}
        </p>
        {content.subtitle ? (
          <p className="mb-4 text-[15px] text-black/70 md:text-[16px]">
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
          <div className="flex justify-between gap-3 border-b border-black pb-2">
            <dt className="text-black">{t("price")}</dt>
            <dd className="text-right font-semibold text-black">{priceLabel}</dd>
          </div>
          {tour.minPeople > 0 ? (
            <div className="flex justify-between gap-3">
              <dt className="text-black">{t("minPeople")}</dt>
              <dd className="text-right font-medium text-black">
                {t("minPeopleValue", { count: tour.minPeople })}
              </dd>
            </div>
          ) : null}
        </dl>

        <div className="mb-4">
          <h4 className="mb-2 text-[16px] font-semibold text-black">
            {t("outlineTitle")}
          </h4>
          <ul className="space-y-1.5">
            {content.outline.map((item, i) => (
              <li
                key={`${tour.id}-outline-${i}`}
                className="flex items-start gap-2 text-[16px] text-black md:text-[18px]"
              >
                <span
                  className="mt-2.5 size-2 shrink-0 rounded-full bg-[#38ab8a] ring-[3px] ring-[#38ab8a]/25"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {isOpen ? (
          <div
            id={`tour-details-${tour.id}`}
            className="tour-details-open mt-4 space-y-5 border-t border-black pt-4"
          >
            {content.sections.map((section, si) => (
              <div key={`${tour.id}-section-${si}`}>
                <h4 className="mb-3 text-[16px] font-semibold text-black">
                  {section.title}
                </h4>
                <div className="space-y-3">
                  {section.days.map((day, di) => (
                    <div
                      key={`${tour.id}-day-${si}-${di}`}
                      className="rounded-xl border border-black/10 bg-brand/[0.03] px-4 py-3"
                    >
                      {day.label ? (
                        <p className="mb-1 text-[15px] font-semibold text-black md:text-[16px]">
                          {day.label}
                        </p>
                      ) : null}
                      <p className="text-[15px] leading-relaxed text-black/80 md:text-[16px]">
                        {day.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <h4 className="mb-2 text-[16px] font-semibold text-black">
                {t("includesTitle")}
              </h4>
              <ul className="space-y-1.5">
                {content.includes.map((item, i) => (
                  <li
                    key={`${tour.id}-include-${i}`}
                    className="flex items-start gap-2 text-[16px] text-black md:text-[18px]"
                  >
                    <span className="mt-0.5 shrink-0 font-semibold" aria-hidden>
                      ✔
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {content.highlights && content.highlights.length > 0 ? (
              <div>
                <h4 className="mb-2 text-[16px] font-semibold text-black">
                  {t("highlightsTitle")}
                </h4>
                <ul className="space-y-1.5">
                  {content.highlights.map((item, i) => (
                    <li
                      key={`${tour.id}-highlight-${i}`}
                      className="flex items-start gap-2 text-[16px] text-black md:text-[18px]"
                    >
                      <span
                        className="mt-0.5 shrink-0 font-semibold"
                        aria-hidden
                      >
                        ✔
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {content.clothingNote ? (
              <p className="text-[16px] italic text-black">
                {t("clothingNote", { note: content.clothingNote })}
              </p>
            ) : null}
          </div>
        ) : null}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (isOpen) onClose();
            else onOpen();
          }}
          className={`w-full cursor-pointer rounded-xl border border-black py-2.5 text-[16px] font-medium text-black transition-colors hover:bg-brand/5 md:text-[18px] ${isOpen ? "mt-4" : stretchCard ? "mt-auto" : "mt-4"}`}
          aria-expanded={isOpen}
          aria-controls={`tour-details-${tour.id}`}
        >
          {isOpen ? t("showLess") : t("showMore")}
        </button>
      </div>
    </article>
  );
}
