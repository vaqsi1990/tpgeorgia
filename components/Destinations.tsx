import DestinationsCarousel from "@/components/DestinationsCarousel";
import ParallaxSection from "@/components/ParallaxSection";
import SectionHeader from "@/components/SectionHeader";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { listPublishedPlaceCards } from "@/lib/places-db";

export default async function Destinations() {
  const t = await getTranslations("Destinations");
  const locale = (await getLocale()) as AppLocale;
  const places = await listPublishedPlaceCards(locale);

  return (
    <ParallaxSection
      id="destinations"
      tone="light"
      className="relative overflow-hidden bg-white px-4 pt-4 pb-6 text-black sm:px-6 sm:pt-5 sm:pb-8 lg:px-10"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <SectionHeader
          title={t("title")}
          description={t("description")}
          className="mb-4 sm:mb-6"
        />

        <DestinationsCarousel places={places} />
      </div>
    </ParallaxSection>
  );
}
