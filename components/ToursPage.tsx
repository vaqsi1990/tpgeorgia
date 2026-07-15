import ParallaxSection from "@/components/ParallaxSection";
import SectionHeader from "@/components/SectionHeader";
import ToursPageContent from "@/components/ToursPageContent";
import type { TourDestination } from "@/data/tour-destinations";
import { listTours } from "@/lib/catalog-db";
import { getPublishedReviewStatsRecord } from "@/lib/review-db";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

type ToursPageProps = {
  destination?: TourDestination;
};

export default async function ToursPage({ destination }: ToursPageProps = {}) {
  const [t, tours, reviewStats] = await Promise.all([
    getTranslations("Tours"),
    listTours(),
    getPublishedReviewStatsRecord(),
  ]);
  const title = destination
    ? t(`destinations.${destination}.title`)
    : t("title");
  const description = destination
    ? t(`destinations.${destination}.description`)
    : t("description");

  return (
    <ParallaxSection
      as="main"
      tone="mint"
      disableContentParallax
      className="relative overflow-hidden bg-white px-4 pb-20 pt-28 text-black sm:px-6 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-36"
    >
      <Image
        src="/bgimages/barbecue.svg"
        alt=""
        width={340}
        height={280}
        aria-hidden
        className="pointer-events-none absolute -right-6 top-[45%] z-[1] w-40 opacity-70 sm:right-2 sm:w-52 lg:right-6 lg:w-60"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <SectionHeader
          as="h1"
          trigger="load"
          title={title}
          description={description}
        />
        <ToursPageContent
          initialDestination={destination}
          initialTours={tours}
          reviewStats={reviewStats}
        />
      </div>
    </ParallaxSection>
  );
}
