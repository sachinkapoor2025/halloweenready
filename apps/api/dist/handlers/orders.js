"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureLead = captureLead;
exports.checkout = checkout;
exports.listOrders = listOrders;
exports.listAdminOrders = listAdminOrders;
exports.getOrder = getOrder;
exports.getAdminOrder = getAdminOrder;
exports.updateOrderStatus = updateOrderStatus;
exports.markOrderPaid = markOrderPaid;
exports.getOrderById = getOrderById;
exports.retryOrderPayment = retryOrderPayment;
exports.listLeads = listLeads;
exports.updateLead = updateLead;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const uuid_1 = require("uuid");
const shared_1 = require("@halloweenready/shared");
const exchange_rate_1 = require("../lib/exchange-rate");
const db_1 = require("../lib/db");
const response_1 = require("../lib/response");
const auth_1 = require("../lib/auth");
const cart_1 = require("./cart");
const email_1 = require("../lib/email");
const inventory_1 = require("../lib/inventory");
const review_emails_1 = require("./review-emails");
const abandoned_cart_emails_1 = require("./abandoned-cart-emails");
const coupons_1 = require("./coupons");
function buildOrderItem(order, userKey) {
    return {
        ...order,
        PK: shared_1.orderKeys.pk(order.orderId),
        SK: shared_1.orderKeys.sk(),
        GSI1PK: shared_1.orderKeys.gsi1pk(userKey),
        GSI1SK: shared_1.orderKeys.gsi1sk(order.createdAt),
        GSI2PK: shared_1.orderKeys.gsi2pk(),
        GSI2SK: shared_1.orderKeys.gsi2sk(order.createdAt),
        GSI3PK: shared_1.orderKeys.gsi3pk(order.status),
        GSI3SK: shared_1.orderKeys.gsi3sk(order.createdAt),
    };
}
function normalizeEmail(email) {
    const trimmed = email?.trim();
    if (!trimmed || !trimmed.includes("@"))
        return undefined;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) ? trimmed : undefined;
}
function pickContactField(incoming, existing) {
    const next = incoming?.trim();
    if (next)
        return next;
    return existing;
}
async function captureLead(event) {
    if ((event.body?.length ?? 0) > 16 * 1024)
        return (0, response_1.badRequest)("Payload too large");
    const body = JSON.parse(event.body ?? "{}");
    const parsed = shared_1.leadCaptureSchema.safeParse(body);
    if (!parsed.success)
        return (0, response_1.badRequest)(parsed.error.message);
    const timestamp = (0, db_1.now)();
    const sessionId = parsed.data.sessionId;
    const email = normalizeEmail(parsed.data.email);
    let welcomeCoupon;
    let leadPayload = parsed.data;
    if (parsed.data.source === "newsletter" && email) {
        welcomeCoupon = await (0, coupons_1.issueWelcomeCoupon)({ email, sessionId });
        leadPayload = {
            ...parsed.data,
            metadata: {
                ...parsed.data.metadata,
                couponCode: welcomeCoupon.code,
                couponExpiresAt: welcomeCoupon.expiresAt,
                discountPercent: String(welcomeCoupon.discountPercent),
            },
        };
    }
    // lead event (co-located under the session)
    await db_1.docClient.send(new lib_dynamodb_1.PutCommand({
        TableName: db_1.CUSTOMERS_TABLE,
        Item: {
            ...leadPayload,
            ...(email ? { email } : {}),
            leadId: (0, uuid_1.v4)(),
            PK: shared_1.customerKeys.pk(sessionId),
            SK: shared_1.customerKeys.leadSk(timestamp),
            GSI1PK: shared_1.customerKeys.gsi1pk(),
            GSI1SK: shared_1.customerKeys.gsi1sk(timestamp),
            createdAt: timestamp,
            updatedAt: timestamp,
        },
    }));
    const existing = await db_1.docClient.send(new lib_dynamodb_1.GetCommand({
        TableName: db_1.CUSTOMERS_TABLE,
        Key: { PK: shared_1.customerKeys.pk(sessionId), SK: shared_1.customerKeys.profileSk() },
    }));
    const prev = existing.Item ?? {};
    // session identity rollup — merge so partial field updates don't wipe other fields
    await db_1.docClient.send(new lib_dynamodb_1.PutCommand({
        TableName: db_1.CUSTOMERS_TABLE,
        Item: {
            sessionId,
            PK: shared_1.customerKeys.pk(sessionId),
            SK: shared_1.customerKeys.profileSk(),
            createdAt: prev.createdAt ?? timestamp,
            lastSeenAt: timestamp,
            updatedAt: timestamp,
            name: pickContactField(leadPayload.name, prev.name),
            email: email ?? prev.email,
            phone: pickContactField(leadPayload.phone, prev.phone),
        },
    }));
    const emailResult = await (0, email_1.notifyAdminLead)(leadPayload);
    const emailRequired = leadPayload.source === "contact" || leadPayload.source === "newsletter";
    if (emailRequired && emailResult.skipped) {
        console.error("Email skipped — SMTP not configured:", leadPayload.source);
        return (0, response_1.badRequest)("Email is not configured on the server yet. Please contact us on WhatsApp or at order@halloweenready.com.");
    }
    if (emailRequired && !emailResult.ok) {
        console.error("Lead email failed:", leadPayload.source, emailResult.error);
        return (0, response_1.badRequest)(emailResult.error ??
            "Your message was saved but email could not be sent. Please WhatsApp us or email order@halloweenready.com directly.");
    }
    return (0, response_1.created)({
        ok: true,
        emailSent: emailResult.ok,
        ...(welcomeCoupon ? { coupon: welcomeCoupon } : {}),
    });
}
async function checkout(event) {
    const userKey = (0, auth_1.getUserOrSessionKey)(event);
    if (!userKey)
        return (0, response_1.unauthorized)("Session or auth required");
    const body = JSON.parse(event.body ?? "{}");
    const parsed = shared_1.checkoutSchema.safeParse(body);
    if (!parsed.success)
        return (0, response_1.badRequest)(parsed.error.message);
    const cartResponse = await (0, cart_1.getCartHandler)(event);
    const cartBody = JSON.parse(typeof cartResponse === "string" ? cartResponse : (cartResponse.body ?? "{}"));
    const cart = cartBody.cart;
    if (!cart?.items?.length)
        return (0, response_1.badRequest)("Cart is empty");
    const cartCurrency = cart.items[0]?.currency ?? "USD";
    const checkoutCurrency = parsed.data.checkoutCurrency ?? cartCurrency;
    if (parsed.data.paymentMethod === "stripe" && checkoutCurrency !== "USD") {
        return (0, response_1.badRequest)("Stripe checkout requires USD. Switch currency to USD or pay with Razorpay.");
    }
    const orderItems = checkoutCurrency !== cartCurrency
        ? (0, shared_1.convertCartItemsToCurrency)(cart.items, checkoutCurrency, await (0, exchange_rate_1.resolveCheckoutUsdInrRate)(parsed.data.usdInrRate))
        : cart.items;
    const stockError = await (0, inventory_1.validateOrderInventory)(orderItems);
    if (stockError)
        return (0, response_1.badRequest)(stockError);
    const subtotal = (0, shared_1.cartSubtotal)(orderItems);
    const shipping = 0;
    const tax = 0;
    let discount = 0;
    let couponCode;
    const checkoutEmail = normalizeEmail(parsed.data.shippingAddress.email);
    if (parsed.data.couponCode?.trim()) {
        if (!checkoutEmail)
            return (0, response_1.badRequest)("Email is required to apply a coupon");
        const coupon = await (0, coupons_1.validateCouponRecord)(parsed.data.couponCode, checkoutEmail);
        if (!coupon.valid)
            return (0, response_1.badRequest)(coupon.error ?? "Invalid coupon code");
        discount = (0, coupons_1.applyPercentDiscount)(subtotal, coupon.discountPercent);
        couponCode = coupon.code;
    }
    const total = Math.max(0, subtotal - discount + shipping + tax);
    const currency = checkoutCurrency;
    const orderId = (0, uuid_1.v4)();
    const timestamp = (0, db_1.now)();
    const auth = (0, auth_1.getAuth)(event);
    const order = {
        orderId,
        userId: auth?.userId,
        sessionId: (0, auth_1.getSessionId)(event),
        items: orderItems,
        subtotal,
        discount,
        ...(couponCode ? { couponCode } : {}),
        shipping,
        tax,
        total,
        currency,
        status: shared_1.ORDER_STATUS.PENDING_PAYMENT,
        statusHistory: [{ status: shared_1.ORDER_STATUS.PENDING_PAYMENT, at: timestamp }],
        shippingAddress: parsed.data.shippingAddress,
        createdAt: timestamp,
        updatedAt: timestamp,
    };
    const { createStripePaymentIntent } = await Promise.resolve().then(() => __importStar(require("./payments/stripe")));
    const { createRazorpayOrder } = await Promise.resolve().then(() => __importStar(require("./payments/razorpay")));
    if (parsed.data.paymentMethod === "stripe") {
        const payment = await createStripePaymentIntent(order);
        order.paymentProvider = "stripe";
        order.paymentIntentId = payment.paymentIntentId;
        await db_1.docClient.send(new lib_dynamodb_1.PutCommand({ TableName: db_1.ORDERS_TABLE, Item: buildOrderItem(order, userKey) }));
        await (0, cart_1.clearCartForUser)(userKey);
        const emailResult = await (0, email_1.notifyAdminOrderPlaced)(order);
        if (!emailResult.ok)
            console.error("Order placed email failed:", emailResult.error);
        return (0, response_1.created)({ order, clientSecret: payment.clientSecret });
    }
    const payment = await createRazorpayOrder(order);
    order.paymentProvider = "razorpay";
    order.razorpayOrderId = payment.razorpayOrderId;
    await db_1.docClient.send(new lib_dynamodb_1.PutCommand({ TableName: db_1.ORDERS_TABLE, Item: buildOrderItem(order, userKey) }));
    await (0, cart_1.clearCartForUser)(userKey);
    const emailResult = await (0, email_1.notifyAdminOrderPlaced)(order);
    if (!emailResult.ok)
        console.error("Order placed email failed:", emailResult.error);
    return (0, response_1.created)({ order, razorpayOrderId: payment.razorpayOrderId, razorpayKeyId: payment.keyId });
}
async function listOrders(event) {
    const auth = (0, auth_1.getAuth)(event);
    if (!auth)
        return (0, response_1.unauthorized)();
    const result = await db_1.docClient.send(new lib_dynamodb_1.QueryCommand({
        TableName: db_1.ORDERS_TABLE,
        IndexName: "GSI1",
        KeyConditionExpression: "GSI1PK = :pk",
        ExpressionAttributeValues: { ":pk": shared_1.orderKeys.gsi1pk(auth.userId) },
        ScanIndexForward: false,
    }));
    return (0, response_1.ok)({ orders: result.Items ?? [] });
}
async function listAdminOrders(event) {
    if (!(0, auth_1.requireAdmin)(event))
        return (0, response_1.forbidden)();
    const status = event.queryStringParameters?.status;
    if (status) {
        const result = await db_1.docClient.send(new lib_dynamodb_1.QueryCommand({
            TableName: db_1.ORDERS_TABLE,
            IndexName: "GSI3",
            KeyConditionExpression: "GSI3PK = :pk",
            ExpressionAttributeValues: { ":pk": shared_1.orderKeys.gsi3pk(status) },
            ScanIndexForward: false,
        }));
        return (0, response_1.ok)({ orders: result.Items ?? [] });
    }
    const result = await db_1.docClient.send(new lib_dynamodb_1.QueryCommand({
        TableName: db_1.ORDERS_TABLE,
        IndexName: "GSI2",
        KeyConditionExpression: "GSI2PK = :pk",
        ExpressionAttributeValues: { ":pk": shared_1.orderKeys.gsi2pk() },
        ScanIndexForward: false,
    }));
    return (0, response_1.ok)({ orders: result.Items ?? [] });
}
async function fetchOrder(orderId) {
    const result = await db_1.docClient.send(new lib_dynamodb_1.GetCommand({
        TableName: db_1.ORDERS_TABLE,
        Key: { PK: shared_1.orderKeys.pk(orderId), SK: shared_1.orderKeys.sk() },
    }));
    return result.Item;
}
async function getOrder(event) {
    const orderId = event.pathParameters?.orderId;
    if (!orderId)
        return (0, response_1.badRequest)("Order ID required");
    const order = await fetchOrder(orderId);
    if (!order)
        return (0, response_1.notFound)("Order not found");
    // ownership check: admin, matching user, or matching session
    const auth = (0, auth_1.getAuth)(event);
    const sessionId = (0, auth_1.getSessionId)(event);
    const isOwner = auth?.isAdmin ||
        (auth?.userId && order.userId === auth.userId) ||
        (sessionId && order.sessionId === sessionId);
    if (!isOwner)
        return (0, response_1.forbidden)();
    return (0, response_1.ok)({ order });
}
async function getAdminOrder(event) {
    if (!(0, auth_1.requireAdmin)(event))
        return (0, response_1.forbidden)();
    const orderId = event.pathParameters?.orderId;
    if (!orderId)
        return (0, response_1.badRequest)("Order ID required");
    const order = await fetchOrder(orderId);
    if (!order)
        return (0, response_1.notFound)("Order not found");
    return (0, response_1.ok)({ order });
}
async function updateOrderStatus(event) {
    if (!(0, auth_1.requireAdmin)(event))
        return (0, response_1.forbidden)();
    const orderId = event.pathParameters?.orderId;
    if (!orderId)
        return (0, response_1.badRequest)("Order ID required");
    const body = JSON.parse(event.body ?? "{}");
    const parsed = shared_1.orderStatusUpdateSchema.safeParse(body);
    if (!parsed.success)
        return (0, response_1.badRequest)(parsed.error.message);
    const order = await fetchOrder(orderId);
    if (!order)
        return (0, response_1.notFound)("Order not found");
    const nextStatus = parsed.data.status ?? order.status;
    if (parsed.data.status && parsed.data.status !== order.status) {
        const allowed = shared_1.ORDER_STATUS_TRANSITIONS[order.status] ?? [];
        if (!allowed.includes(parsed.data.status)) {
            return (0, response_1.badRequest)(`Cannot change status from ${order.status} to ${parsed.data.status}`);
        }
    }
    const timestamp = (0, db_1.now)();
    const historyEntry = parsed.data.status && parsed.data.status !== order.status
        ? {
            status: parsed.data.status,
            at: timestamp,
            ...(parsed.data.note ? { note: parsed.data.note } : {}),
        }
        : parsed.data.note
            ? { status: order.status, at: timestamp, note: parsed.data.note }
            : null;
    const updated = {
        ...order,
        status: nextStatus,
        statusHistory: historyEntry
            ? [...(order.statusHistory ?? []), historyEntry]
            : order.statusHistory,
        ...(parsed.data.trackingNumber !== undefined && { trackingNumber: parsed.data.trackingNumber }),
        ...(parsed.data.carrier !== undefined && { carrier: parsed.data.carrier }),
        ...(parsed.data.adminNotes !== undefined && { adminNotes: parsed.data.adminNotes }),
        ...(parsed.data.estimatedDeliveryAt !== undefined && {
            estimatedDeliveryAt: parsed.data.estimatedDeliveryAt,
        }),
        ...(0, review_emails_1.applyDeliveryReviewSchedule)(order, nextStatus, timestamp),
        updatedAt: timestamp,
        ...(parsed.data.status &&
            parsed.data.status !== order.status && {
            GSI3PK: shared_1.orderKeys.gsi3pk(nextStatus),
            GSI3SK: shared_1.orderKeys.gsi3sk(order.createdAt),
        }),
    };
    await db_1.docClient.send(new lib_dynamodb_1.PutCommand({ TableName: db_1.ORDERS_TABLE, Item: updated }));
    return (0, response_1.ok)({ order: updated });
}
/** Mark an order paid (called by Stripe/Razorpay webhooks + Razorpay verify). */
async function markOrderPaid(orderId, payment) {
    if (!orderId)
        return;
    const order = await fetchOrder(orderId);
    if (!order)
        return;
    if (order.status === shared_1.ORDER_STATUS.PAID)
        return;
    const timestamp = (0, db_1.now)();
    const updated = {
        ...order,
        status: shared_1.ORDER_STATUS.PAID,
        statusHistory: [...(order.statusHistory ?? []), { status: shared_1.ORDER_STATUS.PAID, at: timestamp }],
        ...(payment.paymentIntentId && { paymentIntentId: payment.paymentIntentId }),
        ...(payment.razorpayPaymentId && { razorpayPaymentId: payment.razorpayPaymentId }),
        updatedAt: timestamp,
        GSI3PK: shared_1.orderKeys.gsi3pk(shared_1.ORDER_STATUS.PAID),
        GSI3SK: shared_1.orderKeys.gsi3sk(order.createdAt),
    };
    await db_1.docClient.send(new lib_dynamodb_1.PutCommand({ TableName: db_1.ORDERS_TABLE, Item: updated }));
    if (order.couponCode) {
        await (0, coupons_1.markCouponUsed)(order.couponCode, order.orderId);
    }
    await (0, abandoned_cart_emails_1.markCartConverted)(order.sessionId, order.orderId);
    await (0, inventory_1.decrementInventoryForOrder)(updated);
    const emailResult = await (0, email_1.notifyAdminOrderPaid)(updated);
    if (!emailResult.ok)
        console.error("Order paid email failed:", emailResult.error);
}
/** Lookup an order by id (used by Razorpay verify for ownership/amount checks). */
async function getOrderById(orderId) {
    return fetchOrder(orderId);
}
function assertOrderAccess(event, order) {
    const auth = (0, auth_1.getAuth)(event);
    const sessionId = (0, auth_1.getSessionId)(event);
    return Boolean(auth?.isAdmin ||
        (auth?.userId && order.userId === auth.userId) ||
        (sessionId && order.sessionId === sessionId));
}
/** Re-create payment for a pending order (retry after failed/cancelled checkout). */
async function retryOrderPayment(event) {
    const orderId = event.pathParameters?.orderId;
    if (!orderId)
        return (0, response_1.badRequest)("Order ID required");
    const order = await fetchOrder(orderId);
    if (!order)
        return (0, response_1.notFound)("Order not found");
    if (!assertOrderAccess(event, order))
        return (0, response_1.forbidden)();
    if (order.status !== shared_1.ORDER_STATUS.PENDING_PAYMENT) {
        return (0, response_1.badRequest)("This order is not awaiting payment");
    }
    const body = JSON.parse(event.body ?? "{}");
    const paymentMethod = body.paymentMethod ?? order.paymentProvider ?? "stripe";
    if (paymentMethod === "stripe" && order.currency !== "USD") {
        return (0, response_1.badRequest)("Stripe retry requires USD orders");
    }
    const { createStripePaymentIntent } = await Promise.resolve().then(() => __importStar(require("./payments/stripe")));
    const { createRazorpayOrder } = await Promise.resolve().then(() => __importStar(require("./payments/razorpay")));
    const timestamp = (0, db_1.now)();
    if (paymentMethod === "stripe") {
        const payment = await createStripePaymentIntent(order);
        const updated = {
            ...order,
            paymentProvider: "stripe",
            paymentIntentId: payment.paymentIntentId,
            updatedAt: timestamp,
        };
        await db_1.docClient.send(new lib_dynamodb_1.PutCommand({ TableName: db_1.ORDERS_TABLE, Item: updated }));
        return (0, response_1.ok)({ order: updated, clientSecret: payment.clientSecret });
    }
    const payment = await createRazorpayOrder(order);
    const updated = {
        ...order,
        paymentProvider: "razorpay",
        razorpayOrderId: payment.razorpayOrderId,
        updatedAt: timestamp,
    };
    await db_1.docClient.send(new lib_dynamodb_1.PutCommand({ TableName: db_1.ORDERS_TABLE, Item: updated }));
    return (0, response_1.ok)({
        order: updated,
        razorpayOrderId: payment.razorpayOrderId,
        razorpayKeyId: payment.keyId,
    });
}
async function listLeads(event) {
    if (!(0, auth_1.requireAdmin)(event))
        return (0, response_1.forbidden)();
    const result = await db_1.docClient.send(new lib_dynamodb_1.QueryCommand({
        TableName: db_1.CUSTOMERS_TABLE,
        IndexName: "GSI1",
        KeyConditionExpression: "GSI1PK = :pk",
        ExpressionAttributeValues: { ":pk": shared_1.customerKeys.gsi1pk() },
        ScanIndexForward: false,
        Limit: 200,
    }));
    return (0, response_1.ok)({ leads: result.Items ?? [] });
}
async function updateLead(event) {
    if (!(0, auth_1.requireAdmin)(event))
        return (0, response_1.forbidden)();
    const body = JSON.parse(event.body ?? "{}");
    const parsed = shared_1.updateLeadSchema.safeParse(body);
    if (!parsed.success)
        return (0, response_1.badRequest)(parsed.error.message);
    const { sessionId, createdAt, ...fields } = parsed.data;
    const existing = await db_1.docClient.send(new lib_dynamodb_1.GetCommand({
        TableName: db_1.CUSTOMERS_TABLE,
        Key: {
            PK: shared_1.customerKeys.pk(sessionId),
            SK: shared_1.customerKeys.leadSk(createdAt),
        },
    }));
    if (!existing.Item)
        return (0, response_1.notFound)("Lead not found");
    const timestamp = (0, db_1.now)();
    const updated = {
        ...existing.Item,
        ...fields,
        updatedAt: timestamp,
    };
    await db_1.docClient.send(new lib_dynamodb_1.PutCommand({ TableName: db_1.CUSTOMERS_TABLE, Item: updated }));
    return (0, response_1.ok)({ lead: updated });
}
