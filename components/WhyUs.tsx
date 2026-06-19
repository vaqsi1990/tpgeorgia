import ParallaxSection from "@/components/ParallaxSection";
import SectionHeader from "@/components/SectionHeader";
import WhyUsGrid from "@/components/WhyUsGrid";
import { getTranslations } from "next-intl/server";

const statKeys = ["tours", "participants", "experience"] as const;

export default async function WhyUs() {
  const t = await getTranslations("WhyUs");
  const items = statKeys.map((key) => ({
    key,
    value: t(`stats.${key}.value`),
    label: t(`stats.${key}.label`),
  }));

  return (
    <ParallaxSection
      tone="mint"
      className="bg-white px-4 pt-10 pb-6 sm:px-6 sm:pt-12 sm:pb-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader title={t("title")} className="mb-4 sm:mb-6" />
        <WhyUsGrid items={items} />
      </div>
    </ParallaxSection>
  );
}
