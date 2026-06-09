import ExcursionsList from "@/components/ExcursionsList";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function ExcursionsPage() {
  const t = await getTranslations("Excursions");

  return (
    <main className="bg-white px-4 pb-20 pt-28 text-black sm:px-6 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-36">
      <div className="mx-auto w-full max-w-7xl">
        <Image
          src="/background.png"
          className="mx-auto object-cover"
          alt={t("title")}
          width={300}
          height={100}
        />

        <div className="mb-10 text-center sm:mb-14">
          <h1 className="font-afacad mb-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-[2.5rem]">
            {t("title")}
          </h1>
          <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-black md:text-[18px]">
            {t("description")}
          </p>
        </div>

        <ExcursionsList />

        <div className="mt-14 w-full overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(15,79,79,0.06)] sm:mt-16">
          <video
            src="/IMG_8984.MP4"
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            aria-label={t("videoAlt")}
            className="h-40 w-full object-cover sm:h-48 md:h-[700px] "
          />
        </div>
      </div>
    </main>
  );
}
