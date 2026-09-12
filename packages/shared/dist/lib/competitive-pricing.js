"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompetitiveDiscountPercent = getCompetitiveDiscountPercent;
exports.applyCompetitivePriceReduction = applyCompetitivePriceReduction;
exports.withCompetitiveStorefrontPricing = withCompetitiveStorefrontPricing;
const currency_1 = require("../currency");
const constants_1 = require("../constants");
const flash_sale_1 = require("./flash-sale");
/**
 * Competitive storefront price cuts (applied to catalog selling price before FX).
 * Same % applies in USD and INR because conversion happens after this reduction.
 *
 * - under $25 → 8% off
 * - $25–$29.99 → 10% off
 * - $30+ → 12% off
 */
function getCompetitiveDiscountPercent(price) {
    if (!Number.isFinite(price) || price <= 0)
        return 0;
    if (price < 25)
        return 8;
    if (price < 30)
        return 10;
    return 12;
}
/** Reduce a catalog price by the competitive tier %; rounds for the currency. */
function applyCompetitivePriceReduction(price, currency = "USD") {
    const percent = getCompetitiveDiscountPercent(price);
    if (percent <= 0)
        return (0, currency_1.roundForCurrency)(price, currency);
    return (0, currency_1.roundForCurrency)(price * (1 - percent / 100), currency);
}
/**
 * Storefront view of a product: lower selling price + keep/raise compare-at
 * so the original catalog price still shows as strikethrough.
 * Vendor-priced products (e.g. Orange County hampers) keep their sale/list prices as stored.
 * Safe to call more than once — never stacks competitive cuts.
 */
function withCompetitiveStorefrontPricing(product) {
    // Flash combo price is owned by code — never show a stale Dynamo $3.99.
    const priced = (0, flash_sale_1.withFlashComboStorefrontPricing)(product);
    // Already has intentional list vs sale pricing from the vendor catalog.
    if (priced.vendorSlug ||
        priced.categorySlug === "rakhi-hampers" ||
        priced.categorySlug === constants_1.HALLOWEEN_HAMPERS_CATEGORY_SLUG) {
        return priced;
    }
    // Flash / fixed-price deals must stay at the exact listed price.
    if ((0, flash_sale_1.productUsesFixedStorefrontPrice)(priced)) {
        return { ...priced, storefrontPricingApplied: true };
    }
    product = priced;
    if (product.storefrontPricingApplied)
        return product;
    const currency = product.currency ?? "USD";
    const original = product.price;
    const reduced = applyCompetitivePriceReduction(original, currency);
    if (reduced >= original) {
        return { ...product, storefrontPricingApplied: true };
    }
    const compareAtPrice = Math.max(product.compareAtPrice ?? 0, original);
    return {
        ...product,
        price: reduced,
        compareAtPrice,
        storefrontPricingApplied: true,
    };
}
