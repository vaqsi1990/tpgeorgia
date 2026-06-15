import StoredBookingList from "@/components/admin/StoredBookingList";
import { listBookings } from "@/lib/booking-db";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const bookings = await listBookings();
  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-afacad text-3xl font-semibold">ჯავშნები</h1>
        <p className="mt-1 text-[15px] text-black/65">
          კლიენტების ჯავშნის მოთხოვნები საიტიდან.
          {pendingCount > 0 ? ` ${pendingCount} ახალი მოლოდინში.` : ""}
        </p>
      </div>

      <StoredBookingList initialBookings={bookings} />
    </div>
  );
}
