import AttractionPage from "@/components/AttractionPage";
import { placeIds, places } from "@/data/places";
import type { AppLocale } from "@/i18n/routing";
import { getPublishedPlace } from "@/lib/places-db";
import { buildPageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string; place: string; attraction: string }>;
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return placeIds.flatMap((place) =>
    places[place].attractions.map((attraction) => ({
      place,
      attraction: attraction.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, place: placeId, attraction: attractionSlug } = await params;
  const place = await getPublishedPlace(placeId, locale as AppLocale);
  const attraction = place?.attractions.find((item) => item.slug === attractionSlug);
  if (!place || !attraction) return {};

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: `/places/${place.id}/${attraction.slug}`,
    title: attraction.name,
    description: attraction.description || place.attractionsTitle || attraction.name,
  });
}

export default async function AttractionRoutePage({ params }: Props) {
  const { locale, place: placeId, attraction: attractionSlug } = await params;
  setRequestLocale(locale);

  const place = await getPublishedPlace(placeId, locale as AppLocale);
  const attraction = place?.attractions.find((item) => item.slug === attractionSlug);
  if (!place || !attraction) notFound();

  const parent = attraction.parentId
    ? place.attractions.find((item) => item.id === attraction.parentId) ?? null
    : null;
  const childAttractions = place.attractions.filter(
    (item) => item.parentId === attraction.id,
  );
  const t = await getTranslations("Destinations");

  return (
    <AttractionPage
      placeId={place.id}
      placeName={place.name}
      attraction={attraction}
      childAttractions={childAttractions}
      parent={parent ? { slug: parent.slug, name: parent.name } : null}
      backToPlaceLabel={t("backToPlace", { place: place.name })}
      detailsLabel={t("details")}
      openInMapsLabel={t("openInMaps")}
      fallbackGroupTitle={t("wineriesTitle")}
    />
  );
}
