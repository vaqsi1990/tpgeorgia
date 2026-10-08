import {
  placeLocales,
  type StoredAttractionInput,
  type StoredPlaceInput,
} from "@/lib/place-types";

const placeIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const attractionIdPattern = /^[A-Za-z0-9_-]{1,80}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function optionalText(value: unknown): boolean {
  return value === undefined || value === null || typeof value === "string";
}

function optionalNumber(value: unknown): boolean {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "number" && Number.isFinite(value))
  );
}

function hasPlaceName(content: unknown): boolean {
  if (!isRecord(content)) return false;
  return placeLocales.some((locale) => {
    const entry = content[locale];
    return (
      isRecord(entry) &&
      typeof entry.name === "string" &&
      entry.name.trim().length > 0
    );
  });
}

function isValidAttraction(value: unknown): value is StoredAttractionInput {
  if (!isRecord(value)) return false;
  if (value.id !== undefined && value.id !== null && value.id !== "") {
    if (typeof value.id !== "string" || !attractionIdPattern.test(value.id)) {
      return false;
    }
  }
  if (value.slug !== undefined && value.slug !== null && typeof value.slug !== "string") {
    return false;
  }
  if (typeof value.image !== "string" || !value.image.trim()) return false;
  if (!optionalText(value.parentId)) return false;
  if (!optionalText(value.mapUrl)) return false;
  if (!optionalNumber(value.mapLat) || !optionalNumber(value.mapLng)) return false;
  if (
    value.sortOrder !== undefined &&
    (typeof value.sortOrder !== "number" || !Number.isFinite(value.sortOrder))
  ) {
    return false;
  }
  return hasPlaceName(value.content);
}

export function isValidPlaceInput(body: unknown): body is StoredPlaceInput {
  if (!isRecord(body)) return false;
  if (body.id !== undefined && body.id !== null && body.id !== "") {
    if (typeof body.id !== "string" || !placeIdPattern.test(body.id)) return false;
  }
  if (typeof body.image !== "string" || !body.image.trim()) return false;
  if (body.published !== undefined && typeof body.published !== "boolean") return false;
  if (
    body.sortOrder !== undefined &&
    (typeof body.sortOrder !== "number" || !Number.isFinite(body.sortOrder))
  ) {
    return false;
  }
  if (!hasPlaceName(body.content)) return false;
  if (!Array.isArray(body.attractions)) return false;
  return body.attractions.every((attraction) => isValidAttraction(attraction));
}
