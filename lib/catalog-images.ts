export const CATALOG_FALLBACK_IMAGES = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
] as const;

export function getValidCatalogImages(images: string[]): string[] {
  return images.filter((url) => url && url.trim() !== "");
}

export function getTourCoverImage(images: string[], index: number): string {
  const validImages = getValidCatalogImages(images);
  return (
    validImages[0] ?? CATALOG_FALLBACK_IMAGES[index % CATALOG_FALLBACK_IMAGES.length]
  );
}
