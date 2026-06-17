import { getBookingById } from "@/lib/booking-db";
import { createReview, getReviewByBookingId } from "@/lib/review-db";
import { verifyReviewToken } from "@/lib/review-token";
import type { AppLocale } from "@/i18n/routing";
import { NextResponse } from "next/server";

function trimField(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const bookingId = trimField(body.bookingId, 80);
    const token = trimField(body.token, 500);
    const authorName = trimField(body.authorName, 120);
    const text = trimField(body.text, 5000);
    const localeRaw = trimField(body.locale, 2);
    const locale =
      localeRaw === "ka" ||
      localeRaw === "en" ||
      localeRaw === "ru" ||
      localeRaw === "zh"
        ? localeRaw
        : null;

    if (!bookingId || !token || !authorName || !text) {
      return NextResponse.json(
        { error: "Invalid form data." },
        { status: 400 },
      );
    }

    if (!verifyReviewToken(bookingId, token)) {
      return NextResponse.json({ error: "Invalid or expired link." }, { status: 403 });
    }

    const booking = await getBookingById(bookingId);
    if (!booking || booking.status !== "confirmed") {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    const existing = await getReviewByBookingId(bookingId);
    if (existing) {
      return NextResponse.json(
        { error: "Review already submitted." },
        { status: 409 },
      );
    }

    const review = await createReview({
      bookingId,
      itemType: booking.bookingType,
      itemId: booking.itemId,
      itemTitle: booking.itemTitle,
      authorName,
      text,
      locale: (locale ?? booking.locale) as AppLocale | null,
    });

    return NextResponse.json({ ok: true, id: review.id });
  } catch (error) {
    console.error("Review submit error:", error);
    return NextResponse.json(
      { error: "Failed to submit review." },
      { status: 500 },
    );
  }
}
