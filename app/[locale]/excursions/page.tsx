import ExcursionsPage from "@/components/ExcursionsPage";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Excursions" });

  return {
    title: `${t("title")} | TP Georgia`,
    description: t("description"),
  };
}

export default async function Excursions({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ExcursionsPage />;
}
