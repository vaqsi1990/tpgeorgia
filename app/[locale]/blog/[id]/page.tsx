import BlogDetailPage from "@/components/BlogDetailPage";
import type { AppLocale } from "@/i18n/routing";
import { getPublishedBlogPostById } from "@/lib/blog-db";
import { buildPageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale, id } = await params;
  const post = await getPublishedBlogPostById(id, locale as AppLocale);

  if (!post) {
    return {};
  }

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: `/blog/${id}`,
    title: post.title,
    description: post.excerpt || post.body.slice(0, 160),
    ogImage: post.coverImage ?? undefined,
  });
}

export default async function BlogDetailRoute({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const post = await getPublishedBlogPostById(id, locale as AppLocale);
  if (!post) {
    notFound();
  }

  return <BlogDetailPage post={post} locale={locale as AppLocale} />;
}
