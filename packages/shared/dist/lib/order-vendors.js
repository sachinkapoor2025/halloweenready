"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VENDOR_CJ_DROPSHIPPING = exports.VENDOR_HALLOWEENREADY = void 0;
exports.lineVendorKey = lineVendorKey;
exports.vendorDisplayLabel = vendorDisplayLabel;
exports.cjFulfillmentStatusLabel = cjFulfillmentStatusLabel;
exports.orderVendorKeys = orderVendorKeys;
exports.orderHasVendor = orderHasVendor;
exports.orderHasOrangeCounty = orderHasOrangeCounty;
exports.orderHasUsarakhi = orderHasUsarakhi;
exports.isMultiVendorOrder = isMultiVendorOrder;
exports.ensureVendorFulfillments = ensureVendorFulfillments;
exports.upsertVendorFulfillment = upsertVendorFulfillment;
exports.allVendorsHaveTracking = allVendorsHaveTracking;
exports.anyVendorHasTracking = anyVendorHasTracking;
exports.primaryTrackingFromFulfillments = primaryTrackingFromFulfillments;
exports.buildInitialVendorFulfillments = buildInitialVendorFulfillments;
const constants_1 = require("../constants");
Object.defineProperty(exports, "VENDOR_HALLOWEENREADY", { enumerable: true, get: function () { return constants_1.VENDOR_HALLOWEENREADY; } });
Object.defineProperty(exports, "VENDOR_CJ_DROPSHIPPING", { enumerable: true, get: function () { return constants_1.VENDOR_CJ_DROPSHIPPING; } });
function lineVendorKey(item) {
    const slug = item.vendorSlug?.trim();
    return slug || constants_1.VENDOR_HALLOWEENREADY;
}
function vendorDisplayLabel(slug) {
    if (slug === constants_1.VENDOR_ORANGE_COUNTY)
        return "Orange County";
    if (slug === constants_1.VENDOR_HALLOWEENREADY)
        return "OccasionFun";
    if (slug === constants_1.VENDOR_CJ_DROPSHIPPING)
        return "CJ Dropshipping";
    return slug
        .split("-")
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}
/** Admin label for a CJ lane — “CJ order paid” after wallet/card payment. */
function cjFulfillmentStatusLabel(f) {
    if (f.vendorSlug !== constants_1.VENDOR_CJ_DROPSHIPPING)
        return f.status ?? "pending";
    if (f.cjPaid)
        return "CJ order paid";
    if (f.cjOrderId)
        return "Awaiting CJ payment";
    return f.status ?? "pending";
}
/** Distinct fulfillment vendors present on the order (OccasionFun implied for untagged lines). */
function orderVendorKeys(order) {
    const keys = new Set();
    for (const item of order.items ?? []) {
        keys.add(lineVendorKey(item));
    }
    // Older OC-only orders may only have vendorSlugs
    for (const s of order.vendorSlugs ?? []) {
        if (s.trim())
            keys.add(s.trim());
    }
    if (keys.size === 0)
        keys.add(constants_1.VENDOR_HALLOWEENREADY);
    return Array.from(keys).sort((a, b) => {
        if (a === constants_1.VENDOR_ORANGE_COUNTY)
            return -1;
        if (b === constants_1.VENDOR_ORANGE_COUNTY)
            return 1;
        if (a === constants_1.VENDOR_HALLOWEENREADY)
            return -1;
        if (b === constants_1.VENDOR_HALLOWEENREADY)
            return 1;
        return a.localeCompare(b);
    });
}
function orderHasVendor(order, vendor) {
    return orderVendorKeys(order).includes(vendor);
}
function orderHasOrangeCounty(order) {
    return orderHasVendor(order, constants_1.VENDOR_ORANGE_COUNTY);
}
function orderHasUsarakhi(order) {
    return orderHasVendor(order, constants_1.VENDOR_HALLOWEENREADY);
}
function isMultiVendorOrder(order) {
    return orderVendorKeys(order).length > 1;
}
function fulfillmentShipped(f) {
    if (f.status === "shipped" || f.status === "delivered")
        return true;
    return Boolean(f.trackingNumber?.trim());
}
/** Build / refresh per-vendor fulfillment rows from line items + existing data. */
function ensureVendorFulfillments(order) {
    const keys = orderVendorKeys(order);
    const bySlug = new Map();
    for (const f of order.vendorFulfillments ?? []) {
        if (!f.vendorSlug?.trim())
            continue;
        bySlug.set(f.vendorSlug.trim(), { ...f, vendorSlug: f.vendorSlug.trim() });
    }
    // Backfill legacy order-level tracking onto the sole vendor, or OC when mixed (OC historically wrote AWB).
    const legacyTn = order.trackingNumber?.trim();
    if (legacyTn) {
        const target = keys.length === 1
            ? keys[0]
            : keys.includes(constants_1.VENDOR_ORANGE_COUNTY)
                ? constants_1.VENDOR_ORANGE_COUNTY
                : keys[0];
        const existing = bySlug.get(target);
        if (!existing?.trackingNumber?.trim()) {
            bySlug.set(target, {
                vendorSlug: target,
                trackingNumber: legacyTn,
                carrier: order.carrier?.trim() || existing?.carrier,
                status: existing?.status ?? "shipped",
                updatedAt: existing?.updatedAt,
            });
        }
    }
    return keys.map((vendorSlug) => {
        const prev = bySlug.get(vendorSlug);
        if (prev) {
            return {
                ...prev,
                status: prev.status ?? (fulfillmentShipped(prev) ? "shipped" : "pending"),
            };
        }
        return { vendorSlug, status: "pending" };
    });
}
function upsertVendorFulfillment(fulfillments, patch) {
    const slug = patch.vendorSlug.trim();
    const next = fulfillments.map((f) => ({ ...f }));
    const idx = next.findIndex((f) => f.vendorSlug === slug);
    const base = idx >= 0 ? next[idx] : { vendorSlug: slug, status: "pending" };
    const trackingNumber = patch.trackingNumber !== undefined ? patch.trackingNumber.trim() : base.trackingNumber;
    const carrier = patch.carrier !== undefined ? patch.carrier.trim() : base.carrier;
    const warehouseId = patch.warehouseId !== undefined ? patch.warehouseId.trim() : base.warehouseId;
    const status = patch.status ??
        (trackingNumber ? "shipped" : base.status ?? "pending");
    const cjOrderId = patch.cjOrderId !== undefined ? patch.cjOrderId.trim() : base.cjOrderId;
    const cjOrderNumber = patch.cjOrderNumber !== undefined ? patch.cjOrderNumber.trim() : base.cjOrderNumber;
    const cjPayUrl = patch.cjPayUrl !== undefined ? patch.cjPayUrl.trim() : base.cjPayUrl;
    const cjPaid = patch.cjPaid !== undefined ? patch.cjPaid : base.cjPaid;
    const cjPaidAt = patch.cjPaidAt !== undefined ? patch.cjPaidAt : base.cjPaidAt;
    const cjOrderStatus = patch.cjOrderStatus !== undefined ? patch.cjOrderStatus : base.cjOrderStatus;
    const cjProductAmount = patch.cjProductAmount !== undefined ? patch.cjProductAmount : base.cjProductAmount;
    const cjPostageAmount = patch.cjPostageAmount !== undefined ? patch.cjPostageAmount : base.cjPostageAmount;
    const cjActualPayment = patch.cjActualPayment !== undefined ? patch.cjActualPayment : base.cjActualPayment;
    const row = {
        ...base,
        vendorSlug: slug,
        ...(warehouseId ? { warehouseId } : {}),
        ...(trackingNumber ? { trackingNumber } : {}),
        ...(carrier ? { carrier } : {}),
        status,
        ...(cjOrderId ? { cjOrderId } : {}),
        ...(cjOrderNumber ? { cjOrderNumber } : {}),
        ...(cjPayUrl && !cjPaid ? { cjPayUrl } : {}),
        ...(cjPaid ? { cjPaid: true } : {}),
        ...(cjPaidAt ? { cjPaidAt } : {}),
        ...(cjOrderStatus ? { cjOrderStatus } : {}),
        ...(cjProductAmount != null ? { cjProductAmount } : {}),
        ...(cjPostageAmount != null ? { cjPostageAmount } : {}),
        ...(cjActualPayment != null ? { cjActualPayment } : {}),
        ...(patch.updatedAt ? { updatedAt: patch.updatedAt } : base.updatedAt ? { updatedAt: base.updatedAt } : {}),
    };
    if (cjPaid)
        delete row.cjPayUrl;
    if (idx >= 0)
        next[idx] = row;
    else
        next.push(row);
    return next;
}
function allVendorsHaveTracking(fulfillments) {
    if (!fulfillments.length)
        return false;
    return fulfillments.every((f) => Boolean(f.trackingNumber?.trim()));
}
function anyVendorHasTracking(fulfillments) {
    return fulfillments.some((f) => Boolean(f.trackingNumber?.trim()));
}
/** Prefer first non-empty tracking for legacy order.trackingNumber field. */
function primaryTrackingFromFulfillments(fulfillments) {
    const withTn = fulfillments.find((f) => f.trackingNumber?.trim());
    if (!withTn)
        return {};
    return {
        trackingNumber: withTn.trackingNumber,
        ...(withTn.carrier ? { carrier: withTn.carrier } : {}),
    };
}
function buildInitialVendorFulfillments(items) {
    return ensureVendorFulfillments({ items, vendorFulfillments: [] });
}
