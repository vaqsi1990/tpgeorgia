import type { ReviewRecord } from "@/lib/review-db";
import type { AppLocale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

type ReviewsSectionProps = {
  reviews: ReviewRecord[];
  locale: AppLocale;
};

function resolveLocaleTag(locale: AppLocale): string {
  if (locale === "ka") return "ka-GE";
  if (locale === "ru") return "ru-RU";
  if (locale === "zh") return "zh-CN";
  return "en-GB";
}

function formatReviewDate(iso: string, locale: AppLocale): string {
  return new Intl.DateTimeFormat(resolveLocaleTag(locale), {
    dateStyle: "medium",
    timeZone: "Asia/Tbilisi",
  }).format(new Date(iso));
}

export default async function ReviewsSection({
  reviews,
  locale,
}: ReviewsSectionProps) {
  const t = await getTranslations("Reviews");

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 border-t border-black/10 pt-10">
      <h2 className="font-afacad mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">
        {t("sectionTitle")}
      </h2>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="rounded-2xl border border-black/10 bg-white/80 p-5 sm:p-6"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium text-black">{review.authorName}</p>
              <time
                dateTime={review.createdAt}
                className="text-[14px] text-black/50 md:text-[15px]"
              >
                {formatReviewDate(review.createdAt, locale)}
              </time>
            </div>
            <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-black/85 md:text-[16px]">
              {review.text}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
