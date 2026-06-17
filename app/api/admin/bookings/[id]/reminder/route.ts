import { getBookingById } from "@/lib/booking-db";
import { sendManualBookingReminderForBooking } from "@/lib/booking-reminder-cron";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const booking = await getBookingById(id);
    if (!booking) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    const result = await sendManualBookingReminderForBooking(id);
    if (!result.ok) {
      return NextResponse.json({ error: result.error ?? "Email failed." }, {
        status: 400,
      });
    }

    const updated = await getBookingById(id);

    return NextResponse.json({
      ok: true,
      emailSent: true,
      booking: updated,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to send booking reminder email.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
