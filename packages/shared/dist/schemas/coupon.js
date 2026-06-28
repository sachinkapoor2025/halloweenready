"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeCouponSchema = exports.couponValidateSchema = exports.couponSchema = exports.couponSourceSchema = exports.WELCOME_COUPON_HOURS = exports.WELCOME_DISCOUNT_PERCENT = void 0;
const zod_1 = require("zod");
exports.WELCOME_DISCOUNT_PERCENT = 10;
exports.WELCOME_COUPON_HOURS = 4;
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
});
exports.couponValidateSchema = zod_1.z.object({
    code: zod_1.z.string().min(4).max(32),
    email: zod_1.z.string().email().max(254),
});
exports.welcomeCouponSchema = exports.couponSchema.extend({
    source: zod_1.z.literal("welcome"),
});
