import { randomUUID } from "node:crypto";
import type { AppLocale } from "@/i18n/routing";
import type { Locale } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import {
  emptyAttractionContent,
  emptyAttractionContentMap,
  emptyPlaceContent,
  emptyPlaceContentMap,
  placeLocales,
  toPublicPlace,
  toPublicPlaceCard,
  type AttractionContent,
  type AttractionLocaleContentMap,
  type PlaceLocale,
  type PlaceLocaleContentMap,
  type PublicPlace,
  type PublicPlaceCard,
  type StoredAttractionInput,
  type StoredAttractionRecord,
  type StoredPlaceInput,
  type StoredPlaceRecord,
} from "@/lib/place-types";
import {
  staticPlaceRecords,
  staticPublicPlace,
  staticPublicPlaceCards,
  staticPublicPlaces,
} from "@/lib/places-static";
import { resolveUniqueSlug, slugFromTitles, slugify } from "@/lib/slug";

type AttractionRow = {
  id: string;
  slug: string;
  image: string;
  parentId: string | null;
  mapUrl: string | null;
  mapLat: number | null;
  mapLng: number | null;
  sortOrder: number;
  translations: Array<{
    locale: Locale;
    name: string;
    description: string;
    groupTitle: string;
  }>;
};

type PlaceRow = {
  id: string;
  image: string;
  published: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  translations: Array<{
    locale: Locale;
    name: string;
    imageAlt: string;
    lead: string;
    p1: string;
    p2: string;
    p3: string;
    attractionsTitle: string;
  }>;
  attractions: AttractionRow[];
};

const placeInclude = {
  translations: true,
  attractions: {
    orderBy: { sortOrder: "asc" as const },
    include: { translations: true },
  },
};

function asPlaceLocale(locale: Locale): PlaceLocale | null {
  return placeLocales.includes(locale as PlaceLocale) ? (locale as PlaceLocale) : null;
}

function placeContentMap(
  translations: PlaceRow["translations"],
): PlaceLocaleContentMap {
  const content = emptyPlaceContentMap();
  for (const translation of translations) {
    const locale = asPlaceLocale(translation.locale);
    if (!locale) continue;
    content[locale] = {
      name: translation.name,
      imageAlt: translation.imageAlt,
      lead: translation.lead,
      p1: translation.p1,
      p2: translation.p2,
      p3: translation.p3,
      attractionsTitle: translation.attractionsTitle,
    };
  }
  return content;
}

function attractionContentMap(
  translations: AttractionRow["translations"],
): AttractionLocaleContentMap {
  const content = emptyAttractionContentMap();
  for (const translation of translations) {
    const locale = asPlaceLocale(translation.locale);
    if (!locale) continue;
    content[locale] = {
      name: translation.name,
      description: translation.description,
      groupTitle: translation.groupTitle,
    };
  }
  return content;
}

function toStoredPlace(place: PlaceRow): StoredPlaceRecord {
  return {
    id: place.id,
    image: place.image,
    published: place.published,
    sortOrder: place.sortOrder,
    createdAt: place.createdAt.toISOString(),
    updatedAt: place.updatedAt.toISOString(),
    content: placeContentMap(place.translations),
    attractions: place.attractions.map((attraction) => ({
      id: attraction.id,
      slug: attraction.slug,
      image: attraction.image,
      parentId: attraction.parentId,
      mapUrl: attraction.mapUrl,
      mapLat: attraction.mapLat,
      mapLng: attraction.mapLng,
      sortOrder: attraction.sortOrder,
      content: attractionContentMap(attraction.translations),
    })),
  };
}

function normalizePlaceContent(content: PlaceLocaleContentMap): PlaceLocaleContentMap {
  const next = emptyPlaceContentMap();
  for (const locale of placeLocales) {
    const entry = content[locale] ?? emptyPlaceContent();
    next[locale] = {
      name: entry.name?.trim() ?? "",
      imageAlt: entry.imageAlt?.trim() || entry.name?.trim() || "",
      lead: entry.lead?.trim() ?? "",
      p1: entry.p1?.trim() ?? "",
      p2: entry.p2?.trim() ?? "",
      p3: entry.p3?.trim() ?? "",
      attractionsTitle: entry.attractionsTitle?.trim() ?? "",
    };
  }
  return next;
}

function normalizeAttractionContent(
  content: AttractionLocaleContentMap,
): AttractionLocaleContentMap {
  const next = emptyAttractionContentMap();
  for (const locale of placeLocales) {
    const entry = content[locale] ?? emptyAttractionContent();
    next[locale] = {
      name: entry.name?.trim() ?? "",
      description: entry.description?.trim() ?? "",
      groupTitle: entry.groupTitle?.trim() ?? "",
    };
  }
  return next;
}

function titlesFromPlace(content: PlaceLocaleContentMap): string[] {
  return placeLocales
    .map((locale) => content[locale]?.name?.trim() ?? "")
    .filter(Boolean);
}

function titlesFromAttraction(content: AttractionLocaleContentMap): string[] {
  return placeLocales
    .map((locale) => content[locale]?.name?.trim() ?? "")
    .filter(Boolean);
}

function prepareAttractions(attractions: StoredAttractionInput[]): StoredAttractionRecord[] {
  const prepared: StoredAttractionRecord[] = attractions.map((attraction, index) => ({
    id: attraction.id?.trim() || randomUUID(),
    slug: slugify(attraction.slug ?? ""),
    image: attraction.image.trim(),
    parentId: attraction.parentId?.trim() || null,
    mapUrl: attraction.mapUrl?.trim() || null,
    mapLat: attraction.mapLat ?? null,
    mapLng: attraction.mapLng ?? null,
    sortOrder: index,
    content: normalizeAttractionContent(attraction.content),
  }));

  const ids = new Set(prepared.map((attraction) => attraction.id));
  const usedSlugs = new Set<string>();

  for (const attraction of prepared) {
    if (attraction.parentId === attraction.id || !ids.has(attraction.parentId ?? "")) {
      attraction.parentId = null;
    }

    let base =
      attraction.slug || slugFromTitles(titlesFromAttraction(attraction.content)) || "attraction";
    let slug = base;
    let suffix = 2;
    while (usedSlugs.has(slug)) {
      slug = `${base}-${suffix}`;
      suffix += 1;
    }
    usedSlugs.add(slug);
    attraction.slug = slug;
  }

  return prepared;
}

function translationRows(content: PlaceLocaleContentMap) {
  return placeLocales
    .filter((locale) => content[locale].name)
    .map((locale) => ({
      locale: locale as Locale,
      ...content[locale],
    }));
}

function attractionTranslationRows(content: AttractionLocaleContentMap) {
  return placeLocales
    .filter((locale) => content[locale].name)
    .map((locale) => ({
      locale: locale as Locale,
      name: content[locale].name,
      description: content[locale].description,
      groupTitle: content[locale].groupTitle,
    }));
}

async function resolvePlaceId(input: StoredPlaceInput, content: PlaceLocaleContentMap) {
  if (input.id?.trim()) return input.id.trim();

  const base = slugFromTitles(titlesFromPlace(content));
  if (!base) {
    throw new Error("ადგილის სახელი აუცილებელია.");
  }

  return resolveUniqueSlug(base, async (slug) => {
    const existing = await prisma.place.findUnique({ where: { id: slug } });
    return existing !== null;
  });
}

let seedTask: Promise<void> | null = null;

async function seedStaticPlaces(): Promise<void> {
  const count = await prisma.place.count();
  if (count > 0) return;

  const records = staticPlaceRecords();
  await prisma.$transaction(
    async (tx) => {
      for (const place of records) {
        await tx.place.create({
          data: {
            id: place.id,
            image: place.image,
            published: place.published,
            sortOrder: place.sortOrder,
            translations: {
              create: translationRows(place.content),
            },
            attractions: {
              create: place.attractions.map((attraction) => ({
                id: attraction.id,
                slug: attraction.slug,
                image: attraction.image,
                mapUrl: attraction.mapUrl,
                mapLat: attraction.mapLat,
                mapLng: attraction.mapLng,
                sortOrder: attraction.sortOrder,
                translations: {
                  create: attractionTranslationRows(attraction.content),
                },
              })),
            },
          },
        });
      }

      for (const place of records) {
        for (const attraction of place.attractions) {
          if (!attraction.parentId) continue;
          await tx.placeAttraction.update({
            where: { id: attraction.id },
            data: { parentId: attraction.parentId },
          });
        }
      }
    },
    { timeout: 60_000 },
  );
}

export function ensurePlacesSeeded(): Promise<void> {
  if (!seedTask) {
    seedTask = seedStaticPlaces().catch((error) => {
      seedTask = null;
      throw error;
    });
  }
  return seedTask;
}

async function writeAttractions(
  tx: Pick<typeof prisma, "placeAttraction" | "placeAttractionTranslation">,
  placeId: string,
  attractions: StoredAttractionRecord[],
) {
  const existing = await tx.placeAttraction.findMany({
    where: { placeId },
    select: { id: true },
  });
  const keep = new Set(attractions.map((attraction) => attraction.id));
  const remove = existing.map((item) => item.id).filter((id) => !keep.has(id));

  if (remove.length > 0) {
    await tx.placeAttraction.updateMany({
      where: { parentId: { in: remove } },
      data: { parentId: null },
    });
    await tx.placeAttraction.deleteMany({ where: { id: { in: remove } } });
  }

  for (const attraction of attractions) {
    const data = {
      placeId,
      slug: attraction.slug,
      image: attraction.image,
      mapUrl: attraction.mapUrl,
      mapLat: attraction.mapLat,
      mapLng: attraction.mapLng,
      sortOrder: attraction.sortOrder,
      parentId: null,
    };
    await tx.placeAttraction.upsert({
      where: { id: attraction.id },
      create: { id: attraction.id, ...data },
      update: data,
    });
    await tx.placeAttractionTranslation.deleteMany({
      where: { attractionId: attraction.id },
    });
    const rows = attractionTranslationRows(attraction.content);
    if (rows.length > 0) {
      await tx.placeAttractionTranslation.createMany({
        data: rows.map((row) => ({ ...row, attractionId: attraction.id })),
      });
    }
  }

  for (const attraction of attractions) {
    if (!attraction.parentId) continue;
    await tx.placeAttraction.update({
      where: { id: attraction.id },
      data: { parentId: attraction.parentId },
    });
  }
}

export async function listPlaces(): Promise<StoredPlaceRecord[]> {
  await ensurePlacesSeeded();
  const places = await prisma.place.findMany({
    include: placeInclude,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  return places.map(toStoredPlace);
}

export async function getPlaceById(id: string): Promise<StoredPlaceRecord | null> {
  await ensurePlacesSeeded();
  const place = await prisma.place.findUnique({
    where: { id },
    include: placeInclude,
  });
  return place ? toStoredPlace(place) : null;
}

export async function createPlace(input: StoredPlaceInput): Promise<StoredPlaceRecord> {
  await ensurePlacesSeeded();
  const content = normalizePlaceContent(input.content);
  const id = await resolvePlaceId(input, content);
  const attractions = prepareAttractions(input.attractions ?? []);

  await prisma.$transaction(
    async (tx) => {
      await tx.place.create({
        data: {
          id,
          image: input.image.trim(),
          published: input.published ?? true,
          sortOrder: input.sortOrder ?? 0,
          translations: { create: translationRows(content) },
        },
      });
      await writeAttractions(tx, id, attractions);
    },
    { timeout: 60_000 },
  );

  const created = await getPlaceById(id);
  if (!created) throw new Error("ადგილის შენახვა ვერ მოხერხდა.");
  return created;
}

export async function updatePlace(
  id: string,
  input: StoredPlaceInput,
): Promise<StoredPlaceRecord> {
  await ensurePlacesSeeded();
  const existing = await prisma.place.findUnique({ where: { id } });
  if (!existing) throw new Error("ადგილი ვერ მოიძებნა.");

  const content = normalizePlaceContent(input.content);
  const attractions = prepareAttractions(input.attractions ?? []);

  await prisma.$transaction(
    async (tx) => {
      await tx.place.update({
        where: { id },
        data: {
          image: input.image.trim(),
          published: input.published ?? true,
          sortOrder: input.sortOrder ?? existing.sortOrder,
        },
      });
      await tx.placeTranslation.deleteMany({ where: { placeId: id } });
      const rows = translationRows(content);
      if (rows.length > 0) {
        await tx.placeTranslation.createMany({
          data: rows.map((row) => ({ ...row, placeId: id })),
        });
      }
      await writeAttractions(tx, id, attractions);
    },
    { timeout: 60_000 },
  );

  const updated = await getPlaceById(id);
  if (!updated) throw new Error("ადგილის შენახვა ვერ მოხერხდა.");
  return updated;
}

export async function deletePlace(id: string): Promise<boolean> {
  await ensurePlacesSeeded();
  const existing = await prisma.place.findUnique({ where: { id } });
  if (!existing) return false;
  await prisma.placeAttraction.updateMany({
    where: { placeId: id },
    data: { parentId: null },
  });
  await prisma.place.delete({ where: { id } });
  return true;
}

export async function listPublishedPlaceCards(
  locale: AppLocale,
): Promise<PublicPlaceCard[]> {
  try {
    await ensurePlacesSeeded();
    const places = await prisma.place.findMany({
      where: { published: true },
      include: { translations: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    if (places.length === 0) return staticPublicPlaceCards(locale);
    return places.map((place) =>
      toPublicPlaceCard(
        {
          id: place.id,
          image: place.image,
          content: placeContentMap(place.translations),
        },
        locale,
      ),
    );
  } catch (error) {
    console.error("Failed to load places from the database.", error);
    return staticPublicPlaceCards(locale);
  }
}

export async function getPublishedPlace(
  id: string,
  locale: AppLocale,
): Promise<PublicPlace | null> {
  try {
    await ensurePlacesSeeded();
    const place = await prisma.place.findUnique({
      where: { id },
      include: placeInclude,
    });
    if (!place) return staticPublicPlace(id, locale);
    if (!place.published) return null;
    return toPublicPlace(toStoredPlace(place), locale);
  } catch (error) {
    console.error("Failed to load place from the database.", error);
    return staticPublicPlace(id, locale);
  }
}

export async function listPublishedPlaces(locale: AppLocale): Promise<PublicPlace[]> {
  try {
    await ensurePlacesSeeded();
    const places = await prisma.place.findMany({
      where: { published: true },
      include: placeInclude,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    if (places.length === 0) return staticPublicPlaces(locale);
    return places.map((place) => toPublicPlace(toStoredPlace(place), locale));
  } catch (error) {
    console.error("Failed to load places from the database.", error);
    return staticPublicPlaces(locale);
  }
}

