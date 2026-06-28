import { z } from "zod";
export declare const shippingAddressSchema: z.ZodObject<{
    name: z.ZodString;
    line1: z.ZodString;
    line2: z.ZodOptional<z.ZodString>;
    city: z.ZodString;
    state: z.ZodString;
    postalCode: z.ZodString;
    country: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    email: string;
    line2?: string | undefined;
    phone?: string | undefined;
}, {
    name: string;
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    email: string;
    line2?: string | undefined;
    phone?: string | undefined;
}>;
export declare const checkoutSchema: z.ZodObject<{
    shippingAddress: z.ZodObject<{
        name: z.ZodString;
        line1: z.ZodString;
        line2: z.ZodOptional<z.ZodString>;
        city: z.ZodString;
        state: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        phone: z.ZodOptional<z.ZodString>;
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        line1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        email: string;
        line2?: string | undefined;
        phone?: string | undefined;
    }, {
        name: string;
        line1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        email: string;
        line2?: string | undefined;
        phone?: string | undefined;
    }>;
    paymentMethod: z.ZodEnum<["stripe", "razorpay"]>;
    /** Customer-selected display/checkout currency (from currency switcher). */
    checkoutCurrency: z.ZodOptional<z.ZodEnum<["USD", "INR"]>>;
    /** Live USD→INR rate shown to the customer (optional; server validates). */
    usdInrRate: z.ZodOptional<z.ZodNumber>;
    /** Welcome or promo coupon (e.g. RAKHI-ABC123). */
    couponCode: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    shippingAddress: {
        name: string;
        line1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        email: string;
        line2?: string | undefined;
        phone?: string | undefined;
    };
    paymentMethod: "stripe" | "razorpay";
    checkoutCurrency?: "USD" | "INR" | undefined;
    usdInrRate?: number | undefined;
    couponCode?: string | undefined;
}, {
    shippingAddress: {
        name: string;
        line1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        email: string;
        line2?: string | undefined;
        phone?: string | undefined;
    };
    paymentMethod: "stripe" | "razorpay";
    checkoutCurrency?: "USD" | "INR" | undefined;
    usdInrRate?: number | undefined;
    couponCode?: string | undefined;
}>;
export declare const orderStatusHistoryEntrySchema: z.ZodObject<{
    status: z.ZodEnum<["pending_payment", "paid", "accepted", "processing", "shipped", "delivered", "complete", "cancelled", "refunded"]>;
    at: z.ZodString;
    note: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "pending_payment" | "paid" | "accepted" | "processing" | "shipped" | "delivered" | "complete" | "cancelled" | "refunded";
    at: string;
    note?: string | undefined;
}, {
    status: "pending_payment" | "paid" | "accepted" | "processing" | "shipped" | "delivered" | "complete" | "cancelled" | "refunded";
    at: string;
    note?: string | undefined;
}>;
export declare const orderSchema: z.ZodObject<{
    orderId: z.ZodString;
    userId: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        productSlug: z.ZodString;
        name: z.ZodString;
        price: z.ZodNumber;
        currency: z.ZodEnum<["USD", "INR"]>;
        quantity: z.ZodNumber;
        image: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        productSlug: string;
        name: string;
        price: number;
        currency: "USD" | "INR";
        quantity: number;
        image?: string | undefined;
    }, {
        productSlug: string;
        name: string;
        price: number;
        currency: "USD" | "INR";
        quantity: number;
        image?: string | undefined;
    }>, "many">;
    subtotal: z.ZodNumber;
    discount: z.ZodDefault<z.ZodNumber>;
    couponCode: z.ZodOptional<z.ZodString>;
    shipping: z.ZodDefault<z.ZodNumber>;
    tax: z.ZodDefault<z.ZodNumber>;
    total: z.ZodNumber;
    currency: z.ZodEnum<["USD", "INR"]>;
    status: z.ZodEnum<["pending_payment", "paid", "accepted", "processing", "shipped", "delivered", "complete", "cancelled", "refunded"]>;
    statusHistory: z.ZodOptional<z.ZodArray<z.ZodObject<{
        status: z.ZodEnum<["pending_payment", "paid", "accepted", "processing", "shipped", "delivered", "complete", "cancelled", "refunded"]>;
        at: z.ZodString;
        note: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "pending_payment" | "paid" | "accepted" | "processing" | "shipped" | "delivered" | "complete" | "cancelled" | "refunded";
        at: string;
        note?: string | undefined;
    }, {
        status: "pending_payment" | "paid" | "accepted" | "processing" | "shipped" | "delivered" | "complete" | "cancelled" | "refunded";
        at: string;
        note?: string | undefined;
    }>, "many">>;
    shippingAddress: z.ZodObject<{
        name: z.ZodString;
        line1: z.ZodString;
        line2: z.ZodOptional<z.ZodString>;
        city: z.ZodString;
        state: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        phone: z.ZodOptional<z.ZodString>;
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        line1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        email: string;
        line2?: string | undefined;
        phone?: string | undefined;
    }, {
        name: string;
        line1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        email: string;
        line2?: string | undefined;
        phone?: string | undefined;
    }>;
    paymentProvider: z.ZodOptional<z.ZodEnum<["stripe", "razorpay"]>>;
    paymentIntentId: z.ZodOptional<z.ZodString>;
    razorpayOrderId: z.ZodOptional<z.ZodString>;
    razorpayPaymentId: z.ZodOptional<z.ZodString>;
    trackingNumber: z.ZodOptional<z.ZodString>;
    carrier: z.ZodOptional<z.ZodString>;
    adminNotes: z.ZodOptional<z.ZodString>;
    estimatedDeliveryAt: z.ZodOptional<z.ZodString>;
    deliveredAt: z.ZodOptional<z.ZodString>;
    /** ISO timestamp when post-delivery review email should send (deliveredAt + 1 day). */
    reviewEmailDueAt: z.ZodOptional<z.ZodString>;
    /** Set after review request email is sent (idempotency). */
    reviewEmailSentAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    currency: "USD" | "INR";
    status: "pending_payment" | "paid" | "accepted" | "processing" | "shipped" | "delivered" | "complete" | "cancelled" | "refunded";
    items: {
        productSlug: string;
        name: string;
        price: number;
        currency: "USD" | "INR";
        quantity: number;
        image?: string | undefined;
    }[];
    shippingAddress: {
        name: string;
        line1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        email: string;
        line2?: string | undefined;
        phone?: string | undefined;
    };
    orderId: string;
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
    couponCode?: string | undefined;
    userId?: string | undefined;
    sessionId?: string | undefined;
    statusHistory?: {
        status: "pending_payment" | "paid" | "accepted" | "processing" | "shipped" | "delivered" | "complete" | "cancelled" | "refunded";
        at: string;
        note?: string | undefined;
    }[] | undefined;
    paymentProvider?: "stripe" | "razorpay" | undefined;
    paymentIntentId?: string | undefined;
    razorpayOrderId?: string | undefined;
    razorpayPaymentId?: string | undefined;
    trackingNumber?: string | undefined;
    carrier?: string | undefined;
    adminNotes?: string | undefined;
    estimatedDeliveryAt?: string | undefined;
    deliveredAt?: string | undefined;
    reviewEmailDueAt?: string | undefined;
    reviewEmailSentAt?: string | undefined;
}, {
    currency: "USD" | "INR";
    status: "pending_payment" | "paid" | "accepted" | "processing" | "shipped" | "delivered" | "complete" | "cancelled" | "refunded";
    items: {
        productSlug: string;
        name: string;
        price: number;
        currency: "USD" | "INR";
        quantity: number;
        image?: string | undefined;
    }[];
    shippingAddress: {
        name: string;
        line1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        email: string;
        line2?: string | undefined;
        phone?: string | undefined;
    };
    orderId: string;
    subtotal: number;
    total: number;
    couponCode?: string | undefined;
    userId?: string | undefined;
    sessionId?: string | undefined;
    discount?: number | undefined;
    shipping?: number | undefined;
    tax?: number | undefined;
    statusHistory?: {
        status: "pending_payment" | "paid" | "accepted" | "processing" | "shipped" | "delivered" | "complete" | "cancelled" | "refunded";
        at: string;
        note?: string | undefined;
    }[] | undefined;
    paymentProvider?: "stripe" | "razorpay" | undefined;
    paymentIntentId?: string | undefined;
    razorpayOrderId?: string | undefined;
    razorpayPaymentId?: string | undefined;
    trackingNumber?: string | undefined;
    carrier?: string | undefined;
    adminNotes?: string | undefined;
    estimatedDeliveryAt?: string | undefined;
    deliveredAt?: string | undefined;
    reviewEmailDueAt?: string | undefined;
    reviewEmailSentAt?: string | undefined;
}>;
/** Admin order status update payload. */
export declare const orderStatusUpdateSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<["pending_payment", "paid", "accepted", "processing", "shipped", "delivered", "complete", "cancelled", "refunded"]>>;
    trackingNumber: z.ZodOptional<z.ZodString>;
    carrier: z.ZodOptional<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
    adminNotes: z.ZodOptional<z.ZodString>;
    estimatedDeliveryAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: "pending_payment" | "paid" | "accepted" | "processing" | "shipped" | "delivered" | "complete" | "cancelled" | "refunded" | undefined;
    note?: string | undefined;
    trackingNumber?: string | undefined;
    carrier?: string | undefined;
    adminNotes?: string | undefined;
    estimatedDeliveryAt?: string | undefined;
}, {
    status?: "pending_payment" | "paid" | "accepted" | "processing" | "shipped" | "delivered" | "complete" | "cancelled" | "refunded" | undefined;
    note?: string | undefined;
    trackingNumber?: string | undefined;
    carrier?: string | undefined;
    adminNotes?: string | undefined;
    estimatedDeliveryAt?: string | undefined;
}>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type OrderStatusUpdate = z.infer<typeof orderStatusUpdateSchema>;
export type OrderStatusHistoryEntry = z.infer<typeof orderStatusHistoryEntrySchema>;
export type Order = z.infer<typeof orderSchema> & {
    createdAt: string;
    updatedAt: string;
};
