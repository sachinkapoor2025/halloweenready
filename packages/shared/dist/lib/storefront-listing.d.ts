/** First shop/category response: a grid, not the full catalog. */
export declare const STOREFRONT_LISTING_INITIAL_LIMIT = 24;
export declare const STOREFRONT_LISTING_CHUNK_SIZE = 24;
export declare const STOREFRONT_LISTING_MAX_LIMIT = 48;
export declare const STOREFRONT_RELATED_LIMIT = 8;
export declare const STOREFRONT_GEO_PREVIEW_LIMIT = 24;
export declare const STOREFRONT_ASSISTANT_SEARCH_LIMIT = 48;
export declare const STOREFRONT_LISTING_SORTS: readonly ["featured", "price-asc", "price-desc", "name-asc", "name-desc"];
export type StorefrontListingSort = (typeof STOREFRONT_LISTING_SORTS)[number];
export type StorefrontListingPage<T> = {
    items: T[];
    offset: number;
    limit: number;
    total: number;
    hasMore: boolean;
};
export declare function isStorefrontListingSort(value: string | undefined): value is StorefrontListingSort;
export declare function parseStorefrontListingSort(value?: string): StorefrontListingSort;
export declare function parseStorefrontListingQuery(query?: {
    limit?: string;
    offset?: string;
    sort?: string;
}): {
    limit?: number;
    offset: number;
    sort: StorefrontListingSort;
};
export declare function sortStorefrontListing<T extends {
    name: string;
    price: number;
}>(items: T[], sort: StorefrontListingSort): T[];
export declare function paginateStorefrontListing<T>(items: T[], offset: number, limit: number): StorefrontListingPage<T>;
