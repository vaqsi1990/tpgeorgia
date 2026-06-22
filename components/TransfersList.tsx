"use client";

import TransferRouteCard from "@/components/TransferRouteCard";
import { staggerContainer, staggerItem } from "@/components/motionPresets";
import {
  transferAirports,
  transferRoutes,
  type TransferAirport,
} from "@/data/transfers";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
  FaClock,
  FaHandshake,
  FaShieldHalved,
  FaTag,
} from "react-icons/fa6";
import { MdFlight } from "react-icons/md";

const featureKeys = ["fixedPrice", "onTime", "comfort", "support"] as const;

const featureIcons: Record<(typeof featureKeys)[number], IconType> = {
  fixedPrice: FaTag,
  onTime: FaClock,
  comfort: FaShieldHalved,
  support: FaHandshake,
};

const tabTransition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1] as const,
};

function RouteGrid({
  airport,
  reducedMotion,
}: {
  airport: TransferAirport;
  reducedMotion: boolean | null;
}) {
  const routes = transferRoutes.filter((route) => route.airport === airport);
  const listClassName = "grid items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6";

  if (reducedMotion) {
    return (
      <ul className={listClassName}>
        {routes.map((route) => (
          <li key={route.id}>
            <TransferRouteCard route={route} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <motion.ul
      key={airport}
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className={listClassName}
    >
      {routes.map((route) => (
        <motion.li key={route.id} variants={staggerItem}>
          <TransferRouteCard route={route} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default function TransfersList() {
  const t = useTranslations("Transfers");
  const reducedMotion = useReducedMotion();
  const [activeAirport, setActiveAirport] = useState<TransferAirport>("batumi");

  return (
    <div className="space-y-6 sm:space-y-8">
   

      <div
        role="tablist"
        aria-label={t("selectAirport")}
        className="relative flex flex-col gap-1.5 rounded-2xl border border-black/10 bg-black/[0.03] p-1.5 sm:flex-row"
      >
        {transferAirports.map((airport) => {
          const isActive = activeAirport === airport;
          return (
            <button
              key={airport}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveAirport(airport)}
              className={`relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-[13px] font-semibold transition-colors min-[400px]:gap-2 min-[400px]:px-3 min-[400px]:py-3 min-[400px]:text-[14px] sm:px-4 sm:py-3.5 sm:text-[16px] ${
                isActive ? "text-white" : "text-black "
              }`}
            >
              {isActive && !reducedMotion ? (
                <motion.span
                  layoutId="transfer-airport-tab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#0f4f4f] to-[#38ab8a] shadow-[0_4px_16px_rgba(15,79,79,0.25)]"
                  transition={tabTransition}
                />
              ) : isActive ? (
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#0f4f4f] to-[#38ab8a]" />
              ) : null}
              <MdFlight
                className={`relative size-4 sm:size-5 ${isActive ? "rotate-45" : ""}`}
                aria-hidden
              />
              <span className="relative truncate">{t(`groups.${airport}`)}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeAirport}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={tabTransition}
        >
          <RouteGrid airport={activeAirport} reducedMotion={reducedMotion} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
