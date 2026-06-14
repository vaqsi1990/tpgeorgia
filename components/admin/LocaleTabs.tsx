"use client";

import { localeLabels, routing, type AppLocale } from "@/i18n/routing";

type LocaleTabsProps = {
  active: AppLocale;
  onChange: (locale: AppLocale) => void;
};

export default function LocaleTabs({ active, onChange }: LocaleTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {routing.locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => onChange(locale)}
          className={`rounded-lg px-3 py-1.5 text-[15px] font-medium transition-colors ${
            active === locale
              ? "bg-[#38ab8a] text-white"
              : "border border-black/10 bg-white text-black/70 hover:bg-brand/5"
          }`}
        >
          {localeLabels[locale]}
        </button>
      ))}
    </div>
  );
}
