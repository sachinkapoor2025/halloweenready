/** Human-readable order numbers: OC10001… (Orange County) / OF10001… (OccasionFun). */
export declare const ORDER_NUMBER_START = 10001;
export type OrderNumberPrefix = "OC" | "OF";
/** Legacy prefixes still stored on older orders. */
export type LegacyOrderNumberPrefix = "US" | "HW";
export type StoredOrderNumberPrefix = OrderNumberPrefix | LegacyOrderNumberPrefix;
export declare function isHumanOrderNumber(value: string): boolean;
export declare function parseHumanOrderNumber(value: string): {
    prefix: StoredOrderNumberPrefix;
    seq: number;
} | null;
export declare function formatOrderNumber(prefix: StoredOrderNumberPrefix, seq: number): string;
/**
 * OF continues the existing US Dynamo counter so numbers stay sequential.
 */
export declare function orderNumberCounterPrefix(prefix: StoredOrderNumberPrefix): "OC" | "US";
/** Prefer human orderNumber when present; else short UUID for display. */
export declare function displayOrderRef(order: {
    orderNumber?: string | null;
    orderId: string;
}): string;
/** OC prefix when the order includes any Orange County vendor lines. */
export declare function orderNumberPrefixForItems(items: Array<{
    vendorSlug?: string | null;
}>, vendorSlugs?: string[] | null): OrderNumberPrefix;
