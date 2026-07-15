import ExcursionsHomeList from "@/components/ExcursionsHomeList";
import ParallaxSection from "@/components/ParallaxSection";
import SectionHeader from "@/components/SectionHeader";
import type { ReviewStatsRecord } from "@/lib/review-stats-types";
import type { StoredExcursionRecord } from "@/lib/admin-types";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

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
      className="relative overflow-hidden bg-white px-4 pt-4 pb-6 text-black sm:px-6 sm:pt-5 sm:pb-8 lg:px-10"
    >
      <Image
        src="/bgimages/khinkali-2.svg"
        alt=""
        width={320}
        height={320}
        aria-hidden
        className="pointer-events-none absolute -right-8 top-8 z-[1] w-40 sm:-right-4 sm:top-10 sm:w-52 lg:-right-2 lg:w-64"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <SectionHeader
          title={t("title")}
          description={t("description")}
          className="mb-4 sm:mb-6"
        />
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
