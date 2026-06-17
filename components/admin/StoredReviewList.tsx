"use client";

import StarRating from "@/components/StarRating";
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

type EditDraft = {
  authorName: string;
  text: string;
  rating: number;
};

export default function StoredReviewList({
  initialReviews,
}: {
  initialReviews: ReviewRecord[];
}) {
  const router = useRouter();
  const [reviews, setReviews] = useState(initialReviews);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<EditDraft | null>(null);

  function startEditing(review: ReviewRecord) {
    setEditingId(review.id);
    setEditDraft({
      authorName: review.authorName,
      text: review.text,
      rating: review.rating,
    });
  }

  function cancelEditing() {
    setEditingId(null);
    setEditDraft(null);
  }

  async function patchReview(
    id: string,
    payload: Record<string, unknown>,
  ): Promise<ReviewRecord> {
    const response = await fetch(`/api/admin/reviews/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error ?? "Update failed.");
    }
    return data.review as ReviewRecord;
  }

  async function handlePublishedChange(id: string, published: boolean) {
    setUpdatingId(id);
    try {
      const review = await patchReview(id, { published });
      setReviews((prev) =>
        prev.map((item) => (item.id === id ? review : item)),
      );
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Update failed.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleSaveEdit(id: string) {
    if (!editDraft) {
      return;
    }

    setUpdatingId(id);
    try {
      const review = await patchReview(id, {
        authorName: editDraft.authorName,
        text: editDraft.text,
        rating: editDraft.rating,
      });
      setReviews((prev) =>
        prev.map((item) => (item.id === id ? review : item)),
      );
      cancelEditing();
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
      if (editingId === id) {
        cancelEditing();
      }
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
      {reviews.map((review) => {
        const isEditing = editingId === review.id;
        const isBusy = updatingId === review.id;

        return (
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
                    ჯავშანი № {review.bookingId}
                  </p>
                </div>

                {isEditing && editDraft ? (
                  <div className="space-y-4 rounded-xl border border-[#38ab8a]/25 bg-[#38ab8a]/5 p-4">
                    <label className="block">
                      <span className="mb-1.5 block text-[16px] font-medium text-black md:text-[18px]">
                        სახელი
                      </span>
                      <input
                        type="text"
                        maxLength={120}
                        value={editDraft.authorName}
                        disabled={isBusy}
                        onChange={(e) =>
                          setEditDraft((draft) =>
                            draft
                              ? { ...draft, authorName: e.target.value }
                              : draft,
                          )
                        }
                        className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[16px] outline-none ring-[#38ab8a] focus:ring-2 md:text-[18px]"
                      />
                    </label>

                    <div>
                      <span className="mb-1.5 block text-[16px] font-medium text-black md:text-[18px]">
                        შეფასება
                      </span>
                      <StarRating
                        mode="input"
                        value={editDraft.rating}
                        onChange={(rating) =>
                          setEditDraft((draft) =>
                            draft ? { ...draft, rating } : draft,
                          )
                        }
                      />
                    </div>

                    <label className="block">
                      <span className="mb-1.5 block text-[16px] font-medium text-black md:text-[18px]">
                        რევიუ
                      </span>
                      <textarea
                        rows={5}
                        maxLength={5000}
                        value={editDraft.text}
                        disabled={isBusy}
                        onChange={(e) =>
                          setEditDraft((draft) =>
                            draft ? { ...draft, text: e.target.value } : draft,
                          )
                        }
                        className="w-full resize-y rounded-xl border border-black/15 bg-white px-4 py-3 text-[16px] outline-none ring-[#38ab8a] focus:ring-2 md:text-[18px]"
                      />
                    </label>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleSaveEdit(review.id)}
                        className="rounded-xl bg-[#38ab8a] px-4 py-2.5 text-[16px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60 md:text-[18px]"
                      >
                        {isBusy ? "ინახება..." : "შენახვა"}
                      </button>
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={cancelEditing}
                        className="rounded-xl border border-black/15 bg-white px-4 py-2.5 text-[16px] font-medium text-black transition-colors hover:bg-black/[0.03] disabled:opacity-60 md:text-[18px]"
                      >
                        გაუქმება
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="text-[16px] font-medium text-black md:text-[18px]">
                        {review.authorName}
                      </p>
                      <div className="mt-2">
                        <StarRating value={review.rating} size="sm" showValue />
                      </div>
                    </div>

                    <p className="whitespace-pre-wrap rounded-xl border border-black/8 bg-black/[0.02] px-4 py-3 text-[16px] leading-relaxed text-black md:text-[18px]">
                      {review.text}
                    </p>
                  </>
                )}
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
                <label className="block">
                  <span className="mb-1.5 block text-[16px] font-medium text-black md:text-[18px]">
                    სტატუსი
                  </span>
                  <select
                    value={review.published ? "published" : "hidden"}
                    disabled={isBusy || isEditing}
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

                {!isEditing ? (
                  <button
                    type="button"
                    disabled={isBusy || editingId !== null}
                    onClick={() => startEditing(review)}
                    className="rounded-xl border border-[#0f4f4f]/20 bg-[#0f4f4f]/5 px-4 py-2.5 text-[16px] font-medium text-[#0f4f4f] transition-colors hover:bg-[#0f4f4f]/10 disabled:cursor-not-allowed disabled:opacity-60 md:text-[18px]"
                  >
                    რედაქტირება
                  </button>
                ) : null}

                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() => handleDelete(review.id)}
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[16px] font-medium text-red-800 transition-colors hover:bg-red-100 disabled:opacity-60 md:text-[18px]"
                >
                  წაშლა
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
