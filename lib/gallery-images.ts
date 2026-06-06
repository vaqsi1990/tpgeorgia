const galleryFilenames = [
  "WhatsApp Image 2026-06-06 at 3.58.53 PM.jpeg",
  "WhatsApp Image 2026-06-06 at 3.58.53 PM (1).jpeg",
  "WhatsApp Image 2026-06-06 at 3.58.53 PM (2).jpeg",
  "WhatsApp Image 2026-06-06 at 4.00.33 PM.jpeg",
  "WhatsApp Image 2026-06-06 at 4.00.33 PM (1).jpeg",
  "WhatsApp Image 2026-06-06 at 4.00.33 PM (2).jpeg",
  "WhatsApp Image 2026-06-06 at 4.00.33 PM (3).jpeg",
  "WhatsApp Image 2026-06-06 at 4.00.33 PM (4).jpeg",
  "WhatsApp Image 2026-06-06 at 4.00.33 PM (5).jpeg",
  "WhatsApp Image 2026-06-06 at 4.00.33 PM (6).jpeg",
  "WhatsApp Image 2026-06-06 at 4.00.33 PM (7).jpeg",
  "WhatsApp Image 2026-06-06 at 4.00.33 PM (8).jpeg",
  "WhatsApp Image 2026-06-06 at 4.00.34 PM.jpeg",
  "WhatsApp Image 2026-06-06 at 4.00.34 PM (1).jpeg",
  "WhatsApp Image 2026-06-06 at 4.00.34 PM (2).jpeg",
  "WhatsApp Image 2026-06-06 at 4.00.34 PM (3).jpeg",
  "WhatsApp Image 2026-06-06 at 4.00.34 PM (4).jpeg",
  "WhatsApp Image 2026-06-06 at 4.00.34 PM (5).jpeg",
  "WhatsApp Image 2026-06-06 at 4.00.35 PM.jpeg",
  "WhatsApp Image 2026-06-06 at 4.00.35 PM (1).jpeg",
  "WhatsApp Image 2026-06-06 at 4.00.35 PM (2).jpeg",
  "WhatsApp Image 2026-06-06 at 4.00.35 PM (3).jpeg",
] as const;

export function galleryImagePath(filename: string) {
  return `/gallery/${encodeURIComponent(filename)}`;
}

export const galleryImages = galleryFilenames.map((filename, index) => ({
  id: index + 1,
  src: galleryImagePath(filename),
}));
