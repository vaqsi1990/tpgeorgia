import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteExcursion, getExcursionById, updateExcursion } from "@/lib/catalog-db";
import { isValidExcursionInput } from "@/lib/catalog-validators";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const excursion = await getExcursionById(id);
    if (!excursion) {
      return NextResponse.json({ error: "Excursion not found." }, { status: 404 });
    }
    return NextResponse.json({ excursion });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load excursion.";
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
    if (!isValidExcursionInput(body)) {
      return NextResponse.json({ error: "Invalid excursion data." }, { status: 400 });
    }
    if (body.id !== id) {
      return NextResponse.json({ error: "Excursion id mismatch." }, { status: 400 });
    }

    const excursion = await updateExcursion(id, body);
    return NextResponse.json({ excursion });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update excursion.";
    const status = message === "Excursion not found." ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const deleted = await deleteExcursion(id);
  if (!deleted) {
    return NextResponse.json({ error: "Excursion not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
