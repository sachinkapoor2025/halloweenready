"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REVIEW_EMAIL_DELAY_MS = exports.REVIEW_EMAIL_DELAY_DAYS = void 0;
exports.isDeliveredStatus = isDeliveredStatus;
exports.reviewEmailDueAtFrom = reviewEmailDueAtFrom;
exports.resolveReviewEmailDueAt = resolveReviewEmailDueAt;
exports.isReviewEmailDue = isReviewEmailDue;
const constants_1 = require("../constants");
/** Days after delivery before asking for a review. */
exports.REVIEW_EMAIL_DELAY_DAYS = 1;
exports.REVIEW_EMAIL_DELAY_MS = exports.REVIEW_EMAIL_DELAY_DAYS * 24 * 60 * 60 * 1000;
function isDeliveredStatus(status) {
    return status === constants_1.ORDER_STATUS.DELIVERED || status === constants_1.ORDER_STATUS.COMPLETE;
}
function reviewEmailDueAtFrom(deliveredAtIso) {
    return new Date(new Date(deliveredAtIso).getTime() + exports.REVIEW_EMAIL_DELAY_MS).toISOString();
}
/** Resolve when a review email should send (for backfill on older orders). */
function resolveReviewEmailDueAt(order) {
    if (order.reviewEmailSentAt)
        return null;
    if (order.reviewEmailDueAt)
        return order.reviewEmailDueAt;
    if (order.deliveredAt)
        return reviewEmailDueAtFrom(order.deliveredAt);
    if (!isDeliveredStatus(order.status))
        return null;
    const deliveredEntry = order.statusHistory
        ?.slice()
        .reverse()
        .find((h) => h.status === constants_1.ORDER_STATUS.DELIVERED || h.status === constants_1.ORDER_STATUS.COMPLETE);
    if (deliveredEntry?.at)
        return reviewEmailDueAtFrom(deliveredEntry.at);
    return null;
}
function isReviewEmailDue(order, now = new Date()) {
    const dueAt = resolveReviewEmailDueAt(order);
    if (!dueAt || !isDeliveredStatus(order.status))
        return false;
    return new Date(dueAt).getTime() <= now.getTime();
}
