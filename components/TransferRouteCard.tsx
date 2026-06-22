"use client";

import type { TransferRoute } from "@/data/transfers";
import { transferVehicleImages, transferVehicles } from "@/data/transfers";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MdFlightLand, MdLocationOn } from "react-icons/md";

type TransferRouteCardProps = {
  route: TransferRoute;
};

export default function TransferRouteCard({ route }: TransferRouteCardProps) {
  const t = useTranslations("Transfers");
  const minPrice = Math.min(...transferVehicles.map((v) => route.prices[v]));

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_4px_24px_rgba(15,79,79,0.06)] transition-shadow hover:shadow-[0_12px_40px_rgba(15,79,79,0.14)]"
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0f4f4f] via-[#1a6363] to-[#38ab8a] px-4 py-5 text-white sm:px-5 sm:py-6">
        <div
          className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full bg-white/10 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-8 left-1/3 size-20 rounded-full bg-[#DC2626]/20 blur-xl"
          aria-hidden
        />

        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex items-center gap-2 text-white/90">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                <MdFlightLand className="size-4" aria-hidden />
              </span>
              <span className="truncate text-[16px] font-medium text-white">
                {t(`groups.${route.airport}`)}
              </span>
            </div>

            <div className="mb-1 flex items-center gap-2">
              <span className="h-px flex-1 bg-gradient-to-r from-white/50 to-white/10" aria-hidden />
              <span className="text-[15px] font-bold uppercase tracking-[0.2em] text-white">
                {t("routeTo")}
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-white/50 to-white/10" aria-hidden />
            </div>

            <div className="flex items-center gap-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#DC2626]/90 shadow-[0_2px_12px_rgba(220,38,38,0.4)]">
                <MdLocationOn className="size-4" aria-hidden />
              </span>
              <h3 className="font-afacad truncate text-xl font-semibold leading-tight sm:text-2xl">
                {t(`destinations.${route.destination}`)}
              </h3>
            </div>
          </div>

          <div className="shrink-0 rounded-xl bg-white/15 px-3 py-2 text-center backdrop-blur-sm">
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-white/75">
              {t("fromPrice")}
            </span>
            <span className="font-afacad text-lg font-bold leading-none sm:text-xl">
              {t("price", { price: minPrice })}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
        <p className="mb-4 text-[15px] text-black sm:text-[16px]">
          {t(`routes.${route.routeKey}`)}
        </p>

        <div className="mb-5 grid grid-cols-3 gap-2 sm:gap-3">
          {transferVehicles.map((vehicle) => (
              <div
                key={vehicle}
                className="relative aspect-[3/4] overflow-hidden rounded-xl transition-transform group-hover:scale-[1.02]"
              >
                <img
                  src={transferVehicleImages[vehicle]}
                  alt={t(`vehicles.${vehicle}`)}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/25"
                  aria-hidden
                />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-2 text-center sm:p-3">
                  <span className="text-[18px] font-semibold text-white sm:text-[20px]">
                    {t(`vehicles.${vehicle}`)}
                  </span>
                  <span className="mt-0.5 text-[16px] font-medium text-white/85 sm:text-[18px]">
                    {t(`vehicleSeats.${vehicle}`)}
                  </span>
                  <span className="font-afacad mt-1 text-[16px] font-bold text-white sm:text-[18px]">
                    {t("price", { price: route.prices[vehicle] })}
                  </span>
                </div>
              </div>
            ))}
        </div>

        <Link
          href="/#contact"
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl border border-[#991B1B] bg-[#DC2626] py-2.5 text-[16px] font-medium text-white transition-all hover:bg-[#B91C1C] hover:shadow-[0_4px_16px_rgba(220,38,38,0.35)] md:text-[18px]"
        >
          {t("bookCta")}
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </motion.article>
  );
}
