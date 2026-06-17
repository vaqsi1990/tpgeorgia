import ExcursionsHomeList from "@/components/ExcursionsHomeList";
import ParallaxSection from "@/components/ParallaxSection";
import SectionHeader from "@/components/SectionHeader";
import type { ReviewStatsRecord } from "@/lib/review-stats-types";
import type { StoredExcursionRecord } from "@/lib/admin-types";
import { getTranslations } from "next-intl/server";

type ExcursionsProps = {
  excursions: StoredExcursionRecord[];
  reviewStats?: ReviewStatsRecord;
};

export default async function Excursions({
  excursions,
  reviewStats,
}: ExcursionsProps) {
  const t = await getTranslations("Excursions");

  return (
    <ParallaxSection
      id="excursions"
      tone="warm"
      className="bg-white px-4 mb-20 text-black sm:px-6 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader title={t("title")} description={t("description")} />
        <ExcursionsHomeList
          initialExcursions={excursions}
          limit={6}
          showAllLink
          reviewStats={reviewStats}
        />
      </div>
    </ParallaxSection>
  );
}
