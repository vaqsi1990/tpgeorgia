"use client";

import { GalleryLightbox } from "@/components/GalleryLightbox";
import { useTranslations } from "next-intl";

type CatalogDetailGalleryProps = {
  images: string[];
  imageAlt: string;
  title: string;
  subtitle?: string;
  popularLabel?: string;
  isPopular?: boolean;
  exclusiveLabel?: string;
  isExclusive?: boolean;
};

type GridImageCellProps = {
  src: string;
  alt: string;
  index: number;
  onOpen: (index: number) => void;
  className?: string;
  overlay?: React.ReactNode;
  priority?: boolean;
};

function GridImageCell({
  src,
  alt,
  index,
  onOpen,
  className = "",
  overlay,
  priority = false,
}: GridImageCellProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={alt}
      className={`group relative min-h-[120px] overflow-hidden bg-[#f3f4f4] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span
        className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"
        aria-hidden
      />
      {overlay}
    </button>
  );
}

function BadgeOverlay({
  popularLabel,
  isPopular,
  exclusiveLabel,
  isExclusive,
}: {
  popularLabel?: string;
  isPopular?: boolean;
  exclusiveLabel?: string;
  isExclusive?: boolean;
}) {
  if (!(isPopular && popularLabel) && !(isExclusive && exclusiveLabel)) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute right-3 top-3 z-10 flex max-w-[calc(100%-1.5rem)] flex-col items-end gap-2 sm:right-4 sm:top-4">
      {isExclusive && exclusiveLabel ? (
        <span className="inline-flex rounded-full bg-amber-400 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-black shadow-[0_2px_8px_rgba(245,158,11,0.4)] ring-2 ring-white sm:px-4 sm:py-2 sm:text-[12px]">
          {exclusiveLabel}
        </span>
      ) : null}
      {isPopular && popularLabel ? (
        <span className="inline-flex rounded-full bg-amber-400 px-3 py-1 text-[15px] font-bold uppercase tracking-wider text-black shadow-[0_2px_8px_rgba(245,158,11,0.4)]  sm:text-[11px]">
          {popularLabel}
        </span>
      ) : null}
    </div>
  );
}

function TitleOverlay({
  title,
  subtitle,
  popularLabel,
  isPopular,
  exclusiveLabel,
  isExclusive,
}: {
  title: string;
  subtitle?: string;
  popularLabel?: string;
  isPopular?: boolean;
  exclusiveLabel?: string;
  isExclusive?: boolean;
}) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
        aria-hidden
      />
      <BadgeOverlay
        popularLabel={popularLabel}
        isPopular={isPopular}
        exclusiveLabel={exclusiveLabel}
        isExclusive={isExclusive}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-8">
        <h1 className="font-afacad max-w-4xl text-left text-[26px] font-semibold leading-[1.15] text-white sm:text-[2.25rem] md:text-[2.75rem]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-left text-[15px] font-medium text-white/88 sm:text-[17px] md:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
    </>
  );
}

export default function CatalogDetailGallery({
  images,
  imageAlt,
  title,
  subtitle,
  popularLabel,
  isPopular = false,
  exclusiveLabel,
  isExclusive = false,
}: CatalogDetailGalleryProps) {
  const t = useTranslations("Gallery");

  const galleryImages = images.map((src, index) => ({
    id: index,
    src,
    alt: `${imageAlt} ${index + 1}`,
  }));

  const thumbs = galleryImages.slice(1, 5);
  const photoCountLabel = t("hero.photoCount", { count: galleryImages.length });

  return (
    <GalleryLightbox
      images={galleryImages}
      closeLabel={t("lightbox.close")}
      prevLabel={t("lightbox.prev")}
      nextLabel={t("lightbox.next")}
      counterLabel={(current, total) =>
        t("lightbox.counter", { current, total })
      }
    >
      {(open) => {
        if (galleryImages.length === 1) {
          return (
            <div className="overflow-hidden rounded-[1.75rem] shadow-[0_20px_60px_rgba(15,79,79,0.14)] sm:rounded-[2rem]">
              <GridImageCell
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                index={0}
                onOpen={open}
                priority
                className="aspect-[4/3] min-h-[240px] w-full sm:aspect-[16/9] sm:min-h-[320px] md:min-h-[400px]"
                overlay={
                  <TitleOverlay
                    title={title}
                    subtitle={subtitle}
                    popularLabel={popularLabel}
                    isPopular={isPopular}
                    exclusiveLabel={exclusiveLabel}
                    isExclusive={isExclusive}
                  />
                }
              />
            </div>
          );
        }

        const photoCountOverlay = (
          <span className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold text-black shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:bottom-4 sm:right-4 sm:px-4 sm:py-2 sm:text-[14px]">
            {photoCountLabel}
            <span aria-hidden>›</span>
          </span>
        );

        return (
          <div className="overflow-hidden rounded-[1.75rem] shadow-[0_20px_60px_rgba(15,79,79,0.14)] sm:rounded-[2rem]">
            <div className="flex flex-col gap-1 md:aspect-[16/10] md:min-h-[360px] md:flex-row">
              <GridImageCell
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                index={0}
                onOpen={open}
                priority
                className="aspect-[4/3] w-full md:aspect-auto md:min-h-0 md:w-1/2 md:flex-1"
                overlay={
                  <TitleOverlay
                    title={title}
                    subtitle={subtitle}
                    popularLabel={popularLabel}
                    isPopular={isPopular}
                    exclusiveLabel={exclusiveLabel}
                    isExclusive={isExclusive}
                  />
                }
              />

              {thumbs.length > 0 ? (
                <div className="grid grid-cols-2 grid-rows-2 gap-1 md:w-1/2 md:flex-1">
                  {thumbs.map((image, thumbIndex) => {
                    const isLastVisible = thumbIndex === thumbs.length - 1;

                    return (
                      <GridImageCell
                        key={image.id}
                        src={image.src}
                        alt={image.alt}
                        index={thumbIndex + 1}
                        onOpen={open}
                        className="aspect-[4/3] md:aspect-auto md:min-h-0"
                        overlay={isLastVisible ? photoCountOverlay : undefined}
                      />
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        );
      }}
    </GalleryLightbox>
  );
}
