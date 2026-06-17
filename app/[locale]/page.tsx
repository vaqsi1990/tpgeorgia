import Contact from "@/components/Contact";
import Excursions from "@/components/Excursions";
import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";
import Tours from "@/components/Tours";
import WhyUs from "@/components/WhyUs";
import type { AppLocale } from "@/i18n/routing";
import { listExcursions, listTours } from "@/lib/catalog-db";
import { getPublishedReviewStatsRecord, listPublishedReviews } from "@/lib/review-db";
import { buildPageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "",
    title: t("title"),
    description: t("description"),
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tours, excursions, reviewStats, reviews] = await Promise.all([
    listTours(),
    listExcursions(),
    getPublishedReviewStatsRecord(),
    listPublishedReviews(),
  ]);

  return (
    <>
      <Hero />
      <WhyUs />
      <Tours tours={tours} reviewStats={reviewStats} />
      <Excursions excursions={excursions} reviewStats={reviewStats} />
      <Reviews reviews={reviews} />
      <Contact tours={tours} excursions={excursions} />
    </>
  );
}
