import { z } from "zod";
export declare const categorySchema: any;
export declare const createCategorySchema: any;
export declare const updateCategorySchema: any;
export type Category = z.infer<typeof categorySchema> & {
    createdAt: string;
    updatedAt: string;
};
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
