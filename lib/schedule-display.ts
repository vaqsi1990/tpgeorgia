import type { AppLocale } from "@/i18n/routing";
import {
  GEORGIA_IANA_TIME_ZONE,
  getGeorgiaCalendarDate,
} from "@/lib/georgia-time";

export { GEORGIA_IANA_TIME_ZONE, getGeorgiaCalendarDate };

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function resolveLocaleTag(locale: AppLocale): string {
  if (locale === "ka") return "ka-GE";
  if (locale === "ru") return "ru-RU";
  if (locale === "zh") return "zh-CN";
  return "en-GB";
}

function parseDateParts(date: string): {
  year: number;
  month: number;
  day: number;
} | null {
  if (!DATE_PATTERN.test(date)) {
    return null;
  }

  const [year, month, day] = date.split("-").map(Number);
  return { year, month, day };
}

function formatGeorgiaCalendarDate(
  date: string,
  locale: AppLocale,
): string | null {
  const parts = parseDateParts(date);
  if (!parts) {
    return null;
  }

  const anchorMs = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    12 - 4,
    0,
    0,
  );

  return new Intl.DateTimeFormat(resolveLocaleTag(locale), {
    dateStyle: "long",
    timeZone: GEORGIA_IANA_TIME_ZONE,
  }).format(new Date(anchorMs));
}

export function formatScheduleEnd(
  endDate: string,
  endTime: string,
  locale: AppLocale = "ka",
): string {
  const formatted = formatGeorgiaCalendarDate(endDate, locale) ?? endDate;
  return `${formatted}, ${endTime}`;
}
