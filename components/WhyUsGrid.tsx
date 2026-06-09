"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type WhyUsItem = {
  key: string;
  text: string;
};

type WhyUsGridProps = {
  items: WhyUsItem[];
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function WhyUsGrid({ items }: WhyUsGridProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
        {items.map((item) => (
          <li
            key={item.key}
            className="flex items-start gap-3 rounded-2xl border-2 border-[#38ab8a] px-5 py-4 text-black sm:gap-4 sm:px-6 sm:py-5"
          >
            <span
              className="mt-0.5 shrink-0 text-lg font-semibold text-black sm:text-xl"
              aria-hidden
            >
              ✔
            </span>
            <span className="text-[15px] font-medium leading-relaxed text-black md:text-[18px]">
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6"
    >
      {items.map((item) => (
        <motion.li
          key={item.key}
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="flex items-start gap-3 rounded-2xl border-2 border-[#38ab8a] bg-white/80 px-5 py-4 text-black shadow-[0_4px_24px_rgba(15,79,79,0.04)] backdrop-blur-sm sm:gap-4 sm:px-6 sm:py-5"
        >
          <span
            className="mt-0.5 shrink-0 text-lg font-semibold text-black sm:text-xl"
            aria-hidden
          >
            ✔
          </span>
          <span className="text-[15px] font-medium leading-relaxed text-black md:text-[18px]">
            {item.text}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
