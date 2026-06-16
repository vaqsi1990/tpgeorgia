import CatalogBookingPage from "@/components/CatalogBookingPage";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/i18n/routing";
import { getExcursionById } from "@/lib/catalog-db";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale, id } = await params;
  const excursion = await getExcursionById(id);

  if (!excursion) {
    return {};
  }

  const content =
    excursion.content[locale as AppLocale] ?? excursion.content.ka;
  const t = await getTranslations({ locale, namespace: "Booking" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: `/excursions/${id}/book` as "/excursions",
    title: `${t("bookButton")} — ${content.title}`,
    description: content.highlights[0] ?? content.title,
  });
}

export default async function ExcursionBookRoute({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const excursion = await getExcursionById(id);
  if (!excursion) {
    notFound();
  }

  const content = excursion.content[locale as AppLocale] ?? excursion.content.ka;

  return (
    <CatalogBookingPage
      bookingType="excursion"
      itemId={excursion.id}
      itemTitle={content.title}
      backHref={`/excursions/${excursion.id}`}
      tone="warm"
    />
  );
}
