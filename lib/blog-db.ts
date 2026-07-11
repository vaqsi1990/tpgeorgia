import type { AppLocale } from "@/i18n/routing";
import type { Locale } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import {
  blogLocales,
  resolveBlogLocale,
  type BlogContent,
  type BlogLocale,
  type BlogLocaleContentMap,
  type PublicBlogPost,
  type StoredBlogInput,
  type StoredBlogRecord,
} from "@/lib/blog-types";
import { resolveUniqueSlug, slugFromTitles } from "@/lib/slug";

function emptyBlogContent(): BlogContent {
  return { title: "", excerpt: "", body: "" };
}

function toBlogContent(translation: {
  title: string;
  excerpt: string;
  body: string;
}): BlogContent {
  return {
    title: translation.title,
    excerpt: translation.excerpt,
    body: translation.body,
  };
}

function buildBlogContentMap(
  translations: Array<{
    locale: Locale;
    title: string;
    excerpt: string;
    body: string;
  }>,
): BlogLocaleContentMap {
  const content = {
    ka: emptyBlogContent(),
    en: emptyBlogContent(),
    ru: emptyBlogContent(),
  } satisfies BlogLocaleContentMap;

  for (const translation of translations) {
    const locale = translation.locale as BlogLocale;
    if (blogLocales.includes(locale)) {
      content[locale] = toBlogContent(translation);
    }
  }

  return content;
}

function blogTranslationData(locale: BlogLocale, content: BlogContent) {
  return {
    locale: locale as Locale,
    title: content.title.trim(),
    excerpt: content.excerpt.trim(),
    body: content.body.trim(),
  };
}

function titlesFromContent(content: BlogLocaleContentMap): string[] {
  return blogLocales
    .map((locale) => content[locale]?.title?.trim() ?? "")
    .filter(Boolean);
}

async function resolveBlogId(input: StoredBlogInput): Promise<string> {
  if (input.id?.trim()) return input.id.trim();

  const base = slugFromTitles(titlesFromContent(input.content));
  if (!base) {
    throw new Error("Blog title is required to generate an ID.");
  }

  return resolveUniqueSlug(base, async (slug) => {
    const existing = await prisma.blogPost.findUnique({ where: { id: slug } });
    return existing !== null;
  });
}

function toStoredBlogRecord(post: {
  id: string;
  coverImage: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  translations: Array<{
    locale: Locale;
    title: string;
    excerpt: string;
    body: string;
  }>;
}): StoredBlogRecord {
  return {
    id: post.id,
    coverImage: post.coverImage,
    published: post.published,
    content: buildBlogContentMap(post.translations),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
}

export async function listBlogPosts(): Promise<StoredBlogRecord[]> {
  const posts = await prisma.blogPost.findMany({
    include: { translations: true },
    orderBy: { createdAt: "desc" },
  });

  return posts.map(toStoredBlogRecord);
}

export async function getBlogPostById(id: string): Promise<StoredBlogRecord | null> {
  const post = await prisma.blogPost.findUnique({
    where: { id },
    include: { translations: true },
  });
  if (!post) return null;
  return toStoredBlogRecord(post);
}

export async function listPublishedBlogPosts(
  locale: AppLocale,
): Promise<PublicBlogPost[]> {
  const contentLocale = resolveBlogLocale(locale);
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    include: { translations: true },
    orderBy: { createdAt: "desc" },
  });

  return posts
    .map((post) => {
      const translation = post.translations.find((item) => item.locale === contentLocale);
      if (!translation?.title.trim()) return null;

      return {
        id: post.id,
        coverImage: post.coverImage,
        title: translation.title,
        excerpt: translation.excerpt,
        body: translation.body,
        createdAt: post.createdAt.toISOString(),
      } satisfies PublicBlogPost;
    })
    .filter((post): post is PublicBlogPost => post !== null);
}

export async function getPublishedBlogPostById(
  id: string,
  locale: AppLocale,
): Promise<PublicBlogPost | null> {
  const contentLocale = resolveBlogLocale(locale);
  const post = await prisma.blogPost.findUnique({
    where: { id },
    include: { translations: true },
  });

  if (!post?.published) return null;

  const translation = post.translations.find((item) => item.locale === contentLocale);
  if (!translation?.title.trim()) return null;

  return {
    id: post.id,
    coverImage: post.coverImage,
    title: translation.title,
    excerpt: translation.excerpt,
    body: translation.body,
    createdAt: post.createdAt.toISOString(),
  };
}

export async function createBlogPost(input: StoredBlogInput): Promise<StoredBlogRecord> {
  const id = await resolveBlogId(input);

  const post = await prisma.blogPost.create({
    data: {
      id,
      coverImage: input.coverImage?.trim() || null,
      published: input.published ?? true,
      translations: {
        create: blogLocales.map((locale) =>
          blogTranslationData(locale, input.content[locale]),
        ),
      },
    },
    include: { translations: true },
  });

  return toStoredBlogRecord(post);
}

export async function updateBlogPost(
  id: string,
  input: StoredBlogInput,
): Promise<StoredBlogRecord> {
  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("Blog post not found.");
  }

  const post = await prisma.$transaction(async (tx) => {
    await tx.blogPost.update({
      where: { id },
      data: {
        coverImage: input.coverImage?.trim() || null,
        published: input.published ?? true,
      },
    });

    for (const locale of blogLocales) {
      const data = blogTranslationData(locale, input.content[locale]);
      await tx.blogPostTranslation.upsert({
        where: { blogPostId_locale: { blogPostId: id, locale: locale as Locale } },
        create: { blogPostId: id, ...data },
        update: data,
      });
    }

    return tx.blogPost.findUniqueOrThrow({
      where: { id },
      include: { translations: true },
    });
  });

  return toStoredBlogRecord(post);
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    await prisma.blogPost.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}
