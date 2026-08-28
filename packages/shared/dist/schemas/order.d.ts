import { z } from "zod";
/** International phone: 10–15 digits; allows +, spaces, dashes, parentheses. */
export declare function isValidShippingPhone(phone: string): boolean;
export declare const shippingAddressSchema: any;
export declare const DEFAULT_SENDER_MESSAGE = "Happy Halloween! Please accept this package of spooky surprises from HalloweenReady.";
export declare const checkoutShippingAddressSchema: any;
/** Line assignment for a checkout shipment (must partition the cart). */
export declare const checkoutShipmentItemSchema: any;
export declare const checkoutShipmentSchema: any;
export declare const checkoutSchema: any;
/** Persisted per-delivery package on an order. */
export declare const orderShipmentSchema: any;
export declare const orderStatusHistoryEntrySchema: any;
export declare const orderSchema: any;
/** Admin order status update payload. */
export declare const orderStatusUpdateSchema: any;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type CheckoutShipment = z.infer<typeof checkoutShipmentSchema>;
export type OrderShipment = z.infer<typeof orderShipmentSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type OrderStatusUpdate = z.infer<typeof orderStatusUpdateSchema>;
export type OrderStatusHistoryEntry = z.infer<typeof orderStatusHistoryEntrySchema>;
export type Order = z.infer<typeof orderSchema> & {
    createdAt: string;
    updatedAt: string;
};
