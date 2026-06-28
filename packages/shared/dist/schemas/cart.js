"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartSchema = exports.addToCartSchema = exports.cartItemSchema = void 0;
const zod_1 = require("zod");
exports.cartItemSchema = zod_1.z.object({
    productSlug: zod_1.z.string(),
    name: zod_1.z.string(),
    price: zod_1.z.number(),
    currency: zod_1.z.enum(["USD", "INR"]),
    quantity: zod_1.z.number().int().min(1),
    image: zod_1.z.string().optional(),
});
exports.addToCartSchema = zod_1.z.object({
    productSlug: zod_1.z.string(),
    quantity: zod_1.z.number().int().min(1).default(1),
});
exports.cartSchema = zod_1.z.object({
    items: zod_1.z.array(exports.cartItemSchema).default([]),
    updatedAt: zod_1.z.string(),
});
