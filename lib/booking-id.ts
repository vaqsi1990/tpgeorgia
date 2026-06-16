import { randomInt } from "node:crypto";

const LETTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const DIGITS = "23456789";
const ALPHANUMERIC = `${LETTERS}${DIGITS}`;

function pickChar(pool: string): string {
  return pool[randomInt(pool.length)]!;
}

export function generateBookingId(): string {
  const chars = [pickChar(LETTERS), pickChar(DIGITS)];

  while (chars.length < 5) {
    chars.push(pickChar(ALPHANUMERIC));
  }

  for (let index = chars.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(index + 1);
    [chars[index], chars[swapIndex]] = [chars[swapIndex]!, chars[index]!];
  }

  return chars.join("");
}

export async function resolveUniqueBookingId(
  exists: (id: string) => Promise<boolean>,
  maxAttempts = 30,
): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const id = generateBookingId();
    if (!(await exists(id))) {
      return id;
    }
  }

  throw new Error("Could not generate a unique booking reference.");
}
