import type { AppLocale } from "@/i18n/routing";

export type BookingPayload = {
  bookingType: "tour" | "excursion";
  itemId: string;
  itemTitle: string;
  name: string;
  email: string;
  phone: string;
  preferredDate?: string;
  peopleCount?: number;
  message: string;
  locale?: AppLocale;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function parseBookingPayload(body: unknown): BookingPayload | null {
  if (!body || typeof body !== "object") return null;

  const record = body as Record<string, unknown>;
  const bookingType = record.bookingType;

  if (bookingType !== "tour" && bookingType !== "excursion") {
    return null;
  }

  const name = trimField(record.name, 120);
  const email = trimField(record.email, 254);
  const phone = trimField(record.phone, 40);
  const itemId = trimField(record.itemId, 80);
  const itemTitle = trimField(record.itemTitle, 200);
  const message = trimField(record.message, 5000);
  const preferredDateRaw = trimField(record.preferredDate, 10);
  const preferredDate =
    preferredDateRaw && DATE_PATTERN.test(preferredDateRaw)
      ? preferredDateRaw
      : undefined;

  let peopleCount: number | undefined;
  if (record.peopleCount !== undefined && record.peopleCount !== null) {
    const parsed = Number(record.peopleCount);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > 500) {
      return null;
    }
    peopleCount = parsed;
  }

  const localeRaw = trimField(record.locale, 2);
  const locale =
    localeRaw === "ka" ||
    localeRaw === "en" ||
    localeRaw === "ru" ||
    localeRaw === "zh"
      ? localeRaw
      : undefined;

  if (
    !name ||
    !email ||
    !phone ||
    !itemId ||
    !itemTitle ||
    !message ||
    !EMAIL_PATTERN.test(email)
  ) {
    return null;
  }

  return {
    bookingType,
    itemId,
    itemTitle,
    name,
    email,
    phone,
    preferredDate,
    peopleCount,
    message,
    locale,
  };
}

function trimField(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export function buildBookingEmail(payload: BookingPayload) {
  const typeLabel =
    payload.bookingType === "tour" ? "ტური" : "ექსკურსია";
  const subject = `ახალი ჯავშანი: ${payload.itemTitle}`;

  const lines = [
    `ტიპი: ${typeLabel}`,
    `პროგრამა: ${payload.itemTitle}`,
    `ID: ${payload.itemId}`,
    "",
    `სახელი: ${payload.name}`,
    `ელფოსტა: ${payload.email}`,
    `ტელეფონი: ${payload.phone}`,
  ];

  if (payload.preferredDate) {
    lines.push(`სასურველი თარიღი: ${payload.preferredDate}`);
  }

  if (payload.peopleCount) {
    lines.push(`ადამიანების რაოდენობა: ${payload.peopleCount}`);
  }

  if (payload.locale) {
    lines.push(`ენა: ${payload.locale}`);
  }

  lines.push("", "შეტყობინება", payload.message);

  const text = lines.join("\n");

  const html = `
    <div style="font-family:Figtree,Segoe UI,sans-serif;color:#171717;line-height:1.6;max-width:560px;">
      <p style="margin:0 0 16px;font-size:20px;font-weight:600;color:#0f4f4f;">ახალი ჯავშანი</p>
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#0f4f4f;">პროგრამა</p>
      <p style="margin:0 0 20px;font-size:16px;">${escapeHtml(typeLabel)} ${escapeHtml(payload.itemTitle)}</p>
      <p style="margin:0 0 4px;font-size:18px;font-weight:600;">${escapeHtml(payload.name)}</p>
      <p style="margin:0 0 4px;"><a href="mailto:${escapeHtml(payload.email)}" style="color:#0f4f4f;text-decoration:none;">${escapeHtml(payload.email)}</a></p>
      <p style="margin:0 0 20px;"><a href="tel:${escapeHtml(payload.phone)}" style="color:#0f4f4f;text-decoration:none;">${escapeHtml(payload.phone)}</a></p>
      ${
        payload.preferredDate
          ? `<p style="margin:0 0 8px;"><strong>თარიღი:</strong> ${escapeHtml(payload.preferredDate)}</p>`
          : ""
      }
      ${
        payload.peopleCount
          ? `<p style="margin:0 0 20px;"><strong>ადამიანები:</strong> ${payload.peopleCount}</p>`
          : ""
      }
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#0f4f4f;">შეტყობინება</p>
      <p style="margin:0;white-space:pre-wrap;font-size:16px;">${escapeHtml(payload.message)}</p>
    </div>
  `.trim();

  return { subject, text, html };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
