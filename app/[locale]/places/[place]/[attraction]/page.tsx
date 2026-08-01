import AttractionPage from "@/components/AttractionPage";
import {
  getPlaceAttraction,
  isPlaceId,
  placeIds,
  places,
} from "@/data/places";
import type { AppLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string; place: string; attraction: string }>;
};

export function generateStaticParams() {
  return placeIds.flatMap((place) =>
    places[place].attractions.map((attraction) => ({
      place,
      attraction: attraction.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, place, attraction: attractionSlug } = await params;

  if (!isPlaceId(place)) {
    return {};
  }

  const attraction = getPlaceAttraction(place, attractionSlug);
  if (!attraction) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "Destinations" });
  const description =
    t(
      `items.${place}.attractions.${attraction.id}.description` as never,
    ) || t(`items.${place}.attractionsTitle`);

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: `/places/${place}/${attraction.slug}`,
    title: t(`items.${place}.attractions.${attraction.id}.name` as never),
    description,
  });
}

export default async function AttractionRoutePage({ params }: Props) {
  const { locale, place, attraction: attractionSlug } = await params;
  setRequestLocale(locale);

  if (!isPlaceId(place)) {
    notFound();
  }

  const attraction = getPlaceAttraction(place, attractionSlug);
  if (!attraction) {
    notFound();
  }

  return <AttractionPage place={place} attraction={attraction} />;
}
