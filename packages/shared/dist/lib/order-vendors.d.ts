import { VENDOR_ORANGE_COUNTY, VENDOR_HALLOWEENREADY } from "../constants";
export { VENDOR_HALLOWEENREADY };
export type OrderVendorSlug = typeof VENDOR_ORANGE_COUNTY | typeof VENDOR_HALLOWEENREADY | string;
export type VendorFulfillment = {
    vendorSlug: string;
    trackingNumber?: string;
    carrier?: string;
    /** pending until AWB recorded; shipped once tracking is set. */
    status?: "pending" | "processing" | "shipped" | "delivered";
    updatedAt?: string;
};
export declare function lineVendorKey(item: {
    vendorSlug?: string | null;
}): string;
export declare function vendorDisplayLabel(slug: string): string;
/** Distinct fulfillment vendors present on the order (HalloweenReady implied for untagged lines). */
export declare function orderVendorKeys(order: {
    vendorSlugs?: string[];
    items?: Array<{
        vendorSlug?: string | null;
    }>;
}): string[];
export declare function orderHasVendor(order: {
    vendorSlugs?: string[];
    items?: Array<{
        vendorSlug?: string | null;
    }>;
}, vendor: string): boolean;
export declare function orderHasOrangeCounty(order: {
    vendorSlugs?: string[];
    items?: Array<{
        vendorSlug?: string | null;
    }>;
}): boolean;
export declare function orderHasUsarakhi(order: {
    vendorSlugs?: string[];
    items?: Array<{
        vendorSlug?: string | null;
    }>;
}): boolean;
export declare function isMultiVendorOrder(order: {
    vendorSlugs?: string[];
    items?: Array<{
        vendorSlug?: string | null;
    }>;
}): boolean;
/** Build / refresh per-vendor fulfillment rows from line items + existing data. */
export declare function ensureVendorFulfillments(order: {
    vendorSlugs?: string[];
    items?: Array<{
        vendorSlug?: string | null;
    }>;
    vendorFulfillments?: VendorFulfillment[];
    trackingNumber?: string;
    carrier?: string;
}): VendorFulfillment[];
export declare function upsertVendorFulfillment(fulfillments: VendorFulfillment[], patch: {
    vendorSlug: string;
    trackingNumber?: string;
    carrier?: string;
    status?: VendorFulfillment["status"];
    updatedAt?: string;
}): VendorFulfillment[];
export declare function allVendorsHaveTracking(fulfillments: VendorFulfillment[]): boolean;
export declare function anyVendorHasTracking(fulfillments: VendorFulfillment[]): boolean;
/** Prefer first non-empty tracking for legacy order.trackingNumber field. */
export declare function primaryTrackingFromFulfillments(fulfillments: VendorFulfillment[]): {
    trackingNumber?: string;
    carrier?: string;
};
export declare function buildInitialVendorFulfillments(items: Array<{
    vendorSlug?: string | null;
}>): VendorFulfillment[];
