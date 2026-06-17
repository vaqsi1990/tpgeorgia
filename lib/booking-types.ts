export type BookingStatus = "pending" | "confirmed" | "cancelled";
export type BookingType = "tour" | "excursion";
export type BookingLocale = "ka" | "en" | "ru" | "zh";

export type BookingRecord = {
  id: string;
  bookingType: BookingType;
  itemId: string;
  itemTitle: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string | null;
  endDate: string | null;
  endTime: string | null;
  peopleCount: number | null;
  message: string;
  locale: BookingLocale | null;
  status: BookingStatus;
  reviewRequestedAt: string | null;
  reminderSentAt: string | null;
  hasReview: boolean;
  createdAt: string;
  updatedAt: string;
};
