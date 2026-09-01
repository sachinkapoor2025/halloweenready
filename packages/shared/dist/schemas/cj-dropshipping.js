"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cjFulfillOrderSchema = exports.cjFreightQuoteSchema = exports.cjSaveApiKeySchema = exports.cjImportHalloweenSchema = exports.cjImportProductsSchema = exports.cjSearchQuerySchema = exports.cjVariantSchema = exports.CJ_IMPORT_MAX_PIDS = void 0;
const zod_1 = require("zod");
/** One API Gateway call stays under ~29s (CJ is 1 QPS; import also queries each pid). */
exports.CJ_IMPORT_MAX_PIDS = 6;
exports.cjVariantSchema = zod_1.z.object({
    vid: zod_1.z.string().min(1),
    sku: zod_1.z.string().optional(),
    key: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
    inventory: zod_1.z.number().int().min(0).optional(),
    /** Storefront sale price for this variant (USD). */
    price: zod_1.z.number().positive().optional(),
    /** Wholesale CJ sell price (USD) — never expose on public APIs. */
    vendorCost: zod_1.z.number().positive().optional(),
    weightOz: zod_1.z.number().positive().optional(),
    lengthIn: zod_1.z.number().positive().optional(),
    widthIn: zod_1.z.number().positive().optional(),
    heightIn: zod_1.z.number().positive().optional(),
});
exports.cjSearchQuerySchema = zod_1.z.object({
    keyWord: zod_1.z.string().trim().max(200).optional(),
    page: zod_1.z.coerce.number().int().min(1).max(1000).optional(),
    size: zod_1.z.coerce.number().int().min(1).max(100).optional(),
    categoryId: zod_1.z.string().max(200).optional(),
    countryCode: zod_1.z.string().trim().length(2).optional(),
});
exports.cjImportProductsSchema = zod_1.z.object({
    pids: zod_1.z.array(zod_1.z.string().min(1).max(80)).min(1).max(exports.CJ_IMPORT_MAX_PIDS, `Import at most ${exports.CJ_IMPORT_MAX_PIDS} products per request`),
    categorySlug: zod_1.z.string().min(1).max(80).optional(),
    published: zod_1.z.boolean().optional(),
    addToMyProduct: zod_1.z.boolean().optional(),
});
exports.cjImportHalloweenSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).max(1000).default(1),
    size: zod_1.z.coerce.number().int().min(1).max(20).default(10),
    categorySlug: zod_1.z.string().min(1).max(80).optional(),
    published: zod_1.z.boolean().optional(),
    addToMyProduct: zod_1.z.boolean().optional(),
    keyWord: zod_1.z.string().trim().max(200).optional(),
});
exports.cjSaveApiKeySchema = zod_1.z.object({
    apiKey: zod_1.z.string().trim().min(8).max(400),
});
exports.cjFreightQuoteSchema = zod_1.z.object({
    startCountryCode: zod_1.z.string().trim().length(2).default("CN"),
    endCountryCode: zod_1.z.string().trim().length(2),
    zip: zod_1.z.string().trim().max(20).optional(),
    products: zod_1.z
        .array(zod_1.z.object({
        vid: zod_1.z.string().min(1),
        quantity: zod_1.z.number().int().min(1).max(99),
    }))
        .min(1)
        .max(40),
});
exports.cjFulfillOrderSchema = zod_1.z.object({
    orderId: zod_1.z.string().min(1),
    /** 1=page pay URL, 2=CJ wallet, 3=create only (default). */
    payType: zod_1.z.union([zod_1.z.literal(1), zod_1.z.literal(2), zod_1.z.literal(3)]).optional(),
    logisticName: zod_1.z.string().min(1).max(80).optional(),
    fromCountryCode: zod_1.z.string().trim().length(2).optional(),
});
