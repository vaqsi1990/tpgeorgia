import { runBookingReminderCron } from "@/lib/booking-reminder-cron";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    return process.env.NODE_ENV !== "production";
  }

  const auth = request.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const result = await runBookingReminderCron();
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("Booking reminder cron error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Booking reminder cron failed.",
      },
      { status: 500 },
    );
  }
}
