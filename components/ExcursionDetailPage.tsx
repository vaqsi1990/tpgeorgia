import CatalogDetailPage from "@/components/CatalogDetailPage";
import ExcursionDetailPanel from "@/components/ExcursionDetailPanel";
import ParallaxSection from "@/components/ParallaxSection";
import ReviewsSection from "@/components/ReviewsSection";
import type { AppLocale } from "@/i18n/routing";
import type { StoredExcursionRecord } from "@/lib/admin-types";
import { listPublishedReviewsForItem } from "@/lib/review-db";
import { getTranslations } from "next-intl/server";

type ExcursionDetailPageProps = {
  excursion: StoredExcursionRecord;
  locale: AppLocale;
};

export default async function ExcursionDetailPage({
  excursion,
  locale,
}: ExcursionDetailPageProps) {
  const [t, tBooking] = await Promise.all([
    getTranslations("Excursions"),
    getTranslations("Booking"),
  ]);
  const reviews = await listPublishedReviewsForItem("excursion", excursion.id);

  const content = excursion.content[locale] ?? excursion.content.ka;
  const meta = { id: excursion.id, ...excursion.meta };

  const durationLabel = t(`durations.${meta.durationKey}` as const);
  const priceLabel =
    meta.priceFrom > 0
      ? t("priceFrom", { price: meta.priceFrom })
      : t("priceOnRequest");

  const detailMeta = [
    { label: t("duration"), value: durationLabel },
    {
      label: t("type"),
      value: `${meta.grades} ${t("grade")} · ${t("cultural")}`,
    },
    { label: t("price"), value: priceLabel },
  ];

  return (
    <ParallaxSection
      as="main"
      tone="warm"
      disableContentParallax
      className="bg-[#fafcfb] px-4 pb-20 pt-28 text-black sm:px-6 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-36"
    >
      <CatalogDetailPage
        backHref="/excursions"
        backLabel={t("backToCatalog")}
        title={content.title}
        subtitle={content.highlights[0]}
        popularLabel={t("popularBadge")}
        isPopular={meta.popular}
        meta={detailMeta}
        images={excursion.images}
        imageAlt={content.title}
        bookLabel={tBooking("bookButton")}
        bookHref={`/excursions/${excursion.id}/book`}
      >
        <ExcursionDetailPanel content={content} excursionId={excursion.id} />
        <ReviewsSection reviews={reviews} locale={locale} />
      </CatalogDetailPage>
    </ParallaxSection>
  );
}
