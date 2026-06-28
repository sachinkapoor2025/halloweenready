"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPaymentConfig = exports.paymentConfigSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../constants");
exports.paymentConfigSchema = zod_1.z.object({
    defaultRegion: zod_1.z.enum([constants_1.PAYMENT_REGIONS.US, constants_1.PAYMENT_REGIONS.IN]),
    regions: zod_1.z.object({
        US: zod_1.z.object({
            provider: zod_1.z.literal(constants_1.PAYMENT_PROVIDERS.STRIPE),
            currency: zod_1.z.literal("USD"),
            enabled: zod_1.z.boolean().default(true),
        }),
        IN: zod_1.z.object({
            provider: zod_1.z.literal(constants_1.PAYMENT_PROVIDERS.RAZORPAY),
            currency: zod_1.z.literal("INR"),
            enabled: zod_1.z.boolean().default(true),
        }),
    }),
});
exports.defaultPaymentConfig = {
    defaultRegion: "US",
    regions: {
        US: { provider: "stripe", currency: "USD", enabled: true },
        IN: { provider: "razorpay", currency: "INR", enabled: true },
    },
};
