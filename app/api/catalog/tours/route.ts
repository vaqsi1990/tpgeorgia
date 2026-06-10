import { readStoredTours } from "@/lib/admin-store";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ tours: readStoredTours() });
}
