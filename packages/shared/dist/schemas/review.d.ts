import { z } from "zod";
/** Stored review attached to a product (self-hosted or imported from a widget). */
export declare const productReviewSchema: any;
export type ProductReview = z.infer<typeof productReviewSchema> & {
    createdAt: string;
    updatedAt: string;
};
/** Aggregate denormalized on the product record for Product JSON-LD. */
export declare const productRatingAggregateSchema: any;
export type ProductRatingAggregate = z.infer<typeof productRatingAggregateSchema>;
export declare const createProductReviewSchema: any;
export type CreateProductReviewInput = z.infer<typeof createProductReviewSchema>;
