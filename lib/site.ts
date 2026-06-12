import { routing, type AppLocale } from "@/i18n/routing";

export const siteName = "TP Georgia";

export const productionSiteUrl = "https://tourprovidergeo.com";

export const business = {
  name: siteName,
  legalName: "TP Georgia",
  phone: "+995555338807",
  phoneDisplay: "+995 555 33 88 07",
  whatsapp: "https://wa.me/995555338807",
  facebook: "https://www.facebook.com/profile.php?id=61583758856391",
  email: "tourprovidergeorgia@gmail.com",
  address: {
    locality: "Batumi",
    region: "Adjara",
    country: "GE",
  },
} as const;

export const publicPaths = [
  "",
  "/about",
  "/gallery",
  "/tours",
  "/tours/batumi",
  "/tours/tbilisi",
  "/tours/kutaisi",
  "/excursions",
] as const;

export type PublicPath = (typeof publicPaths)[number];

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) return configured;

  if (process.env.VERCEL_ENV === "production") {
    return productionSiteUrl;
  }

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(
    /\/$/,
    "",
  );
  if (vercelProduction) {
    return vercelProduction.startsWith("http")
      ? vercelProduction
      : `https://${vercelProduction}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

export function localizedPath(locale: AppLocale, pathname: PublicPath): string {
  const suffix = pathname === "" ? "" : pathname;
  return `/${locale}${suffix}`;
}

export function localizedUrl(locale: AppLocale, pathname: PublicPath): string {
  return absoluteUrl(localizedPath(locale, pathname));
}

export function hreflangMap(pathname: PublicPath): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = localizedUrl(locale, pathname);
  }

  languages["x-default"] = localizedUrl(routing.defaultLocale, pathname);
  return languages;
}
