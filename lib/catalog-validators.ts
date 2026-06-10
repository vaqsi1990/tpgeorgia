import type { StoredExcursionInput, StoredTourInput } from "@/lib/admin-types";
import { excursionDurationKeys, tourDurationKeys } from "@/lib/admin-types";
import { isTourDestination } from "@/data/tour-destinations";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidTourInput(body: unknown): body is StoredTourInput {
  if (!body || typeof body !== "object") return false;
  const data = body as StoredTourInput;
  if (!data.id || typeof data.id !== "string" || !slugPattern.test(data.id)) return false;
  if (data.destination !== null && !isTourDestination(data.destination)) return false;
  if (!data.meta || typeof data.meta !== "object") return false;
  if (!tourDurationKeys.includes(data.meta.durationKey)) return false;
  if (!data.content || typeof data.content !== "object") return false;
  return true;
}

export function isValidExcursionInput(body: unknown): body is StoredExcursionInput {
  if (!body || typeof body !== "object") return false;
  const data = body as StoredExcursionInput;
  if (!data.id || typeof data.id !== "string" || !slugPattern.test(data.id)) return false;
  if (!data.meta || typeof data.meta !== "object") return false;
  if (!excursionDurationKeys.includes(data.meta.durationKey)) return false;
  if (typeof data.meta.grades !== "string" || !data.meta.grades.trim()) return false;
  if (!data.content || typeof data.content !== "object") return false;
  return true;
}
