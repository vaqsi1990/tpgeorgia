"use client";

import type { StoredExcursionRecord } from "@/lib/admin-types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StoredExcursionList({
  initialExcursions,
}: {
  initialExcursions: StoredExcursionRecord[];
}) {
  const router = useRouter();
  const [excursions, setExcursions] = useState(initialExcursions);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm(`Delete excursion "${id}"?`)) return;
    setDeletingId(id);
    try {
      const response = await fetch(
        `/api/admin/excursions/${encodeURIComponent(id)}`,
        { method: "DELETE" },
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Delete failed.");
      }
      setExcursions((prev) => prev.filter((item) => item.id !== id));
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  }

  if (excursions.length === 0) {
    return (
      <p className="rounded-2xl border border-black/10 bg-white px-6 py-10 text-center text-[15px] text-black/65">
        No admin-created excursions yet.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {excursions.map((excursion) => (
        <li
          key={excursion.id}
          className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-medium">
              {excursion.content.ka.title || excursion.id}
            </p>
            <p className="text-[15px] text-black/60">
              ID: {excursion.id} · {excursion.meta.grades} ·{" "}
              {excursion.meta.priceFrom} GEL
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/admin/excursions/${encodeURIComponent(excursion.id)}/edit`}
              className="rounded-lg border border-black/15 px-3 py-2 text-[15px] font-medium hover:bg-black/5"
            >
              ცვლილება
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(excursion.id)}
              disabled={deletingId === excursion.id}
              className="rounded-lg border border-red-200 px-3 py-2 text-[15px] font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
            >
              {deletingId === excursion.id ? "წაშლა…" : "წაშლა"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
