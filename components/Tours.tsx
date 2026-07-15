import ParallaxSection from "@/components/ParallaxSection";
import SectionHeader from "@/components/SectionHeader";
import ToursHomeList from "@/components/ToursHomeList";
import type { ReviewStatsRecord } from "@/lib/review-stats-types";
import type { StoredTourRecord } from "@/lib/admin-types";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

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
      className="relative overflow-hidden bg-white px-4 pt-4 pb-6 text-black sm:px-6 sm:pt-5 sm:pb-8 lg:px-10"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="relative mb-4 sm:mb-6">
          <SectionHeader
            title={t("title")}
            description={t("description")}
          />
          <Image
            src="/bgimages/sec.png"
            alt=""
            width={360}
            height={360}
            aria-hidden
            className="pointer-events-none absolute left-[calc(50%+8rem)] -top-14 z-0 w-40 rotate-90 mix-blend-multiply opacity-70 sm:left-[calc(50%+11rem)] sm:-top-16 sm:w-52 lg:left-[calc(50%+14rem)] lg:-top-20 lg:w-64"
          />
        </div>
        <ToursHomeList initialTours={tours} limit={6} showAllLink reviewStats={reviewStats} />
      </div>
    </ParallaxSection>
  );
}
