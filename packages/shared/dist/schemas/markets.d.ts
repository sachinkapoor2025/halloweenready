import { z } from "zod";
/** ISO 3166-1 alpha-2. Europe is stored as real country codes, never a fake "EU" country. */
export declare const countryCodeSchema: z.ZodEffects<z.ZodString, string, string>;
export declare const MARKET_CURRENCIES: readonly ["USD", "GBP", "CAD", "AUD", "INR", "AED", "EUR"];
export type MarketCurrency = (typeof MARKET_CURRENCIES)[number];
export declare const CHECKOUT_CURRENCIES: readonly ["USD", "INR"];
export type CheckoutCurrency = (typeof CHECKOUT_CURRENCIES)[number];
export declare const warehouseServiceAreaSchema: z.ZodObject<{
    countryCodes: z.ZodDefault<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">>;
    /** Empty = all regions in the listed countries. */
    stateOrRegionCodes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    /** Empty = all postal codes. Prefix match (e.g. "SO" for Southampton). */
    postalPrefixes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    internationalShipping: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    countryCodes: string[];
    stateOrRegionCodes: string[];
    postalPrefixes: string[];
    internationalShipping: boolean;
}, {
    countryCodes?: string[] | undefined;
    stateOrRegionCodes?: string[] | undefined;
    postalPrefixes?: string[] | undefined;
    internationalShipping?: boolean | undefined;
}>;
export declare const warehouseSchema: z.ZodObject<{
    warehouseId: z.ZodString;
    warehouseCode: z.ZodString;
    name: z.ZodString;
    /** Null / omitted = company-owned warehouse. */
    vendorId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    addressLine1: z.ZodString;
    addressLine2: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    city: z.ZodString;
    stateOrRegion: z.ZodString;
    postalCode: z.ZodString;
    countryCode: z.ZodEffects<z.ZodString, string, string>;
    /** Display exactly as configured (may be a local national number). */
    phone: z.ZodString;
    /** Digits-only helper for dialers / WhatsApp. */
    phoneNormalized: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
    timezone: z.ZodDefault<z.ZodString>;
    active: z.ZodDefault<z.ZodBoolean>;
    fulfillmentEnabled: z.ZodDefault<z.ZodBoolean>;
    pickupEnabled: z.ZodDefault<z.ZodBoolean>;
    serviceArea: z.ZodDefault<z.ZodObject<{
        countryCodes: z.ZodDefault<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">>;
        /** Empty = all regions in the listed countries. */
        stateOrRegionCodes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        /** Empty = all postal codes. Prefix match (e.g. "SO" for Southampton). */
        postalPrefixes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        internationalShipping: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        countryCodes: string[];
        stateOrRegionCodes: string[];
        postalPrefixes: string[];
        internationalShipping: boolean;
    }, {
        countryCodes?: string[] | undefined;
        stateOrRegionCodes?: string[] | undefined;
        postalPrefixes?: string[] | undefined;
        internationalShipping?: boolean | undefined;
    }>>;
    priority: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    phone: string;
    warehouseId: string;
    countryCode: string;
    city: string;
    postalCode: string;
    timezone: string;
    warehouseCode: string;
    addressLine1: string;
    stateOrRegion: string;
    active: boolean;
    fulfillmentEnabled: boolean;
    pickupEnabled: boolean;
    serviceArea: {
        countryCodes: string[];
        stateOrRegionCodes: string[];
        postalPrefixes: string[];
        internationalShipping: boolean;
    };
    priority: number;
    email?: string | undefined;
    updatedAt?: string | undefined;
    vendorId?: string | null | undefined;
    createdAt?: string | undefined;
    addressLine2?: string | undefined;
    phoneNormalized?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
}, {
    name: string;
    phone: string;
    warehouseId: string;
    countryCode: string;
    city: string;
    postalCode: string;
    warehouseCode: string;
    addressLine1: string;
    stateOrRegion: string;
    email?: string | undefined;
    updatedAt?: string | undefined;
    vendorId?: string | null | undefined;
    createdAt?: string | undefined;
    timezone?: string | undefined;
    addressLine2?: string | undefined;
    phoneNormalized?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    active?: boolean | undefined;
    fulfillmentEnabled?: boolean | undefined;
    pickupEnabled?: boolean | undefined;
    serviceArea?: {
        countryCodes?: string[] | undefined;
        stateOrRegionCodes?: string[] | undefined;
        postalPrefixes?: string[] | undefined;
        internationalShipping?: boolean | undefined;
    } | undefined;
    priority?: number | undefined;
}>;
export declare const createWarehouseSchema: z.ZodObject<Omit<{
    warehouseId: z.ZodString;
    warehouseCode: z.ZodString;
    name: z.ZodString;
    /** Null / omitted = company-owned warehouse. */
    vendorId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    addressLine1: z.ZodString;
    addressLine2: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    city: z.ZodString;
    stateOrRegion: z.ZodString;
    postalCode: z.ZodString;
    countryCode: z.ZodEffects<z.ZodString, string, string>;
    /** Display exactly as configured (may be a local national number). */
    phone: z.ZodString;
    /** Digits-only helper for dialers / WhatsApp. */
    phoneNormalized: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
    timezone: z.ZodDefault<z.ZodString>;
    active: z.ZodDefault<z.ZodBoolean>;
    fulfillmentEnabled: z.ZodDefault<z.ZodBoolean>;
    pickupEnabled: z.ZodDefault<z.ZodBoolean>;
    serviceArea: z.ZodDefault<z.ZodObject<{
        countryCodes: z.ZodDefault<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">>;
        /** Empty = all regions in the listed countries. */
        stateOrRegionCodes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        /** Empty = all postal codes. Prefix match (e.g. "SO" for Southampton). */
        postalPrefixes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        internationalShipping: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        countryCodes: string[];
        stateOrRegionCodes: string[];
        postalPrefixes: string[];
        internationalShipping: boolean;
    }, {
        countryCodes?: string[] | undefined;
        stateOrRegionCodes?: string[] | undefined;
        postalPrefixes?: string[] | undefined;
        internationalShipping?: boolean | undefined;
    }>>;
    priority: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "updatedAt" | "warehouseId" | "createdAt">, "strip", z.ZodTypeAny, {
    name: string;
    phone: string;
    countryCode: string;
    city: string;
    postalCode: string;
    timezone: string;
    warehouseCode: string;
    addressLine1: string;
    stateOrRegion: string;
    active: boolean;
    fulfillmentEnabled: boolean;
    pickupEnabled: boolean;
    serviceArea: {
        countryCodes: string[];
        stateOrRegionCodes: string[];
        postalPrefixes: string[];
        internationalShipping: boolean;
    };
    priority: number;
    email?: string | undefined;
    vendorId?: string | null | undefined;
    addressLine2?: string | undefined;
    phoneNormalized?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
}, {
    name: string;
    phone: string;
    countryCode: string;
    city: string;
    postalCode: string;
    warehouseCode: string;
    addressLine1: string;
    stateOrRegion: string;
    email?: string | undefined;
    vendorId?: string | null | undefined;
    timezone?: string | undefined;
    addressLine2?: string | undefined;
    phoneNormalized?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    active?: boolean | undefined;
    fulfillmentEnabled?: boolean | undefined;
    pickupEnabled?: boolean | undefined;
    serviceArea?: {
        countryCodes?: string[] | undefined;
        stateOrRegionCodes?: string[] | undefined;
        postalPrefixes?: string[] | undefined;
        internationalShipping?: boolean | undefined;
    } | undefined;
    priority?: number | undefined;
}>;
export declare const updateWarehouseSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
    phone: z.ZodOptional<z.ZodString>;
    countryCode: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    city: z.ZodOptional<z.ZodString>;
    postalCode: z.ZodOptional<z.ZodString>;
    vendorId: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    timezone: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    warehouseCode: z.ZodOptional<z.ZodString>;
    addressLine1: z.ZodOptional<z.ZodString>;
    addressLine2: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
    stateOrRegion: z.ZodOptional<z.ZodString>;
    phoneNormalized: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
    latitude: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    longitude: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    active: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    fulfillmentEnabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    pickupEnabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    serviceArea: z.ZodOptional<z.ZodDefault<z.ZodObject<{
        countryCodes: z.ZodDefault<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">>;
        /** Empty = all regions in the listed countries. */
        stateOrRegionCodes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        /** Empty = all postal codes. Prefix match (e.g. "SO" for Southampton). */
        postalPrefixes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        internationalShipping: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        countryCodes: string[];
        stateOrRegionCodes: string[];
        postalPrefixes: string[];
        internationalShipping: boolean;
    }, {
        countryCodes?: string[] | undefined;
        stateOrRegionCodes?: string[] | undefined;
        postalPrefixes?: string[] | undefined;
        internationalShipping?: boolean | undefined;
    }>>>;
    priority: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    countryCode?: string | undefined;
    city?: string | undefined;
    postalCode?: string | undefined;
    vendorId?: string | null | undefined;
    timezone?: string | undefined;
    warehouseCode?: string | undefined;
    addressLine1?: string | undefined;
    addressLine2?: string | undefined;
    stateOrRegion?: string | undefined;
    phoneNormalized?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    active?: boolean | undefined;
    fulfillmentEnabled?: boolean | undefined;
    pickupEnabled?: boolean | undefined;
    serviceArea?: {
        countryCodes: string[];
        stateOrRegionCodes: string[];
        postalPrefixes: string[];
        internationalShipping: boolean;
    } | undefined;
    priority?: number | undefined;
}, {
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    countryCode?: string | undefined;
    city?: string | undefined;
    postalCode?: string | undefined;
    vendorId?: string | null | undefined;
    timezone?: string | undefined;
    warehouseCode?: string | undefined;
    addressLine1?: string | undefined;
    addressLine2?: string | undefined;
    stateOrRegion?: string | undefined;
    phoneNormalized?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    active?: boolean | undefined;
    fulfillmentEnabled?: boolean | undefined;
    pickupEnabled?: boolean | undefined;
    serviceArea?: {
        countryCodes?: string[] | undefined;
        stateOrRegionCodes?: string[] | undefined;
        postalPrefixes?: string[] | undefined;
        internationalShipping?: boolean | undefined;
    } | undefined;
    priority?: number | undefined;
}>;
export declare const vendorUserSchema: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    role: z.ZodDefault<z.ZodEnum<["vendor_admin", "vendor_staff"]>>;
    active: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    email: string;
    role: "vendor_admin" | "vendor_staff";
    active: boolean;
    name?: string | undefined;
}, {
    email: string;
    name?: string | undefined;
    role?: "vendor_admin" | "vendor_staff" | undefined;
    active?: boolean | undefined;
}>;
export declare const vendorSchema: z.ZodObject<{
    vendorId: z.ZodString;
    slug: z.ZodString;
    name: z.ZodString;
    countryCode: z.ZodEffects<z.ZodString, string, string>;
    companyOwned: z.ZodDefault<z.ZodBoolean>;
    active: z.ZodDefault<z.ZodBoolean>;
    warehouseIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    userEmails: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    users: z.ZodDefault<z.ZodArray<z.ZodObject<{
        email: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        role: z.ZodDefault<z.ZodEnum<["vendor_admin", "vendor_staff"]>>;
        active: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        role: "vendor_admin" | "vendor_staff";
        active: boolean;
        name?: string | undefined;
    }, {
        email: string;
        name?: string | undefined;
        role?: "vendor_admin" | "vendor_staff" | undefined;
        active?: boolean | undefined;
    }>, "many">>;
    contactEmail: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    contactPhone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    notes: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    /** Higher = preferred when multiple vendors can fulfill the same country. */
    priority: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    countryCode: string;
    vendorId: string;
    active: boolean;
    priority: number;
    companyOwned: boolean;
    warehouseIds: string[];
    userEmails: string[];
    users: {
        email: string;
        role: "vendor_admin" | "vendor_staff";
        active: boolean;
        name?: string | undefined;
    }[];
    updatedAt?: string | undefined;
    createdAt?: string | undefined;
    contactEmail?: string | undefined;
    contactPhone?: string | undefined;
    notes?: string | undefined;
}, {
    name: string;
    slug: string;
    countryCode: string;
    vendorId: string;
    updatedAt?: string | undefined;
    createdAt?: string | undefined;
    contactEmail?: string | undefined;
    active?: boolean | undefined;
    priority?: number | undefined;
    companyOwned?: boolean | undefined;
    warehouseIds?: string[] | undefined;
    userEmails?: string[] | undefined;
    users?: {
        email: string;
        name?: string | undefined;
        role?: "vendor_admin" | "vendor_staff" | undefined;
        active?: boolean | undefined;
    }[] | undefined;
    contactPhone?: string | undefined;
    notes?: string | undefined;
}>;
export declare const createVendorSchema: z.ZodObject<Omit<{
    vendorId: z.ZodString;
    slug: z.ZodString;
    name: z.ZodString;
    countryCode: z.ZodEffects<z.ZodString, string, string>;
    companyOwned: z.ZodDefault<z.ZodBoolean>;
    active: z.ZodDefault<z.ZodBoolean>;
    warehouseIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    userEmails: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    users: z.ZodDefault<z.ZodArray<z.ZodObject<{
        email: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        role: z.ZodDefault<z.ZodEnum<["vendor_admin", "vendor_staff"]>>;
        active: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        role: "vendor_admin" | "vendor_staff";
        active: boolean;
        name?: string | undefined;
    }, {
        email: string;
        name?: string | undefined;
        role?: "vendor_admin" | "vendor_staff" | undefined;
        active?: boolean | undefined;
    }>, "many">>;
    contactEmail: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    contactPhone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    notes: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    /** Higher = preferred when multiple vendors can fulfill the same country. */
    priority: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "updatedAt" | "vendorId" | "createdAt">, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    countryCode: string;
    active: boolean;
    priority: number;
    companyOwned: boolean;
    warehouseIds: string[];
    userEmails: string[];
    users: {
        email: string;
        role: "vendor_admin" | "vendor_staff";
        active: boolean;
        name?: string | undefined;
    }[];
    contactEmail?: string | undefined;
    contactPhone?: string | undefined;
    notes?: string | undefined;
}, {
    name: string;
    slug: string;
    countryCode: string;
    contactEmail?: string | undefined;
    active?: boolean | undefined;
    priority?: number | undefined;
    companyOwned?: boolean | undefined;
    warehouseIds?: string[] | undefined;
    userEmails?: string[] | undefined;
    users?: {
        email: string;
        name?: string | undefined;
        role?: "vendor_admin" | "vendor_staff" | undefined;
        active?: boolean | undefined;
    }[] | undefined;
    contactPhone?: string | undefined;
    notes?: string | undefined;
}>;
export declare const updateVendorSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    countryCode: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    contactEmail: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
    active: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    priority: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    companyOwned: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    warehouseIds: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    userEmails: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    users: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        email: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        role: z.ZodDefault<z.ZodEnum<["vendor_admin", "vendor_staff"]>>;
        active: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        role: "vendor_admin" | "vendor_staff";
        active: boolean;
        name?: string | undefined;
    }, {
        email: string;
        name?: string | undefined;
        role?: "vendor_admin" | "vendor_staff" | undefined;
        active?: boolean | undefined;
    }>, "many">>>;
    contactPhone: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
    notes: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    slug?: string | undefined;
    countryCode?: string | undefined;
    contactEmail?: string | undefined;
    active?: boolean | undefined;
    priority?: number | undefined;
    companyOwned?: boolean | undefined;
    warehouseIds?: string[] | undefined;
    userEmails?: string[] | undefined;
    users?: {
        email: string;
        role: "vendor_admin" | "vendor_staff";
        active: boolean;
        name?: string | undefined;
    }[] | undefined;
    contactPhone?: string | undefined;
    notes?: string | undefined;
}, {
    name?: string | undefined;
    slug?: string | undefined;
    countryCode?: string | undefined;
    contactEmail?: string | undefined;
    active?: boolean | undefined;
    priority?: number | undefined;
    companyOwned?: boolean | undefined;
    warehouseIds?: string[] | undefined;
    userEmails?: string[] | undefined;
    users?: {
        email: string;
        name?: string | undefined;
        role?: "vendor_admin" | "vendor_staff" | undefined;
        active?: boolean | undefined;
    }[] | undefined;
    contactPhone?: string | undefined;
    notes?: string | undefined;
}>;
export declare const marketContactSchema: z.ZodObject<{
    phone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    phoneNormalized: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    whatsapp: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    addressLine1: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    addressLine2: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    city: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    stateOrRegion: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    postalCode: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    countryCode: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    phone?: string | undefined;
    countryCode?: string | undefined;
    city?: string | undefined;
    postalCode?: string | undefined;
    addressLine1?: string | undefined;
    addressLine2?: string | undefined;
    stateOrRegion?: string | undefined;
    phoneNormalized?: string | undefined;
    whatsapp?: string | undefined;
}, {
    email?: string | undefined;
    phone?: string | undefined;
    countryCode?: string | undefined;
    city?: string | undefined;
    postalCode?: string | undefined;
    addressLine1?: string | undefined;
    addressLine2?: string | undefined;
    stateOrRegion?: string | undefined;
    phoneNormalized?: string | undefined;
    whatsapp?: string | undefined;
}>;
export declare const marketSchema: z.ZodObject<{
    countryCode: z.ZodEffects<z.ZodString, string, string>;
    name: z.ZodString;
    slug: z.ZodString;
    active: z.ZodDefault<z.ZodBoolean>;
    locale: z.ZodDefault<z.ZodString>;
    /** Display currency for this market (checkout may still be USD/INR). */
    currency: z.ZodDefault<z.ZodEnum<["USD", "GBP", "CAD", "AUD", "INR", "AED", "EUR"]>>;
    checkoutCurrency: z.ZodDefault<z.ZodEnum<["USD", "INR"]>>;
    flagEmoji: z.ZodDefault<z.ZodString>;
    postalLabel: z.ZodDefault<z.ZodString>;
    defaultWarehouseId: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    allowInternationalFallback: z.ZodDefault<z.ZodBoolean>;
    contact: z.ZodDefault<z.ZodObject<{
        phone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        phoneNormalized: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        whatsapp: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        addressLine1: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        addressLine2: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        city: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        stateOrRegion: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        postalCode: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        countryCode: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    }, "strip", z.ZodTypeAny, {
        email?: string | undefined;
        phone?: string | undefined;
        countryCode?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        addressLine1?: string | undefined;
        addressLine2?: string | undefined;
        stateOrRegion?: string | undefined;
        phoneNormalized?: string | undefined;
        whatsapp?: string | undefined;
    }, {
        email?: string | undefined;
        phone?: string | undefined;
        countryCode?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        addressLine1?: string | undefined;
        addressLine2?: string | undefined;
        stateOrRegion?: string | undefined;
        phoneNormalized?: string | undefined;
        whatsapp?: string | undefined;
    }>>;
    hreflang: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    currency: "USD" | "INR" | "GBP" | "CAD" | "AUD" | "AED" | "EUR";
    slug: string;
    countryCode: string;
    checkoutCurrency: "USD" | "INR";
    contact: {
        email?: string | undefined;
        phone?: string | undefined;
        countryCode?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        addressLine1?: string | undefined;
        addressLine2?: string | undefined;
        stateOrRegion?: string | undefined;
        phoneNormalized?: string | undefined;
        whatsapp?: string | undefined;
    };
    active: boolean;
    locale: string;
    flagEmoji: string;
    postalLabel: string;
    allowInternationalFallback: boolean;
    updatedAt?: string | undefined;
    createdAt?: string | undefined;
    defaultWarehouseId?: string | undefined;
    hreflang?: string | undefined;
}, {
    name: string;
    slug: string;
    countryCode: string;
    currency?: "USD" | "INR" | "GBP" | "CAD" | "AUD" | "AED" | "EUR" | undefined;
    updatedAt?: string | undefined;
    checkoutCurrency?: "USD" | "INR" | undefined;
    contact?: {
        email?: string | undefined;
        phone?: string | undefined;
        countryCode?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        addressLine1?: string | undefined;
        addressLine2?: string | undefined;
        stateOrRegion?: string | undefined;
        phoneNormalized?: string | undefined;
        whatsapp?: string | undefined;
    } | undefined;
    createdAt?: string | undefined;
    active?: boolean | undefined;
    locale?: string | undefined;
    flagEmoji?: string | undefined;
    postalLabel?: string | undefined;
    defaultWarehouseId?: string | undefined;
    allowInternationalFallback?: boolean | undefined;
    hreflang?: string | undefined;
}>;
export declare const createMarketSchema: z.ZodObject<Omit<{
    countryCode: z.ZodEffects<z.ZodString, string, string>;
    name: z.ZodString;
    slug: z.ZodString;
    active: z.ZodDefault<z.ZodBoolean>;
    locale: z.ZodDefault<z.ZodString>;
    /** Display currency for this market (checkout may still be USD/INR). */
    currency: z.ZodDefault<z.ZodEnum<["USD", "GBP", "CAD", "AUD", "INR", "AED", "EUR"]>>;
    checkoutCurrency: z.ZodDefault<z.ZodEnum<["USD", "INR"]>>;
    flagEmoji: z.ZodDefault<z.ZodString>;
    postalLabel: z.ZodDefault<z.ZodString>;
    defaultWarehouseId: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    allowInternationalFallback: z.ZodDefault<z.ZodBoolean>;
    contact: z.ZodDefault<z.ZodObject<{
        phone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        phoneNormalized: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        whatsapp: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        addressLine1: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        addressLine2: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        city: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        stateOrRegion: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        postalCode: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        countryCode: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    }, "strip", z.ZodTypeAny, {
        email?: string | undefined;
        phone?: string | undefined;
        countryCode?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        addressLine1?: string | undefined;
        addressLine2?: string | undefined;
        stateOrRegion?: string | undefined;
        phoneNormalized?: string | undefined;
        whatsapp?: string | undefined;
    }, {
        email?: string | undefined;
        phone?: string | undefined;
        countryCode?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        addressLine1?: string | undefined;
        addressLine2?: string | undefined;
        stateOrRegion?: string | undefined;
        phoneNormalized?: string | undefined;
        whatsapp?: string | undefined;
    }>>;
    hreflang: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "updatedAt" | "createdAt">, "strip", z.ZodTypeAny, {
    name: string;
    currency: "USD" | "INR" | "GBP" | "CAD" | "AUD" | "AED" | "EUR";
    slug: string;
    countryCode: string;
    checkoutCurrency: "USD" | "INR";
    contact: {
        email?: string | undefined;
        phone?: string | undefined;
        countryCode?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        addressLine1?: string | undefined;
        addressLine2?: string | undefined;
        stateOrRegion?: string | undefined;
        phoneNormalized?: string | undefined;
        whatsapp?: string | undefined;
    };
    active: boolean;
    locale: string;
    flagEmoji: string;
    postalLabel: string;
    allowInternationalFallback: boolean;
    defaultWarehouseId?: string | undefined;
    hreflang?: string | undefined;
}, {
    name: string;
    slug: string;
    countryCode: string;
    currency?: "USD" | "INR" | "GBP" | "CAD" | "AUD" | "AED" | "EUR" | undefined;
    checkoutCurrency?: "USD" | "INR" | undefined;
    contact?: {
        email?: string | undefined;
        phone?: string | undefined;
        countryCode?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        addressLine1?: string | undefined;
        addressLine2?: string | undefined;
        stateOrRegion?: string | undefined;
        phoneNormalized?: string | undefined;
        whatsapp?: string | undefined;
    } | undefined;
    active?: boolean | undefined;
    locale?: string | undefined;
    flagEmoji?: string | undefined;
    postalLabel?: string | undefined;
    defaultWarehouseId?: string | undefined;
    allowInternationalFallback?: boolean | undefined;
    hreflang?: string | undefined;
}>;
export declare const updateMarketSchema: z.ZodObject<Omit<{
    name: z.ZodOptional<z.ZodString>;
    currency: z.ZodOptional<z.ZodDefault<z.ZodEnum<["USD", "GBP", "CAD", "AUD", "INR", "AED", "EUR"]>>>;
    slug: z.ZodOptional<z.ZodString>;
    countryCode: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    checkoutCurrency: z.ZodOptional<z.ZodDefault<z.ZodEnum<["USD", "INR"]>>>;
    contact: z.ZodOptional<z.ZodDefault<z.ZodObject<{
        phone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        phoneNormalized: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        whatsapp: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        addressLine1: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        addressLine2: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        city: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        stateOrRegion: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        postalCode: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        countryCode: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    }, "strip", z.ZodTypeAny, {
        email?: string | undefined;
        phone?: string | undefined;
        countryCode?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        addressLine1?: string | undefined;
        addressLine2?: string | undefined;
        stateOrRegion?: string | undefined;
        phoneNormalized?: string | undefined;
        whatsapp?: string | undefined;
    }, {
        email?: string | undefined;
        phone?: string | undefined;
        countryCode?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        addressLine1?: string | undefined;
        addressLine2?: string | undefined;
        stateOrRegion?: string | undefined;
        phoneNormalized?: string | undefined;
        whatsapp?: string | undefined;
    }>>>;
    active: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    locale: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    flagEmoji: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    postalLabel: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    defaultWarehouseId: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
    allowInternationalFallback: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    hreflang: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "countryCode">, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    currency?: "USD" | "INR" | "GBP" | "CAD" | "AUD" | "AED" | "EUR" | undefined;
    slug?: string | undefined;
    checkoutCurrency?: "USD" | "INR" | undefined;
    contact?: {
        email?: string | undefined;
        phone?: string | undefined;
        countryCode?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        addressLine1?: string | undefined;
        addressLine2?: string | undefined;
        stateOrRegion?: string | undefined;
        phoneNormalized?: string | undefined;
        whatsapp?: string | undefined;
    } | undefined;
    active?: boolean | undefined;
    locale?: string | undefined;
    flagEmoji?: string | undefined;
    postalLabel?: string | undefined;
    defaultWarehouseId?: string | undefined;
    allowInternationalFallback?: boolean | undefined;
    hreflang?: string | undefined;
}, {
    name?: string | undefined;
    currency?: "USD" | "INR" | "GBP" | "CAD" | "AUD" | "AED" | "EUR" | undefined;
    slug?: string | undefined;
    checkoutCurrency?: "USD" | "INR" | undefined;
    contact?: {
        email?: string | undefined;
        phone?: string | undefined;
        countryCode?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        addressLine1?: string | undefined;
        addressLine2?: string | undefined;
        stateOrRegion?: string | undefined;
        phoneNormalized?: string | undefined;
        whatsapp?: string | undefined;
    } | undefined;
    active?: boolean | undefined;
    locale?: string | undefined;
    flagEmoji?: string | undefined;
    postalLabel?: string | undefined;
    defaultWarehouseId?: string | undefined;
    allowInternationalFallback?: boolean | undefined;
    hreflang?: string | undefined;
}>;
export declare const inventoryListingSchema: z.ZodObject<{
    listingId: z.ZodString;
    productSlug: z.ZodString;
    vendorId: z.ZodString;
    warehouseId: z.ZodString;
    countryCode: z.ZodEffects<z.ZodString, string, string>;
    sku: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    quantityAvailable: z.ZodDefault<z.ZodNumber>;
    quantityReserved: z.ZodDefault<z.ZodNumber>;
    reorderLevel: z.ZodDefault<z.ZodNumber>;
    sellingPriceOverride: z.ZodOptional<z.ZodNumber>;
    processingDays: z.ZodDefault<z.ZodNumber>;
    active: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    productSlug: string;
    warehouseId: string;
    countryCode: string;
    vendorId: string;
    active: boolean;
    listingId: string;
    quantityAvailable: number;
    quantityReserved: number;
    reorderLevel: number;
    processingDays: number;
    sku?: string | undefined;
    updatedAt?: string | undefined;
    createdAt?: string | undefined;
    sellingPriceOverride?: number | undefined;
}, {
    productSlug: string;
    warehouseId: string;
    countryCode: string;
    vendorId: string;
    listingId: string;
    sku?: string | undefined;
    updatedAt?: string | undefined;
    createdAt?: string | undefined;
    active?: boolean | undefined;
    quantityAvailable?: number | undefined;
    quantityReserved?: number | undefined;
    reorderLevel?: number | undefined;
    sellingPriceOverride?: number | undefined;
    processingDays?: number | undefined;
}>;
export declare const upsertInventoryListingSchema: z.ZodObject<Omit<{
    listingId: z.ZodString;
    productSlug: z.ZodString;
    vendorId: z.ZodString;
    warehouseId: z.ZodString;
    countryCode: z.ZodEffects<z.ZodString, string, string>;
    sku: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    quantityAvailable: z.ZodDefault<z.ZodNumber>;
    quantityReserved: z.ZodDefault<z.ZodNumber>;
    reorderLevel: z.ZodDefault<z.ZodNumber>;
    sellingPriceOverride: z.ZodOptional<z.ZodNumber>;
    processingDays: z.ZodDefault<z.ZodNumber>;
    active: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "updatedAt" | "createdAt" | "listingId">, "strip", z.ZodTypeAny, {
    productSlug: string;
    warehouseId: string;
    countryCode: string;
    vendorId: string;
    active: boolean;
    quantityAvailable: number;
    quantityReserved: number;
    reorderLevel: number;
    processingDays: number;
    sku?: string | undefined;
    sellingPriceOverride?: number | undefined;
}, {
    productSlug: string;
    warehouseId: string;
    countryCode: string;
    vendorId: string;
    sku?: string | undefined;
    active?: boolean | undefined;
    quantityAvailable?: number | undefined;
    quantityReserved?: number | undefined;
    reorderLevel?: number | undefined;
    sellingPriceOverride?: number | undefined;
    processingDays?: number | undefined;
}>;
export declare const serviceabilityRequestSchema: z.ZodObject<{
    countryCode: z.ZodEffects<z.ZodString, string, string>;
    postalCode: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    productSlug: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    countryCode: string;
    productSlug?: string | undefined;
    postalCode?: string | undefined;
}, {
    countryCode: string;
    productSlug?: string | undefined;
    postalCode?: string | undefined;
}>;
export declare const fulfillmentSplitSchema: z.ZodObject<{
    vendorId: z.ZodString;
    warehouseId: z.ZodString;
    productSlugs: z.ZodArray<z.ZodString, "many">;
    fulfillmentCountry: z.ZodEffects<z.ZodString, string, string>;
    routingReason: z.ZodString;
    estimatedDeliveryDays: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    warehouseId: string;
    fulfillmentCountry: string;
    routingReason: string;
    vendorId: string;
    productSlugs: string[];
    estimatedDeliveryDays?: number | undefined;
}, {
    warehouseId: string;
    fulfillmentCountry: string;
    routingReason: string;
    vendorId: string;
    productSlugs: string[];
    estimatedDeliveryDays?: number | undefined;
}>;
export declare const orderFulfillmentAssignmentSchema: z.ZodObject<{
    assignedVendorId: z.ZodOptional<z.ZodString>;
    assignedWarehouseId: z.ZodOptional<z.ZodString>;
    fulfillmentCountry: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    routingReason: z.ZodOptional<z.ZodString>;
    splits: z.ZodOptional<z.ZodArray<z.ZodObject<{
        vendorId: z.ZodString;
        warehouseId: z.ZodString;
        productSlugs: z.ZodArray<z.ZodString, "many">;
        fulfillmentCountry: z.ZodEffects<z.ZodString, string, string>;
        routingReason: z.ZodString;
        estimatedDeliveryDays: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        warehouseId: string;
        fulfillmentCountry: string;
        routingReason: string;
        vendorId: string;
        productSlugs: string[];
        estimatedDeliveryDays?: number | undefined;
    }, {
        warehouseId: string;
        fulfillmentCountry: string;
        routingReason: string;
        vendorId: string;
        productSlugs: string[];
        estimatedDeliveryDays?: number | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    assignedVendorId?: string | undefined;
    assignedWarehouseId?: string | undefined;
    fulfillmentCountry?: string | undefined;
    routingReason?: string | undefined;
    splits?: {
        warehouseId: string;
        fulfillmentCountry: string;
        routingReason: string;
        vendorId: string;
        productSlugs: string[];
        estimatedDeliveryDays?: number | undefined;
    }[] | undefined;
}, {
    assignedVendorId?: string | undefined;
    assignedWarehouseId?: string | undefined;
    fulfillmentCountry?: string | undefined;
    routingReason?: string | undefined;
    splits?: {
        warehouseId: string;
        fulfillmentCountry: string;
        routingReason: string;
        vendorId: string;
        productSlugs: string[];
        estimatedDeliveryDays?: number | undefined;
    }[] | undefined;
}>;
export declare const adminFulfillmentOverrideSchema: z.ZodObject<{
    assignedVendorId: z.ZodOptional<z.ZodString>;
    assignedWarehouseId: z.ZodOptional<z.ZodString>;
    routingReason: z.ZodOptional<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    note?: string | undefined;
    assignedVendorId?: string | undefined;
    assignedWarehouseId?: string | undefined;
    routingReason?: string | undefined;
}, {
    note?: string | undefined;
    assignedVendorId?: string | undefined;
    assignedWarehouseId?: string | undefined;
    routingReason?: string | undefined;
}>;
export declare const auditLogSchema: z.ZodObject<{
    auditId: z.ZodString;
    action: z.ZodString;
    actorEmail: z.ZodOptional<z.ZodString>;
    vendorId: z.ZodOptional<z.ZodString>;
    warehouseId: z.ZodOptional<z.ZodString>;
    orderId: z.ZodOptional<z.ZodString>;
    details: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    action: string;
    auditId: string;
    warehouseId?: string | undefined;
    orderId?: string | undefined;
    vendorId?: string | undefined;
    actorEmail?: string | undefined;
    details?: string | undefined;
}, {
    createdAt: string;
    action: string;
    auditId: string;
    warehouseId?: string | undefined;
    orderId?: string | undefined;
    vendorId?: string | undefined;
    actorEmail?: string | undefined;
    details?: string | undefined;
}>;
export type Warehouse = z.infer<typeof warehouseSchema>;
export type WarehouseServiceArea = z.infer<typeof warehouseServiceAreaSchema>;
export type VendorRecord = z.infer<typeof vendorSchema>;
export type VendorUser = z.infer<typeof vendorUserSchema>;
export type Market = z.infer<typeof marketSchema>;
export type MarketContact = z.infer<typeof marketContactSchema>;
export type InventoryListing = z.infer<typeof inventoryListingSchema>;
export type ServiceabilityRequest = z.infer<typeof serviceabilityRequestSchema>;
export type FulfillmentSplit = z.infer<typeof fulfillmentSplitSchema>;
export type OrderFulfillmentAssignment = z.infer<typeof orderFulfillmentAssignmentSchema>;
export type AdminFulfillmentOverride = z.infer<typeof adminFulfillmentOverrideSchema>;
export type AuditLogEntry = z.infer<typeof auditLogSchema>;
