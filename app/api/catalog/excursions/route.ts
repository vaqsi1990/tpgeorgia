import { listExcursions } from "@/lib/catalog-db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const excursions = await listExcursions();
    return NextResponse.json({ excursions });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load excursions.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
