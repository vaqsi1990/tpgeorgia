import ExcursionsPageContent from "@/components/ExcursionsPageContent";
import ExcursionsVideoPlayer from "@/components/ExcursionsVideoPlayer";
import FadeUp from "@/components/FadeUp";
import ParallaxImage from "@/components/ParallaxImage";
import ParallaxSection from "@/components/ParallaxSection";
import SectionHeader from "@/components/SectionHeader";
import { listExcursions } from "@/lib/catalog-db";
import { getPublishedReviewStatsRecord } from "@/lib/review-db";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function ExcursionsPage() {
  const [t, excursions, reviewStats] = await Promise.all([
    getTranslations("Excursions"),
    listExcursions(),
    getPublishedReviewStatsRecord(),
  ]);

  return (
    <ParallaxSection
      as="main"
      tone="warm"
      disableContentParallax
      className="bg-white px-4 pb-20 pt-28 text-black sm:px-6 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-36"
    >
      <div className="mx-auto w-full max-w-7xl">
        <FadeUp
          trigger="load"
          className="relative mb-8 flex justify-center sm:mb-10"
        >
          <Image
            src="/bgimages/map.svg"
            alt=""
            width={880}
            height={494}
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[70%] z-0 w-[min(100%,28rem)] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-80 sm:w-[36rem] lg:w-[42rem]"
          />
          <ParallaxImage
            src="/background.png"
            alt={t("title")}
            width={300}
            height={100}
            className="relative z-10 mx-auto object-cover"
            wrapperClassName="relative z-10 rounded-2xl"
          />
        </FadeUp>
 <div className="mt-24">

        <SectionHeader
          as="h1"
          trigger="load"
          title={t("title")}
          description={t("description")}
        
        />
 </div>
        <ExcursionsPageContent
          initialExcursions={excursions}
          reviewStats={reviewStats}
        />

        <FadeUp
          trigger="load"
          delay={120}
          className="mt-14 flex justify-center sm:mt-16"
        >
          <div className="aspect-[9/16] w-full max-w-sm overflow-hidden rounded-[1.75rem] shadow-[0_20px_60px_rgba(15,79,79,0.14)] sm:max-w-md sm:rounded-[2rem]">
            <ExcursionsVideoPlayer ariaLabel={t("videoAlt")} />
          </div>
        </FadeUp>
      </div>
    </ParallaxSection>
  );
}
