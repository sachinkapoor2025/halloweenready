import { z } from "zod";
export declare const accountAddressSchema: z.ZodObject<{
    name: z.ZodString;
    line1: z.ZodString;
    line2: z.ZodOptional<z.ZodString>;
    city: z.ZodString;
    state: z.ZodString;
    postalCode: z.ZodString;
    country: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
} & {
    id: z.ZodString;
    label: z.ZodOptional<z.ZodString>;
    isDefault: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    id: string;
    isDefault: boolean;
    phone?: string | undefined;
    line2?: string | undefined;
    label?: string | undefined;
}, {
    name: string;
    email: string;
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    id: string;
    phone?: string | undefined;
    line2?: string | undefined;
    label?: string | undefined;
    isDefault?: boolean | undefined;
}>;
export declare const accountProfileSchema: z.ZodObject<{
    userId: z.ZodString;
    email: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    preferredPaymentMethod: z.ZodOptional<z.ZodEnum<["stripe", "razorpay"]>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    userId: string;
    name?: string | undefined;
    phone?: string | undefined;
    preferredPaymentMethod?: "stripe" | "razorpay" | undefined;
}, {
    email: string;
    userId: string;
    name?: string | undefined;
    phone?: string | undefined;
    preferredPaymentMethod?: "stripe" | "razorpay" | undefined;
}>;
export declare const accountProfileUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    preferredPaymentMethod: z.ZodOptional<z.ZodEnum<["stripe", "razorpay"]>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    phone?: string | undefined;
    preferredPaymentMethod?: "stripe" | "razorpay" | undefined;
}, {
    name?: string | undefined;
    phone?: string | undefined;
    preferredPaymentMethod?: "stripe" | "razorpay" | undefined;
}>;
export declare const accountAddressInputSchema: z.ZodObject<{
    name: z.ZodString;
    line1: z.ZodString;
    line2: z.ZodOptional<z.ZodString>;
    city: z.ZodString;
    state: z.ZodString;
    postalCode: z.ZodString;
    country: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
} & {
    label: z.ZodOptional<z.ZodString>;
    isDefault: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string | undefined;
    line2?: string | undefined;
    label?: string | undefined;
    isDefault?: boolean | undefined;
}, {
    name: string;
    email: string;
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string | undefined;
    line2?: string | undefined;
    label?: string | undefined;
    isDefault?: boolean | undefined;
}>;
export declare const accountAddressUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    line1: z.ZodOptional<z.ZodString>;
    line2: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    city: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodString>;
    postalCode: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    email: z.ZodOptional<z.ZodString>;
} & {
    label: z.ZodOptional<z.ZodString>;
    isDefault: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    line1?: string | undefined;
    line2?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    postalCode?: string | undefined;
    country?: string | undefined;
    label?: string | undefined;
    isDefault?: boolean | undefined;
}, {
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    line1?: string | undefined;
    line2?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    postalCode?: string | undefined;
    country?: string | undefined;
    label?: string | undefined;
    isDefault?: boolean | undefined;
}>;
export type AccountAddress = z.infer<typeof accountAddressSchema>;
export type AccountProfile = z.infer<typeof accountProfileSchema> & {
    createdAt: string;
    updatedAt: string;
};
