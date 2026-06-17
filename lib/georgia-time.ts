export const GEORGIA_IANA_TIME_ZONE = "Asia/Tbilisi";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/** Current calendar date in Georgia (YYYY-MM-DD). */
export function getGeorgiaCalendarDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: GEORGIA_IANA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/** Tomorrow's calendar date in Georgia (YYYY-MM-DD). */
export function getGeorgiaTomorrowDate(from: Date = new Date()): string {
  return addGeorgiaCalendarDays(getGeorgiaCalendarDate(from), 1);
}

/** Gregorian calendar-day addition for Georgia date strings. */
export function addGeorgiaCalendarDays(date: string, days: number): string {
  if (!DATE_PATTERN.test(date)) {
    return date;
  }

  const [year, month, day] = date.split("-").map(Number);
  const anchor = new Date(Date.UTC(year, month - 1, day + days));

  const y = anchor.getUTCFullYear();
  const m = String(anchor.getUTCMonth() + 1).padStart(2, "0");
  const d = String(anchor.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
