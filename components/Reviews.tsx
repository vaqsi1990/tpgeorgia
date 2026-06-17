import ParallaxSection from "@/components/ParallaxSection";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import SectionHeader from "@/components/SectionHeader";
import StarRating from "@/components/StarRating";
import type { ReviewRecord } from "@/lib/review-types";
import { summarizeRatings } from "@/lib/review-stats-types";
import { getTranslations } from "next-intl/server";

type ReviewsProps = {
  reviews: ReviewRecord[];
};

export default async function Reviews({ reviews }: ReviewsProps) {
  if (reviews.length === 0) {
    return null;
  }

  const t = await getTranslations("Reviews");
  const summary = summarizeRatings(reviews.map((review) => review.rating));

  return (
    <ParallaxSection
      id="reviews"
      tone="light"
      className=" px-4 mb-20 mt-0 text-black "
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader title={t("sectionTitle")} description={t("homeDescription")} />
       
        <ReviewsCarousel reviews={reviews} />
      </div>
    </ParallaxSection>
  );
}
