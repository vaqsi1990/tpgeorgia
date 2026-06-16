import type { OurFileRouter } from "@/app/api/uploadthing/core";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

function requestUrl(input: RequestInfo | URL): string {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.toString();
  return input.url;
}

function isLocalUploadthingApi(href: string): boolean {
  if (href.startsWith("/api/uploadthing")) return true;

  if (typeof window === "undefined") return false;

  try {
    const url = new URL(href, window.location.origin);
    return (
      url.origin === window.location.origin &&
      url.pathname.startsWith("/api/uploadthing")
    );
  } catch {
    return false;
  }
}

const uploadthingFetch: typeof fetch = (input, init) => {
  const href = requestUrl(input);

  if (isLocalUploadthingApi(href)) {
    return fetch(input, {
      ...init,
      credentials: "include",
    });
  }

  return fetch(input, init);
};

export const UploadButton = generateUploadButton<OurFileRouter>({
  fetch: uploadthingFetch,
});

export const UploadDropzone = generateUploadDropzone<OurFileRouter>({
  fetch: uploadthingFetch,
});
