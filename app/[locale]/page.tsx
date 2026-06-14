import Contact from "@/components/Contact";
import Excursions from "@/components/Excursions";
import Hero from "@/components/Hero";
import Tours from "@/components/Tours";
import WhyUs from "@/components/WhyUs";
import type { AppLocale } from "@/i18n/routing";
import { listExcursions, listTours } from "@/lib/catalog-db";
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

  const [tours, excursions] = await Promise.all([listTours(), listExcursions()]);

  return (
    <>
      <Hero />
      <WhyUs />
      <Tours tours={tours} />
      <Excursions excursions={excursions} />
      <Contact tours={tours} excursions={excursions} />
    </>
  );
}
