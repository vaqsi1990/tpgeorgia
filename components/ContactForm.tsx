"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState, type FormEvent } from "react";

const inputClass =
  "w-full rounded-xl border border-black/5 bg-white px-4 py-3 text-[16px] text-black shadow-[0_4px_20px_rgba(15,79,79,0.08)] outline-none transition-[box-shadow,border-color] placeholder:text-black/40 focus:border-[#38ab8a] focus:shadow-[0_4px_24px_rgba(56,171,138,0.14)]";

type InquiryType = "tour" | "excursion" | "";

type SubmitState = "idle" | "submitting" | "success" | "error";

export type ContactCatalogOption = {
  id: string;
  title: string;
};

type ContactFormProps = {
  tours: ContactCatalogOption[];
  excursions: ContactCatalogOption[];
};

export default function ContactForm({ tours, excursions }: ContactFormProps) {
  const t = useTranslations("Contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState<InquiryType>("");
  const [selectedItemId, setSelectedItemId] = useState("");
  const [message, setMessage] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const catalogItems = useMemo(() => {
    if (inquiryType === "tour") return tours;
    if (inquiryType === "excursion") return excursions;
    return [];
  }, [excursions, inquiryType, tours]);

  const selectedItem = catalogItems.find((item) => item.id === selectedItemId);

  const handleInquiryTypeChange = (value: InquiryType) => {
    setInquiryType(value);
    setSelectedItemId("");
    setSubmitState("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (
      !trimmedName ||
      !trimmedEmail ||
      !trimmedMessage ||
      !inquiryType ||
      !selectedItem
    ) {
      return;
    }

    const typeLabel =
      inquiryType === "tour" ? t("topicTypeTour") : t("topicTypeExcursion");

    const subject =
      inquiryType === "tour"
        ? t("subjectTour", { title: selectedItem.title })
        : t("subjectExcursion", { title: selectedItem.title });

    const topicLine = t("bodyTopicLine", {
      type: typeLabel,
      title: selectedItem.title,
    });

    setSubmitState("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          inquiryType,
          itemId: selectedItem.id,
          itemTitle: selectedItem.title,
          subject,
          topicLine,
          message: trimmedMessage,
        }),
      });

      if (!response.ok) {
        setSubmitState("error");
        return;
      }

      setName("");
      setEmail("");
      setInquiryType("");
      setSelectedItemId("");
      setMessage("");
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  const itemLabel =
    inquiryType === "tour"
      ? t("itemTourLabel")
      : inquiryType === "excursion"
        ? t("itemExcursionLabel")
        : t("itemLabel");

  const isSubmitting = submitState === "submitting";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-[16px] font-medium text-black"
          >
            {t("nameLabel")}
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
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
            htmlFor="contact-email"
            className="mb-1.5 block text-[16px] font-medium text-black"
          >
            {t("emailLabel")}
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
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
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-topic-type"
            className="mb-1.5 block text-[16px] font-medium text-black"
          >
            {t("topicTypeLabel")}
          </label>
          <select
            id="contact-topic-type"
            name="topicType"
            required
            disabled={isSubmitting}
            value={inquiryType}
            onChange={(e) => handleInquiryTypeChange(e.target.value as InquiryType)}
            className={inputClass}
          >
            <option value="">{t("topicTypePlaceholder")}</option>
            <option value="tour">{t("topicTypeTour")}</option>
            <option value="excursion">{t("topicTypeExcursion")}</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="contact-topic-item"
            className="mb-1.5 block text-[16px] font-medium text-black"
          >
            {itemLabel}
          </label>
          <select
            id="contact-topic-item"
            name="topicItem"
            required
            disabled={!inquiryType || isSubmitting}
            value={selectedItemId}
            onChange={(e) => {
              setSelectedItemId(e.target.value);
              setSubmitState("idle");
            }}
            className={`${inputClass} disabled:cursor-not-allowed disabled:border-black/5 disabled:bg-white disabled:text-black/40 disabled:shadow-[0_2px_12px_rgba(15,79,79,0.04)]`}
          >
            <option value="">{t("itemPlaceholder")}</option>
            {catalogItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-[16px] font-medium text-black"
        >
          {t("messageLabel")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          disabled={isSubmitting}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setSubmitState("idle");
          }}
          placeholder={t("messagePlaceholder")}
          className={`${inputClass} min-h-[140px] resize-y`}
        />
      </div>

      {submitState === "success" ? (
        <p
          role="status"
          className="rounded-xl border border-[#38ab8a]/20 bg-[#38ab8a]/10 px-4 py-3 text-[15px] text-black"
        >
          {t("submitSuccess")}
        </p>
      ) : null}

      {submitState === "error" ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[15px] text-red-800"
        >
          {t("submitError")}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-xl bg-[#38ab8a] px-6 py-3 text-[16px] font-medium text-white shadow-[0_4px_16px_rgba(56,171,138,0.25)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 md:text-[18px]"
      >
        {isSubmitting ? t("submittingButton") : t("submitButton")}
      </button>
    </form>
  );
}
