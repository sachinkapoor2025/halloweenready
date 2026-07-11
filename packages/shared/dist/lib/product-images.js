"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeProductImageKey = normalizeProductImageKey;
exports.isAdminUploadedProductImage = isAdminUploadedProductImage;
exports.mergeProductImages = mergeProductImages;
/** Normalize image URLs for deduplication (path-only, case-insensitive). */
function normalizeProductImageKey(url) {
    const trimmed = url.trim();
    if (!trimmed)
        return "";
    try {
        const parsed = new URL(trimmed);
        return decodeURIComponent(parsed.pathname).toLowerCase();
    }
    catch {
        return trimmed.toLowerCase();
    }
}
/** Admin portal uploads are stored under S3/CloudFront `products/<uuid>.<ext>`. */
function isAdminUploadedProductImage(url) {
    return /\/products\//i.test(url);
}
/**
 * Merge catalog/import images with existing DB images.
 * Import order first, then preserve admin uploads and any extra images already stored.
 */
function mergeProductImages(imported, existing = []) {
    const seen = new Set();
    const merged = [];
    const add = (url) => {
        const key = normalizeProductImageKey(url);
        if (!key || seen.has(key))
            return;
        seen.add(key);
        merged.push(url.trim());
    };
    for (const url of imported)
        add(url);
    for (const url of existing)
        add(url);
    return merged;
}
