/** Destinations the storefront can request a live CJ freight quote for. */
export declare const QUOTEABLE_SHIP_COUNTRIES: readonly ["US", "CA", "GB", "AU", "DE"];
export type ShippingAvailability = "available" | "quoteable" | "unknown" | "unavailable";
export type ShippingAvailabilityProduct = {
    availableCountryCodes?: string[] | null;
    inventory?: number | null;
};
export declare function isQuoteableStorefrontCountry(countryCode: string): boolean;
/**
 * SEO/catalog availability — conservative.
 * `availableCountryCodes` is the only hard allow/deny list.
 * Otherwise US/CA/GB/AU/DE are quoteable (not guaranteed) via the product shipping API.
 * Never treat CJ marketing ("200+ countries") as per-SKU availability.
 */
export declare function isProductAvailableForCountry(product: ShippingAvailabilityProduct, countryCode: string): ShippingAvailability;
export declare function getAvailableProductsForCountry<T extends ShippingAvailabilityProduct>(products: readonly T[], countryCode: string): T[];
export declare function getCountryShippingStatus(countryCode: string): {
    quoteableOnStorefront: boolean;
    lastSync: null;
};
