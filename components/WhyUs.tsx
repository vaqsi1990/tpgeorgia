import { getTranslations } from "next-intl/server";

const itemKeys = [
  "routes",
  "guides",
  "students",
  "games",
  "program",
  "organization",
] as const;

export default async function WhyUs() {
  const t = await getTranslations("WhyUs");

  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="font-afacad  mb-10 text-center text-3xl font-semibold tracking-tight sm:mb-12 sm:text-4xl lg:text-[2.5rem]">
          {t("title")}
        </h2>

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
          {itemKeys.map((key) => (
            <li
              key={key}
              className="flex items-start gap-3 rounded-2xl border border-brand/10 bg-brand/[0.03] px-5 py-4 sm:gap-4 sm:px-6 sm:py-5"
            >
              <span
                className=" mt-0.5 shrink-0 text-lg font-semibold sm:text-xl"
                aria-hidden
              >
                ✔
              </span>
              <span className=" text-[15px] md:text-[18px] leading-relaxed font-medium ">
                {t(`items.${key}`)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
