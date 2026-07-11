"use client";

import {
  AdminInput,
  AdminTextarea,
} from "@/components/admin/AdminField";
import BlogLocaleTabs from "@/components/admin/BlogLocaleTabs";
import ImageUploadForProduct from "@/components/productimage";
import { blogLocales, type BlogContent, type BlogLocale, type StoredBlogRecord } from "@/lib/blog-types";
import { slugFromTitles } from "@/lib/slug";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type LocaleBlogForm = {
  title: string;
  excerpt: string;
  body: string;
};

const emptyLocaleForm = (): LocaleBlogForm => ({
  title: "",
  excerpt: "",
  body: "",
});

function localeFormFromContent(content: BlogContent): LocaleBlogForm {
  return {
    title: content.title,
    excerpt: content.excerpt,
    body: content.body,
  };
}

function buildLocaleContent(form: LocaleBlogForm): BlogContent {
  return {
    title: form.title.trim(),
    excerpt: form.excerpt.trim(),
    body: form.body.trim(),
  };
}

export default function BlogForm({
  initialPost,
}: {
  initialPost?: StoredBlogRecord;
}) {
  const router = useRouter();
  const isEditing = Boolean(initialPost);
  const recordId = initialPost?.id;
  const [locale, setLocale] = useState<BlogLocale>("ka");
  const [published, setPublished] = useState(initialPost?.published ?? true);
  const [coverImage, setCoverImage] = useState<string[]>(
    initialPost?.coverImage ? [initialPost.coverImage] : [],
  );
  const [localeForms, setLocaleForms] = useState<Record<BlogLocale, LocaleBlogForm>>(
    () =>
      Object.fromEntries(
        blogLocales.map((loc) => [
          loc,
          initialPost
            ? localeFormFromContent(initialPost.content[loc])
            : emptyLocaleForm(),
        ]),
      ) as Record<BlogLocale, LocaleBlogForm>,
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const form = localeForms[locale];
  const generatedSlug = useMemo(
    () =>
      slugFromTitles(
        blogLocales.map((loc) => localeForms[loc].title.trim()).filter(Boolean),
      ),
    [localeForms],
  );

  function updateLocaleField<K extends keyof LocaleBlogForm>(
    key: K,
    value: LocaleBlogForm[K],
  ) {
    setLocaleForms((prev) => ({
      ...prev,
      [locale]: { ...prev[locale], [key]: value },
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const content = Object.fromEntries(
      blogLocales.map((loc) => [loc, buildLocaleContent(localeForms[loc])]),
    ) as Record<BlogLocale, BlogContent>;

    const payload = {
      ...(isEditing && recordId ? { id: recordId } : {}),
      coverImage: coverImage[0]?.trim() || null,
      published,
      content,
    };

    try {
      const response = await fetch(
        isEditing && recordId
          ? `/api/admin/blog/${encodeURIComponent(recordId)}`
          : "/api/admin/blog",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "ბლოგის შენახვა ვერ მოხერხდა.");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "ბლოგის შენახვა ვერ მოხერხდა.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="space-y-4 rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
        <h2 className="font-afacad text-xl font-semibold">ბლოგის პარამეტრები</h2>
        {isEditing && recordId ? (
          <p className="text-[15px] text-black/60">
            ID: <span className="font-medium text-black/80">{recordId}</span>
          </p>
        ) : null}
        <label className="flex items-center gap-2 text-[14px] font-medium">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="size-4 rounded border-black/20"
          />
          გამოქვეყნებული (მთავარ გვერდზე ჩანს)
        </label>
        <div>
          <p className="mb-1.5 block text-[18px] font-medium text-black/80">სურათი</p>
          <ImageUploadForProduct
            value={coverImage.slice(0, 1)}
            onChange={(urls) => setCoverImage(urls.slice(0, 1))}
          />
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-afacad text-xl font-semibold">კონტენტი ენების მიხედვით</h2>
          <BlogLocaleTabs active={locale} onChange={setLocale} />
        </div>

        <AdminInput
          label="სათაური"
          value={form.title}
          onChange={(e) => updateLocaleField("title", e.target.value)}
          required
          placeholder="მაგ: „საქართველოს ულამაზესი მარშრუტები“"
        />
        {!isEditing && generatedSlug ? (
          <p className="text-[12px] text-black">
            ავტომატური ID:{" "}
            <span className="font-medium text-black/75">{generatedSlug}</span>
          </p>
        ) : null}
        <AdminTextarea
          label="მოკლე აღწერა"
          hint="ბარათზე ჩანს მოკლე ტექსტი"
          value={form.excerpt}
          onChange={(e) => updateLocaleField("excerpt", e.target.value)}
          className="min-h-20"
        />
        <AdminTextarea
          label="ტექსტი"
          value={form.body}
          onChange={(e) => updateLocaleField("body", e.target.value)}
          className="min-h-48"
        />
      </section>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-[#DC2626] px-6 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "ინახება…" : isEditing ? "ბლოგის განახლება" : "ბლოგის შექმნა"}
        </button>
        <Link
          href="/admin/blog"
          className="rounded-xl border border-black/15 px-6 py-2.5 text-[15px] font-medium hover:bg-black/5"
        >
          გაუქმება
        </Link>
      </div>
    </form>
  );
}
