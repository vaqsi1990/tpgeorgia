"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type WhyUsStatKey = "tours" | "participants" | "experience";

export type WhyUsStat = {
  key: WhyUsStatKey;
  value: string;
  label: string;
};

type WhyUsGridProps = {
  items: WhyUsStat[];
};

const itemClassName =
  "flex h-full flex-col items-center justify-center gap-2 rounded-2xl border border-[#38ab8a]/25 bg-white/80 px-4 py-8 text-center shadow-[0_4px_24px_rgba(15,79,79,0.04)] backdrop-blur-sm sm:gap-3 sm:px-5 sm:py-10";

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
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

function WhyUsStatContent({ item }: { item: WhyUsStat }) {
  return (
    <>
      <span className="font-afacad text-4xl font-bold leading-none text-[#DC2626] sm:text-5xl md:text-[3.25rem]">
        {item.value}
      </span>
      <span className="max-w-[14rem] text-[16px] font-medium leading-snug text-black/80 sm:text-[18px]">
        {item.label}
      </span>
    </>
  );
}

export default function WhyUsGrid({ items }: WhyUsGridProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-5">
        {items.map((item) => (
          <li key={item.key} className={itemClassName}>
            <WhyUsStatContent item={item} />
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
      className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-5"
    >
      {items.map((item) => (
        <motion.li
          key={item.key}
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={itemClassName}
        >
          <WhyUsStatContent item={item} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
