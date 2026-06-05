import type { ExcursionId } from "@/data/excursions";
import { excursionContentKa, type ExcursionContent } from "./ka";

const contentByLocale: Record<string, Record<ExcursionId, ExcursionContent>> = {
  ka: excursionContentKa,
  en: excursionContentKa,
  ru: excursionContentKa,
  zh: excursionContentKa,
};

export function getExcursionContent(
  locale: string,
  id: ExcursionId,
): ExcursionContent {
  const catalog = contentByLocale[locale] ?? excursionContentKa;
  return catalog[id];
}
