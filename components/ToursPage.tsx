import ParallaxSection from "@/components/ParallaxSection";
import SectionHeader from "@/components/SectionHeader";
import ToursPageContent from "@/components/ToursPageContent";
import type { TourDestination } from "@/data/tour-destinations";
import { listTours } from "@/lib/catalog-db";
import { getTranslations } from "next-intl/server";

type ToursPageProps = {
  destination?: TourDestination;
};

export default async function ToursPage({ destination }: ToursPageProps = {}) {
  const [t, tours] = await Promise.all([
    getTranslations("Tours"),
    listTours(),
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
      className="bg-white px-4 pb-20 pt-28 text-black sm:px-6 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-36"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader
          as="h1"
          trigger="load"
          title={title}
          description={description}
        />
        <ToursPageContent
          initialDestination={destination}
          initialTours={tours}
        />
      </div>
    </ParallaxSection>
  );
}
