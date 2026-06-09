"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image, { type ImageProps } from "next/image";
import { useRef } from "react";

type ParallaxImageProps = {
  className?: string;
  wrapperClassName?: string;
} & Pick<ImageProps, "src" | "alt" | "width" | "height" | "sizes" | "priority">;

export default function ParallaxImage({
  className = "",
  wrapperClassName = "",
  ...imageProps
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-16, 16]);

  return (
    <div ref={ref} className={`overflow-hidden ${wrapperClassName}`}>
      <motion.div style={{ y: reducedMotion ? 0 : y }}>
        <Image {...imageProps} className={className} />
      </motion.div>
    </div>
  );
}
