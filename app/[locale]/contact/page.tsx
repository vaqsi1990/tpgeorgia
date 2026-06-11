import ContactPage from "@/components/ContactPage";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/contact",
    title: t("metadata.title"),
    description: t("metadata.description"),
  });
}

export default async function Contact({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactPage locale={locale as AppLocale} />;
}
