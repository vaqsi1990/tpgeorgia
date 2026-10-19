"use client";

import ParallaxSection from "@/components/ParallaxSection";
import SectionHeader from "@/components/SectionHeader";
import StarRating from "@/components/StarRating";
import type { GooglePlaceReviews, GoogleReview } from "@/lib/google-reviews";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

export default function GoogleReviewsClient({
  place,
}: {
  place: GooglePlaceReviews;
}) {
  const t = useTranslations("Reviews");

  return (
    <ParallaxSection
      id="reviews"
      className="bg-white px-4 pt-4 pb-6 text-black sm:px-6 sm:pt-5 sm:pb-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader
          title={t("sectionTitle")}
          description={t("homeDescription")}
          className="mb-4 sm:mb-6"
        />
        {place.rating !== null ? (
          <div className="mb-6 flex justify-center">
            <StarRating
              value={place.rating}
              showValue
              reviewCount={place.reviewCount}
            />
          </div>
        ) : null}
        <GoogleReviewsCarousel reviews={place.reviews} />
        {place.mapsUrl ? (
          <p className="mt-6 flex items-center justify-center gap-3">
            <a
              href={place.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[16px] font-medium text-[#0f4f4f] transition-opacity hover:opacity-70 md:text-[18px]"
            >
              {t("viewOnGoogle")}
            </a>
            <img
              src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
              alt="Google"
              className="h-4 w-auto"
            />
          </p>
        ) : null}
      </div>
    </ParallaxSection>
  );
}

function GoogleReviewsCarousel({ reviews }: { reviews: GoogleReview[] }) {
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
              className="min-w-0 shrink-0 grow-0 basis-full pl-4 sm:basis-[85%] lg:basis-1/3"
            >
              <GoogleReviewCard review={review} />
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
                    ? "w-6 bg-[#DC2626]"
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

function GoogleReviewCard({ review }: { review: GoogleReview }) {
  const name = review.authorUrl ? (
    <a
      href={review.authorUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-black transition-opacity hover:opacity-70"
    >
      {review.authorName}
    </a>
  ) : (
    <p className="font-semibold text-black">{review.authorName}</p>
  );

  return (
    <article className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-5 shadow-[0_4px_24px_rgba(15,79,79,0.06)] sm:p-6">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {review.photoUrl ? (
            <img
              src={review.photoUrl}
              alt=""
              referrerPolicy="no-referrer"
              className="size-10 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-black/5 text-[16px] font-semibold text-black">
              {review.authorName.slice(0, 1)}
            </span>
          )}
          <div className="min-w-0">
            <div className="truncate text-[16px] md:text-[18px]">{name}</div>
            {review.relativeTime ? (
              <p className="truncate text-[14px] text-black/50 md:text-[15px]">
                {review.relativeTime}
              </p>
            ) : null}
          </div>
        </div>
        <StarRating value={review.rating} size="sm" />
      </div>
      {review.text ? (
        <blockquote className="line-clamp-5 flex-1 text-[16px] leading-relaxed text-black/85 md:text-[18px]">
          &ldquo;{review.text}&rdquo;
        </blockquote>
      ) : null}
    </article>
  );
}
