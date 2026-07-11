"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PRODUCT_CDN = void 0;
exports.getProductCdnBase = getProductCdnBase;
exports.staticUploadUrl = staticUploadUrl;
exports.cdnUploadUrl = cdnUploadUrl;
exports.resolveProductImageUrl = resolveProductImageUrl;
exports.resolveProductImageUrls = resolveProductImageUrls;
exports.uploadsRelativePath = uploadsRelativePath;
exports.isAmazonImportedFilename = isAmazonImportedFilename;
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
/** Static path served from apps/web/public/uploads (Amplify). */
function staticUploadUrl(relativePath) {
    const clean = decodeUrlEntities(relativePath).replace(/^\/+/, "");
    return `/uploads/${clean}`;
}
/** Build a CDN URL from a path under wp-content/uploads (e.g. 2026/03/photo.jpg). */
function cdnUploadUrl(relativePath, cdnBase) {
    const clean = decodeUrlEntities(relativePath).replace(/^\/+/, "");
    return `${getProductCdnBase(cdnBase)}/uploads/${clean}`;
}
function imageDeliveryMode() {
    const mode = (process.env.NEXT_PUBLIC_IMAGE_MODE ?? "static").trim().toLowerCase();
    return mode === "cdn" ? "cdn" : "static";
}
/** Admin portal uploads are stored at S3/CloudFront `products/<slug>/<uuid>.ext`. */
function isAdminProductsPath(pathname) {
    return /^\/?(?:uploads\/)?products\//i.test(pathname);
}
/**
 * Rewrite legacy WordPress / CloudFront paths to a working URL.
 * Default `static` → /uploads/... on Amplify (public/uploads). Use IMAGE_MODE=cdn after S3 is populated.
 *
 * Admin uploads under `/products/` always stay on the CDN — they are not mirrored into Amplify public/uploads.
 */
function resolveProductImageUrl(url, cdnBase) {
    if (!url)
        return "";
    const trimmed = decodeUrlEntities(url.trim());
    if (!trimmed)
        return "";
    const cdn = getProductCdnBase(cdnBase);
    // Relative path already rewritten to Amplify static hosting
    if (trimmed.startsWith("/uploads/")) {
        // Mistakenly rewritten admin upload → restore CDN URL
        if (isAdminProductsPath(trimmed)) {
            return `${cdn}${trimmed.replace(/^\/uploads/, "")}`;
        }
        return trimmed;
    }
    if (trimmed.startsWith(cdn)) {
        const path = trimmed.slice(cdn.length);
        // Keep live admin/S3 product uploads on CloudFront
        if (isAdminProductsPath(path))
            return trimmed;
        const rel = path.replace(/^\/uploads\//, "");
        return imageDeliveryMode() === "static" ? staticUploadUrl(rel) : trimmed;
    }
    // Absolute URL pointing at admin upload key on any host → canonicalize to CDN
    try {
        const parsed = new URL(trimmed);
        if (isAdminProductsPath(parsed.pathname)) {
            return `${cdn}${parsed.pathname}`;
        }
    }
    catch {
        // relative / non-URL — fall through
    }
    const uploadsMatch = trimmed.match(/(?:cloudfront\.net\/uploads|wp-content\/uploads)\/(.+)$/i);
    if (uploadsMatch) {
        const rel = uploadsMatch[1];
        // Nested admin keys should not go through static Amplify
        if (isAdminProductsPath(`uploads/${rel}`) || /^products\//i.test(rel)) {
            return `${cdn}/${rel.replace(/^uploads\//i, "")}`;
        }
        return imageDeliveryMode() === "static" ? staticUploadUrl(rel) : cdnUploadUrl(rel, cdn);
    }
    return trimmed.replace(/^http:\/\//i, "https://");
}
function resolveProductImageUrls(urls, cdnBase) {
    if (!urls?.length)
        return [];
    return urls.map((u) => resolveProductImageUrl(u, cdnBase)).filter(Boolean);
}
/** Extract path after uploads/ from any known product image URL. */
function uploadsRelativePath(url) {
    const m = decodeUrlEntities(url.trim()).match(/(?:cloudfront\.net\/uploads|wp-content\/uploads|\/uploads)\/(.+)$/i);
    return m ? m[1] : null;
}
/** WooCommerce Amazon-import filenames — copyrighted product photos; do not fetch or hotlink. */
function isAmazonImportedFilename(filename) {
    return /^imgi_/i.test(filename);
}
