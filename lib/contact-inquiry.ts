export type ContactInquiryPayload = {
  name: string;
  email: string;
  inquiryType: "tour" | "excursion";
  itemId: string;
  itemTitle: string;
  subject: string;
  topicLine: string;
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseContactInquiryPayload(
  body: unknown,
): ContactInquiryPayload | null {
  if (!body || typeof body !== "object") return null;

  const record = body as Record<string, unknown>;
  const inquiryType = record.inquiryType;

  if (inquiryType !== "tour" && inquiryType !== "excursion") {
    return null;
  }

  const name = trimField(record.name, 120);
  const email = trimField(record.email, 254);
  const itemId = trimField(record.itemId, 80);
  const itemTitle = trimField(record.itemTitle, 200);
  const subject = trimField(record.subject, 200);
  const topicLine = trimField(record.topicLine, 300);
  const message = trimField(record.message, 5000);

  if (
    !name ||
    !email ||
    !itemId ||
    !itemTitle ||
    !subject ||
    !topicLine ||
    !message ||
    !EMAIL_PATTERN.test(email)
  ) {
    return null;
  }

  return {
    name,
    email,
    inquiryType,
    itemId,
    itemTitle,
    subject,
    topicLine,
    message,
  };
}

function trimField(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export function buildContactInquiryEmail(payload: ContactInquiryPayload) {
  const text = [
    payload.name,
    payload.email,
    "",
    "თემა",
    payload.topicLine,
    "",
    "წერილი",
    payload.message,
  ].join("\n");

  const html = `
    <div style="font-family:Figtree,Segoe UI,sans-serif;color:#171717;line-height:1.6;max-width:560px;">
      <p style="margin:0 0 4px;font-size:18px;font-weight:600;">${escapeHtml(payload.name)}</p>
      <p style="margin:0 0 24px;">
        <a href="mailto:${escapeHtml(payload.email)}" style="color:#0f4f4f;text-decoration:none;">${escapeHtml(payload.email)}</a>
      </p>
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#0f4f4f;">თემა</p>
      <p style="margin:0 0 24px;font-size:16px;">${escapeHtml(payload.topicLine)}</p>
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#0f4f4f;">წერილი</p>
      <p style="margin:0;white-space:pre-wrap;font-size:16px;">${escapeHtml(payload.message)}</p>
    </div>
  `.trim();

  return { text, html };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
