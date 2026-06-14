import ExcursionsPage from "@/components/ExcursionsPage";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Excursions" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/excursions",
    title: t("title"),
    description: t("description"),
  });
}

export default async function Excursions({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ExcursionsPage />;
}
