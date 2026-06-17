"use client";

import StarRating from "@/components/StarRating";
import { Link } from "@/i18n/navigation";
import type { ReviewRecord } from "@/lib/review-types";
import { useTranslations } from "next-intl";

type ReviewCarouselCardProps = {
  review: ReviewRecord;
  variant?: "section" | "header";
};

function resolveProgramHref(review: ReviewRecord): string {
  if (review.itemType === "tour") {
    return `/tours/${review.itemId}`;
  }
  return `/excursions/${review.itemId}`;
}

export default function ReviewCarouselCard({
  review,
  variant = "section",
}: ReviewCarouselCardProps) {
  const t = useTranslations("Reviews");

  if (variant === "header") {
    return (
      <div className="flex min-w-0 items-center gap-3 px-1">
        <StarRating value={review.rating} size="sm" />
        <p className="min-w-0 truncate text-[13px] text-black/80 sm:text-[14px]">
          <span className="font-medium text-black">{review.authorName}</span>
          <span className="text-black/40"> — </span>
          <span className="italic">&ldquo;{review.text}&rdquo;</span>
        </p>
      </div>
    );
  }

  return (
    <article className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-5 shadow-[0_4px_24px_rgba(15,79,79,0.06)] sm:p-6">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-black text-[16px] md:text-[18px]">{review.authorName}</p>
          <p className="mt-0.5 truncate text-[16px] text-black md:text-[18px]">
            {review.itemTitle}
          </p>
        </div>
        <StarRating value={review.rating} size="sm" />
      </div>
      <blockquote className="line-clamp-5 flex-1 text-[16px] leading-relaxed text-black/85 md:text-[18px]">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <Link
        href={resolveProgramHref(review)}
        className="mt-4 inline-flex text-[16px] font-medium text-[#0f4f4f] transition-opacity hover:opacity-70 md:text-[18px]"
      >
        {t("viewProgram")} →
      </Link>
    </article>
  );
}
