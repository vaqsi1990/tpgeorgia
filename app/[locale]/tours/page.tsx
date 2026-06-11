import ToursPage from "@/components/ToursPage";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tours" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/tours",
    title: t("title"),
    description: t("description"),
  });
}

export default async function Tours({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ToursPage />;
}
