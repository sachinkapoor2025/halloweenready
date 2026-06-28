"use client";

import { useCallback, useState } from "react";
import { PRODUCT_IMAGE_FALLBACK, resolveImageUrl } from "@/lib/images";

type ProductImageProps = {
  src: string | undefined | null;
  alt: string;
  className?: string;
};

/** Product thumbnail with fallback when CDN/static file is missing or a 1×1 placeholder. */
export function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  const [displaySrc, setDisplaySrc] = useState(() => resolveImageUrl(src) || PRODUCT_IMAGE_FALLBACK);

  const useFallback = useCallback(() => {
    setDisplaySrc(PRODUCT_IMAGE_FALLBACK);
  }, []);

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      if (img.naturalWidth <= 8 && img.naturalHeight <= 8) {
        useFallback();
      }
    },
    [useFallback]
  );

  if (!src && displaySrc === PRODUCT_IMAGE_FALLBACK) {
    return (
      <div className={`flex items-center justify-center bg-slate-50 text-slate-400 text-sm ${className}`}>
        No image
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={displaySrc}
      alt={alt}
      className={className}
      onLoad={handleLoad}
      onError={useFallback}
    />
  );
}
