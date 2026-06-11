type GmailComposeInput = {
  to: string;
  subject: string;
  body: string;
};

export function buildGmailComposeUrl({
  to,
  subject,
  body,
}: GmailComposeInput): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to,
    su: subject,
    body,
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}
