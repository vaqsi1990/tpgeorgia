import { routing } from "@/i18n/routing";
import { getSiteUrl, localizedPath, publicPaths } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const pathname of publicPaths) {
      const path = localizedPath(locale, pathname);
      const priority =
        pathname === ""
          ? 1
          : pathname === "/tours" || pathname === "/excursions"
            ? 0.9
            : pathname.startsWith("/tours/")
              ? 0.85
              : 0.8;

      entries.push({
        url: `${siteUrl}${path}`,
        lastModified,
        changeFrequency: pathname === "" ? "weekly" : "monthly",
        priority,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((altLocale) => [
              altLocale,
              `${siteUrl}${localizedPath(altLocale, pathname)}`,
            ]),
          ),
        },
      });
    }
  }

  return entries;
}
