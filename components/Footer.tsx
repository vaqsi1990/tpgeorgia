"use client";

import { Link } from "@/i18n/navigation";
import { business } from "@/lib/site";
import { useTranslations } from "next-intl";

const footerLinks = [
  { key: "home", href: "/", labelKey: "nav.home" },
  { key: "about", href: "/about", labelKey: "nav.about" },
  { key: "tours", href: "/tours", labelKey: "nav.tours" },
  {
    key: "excursions",
    href: "/excursions",
    labelKey: "nav.schoolExcursions",
  },
  { key: "gallery", href: "/gallery", labelKey: "nav.gallery" },
  { key: "contact", href: "/#contact", labelKey: "nav.contact" },
] as const;

const tourLinks = [
  { key: "batumi", href: "/tours/batumi" },
  { key: "tbilisi", href: "/tours/tbilisi" },
  { key: "kutaisi", href: "/tours/kutaisi" },
] as const;

export default function Footer() {
  const t = useTranslations("Footer");
  const tHeader = useTranslations("Header");

  return (
    <footer className="border-t border-black/10 bg-brand/[0.03] px-4 py-12 text-black sm:px-6 lg:px-10">
      <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <p className="font-afacad text-xl font-semibold">{business.name}</p>
          <p className="text-[15px] leading-relaxed text-black/70">
            {t("description")}
          </p>
        </div>

        <nav aria-label={t("siteNav")}>
          <h2 className="mb-3 text-[16px] font-semibold uppercase tracking-wide text-black">
            {t("siteNav")}
          </h2>
          <ul className="space-y-2">
            {footerLinks.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-[15px] text-black/80 transition-colors hover:text-brand"
                >
                  {tHeader(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("tourNav")}>
          <h2 className="mb-3 text-[16px] font-semibold uppercase tracking-wide text-black">
            {t("tourNav")}
          </h2>
          <ul className="space-y-2">
            {tourLinks.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-[15px] text-black/80 transition-colors hover:text-brand"
                >
                  {tHeader(
                    `nav.toursDropdown.${item.key}` as "nav.toursDropdown.batumi",
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 text-[16px] font-semibold uppercase tracking-wide text-black">
            {t("contactTitle")}
          </h2>
          <ul className="space-y-2 text-[15px] text-black/80">
            <li>
              <a
                href={`tel:${business.phone}`}
                className="transition-colors hover:text-brand"
              >
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${business.email}`}
                className="transition-colors hover:text-brand"
              >
                {business.email}
              </a>
            </li>
            <li>
              <a
                href={business.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brand"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={business.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brand"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-10 w-full max-w-7xl border-t border-black/10 pt-6 text-center text-[13px] text-black/50">
        {t("copyright", { year: new Date().getFullYear() })}
      </p>
    </footer>
  );
}
