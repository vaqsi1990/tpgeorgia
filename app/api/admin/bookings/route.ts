import { listBookings } from "@/lib/booking-db";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const bookings = await listBookings();
    return NextResponse.json({ bookings });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load bookings.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
