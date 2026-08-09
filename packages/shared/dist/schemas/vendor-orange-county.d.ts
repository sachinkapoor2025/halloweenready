import { z } from "zod";
/** Default lookback so vendors do not re-import the full history. */
export declare const VENDOR_ORDERS_DEFAULT_DAYS = 15;
/** Max orders returned per list page (use `cursor` for the next page). */
export declare const VENDOR_ORDERS_MAX_LIMIT = 200;
/** Default page size for GET /orders. */
export declare const VENDOR_ORDERS_DEFAULT_LIMIT = 50;
/** Vendor posts AWB when they ship an order. */
export declare const vendorShipmentUpdateSchema: z.ZodObject<{
    /**
     * Human order number (`OC10001`) or internal UUID.
     * Required when calling POST /vendors/orange-county/shipment (no path id).
     * Optional on POST .../orders/{orderId}/shipment (must match path when set).
     */
    orderNumber: z.ZodOptional<z.ZodString>;
    courierName: z.ZodString;
    awb: z.ZodString;
}, "strip", z.ZodTypeAny, {
    courierName: string;
    awb: string;
    orderNumber?: string | undefined;
}, {
    courierName: string;
    awb: string;
    orderNumber?: string | undefined;
}>;
export type VendorShipmentUpdate = z.infer<typeof vendorShipmentUpdateSchema>;
/** Vendor posts tracking status changes. */
export declare const vendorTrackingUpdateSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    orderNumber: z.ZodOptional<z.ZodString>;
    /** Preferred field name from Orange County. */
    currentShipmentStatus: z.ZodOptional<z.ZodString>;
    /** Alias of currentShipmentStatus (older docs). */
    currentStatus: z.ZodOptional<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    note?: string | undefined;
    orderNumber?: string | undefined;
    currentShipmentStatus?: string | undefined;
    currentStatus?: string | undefined;
}, {
    note?: string | undefined;
    orderNumber?: string | undefined;
    currentShipmentStatus?: string | undefined;
    currentStatus?: string | undefined;
}>, {
    note?: string | undefined;
    orderNumber?: string | undefined;
    currentShipmentStatus?: string | undefined;
    currentStatus?: string | undefined;
}, {
    note?: string | undefined;
    orderNumber?: string | undefined;
    currentShipmentStatus?: string | undefined;
    currentStatus?: string | undefined;
}>, {
    orderNumber: string | undefined;
    currentStatus: string;
    currentShipmentStatus: string;
    note: string | undefined;
}, {
    note?: string | undefined;
    orderNumber?: string | undefined;
    currentShipmentStatus?: string | undefined;
    currentStatus?: string | undefined;
}>;
export type VendorTrackingUpdate = z.infer<typeof vendorTrackingUpdateSchema>;
