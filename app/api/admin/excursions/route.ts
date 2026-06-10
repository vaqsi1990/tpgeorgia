import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createExcursion, listExcursions } from "@/lib/catalog-db";
import { isValidExcursionInput } from "@/lib/catalog-validators";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const excursions = await listExcursions();
    return NextResponse.json({ excursions });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load excursions.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!isValidExcursionInput(body)) {
      return NextResponse.json({ error: "Invalid excursion data." }, { status: 400 });
    }

    const excursion = await createExcursion(body);
    return NextResponse.json({ excursion }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save excursion.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
