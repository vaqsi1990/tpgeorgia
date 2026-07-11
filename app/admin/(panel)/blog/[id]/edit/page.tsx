import BlogForm from "@/components/admin/BlogForm";
import { getBlogPostById } from "@/lib/blog-db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminEditBlogPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getBlogPostById(id);
  if (!post) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-afacad text-3xl font-semibold">ბლოგის რედაქტირება</h1>
        <p className="mt-1 text-[16px] text-black md:text-[18px]">
          განაახლეთ კონტენტი ქართულ, ინგლისურ და რუსულ ენებზე.
        </p>
      </div>
      <BlogForm initialPost={post} />
    </div>
  );
}
