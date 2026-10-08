import { Link } from "@/i18n/navigation";
import type { PublicAttraction } from "@/lib/place-types";
import Image from "next/image";

type AttractionPageProps = {
  placeId: string;
  placeName: string;
  attraction: PublicAttraction;
  childAttractions: PublicAttraction[];
  parent: { slug: string; name: string } | null;
  backToPlaceLabel: string;
  detailsLabel: string;
  openInMapsLabel: string;
  fallbackGroupTitle: string;
};

export default function AttractionPage({
  placeId,
  placeName,
  attraction,
  childAttractions,
  parent,
  backToPlaceLabel,
  detailsLabel,
  openInMapsLabel,
  fallbackGroupTitle,
}: AttractionPageProps) {
  const backHref = parent
    ? `/places/${placeId}/${parent.slug}`
    : `/places/${placeId}`;
  const backLabel = parent ? parent.name : backToPlaceLabel;
  const mapEmbedUrl =
    attraction.mapLat !== null && attraction.mapLng !== null
      ? `https://maps.google.com/maps?q=${attraction.mapLat},${attraction.mapLng}&z=14&output=embed`
      : null;
  const groupTitle = attraction.groupTitle || fallbackGroupTitle;

  return (
    <main className="bg-white text-black">
      <div className="relative min-h-[50svh] w-full overflow-hidden sm:min-h-[55svh] lg:min-h-[60svh]">
        <Image
          src={attraction.image}
          alt={attraction.name}
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
            {attraction.name}
          </h1>
          <p className="text-[15px] font-medium text-white/90 md:text-[17px]">
            {placeName}
          </p>
        </div>
      </div>

      <div
        className={
          childAttractions.length > 0
            ? "mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-12 lg:px-10"
            : "mx-auto w-full max-w-3xl px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-12 lg:px-10"
        }
      >
        {attraction.description ? (
          <div className="mb-10 space-y-5 whitespace-pre-line text-[15px] leading-relaxed text-black/90 md:text-[18px]">
            {attraction.description}
          </div>
        ) : null}

        {childAttractions.length > 0 ? (
          <section className="mb-10">
            {groupTitle ? (
              <h2 className="font-afacad mb-6 text-center text-xl font-semibold leading-snug text-black sm:text-2xl md:mb-8">
                {groupTitle}
              </h2>
            ) : null}
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {childAttractions.map((child) => (
                <li key={child.id}>
                  <article className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(15,79,79,0.1)]">
                    <Image
                      src={child.image}
                      alt={child.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"
                      aria-hidden
                    />
                    <div className="absolute inset-x-0 bottom-0 z-[1] flex flex-col gap-3 p-4 sm:p-5">
                      <h3 className="font-afacad text-xl font-semibold leading-snug text-white sm:text-2xl">
                        {child.name}
                      </h3>
                      <Link
                        href={`/places/${placeId}/${child.slug}`}
                        className="inline-flex w-full items-center justify-center rounded-xl border border-[#991B1B] bg-[#DC2626] px-4 py-2.5 text-center text-[15px] font-medium text-white transition-colors hover:bg-[#B91C1C] hover:shadow-[0_4px_16px_rgba(220,38,38,0.35)] sm:text-[16px] md:text-[18px]"
                      >
                        {detailsLabel}
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {mapEmbedUrl ? (
          <div className="mb-10 overflow-hidden rounded-2xl border border-black/10">
            <iframe
              title={attraction.name}
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
                {openInMapsLabel}
              </a>
            ) : null}
          </div>
        ) : null}

        <Link
          href={backHref}
          className="mx-auto flex w-full max-w-xs items-center justify-center rounded-xl border border-[#991B1B] bg-[#DC2626] px-4 py-2.5 text-center text-[16px] font-medium text-white transition-colors hover:bg-[#B91C1C] md:text-[18px]"
        >
          {backLabel}
        </Link>
      </div>
    </main>
  );
}
