/** CloudFront distribution for product/media images (from halloweenready-prod stack). */
export declare const DEFAULT_PRODUCT_CDN = "https://d301af4ndyn9qx.cloudfront.net";
export declare function getProductCdnBase(cdnBase?: string): string;
/** Static path served from apps/web/public/uploads (Amplify). */
export declare function staticUploadUrl(relativePath: string): string;
/** Build a CDN URL from a path under uploads/ (e.g. 2026/03/photo.jpg). */
export declare function cdnUploadUrl(relativePath: string, cdnBase?: string): string;
/** Rewrite legacy /wp-content/uploads media URLs to the CDN mirror. */
export declare function resolveProductImageUrl(url: string | undefined | null, cdnBase?: string): string;
export declare function resolveProductImageUrls(urls: string[] | undefined | null, cdnBase?: string): string[];
/** Extract path after uploads/ from any known product image URL. */
export declare function uploadsRelativePath(url: string): string | null;
/** WooCommerce Amazon-import filenames — copyrighted product photos; do not fetch or hotlink. */
export declare function isAmazonImportedFilename(filename: string): boolean;
