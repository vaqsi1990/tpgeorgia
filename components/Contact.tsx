import ContactForm, { type ContactCatalogOption } from "@/components/ContactForm";
import ParallaxSection from "@/components/ParallaxSection";
import SectionHeader from "@/components/SectionHeader";
import type { AppLocale } from "@/i18n/routing";
import { listExcursions, listTours } from "@/lib/catalog-db";
import { business } from "@/lib/site";
import { getLocale, getTranslations } from "next-intl/server";

function mapCatalogOptions(
  records: { id: string; content: Record<AppLocale, { title: string }> }[],
  locale: AppLocale,
): ContactCatalogOption[] {
  return records
    .map((record) => ({
      id: record.id,
      title:
        record.content[locale]?.title?.trim() ||
        record.content.ka?.title?.trim() ||
        record.id,
    }))
    .sort((a, b) => a.title.localeCompare(b.title, locale));
}

export default async function Contact() {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("Contact");
  const [tours, excursions] = await Promise.all([listTours(), listExcursions()]);

  return (
    <ParallaxSection
      id="contact"
      tone="mint"
      className="bg-white px-4 pb-20 text-black bg-white sm:px-6 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader title={t("title")} description={t("description")} />

        <div className="grid gap-10 lg:grid-cols-[minmax(240px,300px)_1fr] lg:items-start lg:gap-12">
          <aside className="space-y-6 rounded-2xl border border-black/10 bg-brand/[0.03] p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-black">{t("methodsTitle")}</h2>
            <ul className="space-y-4 text-[15px] text-black/80">
              <li>
                <span className="block text-[16px] font-medium uppercase tracking-wide text-black">
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
                <span className="block text-[16px] font-medium uppercase tracking-wide text-black">
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
          </aside>

          <div className="rounded-2xl border border-black/10 bg-brand/[0.02] p-5 sm:p-6 lg:p-8">
            <ContactForm
              tours={mapCatalogOptions(tours, locale)}
              excursions={mapCatalogOptions(excursions, locale)}
            />
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
}
