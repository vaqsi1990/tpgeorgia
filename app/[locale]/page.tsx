import Contact from "@/components/Contact";
import Excursions from "@/components/Excursions";
import Hero from "@/components/Hero";
import Tours from "@/components/Tours";
import WhyUs from "@/components/WhyUs";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

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

  return (
    <>
      <Hero />
      <WhyUs />
      <Tours />
      <Excursions />
      <Contact />
    </>
  );
}
