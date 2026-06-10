"use client";

import type { StoredTourRecord } from "@/lib/admin-types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StoredTourList({
  initialTours,
}: {
  initialTours: StoredTourRecord[];
}) {
  const router = useRouter();
  const [tours, setTours] = useState(initialTours);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm(`Delete tour "${id}"?`)) return;
    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/tours?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Delete failed.");
      }
      setTours((prev) => prev.filter((tour) => tour.id !== id));
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  }

  if (tours.length === 0) {
    return (
      <p className="rounded-2xl border border-black/10 bg-white px-6 py-10 text-center text-[15px] text-black/65">
        No admin-created tours yet.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {tours.map((tour) => (
        <li
          key={tour.id}
          className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-medium">{tour.content.ka.title || tour.id}</p>
            <p className="text-[13px] text-black/60">
              ID: {tour.id} · {tour.meta.durationKey} · {tour.meta.priceFrom} GEL
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleDelete(tour.id)}
            disabled={deletingId === tour.id}
            className="rounded-lg border border-red-200 px-3 py-2 text-[13px] font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
          >
            {deletingId === tour.id ? "Deleting…" : "Delete"}
          </button>
        </li>
      ))}
    </ul>
  );
}

export function AdminCreateLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex rounded-xl bg-[#38ab8a] px-5 py-2.5 text-[14px] font-medium text-white hover:opacity-90"
    >
      {children}
    </Link>
  );
}
