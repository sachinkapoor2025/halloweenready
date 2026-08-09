import { z } from "zod";
export declare const blogImageMapSchema: z.ZodRecord<z.ZodString, z.ZodString>;
export declare const blogImageConfigSchema: z.ZodObject<{
    images: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    images: Record<string, string>;
}, {
    images?: Record<string, string> | undefined;
}>;
export type BlogImageMap = z.infer<typeof blogImageMapSchema>;
export type BlogImageConfig = z.infer<typeof blogImageConfigSchema>;
