import type { BookingRecord } from "@/lib/booking-db";
import type { BookingStatus } from "@/lib/generated/prisma/enums";
import type { AppLocale } from "@/i18n/routing";
import { business, siteName } from "@/lib/site";

type StatusCopy = {
  subject: (title: string) => string;
  headline: string;
  intro: string;
  statusNote: Record<BookingStatus, string>;
  labels: {
    bookingId: string;
    type: string;
    tour: string;
    excursion: string;
    program: string;
    status: string;
    name: string;
    email: string;
    phone: string;
    preferredDate: string;
    peopleCount: string;
    submittedAt: string;
    yourMessage: string;
    contactUs: string;
    footer: string;
  };
  statuses: Record<BookingStatus, string>;
};

const copy: Record<AppLocale, StatusCopy> = {
  ka: {
    subject: (title) => `ჯავშნის განახლება — ${title}`,
    headline: "ჯავშნის სტატუსი განახლდა",
    intro: "გამარჯოთ, {name}! თქვენი ჯავშნის მოთხოვნის სტატუსი შეიცვალა. ქვემოთ მოცემულია დეტალური ინფორმაცია.",
    statusNote: {
      pending: "თქვენი მოთხოვნა მიმდინარეობს განხილვაში. მალე დაგიკავშირდებით დამატებითი დეტალებით.",
      confirmed: "სიხარულით გაცხადებთ, რომ თქვენი ჯავშანი დადასტურებულია. ველით თქვენს ვიზიტს!",
      cancelled: "სამწუხაროდ, თქვენი ჯავშანი გაუქმებულია. დამატებითი კითხვების შემთხვევაში დაგვიკავშირდით.",
    },
    labels: {
      bookingId: "ჯავშნის ნომერი",
      type: "ტიპი",
      tour: "ტური",
      excursion: "ექსკურსია",
      program: "პროგრამა",
      status: "სტატუსი",
      name: "სახელი",
      email: "ელფოსტა",
      phone: "ტელეფონი",
      preferredDate: "სასურველი თარიღი",
      peopleCount: "ადამიანების რაოდენობა",
      submittedAt: "გაგზავნის თარიღი",
      yourMessage: "თქვენი შეტყობინება",
      contactUs: "დაგვიკავშირდით",
      footer: "გმადლობთ, რომ აირჩიეთ {siteName}.",
    },
    statuses: {
      pending: "მოლოდინში",
      confirmed: "დადასტურებული",
      cancelled: "გაუქმებული",
    },
  },
  en: {
    subject: (title) => `Booking update — ${title}`,
    headline: "Your booking status has been updated",
    intro: "Hello, {name}! The status of your booking request has changed. Below is the full details of your reservation.",
    statusNote: {
      pending: "Your request is still under review. We will contact you soon with more details.",
      confirmed: "We are pleased to confirm your booking. We look forward to welcoming you!",
      cancelled: "Unfortunately, your booking has been cancelled. Please contact us if you have any questions.",
    },
    labels: {
      bookingId: "Booking reference",
      type: "Type",
      tour: "Tour",
      excursion: "Excursion",
      program: "Program",
      status: "Status",
      name: "Name",
      email: "Email",
      phone: "Phone",
      preferredDate: "Preferred date",
      peopleCount: "Number of people",
      submittedAt: "Submitted on",
      yourMessage: "Your message",
      contactUs: "Contact us",
      footer: "Thank you for choosing {siteName}.",
    },
    statuses: {
      pending: "Pending",
      confirmed: "Confirmed",
      cancelled: "Cancelled",
    },
  },
  ru: {
    subject: (title) => `Обновление бронирования — ${title}`,
    headline: "Статус вашего бронирования обновлён",
    intro: "Здравствуйте, {name}! Статус вашей заявки на бронирование изменился. Ниже — подробная информация.",
    statusNote: {
      pending: "Ваша заявка находится на рассмотрении. Мы скоро свяжемся с вами для уточнения деталей.",
      confirmed: "Мы рады подтвердить ваше бронирование. Ждём вас!",
      cancelled: "К сожалению, ваше бронирование отменено. Свяжитесь с нами, если у вас есть вопросы.",
    },
    labels: {
      bookingId: "Номер бронирования",
      type: "Тип",
      tour: "Тур",
      excursion: "Экскурсия",
      program: "Программа",
      status: "Статус",
      name: "Имя",
      email: "Email",
      phone: "Телефон",
      preferredDate: "Желаемая дата",
      peopleCount: "Количество человек",
      submittedAt: "Дата подачи",
      yourMessage: "Ваше сообщение",
      contactUs: "Связаться с нами",
      footer: "Спасибо, что выбрали {siteName}.",
    },
    statuses: {
      pending: "На рассмотрении",
      confirmed: "Подтверждено",
      cancelled: "Отменено",
    },
  },
  zh: {
    subject: (title) => `预订状态更新 — ${title}`,
    headline: "您的预订状态已更新",
    intro: "您好，{name}！您的预订申请状态已变更。以下是详细信息。",
    statusNote: {
      pending: "您的申请正在审核中，我们将尽快与您联系。",
      confirmed: "我们很高兴确认您的预订，期待您的到来！",
      cancelled: "很抱歉，您的预订已被取消。如有疑问请联系我们。",
    },
    labels: {
      bookingId: "预订编号",
      type: "类型",
      tour: "旅游",
      excursion: "游学",
      program: "项目",
      status: "状态",
      name: "姓名",
      email: "邮箱",
      phone: "电话",
      preferredDate: "期望日期",
      peopleCount: "人数",
      submittedAt: "提交时间",
      yourMessage: "您的留言",
      contactUs: "联系我们",
      footer: "感谢您选择 {siteName}。",
    },
    statuses: {
      pending: "待处理",
      confirmed: "已确认",
      cancelled: "已取消",
    },
  },
};

const statusColors: Record<BookingStatus, { bg: string; text: string; border: string }> = {
  pending: { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
  confirmed: { bg: "#dcfce7", text: "#166534", border: "#86efac" },
  cancelled: { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5" },
};

function resolveLocale(locale: BookingRecord["locale"]): AppLocale {
  if (locale === "en" || locale === "ru" || locale === "zh" || locale === "ka") {
    return locale;
  }
  return "ka";
}

function formatSubmittedAt(iso: string, locale: AppLocale): string {
  const localeTag =
    locale === "ka"
      ? "ka-GE"
      : locale === "ru"
        ? "ru-RU"
        : locale === "zh"
          ? "zh-CN"
          : "en-GB";

  return new Intl.DateTimeFormat(localeTag, {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(iso));
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function detailRow(label: string, value: string, htmlValue = false): string {
  const cell = htmlValue ? value : escapeHtml(value);
  return `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #eef2f1;color:#6b7280;font-size:14px;width:38%;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #eef2f1;color:#171717;font-size:15px;font-weight:500;vertical-align:top;">${cell}</td>
    </tr>
  `;
}

export function buildBookingStatusCustomerEmail(booking: BookingRecord) {
  const locale = resolveLocale(booking.locale);
  const t = copy[locale];
  const colors = statusColors[booking.status];
  const typeLabel =
    booking.bookingType === "tour" ? t.labels.tour : t.labels.excursion;
  const statusLabel = t.statuses[booking.status];
  const intro = t.intro.replace("{name}", booking.name);
  const footer = t.labels.footer.replace("{siteName}", siteName);
  const submittedAt = formatSubmittedAt(booking.createdAt, locale);

  const textLines = [
    t.headline,
    "",
    intro,
    "",
    t.statusNote[booking.status],
    "",
    `${t.labels.bookingId}: ${booking.id}`,
    `${t.labels.type}: ${typeLabel}`,
    `${t.labels.program}: ${booking.itemTitle}`,
    `${t.labels.status}: ${statusLabel}`,
    `${t.labels.name}: ${booking.name}`,
    `${t.labels.email}: ${booking.email}`,
    `${t.labels.phone}: ${booking.phone}`,
  ];

  if (booking.preferredDate) {
    textLines.push(`${t.labels.preferredDate}: ${booking.preferredDate}`);
  }
  if (booking.peopleCount) {
    textLines.push(`${t.labels.peopleCount}: ${booking.peopleCount}`);
  }

  textLines.push(
    `${t.labels.submittedAt}: ${submittedAt}`,
    "",
    t.labels.yourMessage,
    booking.message,
    "",
    t.labels.contactUs,
    `${business.phoneDisplay}`,
    business.email,
    "",
    footer,
  );

  const html = `
    <div style="font-family:Figtree,Segoe UI,sans-serif;color:#171717;line-height:1.6;max-width:600px;margin:0 auto;">
      <div style="background:linear-gradient(135deg,#38ab8a,#0f4f4f);border-radius:16px 16px 0 0;padding:28px 24px;">
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,0.75);">${escapeHtml(siteName)}</p>
        <h1 style="margin:0;font-size:24px;font-weight:600;color:#ffffff;line-height:1.3;">${escapeHtml(t.headline)}</h1>
      </div>
      <div style="background:#ffffff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px;padding:24px;">
        <p style="margin:0 0 20px;font-size:16px;color:#374151;">${escapeHtml(intro)}</p>
        <div style="margin:0 0 24px;padding:16px 18px;border-radius:12px;background:${colors.bg};border:1px solid ${colors.border};">
          <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:${colors.text};">${escapeHtml(t.labels.status)}: ${escapeHtml(statusLabel)}</p>
          <p style="margin:0;font-size:15px;color:${colors.text};">${escapeHtml(t.statusNote[booking.status])}</p>
        </div>
        <table role="presentation" style="width:100%;border-collapse:collapse;border:1px solid #eef2f1;border-radius:12px;overflow:hidden;">
          <tbody>
            ${detailRow(t.labels.bookingId, escapeHtml(booking.id))}
            ${detailRow(t.labels.type, escapeHtml(typeLabel))}
            ${detailRow(t.labels.program, escapeHtml(booking.itemTitle))}
            ${detailRow(t.labels.status, `<span style="display:inline-block;padding:4px 10px;border-radius:999px;background:${colors.bg};color:${colors.text};font-size:13px;font-weight:600;">${escapeHtml(statusLabel)}</span>`, true)}
            ${detailRow(t.labels.name, booking.name)}
            ${detailRow(t.labels.email, `<a href="mailto:${escapeHtml(booking.email)}" style="color:#0f4f4f;text-decoration:none;">${escapeHtml(booking.email)}</a>`, true)}
            ${detailRow(t.labels.phone, `<a href="tel:${escapeHtml(booking.phone)}" style="color:#0f4f4f;text-decoration:none;">${escapeHtml(booking.phone)}</a>`, true)}
            ${
              booking.preferredDate
                ? detailRow(t.labels.preferredDate, escapeHtml(booking.preferredDate))
                : ""
            }
            ${
              booking.peopleCount
                ? detailRow(t.labels.peopleCount, String(booking.peopleCount))
                : ""
            }
            ${detailRow(t.labels.submittedAt, escapeHtml(submittedAt))}
          </tbody>
        </table>
        <div style="margin-top:24px;padding:16px 18px;border-radius:12px;background:#f8faf9;border:1px solid #eef2f1;">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#0f4f4f;">${escapeHtml(t.labels.yourMessage)}</p>
          <p style="margin:0;white-space:pre-wrap;font-size:15px;color:#374151;">${escapeHtml(booking.message)}</p>
        </div>
        <div style="margin-top:24px;padding-top:20px;border-top:1px solid #eef2f1;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#0f4f4f;">${escapeHtml(t.labels.contactUs)}</p>
          <p style="margin:0 0 4px;font-size:15px;"><a href="tel:${escapeHtml(business.phone)}" style="color:#0f4f4f;text-decoration:none;">${escapeHtml(business.phoneDisplay)}</a></p>
          <p style="margin:0 0 16px;font-size:15px;"><a href="mailto:${escapeHtml(business.email)}" style="color:#0f4f4f;text-decoration:none;">${escapeHtml(business.email)}</a></p>
          <p style="margin:0;font-size:14px;color:#6b7280;">${escapeHtml(footer)}</p>
        </div>
      </div>
    </div>
  `.trim();

  return {
    subject: t.subject(booking.itemTitle),
    text: textLines.join("\n"),
    html,
  };
}
