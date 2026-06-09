import ToursList from "@/components/ToursList";
import { getTranslations } from "next-intl/server";

export default async function Tours() {
  const t = await getTranslations("Tours");

  return (
    <section
      id="tours"
      className="bg-white px-4 pb-20 text-black sm:px-6 lg:px-10"
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

        <ToursList limit={6} showAllLink />
      </div>
    </section>
  );
}
