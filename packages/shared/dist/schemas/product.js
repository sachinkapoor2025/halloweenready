"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkProductRowSchema = exports.updateProductSchema = exports.createProductSchema = exports.productSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../constants");
exports.productSchema = zod_1.z.object({
    slug: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    description: zod_1.z.string(),
    price: zod_1.z.number().positive(),
    compareAtPrice: zod_1.z.number().positive().optional(),
    currency: zod_1.z.enum(["USD", "INR"]).default("USD"),
    categorySlug: zod_1.z.string().min(1),
    images: zod_1.z.array(zod_1.z.string().url()).default([]),
    sku: zod_1.z.string().optional(),
    inventory: zod_1.z.number().int().min(0).default(constants_1.DEFAULT_PRODUCT_INVENTORY),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
    seoTitle: zod_1.z.string().optional(),
    seoDescription: zod_1.z.string().optional(),
    published: zod_1.z.boolean().default(true),
    /** Set when low-stock email sent; cleared when restocked above threshold. */
    lowStockAlertSentAt: zod_1.z.string().optional(),
    /** Lifetime units sold (incremented when order is paid). */
    unitsSold: zod_1.z.number().int().min(0).optional(),
});
exports.createProductSchema = exports.productSchema.omit({ slug: true }).extend({
    name: zod_1.z.string().min(1),
});
exports.updateProductSchema = exports.productSchema.partial().omit({ slug: true });
exports.bulkProductRowSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().default(""),
    price: zod_1.z.coerce.number().positive(),
    compareAtPrice: zod_1.z.coerce.number().positive().optional(),
    currency: zod_1.z.enum(["USD", "INR"]).default("USD"),
    categorySlug: zod_1.z.string().min(1),
    sku: zod_1.z.string().optional(),
    inventory: zod_1.z.coerce.number().int().min(0).default(constants_1.DEFAULT_PRODUCT_INVENTORY),
    tags: zod_1.z.string().optional(),
    seoTitle: zod_1.z.string().optional(),
    seoDescription: zod_1.z.string().optional(),
    published: zod_1.z.coerce.boolean().default(true),
});
