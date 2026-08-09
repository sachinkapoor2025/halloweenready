"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHIPPING_VENDOR_HALLOWEENREADY = exports.REDUCED_SHIPPING_USD = exports.BELOW_THRESHOLD_SHIPPING_USD = exports.REDUCED_SHIPPING_MIN_SUBTOTAL_USD = exports.FREE_SHIPPING_MIN_SUBTOTAL_USD = void 0;
exports.quoteFreeShippingThreshold = quoteFreeShippingThreshold;
exports.shippingVendorKey = shippingVendorKey;
exports.quoteShipmentsShipping = quoteShipmentsShipping;
exports.vendorSubtotalsForItems = vendorSubtotalsForItems;
exports.quoteAddressShipmentShipping = quoteAddressShipmentShipping;
const currency_1 = require("../currency");
const flash_sale_1 = require("./flash-sale");
const product_addons_1 = require("./product-addons");
/** Cart subtotal at or above this (USD) unlocks free shipping. */
exports.FREE_SHIPPING_MIN_SUBTOTAL_USD = 10.99;
/**
 * At or above this (USD) and below free-shipping threshold → reduced $2.99 shipping.
 * Below this → $6.99 shipping.
 */
exports.REDUCED_SHIPPING_MIN_SUBTOTAL_USD = 7;
/** Flat shipping when bucket is under $7. */
exports.BELOW_THRESHOLD_SHIPPING_USD = 6.99;
/** Flat shipping when bucket is $7+ but under $10.99. */
exports.REDUCED_SHIPPING_USD = 2.99;
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
/**
 * Shipping tiers (per address × vendor bucket, in USD):
 * - under $7 → $6.99
 * - $7 to under $10.99 → $2.99
 * - $10.99+ → free
 * Evaluated in USD, then converted when the shopper currency is INR.
 */
function quoteFreeShippingThreshold(input) {
    const { subtotal, currency, usdInrRate } = input;
    const thresholdInCurrency = toCurrency(exports.FREE_SHIPPING_MIN_SUBTOTAL_USD, currency, usdInrRate);
    const reducedThresholdInCurrency = toCurrency(exports.REDUCED_SHIPPING_MIN_SUBTOTAL_USD, currency, usdInrRate);
    const lowTierFee = toCurrency(exports.BELOW_THRESHOLD_SHIPPING_USD, currency, usdInrRate);
    const midTierFee = toCurrency(exports.REDUCED_SHIPPING_USD, currency, usdInrRate);
    const subtotalUsd = toUsd(subtotal, currency, usdInrRate);
    let charge = 0;
    let qualifiesForFreeShipping = false;
    let tier = "low";
    if (subtotalUsd >= exports.FREE_SHIPPING_MIN_SUBTOTAL_USD) {
        qualifiesForFreeShipping = true;
        tier = "free";
        charge = 0;
    }
    else if (subtotalUsd >= exports.REDUCED_SHIPPING_MIN_SUBTOTAL_USD) {
        tier = "mid";
        charge = midTierFee;
    }
    else {
        tier = "low";
        charge = lowTierFee;
    }
    const amountAwayFromFreeShipping = qualifiesForFreeShipping
        ? 0
        : Math.max(0, (0, currency_1.roundForCurrency)(thresholdInCurrency - subtotal, currency));
    const amountAwayFromReducedShipping = tier === "low"
        ? Math.max(0, (0, currency_1.roundForCurrency)(reducedThresholdInCurrency - subtotal, currency))
        : 0;
    return {
        charge,
        qualifiesForFreeShipping,
        amountAwayFromFreeShipping,
        amountAwayFromReducedShipping,
        thresholdInCurrency,
        reducedThresholdInCurrency,
        lowTierFeeInCurrency: lowTierFee,
        midTierFeeInCurrency: midTierFee,
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
