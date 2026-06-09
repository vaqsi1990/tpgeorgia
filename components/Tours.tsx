import ParallaxSection from "@/components/ParallaxSection";
import SectionHeader from "@/components/SectionHeader";
import ToursList from "@/components/ToursList";
import { getTranslations } from "next-intl/server";

export default async function Tours() {
  const t = await getTranslations("Tours");

  return (
    <ParallaxSection
      id="tours"
      tone="light"
      className="bg-white px-4 pb-20 text-black sm:px-6 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader title={t("title")} description={t("description")} />
        <ToursList limit={6} showAllLink staggerCards />
      </div>
    </ParallaxSection>
  );
}
