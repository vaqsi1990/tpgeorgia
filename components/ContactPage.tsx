import JsonLd from "@/components/seo/JsonLd";
import { business } from "@/lib/site";
import { breadcrumbJsonLd, contactPageJsonLd } from "@/lib/seo";
import type { AppLocale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

type ContactPageProps = {
  locale: AppLocale;
};

export default async function ContactPage({ locale }: ContactPageProps) {
  const t = await getTranslations("Contact");

  return (
    <main className="bg-white px-4 pb-20 pt-28 text-black sm:px-6 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-36">
      <JsonLd
        data={[
          contactPageJsonLd(locale),
          breadcrumbJsonLd(locale, [
            { name: t("breadcrumb.home"), path: "" },
            { name: t("breadcrumb.current"), path: "/contact" },
          ]),
        ]}
      />

      <div className="mx-auto w-full max-w-3xl">
        <h1 className="font-afacad text-3xl font-semibold text-black sm:text-4xl lg:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-black/70 md:text-[18px]">
          {t("description")}
        </p>

        <section
          aria-labelledby="contact-methods"
          className="mt-10 space-y-6 rounded-2xl border border-black/10 bg-brand/[0.03] p-6 sm:p-8"
        >
          <h2 id="contact-methods" className="text-xl font-semibold">
            {t("methodsTitle")}
          </h2>

          <ul className="space-y-4 text-[16px] text-black/80">
            <li>
              <span className="block text-[13px] font-medium uppercase tracking-wide text-black/50">
                {t("phoneLabel")}
              </span>
              <a
                href={`tel:${business.phone}`}
                className="font-medium text-brand hover:underline"
              >
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <span className="block text-[13px] font-medium uppercase tracking-wide text-black/50">
                {t("emailLabel")}
              </span>
              <a
                href={`mailto:${business.email}`}
                className="font-medium text-brand hover:underline"
              >
                {business.email}
              </a>
            </li>
            <li>
              <span className="block text-[13px] font-medium uppercase tracking-wide text-black/50">
                WhatsApp
              </span>
              <a
                href={business.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand hover:underline"
              >
                {t("whatsappCta")}
              </a>
            </li>
            <li>
              <span className="block text-[13px] font-medium uppercase tracking-wide text-black/50">
                Facebook
              </span>
              <a
                href={business.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand hover:underline"
              >
                {t("facebookCta")}
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
