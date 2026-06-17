import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listReviews } from "@/lib/review-db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const reviews = await listReviews();
  return NextResponse.json({ reviews });
}
