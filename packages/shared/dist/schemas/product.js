"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkProductRowSchema = exports.updateProductSchema = exports.createProductSchema = exports.productSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../constants");
const review_1 = require("./review");
exports.productSchema = zod_1.z.object({
    slug: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    description: zod_1.z.string(),
    price: zod_1.z.number().positive(),
    compareAtPrice: zod_1.z.number().positive().optional(),
    currency: zod_1.z.enum(["USD", "INR"]).default("USD"),
    categorySlug: zod_1.z.string().min(1),
    /**
     * Extra storefront categories (e.g. hamper also listed under single-rakhi / kids-rakhi).
     * Primary GSI remains categorySlug; list APIs merge these in.
     */
    additionalCategorySlugs: zod_1.z.array(zod_1.z.string().min(1)).optional(),
    images: zod_1.z.array(zod_1.z.string().url()).default([]),
    sku: zod_1.z.string().optional(),
    inventory: zod_1.z.number().int().min(0).default(constants_1.DEFAULT_PRODUCT_INVENTORY),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
    /** Supplier / marketplace vendor key (e.g. orange-county). */
    vendorSlug: zod_1.z.string().min(1).max(80).optional(),
    /** Prefer this warehouse when present; fulfillment engine may still re-route. */
    warehouseId: zod_1.z.string().min(1).max(80).optional(),
    /**
     * When set, product is only offered in these ISO country codes.
     * Omitted = available in every active market (existing catalog stays global).
     */
    availableCountryCodes: zod_1.z.array(zod_1.z.string().trim().length(2).transform((v) => v.toUpperCase())).optional(),
    /** Wholesale cost from vendor — never expose on public storefront APIs. */
    vendorCost: zod_1.z.number().positive().optional(),
    /**
     * Public storefront flag: show dry-fruit / chocolate add-on picker.
     * Set by API after stripping vendorSlug (true for HalloweenReady, false for OC).
     */
    allowsAddons: zod_1.z.boolean().optional(),
    /**
     * When true, coupons cannot discount this product (flash / fixed-price deals).
     * Also skips competitive storefront price cuts so the listed price stays exact.
     */
    couponExcluded: zod_1.z.boolean().optional(),
    seoTitle: zod_1.z.string().optional(),
    seoDescription: zod_1.z.string().optional(),
    published: zod_1.z.boolean().default(true),
    /** Set when low-stock email sent; cleared when restocked above threshold. */
    lowStockAlertSentAt: zod_1.z.string().optional(),
    /** Lifetime units sold (incremented when order is paid). */
    unitsSold: zod_1.z.number().int().min(0).optional(),
    /**
     * Denormalized star rating for Product JSON-LD / widgets.
     * Kept in sync when reviews are published under PRODUCT#slug / REVIEW#id.
     */
    ratingAggregate: review_1.productRatingAggregateSchema.optional(),
    /** Shipping weight in ounces (recommended for accurate USPS rates). */
    weightOz: zod_1.z.number().positive().optional(),
    /** Package dimensions in inches (recommended for accurate USPS rates). */
    lengthIn: zod_1.z.number().positive().optional(),
    widthIn: zod_1.z.number().positive().optional(),
    heightIn: zod_1.z.number().positive().optional(),
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
    vendorSlug: zod_1.z.string().min(1).max(80).optional(),
    vendorCost: zod_1.z.coerce.number().positive().optional(),
    seoTitle: zod_1.z.string().optional(),
    seoDescription: zod_1.z.string().optional(),
    published: zod_1.z.coerce.boolean().default(true),
    weightOz: zod_1.z.coerce.number().positive().optional(),
    lengthIn: zod_1.z.coerce.number().positive().optional(),
    widthIn: zod_1.z.coerce.number().positive().optional(),
    heightIn: zod_1.z.coerce.number().positive().optional(),
});
