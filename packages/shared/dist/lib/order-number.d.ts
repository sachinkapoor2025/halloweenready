/** Human-readable order numbers: OC10001… (Orange County) / US10001… (all others). */
export declare const ORDER_NUMBER_START = 10001;
export type OrderNumberPrefix = "OC" | "US";
export declare function isHumanOrderNumber(value: string): boolean;
export declare function parseHumanOrderNumber(value: string): {
    prefix: OrderNumberPrefix;
    seq: number;
} | null;
export declare function formatOrderNumber(prefix: OrderNumberPrefix, seq: number): string;
/** Prefer human orderNumber when present; else short UUID for display. */
export declare function displayOrderRef(order: {
    orderNumber?: string | null;
    orderId: string;
}): string;
/** OC prefix when the order includes any Orange County vendor lines. */
export declare function orderNumberPrefixForItems(items: Array<{
    vendorSlug?: string | null;
}>, vendorSlugs?: string[] | null): OrderNumberPrefix;
