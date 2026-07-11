import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createBlogPost, listBlogPosts } from "@/lib/blog-db";
import { isValidBlogInput } from "@/lib/blog-validators";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const posts = await listBlogPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load blog posts.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!isValidBlogInput(body)) {
      return NextResponse.json({ error: "Invalid blog post data." }, { status: 400 });
    }

    const post = await createBlogPost(body);
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save blog post.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
