"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PRODUCT_CDN = void 0;
exports.getProductCdnBase = getProductCdnBase;
exports.cdnUploadUrl = cdnUploadUrl;
exports.resolveProductImageUrl = resolveProductImageUrl;
exports.resolveProductImageUrls = resolveProductImageUrls;
/** CloudFront distribution for product/media images (halloweenready-prod stack). */
exports.DEFAULT_PRODUCT_CDN = "https://d2lfdzx32wxe94.cloudfront.net";
const WORDPRESS_UPLOADS_BASE = "https://halloweenready.com/wp-content/uploads/";
function decodeUrlEntities(url) {
    return url
        .replace(/&#8211;/g, "–")
        .replace(/&#8212;/g, "—")
        .replace(/&amp;/g, "&");
}
/** Normalize any uploads path to the live WordPress CDN (CloudFront mirror returns 403). */
function toWordPressUploadUrl(pathAfterUploads) {
    const clean = decodeUrlEntities(pathAfterUploads).replace(/^\/+/, "");
    return `${WORDPRESS_UPLOADS_BASE}${clean}`;
}
function getProductCdnBase(cdnBase) {
    const fromArg = cdnBase?.trim();
    if (fromArg)
        return fromArg.replace(/\/$/, "");
    const fromEnv = process.env.NEXT_PUBLIC_CDN_URL?.trim() ||
        process.env.CDN_URL?.trim() ||
        (process.env.CLOUDFRONT_DOMAIN
            ? `https://${process.env.CLOUDFRONT_DOMAIN.replace(/^https?:\/\//, "").replace(/\/$/, "")}`
            : "");
    if (fromEnv)
        return fromEnv.replace(/\/$/, "");
    return exports.DEFAULT_PRODUCT_CDN;
}
/** Build a CDN URL from a path under wp-content/uploads (e.g. 2026/03/photo.jpg). */
function cdnUploadUrl(relativePath, cdnBase) {
    return toWordPressUploadUrl(relativePath);
}
/** Resolve product image URLs for display — always prefer live halloweenready.com media. */
function resolveProductImageUrl(url, _cdnBase) {
    if (!url)
        return "";
    const trimmed = decodeUrlEntities(url.trim());
    if (!trimmed)
        return "";
    if (/halloweenready\.com\/wp-content\/uploads\//i.test(trimmed)) {
        return trimmed.replace(/^http:\/\//i, "https://");
    }
    const uploadsMatch = trimmed.match(/(?:cloudfront\.net\/uploads|wp-content\/uploads)\/(.+)$/i);
    if (uploadsMatch) {
        return toWordPressUploadUrl(uploadsMatch[1]);
    }
    return trimmed.replace(/^http:\/\//i, "https://");
}
function resolveProductImageUrls(urls, cdnBase) {
    if (!urls?.length)
        return [];
    return urls.map((u) => resolveProductImageUrl(u, cdnBase)).filter(Boolean);
}
