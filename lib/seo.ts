import type { Metadata } from "next";
import {
  business,
  getSiteUrl,
  hreflangMap,
  localizedUrl,
  siteName,
  type PublicPath,
} from "@/lib/site";
import type { AppLocale } from "@/i18n/routing";

const defaultOgImage = "/images/1.png";

type PageMetadataInput = {
  locale: AppLocale;
  pathname: PublicPath;
  title: string;
  description: string;
  ogImage?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
  ogImage = defaultOgImage,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonical = localizedUrl(locale, pathname);
  const imageUrl = ogImage.startsWith("http")
    ? ogImage
    : `${getSiteUrl()}${ogImage}`;

  const resolvedTitle = title.includes(`| ${siteName}`)
    ? { absolute: title }
    : title;
  const socialTitle =
    typeof resolvedTitle === "string" ? resolvedTitle : title;

  return {
    title: resolvedTitle,
    description,
    alternates: {
      canonical,
      languages: hreflangMap(pathname),
    },
    openGraph: {
      type: "website",
      locale,
      url: canonical,
      siteName,
      title: socialTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function organizationJsonLd(locale: AppLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${getSiteUrl()}/#organization`,
    name: business.name,
    url: localizedUrl(locale, ""),
    logo: `${getSiteUrl()}/images/logo.png`,
    image: `${getSiteUrl()}${defaultOgImage}`,
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      addressCountry: business.address.country,
    },
    sameAs: [business.facebook, business.whatsapp],
    areaServed: {
      "@type": "Country",
      name: "Georgia",
    },
  };
}

export function websiteJsonLd(locale: AppLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl()}/#website`,
    name: siteName,
    url: localizedUrl(locale, ""),
    publisher: {
      "@id": `${getSiteUrl()}/#organization`,
    },
    inLanguage: locale,
  };
}

type BreadcrumbItem = {
  name: string;
  path: PublicPath;
};

export function breadcrumbJsonLd(locale: AppLocale, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: localizedUrl(locale, item.path),
    })),
  };
}
