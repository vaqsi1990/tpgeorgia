export const excursionIds = [
  "machakhela",
  "qeda",
  "kobuleti",
  "guria",
  "imereti",
  "samegrelo",
  "kolkhida",
  "racha",
  "imeretiOther",
  "kolkhidaGold",
  "varzia",
  "firstEuropeans",
  "kakheti",
  "svaneti",
  "taoKlarjeti",
  "kazbegi",
] as const;

export type ExcursionId = (typeof excursionIds)[number];

export type DurationKey =
  | "7hours"
  | "8hours"
  | "9hours"
  | "10hours"
  | "11hours"
  | "12hours"
  | "1night2days"
  | "2nights3days";

export type ExcursionMeta = {
  id: ExcursionId;
  priceFrom: number;
  grades: string;
  durationKey: DurationKey;
  popular?: boolean;
};

export const excursionMeta: ExcursionMeta[] = [
  { id: "machakhela", priceFrom: 85, grades: "V–VIII", durationKey: "8hours", popular: true },
  { id: "qeda", priceFrom: 85, grades: "V–VIII", durationKey: "7hours" },
  { id: "kobuleti", priceFrom: 87, grades: "V–VIII", durationKey: "7hours" },
  { id: "guria", priceFrom: 125, grades: "V–VIII", durationKey: "9hours" },
  { id: "imereti", priceFrom: 130, grades: "VI–XII", durationKey: "8hours" },
  { id: "samegrelo", priceFrom: 135, grades: "VI–XII", durationKey: "10hours", popular: true },
  { id: "kolkhida", priceFrom: 120, grades: "VI–IX", durationKey: "8hours" },
  { id: "racha", priceFrom: 150, grades: "VII–XII", durationKey: "12hours" },
  { id: "imeretiOther", priceFrom: 120, grades: "VII–XII", durationKey: "11hours", popular: true },
  { id: "kolkhidaGold", priceFrom: 125, grades: "VIII–XII", durationKey: "11hours" },
  { id: "varzia", priceFrom: 250, grades: "IX–XII", durationKey: "1night2days" },
  { id: "firstEuropeans", priceFrom: 275, grades: "IX–XII", durationKey: "1night2days" },
  { id: "kakheti", priceFrom: 435, grades: "IX–XII", durationKey: "2nights3days" },
  { id: "svaneti", priceFrom: 405, grades: "IX–XII", durationKey: "2nights3days" },
  { id: "taoKlarjeti", priceFrom: 0, grades: "IX–XII", durationKey: "1night2days" },
  { id: "kazbegi", priceFrom: 280, grades: "IX–XII", durationKey: "1night2days" },
];
