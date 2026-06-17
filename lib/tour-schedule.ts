import type { BookingPayload } from "@/lib/booking-inquiry";
import { getExcursionById, getTourById } from "@/lib/catalog-db";
import type { AppLocale } from "@/i18n/routing";

/**
 * Time model: all schedule values are Georgia local wall clock.
 * - `YYYY-MM-DD` = calendar date in Georgia
 * - `HH:mm` = clock time in Georgia (fixed UTC+4, no DST)
 *
 * Calendar math stays in the date/time string domain.
 * `Date.UTC` is used only as a Gregorian calendar engine and for epoch conversion.
 */

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

const DEFAULT_START_TIME = "09:00";
const FULL_DAY_HOURS = 10;
const GEORGIA_UTC_OFFSET_HOURS = 4;
const GEORGIA_IANA_TIME_ZONE = "Asia/Tbilisi";

export type TourScheduleInput = {
  preferredDate: string;
  durationKey: string;
  startTime?: string | null;
};

export type TourScheduleResult = {
  endDate: string;
  endTime: string;
};

type ParsedDuration =
  | { kind: "hours"; hours: number }
  | { kind: "days"; days: number };

type DateParts = { year: number; month: number; day: number };
type TimeParts = { hour: number; minute: number };

function normalizeStartTime(startTime?: string | null): string {
  if (startTime && TIME_PATTERN.test(startTime)) {
    return startTime;
  }
  return DEFAULT_START_TIME;
}

function parseDateParts(date: string): DateParts | null {
  if (!DATE_PATTERN.test(date)) {
    return null;
  }

  const [year, month, day] = date.split("-").map(Number);
  return { year, month, day };
}

function parseTimeParts(time: string): TimeParts | null {
  if (!TIME_PATTERN.test(time)) {
    return null;
  }

  const [hour, minute] = time.split(":").map(Number);
  return { hour, minute };
}

function formatDateParts(year: number, month: number, day: number): string {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseDurationKey(durationKey: string): ParsedDuration | null {
  const hoursMatch = durationKey.match(/^(\d+)hours$/);
  if (hoursMatch) {
    return { kind: "hours", hours: Number(hoursMatch[1]) };
  }

  if (durationKey === "fullDay") {
    return { kind: "hours", hours: FULL_DAY_HOURS };
  }

  const nightsDaysMatch = durationKey.match(/^(\d+)nights?(\d+)days$/);
  if (nightsDaysMatch) {
    return { kind: "days", days: Number(nightsDaysMatch[2]) };
  }

  return null;
}

/** Gregorian calendar-day addition (timezone-agnostic). */
function addCalendarDays(date: string, days: number): string {
  const parts = parseDateParts(date);
  if (!parts) {
    return date;
  }

  const anchor = new Date(
    Date.UTC(parts.year, parts.month - 1, parts.day + days),
  );

  return formatDateParts(
    anchor.getUTCFullYear(),
    anchor.getUTCMonth() + 1,
    anchor.getUTCDate(),
  );
}

/** Georgia wall-clock hour addition (may roll to the next calendar day). */
function addHoursToSchedule(date: string, time: string, hours: number) {
  const timeParts = parseTimeParts(time);
  if (!timeParts) {
    return { endDate: date, endTime: DEFAULT_START_TIME };
  }

  const totalMinutes = timeParts.hour * 60 + timeParts.minute + hours * 60;
  const dayOffset = Math.floor(totalMinutes / 1440);
  const remainder = ((totalMinutes % 1440) + 1440) % 1440;
  const endHour = Math.floor(remainder / 60);
  const endMinute = remainder % 60;

  return {
    endDate: addCalendarDays(date, dayOffset),
    endTime: `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`,
  };
}

/**
 * Georgia local wall clock -> UTC epoch ms.
 * Arithmetic only; no ISO string parsing.
 */
function georgiaLocalToUtcMs(date: string, time: string): number | null {
  const dateParts = parseDateParts(date);
  const timeParts = parseTimeParts(time);
  if (!dateParts || !timeParts) {
    return null;
  }

  let { year, month, day } = dateParts;
  let utcHour = timeParts.hour - GEORGIA_UTC_OFFSET_HOURS;

  if (utcHour < 0) {
    utcHour += 24;
    const previousDay = addCalendarDays(date, -1);
    const previousParts = parseDateParts(previousDay);
    if (!previousParts) {
      return null;
    }
    year = previousParts.year;
    month = previousParts.month;
    day = previousParts.day;
  }

  return Date.UTC(year, month - 1, day, utcHour, timeParts.minute, 0);
}

/** Noon Georgia on the stored calendar date — stable anchor for date-only labels. */
function georgiaCalendarDateAnchorMs(parts: DateParts): number {
  return Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    12 - GEORGIA_UTC_OFFSET_HOURS,
    0,
    0,
  );
}

function formatGeorgiaCalendarDate(
  date: string,
  locale: AppLocale,
): string | null {
  const parts = parseDateParts(date);
  if (!parts) {
    return null;
  }

  return new Intl.DateTimeFormat(resolveLocaleTag(locale), {
    dateStyle: "long",
    timeZone: GEORGIA_IANA_TIME_ZONE,
  }).format(new Date(georgiaCalendarDateAnchorMs(parts)));
}

export function calculateTourEnd(
  input: TourScheduleInput,
): TourScheduleResult | null {
  if (!parseDateParts(input.preferredDate)) {
    return null;
  }

  const duration = parseDurationKey(input.durationKey);
  if (!duration) {
    return null;
  }

  const startTime = normalizeStartTime(input.startTime);

  if (duration.kind === "hours") {
    return addHoursToSchedule(input.preferredDate, startTime, duration.hours);
  }

  return {
    endDate: addCalendarDays(input.preferredDate, duration.days - 1),
    endTime: startTime,
  };
}

export async function resolveBookingEndSchedule(
  payload: BookingPayload,
): Promise<{ endDate: string | null; endTime: string | null }> {
  if (!payload.preferredDate) {
    return { endDate: null, endTime: null };
  }

  let durationKey: string | undefined;
  let startTime: string | undefined;

  if (payload.bookingType === "tour") {
    const tour = await getTourById(payload.itemId);
    if (!tour) {
      return { endDate: null, endTime: null };
    }
    durationKey = tour.meta.durationKey;
    startTime = tour.meta.startTime ?? undefined;
  } else {
    const excursion = await getExcursionById(payload.itemId);
    if (!excursion) {
      return { endDate: null, endTime: null };
    }
    durationKey = excursion.meta.durationKey;
  }

  const result = calculateTourEnd({
    preferredDate: payload.preferredDate,
    durationKey,
    startTime,
  });

  if (!result) {
    return { endDate: null, endTime: null };
  }

  return result;
}

export function isTourCompleted(endDate: string, endTime: string): boolean {
  const endMs = georgiaLocalToUtcMs(endDate, endTime);
  if (endMs === null) {
    return false;
  }

  return Date.now() > endMs;
}

function resolveLocaleTag(locale: AppLocale): string {
  if (locale === "ka") return "ka-GE";
  if (locale === "ru") return "ru-RU";
  if (locale === "zh") return "zh-CN";
  return "en-GB";
}

export function formatScheduleEnd(
  endDate: string,
  endTime: string,
  locale: AppLocale = "ka",
): string {
  const formatted = formatGeorgiaCalendarDate(endDate, locale) ?? endDate;
  return `${formatted}, ${endTime}`;
}
