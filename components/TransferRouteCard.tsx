"use client";

import type { TransferRoute, TransferVehicle } from "@/data/transfers";
import { transferVehicles } from "@/data/transfers";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type TransferRouteCardProps = {
  route: TransferRoute;
};

export default function TransferRouteCard({ route }: TransferRouteCardProps) {
  const t = useTranslations("Transfers");

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_4px_24px_rgba(15,79,79,0.06)] transition-[box-shadow] hover:shadow-[0_8px_32px_rgba(15,79,79,0.12)]">
      <div className="border-b border-black/10 bg-brand/[0.04] px-4 py-4 sm:px-5 sm:py-5">
        <h3 className="font-afacad text-lg font-semibold leading-snug text-black sm:text-xl">
          {t(`routes.${route.routeKey}`)}
        </h3>
      </div>

      <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
        <dl className="mb-5 space-y-2.5">
          {transferVehicles.map((vehicle: TransferVehicle) => (
            <div
              key={vehicle}
              className="flex items-center justify-between gap-3 border-b border-black/5 pb-2.5 last:border-0 last:pb-0"
            >
              <dt className="text-[15px] text-black/75 md:text-[16px]">
                {t(`vehicles.${vehicle}`)}
              </dt>
              <dd className="text-[15px] font-semibold text-black md:text-[16px]">
                {t("price", { price: route.prices[vehicle] })}
              </dd>
            </div>
          ))}
        </dl>

        <Link
          href="/#contact"
          className="mt-auto w-full rounded-xl border border-[#991B1B] bg-[#DC2626] py-2.5 text-center text-[15px] font-medium text-white transition-colors hover:bg-[#B91C1C] md:text-[16px]"
        >
          {t("bookCta")}
        </Link>
      </div>
    </article>
  );
}
