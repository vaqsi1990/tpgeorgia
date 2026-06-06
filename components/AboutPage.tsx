import { getTranslations } from "next-intl/server";

const whyUsKeys = ["localExperience", "qualityService", "tailoredTravel"] as const;

export default async function AboutPage() {
  const t = await getTranslations("About");

  return (
    <main className="bg-white px-4 pb-20 pt-28 text-black sm:px-6 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-36">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="font-afacad mb-4 text-center text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {t("hero.title")}
        </h1>
        <p className="mb-12 text-center text-[15px] leading-relaxed text-black/80 md:mb-16 md:text-[18px]">
          {t("hero.tagline")}
        </p>

        <h2 className="font-afacad mb-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("intro.sectionTitle")}
        </h2>
        <p className="mb-4 text-[15px] font-medium leading-relaxed md:text-[18px]">
          {t("intro.subtitle")}
        </p>
        <p className="mb-10 text-[15px] leading-relaxed text-black/90 md:mb-12 md:text-[18px]">
          {t("intro.description")}
        </p>

        <h2 className="font-afacad mb-8 text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("whyUs.title")}
        </h2>

        <div className="space-y-8 text-[15px] leading-relaxed text-black/90 md:text-[18px]">
          {whyUsKeys.map((key) => (
            <div key={key}>
              <h3 className="font-afacad mb-3 text-xl font-semibold sm:text-[1.35rem]">
                {t(`whyUs.${key}.title`)}
              </h3>
              <p>{t(`whyUs.${key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
