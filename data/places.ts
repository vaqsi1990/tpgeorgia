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
  mapUrl?: string;
  mapEmbedUrl?: string;
  mapCoords?: {
    lat: number;
    lng: number;
  };
};

export type PlaceAttractionNameKey =
  `items.${PlaceId}.attractions.${PlaceAttractionId}.name`;

export type PlaceAttractionDescriptionKey =
  `items.${PlaceId}.attractions.${PlaceAttractionId}.description`;

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
  return `items.${place}.attractions.${attractionId}.name`;
}

export function placeAttractionDescriptionKey(
  place: PlaceId,
  attractionId: PlaceAttractionId,
): PlaceAttractionDescriptionKey {
  return `items.${place}.attractions.${attractionId}.description`;
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
      {
        id: "narikala",
        slug: "narikala",
        image: "/dest/tb.jpg",
        mapUrl: "https://maps.app.goo.gl/D8oLyYHHGdd4K5F58",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.5041185718205!2d44.80618907559378!3d41.68805177729238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cf6937ee797%3A0x1442cb37b4b70cd!2z4YOc4YOQ4YOg4YOY4YOn4YOQ4YOa4YOY4YOhIOGDquGDmOGDruGDlA!5e0!3m2!1ska!2sus!4v1785567456663!5m2!1ska!2sus",
      },
      {
        id: "abanotubani",
        slug: "abanotubani",
        image: "/dest/tb.jpg",
        mapUrl: "https://maps.app.goo.gl/SPbE2VZtEPYatCDr5",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5011.027800072478!2d44.806425810252875!3d41.68652219631604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cf6538f0bb9%3A0x151595bbbcff7c94!2sAbanotubani%2C%20Tbilisi!5e0!3m2!1sen!2sge!4v1785567348276!5m2!1sen!2sge",
      },
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
