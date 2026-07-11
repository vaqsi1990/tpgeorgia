"use client";

import type { TourBookingOption } from "@/data/tour-content";
import type { AppLocale } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState, type FormEvent } from "react";

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-black outline-none transition-[box-shadow,border-color] placeholder:text-black/40 focus:border-[#38ab8a] focus:shadow-[0_0_0_3px_rgba(56,171,138,0.12)]";

const optionCardClass =
  "flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3.5 transition-colors";

type SubmitState = "idle" | "submitting" | "success" | "error";

type BookingFormProps = {
  bookingType: "tour" | "excursion";
  itemId: string;
  itemTitle: string;
  bookingOptions?: TourBookingOption[];
  onBack?: () => void;
  onSuccess?: () => void;
};

function buildOptionsMessage(
  bookingOptions: TourBookingOption[],
  selectedRouteId: string,
  selectedAddonIds: string[],
  labels: {
    routeHeading: string;
    addonsHeading: string;
  },
): string {
  const selectedRoute = bookingOptions.find(
    (option) => option.id === selectedRouteId,
  );
  const selectedAddons = bookingOptions.filter(
    (option) =>
      option.kind === "addon" && selectedAddonIds.includes(option.id),
  );

  const lines = [`${labels.routeHeading}: ${selectedRoute?.label ?? ""}`];

  if (selectedAddons.length > 0) {
    lines.push(
      `${labels.addonsHeading}: ${selectedAddons.map((option) => option.label).join(", ")}`,
    );
  }

  return lines.join("\n");
}

export default function BookingForm({
  bookingType,
  itemId,
  itemTitle,
  bookingOptions,
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
  const [selectedRouteId, setSelectedRouteId] = useState("");
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const routeOptions = useMemo(
    () => bookingOptions?.filter((option) => option.kind === "route") ?? [],
    [bookingOptions],
  );
  const addonOptions = useMemo(
    () => bookingOptions?.filter((option) => option.kind === "addon") ?? [],
    [bookingOptions],
  );
  const hasBookingOptions = routeOptions.length > 0;

  const isSubmitting = submitState === "submitting";

  function toggleAddon(optionId: string) {
    setSelectedAddonIds((current) =>
      current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId],
    );
    setSubmitState("idle");
  }

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
      (hasBookingOptions && !selectedRouteId) ||
      (parsedPeople !== undefined &&
        (!Number.isInteger(parsedPeople) || parsedPeople < 1))
    ) {
      if (hasBookingOptions && !selectedRouteId) {
        setSubmitState("error");
      }
      return;
    }

    setSubmitState("submitting");

    const optionsPrefix =
      hasBookingOptions && bookingOptions
        ? buildOptionsMessage(
            bookingOptions,
            selectedRouteId,
            selectedAddonIds,
            {
              routeHeading: t("selectedRouteLabel"),
              addonsHeading: t("selectedAddonsLabel"),
            },
          )
        : "";
    const fullMessage = optionsPrefix
      ? `${optionsPrefix}\n\n${trimmedMessage}`
      : trimmedMessage;

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
          message: fullMessage,
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
        <div className="rounded-2xl border border-[#991B1B] bg-[#DC2626] px-5 py-6 text-center">
          <p className="font-afacad text-xl font-semibold text-white">
            {t("successTitle")}
          </p>
          <p className="mt-2 text-[16px] leading-relaxed text-white md:text-[18px]">
            {t("successMessage")}
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-xl border border-black/15 py-3 text-[16px] font-medium text-black transition-colors hover:bg-black/[0.03] md:text-[18px]"
        >
          {t("backToDetails")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-2xl border border-[#991B1B] bg-[#DC2626] px-4 py-3">
        <p className="text-[16px] font-semibold uppercase tracking-wide text-[#0f4f4f]/70">
          {bookingType === "tour" ? t("selectedTour") : t("selectedExcursion")}
        </p>
        <p className="mt-1 text-[16px] font-semibold text-black md:text-[18px]">
          {itemTitle}
        </p>
      </div>

      {hasBookingOptions ? (
        <div className="space-y-5">
          <fieldset className="space-y-3">
            <legend className="mb-1 block text-[16px] font-medium md:text-[18px]">
              {t("routeSelectionLabel")}
            </legend>
            {routeOptions.map((option) => {
              const isSelected = selectedRouteId === option.id;

              return (
                <label
                  key={option.id}
                  className={`${optionCardClass} ${
                    isSelected
                      ? "border-[#38ab8a] bg-[#38ab8a]/[0.08]"
                      : "border-black/10 bg-[#fafcfb] hover:border-[#38ab8a]/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="booking-route"
                    value={option.id}
                    checked={isSelected}
                    disabled={isSubmitting}
                    onChange={() => {
                      setSelectedRouteId(option.id);
                      setSubmitState("idle");
                    }}
                    className="mt-1 size-4 shrink-0 accent-[#DC2626]"
                  />
                  <span className="min-w-0">
                    <span className="block text-[16px] font-semibold text-[#0f4f4f] md:text-[17px]">
                      {option.label}
                    </span>
                    {option.description ? (
                      <span className="mt-1 block whitespace-pre-line text-[15px] leading-relaxed text-black/75 md:text-[16px]">
                        {option.description}
                      </span>
                    ) : null}
                  </span>
                </label>
              );
            })}
          </fieldset>

          {addonOptions.length > 0 ? (
            <fieldset className="space-y-3">
              <legend className="mb-1 block text-[16px] font-medium md:text-[18px]">
                {t("addonsLabel")}
              </legend>
              {addonOptions.map((option) => {
                const isSelected = selectedAddonIds.includes(option.id);

                return (
                  <label
                    key={option.id}
                    className={`${optionCardClass} ${
                      isSelected
                        ? "border-[#38ab8a] bg-[#38ab8a]/[0.08]"
                        : "border-black/10 bg-[#fafcfb] hover:border-[#38ab8a]/30"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="booking-addon"
                      value={option.id}
                      checked={isSelected}
                      disabled={isSubmitting}
                      onChange={() => toggleAddon(option.id)}
                      className="mt-1 size-4 shrink-0 accent-[#DC2626]"
                    />
                    <span className="min-w-0">
                      <span className="block text-[16px] font-semibold text-[#0f4f4f] md:text-[17px]">
                        {option.label}
                      </span>
                      {option.description ? (
                        <span className="mt-1 block whitespace-pre-line text-[15px] leading-relaxed text-black/75 md:text-[16px]">
                          {option.description}
                        </span>
                      ) : null}
                    </span>
                  </label>
                );
              })}
            </fieldset>
          ) : null}

          {submitState === "error" && !selectedRouteId ? (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[16px] text-red-800 md:text-[18px]"
            >
              {t("routeSelectionRequired")}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="booking-name"
            className="mb-1.5 block text-[16px] font-medium md:text-[18px]"
          >
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
          <label
            htmlFor="booking-email"
            className="mb-1.5 block text-[16px] font-medium md:text-[18px]"
          >
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
          <label
            htmlFor="booking-phone"
            className="mb-1.5 block text-[16px] font-medium md:text-[18px]"
          >
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
          <label
            htmlFor="booking-date"
            className="mb-1.5 block text-[16px] font-medium md:text-[18px]"
          >
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
          <label
            htmlFor="booking-people"
            className="mb-1.5 block text-[16px] font-medium md:text-[18px]"
          >
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
        <label
          htmlFor="booking-message"
          className="mb-1.5 block text-[16px] font-medium md:text-[18px]"
        >
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

      {submitState === "error" && (selectedRouteId || !hasBookingOptions) ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[16px] text-red-800 md:text-[18px]"
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
            className="flex-1 rounded-xl border border-black/15 py-3 text-[16px] font-medium text-black transition-colors hover:bg-black/[0.03] disabled:opacity-60 md:text-[18px]"
          >
            {t("backToDetails")}
          </button>
        ) : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`rounded-xl bg-[#DC2626] py-3 text-[16px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 md:text-[18px] ${onBack ? "flex-1" : "w-full"}`}
        >
          {isSubmitting ? t("submittingButton") : t("submitButton")}
        </button>
      </div>
    </form>
  );
}
