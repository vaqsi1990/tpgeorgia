import { Link } from "@/i18n/navigation";
import type { PublicBlogPost } from "@/lib/blog-types";

type BlogHomeListProps = {
  posts: PublicBlogPost[];
  readMoreLabel: string;
  limit?: number;
};

export default function BlogHomeList({
  posts,
  readMoreLabel,
  limit = 3,
}: BlogHomeListProps) {
  const visiblePosts = posts.slice(0, limit);

  if (visiblePosts.length === 0) {
    return null;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {visiblePosts.map((post) => (
        <li key={post.id}>
          <article className="flex h-full flex-col gap-6 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
            <h3 className="font-afacad text-xl font-semibold text-black">
              {post.title}
            </h3>
            <Link
              href={`/blog/${post.id}`}
              className="mt-auto w-full rounded-xl border border-[#991B1B] bg-[#DC2626] py-2.5 text-center text-[16px] font-medium text-white transition-colors hover:bg-[#B91C1C] md:text-[18px]"
            >
              {readMoreLabel}
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
}
