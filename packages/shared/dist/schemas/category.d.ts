import { z } from "zod";
export declare const categorySchema: z.ZodObject<{
    slug: z.ZodString;
    name: z.ZodString;
    description: z.ZodDefault<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    parentSlug: z.ZodOptional<z.ZodString>;
    seoTitle: z.ZodOptional<z.ZodString>;
    seoDescription: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodNumber>;
    published: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    published: boolean;
    slug: string;
    sortOrder: number;
    image?: string | undefined;
    seoTitle?: string | undefined;
    seoDescription?: string | undefined;
    parentSlug?: string | undefined;
}, {
    name: string;
    slug: string;
    description?: string | undefined;
    image?: string | undefined;
    published?: boolean | undefined;
    seoTitle?: string | undefined;
    seoDescription?: string | undefined;
    parentSlug?: string | undefined;
    sortOrder?: number | undefined;
}>;
export declare const createCategorySchema: z.ZodObject<Omit<{
    slug: z.ZodString;
    name: z.ZodString;
    description: z.ZodDefault<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    parentSlug: z.ZodOptional<z.ZodString>;
    seoTitle: z.ZodOptional<z.ZodString>;
    seoDescription: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodNumber>;
    published: z.ZodDefault<z.ZodBoolean>;
}, "slug">, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    published: boolean;
    sortOrder: number;
    image?: string | undefined;
    seoTitle?: string | undefined;
    seoDescription?: string | undefined;
    parentSlug?: string | undefined;
}, {
    name: string;
    description?: string | undefined;
    image?: string | undefined;
    published?: boolean | undefined;
    seoTitle?: string | undefined;
    seoDescription?: string | undefined;
    parentSlug?: string | undefined;
    sortOrder?: number | undefined;
}>;
export declare const updateCategorySchema: z.ZodObject<Omit<{
    slug: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    image: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    parentSlug: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    seoTitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    seoDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    sortOrder: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    published: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, "slug">, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    published?: boolean | undefined;
    seoTitle?: string | undefined;
    seoDescription?: string | undefined;
    parentSlug?: string | undefined;
    sortOrder?: number | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    published?: boolean | undefined;
    seoTitle?: string | undefined;
    seoDescription?: string | undefined;
    parentSlug?: string | undefined;
    sortOrder?: number | undefined;
}>;
export type Category = z.infer<typeof categorySchema> & {
    createdAt: string;
    updatedAt: string;
};
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
