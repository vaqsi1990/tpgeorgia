import ParallaxSection from "@/components/ParallaxSection";
import SectionHeader from "@/components/SectionHeader";
import WhyUsGrid from "@/components/WhyUsGrid";
import { getTranslations } from "next-intl/server";

const itemKeys = [
  "routes",
  "guides",
  "students",
  "games",
  "program",
  "organization",
] as const;

export default async function WhyUs() {
  const t = await getTranslations("WhyUs");
  const items = itemKeys.map((key) => ({
    key,
    text: t(`items.${key}`),
  }));

  return (
    <ParallaxSection
      tone="mint"
      className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader title={t("title")} />
        <WhyUsGrid items={items} />
      </div>
    </ParallaxSection>
  );
}
