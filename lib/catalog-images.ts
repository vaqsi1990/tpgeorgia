export const CATALOG_FALLBACK_IMAGES = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
] as const;

export function getTourCoverImage(images: string[], index: number): string {
  const cover = images.find((url) => url && url.trim() !== "");
  return cover ?? CATALOG_FALLBACK_IMAGES[index % CATALOG_FALLBACK_IMAGES.length];
}
