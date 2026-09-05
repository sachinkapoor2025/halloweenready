"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HOMEPAGE_HAMPERS_AFTER_FEATURED_GROUPS = exports.HOMEPAGE_FIRST_PAINT_GROUPS = exports.HOMEPAGE_FAST_SELLING_LIMIT = exports.HOMEPAGE_CATEGORY_PREVIEW_LIMIT = exports.HOMEPAGE_FEED_MAX_LIMIT = exports.HOMEPAGE_FEED_CHUNK_SIZE = exports.HOMEPAGE_FEED_INITIAL_LIMIT = void 0;
exports.buildHomepageFeedSlugs = buildHomepageFeedSlugs;
exports.paginateHomepageFeed = paginateHomepageFeed;
exports.homepageProductsPath = homepageProductsPath;
exports.parseHomepageFeedQuery = parseHomepageFeedQuery;
/** First homepage response: enough for above-the-fold merchandising, not the full ranked pool. */
exports.HOMEPAGE_FEED_INITIAL_LIMIT = 40;
/** Later requests as the shopper scrolls. */
exports.HOMEPAGE_FEED_CHUNK_SIZE = 24;
exports.HOMEPAGE_FEED_MAX_LIMIT = 48;
exports.HOMEPAGE_CATEGORY_PREVIEW_LIMIT = 8;
exports.HOMEPAGE_FAST_SELLING_LIMIT = 8;
exports.HOMEPAGE_FIRST_PAINT_GROUPS = [
    { id: "pinned", limit: 8 },
    { id: "top", limit: 10 },
    { id: "trending", limit: 8 },
    { id: "best_sellers", limit: 10 },
    { id: "new", limit: 8 },
];
/** Insert Halloween Hampers after this many featured catalog groups (4th homepage block after the banner). */
exports.HOMEPAGE_HAMPERS_AFTER_FEATURED_GROUPS = 2;
/**
 * Featured first-paint slugs, then the rest of the ranked pool.
 * Pagination walks this list so the first page is merchandising, not 500 SKUs.
 */
function buildHomepageFeedSlugs(snapshot) {
    const seen = new Set();
    const featured = [];
    for (const spec of exports.HOMEPAGE_FIRST_PAINT_GROUPS) {
        const slugs = snapshot.groups.find((group) => group.id === spec.id)?.slugs ?? [];
        let taken = 0;
        for (const slug of slugs) {
            if (taken >= spec.limit)
                break;
            if (seen.has(slug))
                continue;
            seen.add(slug);
            featured.push(slug);
            taken += 1;
        }
    }
    const rest = snapshot.ranked.filter((slug) => !seen.has(slug));
    return [...featured, ...rest];
}
function paginateHomepageFeed(items, offset, limit) {
    const safeOffset = Number.isFinite(offset) ? Math.max(0, Math.floor(offset)) : 0;
    const requested = Number.isFinite(limit) ? Math.floor(limit) : exports.HOMEPAGE_FEED_INITIAL_LIMIT;
    const safeLimit = Math.min(exports.HOMEPAGE_FEED_MAX_LIMIT, Math.max(1, requested));
    const slice = items.slice(safeOffset, safeOffset + safeLimit);
    return {
        items: slice,
        offset: safeOffset,
        limit: safeLimit,
        total: items.length,
        hasMore: safeOffset + slice.length < items.length,
    };
}
function homepageProductsPath(query) {
    const qs = new URLSearchParams();
    if (query?.limit != null)
        qs.set("limit", String(query.limit));
    if (query?.offset != null)
        qs.set("offset", String(query.offset));
    const suffix = qs.toString();
    return suffix ? `/homepage/products?${suffix}` : "/homepage/products";
}
function parseHomepageFeedQuery(query) {
    const offsetRaw = Number(query?.offset ?? 0);
    const limitRaw = Number(query?.limit ?? exports.HOMEPAGE_FEED_INITIAL_LIMIT);
    const offset = Number.isFinite(offsetRaw) ? Math.max(0, Math.floor(offsetRaw)) : 0;
    const limit = Number.isFinite(limitRaw)
        ? Math.min(exports.HOMEPAGE_FEED_MAX_LIMIT, Math.max(1, Math.floor(limitRaw)))
        : exports.HOMEPAGE_FEED_INITIAL_LIMIT;
    return { offset, limit };
}
