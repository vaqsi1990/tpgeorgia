import BlogForm from "@/components/admin/BlogForm";
import Link from "next/link";

export default function AdminNewBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/blog"
          className="mb-3 inline-flex text-[14px] font-medium text-black hover:text-black"
        >
          ← ბლოგის სია
        </Link>
        <h1 className="font-afacad text-3xl font-semibold">ბლოგის შექმნა</h1>
        <p className="mt-1 text-[16px] text-black md:text-[18px]">
          შეავსეთ კონტენტი ქართულ, ინგლისურ და რუსულ ენებზე.
        </p>
      </div>
      <BlogForm />
    </div>
  );
}
