"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUOTEABLE_SHIP_COUNTRIES = void 0;
exports.isQuoteableStorefrontCountry = isQuoteableStorefrontCountry;
exports.isProductAvailableForCountry = isProductAvailableForCountry;
exports.getAvailableProductsForCountry = getAvailableProductsForCountry;
exports.getCountryShippingStatus = getCountryShippingStatus;
const cj_dropshipping_1 = require("../schemas/cj-dropshipping");
/** Destinations the storefront can request a live CJ freight quote for. */
exports.QUOTEABLE_SHIP_COUNTRIES = cj_dropshipping_1.CJ_STOREFRONT_SHIP_COUNTRIES;
function iso(countryCode) {
    return countryCode.trim().toUpperCase();
}
function isQuoteableStorefrontCountry(countryCode) {
    return exports.QUOTEABLE_SHIP_COUNTRIES.includes(iso(countryCode));
}
/**
 * SEO/catalog availability — conservative.
 * `availableCountryCodes` is the only hard allow/deny list.
 * Otherwise US/CA/GB/AU/DE are quoteable (not guaranteed) via the product shipping API.
 * Never treat CJ marketing ("200+ countries") as per-SKU availability.
 */
function isProductAvailableForCountry(product, countryCode) {
    const cc = iso(countryCode);
    if (!cc)
        return "unknown";
    if (product.inventory === 0)
        return "unavailable";
    const listed = (product.availableCountryCodes ?? [])
        .map((c) => c.trim().toUpperCase())
        .filter(Boolean);
    if (listed.length)
        return listed.includes(cc) ? "available" : "unavailable";
    if (isQuoteableStorefrontCountry(cc))
        return "quoteable";
    return "unknown";
}
function getAvailableProductsForCountry(products, countryCode) {
    return products.filter((p) => {
        const status = isProductAvailableForCountry(p, countryCode);
        return status === "available" || status === "quoteable";
    });
}
function getCountryShippingStatus(countryCode) {
    return {
        quoteableOnStorefront: isQuoteableStorefrontCountry(countryCode),
        lastSync: null,
    };
}
