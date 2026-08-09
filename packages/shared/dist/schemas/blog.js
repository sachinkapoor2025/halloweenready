"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogImageConfigSchema = exports.blogImageMapSchema = void 0;
const zod_1 = require("zod");
exports.blogImageMapSchema = zod_1.z.record(zod_1.z.string().min(1), zod_1.z.string().url());
exports.blogImageConfigSchema = zod_1.z.object({
    images: exports.blogImageMapSchema.default({}),
});
