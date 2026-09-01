import { type ShopCurrency } from "../currency";
/** Round money to cents for USD (or currency-aware). */
export declare function roundMoney(n: number, currency?: ShopCurrency): number;
/**
 * Convert vendor wholesale cost → store list + sale prices.
 * Sale targets ~50% gross margin; list is higher for the sale strikethrough.
 * Vendor identity is backend-only — not part of customer-facing copy.
 */
export declare function pricingFromVendorCost(vendorCost: number, currency?: ShopCurrency): {
    vendorCost: number;
    price: number;
    compareAtPrice: number;
};
/** Strip backend-only vendor fields before public product APIs / SSR. */
export declare function stripVendorPrivateFields<T extends {
    vendorCost?: number;
    vendorSlug?: string;
    cjVariants?: Array<{
        vendorCost?: number;
    }>;
}>(product: T): Omit<T, "vendorCost" | "vendorSlug">;
/** @deprecated Use stripVendorPrivateFields */
export declare function stripVendorCost<T extends {
    vendorCost?: number;
}>(product: T): Omit<T, "vendorCost">;
