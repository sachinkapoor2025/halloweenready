/** CloudFront distribution for product/media images (halloweenready-prod stack). */
export const DEFAULT_PRODUCT_CDN = "https://d2lfdzx32wxe94.cloudfront.net";

function decodeUrlEntities(url: string): string {
  return url
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&amp;/g, "&");
}

export function getProductCdnBase(cdnBase?: string): string {
  const fromArg = cdnBase?.trim();
  if (fromArg) return fromArg.replace(/\/$/, "");

  const fromEnv =
    process.env.NEXT_PUBLIC_CDN_URL?.trim() ||
    process.env.CDN_URL?.trim() ||
    (process.env.CLOUDFRONT_DOMAIN
      ? `https://${process.env.CLOUDFRONT_DOMAIN.replace(/^https?:\/\//, "").replace(/\/$/, "")}`
      : "");

  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return DEFAULT_PRODUCT_CDN;
}

/** Static path served from apps/web/public/uploads (Amplify). */
export function staticUploadUrl(relativePath: string): string {
  const clean = decodeUrlEntities(relativePath).replace(/^\/+/, "");
  return `/uploads/${clean}`;
}

/** Build a CDN URL from a path under wp-content/uploads (e.g. 2026/03/photo.jpg). */
export function cdnUploadUrl(relativePath: string, cdnBase?: string): string {
  const clean = decodeUrlEntities(relativePath).replace(/^\/+/, "");
  return `${getProductCdnBase(cdnBase)}/uploads/${clean}`;
}

function imageDeliveryMode(): "static" | "cdn" {
  const mode = (process.env.NEXT_PUBLIC_IMAGE_MODE ?? "static").trim().toLowerCase();
  return mode === "cdn" ? "cdn" : "static";
}

/**
 * Rewrite legacy WordPress / CloudFront paths to a working URL.
 * Default `static` → /uploads/... on Amplify (public/uploads). Use IMAGE_MODE=cdn after S3 is populated.
 */
export function resolveProductImageUrl(url: string | undefined | null, cdnBase?: string): string {
  if (!url) return "";
  const trimmed = decodeUrlEntities(url.trim());
  if (!trimmed) return "";

  if (trimmed.startsWith("/uploads/")) return trimmed;

  const cdn = getProductCdnBase(cdnBase);
  if (trimmed.startsWith(cdn)) {
    const rel = trimmed.slice(cdn.length).replace(/^\/uploads\//, "");
    return imageDeliveryMode() === "static" ? staticUploadUrl(rel) : trimmed;
  }

  const uploadsMatch = trimmed.match(/(?:cloudfront\.net\/uploads|wp-content\/uploads)\/(.+)$/i);
  if (uploadsMatch) {
    const rel = uploadsMatch[1];
    return imageDeliveryMode() === "static" ? staticUploadUrl(rel) : cdnUploadUrl(rel, cdn);
  }

  return trimmed.replace(/^http:\/\//i, "https://");
}

export function resolveProductImageUrls(
  urls: string[] | undefined | null,
  cdnBase?: string
): string[] {
  if (!urls?.length) return [];
  return urls.map((u) => resolveProductImageUrl(u, cdnBase)).filter(Boolean);
}

/** Extract path after uploads/ from any known product image URL. */
export function uploadsRelativePath(url: string): string | null {
  const m = decodeUrlEntities(url.trim()).match(/(?:cloudfront\.net\/uploads|wp-content\/uploads|\/uploads)\/(.+)$/i);
  return m ? m[1] : null;
}

/** WooCommerce Amazon-import filenames — copyrighted product photos; do not fetch or hotlink. */
export function isAmazonImportedFilename(filename: string): boolean {
  return /^imgi_/i.test(filename);
}
