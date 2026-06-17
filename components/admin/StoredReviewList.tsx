"use client";

import type { ReviewRecord } from "@/lib/review-types";
import { useRouter } from "next/navigation";
import { useState } from "react";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("ka-GE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Tbilisi",
  }).format(new Date(iso));
}

export default function StoredReviewList({
  initialReviews,
}: {
  initialReviews: ReviewRecord[];
}) {
  const router = useRouter();
  const [reviews, setReviews] = useState(initialReviews);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function handlePublishedChange(id: string, published: boolean) {
    setUpdatingId(id);
    try {
      const response = await fetch(`/api/admin/reviews/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Update failed.");
      }
      const data = await response.json();
      setReviews((prev) =>
        prev.map((review) => (review.id === id ? data.review : review)),
      );
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Update failed.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("ნამდვილად გსურთ ამ რევიუს წაშლა?")) {
      return;
    }

    setUpdatingId(id);
    try {
      const response = await fetch(`/api/admin/reviews/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Delete failed.");
      }
      setReviews((prev) => prev.filter((review) => review.id !== id));
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Delete failed.");
    } finally {
      setUpdatingId(null);
    }
  }

  if (reviews.length === 0) {
    return (
      <p className="rounded-2xl border border-black/10 bg-white px-6 py-10 text-center text-[15px] text-black/65">
        რევიუები ჯერ არ არის.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {reviews.map((review) => (
        <li
          key={review.id}
          className="rounded-2xl border border-black/10 bg-white p-5"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#38ab8a]/10 px-3 py-1 text-[16px] font-semibold uppercase tracking-wide text-[#0f4f4f]">
                  {review.itemType === "tour" ? "ტური" : "ექსკურსია"}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-[16px] font-semibold ${
                    review.published
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-900"
                  }`}
                >
                  {review.published ? "გამოქვეყნებული" : "დამალული"}
                </span>
                <span className="text-[16px] text-black/50 md:text-[18px]">
                  {formatDate(review.createdAt)}
                </span>
              </div>

              <div>
                <p className="font-afacad text-xl font-semibold text-black">
                  {review.itemTitle}
                </p>
                <p className="text-[16px] text-black md:text-[18px]">
                  {review.authorName} · ჯავშანი № {review.bookingId}
                </p>
              </div>

              <p className="whitespace-pre-wrap rounded-xl border border-black/8 bg-black/[0.02] px-4 py-3 text-[16px] leading-relaxed text-black md:text-[18px]">
                {review.text}
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              <label className="block">
                <span className="mb-1.5 block text-[16px] font-medium text-black md:text-[18px]">
                  სტატუსი
                </span>
                <select
                  value={review.published ? "published" : "hidden"}
                  disabled={updatingId === review.id}
                  onChange={(e) =>
                    handlePublishedChange(
                      review.id,
                      e.target.value === "published",
                    )
                  }
                  className="rounded-xl border border-black bg-white px-3 py-2.5 text-[16px] font-medium disabled:opacity-60 md:text-[18px]"
                >
                  <option value="published">გამოქვეყნებული</option>
                  <option value="hidden">დამალული</option>
                </select>
              </label>
              <button
                type="button"
                disabled={updatingId === review.id}
                onClick={() => handleDelete(review.id)}
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[16px] font-medium text-red-800 transition-colors hover:bg-red-100 disabled:opacity-60 md:text-[18px]"
              >
                წაშლა
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
