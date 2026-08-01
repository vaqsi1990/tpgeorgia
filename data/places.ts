export const placeIds = ["tbilisi", "guria", "adjara"] as const;

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

export const guriaAttractionIds = [
  "gomismta",
  "bakhmaro",
  "nabeglavi",
  "anaseuliTeaFactory",
  "ureki",
  "wineCulture",
  "askaneliEstate",
  "rtoWinery",
  "sharashidzeWinery",
  "menabdeWinery",
  "babasMarani",
  "armunji",
  "kalasFarm",
  "shekvetili",
  "erketiMonastery",
  "udabnoMonastery",
  "zhgentiSisters",
  "tsitsinatela",
  "jumatiMonastery",
] as const;

export type GuriaAttractionId = (typeof guriaAttractionIds)[number];

export const adjaraAttractionIds = [
  "batumi",
  "khelvachauri",
  "keda",
  "shuakhevi",
  "khulo",
  "kobuleti",
  "machakhela",
  "goderdzi",
  "adjaraCoastline",
] as const;

export type AdjaraAttractionId = (typeof adjaraAttractionIds)[number];

export type PlaceAttractionId =
  | TbilisiAttractionId
  | GuriaAttractionId
  | AdjaraAttractionId;

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

export type PlaceContentField =
  | "name"
  | "imageAlt"
  | "lead"
  | "p1"
  | "p2"
  | "p3"
  | "attractionsTitle";

export function placeAttractionNameKey(
  place: PlaceId,
  attractionId: PlaceAttractionId,
): string {
  return `items.${place}.attractions.${attractionId}.name`;
}

export function placeAttractionDescriptionKey(
  place: PlaceId,
  attractionId: PlaceAttractionId,
): string {
  return `items.${place}.attractions.${attractionId}.description`;
}

export function placeFieldKey<Field extends PlaceContentField>(
  place: PlaceId,
  field: Field,
): string {
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
    image: "/dest/tbilisi/oldtbilisi.jpg",
    attractions: [
      {
        id: "oldTbilisi",
        slug: "old-tbilisi",
        image: "/dest/tbilisi/oldtbilisi.jpg",
      },
      {
        id: "narikala",
        slug: "narikala",
        image: "/dest/tbilisi/narikala.jpg",
        mapUrl: "https://maps.app.goo.gl/D8oLyYHHGdd4K5F58",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.5041185718205!2d44.80618907559378!3d41.68805177729238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cf6937ee797%3A0x1442cb37b4b70cd!2z4YOc4YOQ4YOg4YOY4YOn4YOQ4YOa4YOY4YOhIOGDquGDmOGDruGDlA!5e0!3m2!1ska!2sus!4v1785567456663!5m2!1ska!2sus",
      },
      {
        id: "abanotubani",
        slug: "abanotubani",
        image: "/dest/tbilisi/abanotubani.jpg",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5011.027800072478!2d44.806425810252875!3d41.68652219631604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cf6538f0bb9%3A0x151595bbbcff7c94!2sAbanotubani%2C%20Tbilisi!5e0!3m2!1sen!2sge!4v1785567348276!5m2!1sen!2sge",
      },
      {
        id: "metekhi",
        slug: "metekhi",
        image: "/dest/tbilisi/metekhi.jpg",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.4041086392376!2d44.808594575593936!3d41.69021117715771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cf75a5396ad%3A0xa274db7ff397cae!2sMetekhi%20church%20of%20the%20Nativity%20of%20the%20Mother%20of%20God!5e0!3m2!1sen!2sge!4v1785568752125!5m2!1sen!2sge",
      },
      {
        id: "kartlisDeda",
        slug: "kartlis-deda",
        image: "/dest/tbilisi/kartlisdeda.jpg",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.5034424051373!2d44.805024875593766!3d41.688066377291534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cf6bd1b7ba3%3A0xa87f564165811a2a!2sMother%20of%20Kartli%2C%20T'bilisi!5e0!3m2!1sen!2sge!4v1785568780043!5m2!1sen!2sge",
      },
      {
        id: "rikeParkPeaceBridge",
        slug: "rike-park-peace-bridge",
        image: "/dest/tbilisi/peacebridge.jpg",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.2694771200204!2d44.80765707559413!3d41.69311797697652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cfae6b42e2d%3A0x7113a448ec104f5b!2sRike%20Park!5e0!3m2!1sen!2sge!4v1785568820171!5m2!1sen!2sge",
      },
      {
        id: "mtatsminda",
        slug: "mtatsminda",
        image: "/dest/tbilisi/mtawminda.jpg",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11916.72643905578!2d44.77886735737199!3d41.69501501264765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cea6b29c8f9%3A0xabb7446518210f1d!2smtatsminda!5e0!3m2!1sen!2sge!4v1785568846227!5m2!1sen!2sge",
      },
      {
        id: "botanicalGarden",
        slug: "botanical-garden",
        image: "/dest/tbilisi/botanical.jpg",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.545850649131!2d44.806324375593796!3d41.68715067734874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cf4d48dc0e1%3A0x13b0111196f6cb94!2sNational%20Botanical%20Garden!5e0!3m2!1sen!2sge!4v1785568867723!5m2!1sen!2sge",
      },
      {
        id: "chronicleMonument",
        slug: "chronicle-monument",
        image: "/dest/tbilisi/hronika.jpg",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2975.6770400296055!2d44.80784457559822!3d41.77062047213746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40446d0a119ef399%3A0x377e1f1f0dbe5cb!2sChronicles%20of%20Georgia!5e0!3m2!1sen!2sge!4v1785568910304!5m2!1sen!2sge",
      },
      {
        id: "gudiashviliSquare",
        slug: "gudiashvili-square",
        image: "/dest/tbilisi/gudiani.jpg",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.372568091141!2d44.800838875593904!3d41.690892177115224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cf1b9588465%3A0x874d9c38fab224cb!2sLado%20Gudiashvili%20Square%2C%20T'bilisi!5e0!3m2!1sen!2sge!4v1785568938731!5m2!1sen!2sge",
      },
      {
        id: "sameba",
        slug: "sameba",
        image: "/dest/tbilisi/sameba.jpg",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5958.118596088738!2d44.81387717559435!3d41.69765557669331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cfd14a9a29b%3A0x9a438625d9da2c32!2sHoly%20Trinity%20Cathedral%20of%20Tbilisi!5e0!3m2!1sen!2sge!4v1785568960626!5m2!1sen!2sge",
      },
      {
        id: "meidanBazaar",
        slug: "meidan-bazaar",
        image: "/dest/tbilisi/meidan.jpg",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5958.854198328272!2d44.80652017559394!3d41.689714777188755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cf72d903d4f%3A0xdd66176bec24ee12!2sMeidan%20Bazar!5e0!3m2!1sen!2sge!4v1785568984467!5m2!1sen!2sge",
      },
      {
        id: "dryBridgeMarket",
        slug: "dry-bridge-market",
        image: "/dest/tbilisi/mshralixidi.jpg",
        mapCoords: { lat: 41.7025, lng: 44.7915 },
      },
      {
        id: "clockTower",
        slug: "clock-tower",
        image: "/dest/tbilisi/clock.jpg",
        mapCoords: { lat: 41.6915, lng: 44.8075 },
      },
      {
        id: "sionCathedral",
        slug: "sion-cathedral",
        image: "/dest/tbilisi/sioni.jpg",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.3519900881656!2d44.804872675594055!3d41.691336477087575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440d0079a63b3f%3A0xd68818f2272b606d!2sSioni%20Church!5e0!3m2!1sen!2sge!4v1785569000811!5m2!1sen!2sge",
      },
      {
        id: "nationalMuseum",
        slug: "national-museum",
        image: "/dest/tbilisi/museum.jpg",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.1353242927084!2d44.79765687559427!3d41.69601427679567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cef543a5e2f%3A0x1d2e538dc87da98e!2sGeorgian%20National%20Museum!5e0!3m2!1sen!2sge!4v1785569025540!5m2!1sen!2sge",
      },
      {
        id: "historicEntrances",
        slug: "historic-entrances",
        image: "/dest/tbilisi/oldtbilisi.jpg",
        mapCoords: { lat: 41.693, lng: 44.801 },
      },
    ],
  },
  guria: {
    image: "/dest/guria.jpg",
    attractions: [
      {
        id: "gomismta",
        slug: "gomismta",
        image: "/dest/guria/gomismta.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gomismta%2C%20Guria%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Gomismta%2C%20Guria%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.823921, lng: 42.160955 },
      },
      {
        id: "bakhmaro",
        slug: "bakhmaro",
        image: "/dest/guria/bakhmaro.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Bakhmaro%2C%20Guria%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Bakhmaro%2C%20Guria%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.851272, lng: 42.32448 },
      },
      {
        id: "nabeglavi",
        slug: "nabeglavi",
        image: "/dest/guria/nabeghlavi.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Nabeghlavi%2C%20Guria%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Nabeghlavi%2C%20Guria%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.944861, lng: 42.356615 },
      },
      {
        id: "anaseuliTeaFactory",
        slug: "anaseuli-tea-factory",
        image: "/dest/guria/chai.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Anaseuli%2C%20Ozurgeti%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Anaseuli%2C%20Ozurgeti%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.908649, lng: 41.984226 },
      },
      {
        id: "ureki",
        slug: "ureki",
        image: "/dest/guria/ureki.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Ureki%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Ureki%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.996936, lng: 41.779346 },
      },
      {
        id: "wineCulture",
        slug: "wine-culture",
        image: "/dest/guria/gvino.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Ozurgeti%2C%20Guria%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Ozurgeti%2C%20Guria%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.923098, lng: 42.005926 },
      },
      {
        id: "askaneliEstate",
        slug: "askaneli-estate",
        image: "/dest/guria/gvino.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Askana%2C%20Ozurgeti%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Askana%2C%20Ozurgeti%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.95115, lng: 42.152927 },
      },
      {
        id: "rtoWinery",
        slug: "rto-winery",
        image: "/dest/guria/aranirto.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Jvartskhma%2C%20Chokhatauri%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Jvartskhma%2C%20Chokhatauri%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.991286, lng: 42.226149 },
      },
      {
        id: "sharashidzeWinery",
        slug: "sharashidze-winery",
        image: "/dest/guria/sharashizemarani.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Ozurgeti%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Ozurgeti%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.923098, lng: 42.005926 },
      },
      {
        id: "menabdeWinery",
        slug: "menabde-winery",
        image: "/dest/guria/menabde.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Shemokmedi%2C%20Ozurgeti%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Shemokmedi%2C%20Ozurgeti%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.909344, lng: 42.066901 },
      },
      {
        id: "babasMarani",
        slug: "babas-marani",
        image: "/dest/guria/baba.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Goraberezhouli%2C%20Chokhatauri%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Goraberezhouli%2C%20Chokhatauri%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 42.004948, lng: 42.207351 },
      },
      {
        id: "armunji",
        slug: "armunji",
        image: "/dest/guria/baba.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Goraberezhouli%2C%20Chokhatauri%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Goraberezhouli%2C%20Chokhatauri%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 42.004948, lng: 42.207351 },
      },
      {
        id: "kalasFarm",
        slug: "kalas-farm",
        image: "/dest/guria/debi.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Chokhatauri%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Chokhatauri%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 42.01921, lng: 42.239947 },
      },
      {
        id: "shekvetili",
        slug: "shekvetili",
        image: "/dest/guria/shekvetili.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Shekvetili%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Shekvetili%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.928883, lng: 41.769331 },
      },
      {
        id: "erketiMonastery",
        slug: "erketi-monastery",
        image: "/dest/guria/erketi.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Erketi%20Monastery%2C%20Chokhatauri%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Erketi%20Monastery%2C%20Chokhatauri%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.983197, lng: 42.273377 },
      },
      {
        id: "udabnoMonastery",
        slug: "udabno-monastery",
        image: "/dest/guria/udabno.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Udabno%20Monastery%2C%20Chokhatauri%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Udabno%20Monastery%2C%20Chokhatauri%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 42.058912, lng: 42.218413 },
      },
      {
        id: "zhgentiSisters",
        slug: "zhgenti-sisters",
        image: "/dest/guria/debi.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Melekeduri%2C%20Ozurgeti%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Melekeduri%2C%20Ozurgeti%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.948946, lng: 42.02562 },
      },
      {
        id: "tsitsinatela",
        slug: "tsitsinatela",
        image: "/dest/guria/cicinatela.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Tsitsinatela%2C%20Shekvetili%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Tsitsinatela%2C%20Shekvetili%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.906849, lng: 41.776861 },
      },
      {
        id: "jumatiMonastery",
        slug: "jumati-monastery",
        image: "/dest/guria/jumati.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Jumati%20Monastery%2C%20Guria%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Jumati%20Monastery%2C%20Guria%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 42.029767, lng: 41.985092 },
      },
    ],
  },
  adjara: {
    image: "/dest/adjara.jpg",
    attractions: [
      {
        id: "batumi",
        slug: "batumi",
        image: "/dest/adjara/batumi.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Batumi%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Batumi%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.6168, lng: 41.6367 },
      },
      {
        id: "khelvachauri",
        slug: "khelvachauri",
        image: "/dest/adjara/khelvachauri.jpg",
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Khelvachauri%2C%20Adjara%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Khelvachauri%2C%20Adjara%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.5867, lng: 41.9144 },
      },
      {
        id: "keda",
        slug: "keda",
        image: "/dest/adjara/keda.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Keda%2C%20Adjara%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Keda%2C%20Adjara%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.5983, lng: 41.87 },
      },
      {
        id: "shuakhevi",
        slug: "shuakhevi",
        image: "/dest/adjara/shuakhevi.jpg",
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Shuakhevi%2C%20Adjara%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Shuakhevi%2C%20Adjara%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.64, lng: 42.1711 },
      },
      {
        id: "khulo",
        slug: "khulo",
        image: "/dest/adjara/khulo.jpg",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Khulo%2C%20Adjara%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Khulo%2C%20Adjara%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.64, lng: 42.3144 },
      },
      {
        id: "kobuleti",
        slug: "kobuleti",
        image: "/dest/adjara/kobuleti.webp",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Kobuleti%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Kobuleti%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.8214, lng: 41.7756 },
      },
      {
        id: "machakhela",
        slug: "machakhela",
        image: "/dest/adjara/machakhela.jpg",
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Machakhela%20National%20Park%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Machakhela%20National%20Park%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.5736, lng: 41.7492 },
      },
      {
        id: "goderdzi",
        slug: "goderdzi",
        image: "/dest/adjara/goderdzi.webp",
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Goderdzi%20Pass%2C%20Adjara%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Goderdzi%20Pass%2C%20Adjara%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.8236, lng: 42.1861 },
      },
      {
        id: "adjaraCoastline",
        slug: "adjara-coastline",
        image: "/dest/adjara/adjara.jpg",
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Kvariati%2C%20Adjara%2C%20Georgia",
        mapEmbedUrl:
          "https://maps.google.com/maps?q=Kvariati%2C%20Adjara%2C%20Georgia&z=14&output=embed",
        mapCoords: { lat: 41.5578, lng: 41.5747 },
      },
    ],
  },
};
