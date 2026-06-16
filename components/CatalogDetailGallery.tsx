"use client";

import { useState } from "react";

type CatalogDetailGalleryProps = {
  images: string[];
  imageAlt: string;
  title: string;
  subtitle?: string;
  popularLabel?: string;
  isPopular?: boolean;
};

export default function CatalogDetailGallery({
  images,
  imageAlt,
  title,
  subtitle,
  popularLabel,
  isPopular = false,
}: CatalogDetailGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_20px_60px_rgba(15,79,79,0.14)] sm:rounded-[2rem]">
        <div className="relative aspect-[4/3] min-h-[240px] sm:aspect-[16/9] sm:min-h-[320px] md:min-h-[400px]">
          <img
            key={activeImage}
            src={activeImage}
            alt={`${imageAlt} ${activeIndex + 1}`}
            loading="eager"
            className="h-full w-full object-cover transition-opacity duration-300"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-10">
            {isPopular && popularLabel ? (
              <span className="mb-3 inline-flex rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black shadow-sm sm:text-[11px]">
                {popularLabel}
              </span>
            ) : null}
            <h1 className="font-afacad max-w-4xl text-[26px] font-semibold leading-[1.15] text-white sm:text-[2.25rem] md:text-[2.75rem]">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-2 max-w-2xl text-[15px] font-medium text-white/88 sm:text-[17px] md:text-lg">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {images.length > 1 ? (
        <div className="gallery-scroll-x flex gap-2 overflow-x-auto pb-1 sm:gap-3">
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`${imageAlt} ${index + 1}`}
              aria-current={index === activeIndex}
              className={`relative h-16 w-24 shrink-0 snap-start overflow-hidden rounded-xl transition-all sm:h-20 sm:w-28 ${
                index === activeIndex
                  ? "ring-2 ring-[#38ab8a] ring-offset-2"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
