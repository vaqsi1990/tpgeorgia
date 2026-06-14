"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type MetaItem = {
  label: string;
  value: string;
};

type CatalogDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  closeLabel: string;
  title: string;
  subtitle?: string;
  popularLabel?: string;
  isPopular?: boolean;
  meta?: MetaItem[];
  children: React.ReactNode;
};

export default function CatalogDetailModal({
  isOpen,
  onClose,
  closeLabel,
  title,
  subtitle,
  popularLabel,
  isPopular = false,
  meta = [],
  children,
}: CatalogDetailModalProps) {
  const [mounted, setMounted] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-center px-4 pb-4 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-label={closeLabel}
            tabIndex={-1}
          />

          <motion.div
            className="relative z-10 flex h-[min(88dvh,820px)] w-full max-w-3xl flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_32px_96px_rgba(15,79,79,0.35)] sm:h-[min(82dvh,780px)]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 28 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative  shrink-0 border-b border-white/10 bg-gradient-to-br from-[#38ab8a] via-[#2d9476] to-[#0f4f4f] px-5 pb-5 pt-5 sm:px-7 sm:pb-6 sm:pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1 pr-2">
                  {isPopular && popularLabel ? (
                    <span className="mb-2 inline-flex rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-black">
                      {popularLabel}
                    </span>
                  ) : null}
                  <h2 className="font-afacad md:text-[25px] text-[20px] font-semibold leading-tight text-white sm:text-[2rem]">
                    {title}
                  </h2>
                  {subtitle ? (
                    <p className="mt-1.5 text-[15px] font-medium text-white/85 sm:text-base">
                      {subtitle}
                    </p>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
                  aria-label={closeLabel}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {meta.length > 0 ? (
                <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {meta.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl bg-white/12 px-3 py-2.5 backdrop-blur-[2px]"
                    >
                      <dt className="text-[11px] font-medium uppercase tracking-wide text-white/65 sm:text-xs">
                        {item.label}
                      </dt>
                      <dd className="mt-0.5 text-[14px] font-semibold leading-snug text-white sm:text-[15px]">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>

            <div className="catalog-modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
