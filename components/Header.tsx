"use client";

import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { Link, usePathname } from "@/i18n/navigation";
import { business } from "@/lib/site";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import type { IconType } from "react-icons";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const navLinkClass =
  "text-black whitespace-nowrap font-figtree text-[15px] md:text-[18px] font-medium transition-opacity hover:opacity-70";

function SchoolExcursionsNavItem({
  label,
  onNavigate,
  variant = "desktop",
  expanded = false,
  onToggle,
}: {
  label: string;
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
  expanded?: boolean;
  onToggle?: () => void;
}) {
  const chevronClass =
    variant === "desktop"
      ? "h-4 w-4 transition-transform group-hover/exc:rotate-180"
      : `h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`;

  const chevron = (
    <svg
      viewBox="0 0 20 20"
      className={chevronClass}
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );

  const hoverLink = (
    <Link
      href="/excursions"
      onClick={onNavigate}
      className={
        variant === "desktop"
          ? "block w-full rounded-xl border border-black/10 bg-white px-8 py-4 shadow-[0_8px_32px_rgba(15,79,79,0.12)] transition-opacity hover:opacity-90"
          : "inline-flex w-full flex-col rounded-lg px-4 py-2.5 transition-colors hover:bg-brand/5"
      }
    >
      <span className="flex w-full items-center justify-start gap-x-1.5 whitespace-nowrap font-figtree text-[15px] font-medium leading-tight md:text-[18px]">
        <span className="text-[#FFB800]">გაიცანი</span>
        <span className="text-[#FF5C33]">შენი</span>
        <span className="text-[#299784]">საქართველო</span>
      </span>
    </Link>
  );

  if (variant === "mobile") {
    return (
      <div>
        <div className="flex items-center rounded-lg transition-colors hover:bg-brand/5">
          <span className="flex-1 rounded-lg px-3 py-3 text-[15px] font-medium text-black">
            {label}
          </span>
          <button
            type="button"
            onClick={onToggle}
            className="rounded-lg px-3 py-3"
            aria-expanded={expanded}
            aria-label={label}
          >
            {chevron}
          </button>
        </div>
        {expanded ? (
          <div className="ml-3 border-l border-black/10 pl-3">{hoverLink}</div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="group/exc relative flex items-center gap-0.5">
      <span className={`${navLinkClass} cursor-default`}>{label}</span>
      <button
        type="button"
        className="flex items-center rounded p-0.5 transition-opacity hover:opacity-70"
        aria-haspopup="true"
        aria-expanded={false}
        aria-label={label}
      >
        {chevron}
      </button>
      <div className="invisible absolute top-full left-0 z-50 pt-2 opacity-0 transition-all group-hover/exc:visible group-hover/exc:opacity-100 group-focus-within/exc:visible group-focus-within/exc:opacity-100">
        {hoverLink}
      </div>
    </div>
  );
}

const tourDestinations = [
  { key: "batumi", href: "/tours/batumi" },
  { key: "tbilisi", href: "/tours/tbilisi" },
  { key: "kutaisi", href: "/tours/kutaisi" },
] as const;

const dropdownItemClass =
  "block rounded-lg px-4 py-2.5 text-[15px] font-medium text-black transition-colors hover:bg-brand/5 md:text-[16px]";

const socialLinks: {
  name: string;
  href: string;
  Icon: IconType;
  colorClass: string;
}[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61583758856391",
    Icon: FaFacebook,
    colorClass: "text-[#1877F2]",
  },
  {
    name: "Instagram",
    href: business.instagram,
    Icon: FaInstagram,
    colorClass: "text-[#E4405F]",
  },
  {
    name: "Whatsapp",
    href: "https://wa.me/995555338807",
    Icon: FaWhatsapp,
    colorClass: "text-[#25D366]",
  },
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

const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

function subscribeToDesktopMediaQuery(onChange: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getDesktopMediaQuerySnapshot() {
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}

function getDesktopMediaQueryServerSnapshot() {
  return true;
}

export default function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopMediaQuery,
    getDesktopMediaQuerySnapshot,
    getDesktopMediaQueryServerSnapshot,
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileToursOpen, setMobileToursOpen] = useState(false);
  const [mobileExcursionsOpen, setMobileExcursionsOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setMobileToursOpen(false);
    setMobileExcursionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isDesktop) {
      setMobileOpen(false);
      setMobileToursOpen(false);
      setMobileExcursionsOpen(false);
    }
  }, [isDesktop]);

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
    <header className="fixed top-0 right-0 left-0 z-50 w-full px-3 pt-4 sm:px-4 sm:pt-5 lg:px-5 lg:pt-6">
      <div className="mx-auto w-full overflow-visible rounded-[2.5rem] bg-white/80 shadow-[0_8px_32px_rgba(15,79,79,0.12)] backdrop-blur-sm">
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
            className={`${isDesktop ? "flex" : "hidden"} shrink-0 items-center gap-4 lg:gap-5 xl:gap-6`}
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
              <div className="invisible absolute top-full left-0 z-50 min-w-[11rem] pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
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

            <Link href="/gallery" className={navLinkClass}>
              {t("nav.gallery")}
            </Link>
            <SchoolExcursionsNavItem label={t("nav.schoolExcursions")} />
            <Link href="/#contact" className={navLinkClass}>
              {t("nav.contact")}
            </Link>
          </nav>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className={`${isDesktop ? "flex" : "hidden"} flex-col items-end gap-1`}>
              <div className="flex items-center gap-0.5">
                {socialLinks.map(({ name, href, Icon, colorClass }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                  >
                    <Icon className={`h-8 w-8 ${colorClass}`} aria-hidden />
                  </a>
                ))}
              </div>
              <a
                href={`tel:${business.phone}`}
                className="whitespace-nowrap font-figtree text-[14px] font-medium text-brand transition-opacity hover:opacity-80 md:text-[15px]"
              >
                {business.phoneDisplay}
              </a>
            </div>

            {isDesktop ? (
              <div>
                <LocaleSwitcher variant="header" />
              </div>
            ) : null}

            {!isDesktop ? (
            <IconButton
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
            ) : null}
          </div>
        </div>
      </div>

      {!isDesktop && mobileOpen
        ? createPortal(
            <>
              <button
                type="button"
                aria-label={t("closeMenu")}
                className="fixed inset-0 z-[60] bg-brand/20 transition-opacity duration-300"
                onClick={() => setMobileOpen(false)}
              />

              <aside
                id="mobile-menu"
                className="fixed top-0 right-0 z-[70] flex h-svh w-full max-w-sm translate-x-0 flex-col bg-white shadow-[-8px_0_32px_rgba(15,79,79,0.15)] transition-transform duration-300 ease-out"
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
                            className="rounded-lg px-3 py-2.5 text-[16px] font-medium text-black transition-colors hover:bg-brand/5 md:text-[18px]"
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

                  <Link
                    href="/gallery"
                    onClick={() => setMobileOpen(false)}
                    className=" rounded-lg px-3 py-3 text-[15px] font-medium text-black transition-colors hover:bg-brand/5"
                  >
                    {t("nav.gallery")}
                  </Link>
                  <SchoolExcursionsNavItem
                    label={t("nav.schoolExcursions")}
                    variant="mobile"
                    expanded={mobileExcursionsOpen}
                    onToggle={() => setMobileExcursionsOpen((open) => !open)}
                    onNavigate={() => {
                      setMobileOpen(false);
                      setMobileExcursionsOpen(false);
                    }}
                  />
                  <Link
                    href="/#contact"
                    onClick={() => setMobileOpen(false)}
                    className=" rounded-lg px-3 py-3 text-[15px] font-medium text-black transition-colors hover:bg-brand/5"
                  >
                    {t("nav.contact")}
                  </Link>
                </nav>

                <div className="border-t border-black px-5 py-5">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex gap-1">
                        {socialLinks.map(({ name, href, Icon, colorClass }) => (
                          <a
                            key={name}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={name}
                            className="flex h-12 w-12 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                          >
                            <Icon className={`h-7 w-7 ${colorClass}`} aria-hidden />
                          </a>
                        ))}
                      </div>
                      <LocaleSwitcher variant="header" />
                    </div>
                    <a
                      href={`tel:${business.phone}`}
                      className="font-medium text-brand hover:underline"
                    >
                      {business.phoneDisplay}
                    </a>
                  </div>
                </div>
              </aside>
            </>,
            document.body,
          )
        : null}
    </header>
  );
}
