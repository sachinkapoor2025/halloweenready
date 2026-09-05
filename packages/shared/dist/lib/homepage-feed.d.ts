import type { HomepageSnapshot } from "../schemas/homepage-ranking";
/** First homepage response: enough for above-the-fold merchandising, not the full ranked pool. */
export declare const HOMEPAGE_FEED_INITIAL_LIMIT = 40;
/** Later requests as the shopper scrolls. */
export declare const HOMEPAGE_FEED_CHUNK_SIZE = 24;
export declare const HOMEPAGE_FEED_MAX_LIMIT = 48;
export declare const HOMEPAGE_CATEGORY_PREVIEW_LIMIT = 8;
export declare const HOMEPAGE_FAST_SELLING_LIMIT = 8;
export declare const HOMEPAGE_FIRST_PAINT_GROUPS: readonly [{
    readonly id: "pinned";
    readonly limit: 8;
}, {
    readonly id: "top";
    readonly limit: 10;
}, {
    readonly id: "trending";
    readonly limit: 8;
}, {
    readonly id: "best_sellers";
    readonly limit: 10;
}, {
    readonly id: "new";
    readonly limit: 8;
}];
/** Insert Halloween Hampers after this many featured catalog groups (4th homepage block after the banner). */
export declare const HOMEPAGE_HAMPERS_AFTER_FEATURED_GROUPS = 2;
export type HomepageFeedPage<T> = {
    items: T[];
    offset: number;
    limit: number;
    total: number;
    hasMore: boolean;
};
/**
 * Featured first-paint slugs, then the rest of the ranked pool.
 * Pagination walks this list so the first page is merchandising, not 500 SKUs.
 */
export declare function buildHomepageFeedSlugs(snapshot: Pick<HomepageSnapshot, "groups" | "ranked">): string[];
export declare function paginateHomepageFeed<T>(items: T[], offset: number, limit: number): HomepageFeedPage<T>;
export declare function homepageProductsPath(query?: {
    limit?: number;
    offset?: number;
}): string;
export declare function parseHomepageFeedQuery(query?: {
    limit?: string;
    offset?: string;
}): {
    limit: number;
    offset: number;
};
