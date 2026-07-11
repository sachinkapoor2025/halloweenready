import { z } from "zod";
export declare const cartItemSchema: z.ZodObject<{
    productSlug: z.ZodString;
    name: z.ZodString;
    price: z.ZodNumber;
    currency: z.ZodEnum<["USD", "INR"]>;
    quantity: z.ZodNumber;
    image: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    productSlug: string;
    name: string;
    price: number;
    currency: "USD" | "INR";
    quantity: number;
    image?: string | undefined;
}, {
    productSlug: string;
    name: string;
    price: number;
    currency: "USD" | "INR";
    quantity: number;
    image?: string | undefined;
}>;
export declare const addToCartSchema: z.ZodObject<{
    productSlug: z.ZodString;
    quantity: z.ZodDefault<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    productSlug: string;
    quantity: number;
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
}, {
    productSlug: string;
    name?: string | undefined;
    quantity?: number | undefined;
    email?: string | undefined;
    phone?: string | undefined;
}>;
export declare const cartSchema: z.ZodObject<{
    items: z.ZodDefault<z.ZodArray<z.ZodObject<{
        productSlug: z.ZodString;
        name: z.ZodString;
        price: z.ZodNumber;
        currency: z.ZodEnum<["USD", "INR"]>;
        quantity: z.ZodNumber;
        image: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        productSlug: string;
        name: string;
        price: number;
        currency: "USD" | "INR";
        quantity: number;
        image?: string | undefined;
    }, {
        productSlug: string;
        name: string;
        price: number;
        currency: "USD" | "INR";
        quantity: number;
        image?: string | undefined;
    }>, "many">>;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    items: {
        productSlug: string;
        name: string;
        price: number;
        currency: "USD" | "INR";
        quantity: number;
        image?: string | undefined;
    }[];
    updatedAt: string;
}, {
    updatedAt: string;
    items?: {
        productSlug: string;
        name: string;
        price: number;
        currency: "USD" | "INR";
        quantity: number;
        image?: string | undefined;
    }[] | undefined;
}>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof cartSchema>;
export type AddToCartInput = z.infer<typeof addToCartSchema>;
