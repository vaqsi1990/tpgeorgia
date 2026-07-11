import type { TourId } from "@/data/tours";

export type TourDay = {
  label: string;
  description: string;
};

export type TourSection = {
  title: string;
  days: TourDay[];
};

export type TourBookingOption = {
  id: string;
  label: string;
  description?: string;
  kind: "route" | "addon";
};

export type TourContent = {
  title: string;
  routeLabel: string;
  subtitle?: string;
  outline: string[];
  sections: TourSection[];
  includes: string[];
  highlights?: string[];
  clothingNote?: string;
  bookingOptions?: TourBookingOption[];
};

export type TourContentCatalog = Record<TourId, TourContent>;
