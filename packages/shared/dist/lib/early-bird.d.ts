/** Early Bird promo: fixed 15% off until end of this calendar day (America/New_York). */
export declare const EARLY_BIRD_DISCOUNT_PERCENT: 15;
/** Last day the Early Bird popup / coupon claim is available (inclusive). */
export declare const EARLY_BIRD_ENDS_DATE = "2026-08-10";
/**
 * Latest customer-selectable scheduled delivery date (inclusive).
 * Stored as YYYY-MM-DD in America/New_York calendar terms.
 */
export declare const SCHEDULE_DELIVERY_MAX_DATE = "2026-08-28";
/** Coupon validity window for Early Bird / welcome codes (hours). */
export declare const WELCOME_COUPON_HOURS = 1;
/** Calendar day key in America/New_York (YYYY-MM-DD). */
export declare function calendarDayKeyAmericaNy(date?: Date): string;
/** True while Early Bird claims are still allowed (through EARLY_BIRD_ENDS_DATE inclusive). */
export declare function isEarlyBirdPromoActive(date?: Date): boolean;
/** Min selectable delivery date = today (America/New_York). */
export declare function scheduleDeliveryMinDate(date?: Date): string;
export declare function isValidScheduleDeliveryDate(value: string, now?: Date): boolean;
/** ISO timestamp at end of the selected America/New_York calendar day (approx 23:59:59.999 ET). */
export declare function preferredDeliveryDateToIso(dateYmd: string): string;
