import { AdminCreateLink } from "@/components/admin/StoredTourList";
import { listBookings } from "@/lib/booking-db";
import { listExcursions, listTours } from "@/lib/catalog-db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [tours, excursions, bookings] = await Promise.all([
    listTours(),
    listExcursions(),
    listBookings(),
  ]);
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-afacad text-3xl font-semibold">ადმინის პანელი</h1>
        <p className="mt-1 text-[15px] text-black/65">
        შექმენი და მართეთ ტურები და ექსკურსიები ყველა ენაზე.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-black/10 bg-white p-5">
          <p className="text-[15px] font-medium uppercase tracking-wide text-black/50">
          ჯავშნები
          </p>
          <p className="font-afacad mt-1 text-3xl font-semibold">{bookings.length}</p>
          {pendingBookings > 0 ? (
            <p className="mt-1 text-[14px] font-medium text-amber-700">
              {pendingBookings} მოლოდინში
            </p>
          ) : null}
          <div className="mt-4">
            <Link
              href="/admin/bookings"
              className="rounded-xl border border-black/15 px-4 py-2.5 text-[14px] font-medium hover:bg-brand/5"
            >
              ყველას ნახვა
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-5">
          <p className="text-[15px] font-medium uppercase tracking-wide text-black/50">
          ტურები 
          </p>
          <p className="font-afacad mt-1 text-3xl font-semibold">{tours.length}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <AdminCreateLink href="/admin/tours/new">ახალი ტური</AdminCreateLink>
            <Link
              href="/admin/tours"
              className="rounded-xl border border-black/15 px-4 py-2.5 text-[14px] font-medium hover:bg-brand/5"
            >
             ყველას ნახვა
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-5">
          <p className="text-[15px] font-medium uppercase tracking-wide text-black/50">
          ექსკურსიები
          </p>
          <p className="font-afacad mt-1 text-3xl font-semibold">
            {excursions.length}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <AdminCreateLink href="/admin/excursions/new">
            ახალი ექსკურსი
            </AdminCreateLink>
            <Link
              href="/admin/excursions"
              className="rounded-xl border border-black/15 px-4 py-2.5 text-[14px] font-medium hover:bg-brand/5"
            >
             ყველას ნახვა
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
