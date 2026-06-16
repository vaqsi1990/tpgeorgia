"use client";

import BookingForm from "@/components/BookingForm";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type CatalogDetailBookingProps = {
  bookingType: "tour" | "excursion";
  itemId: string;
  itemTitle: string;
  backHref: string;
};

export default function CatalogDetailBooking({
  bookingType,
  itemId,
  itemTitle,
  backHref,
}: CatalogDetailBookingProps) {
  const t = useTranslations("Booking");
  const router = useRouter();

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-[#38ab8a]/20 shadow-[0_12px_48px_rgba(15,79,79,0.1)]">
      <div className="bg-gradient-to-r from-[#38ab8a] to-[#0f4f4f] px-6 py-5 sm:px-8 sm:py-6">
        <h1 className="font-afacad text-2xl font-semibold text-white sm:text-3xl">
          {t("bookButton")}
        </h1>
        <p className="mt-1 text-[14px] text-white/80 sm:text-[15px]">
          {itemTitle}
        </p>
      </div>
      <div className="bg-white px-5 py-6 sm:px-8 sm:py-8">
        <BookingForm
          bookingType={bookingType}
          itemId={itemId}
          itemTitle={itemTitle}
          onBack={() => router.push(backHref)}
        />
      </div>
    </section>
  );
}
