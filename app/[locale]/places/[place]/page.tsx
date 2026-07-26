import PlacePage from "@/components/PlacePage";
import { isPlaceId, placeIds } from "@/data/places";
import type { AppLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string; place: string }>;
};

export function generateStaticParams() {
  return placeIds.map((place) => ({ place }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, place } = await params;

  if (!isPlaceId(place)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "Destinations" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: `/places/${place}`,
    title: t(`items.${place}.name`),
    description: t(`items.${place}.lead`),
  });
}

export default async function PlaceRoutePage({ params }: Props) {
  const { locale, place } = await params;
  setRequestLocale(locale);

  if (!isPlaceId(place)) {
    notFound();
  }

  return <PlacePage place={place} />;
}
