"use client";

import { useEffect, useMemo, useState } from "react";
import { resolveImageUrl } from "@/lib/images";
import { filterDisplayableProductImages } from "@/lib/product-images";

const ROTATE_MS = 4000;

/**
 * Auto-rotates through a product's gallery images on listing cards.
 * Pauses while hovered; only advances when the card is on-screen.
 * Broken / placeholder images are skipped so the pumpkin fallback never appears.
 */
export function ProductImageRotator({
  images,
  alt,
  className = "",
  /** Stable seed so neighboring cards don't all flip at the same time. */
  staggerKey = "",
}: {
  images: string[];
  alt: string;
  className?: string;
  staggerKey?: string;
}) {
  const resolved = useMemo(() => {
    const cdn =
      (typeof process !== "undefined" && process.env.NEXT_PUBLIC_CDN_URL?.replace(/\/$/, "")) ||
      "https://d2lfdzx32wxe94.cloudfront.net";
    return filterDisplayableProductImages(
      images.map((src) => {
        const resolvedUrl = resolveImageUrl(src);
        if (resolvedUrl.startsWith("/uploads/")) return `${cdn}${resolvedUrl}`;
        return resolvedUrl;
      })
    );
  }, [images]);
  const [broken, setBroken] = useState<Record<string, true>>({});
  const urls = useMemo(() => resolved.filter((src) => !broken[src]), [resolved, broken]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [root, setRoot] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setBroken({});
    setIndex(0);
  }, [images]);

  useEffect(() => {
    if (urls.length === 0) return;
    if (index >= urls.length) setIndex(0);
  }, [index, urls.length]);

  useEffect(() => {
    if (!root || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { rootMargin: "80px", threshold: 0.15 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [root]);

  useEffect(() => {
    if (urls.length <= 1 || paused || !visible) return;

    let hash = 0;
    for (let i = 0; i < staggerKey.length; i++) hash = (hash + staggerKey.charCodeAt(i) * (i + 1)) % 900;
    const delay = ROTATE_MS + hash;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % urls.length);
    }, delay);
    return () => window.clearInterval(id);
  }, [urls.length, paused, visible, staggerKey]);

  if (urls.length === 0) {
    return (
      <div className={`flex items-center justify-center bg-slate-50 text-slate-400 text-sm ${className}`}>
        No image
      </div>
    );
  }

  const safeIndex = Math.min(index, urls.length - 1);

  return (
    <div
      ref={setRoot}
      className={`relative overflow-hidden bg-slate-50 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {urls.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${src}-${i}`}
          src={src}
          alt={i === 0 ? alt : ""}
          aria-hidden={i !== safeIndex}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out ${
            i === safeIndex ? "opacity-100" : "opacity-0"
          }`}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          onError={() => setBroken((prev) => (prev[src] ? prev : { ...prev, [src]: true }))}
        />
      ))}
      {urls.length > 1 && (
        <div className="absolute bottom-2 left-1/2 z-[1] flex -translate-x-1/2 gap-1" aria-hidden>
          {urls.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === safeIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
