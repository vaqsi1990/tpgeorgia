import {
  CATALOG_FALLBACK_IMAGES,
  getValidCatalogImages,
} from "@/lib/catalog-images";

type CatalogCardHeroImageProps = {
  images: string[];
  alt: string;
  index: number;
};

export default function CatalogCardHeroImage({
  images,
  alt,
  index,
}: CatalogCardHeroImageProps) {
  const validImages = getValidCatalogImages(images);
  const primary =
    validImages[0] ??
    CATALOG_FALLBACK_IMAGES[index % CATALOG_FALLBACK_IMAGES.length];
  const secondary = validImages[1];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
        <img
          src={primary}
          alt={alt}
          loading="lazy"
          className={`h-full w-full object-cover transition-opacity duration-700 ease-out ${
            secondary ? "group-hover:opacity-0" : ""
          }`}
        />
        {secondary ? (
          <img
            src={secondary}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
          />
        ) : null}
      </div>
    </div>
  );
}
