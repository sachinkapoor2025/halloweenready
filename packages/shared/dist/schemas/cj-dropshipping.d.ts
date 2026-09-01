import { z } from "zod";
export declare const cjVariantSchema: z.ZodObject<{
    vid: z.ZodString;
    sku: z.ZodOptional<z.ZodString>;
    key: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    inventory: z.ZodOptional<z.ZodNumber>;
    /** Storefront sale price for this variant (USD). */
    price: z.ZodOptional<z.ZodNumber>;
    /** Wholesale CJ sell price (USD) — never expose on public APIs. */
    vendorCost: z.ZodOptional<z.ZodNumber>;
    weightOz: z.ZodOptional<z.ZodNumber>;
    lengthIn: z.ZodOptional<z.ZodNumber>;
    widthIn: z.ZodOptional<z.ZodNumber>;
    heightIn: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    vid: string;
    name?: string | undefined;
    price?: number | undefined;
    image?: string | undefined;
    vendorCost?: number | undefined;
    sku?: string | undefined;
    inventory?: number | undefined;
    key?: string | undefined;
    weightOz?: number | undefined;
    lengthIn?: number | undefined;
    widthIn?: number | undefined;
    heightIn?: number | undefined;
}, {
    vid: string;
    name?: string | undefined;
    price?: number | undefined;
    image?: string | undefined;
    vendorCost?: number | undefined;
    sku?: string | undefined;
    inventory?: number | undefined;
    key?: string | undefined;
    weightOz?: number | undefined;
    lengthIn?: number | undefined;
    widthIn?: number | undefined;
    heightIn?: number | undefined;
}>;
export declare const cjSearchQuerySchema: z.ZodObject<{
    keyWord: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    size: z.ZodOptional<z.ZodNumber>;
    categoryId: z.ZodOptional<z.ZodString>;
    countryCode: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    keyWord?: string | undefined;
    page?: number | undefined;
    size?: number | undefined;
    categoryId?: string | undefined;
    countryCode?: string | undefined;
}, {
    keyWord?: string | undefined;
    page?: number | undefined;
    size?: number | undefined;
    categoryId?: string | undefined;
    countryCode?: string | undefined;
}>;
export declare const CJ_IMPORT_MAX_PIDS = 6;
export declare const cjImportProductsSchema: z.ZodObject<{
    pids: z.ZodArray<z.ZodString, "many">;
    categorySlug: z.ZodOptional<z.ZodString>;
    published: z.ZodOptional<z.ZodBoolean>;
    addToMyProduct: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    pids: string[];
    published?: boolean | undefined;
    categorySlug?: string | undefined;
    addToMyProduct?: boolean | undefined;
}, {
    pids: string[];
    published?: boolean | undefined;
    categorySlug?: string | undefined;
    addToMyProduct?: boolean | undefined;
}>;
export declare const cjImportHalloweenSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    size: z.ZodDefault<z.ZodNumber>;
    categorySlug: z.ZodOptional<z.ZodString>;
    published: z.ZodOptional<z.ZodBoolean>;
    addToMyProduct: z.ZodOptional<z.ZodBoolean>;
    keyWord: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    size: number;
    published?: boolean | undefined;
    categorySlug?: string | undefined;
    keyWord?: string | undefined;
    addToMyProduct?: boolean | undefined;
}, {
    published?: boolean | undefined;
    categorySlug?: string | undefined;
    keyWord?: string | undefined;
    page?: number | undefined;
    size?: number | undefined;
    addToMyProduct?: boolean | undefined;
}>;
export declare const cjSaveApiKeySchema: z.ZodObject<{
    apiKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    apiKey: string;
}, {
    apiKey: string;
}>;
export declare const cjFreightQuoteSchema: z.ZodObject<{
    startCountryCode: z.ZodDefault<z.ZodString>;
    endCountryCode: z.ZodString;
    zip: z.ZodOptional<z.ZodString>;
    products: z.ZodArray<z.ZodObject<{
        vid: z.ZodString;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        quantity: number;
        vid: string;
    }, {
        quantity: number;
        vid: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    startCountryCode: string;
    endCountryCode: string;
    products: {
        quantity: number;
        vid: string;
    }[];
    zip?: string | undefined;
}, {
    endCountryCode: string;
    products: {
        quantity: number;
        vid: string;
    }[];
    startCountryCode?: string | undefined;
    zip?: string | undefined;
}>;
export declare const cjFulfillOrderSchema: z.ZodObject<{
    orderId: z.ZodString;
    /** 1=page pay URL, 2=CJ wallet, 3=create only (default). */
    payType: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>]>>;
    logisticName: z.ZodOptional<z.ZodString>;
    fromCountryCode: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    orderId: string;
    payType?: 2 | 1 | 3 | undefined;
    logisticName?: string | undefined;
    fromCountryCode?: string | undefined;
}, {
    orderId: string;
    payType?: 2 | 1 | 3 | undefined;
    logisticName?: string | undefined;
    fromCountryCode?: string | undefined;
}>;
export type CjVariant = z.infer<typeof cjVariantSchema>;
export type CjSearchQuery = z.infer<typeof cjSearchQuerySchema>;
export type CjImportProductsInput = z.infer<typeof cjImportProductsSchema>;
export type CjImportHalloweenInput = z.infer<typeof cjImportHalloweenSchema>;
