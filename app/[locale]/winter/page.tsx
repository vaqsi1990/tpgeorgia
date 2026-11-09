import WinterPage from "@/components/WinterPage";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WinterSpecial" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/winter",
    title: t("title"),
    description: t("description"),
    ogImage: "/winter.png",
  });
}

export default async function Winter({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <WinterPage />;
}
