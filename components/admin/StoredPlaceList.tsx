"use client";

import type { StoredPlaceRecord } from "@/lib/place-types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StoredPlaceList({
  initialPlaces,
}: {
  initialPlaces: StoredPlaceRecord[];
}) {
  const router = useRouter();
  const [places, setPlaces] = useState(initialPlaces);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`წავშალოთ ადგილი „${name || id}“?`)) return;
    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/places/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "წაშლა ვერ მოხერხდა.");
      }
      setPlaces((prev) => prev.filter((item) => item.id !== id));
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "წაშლა ვერ მოხერხდა.");
    } finally {
      setDeletingId(null);
    }
  }

  if (places.length === 0) {
    return (
      <p className="rounded-2xl border border-black/10 bg-white px-6 py-10 text-center text-[15px] text-black/65">
        ადგილები ჯერ არ არის.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {places.map((place) => {
        const name = place.content.ka.name || place.content.en.name || place.id;
        return (
          <li
            key={place.id}
            className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-white p-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-[16px] font-medium text-black md:text-[18px]">{name}</p>
              <p className="text-[15px] text-black/60 md:text-[16px]">
                /places/{place.id} · {place.attractions.length} ღირსშესანიშნაობა ·{" "}
                {place.published ? "გამოქვეყნებული" : "დამალული"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/ka/places/${encodeURIComponent(place.id)}`}
                className="rounded-lg border border-black/15 px-3 py-2 text-[16px] font-medium hover:bg-black/5 md:text-[18px]"
              >
                ნახვა
              </Link>
              <Link
                href={`/admin/places/${encodeURIComponent(place.id)}/edit`}
                className="rounded-lg border border-black/15 px-3 py-2 text-[16px] font-medium hover:bg-black/5 md:text-[18px]"
              >
                რედაქტირება
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(place.id, name)}
                disabled={deletingId === place.id}
                className="rounded-lg border border-red-200 px-3 py-2 text-[16px] font-medium text-red-700 hover:bg-red-50 disabled:opacity-60 md:text-[18px]"
              >
                {deletingId === place.id ? "წაშლა…" : "წაშლა"}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
