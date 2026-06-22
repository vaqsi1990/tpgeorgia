"use client";

import type { TransferRoute } from "@/data/transfers";
import {
  transferVehicleImages,
  transferVehicles,
  type TransferVehicle,
} from "@/data/transfers";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { MdFlightLand, MdLocationOn } from "react-icons/md";

type TransferRouteCardProps = {
  route: TransferRoute;
};

const vehicleImageSizes = "(max-width: 479px) 96px, (max-width: 639px) 33vw, 180px";

function TransferVehicleTile({
  vehicle,
  labels,
}: {
  vehicle: TransferVehicle;
  labels: {
    name: string;
    seats: string;
    price: string;
  };
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-black/5 min-[480px]:aspect-[3/4] min-[480px]:border-0">
      <div className="flex min-[480px]:absolute min-[480px]:inset-0">
        <div className="relative h-20 w-24 shrink-0 overflow-hidden min-[480px]:h-full min-[480px]:w-full">
          <Image
            src={transferVehicleImages[vehicle]}
            alt={labels.name}
            fill
            sizes={vehicleImageSizes}
            loading="lazy"
            className="object-cover"
          />
        </div>
        <div className="relative flex min-w-0 flex-1 flex-col justify-center bg-[#0f4f4f]/5 px-3 py-2.5 min-[480px]:absolute min-[480px]:inset-0 min-[480px]:justify-end min-[480px]:bg-transparent min-[480px]:p-2 min-[480px]:text-center sm:min-[480px]:p-3">
          <div
            className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-black/90 via-black/50 to-black/25 min-[480px]:block"
            aria-hidden
          />
          <span className="relative text-[15px] font-semibold text-black min-[480px]:text-[16px] min-[480px]:text-white sm:min-[480px]:text-[20px]">
            {labels.name}
          </span>
          <span className="relative mt-0.5 text-[13px] font-medium text-black/70 min-[480px]:text-[14px] min-[480px]:text-white/85 sm:min-[480px]:text-[18px]">
            {labels.seats}
          </span>
          <span className="font-afacad relative mt-1 text-[15px] font-bold text-[#0f4f4f] min-[480px]:text-[15px] min-[480px]:text-white sm:min-[480px]:text-[18px]">
            {labels.price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TransferRouteCard({ route }: TransferRouteCardProps) {
  const t = useTranslations("Transfers");
  const minPrice = Math.min(...transferVehicles.map((v) => route.prices[v]));

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_4px_24px_rgba(15,79,79,0.06)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,79,79,0.14)]">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0f4f4f] via-[#1a6363] to-[#38ab8a] px-3 py-4 text-white sm:px-5 sm:py-6">
        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2 text-white/90 sm:mb-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/15 sm:size-8">
                <MdFlightLand className="size-3.5 sm:size-4" aria-hidden />
              </span>
              <span className="min-w-0 text-[14px] font-medium text-white sm:truncate sm:text-[16px]">
                {t(`groups.${route.airport}`)}
              </span>
            </div>

            <div className="mb-1 flex items-center gap-1.5 sm:gap-2">
              <span className="h-px flex-1 bg-gradient-to-r from-white/50 to-white/10" aria-hidden />
              <span className="shrink-0 text-[12px] font-bold uppercase tracking-[0.12em] text-white sm:text-[15px] sm:tracking-[0.2em]">
                {t("routeTo")}
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-white/50 to-white/10" aria-hidden />
            </div>

            <div className="flex items-center gap-2">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#DC2626]/90 shadow-[0_2px_12px_rgba(220,38,38,0.4)] sm:size-8">
                <MdLocationOn className="size-3.5 sm:size-4" aria-hidden />
              </span>
              <h3 className="font-afacad min-w-0 text-lg font-semibold leading-tight sm:truncate sm:text-2xl">
                {t(`destinations.${route.destination}`)}
              </h3>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-3 self-stretch rounded-xl bg-white/15 px-3 py-2 sm:block sm:w-auto sm:self-auto sm:text-center">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-white/75 sm:block">
              {t("fromPrice")}
            </span>
            <span className="font-afacad text-base font-bold leading-none sm:text-xl">
              {t("price", { price: minPrice })}
            </span>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col px-3 py-4 sm:px-5 sm:py-5">
        <p className="mb-4 text-[14px] leading-snug text-black sm:text-[16px]">
          {t(`routes.${route.routeKey}`)}
        </p>

        <div className="mb-5 grid grid-cols-1 gap-2 min-[480px]:grid-cols-3 sm:gap-3">
          {transferVehicles.map((vehicle) => (
            <TransferVehicleTile
              key={vehicle}
              vehicle={vehicle}
              labels={{
                name: t(`vehicles.${vehicle}`),
                seats: t(`vehicleSeats.${vehicle}`),
                price: t("price", { price: route.prices[vehicle] }),
              }}
            />
          ))}
        </div>

        <Link
          href="/#contact"
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl border border-[#991B1B] bg-[#DC2626] py-2.5 text-[16px] font-medium text-white transition-colors hover:bg-[#B91C1C] hover:shadow-[0_4px_16px_rgba(220,38,38,0.35)] md:text-[18px]"
        >
          {t("bookCta")}
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
