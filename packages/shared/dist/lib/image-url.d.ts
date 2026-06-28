/** CloudFront distribution for product/media images (from halloweenready-prod stack). */
export declare const DEFAULT_PRODUCT_CDN = "https://d301af4ndyn9qx.cloudfront.net";
export declare function getProductCdnBase(cdnBase?: string): string;
/** Build a CDN URL from a path under wp-content/uploads (e.g. 2026/03/photo.jpg). */
export declare function cdnUploadUrl(relativePath: string, cdnBase?: string): string;
/** Rewrite legacy WordPress media URLs to the CDN mirror. */
export declare function resolveProductImageUrl(url: string | undefined | null, cdnBase?: string): string;
export declare function resolveProductImageUrls(urls: string[] | undefined | null, cdnBase?: string): string[];
