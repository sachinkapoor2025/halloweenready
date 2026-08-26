import type { InventoryListing, Market, MarketContact, OrderFulfillmentAssignment, VendorRecord, Warehouse } from "../schemas/markets";
/** European country codes we may serve from the UK warehouse (never a fake "EU" country). */
export declare const EUROPEAN_COUNTRY_CODES: readonly ["GB", "IE", "DE", "FR", "ES", "IT", "NL", "BE", "AT", "PT", "SE", "DK", "FI", "PL", "CZ"];
export declare const DEFAULT_MARKET_COUNTRY = "US";
export declare const WAREHOUSE_US_ID = "us-warehouse";
export declare const WAREHOUSE_UK_ID = "uk-warehouse";
export declare const WAREHOUSE_IN_ID = "in-warehouse";
export declare function normalizePhoneDigits(phone: string | undefined | null): string;
export declare const DEFAULT_WAREHOUSES: Warehouse[];
export declare const DEFAULT_VENDORS: VendorRecord[];
export declare const DEFAULT_MARKETS: Market[];
export declare function validatePostalCode(countryCode: string, postalCode: string | undefined | null): {
    valid: boolean;
    normalized: string;
    message?: string;
};
export declare function warehouseServesCountry(warehouse: Warehouse, countryCode: string): boolean;
export declare function warehouseServesPostal(warehouse: Warehouse, countryCode: string, postalCode?: string): boolean;
export declare function eligibleWarehouses(opts: {
    warehouses: Warehouse[];
    countryCode: string;
    postalCode?: string;
    vendorId?: string | null;
}): Warehouse[];
export declare function estimateDeliveryDays(warehouse: Warehouse, countryCode: string): number;
export declare function assignFulfillment(opts: {
    items: Array<{
        productSlug: string;
        vendorSlug?: string | null;
    }>;
    destinationCountry: string;
    postalCode?: string;
    warehouses: Warehouse[];
    vendors: VendorRecord[];
    listings?: InventoryListing[];
}): OrderFulfillmentAssignment;
export declare function productAvailableInCountry(opts: {
    availableCountryCodes?: string[] | null;
    listings?: InventoryListing[];
    productSlug: string;
    countryCode: string;
}): boolean;
export declare function publicMarketContact(market: Market): MarketContact;
export declare function marketByCountry(markets: Market[], countryCode: string): Market | undefined;
export declare function marketBySlug(markets: Market[], slug: string): Market | undefined;
export declare function checkoutCurrencyForMarket(market: Market | undefined): "USD" | "INR";
