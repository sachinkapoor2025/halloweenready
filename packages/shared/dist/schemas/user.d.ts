import { z } from "zod";
export declare const userProfileSchema: z.ZodObject<{
    userId: z.ZodString;
    email: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    role: z.ZodDefault<z.ZodEnum<["customer", "admin"]>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    role: "customer" | "admin";
    userId: string;
    name?: string | undefined;
    phone?: string | undefined;
}, {
    email: string;
    userId: string;
    name?: string | undefined;
    phone?: string | undefined;
    role?: "customer" | "admin" | undefined;
}>;
export type UserProfile = z.infer<typeof userProfileSchema> & {
    createdAt: string;
    updatedAt: string;
};
