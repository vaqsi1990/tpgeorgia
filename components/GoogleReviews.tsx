import GoogleReviewsClient from "@/components/GoogleReviewsClient";
import type { AppLocale } from "@/i18n/routing";
import { getGooglePlaceReviews } from "@/lib/google-reviews";

type GoogleReviewsProps = {
  locale: AppLocale;
};

export default async function GoogleReviews({ locale }: GoogleReviewsProps) {
  const place = await getGooglePlaceReviews(locale);
  if (!place) return null;

  return <GoogleReviewsClient place={place} />;
}
