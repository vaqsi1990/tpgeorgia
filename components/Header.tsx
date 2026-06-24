"use client";

import { LocaleSwitcher } from "@/components/LocaleSwitcher";

import { Link, usePathname } from "@/i18n/navigation";
import type { ReviewRecord } from "@/lib/review-types";
import { business } from "@/lib/site";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import type { IconType } from "react-icons";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const navLinkClass =
  "text-black whitespace-nowrap font-figtree text-[16px] md:text-[18px] font-semibold transition-opacity hover:opacity-70";

const dropdownTransition = {
  duration: 0.22,
  ease: [0.22, 1, 0.36, 1] as const,
};

const dropdownPanelVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.98 },
};

function NavChevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
}

function DesktopHoverDropdown({
  label,
  ariaLabel,
  linkHref,
  children,
}: {
  label: React.ReactNode;
  ariaLabel: string;
  linkHref?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  };

  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <div
      className="relative flex items-center gap-0.5"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) hide();
      }}
    >
      {linkHref ? (
        <Link href={linkHref} className={navLinkClass}>
          {label}
        </Link>
      ) : (
        <span className={`${navLinkClass} cursor-default`}>{label}</span>
      )}
      <button
        type="button"
        className="flex items-center rounded p-0.5 transition-opacity hover:opacity-70"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={ariaLabel}
      >
        <NavChevron open={open} />
      </button>
      <div className="absolute top-full left-0 z-50 pt-2">
        <AnimatePresence>
          {open ? (
            <motion.div
              variants={dropdownPanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={dropdownTransition}
            >
              {children}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MobileAccordionPanel({
  open,
  children,
  className = "",
}: {
  open: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={dropdownTransition}
          className={`overflow-hidden ${className}`}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

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
            <NavChevron open={expanded} />
          </button>
        </div>
        <MobileAccordionPanel open={expanded} className="ml-3 border-l border-black/10 pl-3">
          {hoverLink}
        </MobileAccordionPanel>
      </div>
    );
  }

  return (
    <DesktopHoverDropdown label={label} ariaLabel={label}>
      {hoverLink}
    </DesktopHoverDropdown>
  );
}

const tourDestinations = [
  { key: "batumi", href: "/tours/batumi" },
  { key: "tbilisi", href: "/tours/tbilisi" },
  { key: "kutaisi", href: "/tours/kutaisi" },
] as const;

const dropdownItemClass =
  "block rounded-lg px-4 py-2.5 text-[16px] font-semibold text-black transition-colors hover:bg-brand/5 md:text-[18px]";

const socialLinks: {
  name: string;
  href: string;
  Icon: IconType;
  colorClass: string;
}[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61591168508430",
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

export default function Header({
  featuredReviews = [],
}: {
  featuredReviews?: ReviewRecord[];
}) {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopMediaQuery,
    getDesktopMediaQuerySnapshot,
    getDesktopMediaQueryServerSnapshot,
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileToursOpen, setMobileToursOpen] = useState(false);
  const [mobileExcursionsOpen, setMobileExcursionsOpen] = useState(false);
  const [heroHeight, setHeroHeight] = useState(0);
  const maxTopPadding = 10;

  const { scrollY } = useScroll();

  const paddingTop = useTransform(
    scrollY,
    isHome && heroHeight > 0 ? [0, heroHeight] : [0, 1],
    isHome && heroHeight > 0
      ? [maxTopPadding, 0]
      : [maxTopPadding, maxTopPadding],
  );

  const strengthenEnd =
    isHome && heroHeight > 0 ? Math.min(heroHeight * 0.35, 120) : 60;

  const headerBackground = useTransform(
    scrollY,
    [0, strengthenEnd],
    isHome ? [0.86, 0.98] : [0.98, 0.98],
  );

  const headerBackgroundColor = useTransform(
    headerBackground,
    (opacity) => `rgba(255, 255, 255, ${opacity})`,
  );

  const headerBackdropBlur = useTransform(
    scrollY,
    [0, strengthenEnd],
    isHome ? [10, 16] : [16, 16],
  );

  const headerBackdropFilter = useTransform(
    headerBackdropBlur,
    (blur) => `blur(${blur}px)`,
  );

  const headerBoxShadow = useTransform(
    scrollY,
    [0, strengthenEnd],
    isHome
      ? [
          "0 8px 32px rgba(15, 79, 79, 0.14)",
          "0 14px 48px rgba(15, 79, 79, 0.28)",
        ]
      : [
          "0 14px 48px rgba(15, 79, 79, 0.28)",
          "0 14px 48px rgba(15, 79, 79, 0.28)",
        ],
  );

  const headerBorderColor = useTransform(
    scrollY,
    [0, strengthenEnd],
    isHome
      ? ["rgba(15, 79, 79, 0.1)", "rgba(15, 79, 79, 0.2)"]
      : ["rgba(15, 79, 79, 0.2)", "rgba(15, 79, 79, 0.2)"],
  );

  useEffect(() => {
    if (!isHome) {
      setHeroHeight(0);
      return;
    }

    const hero = document.getElementById("hero");
    if (!hero) return;

    const measure = () => setHeroHeight(hero.offsetHeight);
    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(hero);

    return () => resizeObserver.disconnect();
  }, [isHome, pathname]);

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
    <motion.header
      className={`fixed top-0 right-0 left-0 z-50 w-full px-3 sm:px-4 lg:px-5 ${isHome ? "" : "pt-[8px]"}`}
      style={isHome ? { paddingTop } : undefined}
    >
      <motion.div
        className="mx-auto w-full overflow-visible rounded-[2.5rem] border"
        style={{
          backgroundColor: headerBackgroundColor,
          backdropFilter: headerBackdropFilter,
          WebkitBackdropFilter: headerBackdropFilter,
          boxShadow: headerBoxShadow,
          borderColor: headerBorderColor,
        }}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-8 sm:py-4 lg:px-10">
         

       
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt={t("logoAlt")}
              width={220}
              height={76}
              className="h-14 w-auto object-contain sm:h-16 lg:h-[84px]"
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

            <DesktopHoverDropdown
              label={t("nav.tours")}
              ariaLabel={t("nav.tours")}
              linkHref="/tours"
            >
              <div className="min-w-[11rem] overflow-hidden rounded-xl border border-black/10 bg-white py-1 shadow-[0_8px_32px_rgba(15,79,79,0.12)]">
                {tourDestinations.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      ...dropdownTransition,
                      delay: index * 0.04,
                    }}
                  >
                    <Link href={item.href} className={dropdownItemClass}>
                      {t(
                        `nav.toursDropdown.${item.key}` as
                          | "nav.toursDropdown.batumi"
                          | "nav.toursDropdown.tbilisi"
                          | "nav.toursDropdown.kutaisi",
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </DesktopHoverDropdown>

            <Link href="/gallery" className={navLinkClass}>
              {t("nav.gallery")}
            </Link>
            <Link href="/#transfers" className={navLinkClass}>
              {t("nav.transfers")}
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
                    className="flex h-11 w-11 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                  >
                    <Icon className={`h-10 w-10 ${colorClass}`} aria-hidden />
                  </a>
                ))}
              </div>
              <a
                href={`tel:${business.phone}`}
                className="whitespace-nowrap font-figtree text-[16px] font-medium text-brand transition-opacity hover:opacity-80 md:text-[18px]"
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
      </motion.div>

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
                        <NavChevron open={mobileToursOpen} />
                      </button>
                    </div>
                    <MobileAccordionPanel
                      open={mobileToursOpen}
                      className="ml-3 border-l border-black/10 pl-3"
                    >
                      <div className="flex flex-col gap-0.5">
                        {tourDestinations.map((item, index) => (
                          <motion.div
                            key={item.key}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              ...dropdownTransition,
                              delay: index * 0.05,
                            }}
                          >
                            <Link
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
                          </motion.div>
                        ))}
                      </div>
                    </MobileAccordionPanel>
                  </div>

                  <Link
                    href="/gallery"
                    onClick={() => setMobileOpen(false)}
                    className=" rounded-lg px-3 py-3 text-[15px] font-medium text-black transition-colors hover:bg-brand/5"
                  >
                    {t("nav.gallery")}
                  </Link>
                  <Link
                    href="/#transfers"
                    onClick={() => setMobileOpen(false)}
                    className=" rounded-lg px-3 py-3 text-[15px] font-medium text-black transition-colors hover:bg-brand/5"
                  >
                    {t("nav.transfers")}
                  </Link>
                  {featuredReviews.length > 0 ? (
                    <Link
                      href="/#reviews"
                      onClick={() => setMobileOpen(false)}
                      className=" rounded-lg px-3 py-3 text-[15px] font-medium text-black transition-colors hover:bg-brand/5"
                    >
                      {t("nav.reviews")}
                    </Link>
                  ) : null}
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

                <div className="border-t border-black/10 px-5 py-5">
                  <div className="flex flex-col gap-4">
                    <LocaleSwitcher variant="mobile" />
                    <div className="flex items-center gap-1">
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
    </motion.header>
  );
}
