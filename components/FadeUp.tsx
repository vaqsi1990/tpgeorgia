"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";

type FadeUpProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  trigger?: "load" | "scroll";
};

export default function FadeUp({
  children,
  className = "",
  delay = 0,
  trigger = "load",
}: FadeUpProps) {
  const reducedMotion = useReducedMotion();

  const transition: Transition = {
    duration: reducedMotion ? 0 : trigger === "load" ? 0.4 : 0.7,
    ease: [0.25, 0.1, 0.25, 1],
    delay: reducedMotion ? 0 : delay / 1000,
  };

  const hidden = { opacity: 0, y: reducedMotion ? 0 : trigger === "load" ? 24 : 40 };
  const visible = { opacity: 1, y: 0 };

  if (trigger === "scroll") {
    return (
      <motion.div
        className={className}
        initial={hidden}
        whileInView={visible}
        viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={hidden}
      animate={visible}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
