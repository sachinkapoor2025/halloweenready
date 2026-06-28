"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategorySchema = exports.createCategorySchema = exports.categorySchema = void 0;
const zod_1 = require("zod");
exports.categorySchema = zod_1.z.object({
    slug: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().default(""),
    image: zod_1.z.string().url().optional(),
    parentSlug: zod_1.z.string().optional(),
    seoTitle: zod_1.z.string().optional(),
    seoDescription: zod_1.z.string().optional(),
    sortOrder: zod_1.z.number().int().default(0),
    published: zod_1.z.boolean().default(true),
});
exports.createCategorySchema = exports.categorySchema.omit({ slug: true });
exports.updateCategorySchema = exports.categorySchema.partial().omit({ slug: true });
