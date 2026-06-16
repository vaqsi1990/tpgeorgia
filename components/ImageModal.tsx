"use client";

import { useState } from "react";

interface ImageModalProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageModal({
  src,
  alt,
  className = "",
}: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`cursor-pointer transition-transform hover:scale-105 ${className}`}
        onClick={() => setIsOpen(true)}
      />

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/50 text-3xl font-bold text-white hover:text-gray-300"
              aria-label="დახურვა"
            >
              ✕
            </button>

            <img
              src={src}
              alt={alt}
              className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
