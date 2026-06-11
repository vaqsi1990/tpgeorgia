import ExcursionsList from "@/components/ExcursionsList";
import ParallaxSection from "@/components/ParallaxSection";
import SectionHeader from "@/components/SectionHeader";
import { listExcursions } from "@/lib/catalog-db";
import { getTranslations } from "next-intl/server";

export default async function Excursions() {
  const [t, excursions] = await Promise.all([
    getTranslations("Excursions"),
    listExcursions(),
  ]);

  return (
    <ParallaxSection
      id="excursions"
      tone="warm"
      className="bg-white px-4 pb-20 text-black sm:px-6 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader title={t("title")} description={t("description")} />
        <ExcursionsList
          initialExcursions={excursions}
          limit={6}
          showAllLink
          staggerCards
        />
      </div>
    </ParallaxSection>
  );
}
