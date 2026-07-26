export const placeIds = ["tbilisi"] as const;

export type PlaceId = (typeof placeIds)[number];

export function isPlaceId(value: string): value is PlaceId {
  return (placeIds as readonly string[]).includes(value);
}

export const tbilisiAttractionIds = [
  "oldTbilisi",
  "narikala",
  "abanotubani",
  "metekhi",
  "kartlisDeda",
  "rikeParkPeaceBridge",
  "mtatsminda",
  "botanicalGarden",
  "chronicleMonument",
  "gudiashviliSquare",
  "sameba",
  "meidanBazaar",
  "dryBridgeMarket",
  "clockTower",
  "sionCathedral",
  "nationalMuseum",
  "historicEntrances",
] as const;

export type TbilisiAttractionId = (typeof tbilisiAttractionIds)[number];

export type PlaceAttractionId = TbilisiAttractionId;

export type PlaceAttraction = {
  id: PlaceAttractionId;
  slug: string;
  image: string;
};

export type PlaceAttractionNameKey =
  `items.${PlaceId}.attractions.${PlaceAttractionId}`;

export type PlaceContentField =
  | "name"
  | "imageAlt"
  | "lead"
  | "p1"
  | "p2"
  | "p3"
  | "attractionsTitle";

export type PlaceFieldKey<Field extends PlaceContentField> =
  `items.${PlaceId}.${Field}`;

export function placeAttractionNameKey(
  place: PlaceId,
  attractionId: PlaceAttractionId,
): PlaceAttractionNameKey {
  return `items.${place}.attractions.${attractionId}`;
}

export function placeFieldKey<Field extends PlaceContentField>(
  place: PlaceId,
  field: Field,
): PlaceFieldKey<Field> {
  return `items.${place}.${field}`;
}

export function getPlaceAttraction(
  place: PlaceId,
  slug: string,
): PlaceAttraction | undefined {
  return places[place].attractions.find((attraction) => attraction.slug === slug);
}

export function isPlaceAttractionSlug(place: PlaceId, slug: string): boolean {
  return getPlaceAttraction(place, slug) !== undefined;
}

export const places: Record<
  PlaceId,
  {
    image: string;
    attractions: PlaceAttraction[];
  }
> = {
  tbilisi: {
    image: "/dest/tb.jpg",
    attractions: [
      { id: "oldTbilisi", slug: "old-tbilisi", image: "/dest/tb.jpg" },
      { id: "narikala", slug: "narikala", image: "/dest/tb.jpg" },
      { id: "abanotubani", slug: "abanotubani", image: "/dest/tb.jpg" },
      { id: "metekhi", slug: "metekhi", image: "/dest/tb.jpg" },
      { id: "kartlisDeda", slug: "kartlis-deda", image: "/dest/tb.jpg" },
      {
        id: "rikeParkPeaceBridge",
        slug: "rike-park-peace-bridge",
        image: "/dest/tb.jpg",
      },
      { id: "mtatsminda", slug: "mtatsminda", image: "/dest/tb.jpg" },
      {
        id: "botanicalGarden",
        slug: "botanical-garden",
        image: "/dest/tb.jpg",
      },
      {
        id: "chronicleMonument",
        slug: "chronicle-monument",
        image: "/dest/tb.jpg",
      },
      {
        id: "gudiashviliSquare",
        slug: "gudiashvili-square",
        image: "/dest/tb.jpg",
      },
      { id: "sameba", slug: "sameba", image: "/dest/tb.jpg" },
      { id: "meidanBazaar", slug: "meidan-bazaar", image: "/dest/tb.jpg" },
      {
        id: "dryBridgeMarket",
        slug: "dry-bridge-market",
        image: "/dest/tb.jpg",
      },
      { id: "clockTower", slug: "clock-tower", image: "/dest/tb.jpg" },
      { id: "sionCathedral", slug: "sion-cathedral", image: "/dest/tb.jpg" },
      {
        id: "nationalMuseum",
        slug: "national-museum",
        image: "/dest/tb.jpg",
      },
      {
        id: "historicEntrances",
        slug: "historic-entrances",
        image: "/dest/tb.jpg",
      },
    ],
  },
};
