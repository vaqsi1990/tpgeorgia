import StoredBlogList from "@/components/admin/StoredBlogList";
import { AdminCreateLink } from "@/components/admin/StoredTourList";
import { listBlogPosts } from "@/lib/blog-db";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await listBlogPosts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-afacad text-3xl font-semibold">ბლოგი</h1>
        </div>
        <AdminCreateLink href="/admin/blog/new">ახალი ჩანაწერი</AdminCreateLink>
      </div>
      <StoredBlogList initialPosts={posts} />
    </div>
  );
}
