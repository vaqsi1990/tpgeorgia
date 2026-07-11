import type { AppLocale } from "@/i18n/routing";

export const blogLocales = ["ka", "en", "ru"] as const;
export type BlogLocale = (typeof blogLocales)[number];

export type BlogContent = {
  title: string;
  excerpt: string;
  body: string;
};

export type BlogLocaleContentMap = Record<BlogLocale, BlogContent>;

export type StoredBlogRecord = {
  id: string;
  coverImage: string | null;
  published: boolean;
  content: BlogLocaleContentMap;
  createdAt: string;
  updatedAt: string;
};

export type StoredBlogInput = {
  id?: string;
  coverImage?: string | null;
  published?: boolean;
  content: BlogLocaleContentMap;
};

export type PublicBlogPost = {
  id: string;
  coverImage: string | null;
  title: string;
  excerpt: string;
  body: string;
  createdAt: string;
};

/** Chinese locale falls back to English blog content. */
export function resolveBlogLocale(locale: AppLocale): BlogLocale {
  if (locale === "ka" || locale === "en" || locale === "ru") return locale;
  return "en";
}
