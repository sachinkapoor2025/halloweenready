import { z } from "zod";
export declare const cartItemAddonSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    /** Unit price in the cart line currency. */
    price: z.ZodNumber;
    quantity: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    price: number;
    quantity: number;
}, {
    id: string;
    name: string;
    price: number;
    quantity?: number | undefined;
}>;
export declare const cartItemSchema: z.ZodObject<{
    /** Stable cart line id (required for update/delete when add-ons differ). */
    lineId: z.ZodOptional<z.ZodString>;
    productSlug: z.ZodString;
    name: z.ZodString;
    /** Plain-text product snippet for order emails (optional; older carts omit this). */
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodNumber;
    currency: z.ZodEnum<["USD", "INR"]>;
    quantity: z.ZodNumber;
    image: z.ZodOptional<z.ZodString>;
    /** Copied from product at add-to-cart for vendor order feeds. */
    vendorSlug: z.ZodOptional<z.ZodString>;
    /**
     * Snapshot of product.vendorCost at add-to-cart (USD wholesale).
     * Used for vendor payouts so catalog price changes do not rewrite history.
     */
    vendorCost: z.ZodOptional<z.ZodNumber>;
    sku: z.ZodOptional<z.ZodString>;
    /** CJ product id snapshot (fulfillment). */
    cjPid: z.ZodOptional<z.ZodString>;
    /** CJ variant id for this cart line. */
    cjVid: z.ZodOptional<z.ZodString>;
    /** Human variant label, e.g. Black-XL. */
    variantKey: z.ZodOptional<z.ZodString>;
    /** Copied from product — flash / fixed deals are not coupon-eligible. */
    couponExcluded: z.ZodOptional<z.ZodBoolean>;
    /** Optional HalloweenReady dry-fruit / chocolate extras on this line. */
    addons: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        /** Unit price in the cart line currency. */
        price: z.ZodNumber;
        quantity: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        price: number;
        quantity: number;
    }, {
        id: string;
        name: string;
        price: number;
        quantity?: number | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    price: number;
    quantity: number;
    productSlug: string;
    currency: "USD" | "INR";
    lineId?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    vendorSlug?: string | undefined;
    vendorCost?: number | undefined;
    sku?: string | undefined;
    cjPid?: string | undefined;
    cjVid?: string | undefined;
    variantKey?: string | undefined;
    couponExcluded?: boolean | undefined;
    addons?: {
        id: string;
        name: string;
        price: number;
        quantity: number;
    }[] | undefined;
}, {
    name: string;
    price: number;
    quantity: number;
    productSlug: string;
    currency: "USD" | "INR";
    lineId?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    vendorSlug?: string | undefined;
    vendorCost?: number | undefined;
    sku?: string | undefined;
    cjPid?: string | undefined;
    cjVid?: string | undefined;
    variantKey?: string | undefined;
    couponExcluded?: boolean | undefined;
    addons?: {
        id: string;
        name: string;
        price: number;
        quantity?: number | undefined;
    }[] | undefined;
}>;
export declare const addToCartSchema: z.ZodObject<{
    productSlug: z.ZodString;
    quantity: z.ZodDefault<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    /**
     * Product add-ons: catalog ids and/or `{ id, quantity }` (server fills name/price).
     * Plain string ids still accepted (= quantity 1).
     */
    addons: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodObject<{
        id: z.ZodString;
        quantity: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        quantity: number;
    }, {
        id: string;
        quantity?: number | undefined;
    }>]>, "many">>;
    /** Optional CJ variant when the product has multiple SKUs. */
    cjVid: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    quantity: number;
    productSlug: string;
    name?: string | undefined;
    cjVid?: string | undefined;
    addons?: (string | {
        id: string;
        quantity: number;
    })[] | undefined;
    email?: string | undefined;
    phone?: string | undefined;
}, {
    productSlug: string;
    name?: string | undefined;
    quantity?: number | undefined;
    cjVid?: string | undefined;
    addons?: (string | {
        id: string;
        quantity?: number | undefined;
    })[] | undefined;
    email?: string | undefined;
    phone?: string | undefined;
}>;
export declare const cartSchema: z.ZodObject<{
    items: z.ZodDefault<z.ZodArray<z.ZodObject<{
        /** Stable cart line id (required for update/delete when add-ons differ). */
        lineId: z.ZodOptional<z.ZodString>;
        productSlug: z.ZodString;
        name: z.ZodString;
        /** Plain-text product snippet for order emails (optional; older carts omit this). */
        description: z.ZodOptional<z.ZodString>;
        price: z.ZodNumber;
        currency: z.ZodEnum<["USD", "INR"]>;
        quantity: z.ZodNumber;
        image: z.ZodOptional<z.ZodString>;
        /** Copied from product at add-to-cart for vendor order feeds. */
        vendorSlug: z.ZodOptional<z.ZodString>;
        /**
         * Snapshot of product.vendorCost at add-to-cart (USD wholesale).
         * Used for vendor payouts so catalog price changes do not rewrite history.
         */
        vendorCost: z.ZodOptional<z.ZodNumber>;
        sku: z.ZodOptional<z.ZodString>;
        /** CJ product id snapshot (fulfillment). */
        cjPid: z.ZodOptional<z.ZodString>;
        /** CJ variant id for this cart line. */
        cjVid: z.ZodOptional<z.ZodString>;
        /** Human variant label, e.g. Black-XL. */
        variantKey: z.ZodOptional<z.ZodString>;
        /** Copied from product — flash / fixed deals are not coupon-eligible. */
        couponExcluded: z.ZodOptional<z.ZodBoolean>;
        /** Optional HalloweenReady dry-fruit / chocolate extras on this line. */
        addons: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            /** Unit price in the cart line currency. */
            price: z.ZodNumber;
            quantity: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            price: number;
            quantity: number;
        }, {
            id: string;
            name: string;
            price: number;
            quantity?: number | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        price: number;
        quantity: number;
        productSlug: string;
        currency: "USD" | "INR";
        lineId?: string | undefined;
        description?: string | undefined;
        image?: string | undefined;
        vendorSlug?: string | undefined;
        vendorCost?: number | undefined;
        sku?: string | undefined;
        cjPid?: string | undefined;
        cjVid?: string | undefined;
        variantKey?: string | undefined;
        couponExcluded?: boolean | undefined;
        addons?: {
            id: string;
            name: string;
            price: number;
            quantity: number;
        }[] | undefined;
    }, {
        name: string;
        price: number;
        quantity: number;
        productSlug: string;
        currency: "USD" | "INR";
        lineId?: string | undefined;
        description?: string | undefined;
        image?: string | undefined;
        vendorSlug?: string | undefined;
        vendorCost?: number | undefined;
        sku?: string | undefined;
        cjPid?: string | undefined;
        cjVid?: string | undefined;
        variantKey?: string | undefined;
        couponExcluded?: boolean | undefined;
        addons?: {
            id: string;
            name: string;
            price: number;
            quantity?: number | undefined;
        }[] | undefined;
    }>, "many">>;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    items: {
        name: string;
        price: number;
        quantity: number;
        productSlug: string;
        currency: "USD" | "INR";
        lineId?: string | undefined;
        description?: string | undefined;
        image?: string | undefined;
        vendorSlug?: string | undefined;
        vendorCost?: number | undefined;
        sku?: string | undefined;
        cjPid?: string | undefined;
        cjVid?: string | undefined;
        variantKey?: string | undefined;
        couponExcluded?: boolean | undefined;
        addons?: {
            id: string;
            name: string;
            price: number;
            quantity: number;
        }[] | undefined;
    }[];
    updatedAt: string;
}, {
    updatedAt: string;
    items?: {
        name: string;
        price: number;
        quantity: number;
        productSlug: string;
        currency: "USD" | "INR";
        lineId?: string | undefined;
        description?: string | undefined;
        image?: string | undefined;
        vendorSlug?: string | undefined;
        vendorCost?: number | undefined;
        sku?: string | undefined;
        cjPid?: string | undefined;
        cjVid?: string | undefined;
        variantKey?: string | undefined;
        couponExcluded?: boolean | undefined;
        addons?: {
            id: string;
            name: string;
            price: number;
            quantity?: number | undefined;
        }[] | undefined;
    }[] | undefined;
}>;
export type CartItemAddon = z.infer<typeof cartItemAddonSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof cartSchema>;
export type AddToCartInput = z.infer<typeof addToCartSchema>;
