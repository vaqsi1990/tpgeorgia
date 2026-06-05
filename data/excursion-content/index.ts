import type { ExcursionId } from "@/data/excursions";
import { excursionContentEn } from "./en";
import { excursionContentKa } from "./ka";
import { excursionContentRu } from "./ru";
import { excursionContentZh } from "./zh";
import type { ExcursionContent } from "./ka";

const contentByLocale: Record<string, Record<ExcursionId, ExcursionContent>> = {
  ka: excursionContentKa,
  en: excursionContentEn,
  ru: excursionContentRu,
  zh: excursionContentZh,
};

export function getExcursionContent(
  locale: string,
  id: ExcursionId,
): ExcursionContent {
  const catalog = contentByLocale[locale] ?? excursionContentKa;
  return catalog[id];
}

export type { ExcursionContent };
