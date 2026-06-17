import { prisma } from "@/lib/prisma";
import type { ReviewRecord } from "@/lib/review-types";
import type { BookingType, Locale } from "@/lib/generated/prisma/enums";

export type { ReviewRecord } from "@/lib/review-types";
function mapReview(review: {
  id: string;
  bookingId: string;
  itemType: BookingType;
  itemId: string;
  itemTitle: string;
  authorName: string;
  text: string;
  locale: Locale | null;
  published: boolean;
  createdAt: Date;
}): ReviewRecord {
  return {
    id: review.id,
    bookingId: review.bookingId,
    itemType: review.itemType,
    itemId: review.itemId,
    itemTitle: review.itemTitle,
    authorName: review.authorName,
    text: review.text,
    locale: review.locale,
    published: review.published,
    createdAt: review.createdAt.toISOString(),
  };
}

export async function listReviews(): Promise<ReviewRecord[]> {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
  });
  return reviews.map(mapReview);
}

export async function listPublishedReviewsForItem(
  itemType: BookingType,
  itemId: string,
): Promise<ReviewRecord[]> {
  const reviews = await prisma.review.findMany({
    where: { itemType, itemId, published: true },
    orderBy: { createdAt: "desc" },
  });
  return reviews.map(mapReview);
}

export async function getReviewByBookingId(
  bookingId: string,
): Promise<ReviewRecord | null> {
  const review = await prisma.review.findUnique({ where: { bookingId } });
  return review ? mapReview(review) : null;
}

export async function createReview(input: {
  bookingId: string;
  itemType: BookingType;
  itemId: string;
  itemTitle: string;
  authorName: string;
  text: string;
  locale?: Locale | null;
}): Promise<ReviewRecord> {
  const review = await prisma.review.create({
    data: {
      bookingId: input.bookingId,
      itemType: input.itemType,
      itemId: input.itemId,
      itemTitle: input.itemTitle,
      authorName: input.authorName,
      text: input.text,
      locale: input.locale ?? null,
    },
  });
  return mapReview(review);
}

export async function updateReviewPublished(
  id: string,
  published: boolean,
): Promise<ReviewRecord | null> {
  try {
    const review = await prisma.review.update({
      where: { id },
      data: { published },
    });
    return mapReview(review);
  } catch {
    return null;
  }
}

export async function deleteReview(id: string): Promise<boolean> {
  try {
    await prisma.review.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}
