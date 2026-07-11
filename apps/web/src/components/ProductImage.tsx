"use client";

import { useCallback, useState } from "react";
import { resolveImageUrl } from "@/lib/images";
import { isPlaceholderProductImage } from "@/lib/product-images";

type ProductImageProps = {
  src: string | undefined | null;
  alt: string;
  className?: string;
};

/** Product thumbnail — never shows the pumpkin placeholder graphic. */
export function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  const initial = !isPlaceholderProductImage(src) ? resolveImageUrl(src) : "";
  const [failed, setFailed] = useState(!initial);

  const handleLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth <= 8 && img.naturalHeight <= 8) setFailed(true);
  }, []);

  if (failed || !initial) {
    return (
      <div className={`flex items-center justify-center bg-slate-50 text-slate-400 text-sm ${className}`}>
        No image
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={initial}
      alt={alt}
      className={className}
      onLoad={handleLoad}
      onError={() => setFailed(true)}
    />
  );
}
