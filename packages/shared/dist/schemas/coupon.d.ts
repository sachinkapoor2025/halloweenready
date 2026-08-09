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
export declare const couponSourceSchema: z.ZodEnum<["welcome", "abandoned", "admin"]>;
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
export declare const createAdminCouponSchema: z.ZodEffects<z.ZodObject<{
    email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    /** Local mobile digits only — used for coupon binding / checkout match (no country code). */
    phone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    /** Full E.164 for WhatsApp outreach only; never used for coupon validation. */
    whatsappPhone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    discountPercent: z.ZodEffects<z.ZodNumber, number, number>;
    /**
     * Optional explicit flag. When omitted, 20%–50% is treated as confirmed sale.
     * Confirmed-sale coupons get a longer validity window.
     */
    confirmedSale: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    discountPercent: number;
    email?: string | undefined;
    phone?: string | undefined;
    whatsappPhone?: string | undefined;
    confirmedSale?: boolean | undefined;
}, {
    discountPercent: number;
    email?: string | undefined;
    phone?: string | undefined;
    whatsappPhone?: string | undefined;
    confirmedSale?: boolean | undefined;
}>, {
    discountPercent: number;
    email?: string | undefined;
    phone?: string | undefined;
    whatsappPhone?: string | undefined;
    confirmedSale?: boolean | undefined;
}, {
    discountPercent: number;
    email?: string | undefined;
    phone?: string | undefined;
    whatsappPhone?: string | undefined;
    confirmedSale?: boolean | undefined;
}>;
export type CreateAdminCouponInput = z.infer<typeof createAdminCouponSchema>;
export declare const couponSchema: z.ZodObject<{
    code: z.ZodString;
    /** Optional when coupon is bound to phone (spin-the-wheel). */
    email: z.ZodOptional<z.ZodString>;
    discountPercent: z.ZodNumber;
    expiresAt: z.ZodString;
    createdAt: z.ZodString;
    sessionId: z.ZodOptional<z.ZodString>;
    usedAt: z.ZodOptional<z.ZodString>;
    orderId: z.ZodOptional<z.ZodString>;
    source: z.ZodEnum<["welcome", "abandoned", "admin"]>;
    dayKey: z.ZodOptional<z.ZodString>;
    /** Customer phone (welcome spin / admin abandoned outreach). */
    phone: z.ZodOptional<z.ZodString>;
    /** Cognito email of admin who created the coupon. */
    createdBy: z.ZodOptional<z.ZodString>;
    /**
     * Admin 20%–50% coupons for customers who confirmed they will buy.
     * Longer expiry so the code is less likely to expire unused.
     */
    confirmedSale: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    code: string;
    source: "admin" | "welcome" | "abandoned";
    createdAt: string;
    discountPercent: number;
    expiresAt: string;
    email?: string | undefined;
    phone?: string | undefined;
    sessionId?: string | undefined;
    orderId?: string | undefined;
    confirmedSale?: boolean | undefined;
    usedAt?: string | undefined;
    dayKey?: string | undefined;
    createdBy?: string | undefined;
}, {
    code: string;
    source: "admin" | "welcome" | "abandoned";
    createdAt: string;
    discountPercent: number;
    expiresAt: string;
    email?: string | undefined;
    phone?: string | undefined;
    sessionId?: string | undefined;
    orderId?: string | undefined;
    confirmedSale?: boolean | undefined;
    usedAt?: string | undefined;
    dayKey?: string | undefined;
    createdBy?: string | undefined;
}>;
export type StoreCoupon = z.infer<typeof couponSchema>;
export declare const couponValidateSchema: z.ZodEffects<z.ZodObject<{
    code: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: string;
    email?: string | undefined;
    phone?: string | undefined;
}, {
    code: string;
    email?: string | undefined;
    phone?: string | undefined;
}>, {
    code: string;
    email?: string | undefined;
    phone?: string | undefined;
}, {
    code: string;
    email?: string | undefined;
    phone?: string | undefined;
}>;
export declare const welcomeCouponSchema: z.ZodObject<{
    code: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    discountPercent: z.ZodNumber;
    expiresAt: z.ZodString;
    createdAt: z.ZodString;
    sessionId: z.ZodOptional<z.ZodString>;
    usedAt: z.ZodOptional<z.ZodString>;
    orderId: z.ZodOptional<z.ZodString>;
    dayKey: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    createdBy: z.ZodOptional<z.ZodString>;
    confirmedSale: z.ZodOptional<z.ZodBoolean>;
} & {
    source: z.ZodLiteral<"welcome">;
}, "strip", z.ZodTypeAny, {
    code: string;
    source: "welcome";
    createdAt: string;
    discountPercent: number;
    expiresAt: string;
    email?: string | undefined;
    phone?: string | undefined;
    sessionId?: string | undefined;
    orderId?: string | undefined;
    confirmedSale?: boolean | undefined;
    usedAt?: string | undefined;
    dayKey?: string | undefined;
    createdBy?: string | undefined;
}, {
    code: string;
    source: "welcome";
    createdAt: string;
    discountPercent: number;
    expiresAt: string;
    email?: string | undefined;
    phone?: string | undefined;
    sessionId?: string | undefined;
    orderId?: string | undefined;
    confirmedSale?: boolean | undefined;
    usedAt?: string | undefined;
    dayKey?: string | undefined;
    createdBy?: string | undefined;
}>;
export type CouponValidateInput = z.infer<typeof couponValidateSchema>;
export type WelcomeCoupon = z.infer<typeof welcomeCouponSchema>;
export type CouponValidationResult = {
    valid: boolean;
    code?: string;
    discountPercent?: number;
    expiresAt?: string;
    error?: string;
};
