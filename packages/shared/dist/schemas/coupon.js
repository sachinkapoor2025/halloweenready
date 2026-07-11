"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeCouponSchema = exports.couponValidateSchema = exports.couponSchema = exports.couponSourceSchema = exports.DAILY_DEAL_WEIGHTS = exports.DAILY_DEAL_SEGMENTS = exports.WELCOME_DISCOUNT_PERCENT = exports.WELCOME_COUPON_HOURS = void 0;
exports.isValidDailyDealPercent = isValidDailyDealPercent;
exports.pickDailyDealDiscount = pickDailyDealDiscount;
exports.dailyDealDayKey = dailyDealDayKey;
const zod_1 = require("zod");
/** Discount-of-the-day coupon validity window. */
exports.WELCOME_COUPON_HOURS = 1;
/** @deprecated Prefer weighted spin; kept as fallback average. */
exports.WELCOME_DISCOUNT_PERCENT = 10;
/** Visual wheel segments (labels on the wheel). */
exports.DAILY_DEAL_SEGMENTS = [5, 10, 15, 20, 5, 10, 15, 20];
/**
 * Spin odds:
 * 35% → 5% off, 45% → 10% off, 15% → 15% off, 5% → 20% off
 */
exports.DAILY_DEAL_WEIGHTS = [
    { percent: 5, weight: 35 },
    { percent: 10, weight: 45 },
    { percent: 15, weight: 15 },
    { percent: 20, weight: 5 },
];
function isValidDailyDealPercent(n) {
    return n === 5 || n === 10 || n === 15 || n === 20;
}
/** Pick a random discount using configured weights. */
function pickDailyDealDiscount() {
    const total = exports.DAILY_DEAL_WEIGHTS.reduce((sum, row) => sum + row.weight, 0);
    let roll = Math.random() * total;
    for (const row of exports.DAILY_DEAL_WEIGHTS) {
        roll -= row.weight;
        if (roll <= 0)
            return row.percent;
    }
    return 10;
}
/** Calendar day key in America/New_York for one-spin-per-email-per-day. */
function dailyDealDayKey(date = new Date()) {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);
}
exports.couponSourceSchema = zod_1.z.enum(["welcome", "abandoned"]);
exports.couponSchema = zod_1.z.object({
    code: zod_1.z.string(),
    email: zod_1.z.string().email(),
    discountPercent: zod_1.z.number().int().min(1).max(100),
    expiresAt: zod_1.z.string(),
    createdAt: zod_1.z.string(),
    sessionId: zod_1.z.string().optional(),
    usedAt: zod_1.z.string().optional(),
    orderId: zod_1.z.string().optional(),
    source: exports.couponSourceSchema,
    dayKey: zod_1.z.string().optional(),
});
exports.couponValidateSchema = zod_1.z.object({
    code: zod_1.z.string().min(4).max(32),
    email: zod_1.z.string().email().max(254),
});
exports.welcomeCouponSchema = exports.couponSchema.extend({
    source: zod_1.z.literal("welcome"),
});
