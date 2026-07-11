"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStatusUpdateSchema = exports.orderSchema = exports.orderStatusHistoryEntrySchema = exports.checkoutSchema = exports.shippingAddressSchema = void 0;
const zod_1 = require("zod");
const cart_1 = require("./cart");
const constants_1 = require("../constants");
exports.shippingAddressSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    line1: zod_1.z.string().min(1),
    line2: zod_1.z.string().optional(),
    city: zod_1.z.string().min(1),
    state: zod_1.z.string().min(1),
    postalCode: zod_1.z.string().min(1),
    country: zod_1.z.string().min(2).max(2),
    phone: zod_1.z.string().optional(),
    email: zod_1.z.string().email(),
});
exports.checkoutSchema = zod_1.z.object({
    shippingAddress: exports.shippingAddressSchema,
    paymentMethod: zod_1.z.enum(["stripe", "razorpay"]),
    /** Customer-selected display/checkout currency (from currency switcher). */
    checkoutCurrency: zod_1.z.enum(["USD", "INR"]).optional(),
    /** Live USD→INR rate shown to the customer (optional; server validates). */
    usdInrRate: zod_1.z.number().positive().max(200).optional(),
    /** Welcome or promo coupon (e.g. BOO-ABC123). */
    couponCode: zod_1.z.string().min(4).max(32).optional(),
});
const orderStatusEnum = zod_1.z.enum([
    constants_1.ORDER_STATUS.PENDING_PAYMENT,
    constants_1.ORDER_STATUS.PAID,
    constants_1.ORDER_STATUS.ACCEPTED,
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
    status: orderStatusEnum,
    statusHistory: zod_1.z.array(exports.orderStatusHistoryEntrySchema).optional(),
    shippingAddress: exports.shippingAddressSchema,
    paymentProvider: zod_1.z.enum(["stripe", "razorpay"]).optional(),
    paymentIntentId: zod_1.z.string().optional(),
    razorpayOrderId: zod_1.z.string().optional(),
    razorpayPaymentId: zod_1.z.string().optional(),
    trackingNumber: zod_1.z.string().optional(),
    carrier: zod_1.z.string().optional(),
    adminNotes: zod_1.z.string().max(2000).optional(),
    estimatedDeliveryAt: zod_1.z.string().optional(),
    deliveredAt: zod_1.z.string().optional(),
    /** ISO timestamp when post-delivery review email should send (deliveredAt + 1 day). */
    reviewEmailDueAt: zod_1.z.string().optional(),
    /** Set after review request email is sent (idempotency). */
    reviewEmailSentAt: zod_1.z.string().optional(),
});
/** Admin order status update payload. */
exports.orderStatusUpdateSchema = zod_1.z.object({
    status: orderStatusEnum.optional(),
    trackingNumber: zod_1.z.string().optional(),
    carrier: zod_1.z.string().optional(),
    note: zod_1.z.string().max(500).optional(),
    adminNotes: zod_1.z.string().max(2000).optional(),
    estimatedDeliveryAt: zod_1.z.string().optional(),
});
