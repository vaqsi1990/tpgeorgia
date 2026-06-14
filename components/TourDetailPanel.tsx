"use client";

import type { TourContent } from "@/data/tour-content";
import { useTranslations } from "next-intl";

type TourDetailPanelProps = {
  content: TourContent;
  tourId: string;
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 flex items-center gap-2 text-[16px] font-semibold text-black sm:text-[17px]">
      <span className="size-2 shrink-0 rounded-full bg-[#38ab8a]" aria-hidden />
      {children}
    </h3>
  );
}

export default function TourDetailPanel({ content, tourId }: TourDetailPanelProps) {
  const t = useTranslations("Tours");

  return (
    <div className="space-y-7 pb-2">
      {content.subtitle ? (
        <p className="rounded-2xl border border-[#38ab8a]/15 bg-[#38ab8a]/[0.05] px-4 py-3.5 text-[15px] leading-[1.7] text-black/80 sm:text-[16px]">
          {content.subtitle}
        </p>
      ) : null}

      <section>
        <SectionTitle>{t("outlineTitle")}</SectionTitle>
        <ul className="space-y-2">
          {content.outline.map((item, index) => (
            <li
              key={`${tourId}-outline-${index}`}
              className="flex items-start gap-3 rounded-xl border border-black/6 bg-white px-4 py-3 text-[15px] text-black/85 sm:text-[16px]"
            >
              <span
                className="mt-2 size-2 shrink-0 rounded-full bg-[#38ab8a] ring-[3px] ring-[#38ab8a]/20"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {content.sections.map((section, sectionIndex) => (
        <section key={`${tourId}-section-${sectionIndex}`}>
          <SectionTitle>{section.title}</SectionTitle>
          <div className="space-y-3">
            {section.days.map((day, dayIndex) => (
              <div
                key={`${tourId}-day-${sectionIndex}-${dayIndex}`}
                className="rounded-2xl border border-black/8 bg-gradient-to-br from-brand/[0.04] to-transparent px-4 py-3.5"
              >
                {day.label ? (
                  <p className="mb-1.5 text-[15px] font-semibold text-[#0f4f4f] sm:text-[16px]">
                    {day.label}
                  </p>
                ) : null}
                <p className="text-[15px] leading-[1.75] text-black/80 sm:text-[16px]">
                  {day.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section>
        <SectionTitle>{t("includesTitle")}</SectionTitle>
        <ul className="grid gap-2 sm:grid-cols-2">
          {content.includes.map((item, index) => (
            <li
              key={`${tourId}-include-${index}`}
              className="flex items-start gap-2.5 rounded-xl border border-[#38ab8a]/15 bg-[#38ab8a]/[0.06] px-3.5 py-2.5 text-[15px] text-black/85"
            >
              <span className="mt-0.5 shrink-0 text-[#38ab8a]" aria-hidden>
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {content.highlights && content.highlights.length > 0 ? (
        <section>
          <SectionTitle>{t("highlightsTitle")}</SectionTitle>
          <ul className="space-y-2">
            {content.highlights.map((item, index) => (
              <li
                key={`${tourId}-highlight-${index}`}
                className="flex items-start gap-2.5 text-[15px] text-black/85 sm:text-[16px]"
              >
                <span className="mt-2 size-2 shrink-0 rounded-full bg-amber-400" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {content.clothingNote ? (
        <p className="rounded-2xl border border-dashed border-black/15 bg-black/[0.02] px-4 py-3 text-[15px] italic text-black/75">
          {t("clothingNote", { note: content.clothingNote })}
        </p>
      ) : null}
    </div>
  );
}
