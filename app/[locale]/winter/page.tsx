import WinterPage from "@/components/WinterPage";
import { winterTour } from "@/data/winter-tour";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const copy = winterTour[locale as AppLocale] ?? winterTour.ka;

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/winter",
    title: copy.title,
    description: copy.intro[0],
    ogImage: "/winter2.png",
  });
}

export default async function Winter({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <WinterPage />;
}
