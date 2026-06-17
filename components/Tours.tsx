import ParallaxSection from "@/components/ParallaxSection";
import SectionHeader from "@/components/SectionHeader";
import ToursHomeList from "@/components/ToursHomeList";
import type { ReviewStatsRecord } from "@/lib/review-stats-types";
import type { StoredTourRecord } from "@/lib/admin-types";
import { getTranslations } from "next-intl/server";

type ToursProps = {
  tours: StoredTourRecord[];
  reviewStats?: ReviewStatsRecord;
};

export default async function Tours({ tours, reviewStats }: ToursProps) {
  const t = await getTranslations("Tours");

  return (
    <ParallaxSection
      id="tours"
      tone="light"
      className="bg-white px-4 pt-4 pb-6 text-black sm:px-6 sm:pt-5 sm:pb-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader
          title={t("title")}
          description={t("description")}
          className="mb-4 sm:mb-6"
        />
        <ToursHomeList initialTours={tours} limit={6} showAllLink reviewStats={reviewStats} />
      </div>
    </ParallaxSection>
  );
}
