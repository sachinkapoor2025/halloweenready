/** Flash combo platform hooks — HalloweenReady has no active usarakhi flash SKU. */
export declare const FLASH_COMBO_SALE_SLUG = "blue-beads-om-pista-flash-combo";
/** Inclusive start of the sale window (UTC). 24h from this instant. */
export declare const FLASH_COMBO_SALE_STARTED_AT = "2026-08-03T20:17:00.000Z";
/** Sale length from start. */
export declare const FLASH_COMBO_SALE_DURATION_MS: number;
/** Flat shipping for flash-combo-only vendor buckets (USD). */
export declare const FLASH_COMBO_SHIPPING_USD = 0.99;
export declare const FLASH_COMBO_SALE: {
    readonly slug: "blue-beads-om-pista-flash-combo";
    readonly title: "24-Hour Flash Sale";
    readonly headline: "Grab Your Offer (5 product combo)";
    readonly priceUsd: 12.96;
    readonly compareAtUsd: 24.99;
    readonly shippingUsd: 0.99;
    readonly includes: readonly ["Halloween flash offer item 1", "Halloween flash offer item 2", "Halloween flash offer item 3"];
    /** Canonical gallery — overrides stale Dynamo images on storefront. */
    readonly images: readonly ["https://www.halloweenready.com/banners/bannerpage1.png", "https://www.halloweenready.com/banners/bannerpage2.png"];
};
export declare function flashComboSaleEndsAt(): Date;
export declare function isFlashComboSaleActive(now?: Date): boolean;
export declare function isFlashComboProduct(slug: string | undefined | null): boolean;
/** True when storefront/cart must keep the exact listed price (no competitive cut). */
export declare function productUsesFixedStorefrontPrice(product: {
    couponExcluded?: boolean;
    tags?: string[];
    slug?: string;
}): boolean;
/** Force flash-combo list price + gallery from code (ignores stale Dynamo data). */
export declare function withFlashComboStorefrontPricing<T extends {
    slug?: string;
    price: number;
    compareAtPrice?: number;
    couponExcluded?: boolean;
    images?: string[];
}>(product: T): T;
/** Unit price charged for the flash combo (cart / checkout). */
export declare function flashComboUnitPriceUsd(): number;
type CouponLine = {
    price: number;
    quantity: number;
    couponExcluded?: boolean;
    productSlug?: string;
    addons?: Array<{
        price: number;
        quantity: number;
    }>;
};
/** Subtotal of cart lines that coupons may discount. */
export declare function couponEligibleSubtotal(items: CouponLine[]): number;
export declare function cartHasCouponExcludedItems(items: CouponLine[]): boolean;
export {};
