"use client";

import { buildGmailComposeUrl } from "@/lib/gmail";
import { business } from "@/lib/site";
import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#38ab8a]";

export default function ContactForm() {
  const t = useTranslations("Contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim() || t("defaultSubject");
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return;
    }

    const body = [
      trimmedMessage,
      "",
      "—",
      t("bodyFooter", { name: trimmedName, email: trimmedEmail }),
    ].join("\n");

    const gmailUrl = buildGmailComposeUrl({
      to: business.email,
      subject: trimmedSubject,
      body,
    });

    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("emailPlaceholder")}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="mb-1.5 block text-[16px] font-medium text-black"
        >
          {t("subjectLabel")}
        </label>
        <input
          id="contact-subject"
          type="text"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={t("subjectPlaceholder")}
          className={inputClass}
        />
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("messagePlaceholder")}
          className={`${inputClass} min-h-[140px] resize-y`}
        />
      </div>

      <p className="text-[13px] leading-relaxed text-black/55">{t("formNote")}</p>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-xl bg-[#38ab8a] px-6 py-3 text-[15px] font-medium text-white shadow-[0_4px_16px_rgba(56,171,138,0.25)] transition-opacity hover:opacity-90"
      >
        {t("submitButton")}
      </button>
    </form>
  );
}
