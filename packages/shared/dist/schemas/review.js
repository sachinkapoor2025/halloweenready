"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductReviewSchema = exports.productRatingAggregateSchema = exports.productReviewSchema = void 0;
const zod_1 = require("zod");
/** Stored review attached to a product (self-hosted or imported from a widget). */
exports.productReviewSchema = zod_1.z.object({
    reviewId: zod_1.z.string().min(1),
    productSlug: zod_1.z.string().min(1),
    authorName: zod_1.z.string().min(1).max(120),
    rating: zod_1.z.number().int().min(1).max(5),
    title: zod_1.z.string().max(200).optional(),
    body: zod_1.z.string().min(1).max(4000),
    source: zod_1.z.enum(["site", "trustpilot", "judgeme", "yotpo", "import"]).default("site"),
    published: zod_1.z.boolean().default(false),
    verifiedPurchase: zod_1.z.boolean().optional(),
});
/** Aggregate denormalized on the product record for Product JSON-LD. */
exports.productRatingAggregateSchema = zod_1.z.object({
    ratingValue: zod_1.z.number().min(1).max(5),
    reviewCount: zod_1.z.number().int().min(0),
    bestRating: zod_1.z.number().int().min(1).max(5).default(5),
    worstRating: zod_1.z.number().int().min(1).max(5).default(1),
});
exports.createProductReviewSchema = exports.productReviewSchema.omit({ reviewId: true });
