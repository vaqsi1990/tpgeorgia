"use client";

import {
  Award,
  MessageCircle,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type WhyUsItemKey = "experience" | "guides" | "whatsapp";

type WhyUsItem = {
  key: WhyUsItemKey;
  text: string;
};

type WhyUsGridProps = {
  items: WhyUsItem[];
};

const iconByKey: Record<WhyUsItemKey, LucideIcon> = {
  experience: Award,
  guides: Users,
  whatsapp: MessageCircle,
};

const itemClassName =
  "flex h-full flex-col items-center gap-3 rounded-2xl border border-[#38ab8a]/25 bg-white/80 px-4 py-5 text-center shadow-[0_4px_24px_rgba(15,79,79,0.04)] backdrop-blur-sm sm:gap-4 sm:px-5 sm:py-6";

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

function WhyUsItemContent({ item }: { item: WhyUsItem }) {
  const Icon = iconByKey[item.key];

  return (
    <>
      <span
        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#38ab8a]/12 text-[#2d8a6f] sm:size-14"
        aria-hidden
      >
        <Icon className="size-6 sm:size-7" strokeWidth={1.75} />
      </span>
      <span className="text-[16px] font-medium leading-snug text-black sm:text-[18px] md:text-[18px]">
        {item.text}
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
            <WhyUsItemContent item={item} />
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
          <WhyUsItemContent item={item} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
