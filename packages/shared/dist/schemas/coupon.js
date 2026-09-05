"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeCouponSchema = exports.couponValidateSchema = exports.couponSchema = exports.createTestOrderCouponSchema = exports.couponKindSchema = exports.TEST_ORDER_COUPON_KIND = exports.TEST_ORDER_FORCE_TOTAL_USD = exports.TEST_ORDER_COUPON_MINUTES = exports.createAdminCouponSchema = exports.ADMIN_COUPON_DISCOUNT_OPTIONS = exports.ADMIN_OUTREACH_DISCOUNT_OPTIONS = exports.ADMIN_EXTREME_DISCOUNT_MAX = exports.ADMIN_EXTREME_DISCOUNT_MIN = exports.ADMIN_CONFIRMED_SALE_COUPON_HOURS = exports.ADMIN_CONFIRMED_SALE_DISCOUNT_PERCENT = exports.ADMIN_MANUAL_COUPON_HOURS = exports.couponSourceSchema = exports.DAILY_DEAL_WEIGHTS = exports.DAILY_DEAL_MAX_PERCENT = exports.DAILY_DEAL_WHEEL_LABELS = exports.DAILY_DEAL_SEGMENTS = exports.WELCOME_DISCOUNT_PERCENT = exports.WELCOME_COUPON_HOURS = exports.isEarlyBirdPromoActive = exports.EARLY_BIRD_ENDS_DATE = exports.EARLY_BIRD_DISCOUNT_PERCENT = void 0;
exports.isValidDailyDealPercent = isValidDailyDealPercent;
exports.pickDailyDealDiscount = pickDailyDealDiscount;
exports.dailyDealDayKey = dailyDealDayKey;
exports.isAdminOutreachDiscount = isAdminOutreachDiscount;
exports.isAdminConfirmedSaleDiscount = isAdminConfirmedSaleDiscount;
exports.isAdminExtremeDiscount = isAdminExtremeDiscount;
exports.isAllowedAdminCouponDiscount = isAllowedAdminCouponDiscount;
exports.adminCouponHoursForDiscount = adminCouponHoursForDiscount;
exports.isTestOrderCoupon = isTestOrderCoupon;
const zod_1 = require("zod");
const early_bird_1 = require("../lib/early-bird");
/** Early Bird promo helpers (schedule-delivery lives in `lib/schedule-delivery`). */
var early_bird_2 = require("../lib/early-bird");
Object.defineProperty(exports, "EARLY_BIRD_DISCOUNT_PERCENT", { enumerable: true, get: function () { return early_bird_2.EARLY_BIRD_DISCOUNT_PERCENT; } });
Object.defineProperty(exports, "EARLY_BIRD_ENDS_DATE", { enumerable: true, get: function () { return early_bird_2.EARLY_BIRD_ENDS_DATE; } });
Object.defineProperty(exports, "isEarlyBirdPromoActive", { enumerable: true, get: function () { return early_bird_2.isEarlyBirdPromoActive; } });
/** Discount-of-the-day coupon validity window. */
exports.WELCOME_COUPON_HOURS = 1;
/** @deprecated Prefer weighted spin; kept as fallback average. */
exports.WELCOME_DISCOUNT_PERCENT = 10;
/** Underlying discount values for each wheel slice (always max 10% for every spin). */
exports.DAILY_DEAL_SEGMENTS = [10, 10, 10, 10, 10, 10, 10, 10];
/**
 * Mystery labels shown on the wheel — never reveal the % until the prize reveal.
 * Length must match DAILY_DEAL_SEGMENTS.
 */
exports.DAILY_DEAL_WHEEL_LABELS = [
    "Lucky",
    "Surprise",
    "Bonus",
    "Mystery",
    "Lucky",
    "Surprise",
    "Bonus",
    "Mystery",
];
/** Max Discount of the Day offer (every spin). */
exports.DAILY_DEAL_MAX_PERCENT = 10;
/**
 * Spin odds — currently always 10% (maximum discount).
 * Weights kept for backward-compatible imports; only 10% is issued.
 */
exports.DAILY_DEAL_WEIGHTS = [
    { percent: 10, weight: 100 },
];
function isValidDailyDealPercent(n) {
    return n === 6 || n === 7 || n === 8 || n === 10;
}
/** Always awards the maximum Discount of the Day (10%). */
function pickDailyDealDiscount() {
    return exports.DAILY_DEAL_MAX_PERCENT;
}
/** Calendar day key in America/New_York for one-spin-per-phone-per-day. */
function dailyDealDayKey(date = new Date()) {
    return (0, early_bird_1.calendarDayKeyAmericaNy)(date);
}
exports.couponSourceSchema = zod_1.z.enum(["welcome", "abandoned", "admin"]);
/** Admin manual abandoned-cart coupons (WhatsApp / phone outreach). */
exports.ADMIN_MANUAL_COUPON_HOURS = 1;
/** Default / baseline confirmed-sale discount (also the min for typed special offers). */
exports.ADMIN_CONFIRMED_SALE_DISCOUNT_PERCENT = 20;
exports.ADMIN_CONFIRMED_SALE_COUPON_HOURS = 24;
/** Manual special offers: whole numbers from 20% through 50%. */
exports.ADMIN_EXTREME_DISCOUNT_MIN = 20;
exports.ADMIN_EXTREME_DISCOUNT_MAX = 50;
/** Outreach presets (short expiry). */
exports.ADMIN_OUTREACH_DISCOUNT_OPTIONS = [7, 8, 9, 10, 11, 12, 13, 14, 15];
/** @deprecated Prefer ADMIN_OUTREACH_DISCOUNT_OPTIONS + typed 20–50%; kept for older UI imports. */
exports.ADMIN_COUPON_DISCOUNT_OPTIONS = [
    ...exports.ADMIN_OUTREACH_DISCOUNT_OPTIONS,
    exports.ADMIN_CONFIRMED_SALE_DISCOUNT_PERCENT,
];
function isAdminOutreachDiscount(percent) {
    return exports.ADMIN_OUTREACH_DISCOUNT_OPTIONS.includes(percent);
}
/** 20–50% confirmed / special offers (typed or preset). */
function isAdminConfirmedSaleDiscount(percent) {
    return (Number.isInteger(percent) &&
        percent >= exports.ADMIN_EXTREME_DISCOUNT_MIN &&
        percent <= exports.ADMIN_EXTREME_DISCOUNT_MAX);
}
/** Above the standard 20% confirmed-sale rate — needs “Extreme discount offered” alert. */
function isAdminExtremeDiscount(percent) {
    return (Number.isInteger(percent) &&
        percent > exports.ADMIN_CONFIRMED_SALE_DISCOUNT_PERCENT &&
        percent <= exports.ADMIN_EXTREME_DISCOUNT_MAX);
}
function isAllowedAdminCouponDiscount(percent) {
    return isAdminOutreachDiscount(percent) || isAdminConfirmedSaleDiscount(percent);
}
function adminCouponHoursForDiscount(percent) {
    return isAdminConfirmedSaleDiscount(percent)
        ? exports.ADMIN_CONFIRMED_SALE_COUPON_HOURS
        : exports.ADMIN_MANUAL_COUPON_HOURS;
}
exports.createAdminCouponSchema = zod_1.z
    .object({
    email: zod_1.z
        .string()
        .trim()
        .max(254)
        .optional()
        .or(zod_1.z.literal("")),
    /** Local mobile digits only — used for coupon binding / checkout match (no country code). */
    phone: zod_1.z.string().trim().max(22).optional().or(zod_1.z.literal("")),
    /** Full E.164 for WhatsApp outreach only; never used for coupon validation. */
    whatsappPhone: zod_1.z.string().trim().max(22).optional().or(zod_1.z.literal("")),
    discountPercent: zod_1.z
        .number()
        .int()
        .refine(isAllowedAdminCouponDiscount, {
        message: "Discount must be 7%–15% (outreach) or 20%–50% (confirmed / special offer)",
    }),
    /**
     * Optional explicit flag. When omitted, 20%–50% is treated as confirmed sale.
     * Confirmed-sale coupons get a longer validity window.
     */
    confirmedSale: zod_1.z.boolean().optional(),
})
    .superRefine((v, ctx) => {
    const email = v.email?.trim() ?? "";
    const phoneDigits = (v.phone ?? "").replace(/\D/g, "");
    const hasEmail = Boolean(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    const hasPhone = phoneDigits.length >= 7 && phoneDigits.length <= 12;
    if (!hasEmail && !hasPhone) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Enter a customer email or mobile number",
            path: ["email"],
        });
    }
    if (email && !hasEmail) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Enter a valid email address",
            path: ["email"],
        });
    }
    if ((v.phone ?? "").trim() && !hasPhone) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Enter a valid mobile number",
            path: ["phone"],
        });
    }
});
/** Admin end-to-end test coupon: forces items + shipping to $1 USD. */
exports.TEST_ORDER_COUPON_MINUTES = 20;
exports.TEST_ORDER_FORCE_TOTAL_USD = 1;
exports.TEST_ORDER_COUPON_KIND = "test_order";
exports.couponKindSchema = zod_1.z.enum(["percent", "test_order"]);
const adminCouponContactFields = {
    email: zod_1.z.string().trim().max(254).optional().or(zod_1.z.literal("")),
    /** Local mobile digits only — used for coupon binding / checkout match (no country code). */
    phone: zod_1.z.string().trim().max(22).optional().or(zod_1.z.literal("")),
};
function refineAdminCouponContact(v, ctx) {
    const email = v.email?.trim() ?? "";
    const phoneDigits = (v.phone ?? "").replace(/\D/g, "");
    const hasEmail = Boolean(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    const hasPhone = phoneDigits.length >= 7 && phoneDigits.length <= 12;
    if (!hasEmail && !hasPhone) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Enter a customer email or mobile number",
            path: ["email"],
        });
    }
    if (email && !hasEmail) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Enter a valid email address",
            path: ["email"],
        });
    }
    if ((v.phone ?? "").trim() && !hasPhone) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Enter a valid mobile number",
            path: ["phone"],
        });
    }
}
exports.createTestOrderCouponSchema = zod_1.z
    .object(adminCouponContactFields)
    .superRefine(refineAdminCouponContact);
function isTestOrderCoupon(coupon) {
    return coupon?.kind === exports.TEST_ORDER_COUPON_KIND;
}
exports.couponSchema = zod_1.z.object({
    code: zod_1.z.string(),
    /** Optional when coupon is bound to phone (spin-the-wheel). */
    email: zod_1.z.string().email().optional(),
    discountPercent: zod_1.z.number().int().min(1).max(100),
    expiresAt: zod_1.z.string(),
    createdAt: zod_1.z.string(),
    sessionId: zod_1.z.string().optional(),
    usedAt: zod_1.z.string().optional(),
    orderId: zod_1.z.string().optional(),
    source: exports.couponSourceSchema,
    dayKey: zod_1.z.string().optional(),
    /** Customer phone (welcome spin / admin abandoned outreach). */
    phone: zod_1.z.string().optional(),
    /** Cognito email of admin who created the coupon. */
    createdBy: zod_1.z.string().email().optional(),
    /**
     * Admin 20%–50% coupons for customers who confirmed they will buy.
     * Longer expiry so the code is less likely to expire unused.
     */
    confirmedSale: zod_1.z.boolean().optional(),
    /** `test_order` forces checkout total (items + shipping) to $1 USD. */
    kind: exports.couponKindSchema.optional(),
    forceTotalUsd: zod_1.z.number().positive().optional(),
});
exports.couponValidateSchema = zod_1.z
    .object({
    code: zod_1.z.string().min(4).max(32),
    email: zod_1.z.string().max(254).optional(),
    phone: zod_1.z.string().max(40).optional(),
})
    .refine((v) => Boolean(v.email?.trim()) || Boolean(v.phone?.trim()), {
    message: "Email or phone is required to apply a coupon",
});
exports.welcomeCouponSchema = exports.couponSchema.extend({
    source: zod_1.z.literal("welcome"),
});
