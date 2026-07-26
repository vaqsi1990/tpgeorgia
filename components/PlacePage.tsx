import type { PlaceId } from "@/data/places";
import { places } from "@/data/places";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const bodyKeys = ["p1", "p2", "p3"] as const;

type PlacePageProps = {
  place: PlaceId;
};

export default async function PlacePage({ place }: PlacePageProps) {
  const t = await getTranslations("Destinations");
  const placeData = places[place];

  return (
    <main className="bg-white text-black">
      <div className="relative min-h-[70svh] w-full overflow-hidden sm:min-h-[75svh] lg:min-h-[85svh]">
        <Image
          src={placeData.image}
          alt={t(`items.${place}.imageAlt`)}
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/20"
          aria-hidden
        />
        <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-4 px-6 text-center sm:gap-5 sm:px-10">
          <h1 className="font-afacad text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t(`items.${place}.name`)}
          </h1>
          <p className="max-w-3xl text-[16px] font-medium leading-relaxed text-white/95 md:text-[19px]">
            {t(`items.${place}.lead`)}
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-12 lg:px-10 lg:pb-28">
        <div className="space-y-6 text-[15px] leading-relaxed text-black/90 md:text-[18px]">
          {bodyKeys.map((key) => (
            <p key={key}>{t(`items.${place}.${key}`)}</p>
          ))}
        </div>

        <h2 className="font-afacad mt-10 mb-6 text-center text-xl font-semibold leading-snug text-black sm:text-2xl md:mt-12 md:mb-8">
          {t(`items.${place}.attractionsTitle`)}
        </h2>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {placeData.attractions.map((attraction) => {
            const name = t(
              `items.${place}.attractions.${attraction.id}` as "items.tbilisi.attractions.narikala",
            );

            return (
              <li key={attraction.id}>
                <article className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(15,79,79,0.1)]">
                  <Image
                    src={attraction.image}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 z-[1] flex flex-col gap-3 p-4 sm:p-5">
                    <div>
                      <h3 className="font-afacad text-xl font-semibold leading-snug text-white sm:text-2xl">
                        {name}
                      </h3>
                     
                    </div>
                    <Link
                      href={`/places/${place}/${attraction.slug}`}
                      className="inline-flex w-full items-center justify-center rounded-xl border border-[#991B1B] bg-[#DC2626] px-4 py-2.5 text-center text-[15px] font-medium text-white transition-colors hover:bg-[#B91C1C] hover:shadow-[0_4px_16px_rgba(220,38,38,0.35)] sm:text-[16px] md:text-[18px]"
                    >
                      {t("details" as "explore")}
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
