import CatalogDetailBooking from "@/components/CatalogDetailBooking";
import ParallaxSection from "@/components/ParallaxSection";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

type CatalogBookingPageProps = {
  bookingType: "tour" | "excursion";
  itemId: string;
  itemTitle: string;
  backHref: string;
  tone?: "mint" | "warm";
};

export default async function CatalogBookingPage({
  bookingType,
  itemId,
  itemTitle,
  backHref,
  tone = "mint",
}: CatalogBookingPageProps) {
  const t = await getTranslations("Booking");

  return (
    <ParallaxSection
      as="main"
      tone={tone}
      disableContentParallax
      className="bg-[#fafcfb] px-4 pb-20 pt-28 text-black sm:px-6 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-36"
    >
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href={backHref}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-[14px] font-medium text-black/70 shadow-[0_2px_12px_rgba(15,79,79,0.05)] transition-all hover:border-[#38ab8a]/30 hover:text-[#38ab8a] sm:mb-8 sm:text-[15px]"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t("backToDetails")}
        </Link>

        <CatalogDetailBooking
          bookingType={bookingType}
          itemId={itemId}
          itemTitle={itemTitle}
          backHref={backHref}
        />
      </div>
    </ParallaxSection>
  );
}
