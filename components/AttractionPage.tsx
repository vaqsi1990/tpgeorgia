import type { PlaceAttraction, PlaceId } from "@/data/places";
import {
  placeAttractionDescriptionKey,
  placeAttractionNameKey,
  placeFieldKey,
} from "@/data/places";
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
  const description = t(placeAttractionDescriptionKey(place, attraction.id));
  const mapEmbedUrl =
    attraction.mapEmbedUrl ??
    (attraction.mapCoords
      ? `https://maps.google.com/maps?q=${attraction.mapCoords.lat},${attraction.mapCoords.lng}&z=17&output=embed`
      : null);

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
        {description ? (
          <div className="mb-10 space-y-5 whitespace-pre-line text-[15px] leading-relaxed text-black/90 md:text-[18px]">
            {description}
          </div>
        ) : null}

        {mapEmbedUrl ? (
          <div className="mb-10 overflow-hidden rounded-2xl border border-black/10">
            <iframe
              title={name}
              src={mapEmbedUrl}
              className="h-64 w-full border-0 sm:h-80"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            {attraction.mapUrl ? (
              <a
                href={attraction.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center bg-black/[0.03] px-4 py-3 text-center text-[15px] font-medium text-black transition-colors hover:bg-black/[0.06] md:text-[16px]"
              >
                {t("openInMaps")}
              </a>
            ) : null}
          </div>
        ) : null}

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
