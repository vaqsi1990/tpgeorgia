import { createBooking } from "@/lib/booking-db";
import {
  buildBookingEmail,
  parseBookingPayload,
} from "@/lib/booking-inquiry";
import { business, siteName } from "@/lib/site";
import { NextResponse } from "next/server";
import { Resend } from "resend";

function getFromAddress(): string {
  const configured = process.env.RESEND_FROM_EMAIL?.trim();
  if (configured) return configured;

  return `${siteName} <onboarding@resend.dev>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = parseBookingPayload(body);

    if (!payload) {
      return NextResponse.json(
        { error: "Invalid form data." },
        { status: 400 },
      );
    }

    const booking = await createBooking(payload);

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (apiKey) {
      const { subject, text, html } = buildBookingEmail(payload);
      const resend = new Resend(apiKey);
      const to = process.env.CONTACT_TO_EMAIL?.trim() || business.email;

      const { error } = await resend.emails.send({
        from: getFromAddress(),
        to,
        replyTo: payload.email,
        subject,
        text,
        html,
      });

      if (error) {
        console.error("Booking email error:", error);
      }
    }

    return NextResponse.json({ ok: true, id: booking.id });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to submit booking." },
      { status: 500 },
    );
  }
}
