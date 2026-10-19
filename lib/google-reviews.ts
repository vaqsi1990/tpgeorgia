import type { AppLocale } from "@/i18n/routing";

export type GoogleReview = {
  id: string;
  authorName: string;
  authorUrl: string;
  photoUrl: string;
  rating: number;
  text: string;
  relativeTime: string;
};

export type GooglePlaceReviews = {
  rating: number | null;
  reviewCount: number;
  mapsUrl: string;
  reviews: GoogleReview[];
};

const languageByLocale: Record<AppLocale, string> = {
  ka: "ka",
  en: "en",
  ru: "ru",
  zh: "zh-CN",
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: Array<{
    name?: string;
    rating?: number;
    relativePublishTimeDescription?: string;
    publishTime?: string;
    text?: { text?: string };
    authorAttribution?: {
      displayName?: string;
      uri?: string;
      photoUri?: string;
    };
  }>;
};

const extraLanguages = ["en", "ka", "ru"] as const;

async function fetchPlace(
  placeId: string,
  apiKey: string,
  languageCode: string,
): Promise<PlacesResponse | null> {
  const response = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=${encodeURIComponent(languageCode)}`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: 60 * 60 * 6 },
    },
  );

  if (!response.ok) return null;
  return (await response.json()) as PlacesResponse;
}

export async function getGooglePlaceReviews(
  locale: AppLocale,
): Promise<GooglePlaceReviews | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  const languageCode = languageByLocale[locale];
  const languages = [
    languageCode,
    ...extraLanguages.filter((language) => language !== languageCode),
  ];
  const responses = await Promise.all(
    languages.map((language) => fetchPlace(placeId, apiKey, language)),
  );

  const summary = responses.find((response) => response?.userRatingCount);
  const collected = new Map<
    string,
    GoogleReview & { publishTime: string }
  >();

  for (const data of responses) {
    for (const review of data?.reviews ?? []) {
      const authorName = review.authorAttribution?.displayName ?? "";
      const id = review.name ?? `${authorName}-${review.publishTime ?? ""}`;
      if (!authorName || !review.rating || collected.has(id)) continue;

      collected.set(id, {
        id,
        authorName,
        authorUrl: review.authorAttribution?.uri ?? "",
        photoUrl: review.authorAttribution?.photoUri ?? "",
        rating: review.rating,
        text: review.text?.text ?? "",
        relativeTime: review.relativePublishTimeDescription ?? "",
        publishTime: review.publishTime ?? "",
      });
    }
  }

  const reviews = [...collected.values()]
    .sort((a, b) => b.publishTime.localeCompare(a.publishTime))
    .map(({ publishTime: _publishTime, ...review }) => review);

  if (reviews.length === 0) return null;

  return {
    rating: typeof summary?.rating === "number" ? summary.rating : null,
    reviewCount: summary?.userRatingCount ?? reviews.length,
    mapsUrl: summary?.googleMapsUri ?? "",
    reviews,
  };
}
