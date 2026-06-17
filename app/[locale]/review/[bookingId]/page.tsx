import ReviewForm from "@/components/ReviewForm";
import type { AppLocale } from "@/i18n/routing";
import { getBookingById } from "@/lib/booking-db";
import { getReviewByBookingId } from "@/lib/review-db";
import { verifyReviewToken } from "@/lib/review-token";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string; bookingId: string }>;
  searchParams: Promise<{ token?: string }>;
};

export default async function ReviewPage({ params, searchParams }: Props) {
  const { locale, bookingId } = await params;
  const { token } = await searchParams;
  setRequestLocale(locale);

  if (!verifyReviewToken(bookingId, token)) {
    notFound();
  }

  const booking = await getBookingById(bookingId);
  if (!booking || booking.status !== "confirmed") {
    notFound();
  }

  const existingReview = await getReviewByBookingId(bookingId);
  const t = await getTranslations("Reviews");

  return (
    <main className="bg-[#fafcfb] px-4 pb-20 pt-28 text-black sm:px-6 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-36">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="font-afacad mb-3 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("pageTitle")}
        </h1>
        <p className="mb-8 text-center text-[16px] text-black/70 md:text-[18px]">
          {t("pageSubtitle")}
        </p>

        {existingReview ? (
          <div className="rounded-2xl border border-black/10 bg-white px-6 py-8 text-center">
            <p className="font-afacad text-2xl font-semibold text-[#0f4f4f]">
              {t("alreadySubmittedTitle")}
            </p>
            <p className="mt-2 text-[16px] text-black/75 md:text-[18px]">
              {t("alreadySubmittedMessage")}
            </p>
          </div>
        ) : (
          <ReviewForm
            bookingId={booking.id}
            token={token ?? ""}
            defaultName={booking.name}
            itemTitle={booking.itemTitle}
            locale={locale as AppLocale}
          />
        )}
      </div>
    </main>
  );
}
