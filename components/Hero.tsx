"use client";

import FadeUp from "@/components/FadeUp";
import { Link } from "@/i18n/navigation";
import useEmblaCarousel from "embla-carousel-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  { src: "/images/1.png", key: "1" },
  { src: "/images/2.png", key: "2" },
  { src: "/images/3.png", key: "3" },
] as const;

export default function Hero() {
  const t = useTranslations("Hero");
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const titleScrollY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const titleScrollOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.72]);
  const dotsOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const interval = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 7000);

    return () => window.clearInterval(interval);
  }, [emblaApi]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-x-hidden"
      aria-roledescription="carousel"
      aria-label={t("ariaLabel")}
    >
      <div className="relative w-full overflow-hidden">
        <div ref={emblaRef} className="w-full overflow-hidden">
          <div className="flex touch-pan-y">
            {slides.map((slide, index) => (
              <div
                key={slide.key}
                className="relative min-w-0 shrink-0 grow-0 basis-full"
              >
                <div className="relative min-h-[70svh] w-full overflow-hidden sm:min-h-[75svh] lg:min-h-[85svh]">
                  <motion.div
                    className="absolute inset-0 -top-[12%] h-[124%] w-full will-change-transform"
                    style={
                      reducedMotion
                        ? undefined
                        : { y: imageY, scale: imageScale }
                    }
                  >
                    <Image
                      src={slide.src}
                      alt={t("slideAlt", { number: slide.key })}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority={index === 0}
                    />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] bg-black"
          aria-hidden
          style={reducedMotion ? { opacity: 0.4 } : { opacity: overlayOpacity }}
        />

        <motion.div
          className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-center gap-6 px-6 sm:gap-8 sm:px-10"
          style={
            reducedMotion
              ? undefined
              : { y: titleScrollY, opacity: titleScrollOpacity }
          }
        >
          <FadeUp delay={150}>
            <div className="flex max-w-4xl flex-col items-center gap-3 sm:gap-4">
              <h1 className="font-afacad text-center text-4xl leading-tight font-semibold tracking-tight text-white drop-shadow-md sm:text-4xl md:text-5xl lg:text-6xl">
                {t("title")}
              </h1>
              <p className="max-w-3xl text-center text-xl font-medium leading-snug text-white/95 drop-shadow-sm sm:text-2xl md:text-2xl lg:text-3xl">
                {t("subtitle")}
              </p>
              <p className="rounded-full border border-white/30 bg-white/15 px-5 py-2 text-center text-base font-semibold tracking-wide text-white backdrop-blur-sm sm:text-lg md:text-xl">
                {t("experienceBadge")}
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={300}>
            <Link
              href="/#contact"
              className="pointer-events-auto inline-flex items-center justify-center rounded-xl  bg-[#38ab8a] px-8 py-3 text-[18px] font-medium text-white shadow-[0_4px_16px_rgba(56,171,138,0.25)] transition-colors hover:bg-[#2f9a7c] md:text-[20px]"
            >
              {t("cta")}
            </Link>
          </FadeUp>
        </motion.div>

        <motion.div
          className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2"
          style={reducedMotion ? undefined : { opacity: dotsOpacity }}
        >
          {slides.map((slide, index) => (
            <button
              key={slide.key}
              type="button"
              aria-label={t("goToSlide", { number: slide.key })}
              aria-current={selectedIndex === index ? "true" : undefined}
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition-all ${
                selectedIndex === index
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
