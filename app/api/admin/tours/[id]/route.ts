import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteTour, getTourById, updateTour } from "@/lib/catalog-db";
import { isValidTourInput } from "@/lib/catalog-validators";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const tour = await getTourById(id);
    if (!tour) {
      return NextResponse.json({ error: "Tour not found." }, { status: 404 });
    }
    return NextResponse.json({ tour });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load tour.";
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
    if (!isValidTourInput(body)) {
      return NextResponse.json({ error: "Invalid tour data." }, { status: 400 });
    }
    if (body.id && body.id !== id) {
      return NextResponse.json({ error: "Tour id mismatch." }, { status: 400 });
    }

    const tour = await updateTour(id, { ...body, id });
    return NextResponse.json({ tour });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update tour.";
    const status = message === "Tour not found." ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const deleted = await deleteTour(id);
  if (!deleted) {
    return NextResponse.json({ error: "Tour not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
