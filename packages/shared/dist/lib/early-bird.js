"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WELCOME_COUPON_HOURS = exports.SCHEDULE_DELIVERY_MAX_DATE = exports.EARLY_BIRD_ENDS_DATE = exports.EARLY_BIRD_DISCOUNT_PERCENT = void 0;
exports.calendarDayKeyAmericaNy = calendarDayKeyAmericaNy;
exports.isEarlyBirdPromoActive = isEarlyBirdPromoActive;
exports.scheduleDeliveryMinDate = scheduleDeliveryMinDate;
exports.isValidScheduleDeliveryDate = isValidScheduleDeliveryDate;
exports.preferredDeliveryDateToIso = preferredDeliveryDateToIso;
/** Early Bird promo: fixed 15% off until end of this calendar day (America/New_York). */
exports.EARLY_BIRD_DISCOUNT_PERCENT = 15;
/** Last day the Early Bird popup / coupon claim is available (inclusive). */
exports.EARLY_BIRD_ENDS_DATE = "2026-08-10";
/**
 * Latest customer-selectable scheduled delivery date (inclusive).
 * Stored as YYYY-MM-DD in America/New_York calendar terms.
 */
exports.SCHEDULE_DELIVERY_MAX_DATE = "2026-08-28";
/** Coupon validity window for Early Bird / welcome codes (hours). */
exports.WELCOME_COUPON_HOURS = 1;
/** Calendar day key in America/New_York (YYYY-MM-DD). */
function calendarDayKeyAmericaNy(date = new Date()) {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);
}
/** True while Early Bird claims are still allowed (through EARLY_BIRD_ENDS_DATE inclusive). */
function isEarlyBirdPromoActive(date = new Date()) {
    return calendarDayKeyAmericaNy(date) <= exports.EARLY_BIRD_ENDS_DATE;
}
/** Min selectable delivery date = today (America/New_York). */
function scheduleDeliveryMinDate(date = new Date()) {
    return calendarDayKeyAmericaNy(date);
}
function isValidScheduleDeliveryDate(value, now = new Date()) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value))
        return false;
    const min = scheduleDeliveryMinDate(now);
    return value >= min && value <= exports.SCHEDULE_DELIVERY_MAX_DATE;
}
/** ISO timestamp at end of the selected America/New_York calendar day (approx 23:59:59.999 ET). */
function preferredDeliveryDateToIso(dateYmd) {
    // Store noon UTC on that date so vendor APIs get a stable calendar day.
    return `${dateYmd}T16:00:00.000Z`;
}
