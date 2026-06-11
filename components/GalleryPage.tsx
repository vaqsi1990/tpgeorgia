import GalleryContent from "@/components/GalleryContent";
import { galleryImages } from "@/lib/gallery-images";
import { getTranslations } from "next-intl/server";

export default async function GalleryPage() {
  const t = await getTranslations("Gallery");

  const images = galleryImages.map((image) => ({
    ...image,
    alt: t("imageAlt", { number: image.id }),
  }));

  return (
    <main className="bg-white px-4 pb-20 pt-28 text-black sm:px-6 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-36">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-8 sm:mb-10">
          <h1 className="font-afacad text-3xl font-semibold text-black sm:text-4xl lg:text-5xl">
            {t("hero.title")}
          </h1>
          <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-black/70 md:text-[18px]">
            {t("hero.subtitle")}
          </p>
        </header>
        <GalleryContent images={images} />
      </div>
    </main>
  );
}
