import type { StoredExcursionInput, StoredTourInput } from "@/lib/admin-types";
import { excursionDurationKeys, tourDurationKeys } from "@/lib/admin-types";
import { isTourDestination } from "@/data/tour-destinations";
import { routing } from "@/i18n/routing";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function hasTitle(content: unknown): boolean {
  if (!content || typeof content !== "object") return false;
  return routing.locales.some((locale) => {
    const entry = (content as Record<string, { title?: string }>)[locale];
    return typeof entry?.title === "string" && entry.title.trim().length > 0;
  });
}

function isValidOptionalId(id: unknown): boolean {
  if (id === undefined || id === null || id === "") return true;
  return typeof id === "string" && slugPattern.test(id);
}

export function isValidTourInput(body: unknown): body is StoredTourInput {
  if (!body || typeof body !== "object") return false;
  const data = body as StoredTourInput;
  if (!isValidOptionalId(data.id)) return false;
  if (data.destination !== null && data.destination !== undefined && !isTourDestination(data.destination)) {
    return false;
  }
  if (!data.meta || typeof data.meta !== "object") return false;
  if (!tourDurationKeys.includes(data.meta.durationKey)) return false;
  if (!data.content || typeof data.content !== "object") return false;
  if (!hasTitle(data.content)) return false;
  return true;
}

export function isValidExcursionInput(body: unknown): body is StoredExcursionInput {
  if (!body || typeof body !== "object") return false;
  const data = body as StoredExcursionInput;
  if (!isValidOptionalId(data.id)) return false;
  if (!data.meta || typeof data.meta !== "object") return false;
  if (!excursionDurationKeys.includes(data.meta.durationKey)) return false;
  if (typeof data.meta.grades !== "string" || !data.meta.grades.trim()) return false;
  if (!data.content || typeof data.content !== "object") return false;
  if (!hasTitle(data.content)) return false;
  return true;
}
