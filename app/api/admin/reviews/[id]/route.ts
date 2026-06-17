import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteReview, updateReviewPublished } from "@/lib/review-db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const published = body.published;

  if (typeof published !== "boolean") {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const review = await updateReviewPublished(id, published);
  if (!review) {
    return NextResponse.json({ error: "Review not found." }, { status: 404 });
  }

  return NextResponse.json({ review });
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const deleted = await deleteReview(id);
  if (!deleted) {
    return NextResponse.json({ error: "Review not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
