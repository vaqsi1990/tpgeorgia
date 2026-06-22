"use client";

import TransferRouteCard from "@/components/TransferRouteCard";
import { staggerContainer, staggerItem } from "@/components/motionPresets";
import {
  transferAirports,
  transferRoutes,
  type TransferAirport,
} from "@/data/transfers";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

function AirportSection({ airport }: { airport: TransferAirport }) {
  const t = useTranslations("Transfers");
  const reducedMotion = useReducedMotion();
  const routes = transferRoutes.filter((route) => route.airport === airport);

  const listClassName = "grid gap-5 sm:grid-cols-2 xl:grid-cols-2";

  return (
    <section className="mb-10 last:mb-0 sm:mb-12">
      
      {reducedMotion ? (
        <ul className={listClassName}>
          {routes.map((route) => (
            <li key={route.id}>
              <TransferRouteCard route={route} />
            </li>
          ))}
        </ul>
      ) : (
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
          className={listClassName}
        >
          {routes.map((route) => (
            <motion.li key={route.id} variants={staggerItem}>
              <TransferRouteCard route={route} />
            </motion.li>
          ))}
        </motion.ul>
      )}
    </section>
  );
}

export default function TransfersList() {
  return (
    <div>
      {transferAirports.map((airport) => (
        <AirportSection key={airport} airport={airport} />
      ))}
    </div>
  );
}
