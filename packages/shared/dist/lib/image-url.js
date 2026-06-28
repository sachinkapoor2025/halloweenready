"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PRODUCT_CDN = void 0;
exports.getProductCdnBase = getProductCdnBase;
exports.cdnUploadUrl = cdnUploadUrl;
exports.resolveProductImageUrl = resolveProductImageUrl;
exports.resolveProductImageUrls = resolveProductImageUrls;
/** CloudFront distribution for product/media images (halloweenready-prod stack). */
exports.DEFAULT_PRODUCT_CDN = "https://d2lfdzx32wxe94.cloudfront.net";
function decodeUrlEntities(url) {
    return url
        .replace(/&#8211;/g, "–")
        .replace(/&#8212;/g, "—")
        .replace(/&amp;/g, "&");
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
    const clean = decodeUrlEntities(relativePath).replace(/^\/+/, "");
    return `${getProductCdnBase(cdnBase)}/uploads/${clean}`;
}
/**
 * Rewrite legacy WordPress media URLs to the S3/CloudFront CDN.
 * WordPress is no longer hosted on halloweenready.com — wp-content paths 404 there.
 */
function resolveProductImageUrl(url, cdnBase) {
    if (!url)
        return "";
    const trimmed = decodeUrlEntities(url.trim());
    if (!trimmed)
        return "";
    const cdn = getProductCdnBase(cdnBase);
    if (trimmed.startsWith(cdn))
        return trimmed;
    const uploadsMatch = trimmed.match(/(?:cloudfront\.net\/uploads|wp-content\/uploads)\/(.+)$/i);
    if (uploadsMatch)
        return cdnUploadUrl(uploadsMatch[1], cdn);
    return trimmed.replace(/^http:\/\//i, "https://");
}
function resolveProductImageUrls(urls, cdnBase) {
    if (!urls?.length)
        return [];
    return urls.map((u) => resolveProductImageUrl(u, cdnBase)).filter(Boolean);
}
