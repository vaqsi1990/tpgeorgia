import CatalogBookingPage from "@/components/CatalogBookingPage";
import { isTourDestination } from "@/data/tour-destinations";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/i18n/routing";
import { getTourById } from "@/lib/catalog-db";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string; destination: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale, destination } = await params;

  if (isTourDestination(destination)) {
    return {};
  }

  const tour = await getTourById(destination);
  if (!tour) {
    return {};
  }

  const content = tour.content[locale as AppLocale] ?? tour.content.ka;
  const t = await getTranslations({ locale, namespace: "Booking" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: `/tours/${destination}/book` as "/tours",
    title: `${t("bookButton")} — ${content.title}`,
    description: content.subtitle ?? content.routeLabel,
  });
}

export default async function TourBookRoute({ params }: Props) {
  const { locale, destination } = await params;
  setRequestLocale(locale);

  if (isTourDestination(destination)) {
    notFound();
  }

  const tour = await getTourById(destination);
  if (!tour) {
    notFound();
  }

  const content = tour.content[locale as AppLocale] ?? tour.content.ka;

  return (
    <CatalogBookingPage
      bookingType="tour"
      itemId={tour.id}
      itemTitle={content.title}
      backHref={`/tours/${tour.id}`}
      tone="mint"
    />
  );
}
