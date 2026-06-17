import { getBookingById } from "@/lib/booking-db";
import { buildBookingReminderEmail } from "@/lib/booking-reminder-email";
import type { BookingRecord } from "@/lib/booking-types";
import { getGeorgiaCalendarDate, getGeorgiaTomorrowDate } from "@/lib/georgia-time";
import { prisma } from "@/lib/prisma";
import { business } from "@/lib/site";
import { sendEmail } from "@/lib/send-email";

export type BookingReminderCronResult = {
  date: string;
  targetDate: string;
  candidates: number;
  sent: number;
  skipped: number;
  errors: string[];
};

export async function findBookingsDueForReminder(
  targetDate: string,
): Promise<BookingRecord[]> {
  const rows = await prisma.booking.findMany({
    where: {
      status: "confirmed",
      preferredDate: targetDate,
      reminderSentAt: null,
    },
    include: { review: { select: { id: true } } },
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
    reminderSentAt: booking.reminderSentAt?.toISOString() ?? null,
    hasReview: booking.review !== null,
    createdAt: booking.createdAt.toISOString(),
    updatedAt: booking.updatedAt.toISOString(),
  }));
}

export async function sendBookingReminderForBooking(
  bookingId: string,
): Promise<{ ok: boolean; error?: string }> {
  const booking = await getBookingById(bookingId);
  if (!booking) {
    return { ok: false, error: "Booking not found." };
  }

  if (booking.status !== "confirmed") {
    return { ok: false, error: "Booking is not confirmed." };
  }

  if (!booking.preferredDate) {
    return { ok: false, error: "Booking has no start date." };
  }

  if (booking.reminderSentAt) {
    return { ok: false, error: "Reminder already sent." };
  }

  const { subject, text, html } = buildBookingReminderEmail(booking);
  const emailResult = await sendEmail({
    to: booking.email,
    subject,
    text,
    html,
    replyTo: business.email,
  });

  if (!emailResult.ok) {
    return { ok: false, error: emailResult.error ?? "Email failed." };
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: { reminderSentAt: new Date() },
  });

  return { ok: true };
}

export async function sendManualBookingReminderForBooking(
  bookingId: string,
): Promise<{ ok: boolean; error?: string }> {
  return sendBookingReminderForBooking(bookingId);
}

export async function runBookingReminderCron(): Promise<BookingReminderCronResult> {
  const date = getGeorgiaCalendarDate();
  const targetDate = getGeorgiaTomorrowDate();
  const bookings = await findBookingsDueForReminder(targetDate);

  let sent = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const booking of bookings) {
    const result = await sendBookingReminderForBooking(booking.id);
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
    targetDate,
    candidates: bookings.length,
    sent,
    skipped,
    errors,
  };
}
