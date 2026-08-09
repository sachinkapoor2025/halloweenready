import { type ShopCurrency } from "../currency";
/** Cart subtotal at or above this (USD) unlocks free shipping. */
export declare const FREE_SHIPPING_MIN_SUBTOTAL_USD = 10.99;
/**
 * At or above this (USD) and below free-shipping threshold → reduced $2.99 shipping.
 * Below this → $6.99 shipping.
 */
export declare const REDUCED_SHIPPING_MIN_SUBTOTAL_USD = 7;
/** Flat shipping when bucket is under $7. */
export declare const BELOW_THRESHOLD_SHIPPING_USD = 6.99;
/** Flat shipping when bucket is $7+ but under $10.99. */
export declare const REDUCED_SHIPPING_USD = 2.99;
export type FreeShippingTier = "low" | "mid" | "free";
export type FreeShippingQuote = {
    /** Shipping charged to the customer in `currency`. */
    charge: number;
    qualifiesForFreeShipping: boolean;
    /** How much more cart value (in `currency`) is needed for free shipping. */
    amountAwayFromFreeShipping: number;
    /** How much more cart value (in `currency`) is needed to reach the $2.99 tier. */
    amountAwayFromReducedShipping: number;
    /** Free-shipping threshold expressed in `currency`. */
    thresholdInCurrency: number;
    /** Reduced-shipping ($2.99) threshold expressed in `currency`. */
    reducedThresholdInCurrency: number;
    /** $6.99 tier fee in `currency`. */
    lowTierFeeInCurrency: number;
    /** $2.99 tier fee in `currency`. */
    midTierFeeInCurrency: number;
    /** Current tier for this bucket. */
    tier: FreeShippingTier;
    /** Shipping fee for the current bucket tier, in `currency`. */
    belowThresholdFeeInCurrency: number;
};
/**
 * Shipping tiers (per address × vendor bucket, in USD):
 * - under $7 → $6.99
 * - $7 to under $10.99 → $2.99
 * - $10.99+ → free
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
