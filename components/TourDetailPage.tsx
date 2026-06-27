import CatalogDetailPage from "@/components/CatalogDetailPage";
import ParallaxSection from "@/components/ParallaxSection";
import ReviewsSection from "@/components/ReviewsSection";
import TourDetailPanel from "@/components/TourDetailPanel";
import type { AppLocale } from "@/i18n/routing";
import type { StoredTourRecord } from "@/lib/admin-types";
import { listPublishedReviewsForItem } from "@/lib/review-db";
import { getTranslations } from "next-intl/server";

type TourDetailPageProps = {
  tour: StoredTourRecord;
  locale: AppLocale;
};

export default async function TourDetailPage({
  tour,
  locale,
}: TourDetailPageProps) {
  const [t, tBooking] = await Promise.all([
    getTranslations("Tours"),
    getTranslations("Booking"),
  ]);
  const reviews = await listPublishedReviewsForItem("tour", tour.id);

  const content = tour.content[locale] ?? tour.content.ka;
  const meta = { id: tour.id, ...tour.meta };

  const durationLabel =
    meta.durationKey === "11nights12days"
      ? t("durationDays", { days: 12, nights: 11 })
      : t(`durations.${meta.durationKey}` as const);

  const priceLabel =
    meta.priceFrom > 0
      ? t("priceFrom", { price: meta.priceFrom })
      : t("priceOnRequest");

  const detailMeta = [
    ...(meta.startTime
      ? [{ label: t("startTime"), value: meta.startTime }]
      : []),
    { label: t("duration"), value: durationLabel },
    { label: t("price"), value: priceLabel },
    ...(meta.minPeople > 0
      ? [
          {
            label: t("minPeople"),
            value: t("minPeopleValue", { count: meta.minPeople }),
          },
        ]
      : []),
  ];

  return (
    <ParallaxSection
      as="main"
      tone="mint"
      disableContentParallax
      className="bg-[#fafcfb] px-4 pb-20 pt-28 text-black sm:px-6 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-36"
    >
      <CatalogDetailPage
        backHref="/tours"
        backLabel={t("backToCatalog")}
        title={content.title}
        subtitle={content.routeLabel}
        popularLabel={t("popularBadge")}
        isPopular={meta.popular}
        exclusiveLabel={t("exclusiveBadge")}
        isExclusive={meta.exclusive}
        meta={detailMeta}
        images={tour.images}
        imageAlt={content.title}
        bookLabel={tBooking("bookButton")}
        bookHref={`/tours/${tour.id}/book`}
        bookingType="tour"
      >
        <TourDetailPanel content={content} tourId={tour.id} />
        <ReviewsSection reviews={reviews} locale={locale} />
      </CatalogDetailPage>
    </ParallaxSection>
  );
}
