import { z } from "zod";
export declare const productSchema: z.ZodObject<{
    slug: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    compareAtPrice: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodDefault<z.ZodEnum<["USD", "INR"]>>;
    categorySlug: z.ZodString;
    /**
     * Extra storefront categories (e.g. hamper also listed under single-rakhi / kids-rakhi).
     * Primary GSI remains categorySlug; list APIs merge these in.
     */
    additionalCategorySlugs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    images: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    sku: z.ZodOptional<z.ZodString>;
    inventory: z.ZodDefault<z.ZodNumber>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    /** Supplier / marketplace vendor key (e.g. orange-county). */
    vendorSlug: z.ZodOptional<z.ZodString>;
    /** Prefer this warehouse when present; fulfillment engine may still re-route. */
    warehouseId: z.ZodOptional<z.ZodString>;
    /**
     * When set, product is only offered in these ISO country codes.
     * Omitted = available in every active market (existing catalog stays global).
     */
    availableCountryCodes: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">>;
    /** Wholesale cost from vendor — never expose on public storefront APIs. */
    vendorCost: z.ZodOptional<z.ZodNumber>;
    /**
     * Public storefront flag: show dry-fruit / chocolate add-on picker.
     * Set by API after stripping vendorSlug (true for HalloweenReady, false for OC).
     */
    allowsAddons: z.ZodOptional<z.ZodBoolean>;
    /**
     * When true, coupons cannot discount this product (flash / fixed-price deals).
     * Also skips competitive storefront price cuts so the listed price stays exact.
     */
    couponExcluded: z.ZodOptional<z.ZodBoolean>;
    seoTitle: z.ZodOptional<z.ZodString>;
    seoDescription: z.ZodOptional<z.ZodString>;
    published: z.ZodDefault<z.ZodBoolean>;
    /** Set when low-stock email sent; cleared when restocked above threshold. */
    lowStockAlertSentAt: z.ZodOptional<z.ZodString>;
    /** Lifetime units sold (incremented when order is paid). */
    unitsSold: z.ZodOptional<z.ZodNumber>;
    /**
     * Denormalized star rating for Product JSON-LD / widgets.
     * Kept in sync when reviews are published under PRODUCT#slug / REVIEW#id.
     */
    ratingAggregate: z.ZodOptional<z.ZodObject<{
        ratingValue: z.ZodNumber;
        reviewCount: z.ZodNumber;
        bestRating: z.ZodDefault<z.ZodNumber>;
        worstRating: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        ratingValue: number;
        reviewCount: number;
        bestRating: number;
        worstRating: number;
    }, {
        ratingValue: number;
        reviewCount: number;
        bestRating?: number | undefined;
        worstRating?: number | undefined;
    }>>;
    /** Shipping weight in ounces (recommended for accurate USPS rates). */
    weightOz: z.ZodOptional<z.ZodNumber>;
    /** Package dimensions in inches (recommended for accurate USPS rates). */
    lengthIn: z.ZodOptional<z.ZodNumber>;
    widthIn: z.ZodOptional<z.ZodNumber>;
    heightIn: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    price: number;
    currency: "USD" | "INR";
    published: boolean;
    slug: string;
    description: string;
    categorySlug: string;
    images: string[];
    inventory: number;
    tags: string[];
    vendorSlug?: string | undefined;
    vendorCost?: number | undefined;
    sku?: string | undefined;
    couponExcluded?: boolean | undefined;
    compareAtPrice?: number | undefined;
    additionalCategorySlugs?: string[] | undefined;
    warehouseId?: string | undefined;
    availableCountryCodes?: string[] | undefined;
    allowsAddons?: boolean | undefined;
    seoTitle?: string | undefined;
    seoDescription?: string | undefined;
    lowStockAlertSentAt?: string | undefined;
    unitsSold?: number | undefined;
    ratingAggregate?: {
        ratingValue: number;
        reviewCount: number;
        bestRating: number;
        worstRating: number;
    } | undefined;
    weightOz?: number | undefined;
    lengthIn?: number | undefined;
    widthIn?: number | undefined;
    heightIn?: number | undefined;
}, {
    name: string;
    price: number;
    slug: string;
    description: string;
    categorySlug: string;
    currency?: "USD" | "INR" | undefined;
    vendorSlug?: string | undefined;
    vendorCost?: number | undefined;
    sku?: string | undefined;
    couponExcluded?: boolean | undefined;
    published?: boolean | undefined;
    compareAtPrice?: number | undefined;
    additionalCategorySlugs?: string[] | undefined;
    images?: string[] | undefined;
    inventory?: number | undefined;
    tags?: string[] | undefined;
    warehouseId?: string | undefined;
    availableCountryCodes?: string[] | undefined;
    allowsAddons?: boolean | undefined;
    seoTitle?: string | undefined;
    seoDescription?: string | undefined;
    lowStockAlertSentAt?: string | undefined;
    unitsSold?: number | undefined;
    ratingAggregate?: {
        ratingValue: number;
        reviewCount: number;
        bestRating?: number | undefined;
        worstRating?: number | undefined;
    } | undefined;
    weightOz?: number | undefined;
    lengthIn?: number | undefined;
    widthIn?: number | undefined;
    heightIn?: number | undefined;
}>;
export declare const createProductSchema: z.ZodObject<{
    price: z.ZodNumber;
    currency: z.ZodDefault<z.ZodEnum<["USD", "INR"]>>;
    vendorSlug: z.ZodOptional<z.ZodString>;
    vendorCost: z.ZodOptional<z.ZodNumber>;
    sku: z.ZodOptional<z.ZodString>;
    couponExcluded: z.ZodOptional<z.ZodBoolean>;
    published: z.ZodDefault<z.ZodBoolean>;
    description: z.ZodString;
    compareAtPrice: z.ZodOptional<z.ZodNumber>;
    categorySlug: z.ZodString;
    additionalCategorySlugs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    images: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    inventory: z.ZodDefault<z.ZodNumber>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    warehouseId: z.ZodOptional<z.ZodString>;
    availableCountryCodes: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">>;
    allowsAddons: z.ZodOptional<z.ZodBoolean>;
    seoTitle: z.ZodOptional<z.ZodString>;
    seoDescription: z.ZodOptional<z.ZodString>;
    lowStockAlertSentAt: z.ZodOptional<z.ZodString>;
    unitsSold: z.ZodOptional<z.ZodNumber>;
    ratingAggregate: z.ZodOptional<z.ZodObject<{
        ratingValue: z.ZodNumber;
        reviewCount: z.ZodNumber;
        bestRating: z.ZodDefault<z.ZodNumber>;
        worstRating: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        ratingValue: number;
        reviewCount: number;
        bestRating: number;
        worstRating: number;
    }, {
        ratingValue: number;
        reviewCount: number;
        bestRating?: number | undefined;
        worstRating?: number | undefined;
    }>>;
    weightOz: z.ZodOptional<z.ZodNumber>;
    lengthIn: z.ZodOptional<z.ZodNumber>;
    widthIn: z.ZodOptional<z.ZodNumber>;
    heightIn: z.ZodOptional<z.ZodNumber>;
} & {
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    price: number;
    currency: "USD" | "INR";
    published: boolean;
    description: string;
    categorySlug: string;
    images: string[];
    inventory: number;
    tags: string[];
    vendorSlug?: string | undefined;
    vendorCost?: number | undefined;
    sku?: string | undefined;
    couponExcluded?: boolean | undefined;
    compareAtPrice?: number | undefined;
    additionalCategorySlugs?: string[] | undefined;
    warehouseId?: string | undefined;
    availableCountryCodes?: string[] | undefined;
    allowsAddons?: boolean | undefined;
    seoTitle?: string | undefined;
    seoDescription?: string | undefined;
    lowStockAlertSentAt?: string | undefined;
    unitsSold?: number | undefined;
    ratingAggregate?: {
        ratingValue: number;
        reviewCount: number;
        bestRating: number;
        worstRating: number;
    } | undefined;
    weightOz?: number | undefined;
    lengthIn?: number | undefined;
    widthIn?: number | undefined;
    heightIn?: number | undefined;
}, {
    name: string;
    price: number;
    description: string;
    categorySlug: string;
    currency?: "USD" | "INR" | undefined;
    vendorSlug?: string | undefined;
    vendorCost?: number | undefined;
    sku?: string | undefined;
    couponExcluded?: boolean | undefined;
    published?: boolean | undefined;
    compareAtPrice?: number | undefined;
    additionalCategorySlugs?: string[] | undefined;
    images?: string[] | undefined;
    inventory?: number | undefined;
    tags?: string[] | undefined;
    warehouseId?: string | undefined;
    availableCountryCodes?: string[] | undefined;
    allowsAddons?: boolean | undefined;
    seoTitle?: string | undefined;
    seoDescription?: string | undefined;
    lowStockAlertSentAt?: string | undefined;
    unitsSold?: number | undefined;
    ratingAggregate?: {
        ratingValue: number;
        reviewCount: number;
        bestRating?: number | undefined;
        worstRating?: number | undefined;
    } | undefined;
    weightOz?: number | undefined;
    lengthIn?: number | undefined;
    widthIn?: number | undefined;
    heightIn?: number | undefined;
}>;
export declare const updateProductSchema: z.ZodObject<Omit<{
    slug: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    compareAtPrice: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    currency: z.ZodOptional<z.ZodDefault<z.ZodEnum<["USD", "INR"]>>>;
    categorySlug: z.ZodOptional<z.ZodString>;
    additionalCategorySlugs: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    images: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    sku: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    inventory: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    tags: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    vendorSlug: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    warehouseId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    availableCountryCodes: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">>>;
    vendorCost: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    allowsAddons: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    couponExcluded: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    seoTitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    seoDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    published: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    lowStockAlertSentAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    unitsSold: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    ratingAggregate: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        ratingValue: z.ZodNumber;
        reviewCount: z.ZodNumber;
        bestRating: z.ZodDefault<z.ZodNumber>;
        worstRating: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        ratingValue: number;
        reviewCount: number;
        bestRating: number;
        worstRating: number;
    }, {
        ratingValue: number;
        reviewCount: number;
        bestRating?: number | undefined;
        worstRating?: number | undefined;
    }>>>;
    weightOz: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    lengthIn: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    widthIn: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    heightIn: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "slug">, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    price?: number | undefined;
    currency?: "USD" | "INR" | undefined;
    vendorSlug?: string | undefined;
    vendorCost?: number | undefined;
    sku?: string | undefined;
    couponExcluded?: boolean | undefined;
    published?: boolean | undefined;
    description?: string | undefined;
    compareAtPrice?: number | undefined;
    categorySlug?: string | undefined;
    additionalCategorySlugs?: string[] | undefined;
    images?: string[] | undefined;
    inventory?: number | undefined;
    tags?: string[] | undefined;
    warehouseId?: string | undefined;
    availableCountryCodes?: string[] | undefined;
    allowsAddons?: boolean | undefined;
    seoTitle?: string | undefined;
    seoDescription?: string | undefined;
    lowStockAlertSentAt?: string | undefined;
    unitsSold?: number | undefined;
    ratingAggregate?: {
        ratingValue: number;
        reviewCount: number;
        bestRating: number;
        worstRating: number;
    } | undefined;
    weightOz?: number | undefined;
    lengthIn?: number | undefined;
    widthIn?: number | undefined;
    heightIn?: number | undefined;
}, {
    name?: string | undefined;
    price?: number | undefined;
    currency?: "USD" | "INR" | undefined;
    vendorSlug?: string | undefined;
    vendorCost?: number | undefined;
    sku?: string | undefined;
    couponExcluded?: boolean | undefined;
    published?: boolean | undefined;
    description?: string | undefined;
    compareAtPrice?: number | undefined;
    categorySlug?: string | undefined;
    additionalCategorySlugs?: string[] | undefined;
    images?: string[] | undefined;
    inventory?: number | undefined;
    tags?: string[] | undefined;
    warehouseId?: string | undefined;
    availableCountryCodes?: string[] | undefined;
    allowsAddons?: boolean | undefined;
    seoTitle?: string | undefined;
    seoDescription?: string | undefined;
    lowStockAlertSentAt?: string | undefined;
    unitsSold?: number | undefined;
    ratingAggregate?: {
        ratingValue: number;
        reviewCount: number;
        bestRating?: number | undefined;
        worstRating?: number | undefined;
    } | undefined;
    weightOz?: number | undefined;
    lengthIn?: number | undefined;
    widthIn?: number | undefined;
    heightIn?: number | undefined;
}>;
export declare const bulkProductRowSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodDefault<z.ZodString>;
    price: z.ZodNumber;
    compareAtPrice: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodDefault<z.ZodEnum<["USD", "INR"]>>;
    categorySlug: z.ZodString;
    sku: z.ZodOptional<z.ZodString>;
    inventory: z.ZodDefault<z.ZodNumber>;
    tags: z.ZodOptional<z.ZodString>;
    vendorSlug: z.ZodOptional<z.ZodString>;
    vendorCost: z.ZodOptional<z.ZodNumber>;
    seoTitle: z.ZodOptional<z.ZodString>;
    seoDescription: z.ZodOptional<z.ZodString>;
    published: z.ZodDefault<z.ZodBoolean>;
    weightOz: z.ZodOptional<z.ZodNumber>;
    lengthIn: z.ZodOptional<z.ZodNumber>;
    widthIn: z.ZodOptional<z.ZodNumber>;
    heightIn: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    price: number;
    currency: "USD" | "INR";
    published: boolean;
    description: string;
    categorySlug: string;
    inventory: number;
    vendorSlug?: string | undefined;
    vendorCost?: number | undefined;
    sku?: string | undefined;
    compareAtPrice?: number | undefined;
    tags?: string | undefined;
    seoTitle?: string | undefined;
    seoDescription?: string | undefined;
    weightOz?: number | undefined;
    lengthIn?: number | undefined;
    widthIn?: number | undefined;
    heightIn?: number | undefined;
}, {
    name: string;
    price: number;
    categorySlug: string;
    currency?: "USD" | "INR" | undefined;
    vendorSlug?: string | undefined;
    vendorCost?: number | undefined;
    sku?: string | undefined;
    published?: boolean | undefined;
    description?: string | undefined;
    compareAtPrice?: number | undefined;
    inventory?: number | undefined;
    tags?: string | undefined;
    seoTitle?: string | undefined;
    seoDescription?: string | undefined;
    weightOz?: number | undefined;
    lengthIn?: number | undefined;
    widthIn?: number | undefined;
    heightIn?: number | undefined;
}>;
export type Product = z.infer<typeof productSchema> & {
    createdAt: string;
    updatedAt: string;
};
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type BulkProductRow = z.infer<typeof bulkProductRowSchema>;
