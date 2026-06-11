import JsonLd from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import type { AppLocale } from "@/i18n/routing";

type SiteJsonLdProps = {
  locale: AppLocale;
};

export default function SiteJsonLd({ locale }: SiteJsonLdProps) {
  return (
    <>
      <JsonLd data={organizationJsonLd(locale)} />
      <JsonLd data={websiteJsonLd(locale)} />
    </>
  );
}
