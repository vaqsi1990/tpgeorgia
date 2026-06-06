import AboutPage from "@/components/AboutPage";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function About({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutPage />;
}
