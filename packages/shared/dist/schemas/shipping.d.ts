import { z } from "zod";
/** Halloween 2026 — matches storefront countdown. */
export declare const HALLOWEEN_FESTIVAL_DATE = "2026-10-31";
/** @deprecated Use HALLOWEEN_FESTIVAL_DATE */
export declare const RAKSHA_BANDHAN_FESTIVAL_DATE = "2026-10-31";
export declare const USPS_MAIL_CLASSES: {
    readonly GROUND_ADVANTAGE: "USPS_GROUND_ADVANTAGE";
    readonly PRIORITY_MAIL: "PRIORITY_MAIL";
    readonly PRIORITY_MAIL_EXPRESS: "PRIORITY_MAIL_EXPRESS";
    readonly FIRST_CLASS_PACKAGE_SERVICE: "FIRST-CLASS_PACKAGE_SERVICE";
};
export type MailClassKey = keyof typeof USPS_MAIL_CLASSES;
export declare const DEFAULT_ENABLED_SERVICES: Record<MailClassKey, boolean>;
export declare const addressSchema: z.ZodObject<{
    name: z.ZodString;
    line1: z.ZodString;
    line2: z.ZodOptional<z.ZodString>;
    city: z.ZodString;
    state: z.ZodString;
    postalCode: z.ZodString;
    country: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    country: string;
    city: string;
    line1: string;
    state: string;
    postalCode: string;
    email?: string | undefined;
    phone?: string | undefined;
    line2?: string | undefined;
}, {
    name: string;
    country: string;
    city: string;
    line1: string;
    state: string;
    postalCode: string;
    email?: string | undefined;
    phone?: string | undefined;
    line2?: string | undefined;
}>;
/** Origin may be incomplete until admin configures fulfillment address. */
export declare const originAddressSchema: z.ZodObject<{
    name: z.ZodDefault<z.ZodString>;
    line1: z.ZodDefault<z.ZodString>;
    line2: z.ZodOptional<z.ZodString>;
    city: z.ZodDefault<z.ZodString>;
    state: z.ZodDefault<z.ZodString>;
    postalCode: z.ZodDefault<z.ZodString>;
    country: z.ZodDefault<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    country: string;
    city: string;
    line1: string;
    state: string;
    postalCode: string;
    email?: string | undefined;
    phone?: string | undefined;
    line2?: string | undefined;
}, {
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    country?: string | undefined;
    city?: string | undefined;
    line1?: string | undefined;
    line2?: string | undefined;
    state?: string | undefined;
    postalCode?: string | undefined;
}>;
export declare const packageDetailsSchema: z.ZodObject<{
    weightOz: z.ZodNumber;
    lengthIn: z.ZodNumber;
    widthIn: z.ZodNumber;
    heightIn: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    weightOz: number;
    lengthIn: number;
    widthIn: number;
    heightIn: number;
}, {
    weightOz: number;
    lengthIn: number;
    widthIn: number;
    heightIn: number;
}>;
export declare const DEFAULT_PACKAGE: z.infer<typeof packageDetailsSchema>;
export declare const rateQuoteSchema: z.ZodObject<{
    rateId: z.ZodString;
    mailClass: z.ZodString;
    serviceName: z.ZodString;
    price: z.ZodNumber;
    currency: z.ZodDefault<z.ZodLiteral<"USD">>;
    estimatedDeliveryDate: z.ZodOptional<z.ZodString>;
    estimatedDeliveryDays: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    price: number;
    currency: "USD";
    rateId: string;
    mailClass: string;
    serviceName: string;
    estimatedDeliveryDays?: number | undefined;
    estimatedDeliveryDate?: string | undefined;
}, {
    price: number;
    rateId: string;
    mailClass: string;
    serviceName: string;
    currency?: "USD" | undefined;
    estimatedDeliveryDays?: number | undefined;
    estimatedDeliveryDate?: string | undefined;
}>;
export declare const labelResultSchema: z.ZodObject<{
    trackingNumber: z.ZodString;
    labelPdfUrl: z.ZodOptional<z.ZodString>;
    labelCost: z.ZodOptional<z.ZodNumber>;
    mailClass: z.ZodOptional<z.ZodString>;
    serviceName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    trackingNumber: string;
    labelCost?: number | undefined;
    labelPdfUrl?: string | undefined;
    mailClass?: string | undefined;
    serviceName?: string | undefined;
}, {
    trackingNumber: string;
    labelCost?: number | undefined;
    labelPdfUrl?: string | undefined;
    mailClass?: string | undefined;
    serviceName?: string | undefined;
}>;
export declare const trackingStatusSchema: z.ZodObject<{
    trackingNumber: z.ZodString;
    status: z.ZodString;
    statusDetail: z.ZodOptional<z.ZodString>;
    estimatedDeliveryDate: z.ZodOptional<z.ZodString>;
    events: z.ZodOptional<z.ZodArray<z.ZodObject<{
        date: z.ZodString;
        description: z.ZodString;
        location: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description: string;
        date: string;
        location?: string | undefined;
    }, {
        description: string;
        date: string;
        location?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    status: string;
    trackingNumber: string;
    events?: {
        description: string;
        date: string;
        location?: string | undefined;
    }[] | undefined;
    estimatedDeliveryDate?: string | undefined;
    statusDetail?: string | undefined;
}, {
    status: string;
    trackingNumber: string;
    events?: {
        description: string;
        date: string;
        location?: string | undefined;
    }[] | undefined;
    estimatedDeliveryDate?: string | undefined;
    statusDetail?: string | undefined;
}>;
export declare const addressValidationResultSchema: z.ZodObject<{
    valid: z.ZodBoolean;
    normalized: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        line1: z.ZodOptional<z.ZodString>;
        line2: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        email: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        country?: string | undefined;
        city?: string | undefined;
        line1?: string | undefined;
        line2?: string | undefined;
        state?: string | undefined;
        postalCode?: string | undefined;
    }, {
        name?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        country?: string | undefined;
        city?: string | undefined;
        line1?: string | undefined;
        line2?: string | undefined;
        state?: string | undefined;
        postalCode?: string | undefined;
    }>>;
    messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    valid: boolean;
    messages?: string[] | undefined;
    normalized?: {
        name?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        country?: string | undefined;
        city?: string | undefined;
        line1?: string | undefined;
        line2?: string | undefined;
        state?: string | undefined;
        postalCode?: string | undefined;
    } | undefined;
}, {
    valid: boolean;
    messages?: string[] | undefined;
    normalized?: {
        name?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        country?: string | undefined;
        city?: string | undefined;
        line1?: string | undefined;
        line2?: string | undefined;
        state?: string | undefined;
        postalCode?: string | undefined;
    } | undefined;
}>;
export declare const festivalModeRangeSchema: z.ZodObject<{
    name: z.ZodString;
    startDate: z.ZodString;
    endDate: z.ZodString;
    deliverByDate: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    startDate: string;
    endDate: string;
    deliverByDate: string;
}, {
    name: string;
    startDate: string;
    endDate: string;
    deliverByDate: string;
}>;
export declare const shippingSettingsSchema: z.ZodObject<{
    provider: z.ZodDefault<z.ZodEnum<["usps", "shippo"]>>;
    defaultRatePriority: z.ZodDefault<z.ZodEnum<["cheapest", "fastest_by_date"]>>;
    deliverByDate: z.ZodOptional<z.ZodString>;
    festivalModeRanges: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        startDate: z.ZodString;
        endDate: z.ZodString;
        deliverByDate: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        startDate: string;
        endDate: string;
        deliverByDate: string;
    }, {
        name: string;
        startDate: string;
        endDate: string;
        deliverByDate: string;
    }>, "many">>;
    enabledServices: z.ZodDefault<z.ZodObject<{
        GROUND_ADVANTAGE: z.ZodDefault<z.ZodBoolean>;
        PRIORITY_MAIL: z.ZodDefault<z.ZodBoolean>;
        PRIORITY_MAIL_EXPRESS: z.ZodDefault<z.ZodBoolean>;
        FIRST_CLASS_PACKAGE_SERVICE: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        PRIORITY_MAIL: boolean;
        PRIORITY_MAIL_EXPRESS: boolean;
        GROUND_ADVANTAGE: boolean;
        FIRST_CLASS_PACKAGE_SERVICE: boolean;
    }, {
        PRIORITY_MAIL?: boolean | undefined;
        PRIORITY_MAIL_EXPRESS?: boolean | undefined;
        GROUND_ADVANTAGE?: boolean | undefined;
        FIRST_CLASS_PACKAGE_SERVICE?: boolean | undefined;
    }>>;
    originAddress: z.ZodObject<{
        name: z.ZodDefault<z.ZodString>;
        line1: z.ZodDefault<z.ZodString>;
        line2: z.ZodOptional<z.ZodString>;
        city: z.ZodDefault<z.ZodString>;
        state: z.ZodDefault<z.ZodString>;
        postalCode: z.ZodDefault<z.ZodString>;
        country: z.ZodDefault<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        country: string;
        city: string;
        line1: string;
        state: string;
        postalCode: string;
        email?: string | undefined;
        phone?: string | undefined;
        line2?: string | undefined;
    }, {
        name?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        country?: string | undefined;
        city?: string | undefined;
        line1?: string | undefined;
        line2?: string | undefined;
        state?: string | undefined;
        postalCode?: string | undefined;
    }>;
    autoPurchaseOnPayment: z.ZodDefault<z.ZodBoolean>;
    flatRateFallbackUsd: z.ZodDefault<z.ZodNumber>;
    customerShippingMode: z.ZodDefault<z.ZodEnum<["free", "pass_through"]>>;
    uspsBaseUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    provider: "usps" | "shippo";
    defaultRatePriority: "cheapest" | "fastest_by_date";
    festivalModeRanges: {
        name: string;
        startDate: string;
        endDate: string;
        deliverByDate: string;
    }[];
    enabledServices: {
        PRIORITY_MAIL: boolean;
        PRIORITY_MAIL_EXPRESS: boolean;
        GROUND_ADVANTAGE: boolean;
        FIRST_CLASS_PACKAGE_SERVICE: boolean;
    };
    originAddress: {
        name: string;
        country: string;
        city: string;
        line1: string;
        state: string;
        postalCode: string;
        email?: string | undefined;
        phone?: string | undefined;
        line2?: string | undefined;
    };
    autoPurchaseOnPayment: boolean;
    flatRateFallbackUsd: number;
    customerShippingMode: "free" | "pass_through";
    deliverByDate?: string | undefined;
    uspsBaseUrl?: string | undefined;
}, {
    originAddress: {
        name?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        country?: string | undefined;
        city?: string | undefined;
        line1?: string | undefined;
        line2?: string | undefined;
        state?: string | undefined;
        postalCode?: string | undefined;
    };
    provider?: "usps" | "shippo" | undefined;
    deliverByDate?: string | undefined;
    defaultRatePriority?: "cheapest" | "fastest_by_date" | undefined;
    festivalModeRanges?: {
        name: string;
        startDate: string;
        endDate: string;
        deliverByDate: string;
    }[] | undefined;
    enabledServices?: {
        PRIORITY_MAIL?: boolean | undefined;
        PRIORITY_MAIL_EXPRESS?: boolean | undefined;
        GROUND_ADVANTAGE?: boolean | undefined;
        FIRST_CLASS_PACKAGE_SERVICE?: boolean | undefined;
    } | undefined;
    autoPurchaseOnPayment?: boolean | undefined;
    flatRateFallbackUsd?: number | undefined;
    customerShippingMode?: "free" | "pass_through" | undefined;
    uspsBaseUrl?: string | undefined;
}>;
export declare const defaultShippingSettings: ShippingSettings;
export type Address = z.infer<typeof addressSchema>;
export type PackageDetails = z.infer<typeof packageDetailsSchema>;
export type RateQuote = z.infer<typeof rateQuoteSchema>;
export type LabelResult = z.infer<typeof labelResultSchema>;
export type TrackingStatus = z.infer<typeof trackingStatusSchema>;
export type AddressValidationResult = z.infer<typeof addressValidationResultSchema>;
export type FestivalModeRange = z.infer<typeof festivalModeRangeSchema>;
export type ShippingSettings = z.infer<typeof shippingSettingsSchema>;
export interface PackageItemInput {
    weightOz?: number;
    lengthIn?: number;
    widthIn?: number;
    heightIn?: number;
    quantity: number;
}
export interface ProductShippingDims {
    weightOz?: number;
    lengthIn?: number;
    widthIn?: number;
    heightIn?: number;
}
/** Sum weights (× qty) and use max of each dimension as floor; fall back to DEFAULT_PACKAGE. */
export declare function estimatePackageFromItems(items: PackageItemInput[]): PackageDetails;
export declare function productHasShippingDims(product: ProductShippingDims): boolean;
/** Pick best rate: festival deliver-by → priority mode → enabled services filter. */
export declare function selectRate(quotes: RateQuote[], settings: ShippingSettings, now?: Date): RateQuote | undefined;
export declare function mailClassDisplayName(mailClass: string): string;
