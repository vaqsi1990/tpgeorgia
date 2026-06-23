"use client";

import {
  localeCountries,
  localeLabels,
  routing,
  type AppLocale,
} from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";

type LocaleSwitcherProps = {
  variant?: "default" | "header" | "mobile";
};

const flagStyle = { width: "1.25rem", height: "1.25rem", borderRadius: "2px" };

export function LocaleSwitcher({ variant = "default" }: LocaleSwitcherProps) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const listboxId = useId();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectLocale = (loc: AppLocale) => {
    setOpen(false);
    if (loc !== locale) router.replace(pathname, { locale: loc });
  };

  useEffect(() => {
    if (!open || variant === "mobile") return;

    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, variant]);

  if (variant === "mobile") {
    return (
      <div className="w-full">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/50">
          {t("label")}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {routing.locales.map((loc) => {
            const active = locale === loc;

            return (
              <button
                key={loc}
                type="button"
                aria-label={localeLabels[loc]}
                aria-pressed={active}
                onClick={() => selectLocale(loc)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                  active
                    ? "border-brand/30 bg-brand/10 text-black"
                    : "border-black/10 bg-white text-black hover:bg-brand/5"
                }`}
              >
                <ReactCountryFlag
                  countryCode={localeCountries[loc]}
                  svg
                  style={flagStyle}
                  aria-hidden
                />
                <span className="text-sm font-medium leading-none">
                  {localeLabels[loc]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const triggerClass =
    variant === "header"
      ? "flex h-9 min-w-9 items-center justify-center gap-1 rounded-full border border-black bg-transparent px-2 transition-colors hover:bg-brand/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand/50"
      : "flex h-9 items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 transition-colors hover:border-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500";

  const panelClass =
    variant === "header"
      ? "absolute right-0 z-[80] mt-1 min-w-[11rem] overflow-hidden rounded-xl border border-brand/15 bg-white py-1 shadow-[0_8px_32px_rgba(15,79,79,0.15)]"
      : "absolute right-0 z-[80] mt-1 min-w-[11rem] overflow-hidden rounded-md border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900";

  const optionClass =
    variant === "header"
      ? "flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-brand/5"
      : "flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800";

  const activeOptionClass =
    variant === "header" ? "bg-brand/10" : "bg-zinc-100 dark:bg-zinc-800";

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={t("label")}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((v) => !v)}
        className={triggerClass}
      >
        <ReactCountryFlag
          countryCode={localeCountries[locale]}
          svg
          style={flagStyle}
          aria-hidden
        />
        <svg
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={t("label")}
          className={panelClass}
        >
          {routing.locales.map((loc) => (
            <li key={loc} role="option" aria-selected={locale === loc}>
              <button
                type="button"
                aria-label={localeLabels[loc]}
                onClick={() => selectLocale(loc)}
                className={`${optionClass} ${locale === loc ? activeOptionClass : ""}`}
              >
                <ReactCountryFlag
                  countryCode={localeCountries[loc]}
                  svg
                  style={flagStyle}
                  aria-hidden
                />
                <span className="text-sm font-medium">{localeLabels[loc]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
