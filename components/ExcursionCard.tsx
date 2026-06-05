"use client";

import type { ExcursionContent } from "@/data/excursion-content/ka";
import type { ExcursionMeta } from "@/data/excursions";
import { useTranslations } from "next-intl";

type Props = {
  excursion: ExcursionMeta;
  content: ExcursionContent;
  index: number;
  isOpen: boolean;
  stretchCard: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export default function ExcursionCard({
  excursion,
  content,
  index,
  isOpen,
  stretchCard,
  onOpen,
  onClose,
}: Props) {
  const t = useTranslations("Excursions");

  const priceLabel =
    excursion.priceFrom > 0
      ? t("priceFrom", { price: excursion.priceFrom })
      : t("priceOnRequest");

  return (
    <article
      className={`flex w-full flex-col rounded-2xl border border-black/10 bg-white shadow-[0_4px_24px_rgba(15,79,79,0.06)] transition-[box-shadow] hover:shadow-[0_8px_32px_rgba(15,79,79,0.1)] ${
        stretchCard && !isOpen ? "h-full" : ""
      }`}
    >
      <div className="bg-brand flex shrink-0 items-center justify-between rounded-t-2xl px-5 py-3 sm:px-6">
        <span className="font-afacad text-lg font-semibold text-white/90">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="rounded-full bg-white/15 px-3 py-1 text-[16px] font-medium text-white">
          {excursion.grades} {t("grade")}
        </span>
      </div>

      <div
        className={`flex flex-col px-5 py-5 sm:px-6 sm:py-6 ${stretchCard && !isOpen ? "flex-1" : ""}`}
      >
        <h3 className="font-afacad mb-4 text-xl font-semibold leading-snug text-black">
          {content.title}
        </h3>

        <dl className="mb-4 grid gap-2 text-[16px]">
          <div className="flex justify-between gap-3 border-b border-black pb-2">
            <dt className="text-black">{t("duration")}</dt>
            <dd className="text-right font-medium text-black">
              {t(`durations.${excursion.durationKey}` as const)}
            </dd>
          </div>
          <div className="flex justify-between gap-3 border-b border-black pb-2">
            <dt className="text-black">{t("type")}</dt>
            <dd className="text-right font-medium text-black">{t("cultural")}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-black">{t("price")}</dt>
            <dd className="text-right font-semibold text-black">{priceLabel}</dd>
          </div>
        </dl>

       

        {isOpen ? (
          <div
            id={`excursion-details-${excursion.id}`}
            className="excursion-details-open mt-4 space-y-4 border-t border-black pt-4"
          >
            <div>
              <h4 className="mb-2 text-[16px] font-semibold text-black">
                {t("highlightsTitle")}
              </h4>
              <ul className="space-y-1.5">
                {content.highlights.map((item, i) => (
                  <li
                    key={`${excursion.id}-highlight-${i}`}
                    className="flex items-start gap-2 text-[16px] text-black"
                  >
                    <span className="mt-0.5 shrink-0" aria-hidden>
                      📍
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-2 text-[16px] font-semibold text-black">
                {t("includesTitle")}
              </h4>
              <ul className="space-y-1.5">
                {content.includes.map((item, i) => (
                  <li
                    key={`${excursion.id}-include-${i}`}
                    className="flex items-start gap-2 text-[16px] text-black"
                  >
                    <span className="mt-0.5 shrink-0 font-semibold" aria-hidden>
                      ✔
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {content.optionalNote && (
              <p className="text-[16px] italic text-black">
                {content.optionalNote}
              </p>
            )}
          </div>
        ) : null}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (isOpen) onClose();
            else onOpen();
          }}
          className={`w-full rounded-xl cursor-pointer border border-black py-2.5 text-[16px] font-medium text-black transition-colors hover:bg-brand/5 ${isOpen ? "mt-4" : stretchCard ? "mt-auto" : "mt-4"}`}
          aria-expanded={isOpen}
          aria-controls={`excursion-details-${excursion.id}`}
        >
          {isOpen ? t("showLess") : t("showMore")}
        </button>
      </div>
    </article>
  );
}
