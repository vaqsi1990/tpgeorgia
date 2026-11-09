import ParallaxSection from "@/components/ParallaxSection";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function WinterSpecial() {
  const t = await getTranslations("WinterSpecial");

  return (
    <ParallaxSection
      id="winter-special"
      className="bg-white px-4 pt-2 pb-2 sm:px-6 sm:pt-3 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <article className="group relative overflow-hidden rounded-2xl border border-black/10 shadow-[0_4px_24px_rgba(15,79,79,0.06)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_12px_40px_rgba(15,79,79,0.14)]">
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/8] lg:aspect-[21/8]">
            <Image
              src="/winter.png"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-4 sm:gap-3 sm:p-8 lg:p-10">
              <p className="text-[15px] font-medium tracking-wide text-white/90 sm:text-[17px]">
                {t("title")}
              </p>
              <h2 className="font-afacad text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t("headline")}
              </h2>
              <p className="max-w-2xl text-[15px] leading-relaxed text-white/95 md:text-[18px]">
                {t("description")}
              </p>
              <Link
                href="/winter"
                className="inline-flex items-center justify-center rounded-xl border border-[#991B1B] bg-[#DC2626] px-5 py-2.5 text-[16px] font-medium text-white transition-colors hover:bg-[#B91C1C] hover:shadow-[0_4px_16px_rgba(220,38,38,0.35)] md:text-[18px]"
              >
                {t("cta")}
              </Link>
            </div>
          </div>
        </article>
      </div>
    </ParallaxSection>
  );
}
