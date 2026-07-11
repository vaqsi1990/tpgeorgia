import type { TourBookingOption } from "@/data/tour-content";
import type { AppLocale } from "@/i18n/routing";
import {
  getRachaHorsebackBookingOptions,
  rachaHorsebackTourId,
} from "@/data/tours/racha-horseback";

export function resolveTourBookingOptions(
  tourId: string,
  locale: AppLocale,
  fromContent?: TourBookingOption[],
): TourBookingOption[] | undefined {
  if (fromContent?.length) {
    return fromContent;
  }

  if (tourId === rachaHorsebackTourId) {
    return getRachaHorsebackBookingOptions(locale);
  }

  return undefined;
}
