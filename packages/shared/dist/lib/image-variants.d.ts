/** Storefront / CDN image size standard — process once at upload, never on the hot path. */
export declare const IMAGE_VARIANT_NAMES: readonly ["thumb", "card", "gallery", "zoom"];
export type ImageVariantName = (typeof IMAGE_VARIANT_NAMES)[number];
export declare const IMAGE_VARIANT_PRESETS: Record<ImageVariantName, {
    width: number;
    quality: number;
    suffix: ImageVariantName;
}>;
/** Longest edge for the stored original (admin uploads + Lambda master cap). */
export declare const IMAGE_MASTER_MAX_EDGE_PX = 2000;
/** Reject / skip processing above this — 80MB TIFFs must never hit CloudFront. */
export declare const IMAGE_UPLOAD_MAX_BYTES: number;
export declare const IMAGE_PROCESS_MAX_BYTES: number;
export declare const IMAGE_MASTER_TARGET_BYTES = 350000;
export declare const IMAGE_CACHE_CONTROL = "public, max-age=31536000, immutable";
export declare const IMAGE_VARIANT_KEY_RE: RegExp;
export declare const IMAGE_OPTIMIZABLE_KEY_RE: RegExp;
export declare function isImageVariantKey(key: string): boolean;
export declare function isOptimizableImageKey(key: string): boolean;
export declare function variantObjectKey(originalKey: string, variant: ImageVariantName): string;
export declare function allVariantObjectKeys(originalKey: string): string[];
/** Rewrite a CDN/original URL to the sized WebP sibling. Unknown hosts are left unchanged. */
export declare function productImageVariantUrl(url: string, variant: ImageVariantName): string;
