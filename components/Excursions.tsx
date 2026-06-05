import ExcursionsList from "@/components/ExcursionsList";
import { getTranslations } from "next-intl/server";

export default async function Excursions() {
  const t = await getTranslations("Excursions");

  return (
    <section
      id="excursions"
      className="bg-white px-4 text-black pb-20 sm:px-6 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="font-afacad mb-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-[2.5rem]">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-black md:text-[18px]">
            {t("description")}
          </p>
        </div>

        <ExcursionsList />
      </div>
    </section>
  );
}
