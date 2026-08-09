/** Normalize image URLs for deduplication (path-only, case-insensitive). */
export declare function normalizeProductImageKey(url: string): string;
/** Admin portal uploads are stored under S3/CloudFront `products/<uuid>.<ext>`. */
export declare function isAdminUploadedProductImage(url: string): boolean;
/**
 * Merge catalog/import images with existing DB images.
 * Import order first, then preserve admin uploads and any extra images already stored.
 */
export declare function mergeProductImages(imported: string[], existing?: string[]): string[];
export type ResolveProductImagesForUpsertOptions = {
    /**
     * When true, replace the gallery with `incoming` (may shrink).
     * Default false — peak-season safe: merge and never drop existing gallery images.
     */
    allowShrink?: boolean;
};
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
export declare function resolveProductImagesForUpsert(incoming: string[] | undefined, existing: string[] | undefined, options?: ResolveProductImagesForUpsertOptions): {
    images: string[];
    preservedExisting: boolean;
};
/**
 * Drop vendor thumbnail assets (often 100×100) that get upscaled on listing cards / PDP.
 * Keep the largest frame(s) when the whole set is uniformly tiny.
 */
export declare const PRODUCT_IMAGE_MIN_EDGE_PX = 250;
export type SizedProductImage = {
    url: string;
    width: number;
    height: number;
};
export declare function shortEdge(width: number, height: number): number;
/** Prefer sharp gallery frames; fall back to the largest frame if all are tiny. */
export declare function selectDisplayableProductImages(entries: SizedProductImage[]): string[];
