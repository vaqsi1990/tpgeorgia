import type { BookingType } from "@/lib/booking-types";

export type ItemReviewStats = {
  averageRating: number;
  reviewCount: number;
  fiveStarCount: number;
};

export type ReviewStatsRecord = Record<string, ItemReviewStats>;

/** Minimum five-star reviews required for automatic TOP badge on the homepage. */
export const AUTO_TOP_MIN_FIVE_STAR_REVIEWS = 5;

export function reviewStatsKey(itemType: BookingType, itemId: string): string {
  return `${itemType}:${itemId}`;
}

export function getItemReviewStats(
  stats: ReviewStatsRecord | undefined,
  itemType: BookingType,
  itemId: string,
): ItemReviewStats | undefined {
  return stats?.[reviewStatsKey(itemType, itemId)];
}

export function isAutoTopRated(stats: ItemReviewStats | undefined): boolean {
  if (!stats) {
    return false;
  }

  return stats.fiveStarCount >= AUTO_TOP_MIN_FIVE_STAR_REVIEWS;
}

export function summarizeRatings(
  ratings: number[],
): ItemReviewStats | undefined {
  if (ratings.length === 0) {
    return undefined;
  }

  const sum = ratings.reduce((total, rating) => total + rating, 0);
  const fiveStarCount = ratings.filter((rating) => rating === 5).length;

  return {
    averageRating: Math.round((sum / ratings.length) * 10) / 10,
    reviewCount: ratings.length,
    fiveStarCount,
  };
}
