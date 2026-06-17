import { createHmac, timingSafeEqual } from "crypto";

const TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000;

function getReviewTokenSecret(): string {
  const secret =
    process.env.REVIEW_TOKEN_SECRET?.trim() ||
    process.env.ADMIN_PASSWORD?.trim();
  if (!secret) {
    throw new Error(
      "REVIEW_TOKEN_SECRET or ADMIN_PASSWORD must be set for review links.",
    );
  }
  return secret;
}

function signPayload(payload: string): string {
  return createHmac("sha256", getReviewTokenSecret())
    .update(payload)
    .digest("base64url");
}

export function createReviewToken(bookingId: string): string {
  const exp = Date.now() + TOKEN_TTL_MS;
  const payload = Buffer.from(
    JSON.stringify({ bookingId, exp }),
  ).toString("base64url");
  return `${payload}.${signPayload(payload)}`;
}

export function verifyReviewToken(
  bookingId: string,
  token: string | null | undefined,
): boolean {
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  let expected: string;
  try {
    expected = signPayload(payload);
  } catch {
    return false;
  }

  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) return false;
  if (!timingSafeEqual(sigBuf, expBuf)) return false;

  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { bookingId?: string; exp?: number };
    return (
      data.bookingId === bookingId &&
      typeof data.exp === "number" &&
      data.exp > Date.now()
    );
  } catch {
    return false;
  }
}
