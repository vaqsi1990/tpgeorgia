import ToursPageContent from "@/components/ToursPageContent";
import type { TourDestination } from "@/data/tour-destinations";
import { getTranslations } from "next-intl/server";

type ToursPageProps = {
  destination?: TourDestination;
};

export default async function ToursPage({ destination }: ToursPageProps = {}) {
  const t = await getTranslations("Tours");
  const title = destination
    ? t(`destinations.${destination}.title`)
    : t("title");
  const description = destination
    ? t(`destinations.${destination}.description`)
    : t("description");

  return (
    <main className="bg-white px-4 pb-20 pt-28 text-black sm:px-6 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-36">
      <div className="mx-auto w-full max-w-7xl">
       
        <div className="mb-10 text-center sm:mb-14">
          <h1 className="font-afacad mb-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-[2.5rem]">
            {title}
          </h1>
          <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-black md:text-[18px]">
            {description}
          </p>
        </div>

        <ToursPageContent initialDestination={destination} />
      </div>
    </main>
  );
}
