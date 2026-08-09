"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_NUMBER_START = void 0;
exports.isHumanOrderNumber = isHumanOrderNumber;
exports.parseHumanOrderNumber = parseHumanOrderNumber;
exports.formatOrderNumber = formatOrderNumber;
exports.displayOrderRef = displayOrderRef;
exports.orderNumberPrefixForItems = orderNumberPrefixForItems;
const constants_1 = require("../constants");
/** Human-readable order numbers: OC10001… (Orange County) / US10001… (all others). */
exports.ORDER_NUMBER_START = 10001;
const HUMAN_ORDER_NUMBER_RE = /^(OC|US)(\d{5,})$/i;
function isHumanOrderNumber(value) {
    return HUMAN_ORDER_NUMBER_RE.test(value.trim());
}
function parseHumanOrderNumber(value) {
    const m = value.trim().match(HUMAN_ORDER_NUMBER_RE);
    if (!m)
        return null;
    return {
        prefix: m[1].toUpperCase(),
        seq: Number(m[2]),
    };
}
function formatOrderNumber(prefix, seq) {
    return `${prefix}${String(seq).padStart(5, "0")}`;
}
/** Prefer human orderNumber when present; else short UUID for display. */
function displayOrderRef(order) {
    const n = order.orderNumber?.trim();
    if (n)
        return n;
    return order.orderId.slice(0, 8).toUpperCase();
}
/** OC prefix when the order includes any Orange County vendor lines. */
function orderNumberPrefixForItems(items, vendorSlugs) {
    if (vendorSlugs?.includes(constants_1.VENDOR_ORANGE_COUNTY))
        return "OC";
    if (items.some((i) => i.vendorSlug === constants_1.VENDOR_ORANGE_COUNTY))
        return "OC";
    return "US";
}
