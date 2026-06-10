import { getTourById } from "@/lib/catalog-db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
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
