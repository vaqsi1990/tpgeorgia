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
        <GalleryContent images={images} />
      </div>
    </main>
  );
}
