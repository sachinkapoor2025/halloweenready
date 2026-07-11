"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerProfile = getCustomerProfile;
exports.adminSearch = adminSearch;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const shared_1 = require("@halloweenready/shared");
const db_1 = require("../lib/db");
const response_1 = require("../lib/response");
const auth_1 = require("../lib/auth");
/**
 * Unified customer profile by email (Section 2).
 * Aggregates orders, leads, carts, welcome coupons, and visitor sessions.
 */
async function getCustomerProfile(event) {
    if (!(0, auth_1.requireAdmin)(event))
        return (0, response_1.forbidden)();
    const rawEmail = event.pathParameters?.email
        ? decodeURIComponent(event.pathParameters.email)
        : event.queryStringParameters?.email;
    const email = (0, shared_1.normalizeEmail)(rawEmail);
    if (!email)
        return (0, response_1.badRequest)("Valid email required");
    const [orders, leads, carts, coupons] = await Promise.all([
        fetchOrdersByEmail(email),
        fetchLeadsByEmail(email),
        fetchCartsByEmail(email),
        fetchWelcomeCouponsByEmail(email),
    ]);
    const sessionIds = new Set();
    for (const lead of leads) {
        if (lead.sessionId)
            sessionIds.add(lead.sessionId);
    }
    for (const cart of carts) {
        if (cart.sessionId)
            sessionIds.add(cart.sessionId);
    }
    for (const order of orders) {
        if (order.sessionId)
            sessionIds.add(order.sessionId);
    }
    for (const c of coupons) {
        if (c.sessionId)
            sessionIds.add(c.sessionId);
    }
    const sessions = await Promise.all([...sessionIds].slice(0, 40).map((id) => fetchSessionSummary(id)));
    const name = orders[0]?.shippingAddress?.name ??
        leads.find((l) => l.name)?.name ??
        carts.find((c) => c.name)?.name;
    const phone = orders[0]?.shippingAddress?.phone ??
        leads.find((l) => l.phone)?.phone ??
        carts.find((c) => c.phone)?.phone;
    const paidOrders = orders.filter((o) => !["pending_payment", "cancelled", "refunded"].includes(o.status));
    const lifetimeValueByCurrency = {};
    for (const o of paidOrders) {
        lifetimeValueByCurrency[o.currency] =
            (lifetimeValueByCurrency[o.currency] ?? 0) + o.total;
    }
    const lastActivityCandidates = [
        ...orders.map((o) => o.updatedAt ?? o.createdAt),
        ...leads.map((l) => l.createdAt),
        ...carts.map((c) => c.updatedAt),
        ...sessions.map((s) => s?.lastSeen).filter(Boolean),
    ].filter(Boolean);
    const lastActivity = lastActivityCandidates.sort().at(-1) ?? null;
    return (0, response_1.ok)({
        customer: {
            email,
            name: name ?? null,
            phone: phone ?? null,
            orderCount: paidOrders.length,
            lifetimeValueByCurrency,
            lastActivity,
        },
        orders,
        leads,
        abandonedCarts: carts,
        welcomeCoupons: coupons,
        sessions: sessions.filter(Boolean),
    });
}
/** Lightweight global admin search across orders, leads, carts, visitors. */
async function adminSearch(event) {
    if (!(0, auth_1.requireAdmin)(event))
        return (0, response_1.forbidden)();
    const q = (event.queryStringParameters?.q ?? "").trim().toLowerCase();
    if (q.length < 2)
        return (0, response_1.badRequest)("Query must be at least 2 characters");
    const phoneKey = (0, shared_1.normalizePhone)(q);
    const emailKey = (0, shared_1.normalizeEmail)(q);
    const [ordersRes, leadsRes, cartsRes] = await Promise.all([
        db_1.docClient.send(new lib_dynamodb_1.QueryCommand({
            TableName: db_1.ORDERS_TABLE,
            IndexName: "GSI2",
            KeyConditionExpression: "GSI2PK = :pk",
            ExpressionAttributeValues: { ":pk": shared_1.orderKeys.gsi2pk() },
            ScanIndexForward: false,
            Limit: 150,
        })),
        db_1.docClient.send(new lib_dynamodb_1.QueryCommand({
            TableName: db_1.CUSTOMERS_TABLE,
            IndexName: "GSI1",
            KeyConditionExpression: "GSI1PK = :pk",
            ExpressionAttributeValues: { ":pk": shared_1.customerKeys.gsi1pk() },
            ScanIndexForward: false,
            Limit: 150,
        })),
        db_1.docClient.send(new lib_dynamodb_1.QueryCommand({
            TableName: db_1.CARTS_TABLE,
            IndexName: "GSI1",
            KeyConditionExpression: "GSI1PK = :pk",
            ExpressionAttributeValues: { ":pk": shared_1.cartKeys.gsi1pk() },
            ScanIndexForward: false,
            Limit: 100,
        })),
    ]);
    const orders = (ordersRes.Items ?? [])
        .filter((o) => {
        const addr = o.shippingAddress;
        return (o.orderId.toLowerCase().includes(q) ||
            addr?.name?.toLowerCase().includes(q) ||
            addr?.email?.toLowerCase().includes(q) ||
            (phoneKey && (0, shared_1.normalizePhone)(addr?.phone) === phoneKey) ||
            (emailKey && (0, shared_1.normalizeEmail)(addr?.email) === emailKey));
    })
        .slice(0, 10)
        .map((o) => ({
        type: "order",
        id: o.orderId,
        label: o.shippingAddress?.name ?? o.orderId,
        email: o.shippingAddress?.email,
        href: `/admin/orders/${o.orderId}`,
        profileHref: o.shippingAddress?.email
            ? `/admin/customers/${encodeURIComponent(o.shippingAddress.email)}`
            : undefined,
    }));
    const leads = (leadsRes.Items ?? [])
        .filter((l) => {
        return (String(l.name ?? "")
            .toLowerCase()
            .includes(q) ||
            String(l.email ?? "")
                .toLowerCase()
                .includes(q) ||
            (phoneKey && (0, shared_1.normalizePhone)(l.phone) === phoneKey) ||
            (emailKey && (0, shared_1.normalizeEmail)(l.email) === emailKey));
    })
        .slice(0, 10)
        .map((l) => ({
        type: "lead",
        id: String(l.leadId ?? l.SK),
        label: l.name || l.email || "Lead",
        email: l.email,
        href: "/admin/leads",
        profileHref: l.email
            ? `/admin/customers/${encodeURIComponent(String(l.email))}`
            : undefined,
    }));
    const carts = (cartsRes.Items ?? [])
        .filter((c) => Number(c.itemCount ?? 0) > 0)
        .slice(0, 30);
    const cartResults = [];
    for (const c of carts) {
        const sid = c.sessionId ?? c.userKey;
        if (!sid)
            continue;
        const profile = await db_1.docClient.send(new lib_dynamodb_1.GetCommand({
            TableName: db_1.CUSTOMERS_TABLE,
            Key: { PK: shared_1.customerKeys.pk(sid), SK: shared_1.customerKeys.profileSk() },
        }));
        const name = profile.Item?.name;
        const email = profile.Item?.email;
        const phone = profile.Item?.phone;
        const match = name?.toLowerCase().includes(q) ||
            email?.toLowerCase().includes(q) ||
            (phoneKey && (0, shared_1.normalizePhone)(phone) === phoneKey) ||
            (emailKey && (0, shared_1.normalizeEmail)(email) === emailKey);
        if (!match)
            continue;
        cartResults.push({
            type: "cart",
            id: sid,
            label: name || email || sid.slice(0, 8),
            email,
            href: "/admin/carts",
            profileHref: email ? `/admin/customers/${encodeURIComponent(email)}` : undefined,
        });
        if (cartResults.length >= 8)
            break;
    }
    return (0, response_1.ok)({
        q,
        results: [...orders, ...leads, ...cartResults],
    });
}
async function fetchOrdersByEmail(email) {
    const items = [];
    let lastKey;
    do {
        const res = await db_1.docClient.send(new lib_dynamodb_1.QueryCommand({
            TableName: db_1.ORDERS_TABLE,
            IndexName: "GSI2",
            KeyConditionExpression: "GSI2PK = :pk",
            ExpressionAttributeValues: { ":pk": shared_1.orderKeys.gsi2pk() },
            ScanIndexForward: false,
            ExclusiveStartKey: lastKey,
            Limit: 200,
        }));
        for (const o of (res.Items ?? [])) {
            if ((0, shared_1.normalizeEmail)(o.shippingAddress?.email) === email)
                items.push(o);
        }
        lastKey = res.LastEvaluatedKey;
    } while (lastKey && items.length < 100);
    return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
async function fetchLeadsByEmail(email) {
    const res = await db_1.docClient.send(new lib_dynamodb_1.QueryCommand({
        TableName: db_1.CUSTOMERS_TABLE,
        IndexName: "GSI1",
        KeyConditionExpression: "GSI1PK = :pk",
        ExpressionAttributeValues: { ":pk": shared_1.customerKeys.gsi1pk() },
        ScanIndexForward: false,
        Limit: 400,
    }));
    return (res.Items ?? [])
        .filter((l) => (0, shared_1.normalizeEmail)(l.email) === email)
        .map((l) => ({
        leadId: l.leadId,
        sessionId: l.sessionId ?? String(l.PK ?? "").replace(/^SESSION#/, ""),
        name: l.name,
        email: l.email,
        phone: l.phone,
        source: l.source,
        page: l.page,
        status: l.status,
        notes: l.notes,
        assignedTo: l.assignedTo,
        createdAt: l.createdAt ?? "",
    }));
}
async function fetchCartsByEmail(email) {
    const res = await db_1.docClient.send(new lib_dynamodb_1.QueryCommand({
        TableName: db_1.CARTS_TABLE,
        IndexName: "GSI1",
        KeyConditionExpression: "GSI1PK = :pk",
        ExpressionAttributeValues: { ":pk": shared_1.cartKeys.gsi1pk() },
        ScanIndexForward: false,
        Limit: 200,
    }));
    const out = [];
    for (const c of (res.Items ?? [])) {
        if (Number(c.itemCount ?? 0) <= 0 && !c.convertedOrderId)
            continue;
        const sid = c.sessionId ?? c.userKey;
        if (!sid)
            continue;
        const profile = await db_1.docClient.send(new lib_dynamodb_1.GetCommand({
            TableName: db_1.CUSTOMERS_TABLE,
            Key: { PK: shared_1.customerKeys.pk(sid), SK: shared_1.customerKeys.profileSk() },
        }));
        const profileEmail = (0, shared_1.normalizeEmail)(profile.Item?.email);
        if (profileEmail !== email)
            continue;
        out.push({
            sessionId: sid,
            itemCount: Number(c.itemCount ?? 0),
            value: Number(c.value ?? 0),
            currency: c.currency,
            createdAt: c.createdAt ?? "",
            updatedAt: c.updatedAt ?? "",
            items: c.items ?? [],
            name: profile.Item?.name,
            email: profileEmail,
            phone: profile.Item?.phone,
            convertedOrderId: c.convertedOrderId,
            converted: Boolean(c.convertedOrderId),
        });
    }
    return out;
}
async function fetchWelcomeCouponsByEmail(email) {
    const res = await db_1.docClient.send(new lib_dynamodb_1.ScanCommand({
        TableName: db_1.CONFIG_TABLE,
        FilterExpression: "begins_with(PK, :prefix) AND SK = :sk AND #src = :src AND email = :email",
        ExpressionAttributeNames: { "#src": "source" },
        ExpressionAttributeValues: {
            ":prefix": "COUPON#",
            ":sk": "META",
            ":src": "welcome",
            ":email": email,
        },
    }));
    return (res.Items ?? []).map((c) => ({
        code: c.code,
        email: c.email,
        discountPercent: c.discountPercent,
        expiresAt: c.expiresAt,
        createdAt: c.createdAt,
        usedAt: c.usedAt,
        orderId: c.orderId,
        sessionId: c.sessionId,
    }));
}
async function fetchSessionSummary(sessionId) {
    const eventsRes = await db_1.docClient.send(new lib_dynamodb_1.QueryCommand({
        TableName: db_1.EVENTS_TABLE,
        KeyConditionExpression: "PK = :pk",
        ExpressionAttributeValues: { ":pk": shared_1.eventKeys.pk(sessionId) },
        ScanIndexForward: true,
        Limit: 200,
    }));
    const events = (eventsRes.Items ?? []);
    if (events.length === 0) {
        const profile = await db_1.docClient.send(new lib_dynamodb_1.GetCommand({
            TableName: db_1.CUSTOMERS_TABLE,
            Key: { PK: shared_1.customerKeys.pk(sessionId), SK: shared_1.customerKeys.profileSk() },
        }));
        if (!profile.Item)
            return null;
        return {
            sessionId,
            firstSeen: profile.Item.createdAt ?? "",
            lastSeen: profile.Item.lastSeenAt ?? "",
            eventCount: 0,
            landingPage: undefined,
            exitPage: undefined,
        };
    }
    const first = events[0];
    const last = events[events.length - 1];
    return {
        sessionId,
        firstSeen: first.createdAt ?? first.at ?? "",
        lastSeen: last.createdAt ?? last.at ?? "",
        eventCount: events.length,
        landingPage: first.path,
        exitPage: last.path,
    };
}
