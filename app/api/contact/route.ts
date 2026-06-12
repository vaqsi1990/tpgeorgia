import {
  buildContactInquiryEmail,
  parseContactInquiryPayload,
} from "@/lib/contact-inquiry";
import { business, siteName } from "@/lib/site";
import { NextResponse } from "next/server";
import { Resend } from "resend";

function getFromAddress(): string {
  const configured = process.env.RESEND_FROM_EMAIL?.trim();
  if (configured) return configured;

  return `${siteName} <onboarding@resend.dev>`;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const payload = parseContactInquiryPayload(body);

    if (!payload) {
      return NextResponse.json(
        { error: "Invalid form data." },
        { status: 400 },
      );
    }

    const { text, html } = buildContactInquiryEmail(payload);
    const resend = new Resend(apiKey);
    const to = process.env.CONTACT_TO_EMAIL?.trim() || business.email;

    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to,
      replyTo: payload.email,
      subject: payload.subject,
      text,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 },
    );
  }
}
