import { routing } from "@/i18n/routing";
import {
  hreflangMap,
  localizedUrl,
  publicPaths,
  type PublicPath,
} from "@/lib/site";
import type { MetadataRoute } from "next";

function sitemapPriority(pathname: PublicPath): number {
  if (pathname === "") return 1;
  if (pathname === "/tours" || pathname === "/excursions") return 0.9;
  if (pathname.startsWith("/tours/")) return 0.85;
  return 0.8;
}

function sitemapChangeFrequency(
  pathname: PublicPath,
): NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]> {
  return pathname === "" ? "weekly" : "monthly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicPaths.map((pathname) => ({
    url: localizedUrl(routing.defaultLocale, pathname),
    lastModified,
    changeFrequency: sitemapChangeFrequency(pathname),
    priority: sitemapPriority(pathname),
    alternates: {
      languages: hreflangMap(pathname),
    },
  }));
}
