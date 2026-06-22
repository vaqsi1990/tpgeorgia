"use client";

import TransferRouteCard from "@/components/TransferRouteCard";
import {
  transferAirports,
  transferRoutesByAirport,
  type TransferAirport,
} from "@/data/transfers";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { MdFlight } from "react-icons/md";

function RouteGrid({ airport }: { airport: TransferAirport }) {
  const routes = transferRoutesByAirport[airport];

  return (
    <ul className="grid items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
      {routes.map((route) => (
        <li key={route.id}>
          <TransferRouteCard route={route} />
        </li>
      ))}
    </ul>
  );
}

export default function TransfersList() {
  const t = useTranslations("Transfers");
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
              className={`relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-[13px] font-semibold transition-colors duration-200 min-[400px]:gap-2 min-[400px]:px-3 min-[400px]:py-3 min-[400px]:text-[14px] sm:px-4 sm:py-3.5 sm:text-[16px] ${
                isActive ? "text-white" : "text-black"
              }`}
            >
              <span
                className={`absolute inset-0 rounded-xl transition-opacity duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#0f4f4f] to-[#38ab8a] opacity-100 shadow-[0_4px_16px_rgba(15,79,79,0.25)]"
                    : "opacity-0"
                }`}
                aria-hidden
              />
              <MdFlight
                className={`relative size-4 transition-transform duration-200 sm:size-5 ${isActive ? "rotate-45" : ""}`}
                aria-hidden
              />
              <span className="relative truncate">{t(`groups.${airport}`)}</span>
            </button>
          );
        })}
      </div>

      <div key={activeAirport}>
        <RouteGrid airport={activeAirport} />
      </div>
    </div>
  );
}
