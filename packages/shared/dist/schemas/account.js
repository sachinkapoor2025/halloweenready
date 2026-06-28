"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountAddressUpdateSchema = exports.accountAddressInputSchema = exports.accountProfileUpdateSchema = exports.accountProfileSchema = exports.accountAddressSchema = void 0;
const zod_1 = require("zod");
const order_1 = require("./order");
exports.accountAddressSchema = order_1.shippingAddressSchema.extend({
    id: zod_1.z.string(),
    label: zod_1.z.string().optional(),
    isDefault: zod_1.z.boolean().default(false),
});
exports.accountProfileSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    email: zod_1.z.string().email(),
    name: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    preferredPaymentMethod: zod_1.z.enum(["stripe", "razorpay"]).optional(),
});
exports.accountProfileUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(120).optional(),
    phone: zod_1.z.string().max(30).optional(),
    preferredPaymentMethod: zod_1.z.enum(["stripe", "razorpay"]).optional(),
});
exports.accountAddressInputSchema = order_1.shippingAddressSchema.extend({
    label: zod_1.z.string().max(80).optional(),
    isDefault: zod_1.z.boolean().optional(),
});
exports.accountAddressUpdateSchema = exports.accountAddressInputSchema.partial().extend({
    label: zod_1.z.string().max(80).optional(),
    isDefault: zod_1.z.boolean().optional(),
});
