import { z } from "zod";
export declare const WELCOME_DISCOUNT_PERCENT = 10;
export declare const WELCOME_COUPON_HOURS = 4;
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
}, "strip", z.ZodTypeAny, {
    code: string;
    source: "welcome" | "abandoned";
    email: string;
    createdAt: string;
    discountPercent: number;
    expiresAt: string;
    orderId?: string | undefined;
    sessionId?: string | undefined;
    usedAt?: string | undefined;
}, {
    code: string;
    source: "welcome" | "abandoned";
    email: string;
    createdAt: string;
    discountPercent: number;
    expiresAt: string;
    orderId?: string | undefined;
    sessionId?: string | undefined;
    usedAt?: string | undefined;
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
} & {
    source: z.ZodLiteral<"welcome">;
}, "strip", z.ZodTypeAny, {
    code: string;
    source: "welcome";
    email: string;
    createdAt: string;
    discountPercent: number;
    expiresAt: string;
    orderId?: string | undefined;
    sessionId?: string | undefined;
    usedAt?: string | undefined;
}, {
    code: string;
    source: "welcome";
    email: string;
    createdAt: string;
    discountPercent: number;
    expiresAt: string;
    orderId?: string | undefined;
    sessionId?: string | undefined;
    usedAt?: string | undefined;
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
