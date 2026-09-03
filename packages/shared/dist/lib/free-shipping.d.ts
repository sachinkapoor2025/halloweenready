import { type ShopCurrency } from "../currency";
/** Cart subtotal at or above this (USD) unlocks free shipping. */
export declare const FREE_SHIPPING_MIN_SUBTOTAL_USD = 49;
/**
 * Paid shipping bands (USD). `maxUsd` is exclusive.
 * below $10 → $10; below $20 → $8; below $30 → $6; below $40 → $4; below $49 → $2.
 */
export declare const SHIPPING_RATE_BANDS: readonly [{
    readonly minUsd: 0;
    readonly maxUsd: 10;
    readonly feeUsd: 10;
}, {
    readonly minUsd: 10;
    readonly maxUsd: 20;
    readonly feeUsd: 8;
}, {
    readonly minUsd: 20;
    readonly maxUsd: 30;
    readonly feeUsd: 6;
}, {
    readonly minUsd: 30;
    readonly maxUsd: 40;
    readonly feeUsd: 4;
}, {
    readonly minUsd: 40;
    readonly maxUsd: 49;
    readonly feeUsd: 2;
}];
export type ShippingRateBand = (typeof SHIPPING_RATE_BANDS)[number];
/** Lowest paid fee (cart under $10). Kept for existing imports. */
export declare const BELOW_THRESHOLD_SHIPPING_USD: 10;
/** Start of the $2 shipping band (cart $40–$48.99). */
export declare const REDUCED_SHIPPING_MIN_SUBTOTAL_USD = 40;
/** $2 shipping when cart is $40+ but under $49. */
export declare const REDUCED_SHIPPING_USD = 2;
export type FreeShippingTier = "low" | "mid" | "free";
export type FreeShippingQuote = {
    /** Shipping charged to the customer in `currency`. */
    charge: number;
    qualifiesForFreeShipping: boolean;
    /** How much more cart value (in `currency`) is needed for free shipping. */
    amountAwayFromFreeShipping: number;
    /** How much more cart value (in `currency`) is needed to reach the next cheaper paid band. */
    amountAwayFromReducedShipping: number;
    /** Free-shipping threshold expressed in `currency`. */
    thresholdInCurrency: number;
    /** Next cheaper paid-band minimum, or the $2-band minimum when already there. */
    reducedThresholdInCurrency: number;
    /** Current band fee in `currency` (or $10 band fee when free). */
    lowTierFeeInCurrency: number;
    /** Next cheaper paid fee in `currency` (or $2 when none). */
    midTierFeeInCurrency: number;
    /** Current tier for this bucket. `mid` = $2 band; `low` = any higher paid fee. */
    tier: FreeShippingTier;
    /** Shipping fee for the current bucket tier, in `currency`. */
    belowThresholdFeeInCurrency: number;
};
export declare function shippingBandForSubtotalUsd(subtotalUsd: number): ShippingRateBand | null;
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
export declare function quoteFreeShippingThreshold(input: {
    subtotal: number;
    currency: ShopCurrency;
    usdInrRate: number;
}): FreeShippingQuote;
/** Default vendor bucket for catalog SKUs without `vendorSlug` (HalloweenReady). */
export declare const SHIPPING_VENDOR_HALLOWEENREADY = "halloweenready";
/** Normalize cart/product vendor for per-vendor free-shipping buckets. */
export declare function shippingVendorKey(item: {
    vendorSlug?: string;
}): string;
/**
 * Free-shipping groups: each subtotal is one chargeable bucket
 * (delivery address × vendor). Tiers apply per bucket; total = sum.
 */
export declare function quoteShipmentsShipping(input: {
    shipmentSubtotals: number[];
    currency: ShopCurrency;
    usdInrRate: number;
}): {
    totalCharge: number;
    perShipment: FreeShippingQuote[];
};
/** Subtotals keyed by vendor within one delivery address (includes add-ons). */
export declare function vendorSubtotalsForItems(items: Array<{
    price: number;
    quantity: number;
    vendorSlug?: string;
    addons?: Array<{
        price: number;
        quantity: number;
    }>;
}>): number[];
/**
 * Shipping for one delivery address: evaluate tiers per vendor inside that
 * address (HalloweenReady vs Orange County, etc.), then sum.
 * Flash-combo-only buckets use a flat $1 shipping fee.
 */
export declare function quoteAddressShipmentShipping(input: {
    items: Array<{
        price: number;
        quantity: number;
        vendorSlug?: string;
        productSlug?: string;
        addons?: Array<{
            price: number;
            quantity: number;
        }>;
    }>;
    currency: ShopCurrency;
    usdInrRate: number;
}): {
    totalCharge: number;
    perVendor: FreeShippingQuote[];
};
