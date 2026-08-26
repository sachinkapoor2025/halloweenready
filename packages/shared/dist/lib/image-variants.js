"use strict";
/** Storefront / CDN image size standard — process once at upload, never on the hot path. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMAGE_OPTIMIZABLE_KEY_RE = exports.IMAGE_VARIANT_KEY_RE = exports.IMAGE_CACHE_CONTROL = exports.IMAGE_MASTER_TARGET_BYTES = exports.IMAGE_PROCESS_MAX_BYTES = exports.IMAGE_UPLOAD_MAX_BYTES = exports.IMAGE_MASTER_MAX_EDGE_PX = exports.IMAGE_VARIANT_PRESETS = exports.IMAGE_VARIANT_NAMES = void 0;
exports.isImageVariantKey = isImageVariantKey;
exports.isOptimizableImageKey = isOptimizableImageKey;
exports.variantObjectKey = variantObjectKey;
exports.allVariantObjectKeys = allVariantObjectKeys;
exports.productImageVariantUrl = productImageVariantUrl;
exports.IMAGE_VARIANT_NAMES = ["thumb", "card", "gallery", "zoom"];
exports.IMAGE_VARIANT_PRESETS = {
    thumb: { width: 320, quality: 70, suffix: "thumb" },
    card: { width: 640, quality: 72, suffix: "card" },
    gallery: { width: 1200, quality: 78, suffix: "gallery" },
    zoom: { width: 1600, quality: 80, suffix: "zoom" },
};
/** Longest edge for the stored original (admin uploads + Lambda master cap). */
exports.IMAGE_MASTER_MAX_EDGE_PX = 2000;
/** Reject / skip processing above this — 80MB TIFFs must never hit CloudFront. */
exports.IMAGE_UPLOAD_MAX_BYTES = 8 * 1024 * 1024;
exports.IMAGE_PROCESS_MAX_BYTES = 25 * 1024 * 1024;
exports.IMAGE_MASTER_TARGET_BYTES = 350_000;
exports.IMAGE_CACHE_CONTROL = "public, max-age=31536000, immutable";
exports.IMAGE_VARIANT_KEY_RE = /\.(thumb|card|gallery|zoom)\.webp$/i;
exports.IMAGE_OPTIMIZABLE_KEY_RE = /\.(jpe?g|png|webp|gif|tiff?)$/i;
const SKIP_PREFIXES = ["expenses/", "labels/", "wp-statistics/"];
function isImageVariantKey(key) {
    return exports.IMAGE_VARIANT_KEY_RE.test(key.split("?")[0] ?? key);
}
function isOptimizableImageKey(key) {
    const clean = key.split("?")[0] ?? key;
    if (!exports.IMAGE_OPTIMIZABLE_KEY_RE.test(clean))
        return false;
    if (isImageVariantKey(clean))
        return false;
    const lower = clean.replace(/^\/+/, "").toLowerCase();
    return !SKIP_PREFIXES.some((p) => lower.startsWith(p));
}
function variantObjectKey(originalKey, variant) {
    const trimmed = originalKey.replace(/^\/+/, "").split("?")[0] ?? originalKey;
    const withoutVariant = trimmed.replace(exports.IMAGE_VARIANT_KEY_RE, "");
    const noExt = withoutVariant.replace(/\.[^.]+$/, "");
    return `${noExt}.${exports.IMAGE_VARIANT_PRESETS[variant].suffix}.webp`;
}
function allVariantObjectKeys(originalKey) {
    return exports.IMAGE_VARIANT_NAMES.map((name) => variantObjectKey(originalKey, name));
}
function isManagedMediaUrl(url) {
    return (/cloudfront\.net\//i.test(url) ||
        /\/uploads\//i.test(url) ||
        /^uploads\//i.test(url) ||
        /\/products\//i.test(url) ||
        /\/blog\//i.test(url));
}
/** Rewrite a CDN/original URL to the sized WebP sibling. Unknown hosts are left unchanged. */
function productImageVariantUrl(url, variant) {
    const trimmed = url.trim();
    if (!trimmed || !isManagedMediaUrl(trimmed))
        return trimmed;
    if (isImageVariantKey(trimmed))
        return trimmed;
    try {
        const parsed = new URL(trimmed);
        parsed.pathname = `/${variantObjectKey(parsed.pathname.replace(/^\/+/, ""), variant)}`;
        return parsed.toString();
    }
    catch {
        const path = trimmed.replace(/^\/+/, "");
        return `/${variantObjectKey(path, variant)}`;
    }
}
