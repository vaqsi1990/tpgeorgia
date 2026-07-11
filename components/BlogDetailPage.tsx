import { Link } from "@/i18n/navigation";
import ParallaxSection from "@/components/ParallaxSection";
import type { AppLocale } from "@/i18n/routing";
import type { PublicBlogPost } from "@/lib/blog-types";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

type BlogDetailPageProps = {
  post: PublicBlogPost;
  locale: AppLocale;
};

function formatDate(iso: string, locale: AppLocale): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}

export default async function BlogDetailPage({ post, locale }: BlogDetailPageProps) {
  const t = await getTranslations("Blog");

  return (
    <ParallaxSection
      as="main"
      tone="light"
      disableContentParallax
      className="bg-white px-4 pb-20 pt-28 text-black sm:px-6 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-36"
    >
      <article className="mx-auto w-full max-w-3xl">
        <Link
          href="/#blog"
          className="inline-flex text-[15px] font-medium text-black/60 transition-colors hover:text-black md:text-[16px]"
        >
          ← {t("backToHome")}
        </Link>

        <header className="mt-6">
          <time className="text-[14px] text-black/50" dateTime={post.createdAt}>
            {formatDate(post.createdAt, locale)}
          </time>
          <h1 className="font-afacad mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="mt-4 text-[16px] leading-relaxed text-black/70 md:text-[18px]">
              {post.excerpt}
            </p>
          ) : null}
        </header>

        {post.coverImage ? (
          <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl bg-black/5">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        ) : null}

        {post.body ? (
          <div className="prose-blog mt-8 whitespace-pre-line text-[16px] leading-relaxed text-black/85 md:text-[18px]">
            {post.body}
          </div>
        ) : null}
      </article>
    </ParallaxSection>
  );
}
