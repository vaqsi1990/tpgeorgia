"use client";

import { buildWhatsAppUrl } from "@/lib/whatsapp-booking";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";

type WhatsAppBookButtonProps = {
  itemTitle: string;
  bookingType: "tour" | "excursion";
  className?: string;
};

const baseClassName =
  "flex w-full items-center justify-center gap-2 rounded-xl border border-[#DC2626]/40 bg-[#DC2626]/10 py-3.5 text-[16px] font-medium text-[#DC2626] transition-all hover:bg-[#DC2626]/20 md:text-[18px]";

export default function WhatsAppBookButton({
  itemTitle,
  bookingType,
  className = "",
}: WhatsAppBookButtonProps) {
  const t = useTranslations("Booking");
  const messageKey =
    bookingType === "tour"
      ? "whatsappMessageTour"
      : "whatsappMessageExcursion";
  const message = t(messageKey, { program: itemTitle });
  const href = buildWhatsAppUrl(message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClassName} ${className}`.trim()}
    >
      <FaWhatsapp className="size-5 shrink-0" aria-hidden />
      {t("whatsappBookButton")}
    </a>
  );
}
