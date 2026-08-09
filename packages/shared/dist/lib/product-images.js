"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCT_IMAGE_MIN_EDGE_PX = void 0;
exports.normalizeProductImageKey = normalizeProductImageKey;
exports.isAdminUploadedProductImage = isAdminUploadedProductImage;
exports.mergeProductImages = mergeProductImages;
exports.resolveProductImagesForUpsert = resolveProductImagesForUpsert;
exports.shortEdge = shortEdge;
exports.selectDisplayableProductImages = selectDisplayableProductImages;
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
/**
 * Safe image write helper for imports / product upserts.
 *
 * Default behavior (peak season):
 * - Merge incoming + existing URLs
 * - Never write fewer images than already stored
 * - Empty incoming keeps existing gallery
 *
 * Pass `{ allowShrink: true }` only for intentional full gallery replace.
 */
function resolveProductImagesForUpsert(incoming, existing, options = {}) {
    const incomingList = (Array.isArray(incoming) ? incoming : []).map((u) => u.trim()).filter(Boolean);
    const existingList = (Array.isArray(existing) ? existing : []).map((u) => u.trim()).filter(Boolean);
    if (options.allowShrink) {
        if (incomingList.length === 0) {
            return { images: existingList, preservedExisting: true };
        }
        return { images: incomingList, preservedExisting: false };
    }
    if (incomingList.length === 0 && existingList.length > 0) {
        return { images: existingList, preservedExisting: true };
    }
    const merged = mergeProductImages(incomingList, existingList);
    if (existingList.length > merged.length) {
        return { images: existingList, preservedExisting: true };
    }
    return { images: merged, preservedExisting: false };
}
/**
 * Drop vendor thumbnail assets (often 100×100) that get upscaled on listing cards / PDP.
 * Keep the largest frame(s) when the whole set is uniformly tiny.
 */
exports.PRODUCT_IMAGE_MIN_EDGE_PX = 250;
function shortEdge(width, height) {
    if (!width || !height)
        return 0;
    return Math.min(width, height);
}
/** Prefer sharp gallery frames; fall back to the largest frame if all are tiny. */
function selectDisplayableProductImages(entries) {
    const valid = entries.filter((e) => e.url && e.width > 0 && e.height > 0);
    if (valid.length === 0)
        return [];
    const sharp = valid.filter((e) => shortEdge(e.width, e.height) >= exports.PRODUCT_IMAGE_MIN_EDGE_PX);
    if (sharp.length > 0)
        return sharp.map((e) => e.url);
    let best = 0;
    for (const e of valid)
        best = Math.max(best, e.width * e.height);
    return valid.filter((e) => e.width * e.height === best).map((e) => e.url);
}
