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

export default function ParallaxSection({
  children,
  className = "",
  id,
  as: Tag = "section",
  disableContentParallax = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  return (
    <Tag id={id}>
      <div ref={ref} className={`relative ${className}`}>
        <motion.div
          style={{ y: reducedMotion || disableContentParallax ? 0 : contentY }}
          className="relative"
        >
          {children}
        </motion.div>
      </div>
    </Tag>
  );
}
