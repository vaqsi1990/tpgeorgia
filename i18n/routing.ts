import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ka", "en", "ru", "zh"],
  defaultLocale: "ka",
});
export type AppLocale = (typeof routing.locales)[number];

export const localeLabels: Record<(typeof routing.locales)[number], string> = {
  en: "English",
  ka: "ქართული",
  ru: "Русский",
  zh: "中文",
};

/** ISO 3166-1 alpha-2 codes for flag display */
export const localeCountries: Record<(typeof routing.locales)[number], string> = {
  en: "US",
  ka: "GE",
  ru: "RU",
  zh: "CN",
};

