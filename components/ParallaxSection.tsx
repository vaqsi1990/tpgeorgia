"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

type ParallaxSectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "mint" | "warm";
  as?: "section" | "main" | "div";
  disableContentParallax?: boolean;
};

const blobColors = {
  light: ["bg-[#38ab8a]/10", "bg-brand/5"],
  mint: ["bg-[#38ab8a]/15", "bg-[#38ab8a]/8"],
  warm: ["bg-amber-300/15", "bg-[#38ab8a]/10"],
} as const;

export default function ParallaxSection({
  children,
  className = "",
  id,
  tone = "light",
  as: Tag = "section",
  disableContentParallax = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const blob1Y = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  return (
    <Tag id={id}>
      <div ref={ref} className={`relative overflow-hidden ${className}`}>
        {!reducedMotion ? (
          <>
            <motion.div
              aria-hidden
              style={{ y: blob1Y }}
              className={`pointer-events-none absolute -left-28 top-8 h-72 w-72 rounded-full blur-3xl ${blobColors[tone][0]}`}
            />
            <motion.div
              aria-hidden
              style={{ y: blob2Y }}
              className={`pointer-events-none absolute -right-24 bottom-4 h-80 w-80 rounded-full blur-3xl ${blobColors[tone][1]}`}
            />
            <motion.div
              aria-hidden
              style={{ y: blob1Y }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[min(90vw,64rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#38ab8a]/20 to-transparent"
            />
          </>
        ) : null}

        <motion.div
          style={{ y: reducedMotion || disableContentParallax ? 0 : contentY }}
          className="relative z-[1]"
        >
          {children}
        </motion.div>
      </div>
    </Tag>
  );
}
