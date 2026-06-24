import ExcursionsPageContent from "@/components/ExcursionsPageContent";
import ExcursionsVideoPlayer from "@/components/ExcursionsVideoPlayer";
import FadeUp from "@/components/FadeUp";
import ParallaxImage from "@/components/ParallaxImage";
import ParallaxSection from "@/components/ParallaxSection";
import SectionHeader from "@/components/SectionHeader";
import { listExcursions } from "@/lib/catalog-db";
import { getPublishedReviewStatsRecord } from "@/lib/review-db";
import { business } from "@/lib/site";
import { getTranslations } from "next-intl/server";
import { FaFacebook } from "react-icons/fa";

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
        <FadeUp trigger="load" className="mb-8 flex justify-center sm:mb-10">
          <ParallaxImage
            src="/background.png"
            alt={t("title")}
            width={300}
            height={100}
            className="mx-auto object-cover"
            wrapperClassName="rounded-2xl"
          />
        </FadeUp>

        <div className="mb-6 flex items-start justify-center gap-3 sm:mb-8 sm:gap-4">
          <SectionHeader
            as="h1"
            trigger="load"
            title={t("title")}
            description={t("description")}
            className="mb-0 max-w-md"
          />
          <a
            href={business.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="mt-1 shrink-0 transition-opacity hover:opacity-80 sm:mt-2"
          >
            <FaFacebook className="text-3xl text-[#1877F2] sm:text-4xl" />
          </a>
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
