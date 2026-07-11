/** Normalize image URLs for deduplication (path-only, case-insensitive). */
export declare function normalizeProductImageKey(url: string): string;
/** Admin portal uploads are stored under S3/CloudFront `products/<uuid>.<ext>`. */
export declare function isAdminUploadedProductImage(url: string): boolean;
/**
 * Merge catalog/import images with existing DB images.
 * Import order first, then preserve admin uploads and any extra images already stored.
 */
export declare function mergeProductImages(imported: string[], existing?: string[]): string[];
