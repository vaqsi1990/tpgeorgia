"use client";

import ReviewCarouselCard from "@/components/ReviewCarouselCard";
import type { ReviewRecord } from "@/lib/review-types";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

type ReviewsCarouselProps = {
  reviews: ReviewRecord[];
};

export default function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const t = useTranslations("Reviews");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: reviews.length > 1,
    align: "start",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
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

  useEffect(() => {
    if (!emblaApi || reviews.length <= 1) return;

    const interval = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);

    return () => window.clearInterval(interval);
  }, [emblaApi, reviews.length]);

  if (reviews.length === 0) {
    return null;
  }

  return (
    <div
      className="relative"
      aria-roledescription="carousel"
      aria-label={t("carouselAriaLabel")}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex touch-pan-y">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="min-w-0 shrink-0 grow-0 basis-full pl-4 sm:basis-[85%] lg:basis-[calc(33.333%-0px)]"
            >
              <ReviewCarouselCard review={review} />
            </div>
          ))}
        </div>
      </div>

      {reviews.length > 1 ? (
        <>
          <div className="mt-6 flex items-center justify-center gap-2">
            {reviews.map((review, index) => (
              <button
                key={review.id}
                type="button"
                aria-label={t("goToSlide", { number: index + 1 })}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === selectedIndex
                    ? "w-6 bg-[#38ab8a]"
                    : "w-2 bg-black/20 hover:bg-black/35"
                }`}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between lg:flex">
            <button
              type="button"
              aria-label={t("prevSlide")}
              disabled={!canScrollPrev}
              onClick={scrollPrev}
              className="pointer-events-auto -ml-3 flex size-10 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-md transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <svg viewBox="0 0 20 20" className="size-5" fill="currentColor" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label={t("nextSlide")}
              disabled={!canScrollNext}
              onClick={scrollNext}
              className="pointer-events-auto -mr-3 flex size-10 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-md transition-opacity hover:opacity-90 disabled:opacity-40"
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
        </>
      ) : null}
    </div>
  );
}
