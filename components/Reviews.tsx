import ParallaxSection from "@/components/ParallaxSection";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import SectionHeader from "@/components/SectionHeader";
import type { ReviewRecord } from "@/lib/review-types";
import { getTranslations } from "next-intl/server";

type ReviewsProps = {
  reviews: ReviewRecord[];
};

export default async function Reviews({ reviews }: ReviewsProps) {
  if (reviews.length === 0) {
    return null;
  }

  const t = await getTranslations("Reviews");

  return (
    <ParallaxSection
      id="reviews"
      tone="light"
      className="bg-white px-4 pt-4 pb-6 text-black sm:px-6 sm:pt-5 sm:pb-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader
          title={t("sectionTitle")}
          description={t("homeDescription")}
          className="mb-4 sm:mb-6"
        />
        <ReviewsCarousel reviews={reviews} />
      </div>
    </ParallaxSection>
  );
}
