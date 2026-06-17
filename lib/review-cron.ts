import type { BookingRecord } from "@/lib/booking-types";
import { getBookingById } from "@/lib/booking-db";
import { getGeorgiaCalendarDate } from "@/lib/georgia-time";
import { prisma } from "@/lib/prisma";
import { buildReviewRequestEmail } from "@/lib/review-request-email";
import { sendEmail } from "@/lib/send-email";

export type ReviewCronResult = {
  date: string;
  candidates: number;
  sent: number;
  skipped: number;
  errors: string[];
};

export async function findBookingsDueForReviewRequest(
  georgiaDate: string,
): Promise<BookingRecord[]> {
  const rows = await prisma.booking.findMany({
    where: {
      status: "confirmed",
      endDate: georgiaDate,
      reviewRequestedAt: null,
      review: { is: null },
    },
    orderBy: { createdAt: "asc" },
  });

  return rows.map((booking) => ({
    id: booking.id,
    bookingType: booking.bookingType,
    itemId: booking.itemId,
    itemTitle: booking.itemTitle,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    preferredDate: booking.preferredDate,
    endDate: booking.endDate,
    endTime: booking.endTime,
    peopleCount: booking.peopleCount,
    message: booking.message,
    locale: booking.locale,
    status: booking.status,
    reviewRequestedAt: booking.reviewRequestedAt?.toISOString() ?? null,
    hasReview: false,
    createdAt: booking.createdAt.toISOString(),
    updatedAt: booking.updatedAt.toISOString(),
  }));
}

export async function sendReviewRequestForBooking(
  bookingId: string,
): Promise<{ ok: boolean; error?: string }> {
  return sendReviewRequestEmail(bookingId, { mode: "cron" });
}

export async function sendManualReviewRequestForBooking(
  bookingId: string,
): Promise<{ ok: boolean; error?: string; reviewUrl?: string }> {
  return sendReviewRequestEmail(bookingId, { mode: "manual" });
}

async function sendReviewRequestEmail(
  bookingId: string,
  options: { mode: "cron" | "manual" },
): Promise<{ ok: boolean; error?: string; reviewUrl?: string }> {
  const booking = await getBookingById(bookingId);
  if (!booking) {
    return { ok: false, error: "Booking not found." };
  }

  if (booking.status !== "confirmed") {
    return { ok: false, error: "Only confirmed bookings can receive review emails." };
  }

  if (options.mode === "cron" && !booking.endDate) {
    return { ok: false, error: "Booking is not eligible." };
  }

  if (booking.hasReview) {
    return { ok: false, error: "Review already submitted." };
  }

  const { subject, text, html, reviewUrl } = buildReviewRequestEmail(booking);
  const emailResult = await sendEmail({
    to: booking.email,
    subject,
    text,
    html,
  });

  if (!emailResult.ok) {
    return { ok: false, error: emailResult.error ?? "Email failed." };
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: { reviewRequestedAt: new Date() },
  });

  return { ok: true, reviewUrl };
}

export async function runReviewRequestCron(): Promise<ReviewCronResult> {
  const date = getGeorgiaCalendarDate();
  const bookings = await findBookingsDueForReviewRequest(date);

  let sent = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const booking of bookings) {
    const result = await sendReviewRequestForBooking(booking.id);
    if (result.ok) {
      sent += 1;
    } else {
      skipped += 1;
      if (result.error) {
        errors.push(`${booking.id}: ${result.error}`);
      }
    }
  }

  return {
    date,
    candidates: bookings.length,
    sent,
    skipped,
    errors,
  };
}
