import { isAdminAuthenticated } from "@/lib/admin-auth";
import { addStoredTour, deleteStoredTour, readStoredTours } from "@/lib/admin-store";
import type { StoredTourInput } from "@/lib/admin-types";
import { isTourDestination } from "@/data/tour-destinations";
import { tourDurationKeys } from "@/lib/admin-types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function isValidTourInput(body: unknown): body is StoredTourInput {
  if (!body || typeof body !== "object") return false;
  const data = body as StoredTourInput;
  if (!data.id || typeof data.id !== "string") return false;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.id)) return false;
  if (data.destination !== null && !isTourDestination(data.destination)) return false;
  if (!data.meta || typeof data.meta !== "object") return false;
  if (!tourDurationKeys.includes(data.meta.durationKey)) return false;
  if (!data.content || typeof data.content !== "object") return false;
  return true;
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return NextResponse.json({ tours: readStoredTours() });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!isValidTourInput(body)) {
      return NextResponse.json({ error: "Invalid tour data." }, { status: 400 });
    }

    const tour = addStoredTour(body);
    return NextResponse.json({ tour }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save tour.";
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
    return NextResponse.json({ error: "Missing tour id." }, { status: 400 });
  }

  const deleted = deleteStoredTour(id);
  if (!deleted) {
    return NextResponse.json({ error: "Tour not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
