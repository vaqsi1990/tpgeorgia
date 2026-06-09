"use client";

import FadeUp from "@/components/FadeUp";
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
      ref={sectionRef}
      className="relative w-full"
      aria-roledescription="carousel"
      aria-label={t("ariaLabel")}
    >
      <div className="relative w-full overflow-hidden">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {slides.map((slide, index) => (
              <div
                key={slide.key}
                className="relative min-w-0 flex-[0_0_100%]"
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
          className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center px-6 sm:px-10"
          style={
            reducedMotion
              ? undefined
              : { y: titleScrollY, opacity: titleScrollOpacity }
          }
        >
          <FadeUp delay={150}>
            <h1 className="font-afacad max-w-4xl text-center text-3xl leading-tight font-semibold tracking-tight text-white drop-shadow-md sm:text-3xl md:text-4xl lg:text-5xl">
              {t("title")}
            </h1>
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
