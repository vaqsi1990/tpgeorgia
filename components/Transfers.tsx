import ParallaxSection from "@/components/ParallaxSection";
import SectionHeader from "@/components/SectionHeader";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";

const TransfersList = dynamic(() => import("@/components/TransfersList"), {
  loading: () => (
    <div
      className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6"
      aria-hidden
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-[420px] animate-pulse rounded-2xl bg-black/[0.04]"
        />
      ))}
    </div>
  ),
});

export default async function Transfers() {
  const t = await getTranslations("Transfers");

  return (
    <ParallaxSection
      id="transfers"
      tone="mint"
      disableContentParallax
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#f0faf7] to-white px-4 pt-4 pb-6 text-black sm:px-6 sm:pt-5 sm:pb-8 lg:px-10"
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl">
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
