
"use client";

import { UploadButton } from "@/utils/uploadthing";
import { useState, useEffect } from "react";
import ImageModal from "./ImageModal";
import { X } from "lucide-react";


const MAX_IMAGES = 10;

type ImageUploadProps = {
  onChange: (urls: string[]) => void;
  value: string[];
};

const ImageUploadForProduct = ({ onChange, value }: ImageUploadProps): React.JSX.Element => {
  const [imageUrls, setImageUrls] = useState<string[]>(value || []);
  const [uploadError, setUploadError] = useState("");
 
  // Update local state when value prop changes
  useEffect(() => {
    setImageUrls(value || []);
  }, [value]);

  const handleUploadComplete = (res: { url: string }[]) => {
    setUploadError("");
    const urls = res.map((file) => file.url).filter(Boolean);
    const newUrls = [...imageUrls, ...urls].slice(0, MAX_IMAGES);
    setImageUrls(newUrls);
    onChange(newUrls);
  };

  const handleDeleteImage = (indexToDelete: number) => {
    const filteredUrls = imageUrls.filter((_, index) => index !== indexToDelete);
    setImageUrls(filteredUrls);
    onChange(filteredUrls);
  };

  const validImageUrls = imageUrls.filter(url => url && typeof url === 'string' && url.trim() !== '');

  // Create a map of valid URLs to their original indices
  const urlToIndexMap = new Map<string, number>();
  imageUrls.forEach((url, index) => {
    if (url && typeof url === 'string' && url.trim() !== '') {
      urlToIndexMap.set(url, index);
    }
  });

  return (
    <div className="rounded  p-2">
      {imageUrls.length < MAX_IMAGES ? (
        <UploadButton
          className="w-full"
          endpoint="imageUploader"
          onClientUploadComplete={handleUploadComplete}
          onUploadError={(error) =>
            setUploadError(
              error.message.includes("Failed to fetch")
                ? "ატვირთვა ვერ მოხერხდა. გამორთეთ ანტივირუსის/ბრაუზერის გაფართოების ბლოკი ან სცადეთ ხელახლა."
                : error.message,
            )
          }
          content={{
            button: "სურათების ატვირთვა",
            allowedContent: `PNG, JPG, WebP (მაქს. 16MB, კიდევ ${MAX_IMAGES - imageUrls.length})`,
          }}
          appearance={{
            container: "w-full",
            button:
              "w-full min-w-[280px] whitespace-nowrap bg-[#38ab8a] px-8 py-3 text-center text-[16px] font-bold text-white hover:opacity-90 ut-ready:bg-[#38ab8a] ut-uploading:bg-[#38ab8a]/80 md:text-[18px]",
            allowedContent: "mt-2 text-[16px] text-black",
          }}
        />
      ) : (
        <p className="text-[14px] text-black/55">მაქსიმუმ {MAX_IMAGES} სურათი ატვირთულია.</p>
      )}

      {uploadError ? (
        <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
          {uploadError}
        </p>
      ) : null}

      {validImageUrls.length > 0 ? (
        <div className="mt-4 space-y-2">
          <h2 className="text-sm font-semibold text-black">ატვირთული სურათები ({validImageUrls.length})</h2>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
            {validImageUrls.map((url, displayIndex) => {
              const originalIndex = urlToIndexMap.get(url) ?? displayIndex;
              return (
                <div key={`${url}-${originalIndex}`} className="relative group">
                  <ImageModal  
                    src={url}
                    alt={`ატვირთული ${displayIndex + 1}`}
                    className="rounded border border-gray-500 items-center h-[320px] object-cover w-full"
                  />
                  <button
                    onClick={() => handleDeleteImage(originalIndex)}
                    className="absolute cursor-pointer top-2 right-2 bg-black hover:bg-black text-white rounded-full w-8 h-8 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-lg z-10"
                    type="button"
                    aria-label="სურათის წაშლა"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="mt-1 text-gray-400 text-sm text-center">სურათები ჯერ არ არის ატვირთული. შეგიძლიათ რამდენიმე სურათი ერთდროულად ატვირთოთ (Ctrl+Click ან Shift+Click).</p>
      )}
    </div>
  );
};

export default ImageUploadForProduct;
