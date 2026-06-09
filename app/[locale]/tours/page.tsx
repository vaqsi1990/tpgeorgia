import ToursPage from "@/components/ToursPage";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tours" });

  return {
    title: `${t("title")} | TP Georgia`,
    description: t("description"),
  };
}

export default async function Tours({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ToursPage />;
}
