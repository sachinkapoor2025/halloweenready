"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CJ_STOREFRONT_PRODUCTS_PATH = void 0;
exports.cjStorefrontProductsPath = cjStorefrontProductsPath;
exports.cjStorefrontProductPath = cjStorefrontProductPath;
exports.cjStorefrontProductVideosPath = cjStorefrontProductVideosPath;
exports.cjStorefrontProductShippingPath = cjStorefrontProductShippingPath;
/** Public storefront catalog for imported CJ products (not admin live-CJ search). */
exports.CJ_STOREFRONT_PRODUCTS_PATH = "/cj/products";
function cjStorefrontProductsPath(query) {
    const qs = new URLSearchParams();
    if (query?.category)
        qs.set("category", query.category);
    if (query?.search)
        qs.set("search", query.search);
    if (query?.limit != null)
        qs.set("limit", String(query.limit));
    if (query?.offset != null)
        qs.set("offset", String(query.offset));
    if (query?.sort && query.sort !== "featured")
        qs.set("sort", query.sort);
    const suffix = qs.toString();
    return suffix ? `${exports.CJ_STOREFRONT_PRODUCTS_PATH}?${suffix}` : exports.CJ_STOREFRONT_PRODUCTS_PATH;
}
function cjStorefrontProductPath(slug) {
    return `${exports.CJ_STOREFRONT_PRODUCTS_PATH}/${slug}`;
}
function cjStorefrontProductVideosPath(slug) {
    return `${cjStorefrontProductPath(slug)}/videos`;
}
function cjStorefrontProductShippingPath(slug, query) {
    const qs = new URLSearchParams();
    if (query?.country)
        qs.set("country", query.country);
    if (query?.vid)
        qs.set("vid", query.vid);
    if (query?.quantity)
        qs.set("quantity", query.quantity);
    const suffix = qs.toString();
    const path = `${cjStorefrontProductPath(slug)}/shipping`;
    return suffix ? `${path}?${suffix}` : path;
}
