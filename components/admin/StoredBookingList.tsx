"use client";

import type { BookingRecord, BookingStatus } from "@/lib/booking-types";
import { GEORGIA_IANA_TIME_ZONE } from "@/lib/georgia-time";
import { useRouter } from "next/navigation";
import { useState } from "react";

const statusLabels: Record<BookingStatus, string> = {
  pending: "მოლოდინში",
  confirmed: "დადასტურებული",
  cancelled: "გაუქმებული",
};

/** Fixed en-GB parts — ka-GE dateStyle can differ between Node and browsers. */
function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: GEORGIA_IANA_TIME_ZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}

function formatBookingEnd(booking: BookingRecord): string | null {
  if (!booking.endDate || !booking.endTime) {
    return null;
  }

  const [year, month, day] = booking.endDate.split("-").map(Number);
  const formatted = new Intl.DateTimeFormat("en-GB", {
    timeZone: GEORGIA_IANA_TIME_ZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(Date.UTC(year, month - 1, day, 8, 0, 0)));

  return `${formatted}, ${booking.endTime}`;
}

export default function StoredBookingList({
  initialBookings,
}: {
  initialBookings: BookingRecord[];
}) {
  const router = useRouter();
  const [bookings, setBookings] = useState(initialBookings);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [sendingReviewId, setSendingReviewId] = useState<string | null>(null);
  const [sendingReminderId, setSendingReminderId] = useState<string | null>(null);

  async function handleStatusChange(id: string, status: BookingStatus) {
    setUpdatingId(id);
    try {
      const response = await fetch(`/api/admin/bookings/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Update failed.");
      }
      const data = await response.json();
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id ? data.booking : booking,
        ),
      );
      if (data.emailSent === false && data.emailWarning) {
        alert(`სტატუსი განახლდა, მაგრამ ელფოსტა ვერ გაიგზავნა: ${data.emailWarning}`);
      }
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Update failed.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleSendReviewRequest(id: string) {
    if (
      !window.confirm(
        "გსურთ კლიენტს რევიუს ბმულის ელფოსტის გაგზავნა?",
      )
    ) {
      return;
    }

    setSendingReviewId(id);
    try {
      const response = await fetch(
        `/api/admin/bookings/${encodeURIComponent(id)}/review-request`,
        { method: "POST" },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Email failed.");
      }

      if (data.booking) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === id ? data.booking : booking,
          ),
        );
      }

      alert("რევიუს წერილი გაიგზავნა.");
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Email failed.");
    } finally {
      setSendingReviewId(null);
    }
  }

  async function handleSendReminder(id: string) {
    if (
      !window.confirm(
        "გსურთ კლიენტს შეხსენების ელფოსტის გაგზავნა?",
      )
    ) {
      return;
    }

    setSendingReminderId(id);
    try {
      const response = await fetch(
        `/api/admin/bookings/${encodeURIComponent(id)}/reminder`,
        { method: "POST" },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Email failed.");
      }

      if (data.booking) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === id ? data.booking : booking,
          ),
        );
      }

      alert("შეხსენების წერილი გაიგზავნა.");
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Email failed.");
    } finally {
      setSendingReminderId(null);
    }
  }

  if (bookings.length === 0) {
    return (
      <p className="rounded-2xl border border-black/10 bg-white px-6 py-10 text-center text-[15px] text-black/65">
        ჯავშნები ჯერ არ არის.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {bookings.map((booking) => {
        const endLabel = formatBookingEnd(booking);

        return (
        <li
          key={booking.id}
          className="rounded-2xl border border-black/10 bg-white p-5"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#DC2626]/10 px-3 py-1 text-[16px] font-semibold uppercase tracking-wide text-[#0f4f4f] ">
                  {booking.bookingType === "tour" ? "ტური" : "ექსკურსია"}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-[16px] font-semibold ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-900"
                  }`}
                >
                  {statusLabels[booking.status]}
                </span>
                <span className="rounded-full bg-[#0f4f4f]/10 px-3 py-1 font-mono text-[15px] font-semibold tracking-wider text-[#0f4f4f] md:text-[16px]">
                  № {booking.id}
                </span>
                <span className="text-[16px] text-black/50 md:text-[18px]">
                  {formatDate(booking.createdAt)}
                </span>
              </div>

              <div>
                <p className="font-afacad text-xl font-semibold text-black">
                  {booking.itemTitle}
                </p>
                <p className="text-[16px] text-black md:text-[18px]">ID: {booking.itemId}</p>
              </div>

              <dl className="grid gap-2 text-[16px] sm:grid-cols-2 md:text-[18px]">
                <div>
                  <dt className="text-black">სახელი</dt>
                  <dd className="font-medium">{booking.name}</dd>
                </div>
                <div>
                  <dt className="text-black md:text-[18px]">ტელეფონი</dt>
                  <dd>
                    <a
                      href={`tel:${booking.phone}`}
                      className="font-medium text-[#0f4f4f] hover:underline"
                    >
                      {booking.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-black md:text-[18px]">ელფოსტა</dt>
                  <dd>
                    <a
                      href={`mailto:${booking.email}`}
                      className="font-medium text-[#0f4f4f] hover:underline"
                    >
                      {booking.email}
                    </a>
                  </dd>
                </div>
                {booking.preferredDate ? (
                  <div>
                    <dt className="text-black md:text-[18px]">თარიღი</dt>
                    <dd className="font-medium">{booking.preferredDate}</dd>
                  </div>
                ) : null}
                {endLabel ? (
                  <div>
                    <dt className="text-black md:text-[18px]">დასრულება</dt>
                    <dd className="font-medium">{endLabel}</dd>
                  </div>
                ) : null}
                {booking.peopleCount ? (
                  <div>
                    <dt className="text-black md:text-[18px]">ადამიანები</dt>
                    <dd className="font-medium">{booking.peopleCount}</dd>
                  </div>
                ) : null}
              </dl>

              <div className="rounded-xl border border-black/8 bg-black/[0.02] px-4 py-3">
                <p className="mb-1 text-[16px] font-semibold uppercase tracking-wide text-black/45 md:text-[18px]">
                  შეტყობინება
                </p>
                <p className="whitespace-pre-wrap text-[16px] leading-relaxed text-black md:text-[18px]">
                  {booking.message}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3">
              <label className="block">
                <span className="mb-1.5 block text-[16px] font-medium text-black md:text-[18px]">
                  სტატუსი
                </span>
                <select
                  value={booking.status}
                  disabled={updatingId === booking.id}
                  onChange={(e) =>
                    handleStatusChange(booking.id, e.target.value as BookingStatus)
                  }
                  className="rounded-xl border border-black bg-white px-3 py-2.5 text-[16px] font-medium disabled:opacity-60 md:text-[18px]"
                >
                  <option value="pending">{statusLabels.pending}</option>
                  <option value="confirmed">{statusLabels.confirmed}</option>
                  <option value="cancelled">{statusLabels.cancelled}</option>
                </select>
              </label>

              {booking.hasReview ? (
                <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-center text-[15px] font-medium text-green-800 md:text-[16px]">
                  რევიუ მიღებულია
                </p>
              ) : booking.status === "confirmed" ? (
                <button
                  type="button"
                  disabled={
                    sendingReviewId === booking.id || updatingId === booking.id
                  }
                  onClick={() => handleSendReviewRequest(booking.id)}
                  className="rounded-xl border border-[#DC2626] bg-[#DC2626] px-4 py-2.5 text-[16px] font-medium text-white transition-colors hover:bg-[#DC2626]/20 disabled:cursor-not-allowed disabled:opacity-60 md:text-[18px]"
                >
                  {sendingReviewId === booking.id
                    ? "იგზავნება..."
                    : booking.reviewRequestedAt
                      ? "რევიუს წერილი თავიდან"
                      : "რევიუს წერილი"}
                </button>
              ) : null}

              {booking.reminderSentAt ? (
                <p className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-center text-[15px] font-medium text-blue-900 md:text-[16px]">
                  შეხსენება გაგზავნილია
                </p>
              ) : booking.status === "confirmed" && booking.preferredDate ? (
                <button
                  type="button"
                  disabled={
                    sendingReminderId === booking.id || updatingId === booking.id
                  }
                  onClick={() => handleSendReminder(booking.id)}
                  className="rounded-xl border border-[#DC2626] bg-[#DC2626] px-4 py-2.5 text-[16px] font-medium text-white transition-colors hover:bg-[#DC2626]/20 disabled:cursor-not-allowed disabled:opacity-60 md:text-[18px]"
                >
                  {sendingReminderId === booking.id
                    ? "იგზავნება..."
                    : "შეხსენება"}
                </button>
              ) : null}

              {booking.reminderSentAt ? (
                <p className="text-center text-[14px] text-black/50 md:text-[15px]">
                  შეხსენება: {formatDate(booking.reminderSentAt)}
                </p>
              ) : null}

              {booking.reviewRequestedAt && !booking.hasReview ? (
                <p className="text-center text-[14px] text-black/50 md:text-[15px]">
                  გაგზავნილია: {formatDate(booking.reviewRequestedAt)}
                </p>
              ) : null}
            </div>
          </div>
        </li>
        );
      })}
    </ul>
  );
}
