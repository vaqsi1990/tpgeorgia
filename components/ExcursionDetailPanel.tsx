"use client";

import CollapsibleDetailSection from "@/components/CollapsibleDetailSection";
import type { ExcursionContent } from "@/data/excursion-content/ka";
import { useTranslations } from "next-intl";

type ExcursionDetailPanelProps = {
  content: ExcursionContent;
  excursionId: string;
};

export default function ExcursionDetailPanel({
  content,
  excursionId,
}: ExcursionDetailPanelProps) {
  const t = useTranslations("Excursions");

  return (
    <div className="space-y-4 sm:space-y-5">
      <CollapsibleDetailSection
        title={t("highlightsTitle")}
        expandLabel={t("showMore")}
        collapseLabel={t("showLess")}
      >
        <ol className="space-y-3">
          {content.highlights.map((item, index) => (
            <li
              key={`${excursionId}-highlight-${index}`}
              className="flex items-start gap-4 rounded-2xl border border-black/6 bg-[#fafcfb] px-4 py-3.5 sm:px-5"
            >
              <span className="font-afacad flex size-8 shrink-0 items-center justify-center rounded-full bg-[#DC2626] text-sm font-semibold text-white">
                {index + 1}
              </span>
              <span className="pt-1 text-[16px] leading-relaxed text-black md:text-[18px]">
                {item}
              </span>
            </li>
          ))}
        </ol>
      </CollapsibleDetailSection>

      <CollapsibleDetailSection
        title={t("includesTitle")}
        expandLabel={t("showMore")}
        collapseLabel={t("showLess")}
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {content.includes.map((item, index) => (
            <li
              key={`${excursionId}-include-${index}`}
              className="flex items-start gap-3 rounded-2xl border border-[#991B1B] bg-[#DC2626] px-4 py-3 text-[15px] text-black/85"
            >
              <span
                className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#DC2626] text-[11px] text-white"
                aria-hidden
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </CollapsibleDetailSection>

      {content.optionalNote ? (
        <p className="rounded-2xl border border-dashed border-black/15 bg-black/[0.02] px-5 py-4 text-[15px] italic leading-relaxed text-black/70">
          {content.optionalNote}
        </p>
      ) : null}
    </div>
  );
}
