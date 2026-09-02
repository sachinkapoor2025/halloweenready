"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cjFulfillOrderSchema = exports.productShippingResponseSchema = exports.cjStorefrontShippingMethodSchema = exports.productShippingQuerySchema = exports.CJ_STOREFRONT_SHIP_COUNTRY_NAMES = exports.CJ_STOREFRONT_SHIP_COUNTRIES = exports.cjFreightQuoteSchema = exports.cjSaveApiKeySchema = exports.cjImportHalloweenSchema = exports.cjImportProductsSchema = exports.CJ_IMPORT_MAX_PIDS = exports.cjSearchQuerySchema = exports.cjVariantSchema = void 0;
const zod_1 = require("zod");
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
/** One API Gateway call stays under ~29s (CJ is 1 QPS; import also queries each pid). */
exports.CJ_IMPORT_MAX_PIDS = 6;
exports.cjImportProductsSchema = zod_1.z.object({
    pids: zod_1.z
        .array(zod_1.z.string().min(1).max(80))
        .min(1)
        .max(exports.CJ_IMPORT_MAX_PIDS, `Import at most ${exports.CJ_IMPORT_MAX_PIDS} products per request`),
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
/** Destinations we will quote on the storefront (ISO 3166-1 alpha-2). */
exports.CJ_STOREFRONT_SHIP_COUNTRIES = ["US", "CA", "GB", "AU", "DE"];
exports.CJ_STOREFRONT_SHIP_COUNTRY_NAMES = {
    US: "United States",
    CA: "Canada",
    GB: "United Kingdom",
    AU: "Australia",
    DE: "Germany",
};
exports.productShippingQuerySchema = zod_1.z.object({
    country: zod_1.z
        .string()
        .trim()
        .toUpperCase()
        .refine((v) => exports.CJ_STOREFRONT_SHIP_COUNTRIES.includes(v))
        .default("US"),
    vid: zod_1.z.string().trim().min(1).max(80).optional(),
    quantity: zod_1.z.coerce.number().int().min(1).max(10).optional(),
});
exports.cjStorefrontShippingMethodSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    daysLabel: zod_1.z.string().min(1),
    priceUsd: zod_1.z.number().min(0),
});
exports.productShippingResponseSchema = zod_1.z.object({
    available: zod_1.z.boolean(),
    originCountry: zod_1.z.string(),
    destCountry: zod_1.z.string(),
    destCountryName: zod_1.z.string(),
    vid: zod_1.z.string().optional(),
    quantity: zod_1.z.number().int(),
    methods: zod_1.z.array(exports.cjStorefrontShippingMethodSchema),
    quotedAt: zod_1.z.string().optional(),
    customerChargeUsd: zod_1.z.number().min(0),
    customerChargeLabel: zod_1.z.string(),
});
exports.cjFulfillOrderSchema = zod_1.z.object({
    orderId: zod_1.z.string().min(1),
    /** 1=page pay URL, 2=CJ wallet, 3=create only (default). */
    payType: zod_1.z.union([zod_1.z.literal(1), zod_1.z.literal(2), zod_1.z.literal(3)]).optional(),
    logisticName: zod_1.z.string().min(1).max(80).optional(),
    fromCountryCode: zod_1.z.string().trim().length(2).optional(),
});
