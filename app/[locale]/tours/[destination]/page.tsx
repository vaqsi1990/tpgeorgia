import ToursPage from "@/components/ToursPage";
import {
  isTourDestination,
  tourDestinationIds,
} from "@/data/tour-destinations";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string; destination: string }>;
};

export function generateStaticParams() {
  return tourDestinationIds.map((destination) => ({ destination }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, destination } = await params;

  if (!isTourDestination(destination)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "Tours" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: `/tours/${destination}`,
    title: t(`destinations.${destination}.title`),
    description: t(`destinations.${destination}.description`),
  });
}

export default async function TourDestination({ params }: Props) {
  const { locale, destination } = await params;

  if (!isTourDestination(destination)) {
    notFound();
  }

  setRequestLocale(locale);

  return <ToursPage destination={destination} />;
}
