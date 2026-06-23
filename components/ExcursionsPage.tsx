import ExcursionsPageContent from "@/components/ExcursionsPageContent";
import FadeUp from "@/components/FadeUp";
import ParallaxImage from "@/components/ParallaxImage";
import ParallaxSection from "@/components/ParallaxSection";
import SectionHeader from "@/components/SectionHeader";
import { listExcursions } from "@/lib/catalog-db";
import { getPublishedReviewStatsRecord } from "@/lib/review-db";
import { getTranslations } from "next-intl/server";

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

        <SectionHeader
          as="h1"
          trigger="load"
          title={t("title")}
          description={t("description")}
        />

        <ExcursionsPageContent
          initialExcursions={excursions}
          reviewStats={reviewStats}
        />

        <FadeUp trigger="load" delay={120} className="flex justify-center">
          <div className="mt-14 w-fit max-w-full overflow-hidden rounded-2xl bg-black/[0.03] shadow-[0_4px_24px_rgba(15,79,79,0.06)] sm:mt-16">
            <video
              src="/IMG_8984.MP4"
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
              aria-label={t("videoAlt")}
              className="max-h-48 w-auto max-w-full object-contain sm:max-h-64 md:max-h-[480px]"
            />
          </div>
        </FadeUp>
      </div>
    </ParallaxSection>
  );
}
