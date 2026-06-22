import ParallaxSection from "@/components/ParallaxSection";
import SectionHeader from "@/components/SectionHeader";
import TransfersList from "@/components/TransfersList";
import { getTranslations } from "next-intl/server";

export default async function Transfers() {
  const t = await getTranslations("Transfers");

  return (
    <ParallaxSection
      id="transfers"
      tone="mint"
      className="bg-white px-4 pt-4 pb-6 text-black sm:px-6 sm:pt-5 sm:pb-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader
          title={t("title")}
          description={t("description")}
          className="mb-4 sm:mb-6"
        />
        <TransfersList />
      </div>
    </ParallaxSection>
  );
}
