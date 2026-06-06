"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
};

type GalleryLightboxProps = {
  images: GalleryImage[];
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
  counterLabel: (current: number, total: number) => string;
  children: (open: (index: number) => void) => React.ReactNode;
};

export function GalleryLightbox({
  images,
  closeLabel,
  prevLabel,
  nextLabel,
  counterLabel,
  children,
}: GalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((index) =>
      index === null ? null : (index - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((index) =>
      index === null ? null : (index + 1) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, showNext, showPrev]);

  const activeImage = activeIndex === null ? null : images[activeIndex];

  return (
    <>
      {children(setActiveIndex)}

      {activeImage && activeIndex !== null ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label={closeLabel}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          <p className="absolute top-5 left-1/2 z-10 -translate-x-1/2 font-figtree text-sm tracking-widest text-white/70 uppercase">
            {counterLabel(activeIndex + 1, images.length)}
          </p>

          <button
            type="button"
            onClick={showPrev}
            className="absolute top-1/2 left-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
            aria-label={prevLabel}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={showNext}
            className="absolute top-1/2 right-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
            aria-label={nextLabel}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            className="absolute inset-0 -z-10"
            onClick={close}
            aria-label={closeLabel}
            tabIndex={-1}
          />

          <div className="relative h-[min(85vh,720px)] w-full max-w-5xl">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export type GalleryImageVariant =
  | "default"
  | "cinematic"
  | "polaroid"
  | "floating"
  | "wall";

type GalleryImageButtonProps = {
  src: string;
  alt: string;
  index: number;
  onOpen: (index: number) => void;
  className?: string;
  sizes: string;
  priority?: boolean;
  variant?: GalleryImageVariant;
  rotationClass?: string;
  label?: string;
};

const variantStyles: Record<GalleryImageVariant, string> = {
  default: "rounded-2xl bg-brand/5",
  cinematic:
    "rounded-[1.75rem] bg-brand/10 shadow-[0_20px_60px_rgba(15,79,79,0.25)]",
  polaroid:
    "rounded-sm bg-white p-2 pb-10 shadow-[0_16px_48px_rgba(15,79,79,0.18)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.03]",
  floating:
    "rounded-2xl bg-white p-1.5 shadow-[0_24px_64px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:-translate-y-2",
  wall: "mb-4 break-inside-avoid rounded-2xl bg-brand/5 shadow-[0_8px_32px_rgba(15,79,79,0.12)]",
};

export function GalleryImageButton({
  src,
  alt,
  index,
  onOpen,
  className = "",
  sizes,
  priority = false,
  variant = "default",
  rotationClass = "",
  label,
}: GalleryImageButtonProps) {
  const imageRadius =
    variant === "polaroid"
      ? "rounded-sm"
      : variant === "floating"
        ? "rounded-xl"
        : variant === "cinematic"
          ? "rounded-[1.35rem]"
          : "rounded-2xl";

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className={`group relative overflow-hidden ${variantStyles[variant]} ${rotationClass} ${className}`}
    >
      <span className="relative block size-full min-h-[inherit]">
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover ${imageRadius} transition-transform duration-700 group-hover:scale-110`}
          sizes={sizes}
          priority={priority}
        />
      </span>

      {label ? (
        <span className="absolute right-3 bottom-3 left-3 z-10 text-left font-figtree text-xs tracking-wide text-white/90 uppercase">
          {label}
        </span>
      ) : null}

      <span
        className={`pointer-events-none absolute inset-0 transition-all duration-500 ${
          variant === "cinematic"
            ? "bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 group-hover:from-black/70"
            : "bg-brand/0 group-hover:bg-brand/15"
        }`}
      />

      <span className="pointer-events-none absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path
            d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
