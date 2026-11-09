import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function WinterPage() {
  const t = await getTranslations("WinterSpecial");

  return (
    <main className="bg-white pb-20 text-black sm:pb-24 lg:pb-28">
      <div className="relative h-[52svh] min-h-[320px] w-full sm:h-[60svh]">
        <Image
          src="/winter.png"
          alt={t("imageAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/20"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-10">
          <h1 className="font-afacad max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-10">
        <p className="text-[16px] font-medium leading-relaxed md:text-[18px]">
          {t("description")}
        </p>
        <p className="mt-4 text-[16px] leading-relaxed text-black/90 md:text-[18px]">
          {t("body")}
        </p>
        <Link
          href="/#contact"
          className="mt-8 inline-flex items-center justify-center rounded-xl border border-[#991B1B] bg-[#DC2626] px-5 py-2.5 text-[16px] font-medium text-white transition-colors hover:bg-[#B91C1C] hover:shadow-[0_4px_16px_rgba(220,38,38,0.35)] md:text-[18px]"
        >
          {t("contactCta")}
        </Link>
      </div>
    </main>
  );
}
