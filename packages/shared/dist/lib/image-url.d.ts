/** CloudFront distribution for product/media images (halloweenready-prod stack). */
export declare const DEFAULT_PRODUCT_CDN = "https://d2lfdzx32wxe94.cloudfront.net";
export declare function getProductCdnBase(cdnBase?: string): string;
/** Build a CDN URL from a path under wp-content/uploads (e.g. 2026/03/photo.jpg). */
export declare function cdnUploadUrl(relativePath: string, cdnBase?: string): string;
/**
 * Rewrite legacy WordPress media URLs to the S3/CloudFront CDN.
 * WordPress is no longer hosted on halloweenready.com — wp-content paths 404 there.
 */
export declare function resolveProductImageUrl(url: string | undefined | null, cdnBase?: string): string;
export declare function resolveProductImageUrls(urls: string[] | undefined | null, cdnBase?: string): string[];
