"use client";

import BookingForm from "@/components/BookingForm";
import { useTranslations } from "next-intl";

type CatalogDetailBookingProps = {
  bookingType: "tour" | "excursion";
  itemId: string;
  itemTitle: string;
};

export default function CatalogDetailBooking({
  bookingType,
  itemId,
  itemTitle,
}: CatalogDetailBookingProps) {
  const t = useTranslations("Booking");

  return (
    <section
      id="booking"
      className="scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-[#38ab8a]/20 shadow-[0_12px_48px_rgba(15,79,79,0.1)]"
    >
      <div className="bg-gradient-to-r from-[#38ab8a] to-[#0f4f4f] px-6 py-5 sm:px-8 sm:py-6">
        <h2 className="font-afacad text-2xl font-semibold text-white sm:text-3xl">
          {t("bookButton")}
        </h2>
        <p className="mt-1 text-[14px] text-white/80 sm:text-[15px]">
          {itemTitle}
        </p>
      </div>
      <div className="bg-white px-5 py-6 sm:px-8 sm:py-8">
        <BookingForm
          bookingType={bookingType}
          itemId={itemId}
          itemTitle={itemTitle}
        />
      </div>
    </section>
  );
}
