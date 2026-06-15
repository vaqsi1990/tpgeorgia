import type { BookingPayload } from "@/lib/booking-inquiry";
import { prisma } from "@/lib/prisma";
import type { BookingStatus, BookingType, Locale } from "@/lib/generated/prisma/enums";

export type BookingRecord = {
  id: string;
  bookingType: BookingType;
  itemId: string;
  itemTitle: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string | null;
  peopleCount: number | null;
  message: string;
  locale: Locale | null;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
};

function mapBooking(booking: {
  id: string;
  bookingType: BookingType;
  itemId: string;
  itemTitle: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string | null;
  peopleCount: number | null;
  message: string;
  locale: Locale | null;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}): BookingRecord {
  return {
    id: booking.id,
    bookingType: booking.bookingType,
    itemId: booking.itemId,
    itemTitle: booking.itemTitle,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    preferredDate: booking.preferredDate,
    peopleCount: booking.peopleCount,
    message: booking.message,
    locale: booking.locale,
    status: booking.status,
    createdAt: booking.createdAt.toISOString(),
    updatedAt: booking.updatedAt.toISOString(),
  };
}

export async function createBooking(
  payload: BookingPayload,
): Promise<BookingRecord> {
  const booking = await prisma.booking.create({
    data: {
      bookingType: payload.bookingType,
      itemId: payload.itemId,
      itemTitle: payload.itemTitle,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      preferredDate: payload.preferredDate ?? null,
      peopleCount: payload.peopleCount ?? null,
      message: payload.message,
      locale: payload.locale ?? null,
    },
  });

  return mapBooking(booking);
}

export async function listBookings(): Promise<BookingRecord[]> {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  return bookings.map(mapBooking);
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
): Promise<BookingRecord | null> {
  try {
    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    });
    return mapBooking(booking);
  } catch {
    return null;
  }
}
