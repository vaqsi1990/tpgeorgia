import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  addStoredExcursion,
  deleteStoredExcursion,
  readStoredExcursions,
} from "@/lib/admin-store";
import type { StoredExcursionInput } from "@/lib/admin-types";
import { excursionDurationKeys } from "@/lib/admin-types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function isValidExcursionInput(body: unknown): body is StoredExcursionInput {
  if (!body || typeof body !== "object") return false;
  const data = body as StoredExcursionInput;
  if (!data.id || typeof data.id !== "string") return false;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.id)) return false;
  if (!data.meta || typeof data.meta !== "object") return false;
  if (!excursionDurationKeys.includes(data.meta.durationKey)) return false;
  if (!data.content || typeof data.content !== "object") return false;
  return true;
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return NextResponse.json({ excursions: readStoredExcursions() });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!isValidExcursionInput(body)) {
      return NextResponse.json(
        { error: "Invalid excursion data." },
        { status: 400 },
      );
    }

    const excursion = addStoredExcursion(body);
    return NextResponse.json({ excursion }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save excursion.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing excursion id." }, { status: 400 });
  }

  const deleted = deleteStoredExcursion(id);
  if (!deleted) {
    return NextResponse.json({ error: "Excursion not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
