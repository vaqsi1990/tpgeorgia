import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteBlogPost, getBlogPostById, updateBlogPost } from "@/lib/blog-db";
import { isValidBlogInput } from "@/lib/blog-validators";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const post = await getBlogPostById(id);
    if (!post) {
      return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
    }
    return NextResponse.json({ post });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load blog post.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const body = await request.json();
    if (!isValidBlogInput(body)) {
      return NextResponse.json({ error: "Invalid blog post data." }, { status: 400 });
    }
    if (body.id && body.id !== id) {
      return NextResponse.json({ error: "Blog post id mismatch." }, { status: 400 });
    }

    const post = await updateBlogPost(id, { ...body, id });
    return NextResponse.json({ post });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update blog post.";
    const status = message === "Blog post not found." ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const deleted = await deleteBlogPost(id);
  if (!deleted) {
    return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
