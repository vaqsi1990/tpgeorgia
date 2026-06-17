import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteReview, updateReview } from "@/lib/review-db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function trimField(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }
  return value.trim().slice(0, maxLength);
}

function parseRating(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    return undefined;
  }
  if (value < 1 || value > 5) {
    return undefined;
  }
  return value;
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();

  const authorName = trimField(body.authorName, 120);
  const text = trimField(body.text, 5000);
  const rating = parseRating(body.rating);
  const published =
    typeof body.published === "boolean" ? body.published : undefined;

  if (
    authorName === undefined &&
    text === undefined &&
    rating === undefined &&
    published === undefined
  ) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  if (authorName !== undefined && authorName.length === 0) {
    return NextResponse.json({ error: "Author name is required." }, { status: 400 });
  }

  if (text !== undefined && text.length === 0) {
    return NextResponse.json({ error: "Review text is required." }, { status: 400 });
  }

  const review = await updateReview(id, {
    ...(authorName !== undefined ? { authorName } : {}),
    ...(text !== undefined ? { text } : {}),
    ...(rating !== undefined ? { rating } : {}),
    ...(published !== undefined ? { published } : {}),
  });

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
