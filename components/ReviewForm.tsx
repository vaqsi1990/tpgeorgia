"use client";

import StarRating from "@/components/StarRating";
import type { AppLocale } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useState } from "react";

type ReviewFormProps = {
  bookingId: string;
  token: string;
  defaultName: string;
  itemTitle: string;
  locale: AppLocale;
};

export default function ReviewForm({
  bookingId,
  token,
  defaultName,
  itemTitle,
  locale,
}: ReviewFormProps) {
  const t = useTranslations("Reviews");
  const [name, setName] = useState(defaultName);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId,
          token,
          authorName: name,
          text,
          rating,
          locale,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? t("submitError"));
      }

      setSuccess(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : t("submitError"),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-[#991B1B] bg-[#DC2626] px-6 py-8 text-center">
        <p className="font-afacad text-2xl font-semibold text-white">
          {t("submitSuccessTitle")}
        </p>
        <p className="mt-2 text-[16px] text-white/75 md:text-[18px]">
          {t("submitSuccessMessage")}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#991B1B] bg-[#DC2626] p-6 shadow-[0_8px_32px_rgba(15,79,79,0.08)] sm:p-8"
    >
      <p className="mb-6 text-[16px] text-white md:text-[18px]">
        {t("formIntro", { program: itemTitle })}
      </p>

      <div className="mb-5">
        <label
          htmlFor="review-name"
          className="mb-1.5 block text-[16px] font-medium md:text-[18px]"
        >
          {t("nameLabel")}
        </label>
        <input
          id="review-name"
          type="text"
          required
          maxLength={120}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[16px] outline-none ring-[#38ab8a] focus:ring-2 md:text-[18px]"
        />
      </div>

      <div className="mb-5">
        <p id="review-rating-label" className="mb-1.5 text-[16px] font-medium md:text-[18px]">
          {t("ratingLabel")}
        </p>
        <StarRating mode="input" value={rating} onChange={setRating} />
      </div>

      <div className="mb-6">
        <label
          htmlFor="review-text"
          className="mb-1.5 block text-[16px] font-medium md:text-[18px]"
        >
          {t("textLabel")}
        </label>
        <textarea
          id="review-text"
          required
          rows={6}
          maxLength={5000}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("textPlaceholder")}
          className="w-full resize-y rounded-xl border border-black/15 bg-white px-4 py-3 text-[16px] outline-none ring-[#38ab8a] focus:ring-2 md:text-[18px]"
        />
      </div>

      {error ? (
        <p
          role="alert"
          className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[15px] text-red-800"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-xl bg-[#DC2626] px-6 py-3 text-[16px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 md:text-[18px]"
      >
        {isSubmitting ? t("submittingButton") : t("submitButton")}
      </button>
    </form>
  );
}
