import BlogHomeList from "@/components/BlogHomeList";
import ParallaxSection from "@/components/ParallaxSection";
import SectionHeader from "@/components/SectionHeader";
import type { PublicBlogPost } from "@/lib/blog-types";
import { getTranslations } from "next-intl/server";

type BlogProps = {
  posts: PublicBlogPost[];
};

export default async function Blog({ posts }: BlogProps) {
  if (posts.length === 0) {
    return null;
  }

  const t = await getTranslations("Blog");

  return (
    <ParallaxSection
      id="blog"
      tone="light"
      className="bg-white px-4 pt-4 pb-6 text-black sm:px-6 sm:pt-5 sm:pb-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader
          title={t("title")}
          description={t("description")}
          className="mb-4 sm:mb-6"
        />
        <BlogHomeList posts={posts} readMoreLabel={t("readMore")} />
      </div>
    </ParallaxSection>
  );
}
