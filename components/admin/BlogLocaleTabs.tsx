"use client";

import { blogLocales, type BlogLocale } from "@/lib/blog-types";
import { localeLabels } from "@/i18n/routing";

type BlogLocaleTabsProps = {
  active: BlogLocale;
  onChange: (locale: BlogLocale) => void;
};

export default function BlogLocaleTabs({ active, onChange }: BlogLocaleTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {blogLocales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => onChange(locale)}
          className={`rounded-lg px-3 py-1.5 text-[16px] font-medium transition-colors md:text-[18px] ${
            active === locale
              ? "bg-[#DC2626] text-white"
              : "border border-black/10 bg-white text-black hover:bg-brand/5"
          }`}
        >
          {localeLabels[locale]}
        </button>
      ))}
    </div>
  );
}
