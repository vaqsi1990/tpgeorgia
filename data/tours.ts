export const tourIds = [
  "eveningCity",
  "batumiBotanical",
  "journeyCenturies",
  "mountainAdjara",
  "gomisMta",
  "greenLake",
  "machakhela",
  "imereti",
  "svaneti3day",
  "vardzia",
  "svaneti12day",
] as const;

export type TourId = (typeof tourIds)[number];

export type TourDurationKey =
  | "4hours"
  | "6hours"
  | "7hours"
  | "10hours"
  | "12hours"
  | "fullDay"
  | "2nights3days"
  | "11nights12days";

export type TourMeta = {
  id: TourId;
  durationKey: TourDurationKey;
  priceFrom: number;
  minPeople: number;
  startTime?: string;
  popular?: boolean;
};

export const tourMeta: TourMeta[] = [
  { id: "eveningCity", durationKey: "4hours", priceFrom: 90, minPeople: 4, startTime: "18:00" },
  { id: "batumiBotanical", durationKey: "6hours", priceFrom: 120, minPeople: 4, startTime: "10:00", popular: true },
  { id: "journeyCenturies", durationKey: "7hours", priceFrom: 185, minPeople: 4, startTime: "10:00" },
  { id: "mountainAdjara", durationKey: "7hours", priceFrom: 170, minPeople: 4, startTime: "10:00" },
  { id: "gomisMta", durationKey: "fullDay", priceFrom: 199, minPeople: 4, startTime: "10:00", popular: true },
  { id: "greenLake", durationKey: "fullDay", priceFrom: 245, minPeople: 4, startTime: "09:00" },
  { id: "machakhela", durationKey: "10hours", priceFrom: 120, minPeople: 4, startTime: "09:00" },
  { id: "imereti", durationKey: "12hours", priceFrom: 159, minPeople: 4, startTime: "08:00" },
  { id: "svaneti3day", durationKey: "2nights3days", priceFrom: 395, minPeople: 4, startTime: "07:00" },
  { id: "vardzia", durationKey: "11nights12days", priceFrom: 0, minPeople: 0 },
  { id: "svaneti12day", durationKey: "11nights12days", priceFrom: 0, minPeople: 0, popular: true },
];
