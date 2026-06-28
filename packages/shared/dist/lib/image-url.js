"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PRODUCT_CDN = void 0;
exports.getProductCdnBase = getProductCdnBase;
exports.cdnUploadUrl = cdnUploadUrl;
exports.resolveProductImageUrl = resolveProductImageUrl;
exports.resolveProductImageUrls = resolveProductImageUrls;
/** CloudFront distribution for product/media images (halloweenready-prod stack). */
exports.DEFAULT_PRODUCT_CDN = "https://d2lfdzx32wxe94.cloudfront.net";
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
    const clean = relativePath.replace(/^\/+/, "");
    return `${getProductCdnBase(cdnBase)}/uploads/${clean}`;
}
/** Resolve product image URLs for display. */
function resolveProductImageUrl(url, cdnBase) {
    if (!url)
        return "";
    const trimmed = url.trim();
    if (!trimmed)
        return "";
    // Serve live WordPress media directly — CDN mirror may not contain every asset yet.
    if (/halloweenready\.com\/wp-content\/uploads/i.test(trimmed)) {
        return trimmed.replace(/^http:\/\//i, "https://");
    }
    const cdn = getProductCdnBase(cdnBase);
    if (trimmed.startsWith(cdn))
        return trimmed;
    const uploadsMatch = trimmed.match(/\/wp-content\/uploads\/(.+)$/i);
    if (uploadsMatch)
        return cdnUploadUrl(uploadsMatch[1], cdn);
    return trimmed;
}
function resolveProductImageUrls(urls, cdnBase) {
    if (!urls?.length)
        return [];
    return urls.map((u) => resolveProductImageUrl(u, cdnBase)).filter(Boolean);
}
