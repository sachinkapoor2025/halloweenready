import { type ShopCurrency } from "../currency";
/**
 * Competitive storefront price cuts (applied to catalog selling price before FX).
 * Same % applies in USD and INR because conversion happens after this reduction.
 *
 * - under $25 → 8% off
 * - $25–$29.99 → 10% off
 * - $30+ → 12% off
 */
export declare function getCompetitiveDiscountPercent(price: number): number;
/** Reduce a catalog price by the competitive tier %; rounds for the currency. */
export declare function applyCompetitivePriceReduction(price: number, currency?: ShopCurrency): number;
type Priced = {
    price: number;
    compareAtPrice?: number;
    currency?: ShopCurrency;
    /** Set after competitive pricing runs — makes this helper idempotent across API/catalog paths. */
    storefrontPricingApplied?: boolean;
};
/**
 * Storefront view of a product: lower selling price + keep/raise compare-at
 * so the original catalog price still shows as strikethrough.
 * Does not mutate DynamoDB — admin continues to see stored prices.
 */
type VendorPriced = Priced & {
    vendorSlug?: string;
    categorySlug?: string;
    couponExcluded?: boolean;
    tags?: string[];
    slug?: string;
};
/**
 * Storefront view of a product: lower selling price + keep/raise compare-at
 * so the original catalog price still shows as strikethrough.
 * Vendor-priced products (e.g. Orange County hampers) keep their sale/list prices as stored.
 * Safe to call more than once — never stacks competitive cuts.
 */
export declare function withCompetitiveStorefrontPricing<T extends VendorPriced>(product: T): T;
export {};
