import NextImage, { type ImageProps } from "next/image";

/** Next.js Image optimization quality (1–100). */
export const IMAGE_QUALITY = 100;
export const PRODUCT_IMAGE_QUALITY = IMAGE_QUALITY;
export const UPLOAD_PREVIEW_QUALITY = IMAGE_QUALITY;

export default function Image({ quality, ...props }: ImageProps) {
  return <NextImage {...props} quality={quality ?? IMAGE_QUALITY} />;
}

export type { ImageProps };
