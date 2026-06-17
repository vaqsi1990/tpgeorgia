import type { BookingRecord } from "@/lib/booking-types";
import type { AppLocale } from "@/i18n/routing";
import { business, siteName } from "@/lib/site";

type ReminderEmailCopy = {
  subject: (title: string) => string;
  headline: string;
  intro: string;
  labels: {
    program: string;
    date: string;
    bookingId: string;
    peopleCount: string;
    contact: string;
  };
  footer: string;
};

const copy: Record<AppLocale, ReminderEmailCopy> = {
  ka: {
    subject: (title) => `შეხსენება: ხვალ — ${title}`,
    headline: "თქვენი პროგრამა ხვალ იწყება",
    intro:
      "გამარჯოთ, {name}! გაგიხსენებთ, რომ ხვალ გელით. გთხოვთ, დარწმუნდეთ, რომ მზად ხართ და დროულად ხართ ადგილზე.",
    labels: {
      program: "პროგრამა",
      date: "თარიღი",
      bookingId: "ჯავშნის ნომერი",
      peopleCount: "ადამიანები",
      contact: "კონტაქტი",
    },
    footer: "გმადლობთ, რომ აირჩიეთ {siteName}. ნახვამდის!",
  },
  en: {
    subject: (title) => `Reminder: tomorrow — ${title}`,
    headline: "Your program starts tomorrow",
    intro:
      "Hello, {name}! This is a friendly reminder that your program is tomorrow. Please make sure you are ready and arrive on time.",
    labels: {
      program: "Program",
      date: "Date",
      bookingId: "Booking reference",
      peopleCount: "Guests",
      contact: "Contact",
    },
    footer: "Thank you for choosing {siteName}. See you soon!",
  },
  ru: {
    subject: (title) => `Напоминание: завтра — ${title}`,
    headline: "Ваша программа начинается завтра",
    intro:
      "Здравствуйте, {name}! Напоминаем, что ваша программа состоится завтра. Пожалуйста, будьте готовы и приходите вовремя.",
    labels: {
      program: "Программа",
      date: "Дата",
      bookingId: "Номер бронирования",
      peopleCount: "Гостей",
      contact: "Контакт",
    },
    footer: "Спасибо, что выбрали {siteName}. До встречи!",
  },
  zh: {
    subject: (title) => `提醒：明天 — ${title}`,
    headline: "您的行程明天开始",
    intro:
      "您好，{name}！温馨提醒：您的行程将于明天开始。请做好准备并准时到达。",
    labels: {
      program: "项目",
      date: "日期",
      bookingId: "预订编号",
      peopleCount: "人数",
      contact: "联系方式",
    },
    footer: "感谢您选择 {siteName}。明天见！",
  },
};

function resolveLocale(locale: BookingRecord["locale"]): AppLocale {
  if (locale === "en" || locale === "ru" || locale === "zh" || locale === "ka") {
    return locale;
  }
  return "ka";
}

function resolveLocaleTag(locale: AppLocale): string {
  if (locale === "ka") return "ka-GE";
  if (locale === "ru") return "ru-RU";
  if (locale === "zh") return "zh-CN";
  return "en-GB";
}

function formatPreferredDate(date: string, locale: AppLocale): string {
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) {
    return date;
  }

  return new Intl.DateTimeFormat(resolveLocaleTag(locale), {
    dateStyle: "long",
    timeZone: "Asia/Tbilisi",
  }).format(new Date(Date.UTC(year, month - 1, day, 8, 0, 0)));
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildBookingReminderEmail(booking: BookingRecord) {
  const locale = resolveLocale(booking.locale);
  const t = copy[locale];
  const intro = t.intro.replace("{name}", booking.name);
  const footer = t.footer.replace("{siteName}", siteName);
  const formattedDate = booking.preferredDate
    ? formatPreferredDate(booking.preferredDate, locale)
    : "—";

  const detailLines = [
    `${t.labels.program}: ${booking.itemTitle}`,
    `${t.labels.date}: ${formattedDate}`,
    `${t.labels.bookingId}: ${booking.id}`,
    ...(booking.peopleCount
      ? [`${t.labels.peopleCount}: ${booking.peopleCount}`]
      : []),
    `${t.labels.contact}: ${business.phoneDisplay}`,
  ];

  const text = [t.headline, "", intro, "", ...detailLines, "", footer].join(
    "\n",
  );

  const htmlDetails = detailLines
    .map(
      (line) =>
        `<p style="margin:0 0 8px;font-size:15px;color:#374151;">${escapeHtml(line)}</p>`,
    )
    .join("");

  const html = `
    <div style="font-family:Figtree,Segoe UI,sans-serif;color:#171717;line-height:1.6;max-width:560px;margin:0 auto;">
      <div style="background:linear-gradient(135deg,#38ab8a,#0f4f4f);border-radius:16px 16px 0 0;padding:28px 24px;">
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,0.75);">${escapeHtml(siteName)}</p>
        <h1 style="margin:0;font-size:24px;font-weight:600;color:#ffffff;">${escapeHtml(t.headline)}</h1>
      </div>
      <div style="background:#ffffff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px;padding:24px;">
        <p style="margin:0 0 20px;font-size:16px;color:#374151;">${escapeHtml(intro)}</p>
        ${htmlDetails}
        <p style="margin:24px 0 0;font-size:14px;color:#6b7280;">${escapeHtml(footer)}</p>
      </div>
    </div>
  `.trim();

  return {
    subject: t.subject(booking.itemTitle),
    text,
    html,
  };
}
