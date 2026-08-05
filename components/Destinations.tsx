import ParallaxSection from "@/components/ParallaxSection";
import SectionHeader from "@/components/SectionHeader";
import { placeIds, places } from "@/data/places";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function Destinations() {
  const t = await getTranslations("Destinations");

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

        <ul className="grid grid-cols-3 gap-3 sm:gap-4">
          {placeIds.map((id) => (
            <li key={id} className="min-w-0">
              <article className="group relative overflow-hidden rounded-2xl border border-black/10 shadow-[0_4px_24px_rgba(15,79,79,0.06)] transition-[box-shadow,transform] duration-300  hover:shadow-[0_12px_40px_rgba(15,79,79,0.14)]">
                <div className="relative aspect-square w-full">
                  <Image
                    src={places[id].image}
                    alt={t(`items.${id}.imageAlt`)}
                    fill
                    sizes="(max-width: 640px) 33vw, 400px"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-4">
                    <h3 className="font-afacad text-2xl font-semibold text-white sm:text-[1.65rem]">
                      {t(`items.${id}.name`)}
                    </h3>
                    <Link
                      href={`/places/${id}`}
                      className="inline-flex w-full items-center justify-center rounded-xl border border-[#991B1B] bg-[#DC2626] px-4 py-2.5 text-center text-[16px] font-medium text-white transition-colors hover:bg-[#B91C1C] hover:shadow-[0_4px_16px_rgba(220,38,38,0.35)] md:text-[18px]"
                    >
                      {t("explore")}
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </ParallaxSection>
  );
}
