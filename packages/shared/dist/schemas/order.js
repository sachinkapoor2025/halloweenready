"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStatusUpdateSchema = exports.orderSchema = exports.orderStatusHistoryEntrySchema = exports.orderShipmentSchema = exports.checkoutSchema = exports.checkoutShipmentSchema = exports.checkoutShipmentItemSchema = exports.checkoutShippingAddressSchema = exports.DEFAULT_SENDER_MESSAGE = exports.shippingAddressSchema = void 0;
exports.isValidShippingPhone = isValidShippingPhone;
const zod_1 = require("zod");
const cart_1 = require("./cart");
const constants_1 = require("../constants");
const attribution_1 = require("./attribution");
/** International phone: 10–15 digits; allows +, spaces, dashes, parentheses. */
function isValidShippingPhone(phone) {
    const trimmed = phone.trim();
    if (!trimmed)
        return false;
    if (!/^\+?[\d\s().-]{10,22}$/.test(trimmed))
        return false;
    const digits = trimmed.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 15;
}
const phoneSchema = zod_1.z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine(isValidShippingPhone, {
    message: "Enter a valid phone number with country code (e.g. +1 408 555 0100 or +91 98765 43210)",
});
exports.shippingAddressSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    line1: zod_1.z.string().min(1),
    line2: zod_1.z.string().optional(),
    city: zod_1.z.string().min(1),
    state: zod_1.z.string().min(1),
    postalCode: zod_1.z.string().min(1),
    country: zod_1.z.string().min(2).max(2),
    phone: phoneSchema,
    email: zod_1.z.string().email(),
    /** Buyer / sender name — shown on the shipping label. */
    senderName: zod_1.z.string().trim().max(80).optional(),
    /** Personal note from sister — printed on the shipping label. */
    senderMessage: zod_1.z.string().trim().max(500).optional(),
});
exports.DEFAULT_SENDER_MESSAGE = "Happy Halloween! Please accept this package of spooky surprises from HalloweenReady.";
exports.checkoutShippingAddressSchema = exports.shippingAddressSchema.extend({
    senderName: zod_1.z
        .string()
        .trim()
        .min(1, "Sender name is required")
        .max(80, "Sender name is too long"),
    senderMessage: zod_1.z
        .string()
        .trim()
        .min(10, "Please write a short message for your brother")
        .max(500, "Message is too long (max 500 characters)"),
});
/** Line assignment for a checkout shipment (must partition the cart). */
exports.checkoutShipmentItemSchema = zod_1.z.object({
    productSlug: zod_1.z.string().min(1),
    quantity: zod_1.z.number().int().positive(),
});
exports.checkoutShipmentSchema = zod_1.z.object({
    shippingAddress: exports.checkoutShippingAddressSchema,
    items: zod_1.z.array(exports.checkoutShipmentItemSchema).min(1),
});
exports.checkoutSchema = zod_1.z.object({
    shippingAddress: exports.checkoutShippingAddressSchema,
    /**
     * Optional multi-address split. When omitted, the whole cart ships to
     * `shippingAddress`. When present, must cover every cart line exactly once.
     */
    shipments: zod_1.z.array(exports.checkoutShipmentSchema).min(1).max(40).optional(),
    paymentMethod: zod_1.z.enum(["stripe", "razorpay"]),
    /** Customer-selected display/checkout currency (from currency switcher). */
    checkoutCurrency: zod_1.z.enum(["USD", "INR"]).optional(),
    /** Live USD→INR rate shown to the customer (optional; server validates). */
    usdInrRate: zod_1.z.number().positive().max(200).optional(),
    /** Welcome or promo coupon (e.g. HALLOWEEN-ABC123). */
    couponCode: zod_1.z.string().min(4).max(32).optional(),
    /** Customer-requested delivery date (YYYY-MM-DD), max 2026-08-28. */
    preferredDeliveryDate: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD")
        .optional(),
    /** Customer override — must match a returned rate. */
    shippingServiceCode: zod_1.z.string().optional(),
    shippingRateId: zod_1.z.string().optional(),
    /** First/last-touch marketing attribution snapshot from the browser. */
    attribution: attribution_1.checkoutAttributionSchema.optional(),
});
/** Persisted per-delivery package on an order. */
exports.orderShipmentSchema = zod_1.z.object({
    shipmentId: zod_1.z.string(),
    shippingAddress: exports.shippingAddressSchema,
    items: zod_1.z.array(cart_1.cartItemSchema).min(1),
    subtotal: zod_1.z.number(),
    shipping: zod_1.z.number().default(0),
    trackingNumber: zod_1.z.string().optional(),
    carrier: zod_1.z.string().optional(),
    shippingServiceCode: zod_1.z.string().optional(),
    shippingServiceName: zod_1.z.string().optional(),
    shippingRateId: zod_1.z.string().optional(),
    estimatedLabelCost: zod_1.z.number().optional(),
    labelCost: zod_1.z.number().optional(),
    labelPdfUrl: zod_1.z.string().optional(),
    labelStatus: zod_1.z.enum(["none", "queued", "purchased", "failed"]).optional(),
    labelError: zod_1.z.string().optional(),
});
const orderStatusEnum = zod_1.z.enum([
    constants_1.ORDER_STATUS.PENDING_PAYMENT,
    constants_1.ORDER_STATUS.PAID,
    constants_1.ORDER_STATUS.ACCEPTED,
    constants_1.ORDER_STATUS.ON_HOLD,
    constants_1.ORDER_STATUS.PROCESSING,
    constants_1.ORDER_STATUS.SHIPPED,
    constants_1.ORDER_STATUS.DELIVERED,
    constants_1.ORDER_STATUS.COMPLETE,
    constants_1.ORDER_STATUS.CANCELLED,
    constants_1.ORDER_STATUS.REFUNDED,
]);
exports.orderStatusHistoryEntrySchema = zod_1.z.object({
    status: orderStatusEnum,
    at: zod_1.z.string(),
    note: zod_1.z.string().optional(),
});
exports.orderSchema = zod_1.z.object({
    orderId: zod_1.z.string(),
    /**
     * Human-readable order number for staff, customers, and vendors.
     * Orange County fulfill orders: OC10001…
     * All other HalloweenReady orders: US10001…
     */
    orderNumber: zod_1.z.string().optional(),
    userId: zod_1.z.string().optional(),
    sessionId: zod_1.z.string().optional(),
    items: zod_1.z.array(cart_1.cartItemSchema),
    subtotal: zod_1.z.number(),
    discount: zod_1.z.number().default(0),
    couponCode: zod_1.z.string().optional(),
    shipping: zod_1.z.number().default(0),
    tax: zod_1.z.number().default(0),
    total: zod_1.z.number(),
    currency: zod_1.z.enum(["USD", "INR"]),
    /** Distinct vendorSlug values present on line items (for vendor order APIs). */
    vendorSlugs: zod_1.z.array(zod_1.z.string()).optional(),
    status: orderStatusEnum,
    statusHistory: zod_1.z.array(exports.orderStatusHistoryEntrySchema).optional(),
    /** Primary / first delivery address (always set; mirrors shipments[0] when multi). */
    shippingAddress: exports.shippingAddressSchema,
    /** Multi-address deliveries. Omitted on older single-address orders. */
    shipments: zod_1.z.array(exports.orderShipmentSchema).optional(),
    paymentProvider: zod_1.z.enum(["stripe", "razorpay"]).optional(),
    paymentIntentId: zod_1.z.string().optional(),
    razorpayOrderId: zod_1.z.string().optional(),
    razorpayPaymentId: zod_1.z.string().optional(),
    trackingNumber: zod_1.z.string().optional(),
    carrier: zod_1.z.string().optional(),
    /**
     * Per-vendor fulfillment (tracking) for mixed Orange County + HalloweenReady carts.
     * Legacy single-vendor orders may only have top-level trackingNumber/carrier.
     */
    vendorFulfillments: zod_1.z
        .array(zod_1.z.object({
        vendorSlug: zod_1.z.string().min(1).max(80),
        trackingNumber: zod_1.z.string().optional(),
        carrier: zod_1.z.string().optional(),
        status: zod_1.z.enum(["pending", "processing", "shipped", "delivered"]).optional(),
        updatedAt: zod_1.z.string().optional(),
    }))
        .optional(),
    /** Last shipment status string received from vendor tracking API (e.g. in_transit). */
    vendorShipmentStatus: zod_1.z.string().max(80).optional(),
    adminNotes: zod_1.z.string().max(2000).optional(),
    estimatedDeliveryAt: zod_1.z.string().optional(),
    deliveredAt: zod_1.z.string().optional(),
    /** ISO timestamp when post-delivery review email should send (deliveredAt + 1 day). */
    reviewEmailDueAt: zod_1.z.string().optional(),
    /** Set after review request email is sent (idempotency). */
    reviewEmailSentAt: zod_1.z.string().optional(),
    /** Last pending-payment reminder send time (ISO). */
    pendingPaymentReminderLastSentAt: zod_1.z.string().optional(),
    /** America/New_York calendar day (YYYY-MM-DD) of last pending-payment reminder. */
    pendingPaymentReminderLastDateKey: zod_1.z.string().optional(),
    /** How many pending-payment reminder emails have been sent. */
    pendingPaymentReminderCount: zod_1.z.number().int().min(0).optional(),
    /** USPS rate-shopping metadata (customer may still pay $0 when mode is free). */
    shippingServiceCode: zod_1.z.string().optional(),
    shippingServiceName: zod_1.z.string().optional(),
    shippingRateId: zod_1.z.string().optional(),
    estimatedLabelCost: zod_1.z.number().optional(),
    labelCost: zod_1.z.number().optional(),
    labelPdfUrl: zod_1.z.string().optional(),
    labelStatus: zod_1.z.enum(["none", "queued", "purchased", "failed"]).optional(),
    labelError: zod_1.z.string().optional(),
    addressValidated: zod_1.z.boolean().optional(),
    /**
     * Marketing attribution snapshot (first/last/assisted touch).
     * Stored on the order so Order Route survives analytics event TTL.
     */
    attribution: attribution_1.orderAttributionSchema.optional(),
});
/** Admin order status update payload. */
exports.orderStatusUpdateSchema = zod_1.z.object({
    status: orderStatusEnum.optional(),
    trackingNumber: zod_1.z.string().optional(),
    carrier: zod_1.z.string().optional(),
    /** Upsert per-vendor tracking (mixed OC + HalloweenReady orders). */
    vendorFulfillments: zod_1.z
        .array(zod_1.z.object({
        vendorSlug: zod_1.z.string().min(1).max(80),
        trackingNumber: zod_1.z.string().optional(),
        carrier: zod_1.z.string().optional(),
        status: zod_1.z.enum(["pending", "processing", "shipped", "delivered"]).optional(),
    }))
        .optional(),
    note: zod_1.z.string().max(500).optional(),
    adminNotes: zod_1.z.string().max(2000).optional(),
    estimatedDeliveryAt: zod_1.z.string().optional(),
    shippingServiceCode: zod_1.z.string().optional(),
    shippingServiceName: zod_1.z.string().optional(),
    shippingRateId: zod_1.z.string().optional(),
    estimatedLabelCost: zod_1.z.number().optional(),
    labelStatus: zod_1.z.enum(["none", "queued", "purchased", "failed"]).optional(),
    labelError: zod_1.z.string().optional(),
});
