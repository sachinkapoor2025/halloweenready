/** Public storefront catalog for imported CJ products (not admin live-CJ search). */
export declare const CJ_STOREFRONT_PRODUCTS_PATH = "/cj/products";
export declare function cjStorefrontProductsPath(query?: {
    category?: string;
    search?: string;
}): string;
export declare function cjStorefrontProductPath(slug: string): string;
export declare function cjStorefrontProductVideosPath(slug: string): string;
export declare function cjStorefrontProductShippingPath(slug: string, query?: {
    country?: string;
    vid?: string;
    quantity?: string;
}): string;
