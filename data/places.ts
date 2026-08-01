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
      {
        id: "metekhi",
        slug: "metekhi",
        image: "/dest/tb.jpg",
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Metekhi%20church%20of%20the%20Nativity%20of%20the%20Mother%20of%20God",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.4041086392376!2d44.808594575593936!3d41.69021117715771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cf75a5396ad%3A0xa274db7ff397cae!2sMetekhi%20church%20of%20the%20Nativity%20of%20the%20Mother%20of%20God!5e0!3m2!1sen!2sge!4v1785568752125!5m2!1sen!2sge",
      },
      {
        id: "kartlisDeda",
        slug: "kartlis-deda",
        image: "/dest/tb.jpg",
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Mother%20of%20Kartli%2C%20Tbilisi",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.5034424051373!2d44.805024875593766!3d41.688066377291534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cf6bd1b7ba3%3A0xa87f564165811a2a!2sMother%20of%20Kartli%2C%20T'bilisi!5e0!3m2!1sen!2sge!4v1785568780043!5m2!1sen!2sge",
      },
      {
        id: "rikeParkPeaceBridge",
        slug: "rike-park-peace-bridge",
        image: "/dest/tb.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Rike%20Park%2C%20Tbilisi",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.2694771200204!2d44.80765707559413!3d41.69311797697652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cfae6b42e2d%3A0x7113a448ec104f5b!2sRike%20Park!5e0!3m2!1sen!2sge!4v1785568820171!5m2!1sen!2sge",
      },
      {
        id: "mtatsminda",
        slug: "mtatsminda",
        image: "/dest/tb.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Mtatsminda%2C%20Tbilisi",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11916.72643905578!2d44.77886735737199!3d41.69501501264765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cea6b29c8f9%3A0xabb7446518210f1d!2smtatsminda!5e0!3m2!1sen!2sge!4v1785568846227!5m2!1sen!2sge",
      },
      {
        id: "botanicalGarden",
        slug: "botanical-garden",
        image: "/dest/tb.jpg",
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=National%20Botanical%20Garden%2C%20Tbilisi",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.545850649131!2d44.806324375593796!3d41.68715067734874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cf4d48dc0e1%3A0x13b0111196f6cb94!2sNational%20Botanical%20Garden!5e0!3m2!1sen!2sge!4v1785568867723!5m2!1sen!2sge",
      },
      {
        id: "chronicleMonument",
        slug: "chronicle-monument",
        image: "/dest/tb.jpg",
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Chronicles%20of%20Georgia",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2975.6770400296055!2d44.80784457559822!3d41.77062047213746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40446d0a119ef399%3A0x377e1f1f0dbe5cb!2sChronicles%20of%20Georgia!5e0!3m2!1sen!2sge!4v1785568910304!5m2!1sen!2sge",
      },
      {
        id: "gudiashviliSquare",
        slug: "gudiashvili-square",
        image: "/dest/tb.jpg",
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Lado%20Gudiashvili%20Square%2C%20Tbilisi",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.372568091141!2d44.800838875593904!3d41.690892177115224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cf1b9588465%3A0x874d9c38fab224cb!2sLado%20Gudiashvili%20Square%2C%20T'bilisi!5e0!3m2!1sen!2sge!4v1785568938731!5m2!1sen!2sge",
      },
      {
        id: "sameba",
        slug: "sameba",
        image: "/dest/tb.jpg",
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Holy%20Trinity%20Cathedral%20of%20Tbilisi",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5958.118596088738!2d44.81387717559435!3d41.69765557669331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cfd14a9a29b%3A0x9a438625d9da2c32!2sHoly%20Trinity%20Cathedral%20of%20Tbilisi!5e0!3m2!1sen!2sge!4v1785568960626!5m2!1sen!2sge",
      },
      {
        id: "meidanBazaar",
        slug: "meidan-bazaar",
        image: "/dest/tb.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Meidan%20Bazar%2C%20Tbilisi",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5958.854198328272!2d44.80652017559394!3d41.689714777188755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cf72d903d4f%3A0xdd66176bec24ee12!2sMeidan%20Bazar!5e0!3m2!1sen!2sge!4v1785568984467!5m2!1sen!2sge",
      },
      {
        id: "dryBridgeMarket",
        slug: "dry-bridge-market",
        image: "/dest/tb.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=41.7025,44.7915",
        mapCoords: { lat: 41.7025, lng: 44.7915 },
      },
      {
        id: "clockTower",
        slug: "clock-tower",
        image: "/dest/tb.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=41.6915,44.8075",
        mapCoords: { lat: 41.6915, lng: 44.8075 },
      },
      {
        id: "sionCathedral",
        slug: "sion-cathedral",
        image: "/dest/tb.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Sioni%20Church%2C%20Tbilisi",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.3519900881656!2d44.804872675594055!3d41.691336477087575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440d0079a63b3f%3A0xd68818f2272b606d!2sSioni%20Church!5e0!3m2!1sen!2sge!4v1785569000811!5m2!1sen!2sge",
      },
      {
        id: "nationalMuseum",
        slug: "national-museum",
        image: "/dest/tb.jpg",
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Georgian%20National%20Museum",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.1353242927084!2d44.79765687559427!3d41.69601427679567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cef543a5e2f%3A0x1d2e538dc87da98e!2sGeorgian%20National%20Museum!5e0!3m2!1sen!2sge!4v1785569025540!5m2!1sen!2sge",
      },
      {
        id: "historicEntrances",
        slug: "historic-entrances",
        image: "/dest/tb.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=41.6930,44.8010",
        mapCoords: { lat: 41.693, lng: 44.801 },
      },
    ],
  },
};
