import { updateBookingStatus } from "@/lib/booking-db";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import type { BookingStatus } from "@/lib/generated/prisma/enums";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const STATUSES = new Set<BookingStatus>(["pending", "confirmed", "cancelled"]);

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const body = await request.json();
    const status = body?.status;

    if (typeof status !== "string" || !STATUSES.has(status as BookingStatus)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    const booking = await updateBookingStatus(id, status as BookingStatus);
    if (!booking) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    return NextResponse.json({ booking });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update booking.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
