"use client";

import { useId, useState, type ReactNode } from "react";

type CollapsibleDetailSectionProps = {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  expandLabel: string;
  collapseLabel: string;
};

export default function CollapsibleDetailSection({
  title,
  children,
  defaultOpen = false,
  expandLabel,
  collapseLabel,
}: CollapsibleDetailSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <section className="overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_2px_16px_rgba(15,79,79,0.04)]">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-black/[0.02] sm:px-6 sm:py-5"
      >
        <span className="font-afacad flex min-w-0 items-center gap-3 text-xl font-semibold text-[#0f4f4f] sm:text-[22px]">
          <span
            className="h-6 w-1 shrink-0 rounded-full bg-[#DC2626]"
            aria-hidden
          />
          <span className="min-w-0">{title}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5 text-[16px] md:text-[18px] font-medium text-[#38ab8a] ">
          <span className="hidden sm:inline">
            {open ? collapseLabel : expandLabel}
          </span>
          <svg
            viewBox="0 0 24 24"
            className={`size-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-black/6 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
