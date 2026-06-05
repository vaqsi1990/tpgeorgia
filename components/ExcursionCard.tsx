"use client";

import type { ExcursionContent } from "@/data/excursion-content/ka";
import type { ExcursionId, ExcursionMeta } from "@/data/excursions";
import { useTranslations } from "next-intl";

type Props = {
  excursion: ExcursionMeta;
  content: ExcursionContent;
  index: number;
  isActive: boolean;
  onToggle: (id: ExcursionId) => void;
};

export default function ExcursionCard({
  excursion,
  content,
  index,
  isActive,
  onToggle,
}: Props) {
  const t = useTranslations("Excursions");

  const priceLabel =
    excursion.priceFrom > 0
      ? t("priceFrom", { price: excursion.priceFrom })
      : t("priceOnRequest");

  return (
    <article
      className={`flex w-full flex-col rounded-2xl border border-black/10 bg-white shadow-[0_4px_24px_rgba(15,79,79,0.06)] transition-shadow hover:shadow-[0_8px_32px_rgba(15,79,79,0.1)] ${
        isActive ? "h-auto" : "h-full"
      }`}
    >
      <div className="bg-brand flex items-center justify-between rounded-t-2xl px-5 py-3 sm:px-6">
        <span className="font-afacad text-lg font-semibold text-white/90">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="rounded-full bg-white/15 px-3 py-1 text-[16px] font-medium text-white">
          {excursion.grades} {t("grade")}
        </span>
      </div>

      <div
        className={`flex flex-col px-5 py-5 sm:px-6 sm:py-6 ${isActive ? "" : "flex-1"}`}
      >
        <h3 className="font-afacad mb-4 text-xl font-semibold leading-snug text-black">
          {content.title}
        </h3>

        <dl className="mb-4 grid gap-2 text-[16px]">
          <div className="flex justify-between gap-3 border-b border-black/5 pb-2">
            <dt className="text-black">{t("duration")}</dt>
            <dd className="text-right font-medium text-black">
              {t(`durations.${excursion.durationKey}` as const)}
            </dd>
          </div>
          <div className="flex justify-between gap-3 border-b border-black/5 pb-2">
            <dt className="text-black">{t("type")}</dt>
            <dd className="text-right font-medium text-black">{t("cultural")}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-black">{t("price")}</dt>
            <dd className="text-right font-semibold text-black">{priceLabel}</dd>
          </div>
        </dl>

        <p className="mb-4 text-[16px] text-black">{t("priceNote")}</p>

        <div
          id={`excursion-details-${excursion.id}`}
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
            isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
          aria-hidden={!isActive}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="space-y-4 border-t border-black/10 pt-4 pb-4">
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
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggle(excursion.id)}
          className={`w-full rounded-xl border border-brand/20 py-2.5 text-[16px] font-medium text-black transition-colors hover:bg-brand/5 ${isActive ? "mt-4" : "mt-auto"}`}
          aria-expanded={isActive}
          aria-controls={`excursion-details-${excursion.id}`}
        >
          {isActive ? t("showLess") : t("showMore")}
        </button>
      </div>
    </article>
  );
}
