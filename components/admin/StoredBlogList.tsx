"use client";

import type { StoredBlogRecord } from "@/lib/blog-types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StoredBlogList({
  initialPosts,
}: {
  initialPosts: StoredBlogRecord[];
}) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm(`წავშალოთ ბლოგი "${id}"?`)) return;
    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/blog/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Delete failed.");
      }
      setPosts((prev) => prev.filter((item) => item.id !== id));
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  }

  if (posts.length === 0) {
    return (
      <p className="rounded-2xl border border-black/10 bg-white px-6 py-10 text-center text-[15px] text-black/65">
        ბლოგის ჩანაწერები ჯერ არ არის.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {posts.map((post) => (
        <li
          key={post.id}
          className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-white p-4 fflex md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="text-[16px] font-medium text-black md:text-[18px]">
              {post.content.ka.title || post.id}
            </p>
            <p className="text-[15px] text-black/60 md:text-[16px]">
              ID: {post.id} · {post.published ? "გამოქვეყნებული" : "დრაფტი"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/admin/blog/${encodeURIComponent(post.id)}/edit`}
              className="rounded-lg border border-black/15 px-3 py-2 text-[16px] font-medium hover:bg-black/5 md:text-[18px]"
            >
              ცვლილება
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(post.id)}
              disabled={deletingId === post.id}
              className="rounded-lg border border-red-200 px-3 py-2 text-[16px] font-medium text-red-700 hover:bg-red-50 disabled:opacity-60 md:text-[18px]"
            >
              {deletingId === post.id ? "წაშლა…" : "წაშლა"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
