import { z } from "zod";
export declare const productSchema: any;
export declare const createProductSchema: any;
export declare const updateProductSchema: any;
export declare const bulkProductRowSchema: any;
export type Product = z.infer<typeof productSchema> & {
    createdAt: string;
    updatedAt: string;
};
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type BulkProductRow = z.infer<typeof bulkProductRowSchema>;
