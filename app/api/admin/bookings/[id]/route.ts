import { getBookingById, updateBookingStatus } from "@/lib/booking-db";
import { buildBookingStatusCustomerEmail } from "@/lib/booking-status-email";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import type { BookingStatus } from "@/lib/generated/prisma/enums";
import { business } from "@/lib/site";
import { sendEmail } from "@/lib/send-email";
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

    const existing = await getBookingById(id);
    if (!existing) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    const nextStatus = status as BookingStatus;
    if (existing.status === nextStatus) {
      return NextResponse.json({ booking: existing, emailSent: false });
    }

    const booking = await updateBookingStatus(id, nextStatus);
    if (!booking) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    const { subject, text, html } = buildBookingStatusCustomerEmail(booking);
    const emailResult = await sendEmail({
      to: booking.email,
      subject,
      text,
      html,
      replyTo: business.email,
    });

    if (!emailResult.ok) {
      return NextResponse.json({
        booking,
        emailSent: false,
        emailWarning:
          emailResult.error ??
          "Status updated, but the customer notification email could not be sent.",
      });
    }

    return NextResponse.json({ booking, emailSent: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update booking.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
