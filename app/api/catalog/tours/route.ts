import { listTours } from "@/lib/catalog-db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const tours = await listTours();
    return NextResponse.json({ tours });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load tours.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
