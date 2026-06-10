import { clearAdminSession, isAdminAuthenticated } from "@/lib/admin-auth";
import { NextResponse } from "next/server";

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  await clearAdminSession();
  return NextResponse.json({ ok: true });
}
