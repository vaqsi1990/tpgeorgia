import type { AppLocale } from "@/i18n/routing";

export const placeLocales = ["ka", "en", "ru", "zh"] as const;
export type PlaceLocale = (typeof placeLocales)[number];

export function isPlaceLocale(value: string): value is PlaceLocale {
  return (placeLocales as readonly string[]).includes(value);
}

export type PlaceContent = {
  name: string;
  imageAlt: string;
  lead: string;
  p1: string;
  p2: string;
  p3: string;
  attractionsTitle: string;
};

export type AttractionContent = {
  name: string;
  description: string;
  groupTitle: string;
};

export type PlaceLocaleContentMap = Record<PlaceLocale, PlaceContent>;
export type AttractionLocaleContentMap = Record<PlaceLocale, AttractionContent>;

export type StoredAttractionInput = {
  id?: string;
  slug: string;
  image: string;
  parentId?: string | null;
  mapUrl?: string | null;
  mapLat?: number | null;
  mapLng?: number | null;
  sortOrder?: number;
  content: AttractionLocaleContentMap;
};

export type StoredPlaceInput = {
  id?: string;
  image: string;
  published?: boolean;
  sortOrder?: number;
  content: PlaceLocaleContentMap;
  attractions: StoredAttractionInput[];
};

export type StoredAttractionRecord = {
  id: string;
  slug: string;
  image: string;
  parentId: string | null;
  mapUrl: string | null;
  mapLat: number | null;
  mapLng: number | null;
  sortOrder: number;
  content: AttractionLocaleContentMap;
};

export type StoredPlaceRecord = {
  id: string;
  image: string;
  published: boolean;
  sortOrder: number;
  content: PlaceLocaleContentMap;
  attractions: StoredAttractionRecord[];
  createdAt: string;
  updatedAt: string;
};

export type PublicPlaceCard = {
  id: string;
  image: string;
  name: string;
  imageAlt: string;
};

export type PublicAttraction = {
  id: string;
  slug: string;
  image: string;
  parentId: string | null;
  name: string;
  description: string;
  groupTitle: string;
  mapUrl: string | null;
  mapLat: number | null;
  mapLng: number | null;
};

export type PublicPlace = {
  id: string;
  image: string;
  name: string;
  imageAlt: string;
  lead: string;
  paragraphs: string[];
  attractionsTitle: string;
  attractions: PublicAttraction[];
};

export function emptyPlaceContent(): PlaceContent {
  return {
    name: "",
    imageAlt: "",
    lead: "",
    p1: "",
    p2: "",
    p3: "",
    attractionsTitle: "",
  };
}

export function emptyAttractionContent(): AttractionContent {
  return { name: "", description: "", groupTitle: "" };
}

export function emptyPlaceContentMap(): PlaceLocaleContentMap {
  return {
    ka: emptyPlaceContent(),
    en: emptyPlaceContent(),
    ru: emptyPlaceContent(),
    zh: emptyPlaceContent(),
  };
}

export function emptyAttractionContentMap(): AttractionLocaleContentMap {
  return {
    ka: emptyAttractionContent(),
    en: emptyAttractionContent(),
    ru: emptyAttractionContent(),
    zh: emptyAttractionContent(),
  };
}

function localeOrder(locale: AppLocale): PlaceLocale[] {
  const preferred = isPlaceLocale(locale) ? locale : "ka";
  return [preferred, "ka", "en", "ru", "zh"].filter(
    (item, index, all) => all.indexOf(item) === index,
  ) as PlaceLocale[];
}

export function pickPlaceContent(
  content: PlaceLocaleContentMap,
  locale: AppLocale,
): PlaceContent {
  for (const key of localeOrder(locale)) {
    if (content[key]?.name?.trim()) return content[key];
  }
  return content.ka;
}

export function pickAttractionContent(
  content: AttractionLocaleContentMap,
  locale: AppLocale,
): AttractionContent {
  for (const key of localeOrder(locale)) {
    if (content[key]?.name?.trim()) return content[key];
  }
  return content.ka;
}

export function toPublicPlace(
  place: Pick<StoredPlaceRecord, "id" | "image" | "content" | "attractions">,
  locale: AppLocale,
): PublicPlace {
  const content = pickPlaceContent(place.content, locale);
  const paragraphs = [content.p1, content.p2, content.p3]
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return {
    id: place.id,
    image: place.image,
    name: content.name,
    imageAlt: content.imageAlt || content.name,
    lead: content.lead,
    paragraphs,
    attractionsTitle: content.attractionsTitle,
    attractions: place.attractions
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((attraction) => {
        const text = pickAttractionContent(attraction.content, locale);
        return {
          id: attraction.id,
          slug: attraction.slug,
          image: attraction.image,
          parentId: attraction.parentId,
          name: text.name,
          description: text.description,
          groupTitle: text.groupTitle,
          mapUrl: attraction.mapUrl,
          mapLat: attraction.mapLat,
          mapLng: attraction.mapLng,
        };
      }),
  };
}

export function toPublicPlaceCard(
  place: Pick<StoredPlaceRecord, "id" | "image" | "content">,
  locale: AppLocale,
): PublicPlaceCard {
  const content = pickPlaceContent(place.content, locale);
  return {
    id: place.id,
    image: place.image,
    name: content.name,
    imageAlt: content.imageAlt || content.name,
  };
}
