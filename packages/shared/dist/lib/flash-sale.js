"use strict";
/** Flash combo platform hooks — HalloweenReady has no active usarakhi flash SKU. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FLASH_COMBO_SALE = exports.FLASH_COMBO_SHIPPING_USD = exports.FLASH_COMBO_SALE_DURATION_MS = exports.FLASH_COMBO_SALE_STARTED_AT = exports.FLASH_COMBO_SALE_SLUG = void 0;
exports.flashComboSaleEndsAt = flashComboSaleEndsAt;
exports.isFlashComboSaleActive = isFlashComboSaleActive;
exports.isFlashComboProduct = isFlashComboProduct;
exports.productUsesFixedStorefrontPrice = productUsesFixedStorefrontPrice;
exports.withFlashComboStorefrontPricing = withFlashComboStorefrontPricing;
exports.flashComboUnitPriceUsd = flashComboUnitPriceUsd;
exports.couponEligibleSubtotal = couponEligibleSubtotal;
exports.cartHasCouponExcludedItems = cartHasCouponExcludedItems;
exports.FLASH_COMBO_SALE_SLUG = "blue-beads-om-pista-flash-combo";
/** Inclusive start of the sale window (UTC). 24h from this instant. */
exports.FLASH_COMBO_SALE_STARTED_AT = "2026-08-03T20:17:00.000Z";
/** Sale length from start. */
exports.FLASH_COMBO_SALE_DURATION_MS = 24 * 60 * 60 * 1000;
/** Flat shipping for flash-combo-only vendor buckets (USD). */
exports.FLASH_COMBO_SHIPPING_USD = 0.99;
exports.FLASH_COMBO_SALE = {
    slug: exports.FLASH_COMBO_SALE_SLUG,
    title: "24-Hour Flash Sale",
    headline: "Grab Your Offer (5 product combo)",
    priceUsd: 12.96,
    compareAtUsd: 24.99,
    shippingUsd: exports.FLASH_COMBO_SHIPPING_USD,
    includes: [
        "Halloween flash offer item 1",
        "Halloween flash offer item 2",
        "Halloween flash offer item 3",
    ],
    /** Canonical gallery — overrides stale Dynamo images on storefront. */
    images: [
        "https://www.halloweenready.com/banners/bannerpage1.png",
        "https://www.halloweenready.com/banners/bannerpage2.png",
    ],
};
function flashComboSaleEndsAt() {
    return new Date(new Date(exports.FLASH_COMBO_SALE_STARTED_AT).getTime() + exports.FLASH_COMBO_SALE_DURATION_MS);
}
function isFlashComboSaleActive(now = new Date()) {
    const start = new Date(exports.FLASH_COMBO_SALE_STARTED_AT).getTime();
    const end = flashComboSaleEndsAt().getTime();
    const t = now.getTime();
    return t >= start && t < end;
}
function isFlashComboProduct(slug) {
    return (slug ?? "").trim() === exports.FLASH_COMBO_SALE_SLUG;
}
/** True when storefront/cart must keep the exact listed price (no competitive cut). */
function productUsesFixedStorefrontPrice(product) {
    if (product.couponExcluded)
        return true;
    if (isFlashComboProduct(product.slug))
        return true;
    const tags = product.tags ?? [];
    return tags.includes("fixed-price") || tags.includes("flash-sale");
}
/** Force flash-combo list price + gallery from code (ignores stale Dynamo data). */
function withFlashComboStorefrontPricing(product) {
    if (!isFlashComboProduct(product.slug))
        return product;
    return {
        ...product,
        price: exports.FLASH_COMBO_SALE.priceUsd,
        compareAtPrice: Math.max(product.compareAtPrice ?? 0, exports.FLASH_COMBO_SALE.compareAtUsd),
        images: [...exports.FLASH_COMBO_SALE.images],
        couponExcluded: true,
    };
}
/** Unit price charged for the flash combo (cart / checkout). */
function flashComboUnitPriceUsd() {
    return exports.FLASH_COMBO_SALE.priceUsd;
}
function lineTotal(item) {
    const addonTotal = item.addons?.reduce((sum, a) => sum + a.price * a.quantity, 0) ?? 0;
    return (item.price + addonTotal) * item.quantity;
}
/** Subtotal of cart lines that coupons may discount. */
function couponEligibleSubtotal(items) {
    return Math.round(items.reduce((sum, item) => {
        if (item.couponExcluded || isFlashComboProduct(item.productSlug))
            return sum;
        return sum + lineTotal(item);
    }, 0) * 100) / 100;
}
function cartHasCouponExcludedItems(items) {
    return items.some((item) => item.couponExcluded || isFlashComboProduct(item.productSlug));
}
