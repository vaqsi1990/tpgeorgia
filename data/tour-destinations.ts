import type { TourId } from "@/data/tours";

export const tourDestinationIds = ["batumi", "tbilisi", "kutaisi"] as const;

export type TourDestination = (typeof tourDestinationIds)[number];

export function isTourDestination(value: string): value is TourDestination {
  return (tourDestinationIds as readonly string[]).includes(value);
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
