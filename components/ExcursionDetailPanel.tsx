"use client";

import type { ExcursionContent } from "@/data/excursion-content/ka";
import { useTranslations } from "next-intl";

type ExcursionDetailPanelProps = {
  content: ExcursionContent;
  excursionId: string;
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 flex items-center gap-2 text-[16px] font-semibold text-black sm:text-[17px]">
      <span className="size-2 shrink-0 rounded-full bg-[#38ab8a]" aria-hidden />
      {children}
    </h3>
  );
}

export default function ExcursionDetailPanel({
  content,
  excursionId,
}: ExcursionDetailPanelProps) {
  const t = useTranslations("Excursions");

  return (
    <div className="space-y-7 pb-2">
      <section>
        <SectionTitle>{t("highlightsTitle")}</SectionTitle>
        <ul className="space-y-2">
          {content.highlights.map((item, index) => (
            <li
              key={`${excursionId}-highlight-${index}`}
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

      <section>
        <SectionTitle>{t("includesTitle")}</SectionTitle>
        <ul className="grid gap-2 sm:grid-cols-2">
          {content.includes.map((item, index) => (
            <li
              key={`${excursionId}-include-${index}`}
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

      {content.optionalNote ? (
        <p className="rounded-2xl border border-dashed border-black/15 bg-black/[0.02] px-4 py-3 text-[15px] italic text-black/75">
          {content.optionalNote}
        </p>
      ) : null}
    </div>
  );
}
