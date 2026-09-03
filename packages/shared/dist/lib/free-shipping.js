"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHIPPING_VENDOR_HALLOWEENREADY = exports.REDUCED_SHIPPING_USD = exports.REDUCED_SHIPPING_MIN_SUBTOTAL_USD = exports.BELOW_THRESHOLD_SHIPPING_USD = exports.SHIPPING_RATE_BANDS = exports.FREE_SHIPPING_MIN_SUBTOTAL_USD = void 0;
exports.shippingBandForSubtotalUsd = shippingBandForSubtotalUsd;
exports.quoteFreeShippingThreshold = quoteFreeShippingThreshold;
exports.shippingVendorKey = shippingVendorKey;
exports.quoteShipmentsShipping = quoteShipmentsShipping;
exports.vendorSubtotalsForItems = vendorSubtotalsForItems;
exports.quoteAddressShipmentShipping = quoteAddressShipmentShipping;
const currency_1 = require("../currency");
const flash_sale_1 = require("./flash-sale");
const product_addons_1 = require("./product-addons");
/** Cart subtotal at or above this (USD) unlocks free shipping. */
exports.FREE_SHIPPING_MIN_SUBTOTAL_USD = 49;
/**
 * Paid shipping bands (USD). `maxUsd` is exclusive.
 * below $10 → $10; below $20 → $8; below $30 → $6; below $40 → $4; below $49 → $2.
 */
exports.SHIPPING_RATE_BANDS = [
    { minUsd: 0, maxUsd: 10, feeUsd: 10 },
    { minUsd: 10, maxUsd: 20, feeUsd: 8 },
    { minUsd: 20, maxUsd: 30, feeUsd: 6 },
    { minUsd: 30, maxUsd: 40, feeUsd: 4 },
    { minUsd: 40, maxUsd: 49, feeUsd: 2 },
];
/** Lowest paid fee (cart under $10). Kept for existing imports. */
exports.BELOW_THRESHOLD_SHIPPING_USD = exports.SHIPPING_RATE_BANDS[0].feeUsd;
/** Start of the $2 shipping band (cart $40–$48.99). */
exports.REDUCED_SHIPPING_MIN_SUBTOTAL_USD = 40;
/** $2 shipping when cart is $40+ but under $49. */
exports.REDUCED_SHIPPING_USD = 2;
function toCurrency(amountUsd, currency, usdInrRate) {
    if (currency === "USD")
        return (0, currency_1.roundForCurrency)(amountUsd, "USD");
    return (0, currency_1.roundForCurrency)((0, currency_1.convertCurrencyAmount)(amountUsd, "USD", "INR", usdInrRate), "INR");
}
function toUsd(amount, currency, usdInrRate) {
    if (currency === "USD")
        return amount;
    return (0, currency_1.convertCurrencyAmount)(amount, "INR", "USD", usdInrRate);
}
function shippingBandForSubtotalUsd(subtotalUsd) {
    if (subtotalUsd >= exports.FREE_SHIPPING_MIN_SUBTOTAL_USD)
        return null;
    return (exports.SHIPPING_RATE_BANDS.find((b) => subtotalUsd >= b.minUsd && subtotalUsd < b.maxUsd) ??
        exports.SHIPPING_RATE_BANDS[0]);
}
function nextCheaperBand(subtotalUsd) {
    const current = shippingBandForSubtotalUsd(subtotalUsd);
    if (!current)
        return null;
    const idx = exports.SHIPPING_RATE_BANDS.findIndex((b) => b.minUsd === current.minUsd);
    return idx >= 0 ? exports.SHIPPING_RATE_BANDS[idx + 1] ?? null : null;
}
/**
 * Shipping tiers (per address × vendor bucket, in USD):
 * - under $10 → $10
 * - $10 to under $20 → $8
 * - $20 to under $30 → $6
 * - $30 to under $40 → $4
 * - $40 to under $49 → $2
 * - $49+ → free
 * Evaluated in USD, then converted when the shopper currency is INR.
 */
function quoteFreeShippingThreshold(input) {
    const { subtotal, currency, usdInrRate } = input;
    const thresholdInCurrency = toCurrency(exports.FREE_SHIPPING_MIN_SUBTOTAL_USD, currency, usdInrRate);
    const subtotalUsd = toUsd(subtotal, currency, usdInrRate);
    const band = shippingBandForSubtotalUsd(subtotalUsd);
    const next = nextCheaperBand(subtotalUsd);
    const lowTierFee = toCurrency(exports.BELOW_THRESHOLD_SHIPPING_USD, currency, usdInrRate);
    const midTierFee = toCurrency(exports.REDUCED_SHIPPING_USD, currency, usdInrRate);
    let charge = 0;
    let qualifiesForFreeShipping = false;
    let tier = "low";
    if (!band) {
        qualifiesForFreeShipping = true;
        tier = "free";
        charge = 0;
    }
    else {
        charge = toCurrency(band.feeUsd, currency, usdInrRate);
        tier = band.feeUsd === exports.REDUCED_SHIPPING_USD ? "mid" : "low";
    }
    const nextMinUsd = next?.minUsd ?? exports.REDUCED_SHIPPING_MIN_SUBTOTAL_USD;
    const reducedThresholdInCurrency = toCurrency(nextMinUsd, currency, usdInrRate);
    const nextFeeUsd = next?.feeUsd ?? exports.REDUCED_SHIPPING_USD;
    const nextFeeInCurrency = toCurrency(nextFeeUsd, currency, usdInrRate);
    const amountAwayFromFreeShipping = qualifiesForFreeShipping
        ? 0
        : Math.max(0, (0, currency_1.roundForCurrency)(thresholdInCurrency - subtotal, currency));
    const amountAwayFromReducedShipping = qualifiesForFreeShipping || !next
        ? 0
        : Math.max(0, (0, currency_1.roundForCurrency)(reducedThresholdInCurrency - subtotal, currency));
    return {
        charge,
        qualifiesForFreeShipping,
        amountAwayFromFreeShipping,
        amountAwayFromReducedShipping,
        thresholdInCurrency,
        reducedThresholdInCurrency,
        lowTierFeeInCurrency: band ? charge : lowTierFee,
        midTierFeeInCurrency: next ? nextFeeInCurrency : midTierFee,
        tier,
        belowThresholdFeeInCurrency: charge,
    };
}
/** Default vendor bucket for catalog SKUs without `vendorSlug` (HalloweenReady). */
exports.SHIPPING_VENDOR_HALLOWEENREADY = "halloweenready";
/** Normalize cart/product vendor for per-vendor free-shipping buckets. */
function shippingVendorKey(item) {
    const slug = item.vendorSlug?.trim();
    return slug || exports.SHIPPING_VENDOR_HALLOWEENREADY;
}
/**
 * Free-shipping groups: each subtotal is one chargeable bucket
 * (delivery address × vendor). Tiers apply per bucket; total = sum.
 */
function quoteShipmentsShipping(input) {
    const perShipment = input.shipmentSubtotals.map((subtotal) => quoteFreeShippingThreshold({
        subtotal,
        currency: input.currency,
        usdInrRate: input.usdInrRate,
    }));
    const totalCharge = (0, currency_1.roundForCurrency)(perShipment.reduce((sum, q) => sum + q.charge, 0), input.currency);
    return { totalCharge, perShipment };
}
/** Subtotals keyed by vendor within one delivery address (includes add-ons). */
function vendorSubtotalsForItems(items) {
    const byVendor = new Map();
    for (const item of items) {
        const key = shippingVendorKey(item);
        byVendor.set(key, (byVendor.get(key) ?? 0) + (0, product_addons_1.cartLineUnitTotal)(item) * item.quantity);
    }
    return [...byVendor.values()];
}
function flashComboShippingQuote(currency, usdInrRate) {
    const charge = toCurrency(flash_sale_1.FLASH_COMBO_SHIPPING_USD, currency, usdInrRate);
    const thresholdInCurrency = toCurrency(exports.FREE_SHIPPING_MIN_SUBTOTAL_USD, currency, usdInrRate);
    const reducedThresholdInCurrency = toCurrency(exports.REDUCED_SHIPPING_MIN_SUBTOTAL_USD, currency, usdInrRate);
    return {
        charge,
        qualifiesForFreeShipping: false,
        amountAwayFromFreeShipping: 0,
        amountAwayFromReducedShipping: 0,
        thresholdInCurrency,
        reducedThresholdInCurrency,
        lowTierFeeInCurrency: toCurrency(exports.BELOW_THRESHOLD_SHIPPING_USD, currency, usdInrRate),
        midTierFeeInCurrency: toCurrency(exports.REDUCED_SHIPPING_USD, currency, usdInrRate),
        tier: "low",
        belowThresholdFeeInCurrency: charge,
    };
}
/**
 * Shipping for one delivery address: evaluate tiers per vendor inside that
 * address (HalloweenReady vs Orange County, etc.), then sum.
 * Flash-combo-only buckets use a flat $1 shipping fee.
 */
function quoteAddressShipmentShipping(input) {
    const byVendor = new Map();
    for (const item of input.items) {
        const key = shippingVendorKey(item);
        const list = byVendor.get(key) ?? [];
        list.push(item);
        byVendor.set(key, list);
    }
    const perVendor = [...byVendor.values()].map((vendorItems) => {
        const flashOnly = vendorItems.length > 0 &&
            vendorItems.every((i) => (0, flash_sale_1.isFlashComboProduct)(i.productSlug));
        if (flashOnly) {
            return flashComboShippingQuote(input.currency, input.usdInrRate);
        }
        // Must include add-ons — otherwise Razorpay totals diverge from checkout UI.
        const subtotal = vendorItems.reduce((sum, i) => sum + (0, product_addons_1.cartLineUnitTotal)(i) * i.quantity, 0);
        return quoteFreeShippingThreshold({
            subtotal,
            currency: input.currency,
            usdInrRate: input.usdInrRate,
        });
    });
    const totalCharge = (0, currency_1.roundForCurrency)(perVendor.reduce((sum, q) => sum + q.charge, 0), input.currency);
    return { totalCharge, perVendor };
}
