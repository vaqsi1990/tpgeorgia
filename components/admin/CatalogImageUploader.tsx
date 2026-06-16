"use client";

import { AdminField } from "@/components/admin/AdminField";
import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

const MAX_IMAGES = 10;

type CatalogImageUploaderProps = {
  images: string[];
  onChange: (images: string[]) => void;
  label?: string;
  hint?: string;
};

export default function CatalogImageUploader({
  images,
  onChange,
  label = "სურათები",
  hint = "ატვირთეთ სურათები (მაქს. 10). პირველი სურათი გამოჩნდება ბარათზე.",
}: CatalogImageUploaderProps) {
  const remaining = MAX_IMAGES - images.length;

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <AdminField label={label} hint={hint}>
      {images.length > 0 ? (
        <ul className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((src, index) => (
            <li
              key={`${src}-${index}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-black/10"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 200px"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
                aria-label="სურათის წაშლა"
              >
                <X className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {remaining > 0 ? (
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            const urls = res.map((file) => file.url);
            onChange([...images, ...urls].slice(0, MAX_IMAGES));
          }}
          onUploadError={(error) => {
            alert(error.message);
          }}
          className="rounded-xl border border-dashed border-black/15 bg-black/[0.02] px-4 py-8 ut-uploading:opacity-60"
          appearance={{
            container: "w-full",
            uploadIcon: "text-[#38ab8a]",
            label: "text-[15px] font-medium text-black/80",
            allowedContent: "text-[13px] text-black/55",
            button:
              "rounded-xl bg-[#38ab8a] px-4 py-2 text-[14px] font-medium text-white ut-ready:bg-[#38ab8a] ut-uploading:cursor-not-allowed",
          }}
          content={{
            label: "გადაიტანეთ სურათები აქ ან დააჭირეთ ასატვირთად",
            allowedContent: `PNG, JPG ან WEBP (მაქს. 16MB, კიდევ ${remaining})`,
          }}
        />
      ) : (
        <p className="text-[14px] text-black/55">
          მაქსიმუმ {MAX_IMAGES} სურათი ატვირთულია.
        </p>
      )}
    </AdminField>
  );
}
