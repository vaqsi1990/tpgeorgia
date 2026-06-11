"use client";

import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";

import type { IconType } from "react-icons";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";

const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "gallery", href: "/gallery" },
  { key: "schoolExcursions", href: "/excursions" },

  { key: "contact", href: "/#contact" },
] as const;

const tourDestinations = [
  { key: "batumi", href: "/tours/batumi" },
  { key: "tbilisi", href: "/tours/tbilisi" },
  { key: "kutaisi", href: "/tours/kutaisi" },
] as const;

const navLinkClass =
  "text-black whitespace-nowrap font-figtree text-[15px] md:text-[18px] font-medium transition-opacity hover:opacity-70";

const dropdownItemClass =
  "block rounded-lg px-4 py-2.5 text-[15px] font-medium text-black transition-colors hover:bg-brand/5 md:text-[16px]";

const socialLinks: {
  name: string;
  href: string;
  Icon: IconType;
}[] = [
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61583758856391", Icon: FaFacebook },
  { name: "Whatsapp", href: "https://wa.me/995555338807", Icon: FaWhatsapp },
];

function IconButton({
  label,
  children,
  onClick,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={` flex h-9 w-12 text-black items-center justify-center rounded-full transition-colors hover:bg-brand/10 ${className}`}
    >
      {children}
    </button>
  );
}

export default function Header() {
  const t = useTranslations("Header");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileToursOpen, setMobileToursOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 w-full px-4 pt-4 sm:px-6 sm:pt-5 lg:px-10 lg:pt-6">
      <div className="mx-auto w-full max-w-7xl overflow-visible rounded-[2.5rem] bg-white/95 shadow-[0_8px_32px_rgba(15,79,79,0.12)] backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-8 sm:py-4 lg:px-10">
         

       
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt={t("logoAlt")}
              width={220}
              height={76}
              className="h-14 w-auto object-contain sm:h-16 lg:h-[72px]"
              priority
            />
          </Link>
          <nav
            className="hidden shrink-0 items-center gap-4 lg:flex lg:gap-5 xl:gap-6"
            aria-label={t("mainNav")}
          >
            <Link href="/" className={navLinkClass}>
              {t("nav.home")}
            </Link>
            <Link href="/about" className={navLinkClass}>
              {t("nav.about")}
            </Link>

            <div className="group relative flex items-center gap-0.5">
              <Link href="/tours" className={navLinkClass}>
                {t("nav.tours")}
              </Link>
              <button
                type="button"
                className="flex items-center rounded p-0.5 transition-opacity hover:opacity-70"
                aria-haspopup="true"
                aria-expanded={false}
                aria-label={t("nav.tours")}
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4 transition-transform group-hover:rotate-180"
                  fill="currentColor"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="invisible absolute top-full left-1/2 z-50 min-w-[11rem] -translate-x-1/2 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="overflow-hidden rounded-xl border border-black/10 bg-white py-1 shadow-[0_8px_32px_rgba(15,79,79,0.12)]">
                  {tourDestinations.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={dropdownItemClass}
                    >
                      {t(
                        `nav.toursDropdown.${item.key}` as
                          | "nav.toursDropdown.batumi"
                          | "nav.toursDropdown.tbilisi"
                          | "nav.toursDropdown.kutaisi",
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navItems.slice(2).map((item) => (
              <Link key={item.key} href={item.href} className={navLinkClass}>
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden items-center gap-0.5 lg:flex">
              {socialLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className=" flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-brand/10"
                >
                  <Icon className="h-8 w-8" aria-hidden />
                </a>
              ))}
            </div>

            <div className="hidden lg:block">
              <LocaleSwitcher variant="header" />
            </div>

            <IconButton
              className="lg:hidden"
              label={mobileOpen ? t("closeMenu") : t("openMenu")}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <svg
                viewBox="0 0 24 24"
                className=" h-[22px] w-[22px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                {mobileOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M4 7h16" strokeLinecap="round" />
                    <path d="M4 12h16" strokeLinecap="round" />
                    <path d="M4 17h16" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </IconButton>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label={t("closeMenu")}
        className={`fixed inset-0 z-[60] bg-brand/20 transition-opacity duration-300 lg:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
        tabIndex={mobileOpen ? 0 : -1}
      />

      <aside
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        className={`fixed top-0 right-0 z-[70] flex h-full w-full max-w-sm flex-col bg-white shadow-[-8px_0_32px_rgba(15,79,79,0.15)] transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end border-b border-brand/10 px-5 py-4">
          <IconButton
            label={t("closeMenu")}
            onClick={() => setMobileOpen(false)}
          >
            <svg
              viewBox="0 0 24 24"
              className=" h-[22px] w-[22px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </IconButton>
        </div>

        <nav
          className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-4"
          aria-label={t("mainNav")}
        >
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className=" rounded-lg px-3 py-3 text-[15px] font-medium text-black transition-colors hover:bg-brand/5"
          >
            {t("nav.home")}
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className=" rounded-lg px-3 py-3 text-[15px] font-medium text-black transition-colors hover:bg-brand/5"
          >
            {t("nav.about")}
          </Link>

          <div>
            <div className="flex items-center rounded-lg transition-colors hover:bg-brand/5">
              <Link
                href="/tours"
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-lg px-3 py-3 text-[15px] font-medium text-black"
              >
                {t("nav.tours")}
              </Link>
              <button
                type="button"
                onClick={() => setMobileToursOpen((open) => !open)}
                className="rounded-lg px-3 py-3"
                aria-expanded={mobileToursOpen}
                aria-label={t("nav.tours")}
              >
                <svg
                  viewBox="0 0 20 20"
                  className={`h-4 w-4 transition-transform ${mobileToursOpen ? "rotate-180" : ""}`}
                  fill="currentColor"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {mobileToursOpen ? (
              <div className="ml-3 flex flex-col gap-0.5 border-l border-black/10 pl-3">
                {tourDestinations.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileToursOpen(false);
                    }}
                    className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-black/80 transition-colors hover:bg-brand/5"
                  >
                    {t(
                      `nav.toursDropdown.${item.key}` as
                        | "nav.toursDropdown.batumi"
                        | "nav.toursDropdown.tbilisi"
                        | "nav.toursDropdown.kutaisi",
                    )}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {navItems.slice(2).map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className=" rounded-lg px-3 py-3 text-[15px] font-medium text-black transition-colors hover:bg-brand/5"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="border-t border-black px-5 py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-1">
              {socialLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className=" flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-black"
                >
                  <Icon className="h-7 w-7 text-black" aria-hidden />
                </a>
              ))}
            </div>
            <LocaleSwitcher variant="header" />
          </div>
        </div>
      </aside>
    </header>
  );
}
