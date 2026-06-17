export const GEORGIA_IANA_TIME_ZONE = "Asia/Tbilisi";

/** Current calendar date in Georgia (YYYY-MM-DD). */
export function getGeorgiaCalendarDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: GEORGIA_IANA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
