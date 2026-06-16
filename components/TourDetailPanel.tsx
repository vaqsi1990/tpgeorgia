"use client";

import CollapsibleDetailSection from "@/components/CollapsibleDetailSection";
import type { TourContent } from "@/data/tour-content";
import { useTranslations } from "next-intl";

type TourDetailPanelProps = {
  content: TourContent;
  tourId: string;
};

export default function TourDetailPanel({ content, tourId }: TourDetailPanelProps) {
  const t = useTranslations("Tours");

  return (
    <div className="space-y-4 sm:space-y-5">
      {content.subtitle ? (
        <p className="rounded-2xl border border-[#38ab8a]/20 bg-gradient-to-r from-[#38ab8a]/[0.07] to-transparent px-5 py-4 text-[16px] leading-[1.75] text-black md:text-[18px]">
          {content.subtitle}
        </p>
      ) : null}

      <CollapsibleDetailSection
        title={t("outlineTitle")}
        expandLabel={t("showMore")}
        collapseLabel={t("showLess")}
      >
        <ol className="space-y-3">
          {content.outline.map((item, index) => (
            <li
              key={`${tourId}-outline-${index}`}
              className="flex items-start gap-4 rounded-2xl border border-black/6 bg-[#fafcfb] px-4 py-3.5 sm:px-5"
            >
              <span className="font-afacad flex size-8 shrink-0 items-center justify-center rounded-full bg-[#38ab8a] text-sm font-semibold text-white">
                {index + 1}
              </span>
              <span className="pt-1 text-[16px] leading-relaxed text-black md:text-[18px]">
                {item}
              </span>
            </li>
          ))}
        </ol>
      </CollapsibleDetailSection>

      {content.sections.length > 0 ? (
        <CollapsibleDetailSection
          title={t("programTitle")}
          expandLabel={t("showMore")}
          collapseLabel={t("showLess")}
        >
          <div className="space-y-6">
            {content.sections.map((section, sectionIndex) => (
              <div key={`${tourId}-section-${sectionIndex}`}>
                {content.sections.length > 1 && section.title ? (
                  <h4 className="font-afacad mb-3 text-[17px] font-semibold text-[#0f4f4f] sm:text-lg">
                    {section.title}
                  </h4>
                ) : null}
                <div className="space-y-3">
                  {section.days.map((day, dayIndex) => (
                    <div
                      key={`${tourId}-day-${sectionIndex}-${dayIndex}`}
                      className="relative overflow-hidden rounded-2xl border border-black/8 bg-[#fafcfb] py-4 pl-5 pr-4 sm:pl-6 sm:pr-5"
                    >
                      <span
                        className="absolute inset-y-3 left-0 w-1 rounded-full bg-[#38ab8a]"
                        aria-hidden
                      />
                      {day.label ? (
                        <p className="mb-2 text-[16px] font-semibold text-[#0f4f4f] md:text-[18px]">
                          {day.label}
                        </p>
                      ) : null}
                      <p className="text-[16px] leading-[1.8] text-black/80 md:text-[18px]">
                        {day.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleDetailSection>
      ) : null}

      <CollapsibleDetailSection
        title={t("includesTitle")}
        expandLabel={t("showMore")}
        collapseLabel={t("showLess")}
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {content.includes.map((item, index) => (
            <li
              key={`${tourId}-include-${index}`}
              className="flex items-start gap-3 rounded-2xl border border-[#38ab8a]/15 bg-[#38ab8a]/[0.05] px-4 py-3 text-[15px] text-black/85"
            >
              <span
                className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#38ab8a] text-[11px] text-white"
                aria-hidden
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </CollapsibleDetailSection>

      {content.highlights && content.highlights.length > 0 ? (
        <CollapsibleDetailSection
          title={t("highlightsTitle")}
          expandLabel={t("showMore")}
          collapseLabel={t("showLess")}
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {content.highlights.map((item, index) => (
              <li
                key={`${tourId}-highlight-${index}`}
                className="flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/60 px-4 py-3 text-[15px] text-black/85"
              >
                <span
                  className="mt-2 size-2 shrink-0 rounded-full bg-amber-400"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </CollapsibleDetailSection>
      ) : null}

      {content.clothingNote ? (
        <p className="rounded-2xl border border-dashed border-black/15 bg-black/[0.02] px-5 py-4 text-[15px] italic leading-relaxed text-black/70">
          {t("clothingNote", { note: content.clothingNote })}
        </p>
      ) : null}
    </div>
  );
}
