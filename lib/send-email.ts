import { siteName } from "@/lib/site";
import { Resend } from "resend";

export function getResendFromAddress(): string {
  const configured = process.env.RESEND_FROM_EMAIL?.trim();
  if (configured) return configured;

  return `${siteName} <onboarding@resend.dev>`;
}

type SendEmailInput = {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export async function sendEmail({
  to,
  subject,
  text,
  html,
  replyTo,
}: SendEmailInput): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not configured; email not sent.");
    return { ok: false, error: "Email service is not configured." };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: getResendFromAddress(),
    to,
    replyTo,
    subject,
    text,
    html,
  });

  if (error) {
    console.error("Resend email error:", error);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
