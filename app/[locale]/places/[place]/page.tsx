import PlacePage from "@/components/PlacePage";
import { placeIds } from "@/data/places";
import type { AppLocale } from "@/i18n/routing";
import { getPublishedPlace } from "@/lib/places-db";
import { buildPageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string; place: string }>;
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return placeIds.map((place) => ({ place }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, place: placeId } = await params;
  const place = await getPublishedPlace(placeId, locale as AppLocale);
  if (!place) return {};

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: `/places/${place.id}`,
    title: place.name,
    description: place.lead || place.paragraphs[0] || place.name,
  });
}

export default async function PlaceRoutePage({ params }: Props) {
  const { locale, place: placeId } = await params;
  setRequestLocale(locale);

  const place = await getPublishedPlace(placeId, locale as AppLocale);
  if (!place) notFound();

  const t = await getTranslations("Destinations");

  return <PlacePage place={place} detailsLabel={t("details")} />;
}
