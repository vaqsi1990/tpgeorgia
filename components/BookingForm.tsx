"use client";

import type { AppLocale } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-black outline-none transition-[box-shadow,border-color] placeholder:text-black/40 focus:border-[#38ab8a] focus:shadow-[0_0_0_3px_rgba(56,171,138,0.12)]";

type SubmitState = "idle" | "submitting" | "success" | "error";

type BookingFormProps = {
  bookingType: "tour" | "excursion";
  itemId: string;
  itemTitle: string;
  onBack?: () => void;
  onSuccess?: () => void;
};

export default function BookingForm({
  bookingType,
  itemId,
  itemTitle,
  onBack,
  onSuccess,
}: BookingFormProps) {
  const t = useTranslations("Booking");
  const locale = useLocale() as AppLocale;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [peopleCount, setPeopleCount] = useState("");
  const [message, setMessage] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const isSubmitting = submitState === "submitting";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedMessage = message.trim();
    const parsedPeople = peopleCount.trim()
      ? Number.parseInt(peopleCount, 10)
      : undefined;

    if (
      !trimmedName ||
      !trimmedEmail ||
      !trimmedPhone ||
      !trimmedMessage ||
      (parsedPeople !== undefined &&
        (!Number.isInteger(parsedPeople) || parsedPeople < 1))
    ) {
      return;
    }

    setSubmitState("submitting");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingType,
          itemId,
          itemTitle,
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          preferredDate: preferredDate || undefined,
          peopleCount: parsedPeople,
          message: trimmedMessage,
          locale,
        }),
      });

      if (!response.ok) {
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      onSuccess?.();
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <div className="space-y-5 py-4">
        <div className="rounded-2xl border border-[#38ab8a]/20 bg-[#38ab8a]/10 px-5 py-6 text-center">
          <p className="font-afacad text-xl font-semibold text-[#0f4f4f]">
            {t("successTitle")}
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-black/75">
            {t("successMessage")}
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-xl border border-black/15 py-3 text-[15px] font-medium text-black transition-colors hover:bg-black/[0.03]"
        >
          {t("backToDetails")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-2xl border border-[#38ab8a]/15 bg-[#38ab8a]/[0.06] px-4 py-3">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-[#0f4f4f]/70">
          {bookingType === "tour" ? t("selectedTour") : t("selectedExcursion")}
        </p>
        <p className="mt-1 text-[16px] font-semibold text-black">{itemTitle}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="booking-name" className="mb-1.5 block text-[15px] font-medium">
            {t("nameLabel")}
          </label>
          <input
            id="booking-name"
            type="text"
            required
            autoComplete="name"
            disabled={isSubmitting}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSubmitState("idle");
            }}
            placeholder={t("namePlaceholder")}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="booking-email" className="mb-1.5 block text-[15px] font-medium">
            {t("emailLabel")}
          </label>
          <input
            id="booking-email"
            type="email"
            required
            autoComplete="email"
            disabled={isSubmitting}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSubmitState("idle");
            }}
            placeholder={t("emailPlaceholder")}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="booking-phone" className="mb-1.5 block text-[15px] font-medium">
            {t("phoneLabel")}
          </label>
          <input
            id="booking-phone"
            type="tel"
            required
            autoComplete="tel"
            disabled={isSubmitting}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setSubmitState("idle");
            }}
            placeholder={t("phonePlaceholder")}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="booking-date" className="mb-1.5 block text-[15px] font-medium">
            {t("dateLabel")}
          </label>
          <input
            id="booking-date"
            type="date"
            disabled={isSubmitting}
            value={preferredDate}
            onChange={(e) => {
              setPreferredDate(e.target.value);
              setSubmitState("idle");
            }}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="booking-people" className="mb-1.5 block text-[15px] font-medium">
            {t("peopleLabel")}
          </label>
          <input
            id="booking-people"
            type="number"
            min={1}
            max={500}
            disabled={isSubmitting}
            value={peopleCount}
            onChange={(e) => {
              setPeopleCount(e.target.value);
              setSubmitState("idle");
            }}
            placeholder={t("peoplePlaceholder")}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="booking-message" className="mb-1.5 block text-[15px] font-medium">
          {t("messageLabel")}
        </label>
        <textarea
          id="booking-message"
          required
          rows={4}
          disabled={isSubmitting}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setSubmitState("idle");
          }}
          placeholder={t("messagePlaceholder")}
          className={`${inputClass} min-h-[110px] resize-y`}
        />
      </div>

      {submitState === "error" ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[15px] text-red-800"
        >
          {t("submitError")}
        </p>
      ) : null}

      <div
        className={`flex flex-col-reverse gap-3 pt-1 ${onBack ? "sm:flex-row" : ""}`}
      >
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="flex-1 rounded-xl border border-black/15 py-3 text-[15px] font-medium text-black transition-colors hover:bg-black/[0.03] disabled:opacity-60"
          >
            {t("backToDetails")}
          </button>
        ) : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`rounded-xl bg-[#38ab8a] py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 ${onBack ? "flex-1" : "w-full"}`}
        >
          {isSubmitting ? t("submittingButton") : t("submitButton")}
        </button>
      </div>
    </form>
  );
}
