"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";

const STAR_PATH =
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

type StarRatingSize = "sm" | "md";

type StarRatingDisplayProps = {
  mode?: "display";
  value: number;
  size?: StarRatingSize;
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
};

type StarRatingInputProps = {
  mode: "input";
  value: number;
  onChange: (value: number) => void;
  size?: StarRatingSize;
  className?: string;
};

type StarRatingProps = StarRatingDisplayProps | StarRatingInputProps;

function sizeClasses(size: StarRatingSize): string {
  return size === "sm" ? "size-5" : "size-7";
}

function StarIcon({
  filled,
  partial,
  className,
}: {
  filled: boolean;
  partial?: number;
  className: string;
}) {
  if (partial !== undefined && partial > 0 && partial < 1) {
    return (
      <span className={`relative inline-block ${className}`} aria-hidden>
        <svg viewBox="0 0 24 24" className="size-full text-black/15">
          <path fill="currentColor" d={STAR_PATH} />
        </svg>
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${partial * 100}%` }}
        >
          <svg viewBox="0 0 24 24" className="size-full text-amber-400">
            <path fill="currentColor" d={STAR_PATH} />
          </svg>
        </span>
      </span>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} ${filled ? "text-amber-400" : "text-black/15"}`}
      aria-hidden
    >
      <path fill="currentColor" d={STAR_PATH} />
    </svg>
  );
}

export default function StarRating(props: StarRatingProps) {
  const t = useTranslations("Reviews");
  const labelId = useId();
  const size = props.size ?? "md";
  const starClass = sizeClasses(size);

  if (props.mode === "input") {
    const { value, onChange } = props;
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const activeValue = hoverValue ?? value;

    return (
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        className={`flex items-center gap-1 ${props.className ?? ""}`}
        onMouseLeave={() => setHoverValue(null)}
      >
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          const filled = starValue <= activeValue;

          return (
            <button
              key={starValue}
              type="button"
              role="radio"
              aria-checked={value === starValue}
              aria-label={t("starLabel", { count: starValue })}
              className="rounded p-0.5 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38ab8a]"
              onMouseEnter={() => setHoverValue(starValue)}
              onFocus={() => setHoverValue(starValue)}
              onBlur={() => setHoverValue(null)}
              onClick={() => onChange(starValue)}
            >
              <StarIcon filled={filled} className={starClass} />
            </button>
          );
        })}
      </div>
    );
  }

  const { value, showValue = false, reviewCount, className } = props;
  const rounded = Math.round(value * 2) / 2;

  return (
    <div
      className={`flex items-center gap-1.5 ${className ?? ""}`}
      aria-label={t("ratingSummary", {
        rating: value.toFixed(1),
        count: reviewCount ?? 0,
      })}
    >
      <div className="flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: 5 }, (_, index) => {
          const starIndex = index + 1;
          const filled = rounded >= starIndex;
          const partial =
            !filled && rounded > index && rounded < starIndex
              ? rounded - index
              : undefined;

          return (
            <StarIcon
              key={starIndex}
              filled={filled}
              partial={partial}
              className={starClass}
            />
          );
        })}
      </div>
      {showValue ? (
        <span className="text-[16px] font-medium text-black/80 md:text-[16px]">
          {value.toFixed(1)}
          {reviewCount !== undefined && reviewCount > 0 ? (
            <span className="font-normal text-black">
              {" "}
              ({t("reviewCount", { count: reviewCount })})
            </span>
          ) : null}
        </span>
      ) : null}
    </div>
  );
}
