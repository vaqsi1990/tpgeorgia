"use client";

import { Link } from "@/i18n/navigation";
import type { PublicPlaceCard } from "@/lib/place-types";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type DestinationsCarouselProps = {
  places: PublicPlaceCard[];
};

export default function DestinationsCarousel({ places }: DestinationsCarouselProps) {
  const t = useTranslations("Destinations");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setSnapCount(emblaApi.scrollSnapList().length);
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    update();

    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  if (places.length === 0) return null;

  return (
    <div className="relative" aria-roledescription="carousel" aria-label={t("carouselAriaLabel")}>
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="-ml-4 flex touch-pan-y">
          {places.map((place) => (
            <li
              key={place.id}
              className="min-w-0 shrink-0 grow-0 basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
            >
              <article className="group relative overflow-hidden rounded-2xl border border-black/10 shadow-[0_4px_24px_rgba(15,79,79,0.06)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_12px_40px_rgba(15,79,79,0.14)]">
                <div className="relative aspect-[4/3] w-full sm:aspect-square">
                  <Image
                    src={place.image}
                    alt={place.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2.5 p-3 sm:gap-3 sm:p-4">
                    <h3 className="font-afacad text-xl font-semibold text-white sm:text-2xl lg:text-[1.65rem]">
                      {place.name}
                    </h3>
                    <Link
                      href={`/places/${place.id}`}
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

      {snapCount > 1 ? (
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label={t("prevSlide")}
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            className="flex size-10 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-md transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <svg viewBox="0 0 20 20" className="size-5" fill="currentColor" aria-hidden>
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: snapCount }, (_, index) => (
              <button
                key={index}
                type="button"
                aria-label={t("goToSlide", { number: index + 1 })}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === selectedIndex ? "w-6 bg-[#DC2626]" : "w-2 bg-black/20 hover:bg-black/35"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label={t("nextSlide")}
            disabled={!canScrollNext}
            onClick={scrollNext}
            className="flex size-10 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-md transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <svg viewBox="0 0 20 20" className="size-5" fill="currentColor" aria-hidden>
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
