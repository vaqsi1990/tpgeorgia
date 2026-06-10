import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createTour, listTours } from "@/lib/catalog-db";
import { isValidTourInput } from "@/lib/catalog-validators";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const tours = await listTours();
    return NextResponse.json({ tours });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load tours.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
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

    const tour = await createTour(body);
    return NextResponse.json({ tour }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save tour.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
