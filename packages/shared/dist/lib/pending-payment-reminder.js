"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PENDING_PAYMENT_REMINDER_MIN_AGE_MS = exports.PENDING_PAYMENT_REMINDER_END_DATE = void 0;
exports.calendarDateKeyNy = calendarDateKeyNy;
exports.isPendingPaymentReminderCampaignActive = isPendingPaymentReminderCampaignActive;
exports.shouldSendPendingPaymentReminder = shouldSendPendingPaymentReminder;
const constants_1 = require("../constants");
/**
 * Last calendar day (America/New_York) to send pending-payment reminders.
 * Reminders send through this date inclusive; campaign stops after.
 */
exports.PENDING_PAYMENT_REMINDER_END_DATE = "2026-08-28";
/** Wait before the first reminder so checkout isn't followed by an immediate nudge. */
exports.PENDING_PAYMENT_REMINDER_MIN_AGE_MS = 2 * 60 * 60 * 1000;
/** YYYY-MM-DD in America/New_York. */
function calendarDateKeyNy(date = new Date()) {
    return date.toLocaleDateString("en-CA", { timeZone: "America/New_York" });
}
/** Inclusive: reminders run through end of Aug 28 NY time. */
function isPendingPaymentReminderCampaignActive(now = new Date()) {
    return calendarDateKeyNy(now) <= exports.PENDING_PAYMENT_REMINDER_END_DATE;
}
function shouldSendPendingPaymentReminder(order, now = new Date()) {
    if (order.status !== constants_1.ORDER_STATUS.PENDING_PAYMENT)
        return false;
    if (!isPendingPaymentReminderCampaignActive(now))
        return false;
    const email = order.shippingAddress?.email?.trim();
    if (!email?.includes("@"))
        return false;
    const createdMs = new Date(order.createdAt).getTime();
    if (!Number.isFinite(createdMs))
        return false;
    if (now.getTime() - createdMs < exports.PENDING_PAYMENT_REMINDER_MIN_AGE_MS)
        return false;
    const today = calendarDateKeyNy(now);
    if (order.pendingPaymentReminderLastDateKey === today)
        return false;
    // Back-compat if only ISO timestamp was stored.
    const last = order.pendingPaymentReminderLastSentAt;
    if (last && calendarDateKeyNy(new Date(last)) === today)
        return false;
    return true;
}
