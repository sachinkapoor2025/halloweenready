/** CloudFront distribution for product/media images (halloweenready-prod stack). */
export declare const DEFAULT_PRODUCT_CDN = "https://d2lfdzx32wxe94.cloudfront.net";
export declare function getProductCdnBase(cdnBase?: string): string;
/** Static path served from apps/web/public/uploads (Amplify). */
export declare function staticUploadUrl(relativePath: string): string;
/** Build a CDN URL from a path under wp-content/uploads (e.g. 2026/03/photo.jpg). */
export declare function cdnUploadUrl(relativePath: string, cdnBase?: string): string;
/**
 * Rewrite legacy WordPress / CloudFront paths to a working URL.
 * Default `static` → /uploads/... on Amplify (public/uploads). Use IMAGE_MODE=cdn after S3 is populated.
 */
export declare function resolveProductImageUrl(url: string | undefined | null, cdnBase?: string): string;
export declare function resolveProductImageUrls(urls: string[] | undefined | null, cdnBase?: string): string[];
/** Extract path after uploads/ from any known product image URL. */
export declare function uploadsRelativePath(url: string): string | null;
/** Parse Amazon image id from WooCommerce filenames like imgi_55_61NF5mMYP7L._SL1500_.png */
export declare function amazonImageIdFromFilename(filename: string): string | null;
export declare function amazonMediaUrl(imageId: string, size?: string): string;
