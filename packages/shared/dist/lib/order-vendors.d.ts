import { VENDOR_ORANGE_COUNTY, VENDOR_HALLOWEENREADY, VENDOR_CJ_DROPSHIPPING } from "../constants";
export { VENDOR_HALLOWEENREADY, VENDOR_CJ_DROPSHIPPING };
export type OrderVendorSlug = typeof VENDOR_ORANGE_COUNTY | typeof VENDOR_HALLOWEENREADY | typeof VENDOR_CJ_DROPSHIPPING | string;
export type VendorFulfillment = {
    vendorSlug: string;
    warehouseId?: string;
    trackingNumber?: string;
    carrier?: string;
    /** pending until AWB recorded; shipped once tracking is set. */
    status?: "pending" | "processing" | "shipped" | "delivered";
    updatedAt?: string;
    /** CJ shopping order id after createOrderV2. */
    cjOrderId?: string;
    cjOrderNumber?: string;
    cjPayUrl?: string;
    /** True after CJ wallet or card payment succeeds. */
    cjPaid?: boolean;
    cjPaidAt?: string;
    cjOrderStatus?: string;
    /** CJ catalog cost in USD (excludes postage). */
    cjProductAmount?: number;
    /** CJ postage in USD. */
    cjPostageAmount?: number;
    /** What CJ charged (product + shipping). */
    cjActualPayment?: number;
};
export declare function lineVendorKey(item: {
    vendorSlug?: string | null;
}): string;
export declare function vendorDisplayLabel(slug: string): string;
/** Admin label for a CJ lane — “CJ order paid” after wallet/card payment. */
export declare function cjFulfillmentStatusLabel(f: VendorFulfillment): string;
/** Distinct fulfillment vendors present on the order (OccasionFun implied for untagged lines). */
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
    warehouseId?: string;
    trackingNumber?: string;
    carrier?: string;
    status?: VendorFulfillment["status"];
    updatedAt?: string;
    cjOrderId?: string;
    cjOrderNumber?: string;
    cjPayUrl?: string;
    cjPaid?: boolean;
    cjPaidAt?: string;
    cjOrderStatus?: string;
    cjProductAmount?: number;
    cjPostageAmount?: number;
    cjActualPayment?: number;
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
