import { z } from "zod";
/** Discount-of-the-day coupon validity window. */
export declare const WELCOME_COUPON_HOURS = 1;
/** @deprecated Prefer weighted spin; kept as fallback average. */
export declare const WELCOME_DISCOUNT_PERCENT = 10;
/** Visual wheel segments (labels on the wheel). */
export declare const DAILY_DEAL_SEGMENTS: readonly [5, 10, 15, 20, 5, 10, 15, 20];
export type DailyDealPercent = 5 | 10 | 15 | 20;
/**
 * Spin odds:
 * 35% → 5% off, 45% → 10% off, 15% → 15% off, 5% → 20% off
 */
export declare const DAILY_DEAL_WEIGHTS: ReadonlyArray<{
    percent: DailyDealPercent;
    weight: number;
}>;
export declare function isValidDailyDealPercent(n: unknown): n is DailyDealPercent;
/** Pick a random discount using configured weights. */
export declare function pickDailyDealDiscount(): DailyDealPercent;
/** Calendar day key in America/New_York for one-spin-per-email-per-day. */
export declare function dailyDealDayKey(date?: Date): string;
export declare const couponSourceSchema: z.ZodEnum<["welcome", "abandoned"]>;
export type CouponSource = z.infer<typeof couponSourceSchema>;
export declare const couponSchema: z.ZodObject<{
    code: z.ZodString;
    email: z.ZodString;
    discountPercent: z.ZodNumber;
    expiresAt: z.ZodString;
    createdAt: z.ZodString;
    sessionId: z.ZodOptional<z.ZodString>;
    usedAt: z.ZodOptional<z.ZodString>;
    orderId: z.ZodOptional<z.ZodString>;
    source: z.ZodEnum<["welcome", "abandoned"]>;
    dayKey: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: string;
    email: string;
    source: "welcome" | "abandoned";
    createdAt: string;
    discountPercent: number;
    expiresAt: string;
    orderId?: string | undefined;
    sessionId?: string | undefined;
    usedAt?: string | undefined;
    dayKey?: string | undefined;
}, {
    code: string;
    email: string;
    source: "welcome" | "abandoned";
    createdAt: string;
    discountPercent: number;
    expiresAt: string;
    orderId?: string | undefined;
    sessionId?: string | undefined;
    usedAt?: string | undefined;
    dayKey?: string | undefined;
}>;
export type StoreCoupon = z.infer<typeof couponSchema>;
export declare const couponValidateSchema: z.ZodObject<{
    code: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    email: string;
}, {
    code: string;
    email: string;
}>;
export declare const welcomeCouponSchema: z.ZodObject<{
    code: z.ZodString;
    email: z.ZodString;
    discountPercent: z.ZodNumber;
    expiresAt: z.ZodString;
    createdAt: z.ZodString;
    sessionId: z.ZodOptional<z.ZodString>;
    usedAt: z.ZodOptional<z.ZodString>;
    orderId: z.ZodOptional<z.ZodString>;
    dayKey: z.ZodOptional<z.ZodString>;
} & {
    source: z.ZodLiteral<"welcome">;
}, "strip", z.ZodTypeAny, {
    code: string;
    email: string;
    source: "welcome";
    createdAt: string;
    discountPercent: number;
    expiresAt: string;
    orderId?: string | undefined;
    sessionId?: string | undefined;
    usedAt?: string | undefined;
    dayKey?: string | undefined;
}, {
    code: string;
    email: string;
    source: "welcome";
    createdAt: string;
    discountPercent: number;
    expiresAt: string;
    orderId?: string | undefined;
    sessionId?: string | undefined;
    usedAt?: string | undefined;
    dayKey?: string | undefined;
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
