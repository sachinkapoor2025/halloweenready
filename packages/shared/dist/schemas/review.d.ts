import { z } from "zod";
/** Stored review attached to a product (self-hosted or imported from a widget). */
export declare const productReviewSchema: z.ZodObject<{
    reviewId: z.ZodString;
    productSlug: z.ZodString;
    authorName: z.ZodString;
    rating: z.ZodNumber;
    title: z.ZodOptional<z.ZodString>;
    body: z.ZodString;
    source: z.ZodDefault<z.ZodEnum<["site", "trustpilot", "judgeme", "yotpo", "import"]>>;
    published: z.ZodDefault<z.ZodBoolean>;
    verifiedPurchase: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    productSlug: string;
    source: "site" | "trustpilot" | "judgeme" | "yotpo" | "import";
    reviewId: string;
    authorName: string;
    rating: number;
    body: string;
    published: boolean;
    title?: string | undefined;
    verifiedPurchase?: boolean | undefined;
}, {
    productSlug: string;
    reviewId: string;
    authorName: string;
    rating: number;
    body: string;
    source?: "site" | "trustpilot" | "judgeme" | "yotpo" | "import" | undefined;
    title?: string | undefined;
    published?: boolean | undefined;
    verifiedPurchase?: boolean | undefined;
}>;
export type ProductReview = z.infer<typeof productReviewSchema> & {
    createdAt: string;
    updatedAt: string;
};
/** Aggregate denormalized on the product record for Product JSON-LD. */
export declare const productRatingAggregateSchema: z.ZodObject<{
    ratingValue: z.ZodNumber;
    reviewCount: z.ZodNumber;
    bestRating: z.ZodDefault<z.ZodNumber>;
    worstRating: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
}, {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number | undefined;
    worstRating?: number | undefined;
}>;
export type ProductRatingAggregate = z.infer<typeof productRatingAggregateSchema>;
export declare const createProductReviewSchema: z.ZodObject<Omit<{
    reviewId: z.ZodString;
    productSlug: z.ZodString;
    authorName: z.ZodString;
    rating: z.ZodNumber;
    title: z.ZodOptional<z.ZodString>;
    body: z.ZodString;
    source: z.ZodDefault<z.ZodEnum<["site", "trustpilot", "judgeme", "yotpo", "import"]>>;
    published: z.ZodDefault<z.ZodBoolean>;
    verifiedPurchase: z.ZodOptional<z.ZodBoolean>;
}, "reviewId">, "strip", z.ZodTypeAny, {
    productSlug: string;
    source: "site" | "trustpilot" | "judgeme" | "yotpo" | "import";
    authorName: string;
    rating: number;
    body: string;
    published: boolean;
    title?: string | undefined;
    verifiedPurchase?: boolean | undefined;
}, {
    productSlug: string;
    authorName: string;
    rating: number;
    body: string;
    source?: "site" | "trustpilot" | "judgeme" | "yotpo" | "import" | undefined;
    title?: string | undefined;
    published?: boolean | undefined;
    verifiedPurchase?: boolean | undefined;
}>;
export type CreateProductReviewInput = z.infer<typeof createProductReviewSchema>;
