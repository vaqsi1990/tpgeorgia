import type { BookingRecord } from "@/lib/booking-types";
import type { AppLocale } from "@/i18n/routing";
import { absoluteUrl, siteName } from "@/lib/site";
import { createReviewToken } from "@/lib/review-token";

type ReviewEmailCopy = {
  subject: (title: string) => string;
  headline: string;
  intro: string;
  programLabel: string;
  cta: string;
  footer: string;
};

const copy: Record<AppLocale, ReviewEmailCopy> = {
  ka: {
    subject: (title) => `გაგვიზიარეთ გამოცდილება — ${title}`,
    headline: "როგორ გაგივიდათ ტური?",
    intro:
      "გამარჯოთ, {name}! დღეს თქვენი პროგრამის ბოლო დღეა. გთხოვთ, რამდენიმე წუთი დაგვითმოთ და მოგვიყევით თქვენი შთაბეჭდილება.",
    programLabel: "პროგრამა",
    cta: "რევიუს დაწერა",
    footer: "გმადლობთ, რომ აირჩიეთ {siteName}.",
  },
  en: {
    subject: (title) => `Share your experience — ${title}`,
    headline: "How was your trip?",
    intro:
      "Hello, {name}! Today is the last day of your program. Please take a moment to tell us about your experience.",
    programLabel: "Program",
    cta: "Write a review",
    footer: "Thank you for choosing {siteName}.",
  },
  ru: {
    subject: (title) => `Поделитесь впечатлениями — ${title}`,
    headline: "Как прошла поездка?",
    intro:
      "Здравствуйте, {name}! Сегодня последний день вашей программы. Пожалуйста, расскажите о своих впечатлениях.",
    programLabel: "Программа",
    cta: "Написать отзыв",
    footer: "Спасибо, что выбрали {siteName}.",
  },
  zh: {
    subject: (title) => `分享您的体验 — ${title}`,
    headline: "行程怎么样？",
    intro:
      "您好，{name}！今天是您行程的最后一天。请花一点时间告诉我们您的感受。",
    programLabel: "项目",
    cta: "撰写评价",
    footer: "感谢您选择 {siteName}。",
  },
};

function resolveLocale(locale: BookingRecord["locale"]): AppLocale {
  if (locale === "en" || locale === "ru" || locale === "zh" || locale === "ka") {
    return locale;
  }
  return "ka";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildReviewRequestEmail(booking: BookingRecord) {
  const locale = resolveLocale(booking.locale);
  const t = copy[locale];
  const token = createReviewToken(booking.id);
  const reviewUrl = absoluteUrl(
    `/${locale}/review/${encodeURIComponent(booking.id)}?token=${encodeURIComponent(token)}`,
  );
  const intro = t.intro.replace("{name}", booking.name);
  const footer = t.footer.replace("{siteName}", siteName);

  const text = [
    t.headline,
    "",
    intro,
    "",
    `${t.programLabel}: ${booking.itemTitle}`,
    "",
    `${t.cta}: ${reviewUrl}`,
    "",
    footer,
  ].join("\n");

  const html = `
    <div style="font-family:Figtree,Segoe UI,sans-serif;color:#171717;line-height:1.6;max-width:560px;margin:0 auto;">
      <div style="background:linear-gradient(135deg,#38ab8a,#0f4f4f);border-radius:16px 16px 0 0;padding:28px 24px;">
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,0.75);">${escapeHtml(siteName)}</p>
        <h1 style="margin:0;font-size:24px;font-weight:600;color:#ffffff;">${escapeHtml(t.headline)}</h1>
      </div>
      <div style="background:#ffffff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px;padding:24px;">
        <p style="margin:0 0 20px;font-size:16px;color:#374151;">${escapeHtml(intro)}</p>
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#0f4f4f;">${escapeHtml(t.programLabel)}</p>
        <p style="margin:0 0 24px;font-size:17px;font-weight:600;color:#171717;">${escapeHtml(booking.itemTitle)}</p>
        <a href="${escapeHtml(reviewUrl)}" style="display:inline-block;background:#38ab8a;color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;padding:14px 28px;border-radius:12px;">${escapeHtml(t.cta)}</a>
        <p style="margin:24px 0 0;font-size:14px;color:#6b7280;">${escapeHtml(footer)}</p>
      </div>
    </div>
  `.trim();

  return {
    subject: t.subject(booking.itemTitle),
    text,
    html,
    reviewUrl,
  };
}
