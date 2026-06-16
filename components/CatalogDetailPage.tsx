import CatalogDetailGallery from "@/components/CatalogDetailGallery";
import { getTourCoverImage } from "@/lib/catalog-images";
import { Link } from "@/i18n/navigation";

type MetaItem = {
  label: string;
  value: string;
};

type CatalogDetailPageProps = {
  backHref: string;
  backLabel: string;
  title: string;
  subtitle?: string;
  popularLabel?: string;
  isPopular?: boolean;
  meta: MetaItem[];
  images: string[];
  imageAlt: string;
  bookLabel: string;
  bookHref: string;
  children: React.ReactNode;
};

export default function CatalogDetailPage({
  backHref,
  backLabel,
  title,
  subtitle,
  popularLabel,
  isPopular = false,
  meta,
  images,
  imageAlt,
  bookLabel,
  bookHref,
  children,
}: CatalogDetailPageProps) {
  const galleryImages =
    images.filter((url) => url && url.trim() !== "").length > 0
      ? images.filter((url) => url && url.trim() !== "")
      : [getTourCoverImage([], 0)];

  const priceItem = meta.find((item) =>
    /₾|GEL|request|მოთხოვნ/i.test(item.value),
  );
  const sidebarMeta = priceItem
    ? meta.filter((item) => item !== priceItem)
    : meta;

  return (
    <div className="mx-auto w-full max-w-7xl">
      <Link
        href={backHref}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-[14px] font-medium text-black/70 shadow-[0_2px_12px_rgba(15,79,79,0.05)] transition-all hover:border-[#38ab8a]/30 hover:text-[#38ab8a] sm:mb-8 sm:text-[15px]"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {backLabel}
      </Link>

      <CatalogDetailGallery
        images={galleryImages}
        imageAlt={imageAlt}
        title={title}
        subtitle={subtitle}
        popularLabel={popularLabel}
        isPopular={isPopular}
      />

      <div className="mt-8 grid items-start gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-12">
        <div className="min-w-0 space-y-8">
          {meta.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:hidden">
              {meta.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-black/8 bg-white px-4 py-3 shadow-[0_4px_20px_rgba(15,79,79,0.05)]"
                >
                  <p className="text-[11px] font-medium uppercase tracking-wide text-black/50 sm:text-xs">
                    {item.label}
                  </p>
                  <p className="mt-1 text-[14px] font-semibold leading-snug text-black sm:text-[15px]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          <div className="rounded-[1.75rem] border border-black/8 bg-white p-5 shadow-[0_8px_40px_rgba(15,79,79,0.06)] sm:p-8 md:p-10">
            {children}
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-[1.75rem] border border-[#38ab8a]/20 bg-gradient-to-br from-white via-white to-[#38ab8a]/[0.06] shadow-[0_12px_48px_rgba(15,79,79,0.1)]">
            <div className="border-b border-[#38ab8a]/15 bg-[#38ab8a]/[0.08] px-5 py-4 sm:px-6">
              {priceItem ? (
                <p className="font-afacad text-2xl font-semibold text-[#0f4f4f] sm:text-[28px]">
                  {priceItem.value}
                </p>
              ) : null}
            </div>

            {sidebarMeta.length > 0 ? (
              <dl className="divide-y divide-black/6 px-5 sm:px-6">
                {sidebarMeta.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-3 py-3.5"
                  >
                    <dt className="text-[14px] md:text-[16px] text-black">{item.label}</dt>
                    <dd className="text-right text-[14px] font-semibold text-black sm:text-[15px]">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <div className="p-5 sm:p-6">
              <Link
                href={bookHref}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#38ab8a] py-3.5 text-[16px] md:text-[18px] font-medium text-white shadow-[0_4px_20px_rgba(56,171,138,0.35)] transition-all hover:bg-[#2f9a7c] hover:shadow-[0_6px_28px_rgba(56,171,138,0.4)]"
              >
                {bookLabel}
                <svg
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
