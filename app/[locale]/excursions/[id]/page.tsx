import ExcursionDetailPage from "@/components/ExcursionDetailPage";
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
  const coverImage = excursion.images.find((url) => url && url.trim() !== "");

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: `/excursions/${id}` as "/excursions",
    title: content.title,
    description: content.highlights[0] ?? content.title,
    ogImage: coverImage,
  });
}

export default async function ExcursionDetailRoute({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const excursion = await getExcursionById(id);
  if (!excursion) {
    notFound();
  }

  return (
    <ExcursionDetailPage
      excursion={excursion}
      locale={locale as AppLocale}
    />
  );
}
