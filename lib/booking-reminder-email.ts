import type { BookingRecord } from "@/lib/booking-types";
import type { AppLocale } from "@/i18n/routing";
import { business, siteName } from "@/lib/site";

type ReminderEmailCopy = {
  subject: (title: string) => string;
  headlineTour: string;
  headlineExcursion: string;
  introTour: string;
  introExcursion: string;
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
    headlineTour: "თქვენი ტური ხვალაა",
    headlineExcursion: "თქვენი ექსკურსია ხვალაა",
    introTour:
      "გამარჯობა, {name}! 😊 გსურთ შეგახსენოთ, რომ თქვენი ტური ხვალ არის დაგეგმილი. გთხოვთ, დარწმუნდით, რომ მზად ხართ და დროულად გამოცხადდეთ შეხვედრის ადგილზე.",
    introExcursion:
      "გამარჯობა, {name}! 😊 გსურთ შეგახსენოთ, რომ თქვენი ექსკურსია ხვალ არის დაგეგმილი. გთხოვთ, დარწმუნდით, რომ მზად ხართ და დროულად გამოცხადდეთ შეხვედრის ადგილზე.",
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
    headlineTour: "Your tour is tomorrow",
    headlineExcursion: "Your excursion is tomorrow",
    introTour:
      "Hello, {name}! 😊 Just a friendly reminder that your tour is scheduled for tomorrow. Please make sure you are ready and arrive on time at the meeting point.",
    introExcursion:
      "Hello, {name}! 😊 Just a friendly reminder that your excursion is scheduled for tomorrow. Please make sure you are ready and arrive on time at the meeting point.",
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
    headlineTour: "Ваш тур завтра",
    headlineExcursion: "Ваша экскурсия завтра",
    introTour:
      "Здравствуйте, {name}! 😊 Напоминаем, что ваш тур запланирован на завтра. Пожалуйста, убедитесь, что вы готовы и вовремя придёте в место встречи.",
    introExcursion:
      "Здравствуйте, {name}! 😊 Напоминаем, что ваша экскурсия запланирована на завтра. Пожалуйста, убедитесь, что вы готовы и вовремя придёте в место встречи.",
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
    headlineTour: "您的行程明天开始",
    headlineExcursion: "您的研学明天开始",
    introTour:
      "您好，{name}！😊 温馨提醒：您的行程定于明天。请做好准备，并准时到达集合地点。",
    introExcursion:
      "您好，{name}！😊 温馨提醒：您的研学定于明天。请做好准备，并准时到达集合地点。",
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
  const isTour = booking.bookingType === "tour";
  const headline = isTour ? t.headlineTour : t.headlineExcursion;
  const introTemplate = isTour ? t.introTour : t.introExcursion;
  const intro = introTemplate.replace("{name}", booking.name);
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

  const text = [headline, "", intro, "", ...detailLines, "", footer].join("\n");

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
        <h1 style="margin:0;font-size:24px;font-weight:600;color:#ffffff;">${escapeHtml(headline)}</h1>
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
