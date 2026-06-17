import type { BookingLocale, BookingType } from "@/lib/booking-types";

export type ReviewRecord = {
  id: string;
  bookingId: string;
  itemType: BookingType;
  itemId: string;
  itemTitle: string;
  authorName: string;
  text: string;
  locale: BookingLocale | null;
  published: boolean;
  createdAt: string;
};
