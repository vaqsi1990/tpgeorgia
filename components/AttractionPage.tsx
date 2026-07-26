import type { PlaceAttraction, PlaceId } from "@/data/places";
import { placeAttractionNameKey, placeFieldKey } from "@/data/places";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

type AttractionPageProps = {
  place: PlaceId;
  attraction: PlaceAttraction;
};

export default async function AttractionPage({
  place,
  attraction,
}: AttractionPageProps) {
  const t = await getTranslations("Destinations");
  const name = t(placeAttractionNameKey(place, attraction.id));
  const placeName = t(placeFieldKey(place, "name"));

  return (
    <main className="bg-white text-black">
      <div className="relative min-h-[50svh] w-full overflow-hidden sm:min-h-[55svh] lg:min-h-[60svh]">
        <Image
          src={attraction.image}
          alt={name}
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"
          aria-hidden
        />
        <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-3 px-6 text-center sm:px-10">
          <h1 className="font-afacad text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {name}
          </h1>
          <p className="text-[15px] font-medium text-white/90 md:text-[17px]">
            {placeName}
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-12 lg:px-10">
        <p className="mb-8 text-center text-[15px] leading-relaxed text-black/80 md:text-[18px]">
          {t(placeFieldKey(place, "attractionsTitle"))}
        </p>
        <Link
          href={`/places/${place}`}
          className="mx-auto flex w-full max-w-xs items-center justify-center rounded-xl border border-[#991B1B] bg-[#DC2626] px-4 py-2.5 text-center text-[16px] font-medium text-white transition-colors hover:bg-[#B91C1C] md:text-[18px]"
        >
          {t("backToPlace", { place: placeName })}
        </Link>
      </div>
    </main>
  );
}
