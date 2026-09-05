"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STOREFRONT_LISTING_SORTS = exports.STOREFRONT_ASSISTANT_SEARCH_LIMIT = exports.STOREFRONT_GEO_PREVIEW_LIMIT = exports.STOREFRONT_RELATED_LIMIT = exports.STOREFRONT_LISTING_MAX_LIMIT = exports.STOREFRONT_LISTING_CHUNK_SIZE = exports.STOREFRONT_LISTING_INITIAL_LIMIT = void 0;
exports.isStorefrontListingSort = isStorefrontListingSort;
exports.parseStorefrontListingSort = parseStorefrontListingSort;
exports.parseStorefrontListingQuery = parseStorefrontListingQuery;
exports.sortStorefrontListing = sortStorefrontListing;
exports.paginateStorefrontListing = paginateStorefrontListing;
const homepage_feed_1 = require("./homepage-feed");
/** First shop/category response: a grid, not the full catalog. */
exports.STOREFRONT_LISTING_INITIAL_LIMIT = 24;
exports.STOREFRONT_LISTING_CHUNK_SIZE = 24;
exports.STOREFRONT_LISTING_MAX_LIMIT = homepage_feed_1.HOMEPAGE_FEED_MAX_LIMIT;
exports.STOREFRONT_RELATED_LIMIT = 8;
exports.STOREFRONT_GEO_PREVIEW_LIMIT = 24;
exports.STOREFRONT_ASSISTANT_SEARCH_LIMIT = 48;
exports.STOREFRONT_LISTING_SORTS = [
    "featured",
    "price-asc",
    "price-desc",
    "name-asc",
    "name-desc",
];
function isStorefrontListingSort(value) {
    return value != null && exports.STOREFRONT_LISTING_SORTS.includes(value);
}
function parseStorefrontListingSort(value) {
    return isStorefrontListingSort(value) ? value : "featured";
}
function parseStorefrontListingQuery(query) {
    const offsetRaw = Number(query?.offset ?? 0);
    const offset = Number.isFinite(offsetRaw) ? Math.max(0, Math.floor(offsetRaw)) : 0;
    const sort = parseStorefrontListingSort(query?.sort);
    if (query?.limit == null || query.limit === "") {
        return { offset, sort };
    }
    const limitRaw = Number(query.limit);
    const limit = Number.isFinite(limitRaw)
        ? Math.min(exports.STOREFRONT_LISTING_MAX_LIMIT, Math.max(1, Math.floor(limitRaw)))
        : exports.STOREFRONT_LISTING_INITIAL_LIMIT;
    return { offset, sort, limit };
}
function sortStorefrontListing(items, sort) {
    const list = [...items];
    switch (sort) {
        case "price-asc":
            return list.sort((a, b) => a.price - b.price);
        case "price-desc":
            return list.sort((a, b) => b.price - a.price);
        case "name-asc":
            return list.sort((a, b) => a.name.localeCompare(b.name));
        case "name-desc":
            return list.sort((a, b) => b.name.localeCompare(a.name));
        default:
            return list;
    }
}
function paginateStorefrontListing(items, offset, limit) {
    const safeOffset = Number.isFinite(offset) ? Math.max(0, Math.floor(offset)) : 0;
    const requested = Number.isFinite(limit) ? Math.floor(limit) : exports.STOREFRONT_LISTING_INITIAL_LIMIT;
    const safeLimit = Math.min(exports.STOREFRONT_LISTING_MAX_LIMIT, Math.max(1, requested));
    const slice = items.slice(safeOffset, safeOffset + safeLimit);
    return {
        items: slice,
        offset: safeOffset,
        limit: safeLimit,
        total: items.length,
        hasMore: safeOffset + slice.length < items.length,
    };
}
