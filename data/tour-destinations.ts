import type { TourId } from "@/data/tours";

export const tourDestinationIds = ["batumi", "tbilisi", "kutaisi"] as const;

export type TourDestination = (typeof tourDestinationIds)[number];

export function isTourDestination(value: string): value is TourDestination {
  return (tourDestinationIds as readonly string[]).includes(value);
}

export function isTourDestinationList(value: unknown): value is TourDestination[] {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === "string" && isTourDestination(item))
  );
}

export function tourMatchesDestination(
  destinations: TourDestination[] | null | undefined,
  destination: TourDestination,
): boolean {
  return (destinations ?? []).includes(destination);
}

export const toursByDestination: Record<TourDestination, TourId[]> = {
  batumi: [
    "eveningCity",
    "batumiBotanical",
    "journeyCenturies",
    "mountainAdjara",
    "gomisMta",
    "greenLake",
    "machakhela",
    "svaneti3day",
  ],
  tbilisi: ["vardzia", "svaneti12day"],
  kutaisi: ["imereti"],
};
