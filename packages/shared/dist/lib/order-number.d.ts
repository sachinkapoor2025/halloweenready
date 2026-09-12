/** Human-readable order numbers: OC10001… (Orange County) / HW10001… (HalloweenReady). */
export declare const ORDER_NUMBER_START = 10001;
export type OrderNumberPrefix = "OC" | "HW";
/** Legacy HalloweenReady prefix still stored on older orders. */
export type LegacyOrderNumberPrefix = "US";
export type StoredOrderNumberPrefix = OrderNumberPrefix | LegacyOrderNumberPrefix;
export declare function isHumanOrderNumber(value: string): boolean;
export declare function parseHumanOrderNumber(value: string): {
    prefix: StoredOrderNumberPrefix;
    seq: number;
} | null;
export declare function formatOrderNumber(prefix: StoredOrderNumberPrefix, seq: number): string;
/**
 * HW continues the existing US Dynamo counter so numbers stay sequential
 * (US10007, then HW10008…).
 */
export declare function orderNumberCounterPrefix(prefix: StoredOrderNumberPrefix): LegacyOrderNumberPrefix | "OC";
/** Prefer human orderNumber when present; else short UUID for display. */
export declare function displayOrderRef(order: {
    orderNumber?: string | null;
    orderId: string;
}): string;
/** OC prefix when the order includes any Orange County vendor lines. */
export declare function orderNumberPrefixForItems(items: Array<{
    vendorSlug?: string | null;
}>, vendorSlugs?: string[] | null): OrderNumberPrefix;
