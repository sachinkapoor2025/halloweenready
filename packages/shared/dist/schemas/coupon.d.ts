import { z } from "zod";
/** Early Bird promo helpers (schedule-delivery lives in `lib/schedule-delivery`). */
export { EARLY_BIRD_DISCOUNT_PERCENT, EARLY_BIRD_ENDS_DATE, isEarlyBirdPromoActive, } from "../lib/early-bird";
/** Discount-of-the-day coupon validity window. */
export declare const WELCOME_COUPON_HOURS = 1;
/** @deprecated Prefer weighted spin; kept as fallback average. */
export declare const WELCOME_DISCOUNT_PERCENT = 10;
/** Underlying discount values for each wheel slice (always max 10% for every spin). */
export declare const DAILY_DEAL_SEGMENTS: readonly [10, 10, 10, 10, 10, 10, 10, 10];
/**
 * Mystery labels shown on the wheel — never reveal the % until the prize reveal.
 * Length must match DAILY_DEAL_SEGMENTS.
 */
export declare const DAILY_DEAL_WHEEL_LABELS: readonly ["Lucky", "Surprise", "Bonus", "Mystery", "Lucky", "Surprise", "Bonus", "Mystery"];
export type DailyDealPercent = 6 | 7 | 8 | 10;
/** Max Discount of the Day offer (every spin). */
export declare const DAILY_DEAL_MAX_PERCENT: DailyDealPercent;
/**
 * Spin odds — currently always 10% (maximum discount).
 * Weights kept for backward-compatible imports; only 10% is issued.
 */
export declare const DAILY_DEAL_WEIGHTS: ReadonlyArray<{
    percent: DailyDealPercent;
    weight: number;
}>;
export declare function isValidDailyDealPercent(n: unknown): n is DailyDealPercent;
/** Always awards the maximum Discount of the Day (10%). */
export declare function pickDailyDealDiscount(): DailyDealPercent;
/** Calendar day key in America/New_York for one-spin-per-phone-per-day. */
export declare function dailyDealDayKey(date?: Date): string;
export declare const couponSourceSchema: any;
export type CouponSource = z.infer<typeof couponSourceSchema>;
/** Admin manual abandoned-cart coupons (WhatsApp / phone outreach). */
export declare const ADMIN_MANUAL_COUPON_HOURS = 1;
/** Default / baseline confirmed-sale discount (also the min for typed special offers). */
export declare const ADMIN_CONFIRMED_SALE_DISCOUNT_PERCENT = 20;
export declare const ADMIN_CONFIRMED_SALE_COUPON_HOURS = 24;
/** Manual special offers: whole numbers from 20% through 50%. */
export declare const ADMIN_EXTREME_DISCOUNT_MIN = 20;
export declare const ADMIN_EXTREME_DISCOUNT_MAX = 50;
/** Outreach presets (short expiry). */
export declare const ADMIN_OUTREACH_DISCOUNT_OPTIONS: readonly [7, 8, 9, 10, 11, 12, 13, 14, 15];
/** @deprecated Prefer ADMIN_OUTREACH_DISCOUNT_OPTIONS + typed 20–50%; kept for older UI imports. */
export declare const ADMIN_COUPON_DISCOUNT_OPTIONS: readonly [7, 8, 9, 10, 11, 12, 13, 14, 15, 20];
export type AdminCouponDiscountPercent = number;
export declare function isAdminOutreachDiscount(percent: number): boolean;
/** 20–50% confirmed / special offers (typed or preset). */
export declare function isAdminConfirmedSaleDiscount(percent: number): boolean;
/** Above the standard 20% confirmed-sale rate — needs “Extreme discount offered” alert. */
export declare function isAdminExtremeDiscount(percent: number): boolean;
export declare function isAllowedAdminCouponDiscount(percent: number): boolean;
export declare function adminCouponHoursForDiscount(percent: number): number;
export declare const createAdminCouponSchema: any;
export type CreateAdminCouponInput = z.infer<typeof createAdminCouponSchema>;
export declare const couponSchema: any;
export type StoreCoupon = z.infer<typeof couponSchema>;
export declare const couponValidateSchema: any;
export declare const welcomeCouponSchema: any;
export type CouponValidateInput = z.infer<typeof couponValidateSchema>;
export type WelcomeCoupon = z.infer<typeof welcomeCouponSchema>;
export type CouponValidationResult = {
    valid: boolean;
    code?: string;
    discountPercent?: number;
    expiresAt?: string;
    error?: string;
};
