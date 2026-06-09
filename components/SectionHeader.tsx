"use client";

import { motion, useReducedMotion } from "framer-motion";

type SectionHeaderProps = {
  title: string;
  description?: string;
  className?: string;
  as?: "h1" | "h2";
  trigger?: "load" | "scroll";
};

const headingClassName =
  "font-afacad mb-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-[2.5rem]";

export default function SectionHeader({
  title,
  description,
  className = "",
  as = "h2",
  trigger = "scroll",
}: SectionHeaderProps) {
  const reducedMotion = useReducedMotion();
  const Heading = as;
  const hidden = { opacity: 0, y: reducedMotion ? 0 : 36 };
  const visible = { opacity: 1, y: 0 };
  const transition = {
    duration: reducedMotion ? 0 : trigger === "load" ? 0.4 : 0.65,
    ease: [0.25, 0.1, 0.25, 1] as const,
  };

  return (
    <motion.div
      className={`mb-10 text-center sm:mb-14 ${className}`}
      initial={hidden}
      {...(trigger === "load"
        ? { animate: visible }
        : {
            whileInView: visible,
            viewport: { once: true, amount: 0.45 },
          })}
      transition={transition}
    >
      <Heading className={headingClassName}>{title}</Heading>
      {description ? (
        <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-black md:text-[18px]">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
