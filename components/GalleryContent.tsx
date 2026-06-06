"use client";

import { GalleryLightbox } from "@/components/GalleryLightbox";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
};

type GalleryContentProps = {
  images: GalleryImage[];
};

type GallerySection =
  | { type: "quad"; images: GalleryImage[]; startIndex: number }
  | { type: "trio"; images: GalleryImage[]; startIndex: number }
  | { type: "single"; images: GalleryImage[]; startIndex: number };

function buildGallerySections(images: GalleryImage[]): GallerySection[] {
  const sections: GallerySection[] = [];
  let index = 0;
  let useQuad = true;

  while (index < images.length) {
    const remaining = images.length - index;

    if (useQuad && remaining >= 4) {
      sections.push({
        type: "quad",
        images: images.slice(index, index + 4),
        startIndex: index,
      });
      index += 4;
    } else if (!useQuad && remaining >= 3) {
      sections.push({
        type: "trio",
        images: images.slice(index, index + 3),
        startIndex: index,
      });
      index += 3;
    } else if (remaining === 1) {
      sections.push({
        type: "single",
        images: images.slice(index),
        startIndex: index,
      });
      break;
    } else if (remaining === 2) {
      sections.push({
        type: "trio",
        images: images.slice(index),
        startIndex: index,
      });
      break;
    } else {
      sections.push({
        type: "quad",
        images: images.slice(index),
        startIndex: index,
      });
      break;
    }

    useQuad = !useQuad;
  }

  return sections;
}

function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-white/90"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4" strokeLinecap="round" />
    </svg>
  );
}

type GalleryTileProps = {
  image: GalleryImage;
  index: number;
  onOpen: (index: number) => void;
  className?: string;
  sizes: string;
  priority?: boolean;
  featured?: boolean;
};

function GalleryTile({
  image,
  index,
  onOpen,
  className = "",
  sizes,
  priority = false,
  featured = false,
}: GalleryTileProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className={`group relative overflow-hidden rounded-3xl bg-brand/5 ${className}`}
      aria-label={image.alt}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes={sizes}
        priority={priority}
      />

      <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />

      {featured ? (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/35 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <ExpandIcon />
          </span>
        </span>
      ) : null}
    </button>
  );
}

export default function GalleryContent({ images }: GalleryContentProps) {
  const t = useTranslations("Gallery");
  const tHeader = useTranslations("Header");
  const sections = buildGallerySections(images);

  return (
    <GalleryLightbox
      images={images}
      closeLabel={t("lightbox.close")}
      prevLabel={t("lightbox.prev")}
      nextLabel={t("lightbox.next")}
      counterLabel={(current, total) =>
        t("lightbox.counter", { current, total })
      }
    >
      {(open) => (
        <div className="lg:grid lg:grid-cols-[minmax(240px,300px)_1fr] lg:items-start lg:gap-10 xl:gap-14">
          <aside className="mb-10 lg:sticky lg:top-36 lg:mb-0 lg:self-start">
            <nav
              aria-label={t("breadcrumb.label")}
              className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-black/55 sm:text-[14px]"
            >
              <Link href="/" className="transition-colors hover:text-brand">
                {tHeader("nav.home")}
              </Link>
              <span aria-hidden>/</span>
              <span className="text-black">{tHeader("nav.gallery")}</span>
            </nav>

          
            

            <blockquote className="mb-8 border-l-2 border-brand/30 pl-4">
              <p className="font-afacad text-lg leading-snug text-black/85 italic sm:text-xl">
                “{t("aside.quote")}”
              </p>
              <footer className="mt-2 font-figtree text-xs tracking-wide text-black/50 uppercase">
                {t("aside.attribution")}
              </footer>
            </blockquote>

            <p className="font-figtree text-[13px] text-black/45">{t("hero.hint")}</p>

            <div className="mt-8 hidden gap-2 lg:grid lg:grid-cols-3">
              {images.slice(0, 3).map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => open(index)}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-brand/5"
                  aria-label={image.alt}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="100px"
                  />
                </button>
              ))}
            </div>
          </aside>

          <section aria-label={t("grid.label")} className="space-y-4 sm:space-y-5">
            {sections.map((section) => {
              if (section.type === "quad") {
                const [topLeft, bottomLeft, middle, right] = section.images;

                return (
                  <div
                    key={`quad-${section.startIndex}`}
                    className="grid grid-cols-2 grid-rows-2 gap-3 sm:h-[420px] sm:grid-cols-3 sm:grid-rows-2 sm:gap-4 lg:h-[480px]"
                  >
                    <GalleryTile
                      image={topLeft}
                      index={section.startIndex}
                      onOpen={open}
                      className="aspect-[4/3] sm:aspect-auto sm:min-h-0"
                      sizes="(max-width: 640px) 50vw, 25vw"
                      priority={section.startIndex < 4}
                    />
                    <GalleryTile
                      image={bottomLeft}
                      index={section.startIndex + 1}
                      onOpen={open}
                      className="aspect-[4/3] sm:col-start-1 sm:row-start-2 sm:aspect-auto sm:min-h-0"
                      sizes="(max-width: 640px) 50vw, 25vw"
                      priority={section.startIndex + 1 < 4}
                    />
                    <GalleryTile
                      image={middle}
                      index={section.startIndex + 2}
                      onOpen={open}
                      className="aspect-[3/4] sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:aspect-auto sm:min-h-0"
                      sizes="(max-width: 640px) 50vw, 25vw"
                      priority={section.startIndex + 2 < 4}
                    />
                    <GalleryTile
                      image={right}
                      index={section.startIndex + 3}
                      onOpen={open}
                      className="aspect-[3/4] sm:col-start-3 sm:row-span-2 sm:row-start-1 sm:aspect-auto sm:min-h-0"
                      sizes="(max-width: 640px) 50vw, 25vw"
                      priority={section.startIndex + 3 < 4}
                    />
                  </div>
                );
              }

              if (section.type === "trio") {
                const [featured, second, third] = section.images;

                return (
                  <div key={`trio-${section.startIndex}`} className="space-y-3 sm:space-y-0">
                    <div className="grid h-[220px] grid-cols-1 gap-3 sm:h-[320px] sm:grid-cols-[2fr_1fr_1fr] sm:gap-4 lg:h-[360px]">
                      <GalleryTile
                        image={featured}
                        index={section.startIndex}
                        onOpen={open}
                        className="sm:min-h-0"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        featured
                      />
                      {second ? (
                        <GalleryTile
                          image={second}
                          index={section.startIndex + 1}
                          onOpen={open}
                          className="hidden sm:block sm:min-h-0"
                          sizes="25vw"
                        />
                      ) : null}
                      {third ? (
                        <GalleryTile
                          image={third}
                          index={section.startIndex + 2}
                          onOpen={open}
                          className="hidden sm:block sm:min-h-0"
                          sizes="25vw"
                        />
                      ) : null}
                    </div>

                    {second || third ? (
                      <div className="grid grid-cols-2 gap-3 sm:hidden">
                        {second ? (
                          <GalleryTile
                            image={second}
                            index={section.startIndex + 1}
                            onOpen={open}
                            className="aspect-[3/4]"
                            sizes="50vw"
                          />
                        ) : null}
                        {third ? (
                          <GalleryTile
                            image={third}
                            index={section.startIndex + 2}
                            onOpen={open}
                            className="aspect-[3/4]"
                            sizes="50vw"
                          />
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                );
              }

              return (
                <div key={`single-${section.startIndex}`} className="h-[280px] sm:h-[360px]">
                  <GalleryTile
                    image={section.images[0]}
                    index={section.startIndex}
                    onOpen={open}
                    className="size-full"
                    sizes="100vw"
                  />
                </div>
              );
            })}
          </section>
        </div>
      )}
    </GalleryLightbox>
  );
}
