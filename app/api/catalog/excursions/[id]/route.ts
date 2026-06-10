import { getExcursionById } from "@/lib/catalog-db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
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
