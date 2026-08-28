import { z } from "zod";
/** Default lookback so vendors do not re-import the full history. */
export declare const VENDOR_ORDERS_DEFAULT_DAYS = 15;
/** Max orders returned per list page (use `cursor` for the next page). */
export declare const VENDOR_ORDERS_MAX_LIMIT = 200;
/** Default page size for GET /orders. */
export declare const VENDOR_ORDERS_DEFAULT_LIMIT = 50;
/** Vendor posts AWB when they ship an order. */
export declare const vendorShipmentUpdateSchema: any;
export type VendorShipmentUpdate = z.infer<typeof vendorShipmentUpdateSchema>;
/** Vendor posts tracking status changes. */
export declare const vendorTrackingUpdateSchema: any;
export type VendorTrackingUpdate = z.infer<typeof vendorTrackingUpdateSchema>;
