"use client";

import { Link } from "@/i18n/navigation";
import { business } from "@/lib/site";
import { useTranslations } from "next-intl";

const tourLinks = [
  { key: "batumi", href: "/tours/batumi" },
  { key: "tbilisi", href: "/tours/tbilisi" },
  { key: "kutaisi", href: "/tours/kutaisi" },
] as const;

export default function Footer() {
  const t = useTranslations("Footer");
  const tHeader = useTranslations("Header");
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-black/10 bg-white px-4 py-10 text-black sm:px-6 sm:py-12 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          <div className="space-y-3">
            <p className="font-afacad text-lg font-semibold sm:text-xl">
              {business.name}
            </p>
            <p className="max-w-sm text-[15px] leading-relaxed text-black/80 sm:text-[16px]">
              {t("description")}
            </p>
          </div>

          <nav aria-label={t("tourNav")} className="md:px-2 lg:px-4">
            <h2 className="mb-3 text-[15px] font-semibold uppercase tracking-wide text-black sm:text-[16px]">
              {t("tourNav")}
            </h2>
            <ul className="space-y-2">
              {tourLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-[15px] text-black/80 transition-colors hover:text-brand sm:text-[16px]"
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
            <h2 className="mb-3 text-[15px] font-semibold uppercase tracking-wide text-black sm:text-[16px]">
              {t("contactTitle")}
            </h2>
            <ul className="space-y-2 text-[15px] text-black/80 sm:text-[16px]">
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
                  className="break-all transition-colors hover:text-brand"
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
              <li>
                <a
                  href={business.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-black/10 pt-6 text-center text-[14px] text-black/55 sm:text-[15px]">
          {t("copyright", { year })}
        </p>
      </div>
    </footer>
  );
}
