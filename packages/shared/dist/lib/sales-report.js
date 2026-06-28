"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REVENUE_ORDER_STATUSES = void 0;
exports.isRevenueOrder = isRevenueOrder;
exports.getOrderPaidAt = getOrderPaidAt;
exports.periodRange = periodRange;
exports.addToRevenue = addToRevenue;
const constants_1 = require("../constants");
/** Order statuses that count as received payment (excludes pending, cancelled, refunded). */
exports.REVENUE_ORDER_STATUSES = [
    constants_1.ORDER_STATUS.PAID,
    constants_1.ORDER_STATUS.ACCEPTED,
    constants_1.ORDER_STATUS.PROCESSING,
    constants_1.ORDER_STATUS.SHIPPED,
    constants_1.ORDER_STATUS.DELIVERED,
    constants_1.ORDER_STATUS.COMPLETE,
];
function isRevenueOrder(status) {
    return exports.REVENUE_ORDER_STATUSES.includes(status);
}
/** When payment was received — paid status history entry or createdAt fallback. */
function getOrderPaidAt(order) {
    if (!isRevenueOrder(order.status))
        return null;
    const paidEntry = order.statusHistory?.find((h) => h.status === constants_1.ORDER_STATUS.PAID);
    return paidEntry?.at ?? order.createdAt;
}
function periodRange(period, now = new Date()) {
    const to = new Date(now);
    const from = new Date(now);
    if (period === "day") {
        from.setUTCHours(0, 0, 0, 0);
        return { from, to, label: "Today" };
    }
    if (period === "week") {
        from.setUTCDate(from.getUTCDate() - 6);
        from.setUTCHours(0, 0, 0, 0);
        return { from, to, label: "Last 7 days" };
    }
    from.setUTCDate(from.getUTCDate() - 29);
    from.setUTCHours(0, 0, 0, 0);
    return { from, to, label: "Last 30 days" };
}
function addToRevenue(totals, currency, amount) {
    totals[currency] += amount;
}
