import { blogLocales, type StoredBlogInput } from "@/lib/blog-types";

const kebabSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isValidOptionalId(id: unknown): boolean {
  if (id === undefined || id === null || id === "") return true;
  return typeof id === "string" && kebabSlugPattern.test(id);
}

function hasTitle(content: unknown): boolean {
  if (!content || typeof content !== "object") return false;
  return blogLocales.some((locale) => {
    const entry = (content as Record<string, { title?: string }>)[locale];
    return typeof entry?.title === "string" && entry.title.trim().length > 0;
  });
}

export function isValidBlogInput(body: unknown): body is StoredBlogInput {
  if (!body || typeof body !== "object") return false;
  const data = body as StoredBlogInput;
  if (!isValidOptionalId(data.id)) return false;
  if (
    data.coverImage !== undefined &&
    data.coverImage !== null &&
    typeof data.coverImage !== "string"
  ) {
    return false;
  }
  if (data.published !== undefined && typeof data.published !== "boolean") {
    return false;
  }
  if (!data.content || typeof data.content !== "object") return false;
  if (!hasTitle(data.content)) return false;
  return true;
}
