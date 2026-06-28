import { resolveProductImageUrl, resolveProductImageUrls } from "@halloweenready/shared";
import { getCdnUrl } from "./env";

export const PRODUCT_IMAGE_FALLBACK = "/product-fallback.svg";

/** Map legacy WordPress media URLs to the S3/CloudFront CDN mirror. */
export function resolveImageUrl(url: string | undefined | null): string {
  return resolveProductImageUrl(url, getCdnUrl());
}

export function resolveImageUrls(urls: string[] | undefined | null): string[] {
  return resolveProductImageUrls(urls, getCdnUrl());
}
