import { excursionContentEn } from "@/data/excursion-content/en";
import { excursionContentKa } from "@/data/excursion-content/ka";
import { excursionContentRu } from "@/data/excursion-content/ru";
import { excursionContentZh } from "@/data/excursion-content/zh";
import type { ExcursionContent } from "@/data/excursion-content";
import { excursionMeta } from "@/data/excursions";
import { routing, type AppLocale } from "@/i18n/routing";
import type { StoredExcursionInput } from "@/lib/admin-types";

const excursionContentByLocale: Record<
  AppLocale,
  Record<string, ExcursionContent>
> = {
  ka: excursionContentKa,
  en: excursionContentEn,
  ru: excursionContentRu,
  zh: excursionContentZh,
};

export function buildSeedExcursions(): Array<StoredExcursionInput & { id: string }> {
  return excursionMeta.map((meta) => ({
    id: meta.id,
    destinations: [],
    meta: {
      durationKey: meta.durationKey,
      priceFrom: meta.priceFrom,
      grades: meta.grades,
      popular: meta.popular,
    },
    content: Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        excursionContentByLocale[locale][meta.id],
      ]),
    ) as Record<AppLocale, ExcursionContent>,
  }));
}
