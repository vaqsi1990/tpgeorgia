import { readFileSync } from "node:fs";
import path from "node:path";
import { placeIds, places as staticPlaces } from "@/data/places";
import type { AppLocale } from "@/i18n/routing";
import {
  emptyAttractionContentMap,
  emptyPlaceContentMap,
  toPublicPlace,
  toPublicPlaceCard,
  type AttractionContent,
  type PlaceContent,
  type PlaceLocale,
  type PublicPlace,
  type PublicPlaceCard,
  type StoredPlaceRecord,
  placeLocales,
} from "@/lib/place-types";

type MessageAttraction = {
  name?: string;
  description?: string;
};

type MessagePlace = {
  name?: string;
  imageAlt?: string;
  lead?: string;
  p1?: string;
  p2?: string;
  p3?: string;
  attractionsTitle?: string;
  attractions?: Record<string, MessageAttraction>;
};

type MessagesFile = {
  Destinations?: {
    wineriesTitle?: string;
    items?: Record<string, MessagePlace>;
  };
};

const cache = new Map<PlaceLocale, MessagesFile>();

function readMessages(locale: PlaceLocale): MessagesFile {
  const cached = cache.get(locale);
  if (cached) return cached;
  const filePath = path.join(process.cwd(), "messages", `${locale}.json`);
  const parsed = JSON.parse(readFileSync(filePath, "utf8")) as MessagesFile;
  cache.set(locale, parsed);
  return parsed;
}

function placeContentFromMessages(placeId: string, locale: PlaceLocale): PlaceContent {
  const item = readMessages(locale).Destinations?.items?.[placeId];
  return {
    name: item?.name?.trim() ?? "",
    imageAlt: item?.imageAlt?.trim() || item?.name?.trim() || "",
    lead: item?.lead ?? "",
    p1: item?.p1 ?? "",
    p2: item?.p2 ?? "",
    p3: item?.p3 ?? "",
    attractionsTitle: item?.attractionsTitle ?? "",
  };
}

function attractionContentFromMessages(
  placeId: string,
  attractionId: string,
  locale: PlaceLocale,
  groupTitle: string,
): AttractionContent {
  const item =
    readMessages(locale).Destinations?.items?.[placeId]?.attractions?.[attractionId];
  return {
    name: item?.name?.trim() ?? "",
    description: item?.description ?? "",
    groupTitle,
  };
}

export function staticPlaceRecords(): StoredPlaceRecord[] {
  const now = new Date().toISOString();

  return placeIds.map((placeId, placeIndex) => {
    const source = staticPlaces[placeId];
    const content = emptyPlaceContentMap();
    for (const locale of placeLocales) {
      content[locale] = placeContentFromMessages(placeId, locale);
    }

    const childParents = new Set<string>(
      source.attractions.flatMap((attraction) =>
        attraction.parentId ? [attraction.parentId] : [],
      ),
    );

    return {
      id: placeId,
      image: source.image,
      published: true,
      sortOrder: placeIndex,
      createdAt: now,
      updatedAt: now,
      content,
      attractions: source.attractions.map((attraction, index) => {
        const attractionContent = emptyAttractionContentMap();
        for (const locale of placeLocales) {
          const groupTitle = childParents.has(attraction.id)
            ? (readMessages(locale).Destinations?.wineriesTitle ?? "")
            : "";
          attractionContent[locale] = attractionContentFromMessages(
            placeId,
            attraction.id,
            locale,
            groupTitle,
          );
        }

        return {
          id: attraction.id,
          slug: attraction.slug,
          image: attraction.image,
          parentId: attraction.parentId ?? null,
          mapUrl: attraction.mapUrl ?? null,
          mapLat: attraction.mapCoords?.lat ?? null,
          mapLng: attraction.mapCoords?.lng ?? null,
          sortOrder: index,
          content: attractionContent,
        };
      }),
    };
  });
}

export function staticPublicPlaces(locale: AppLocale): PublicPlace[] {
  return staticPlaceRecords().map((place) => toPublicPlace(place, locale));
}

export function staticPublicPlaceCards(locale: AppLocale): PublicPlaceCard[] {
  return staticPlaceRecords().map((place) => toPublicPlaceCard(place, locale));
}

export function staticPublicPlace(
  id: string,
  locale: AppLocale,
): PublicPlace | null {
  const place = staticPlaceRecords().find((item) => item.id === id);
  return place ? toPublicPlace(place, locale) : null;
}
