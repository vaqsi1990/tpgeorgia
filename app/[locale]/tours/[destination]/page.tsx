import TourDetailPage from "@/components/TourDetailPage";
import ToursPage from "@/components/ToursPage";
import {
  isTourDestination,
  tourDestinationIds,
} from "@/data/tour-destinations";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/i18n/routing";
import { getTourById } from "@/lib/catalog-db";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string; destination: string }>;
};

export function generateStaticParams() {
  return tourDestinationIds.map((destination) => ({ destination }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, destination } = await params;

  if (isTourDestination(destination)) {
    const t = await getTranslations({ locale, namespace: "Tours" });

    return buildPageMetadata({
      locale: locale as AppLocale,
      pathname: `/tours/${destination}`,
      title: t(`destinations.${destination}.title`),
      description: t(`destinations.${destination}.description`),
    });
  }

  const tour = await getTourById(destination);
  if (!tour) {
    return {};
  }

  const content = tour.content[locale as AppLocale] ?? tour.content.ka;
  const coverImage = tour.images.find((url) => url && url.trim() !== "");

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: `/tours/${destination}` as "/tours",
    title: content.title,
    description: content.subtitle ?? content.routeLabel,
    ogImage: coverImage,
  });
}

export default async function TourSlugPage({ params }: Props) {
  const { locale, destination } = await params;
  setRequestLocale(locale);

  if (isTourDestination(destination)) {
    return <ToursPage destination={destination} />;
  }

  const tour = await getTourById(destination);
  if (!tour) {
    notFound();
  }

  return <TourDetailPage tour={tour} locale={locale as AppLocale} />;
}
