import { winterDayImages, winterTour } from "@/data/winter-tour";
import type { AppLocale } from "@/i18n/routing";
import { business } from "@/lib/site";
import { getLocale } from "next-intl/server";
import Image from "next/image";

const buttonClass =
  "inline-flex items-center justify-center rounded-xl border border-[#991B1B] bg-[#DC2626] px-5 py-2.5 text-[16px] font-medium text-white transition-colors hover:bg-[#B91C1C] hover:shadow-[0_4px_16px_rgba(220,38,38,0.35)] md:text-[18px]";

export default async function WinterPage() {
  const locale = (await getLocale()) as AppLocale;
  const copy = winterTour[locale] ?? winterTour.ka;

  return (
    <main className="bg-white pb-20 text-black sm:pb-24 lg:pb-28">
      <div className="relative h-[46svh] min-h-[300px] w-full sm:h-[54svh]">
        <Image
          src="/winter2.png"
          alt={copy.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-4xl px-4 pb-8 sm:px-6 sm:pb-10">
          <p className="mb-2 text-[13px] font-semibold tracking-wide text-white/85 uppercase sm:text-sm">
            {copy.eyebrow}
          </p>
          <h1 className="font-afacad max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {copy.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl px-4 pt-8 sm:px-6 sm:pt-10">
        <div className="space-y-4 text-[16px] leading-relaxed md:text-[18px]">
          {copy.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="font-afacad text-2xl font-semibold text-[#0f4f4f] sm:text-3xl">
            {copy.highlight}
          </p>
        </div>

        <dl className="mt-8 grid grid-cols-3 gap-3 border-y border-black/10 py-5 text-center">
          {copy.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-afacad text-xl font-semibold sm:text-2xl">
                {stat.value}
              </dt>
              <dd className="text-[14px] text-black/70 sm:text-[16px]">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[16px] md:text-[18px]">
            <span className="text-black/60">{copy.priceLabel}: </span>
            <span className="font-afacad text-2xl font-semibold">
              {copy.price}
            </span>
          </p>
          <a
            href={business.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
          >
            {copy.cta}
          </a>
        </div>

        <h2 className="font-afacad mt-12 mb-2 text-2xl font-semibold sm:text-3xl">
          {copy.programTitle}
        </h2>
        <ol className="divide-y divide-black/10">
          {copy.days.map((day, index) => (
            <li
              key={day.day}
              className="flex flex-col gap-4 py-6 sm:flex-row sm:gap-5"
            >
              <Image
                src={winterDayImages[index]}
                alt={day.title}
                width={153}
                height={191}
                className="h-36 w-28 shrink-0 rounded-2xl object-cover sm:h-40 sm:w-32"
              />
              <div className="min-w-0">
                <p className="text-[13px] font-semibold tracking-wide text-black/50 uppercase">
                  {day.day}
                </p>
                <h3 className="font-afacad mt-1 text-xl font-semibold sm:text-2xl">
                  {day.title}
                </h3>
                {day.route ? (
                  <p className="mt-1 text-[15px] font-medium text-[#0f4f4f]">
                    {day.route}
                  </p>
                ) : null}
                <div className="mt-2 space-y-2 text-[16px] leading-relaxed text-black/90">
                  {day.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <p className="mt-3 text-[15px]">
                  <span className="font-semibold">{copy.mealLabel}: </span>
                  {day.meal}
                </p>
                {day.stay ? (
                  <p className="text-[15px]">
                    <span className="font-semibold">{copy.stayLabel}: </span>
                    {day.stay}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <section>
            <h2 className="font-afacad mb-3 text-2xl font-semibold">
              {copy.includedTitle}
            </h2>
            <ul className="space-y-2 text-[16px] leading-relaxed">
              {copy.included.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#DC2626]" aria-hidden>
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-afacad mb-3 text-2xl font-semibold">
              {copy.excludedTitle}
            </h2>
            <ul className="space-y-2 text-[16px] leading-relaxed">
              {copy.excluded.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#DC2626]" aria-hidden>
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-10">
          <h2 className="font-afacad mb-3 text-2xl font-semibold">
            {copy.familyTitle}
          </h2>
          <div className="space-y-3 text-[16px] leading-relaxed">
            {copy.family.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-afacad mb-4 text-2xl font-semibold">
            {copy.termsTitle}
          </h2>
          <div className="space-y-6">
            {copy.terms.map((term) => (
              <div key={term.title}>
                <h3 className="mb-2 text-[17px] font-semibold">{term.title}</h3>
                <div className="space-y-2 text-[16px] leading-relaxed text-black/90">
                  {term.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <a
          href={business.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClass} mt-10`}
        >
          {copy.cta}
        </a>
      </div>
    </main>
  );
}
