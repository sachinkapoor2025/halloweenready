"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorTrackingUpdateSchema = exports.vendorShipmentUpdateSchema = exports.VENDOR_ORDERS_DEFAULT_LIMIT = exports.VENDOR_ORDERS_MAX_LIMIT = exports.VENDOR_ORDERS_DEFAULT_DAYS = void 0;
const zod_1 = require("zod");
/** Default lookback so vendors do not re-import the full history. */
exports.VENDOR_ORDERS_DEFAULT_DAYS = 15;
/** Max orders returned per list page (use `cursor` for the next page). */
exports.VENDOR_ORDERS_MAX_LIMIT = 200;
/** Default page size for GET /orders. */
exports.VENDOR_ORDERS_DEFAULT_LIMIT = 50;
/** Vendor posts AWB when they ship an order. */
exports.vendorShipmentUpdateSchema = zod_1.z.object({
    /**
     * Human order number (`OC10001`) or internal UUID.
     * Required when calling POST /vendors/orange-county/shipment (no path id).
     * Optional on POST .../orders/{orderId}/shipment (must match path when set).
     */
    orderNumber: zod_1.z.string().min(1).max(80).optional(),
    courierName: zod_1.z.string().trim().min(1).max(80),
    awb: zod_1.z.string().trim().min(3).max(80),
});
/** Vendor posts tracking status changes. */
exports.vendorTrackingUpdateSchema = zod_1.z
    .object({
    orderNumber: zod_1.z.string().min(1).max(80).optional(),
    /** Preferred field name from Orange County. */
    currentShipmentStatus: zod_1.z.string().trim().min(1).max(80).optional(),
    /** Alias of currentShipmentStatus (older docs). */
    currentStatus: zod_1.z.string().trim().min(1).max(80).optional(),
    note: zod_1.z.string().trim().max(500).optional(),
})
    .superRefine((value, ctx) => {
    if (!value.currentShipmentStatus?.trim() && !value.currentStatus?.trim()) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "currentShipmentStatus (or currentStatus) is required",
            path: ["currentShipmentStatus"],
        });
    }
})
    .transform((value) => ({
    orderNumber: value.orderNumber,
    currentStatus: (value.currentShipmentStatus || value.currentStatus || "").trim(),
    currentShipmentStatus: (value.currentShipmentStatus || value.currentStatus || "").trim(),
    note: value.note,
}));
