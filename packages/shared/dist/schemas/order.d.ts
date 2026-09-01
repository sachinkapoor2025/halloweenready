import { z } from "zod";
/** International phone: 10–15 digits; allows +, spaces, dashes, parentheses. */
export declare function isValidShippingPhone(phone: string): boolean;
export declare const shippingAddressSchema: z.ZodObject<{
    name: z.ZodString;
    line1: z.ZodString;
    line2: z.ZodOptional<z.ZodString>;
    city: z.ZodString;
    state: z.ZodString;
    postalCode: z.ZodString;
    country: z.ZodString;
    phone: z.ZodEffects<z.ZodString, string, string>;
    email: z.ZodString;
    /** Buyer / sender name — shown on the shipping label. */
    senderName: z.ZodOptional<z.ZodString>;
    /** Personal note from sister — printed on the shipping label. */
    senderMessage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    line1: string;
    state: string;
    postalCode: string;
    line2?: string | undefined;
    senderName?: string | undefined;
    senderMessage?: string | undefined;
}, {
    name: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    line1: string;
    state: string;
    postalCode: string;
    line2?: string | undefined;
    senderName?: string | undefined;
    senderMessage?: string | undefined;
}>;
export declare const DEFAULT_SENDER_MESSAGE = "Happy Halloween! Please accept this package of spooky surprises from HalloweenReady.";
export declare const checkoutShippingAddressSchema: z.ZodObject<{
    name: z.ZodString;
    line1: z.ZodString;
    line2: z.ZodOptional<z.ZodString>;
    city: z.ZodString;
    state: z.ZodString;
    postalCode: z.ZodString;
    country: z.ZodString;
    phone: z.ZodEffects<z.ZodString, string, string>;
    email: z.ZodString;
} & {
    senderName: z.ZodString;
    senderMessage: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    line1: string;
    state: string;
    postalCode: string;
    senderName: string;
    senderMessage: string;
    line2?: string | undefined;
}, {
    name: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    line1: string;
    state: string;
    postalCode: string;
    senderName: string;
    senderMessage: string;
    line2?: string | undefined;
}>;
/** Line assignment for a checkout shipment (must partition the cart). */
export declare const checkoutShipmentItemSchema: z.ZodObject<{
    productSlug: z.ZodString;
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    quantity: number;
    productSlug: string;
}, {
    quantity: number;
    productSlug: string;
}>;
export declare const checkoutShipmentSchema: z.ZodObject<{
    shippingAddress: z.ZodObject<{
        name: z.ZodString;
        line1: z.ZodString;
        line2: z.ZodOptional<z.ZodString>;
        city: z.ZodString;
        state: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        phone: z.ZodEffects<z.ZodString, string, string>;
        email: z.ZodString;
    } & {
        senderName: z.ZodString;
        senderMessage: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
        phone: string;
        country: string;
        city: string;
        line1: string;
        state: string;
        postalCode: string;
        senderName: string;
        senderMessage: string;
        line2?: string | undefined;
    }, {
        name: string;
        email: string;
        phone: string;
        country: string;
        city: string;
        line1: string;
        state: string;
        postalCode: string;
        senderName: string;
        senderMessage: string;
        line2?: string | undefined;
    }>;
    items: z.ZodArray<z.ZodObject<{
        productSlug: z.ZodString;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        quantity: number;
        productSlug: string;
    }, {
        quantity: number;
        productSlug: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    items: {
        quantity: number;
        productSlug: string;
    }[];
    shippingAddress: {
        name: string;
        email: string;
        phone: string;
        country: string;
        city: string;
        line1: string;
        state: string;
        postalCode: string;
        senderName: string;
        senderMessage: string;
        line2?: string | undefined;
    };
}, {
    items: {
        quantity: number;
        productSlug: string;
    }[];
    shippingAddress: {
        name: string;
        email: string;
        phone: string;
        country: string;
        city: string;
        line1: string;
        state: string;
        postalCode: string;
        senderName: string;
        senderMessage: string;
        line2?: string | undefined;
    };
}>;
export declare const checkoutSchema: z.ZodObject<{
    shippingAddress: z.ZodObject<{
        name: z.ZodString;
        line1: z.ZodString;
        line2: z.ZodOptional<z.ZodString>;
        city: z.ZodString;
        state: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        phone: z.ZodEffects<z.ZodString, string, string>;
        email: z.ZodString;
    } & {
        senderName: z.ZodString;
        senderMessage: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
        phone: string;
        country: string;
        city: string;
        line1: string;
        state: string;
        postalCode: string;
        senderName: string;
        senderMessage: string;
        line2?: string | undefined;
    }, {
        name: string;
        email: string;
        phone: string;
        country: string;
        city: string;
        line1: string;
        state: string;
        postalCode: string;
        senderName: string;
        senderMessage: string;
        line2?: string | undefined;
    }>;
    /**
     * Optional multi-address split. When omitted, the whole cart ships to
     * `shippingAddress`. When present, must cover every cart line exactly once.
     */
    shipments: z.ZodOptional<z.ZodArray<z.ZodObject<{
        shippingAddress: z.ZodObject<{
            name: z.ZodString;
            line1: z.ZodString;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodString;
            state: z.ZodString;
            postalCode: z.ZodString;
            country: z.ZodString;
            phone: z.ZodEffects<z.ZodString, string, string>;
            email: z.ZodString;
        } & {
            senderName: z.ZodString;
            senderMessage: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            email: string;
            phone: string;
            country: string;
            city: string;
            line1: string;
            state: string;
            postalCode: string;
            senderName: string;
            senderMessage: string;
            line2?: string | undefined;
        }, {
            name: string;
            email: string;
            phone: string;
            country: string;
            city: string;
            line1: string;
            state: string;
            postalCode: string;
            senderName: string;
            senderMessage: string;
            line2?: string | undefined;
        }>;
        items: z.ZodArray<z.ZodObject<{
            productSlug: z.ZodString;
            quantity: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            quantity: number;
            productSlug: string;
        }, {
            quantity: number;
            productSlug: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        items: {
            quantity: number;
            productSlug: string;
        }[];
        shippingAddress: {
            name: string;
            email: string;
            phone: string;
            country: string;
            city: string;
            line1: string;
            state: string;
            postalCode: string;
            senderName: string;
            senderMessage: string;
            line2?: string | undefined;
        };
    }, {
        items: {
            quantity: number;
            productSlug: string;
        }[];
        shippingAddress: {
            name: string;
            email: string;
            phone: string;
            country: string;
            city: string;
            line1: string;
            state: string;
            postalCode: string;
            senderName: string;
            senderMessage: string;
            line2?: string | undefined;
        };
    }>, "many">>;
    paymentMethod: z.ZodEnum<["stripe", "razorpay"]>;
    /** Customer-selected display/checkout currency (from currency switcher). */
    checkoutCurrency: z.ZodOptional<z.ZodEnum<["USD", "INR"]>>;
    /** Live USD→INR rate shown to the customer (optional; server validates). */
    usdInrRate: z.ZodOptional<z.ZodNumber>;
    /** Welcome or promo coupon (e.g. HALLOWEEN-ABC123). */
    couponCode: z.ZodOptional<z.ZodString>;
    /** Customer-requested delivery date (YYYY-MM-DD), max 2026-08-28. */
    preferredDeliveryDate: z.ZodOptional<z.ZodString>;
    /** Customer override — must match a returned rate. */
    shippingServiceCode: z.ZodOptional<z.ZodString>;
    shippingRateId: z.ZodOptional<z.ZodString>;
    /** First/last-touch marketing attribution snapshot from the browser. */
    attribution: z.ZodOptional<z.ZodObject<Omit<{
        version: z.ZodOptional<z.ZodLiteral<1>>;
        visitorId: z.ZodOptional<z.ZodString>;
        sessionId: z.ZodOptional<z.ZodString>;
        firstTouch: z.ZodOptional<z.ZodObject<{
            source: z.ZodString;
            medium: z.ZodString;
            campaign: z.ZodOptional<z.ZodString>;
            term: z.ZodOptional<z.ZodString>;
            content: z.ZodOptional<z.ZodString>;
            referrer: z.ZodOptional<z.ZodString>;
            referrerDomain: z.ZodOptional<z.ZodString>;
            landingPage: z.ZodOptional<z.ZodString>;
            entryUrl: z.ZodOptional<z.ZodString>;
            clickIds: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            channel: z.ZodOptional<z.ZodEnum<["paid_search", "organic_search", "paid_social", "organic_social", "referral", "email", "direct", "unknown"]>>;
            confidence: z.ZodEnum<["high", "medium", "low", "unknown"]>;
            confidenceReason: z.ZodOptional<z.ZodString>;
            at: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }, {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }>>;
        lastTouch: z.ZodOptional<z.ZodObject<{
            source: z.ZodString;
            medium: z.ZodString;
            campaign: z.ZodOptional<z.ZodString>;
            term: z.ZodOptional<z.ZodString>;
            content: z.ZodOptional<z.ZodString>;
            referrer: z.ZodOptional<z.ZodString>;
            referrerDomain: z.ZodOptional<z.ZodString>;
            landingPage: z.ZodOptional<z.ZodString>;
            entryUrl: z.ZodOptional<z.ZodString>;
            clickIds: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            channel: z.ZodOptional<z.ZodEnum<["paid_search", "organic_search", "paid_social", "organic_social", "referral", "email", "direct", "unknown"]>>;
            confidence: z.ZodEnum<["high", "medium", "low", "unknown"]>;
            confidenceReason: z.ZodOptional<z.ZodString>;
            at: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }, {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }>>;
        conversionTouch: z.ZodOptional<z.ZodObject<{
            source: z.ZodString;
            medium: z.ZodString;
            campaign: z.ZodOptional<z.ZodString>;
            term: z.ZodOptional<z.ZodString>;
            content: z.ZodOptional<z.ZodString>;
            referrer: z.ZodOptional<z.ZodString>;
            referrerDomain: z.ZodOptional<z.ZodString>;
            landingPage: z.ZodOptional<z.ZodString>;
            entryUrl: z.ZodOptional<z.ZodString>;
            clickIds: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            channel: z.ZodOptional<z.ZodEnum<["paid_search", "organic_search", "paid_social", "organic_social", "referral", "email", "direct", "unknown"]>>;
            confidence: z.ZodEnum<["high", "medium", "low", "unknown"]>;
            confidenceReason: z.ZodOptional<z.ZodString>;
            at: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }, {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }>>;
        assistedTouches: z.ZodOptional<z.ZodArray<z.ZodObject<{
            source: z.ZodString;
            medium: z.ZodString;
            campaign: z.ZodOptional<z.ZodString>;
            term: z.ZodOptional<z.ZodString>;
            content: z.ZodOptional<z.ZodString>;
            referrer: z.ZodOptional<z.ZodString>;
            referrerDomain: z.ZodOptional<z.ZodString>;
            landingPage: z.ZodOptional<z.ZodString>;
            entryUrl: z.ZodOptional<z.ZodString>;
            clickIds: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            channel: z.ZodOptional<z.ZodEnum<["paid_search", "organic_search", "paid_social", "organic_social", "referral", "email", "direct", "unknown"]>>;
            confidence: z.ZodEnum<["high", "medium", "low", "unknown"]>;
            confidenceReason: z.ZodOptional<z.ZodString>;
            at: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }, {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }>, "many">>;
        landingPage: z.ZodOptional<z.ZodString>;
        checkoutUrl: z.ZodOptional<z.ZodString>;
        conversionPage: z.ZodOptional<z.ZodString>;
        deviceType: z.ZodOptional<z.ZodString>;
        browser: z.ZodOptional<z.ZodString>;
        os: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        region: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        isNewCustomer: z.ZodOptional<z.ZodBoolean>;
        sessionsBeforePurchase: z.ZodOptional<z.ZodNumber>;
        pagesViewed: z.ZodOptional<z.ZodNumber>;
        firstVisitAt: z.ZodOptional<z.ZodString>;
        lastVisitAt: z.ZodOptional<z.ZodString>;
        timeToPurchaseMs: z.ZodOptional<z.ZodNumber>;
    }, "version"> & {
        version: z.ZodOptional<z.ZodLiteral<1>>;
    }, "strip", z.ZodTypeAny, {
        landingPage?: string | undefined;
        version?: 1 | undefined;
        visitorId?: string | undefined;
        sessionId?: string | undefined;
        firstTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        lastTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        conversionTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        assistedTouches?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }[] | undefined;
        checkoutUrl?: string | undefined;
        conversionPage?: string | undefined;
        deviceType?: string | undefined;
        browser?: string | undefined;
        os?: string | undefined;
        country?: string | undefined;
        region?: string | undefined;
        city?: string | undefined;
        isNewCustomer?: boolean | undefined;
        sessionsBeforePurchase?: number | undefined;
        pagesViewed?: number | undefined;
        firstVisitAt?: string | undefined;
        lastVisitAt?: string | undefined;
        timeToPurchaseMs?: number | undefined;
    }, {
        landingPage?: string | undefined;
        version?: 1 | undefined;
        visitorId?: string | undefined;
        sessionId?: string | undefined;
        firstTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        lastTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        conversionTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        assistedTouches?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }[] | undefined;
        checkoutUrl?: string | undefined;
        conversionPage?: string | undefined;
        deviceType?: string | undefined;
        browser?: string | undefined;
        os?: string | undefined;
        country?: string | undefined;
        region?: string | undefined;
        city?: string | undefined;
        isNewCustomer?: boolean | undefined;
        sessionsBeforePurchase?: number | undefined;
        pagesViewed?: number | undefined;
        firstVisitAt?: string | undefined;
        lastVisitAt?: string | undefined;
        timeToPurchaseMs?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    shippingAddress: {
        name: string;
        email: string;
        phone: string;
        country: string;
        city: string;
        line1: string;
        state: string;
        postalCode: string;
        senderName: string;
        senderMessage: string;
        line2?: string | undefined;
    };
    paymentMethod: "stripe" | "razorpay";
    shipments?: {
        items: {
            quantity: number;
            productSlug: string;
        }[];
        shippingAddress: {
            name: string;
            email: string;
            phone: string;
            country: string;
            city: string;
            line1: string;
            state: string;
            postalCode: string;
            senderName: string;
            senderMessage: string;
            line2?: string | undefined;
        };
    }[] | undefined;
    checkoutCurrency?: "USD" | "INR" | undefined;
    usdInrRate?: number | undefined;
    couponCode?: string | undefined;
    preferredDeliveryDate?: string | undefined;
    shippingServiceCode?: string | undefined;
    shippingRateId?: string | undefined;
    attribution?: {
        landingPage?: string | undefined;
        version?: 1 | undefined;
        visitorId?: string | undefined;
        sessionId?: string | undefined;
        firstTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        lastTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        conversionTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        assistedTouches?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }[] | undefined;
        checkoutUrl?: string | undefined;
        conversionPage?: string | undefined;
        deviceType?: string | undefined;
        browser?: string | undefined;
        os?: string | undefined;
        country?: string | undefined;
        region?: string | undefined;
        city?: string | undefined;
        isNewCustomer?: boolean | undefined;
        sessionsBeforePurchase?: number | undefined;
        pagesViewed?: number | undefined;
        firstVisitAt?: string | undefined;
        lastVisitAt?: string | undefined;
        timeToPurchaseMs?: number | undefined;
    } | undefined;
}, {
    shippingAddress: {
        name: string;
        email: string;
        phone: string;
        country: string;
        city: string;
        line1: string;
        state: string;
        postalCode: string;
        senderName: string;
        senderMessage: string;
        line2?: string | undefined;
    };
    paymentMethod: "stripe" | "razorpay";
    shipments?: {
        items: {
            quantity: number;
            productSlug: string;
        }[];
        shippingAddress: {
            name: string;
            email: string;
            phone: string;
            country: string;
            city: string;
            line1: string;
            state: string;
            postalCode: string;
            senderName: string;
            senderMessage: string;
            line2?: string | undefined;
        };
    }[] | undefined;
    checkoutCurrency?: "USD" | "INR" | undefined;
    usdInrRate?: number | undefined;
    couponCode?: string | undefined;
    preferredDeliveryDate?: string | undefined;
    shippingServiceCode?: string | undefined;
    shippingRateId?: string | undefined;
    attribution?: {
        landingPage?: string | undefined;
        version?: 1 | undefined;
        visitorId?: string | undefined;
        sessionId?: string | undefined;
        firstTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        lastTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        conversionTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        assistedTouches?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }[] | undefined;
        checkoutUrl?: string | undefined;
        conversionPage?: string | undefined;
        deviceType?: string | undefined;
        browser?: string | undefined;
        os?: string | undefined;
        country?: string | undefined;
        region?: string | undefined;
        city?: string | undefined;
        isNewCustomer?: boolean | undefined;
        sessionsBeforePurchase?: number | undefined;
        pagesViewed?: number | undefined;
        firstVisitAt?: string | undefined;
        lastVisitAt?: string | undefined;
        timeToPurchaseMs?: number | undefined;
    } | undefined;
}>;
/** Persisted per-delivery package on an order. */
export declare const orderShipmentSchema: z.ZodObject<{
    shipmentId: z.ZodString;
    shippingAddress: z.ZodObject<{
        name: z.ZodString;
        line1: z.ZodString;
        line2: z.ZodOptional<z.ZodString>;
        city: z.ZodString;
        state: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        phone: z.ZodEffects<z.ZodString, string, string>;
        email: z.ZodString;
        /** Buyer / sender name — shown on the shipping label. */
        senderName: z.ZodOptional<z.ZodString>;
        /** Personal note from sister — printed on the shipping label. */
        senderMessage: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
        phone: string;
        country: string;
        city: string;
        line1: string;
        state: string;
        postalCode: string;
        line2?: string | undefined;
        senderName?: string | undefined;
        senderMessage?: string | undefined;
    }, {
        name: string;
        email: string;
        phone: string;
        country: string;
        city: string;
        line1: string;
        state: string;
        postalCode: string;
        line2?: string | undefined;
        senderName?: string | undefined;
        senderMessage?: string | undefined;
    }>;
    items: z.ZodArray<z.ZodObject<{
        lineId: z.ZodOptional<z.ZodString>;
        productSlug: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        price: z.ZodNumber;
        currency: z.ZodEnum<["USD", "INR"]>;
        quantity: z.ZodNumber;
        image: z.ZodOptional<z.ZodString>;
        vendorSlug: z.ZodOptional<z.ZodString>;
        vendorCost: z.ZodOptional<z.ZodNumber>;
        sku: z.ZodOptional<z.ZodString>;
        cjPid: z.ZodOptional<z.ZodString>;
        cjVid: z.ZodOptional<z.ZodString>;
        variantKey: z.ZodOptional<z.ZodString>;
        couponExcluded: z.ZodOptional<z.ZodBoolean>;
        addons: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
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
    }>, "many">;
    subtotal: z.ZodNumber;
    shipping: z.ZodDefault<z.ZodNumber>;
    trackingNumber: z.ZodOptional<z.ZodString>;
    carrier: z.ZodOptional<z.ZodString>;
    shippingServiceCode: z.ZodOptional<z.ZodString>;
    shippingServiceName: z.ZodOptional<z.ZodString>;
    shippingRateId: z.ZodOptional<z.ZodString>;
    estimatedLabelCost: z.ZodOptional<z.ZodNumber>;
    labelCost: z.ZodOptional<z.ZodNumber>;
    labelPdfUrl: z.ZodOptional<z.ZodString>;
    labelStatus: z.ZodOptional<z.ZodEnum<["none", "queued", "purchased", "failed"]>>;
    labelError: z.ZodOptional<z.ZodString>;
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
    shippingAddress: {
        name: string;
        email: string;
        phone: string;
        country: string;
        city: string;
        line1: string;
        state: string;
        postalCode: string;
        line2?: string | undefined;
        senderName?: string | undefined;
        senderMessage?: string | undefined;
    };
    shipmentId: string;
    subtotal: number;
    shipping: number;
    shippingServiceCode?: string | undefined;
    shippingRateId?: string | undefined;
    trackingNumber?: string | undefined;
    carrier?: string | undefined;
    shippingServiceName?: string | undefined;
    estimatedLabelCost?: number | undefined;
    labelCost?: number | undefined;
    labelPdfUrl?: string | undefined;
    labelStatus?: "none" | "queued" | "purchased" | "failed" | undefined;
    labelError?: string | undefined;
}, {
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
            quantity?: number | undefined;
        }[] | undefined;
    }[];
    shippingAddress: {
        name: string;
        email: string;
        phone: string;
        country: string;
        city: string;
        line1: string;
        state: string;
        postalCode: string;
        line2?: string | undefined;
        senderName?: string | undefined;
        senderMessage?: string | undefined;
    };
    shipmentId: string;
    subtotal: number;
    shippingServiceCode?: string | undefined;
    shippingRateId?: string | undefined;
    shipping?: number | undefined;
    trackingNumber?: string | undefined;
    carrier?: string | undefined;
    shippingServiceName?: string | undefined;
    estimatedLabelCost?: number | undefined;
    labelCost?: number | undefined;
    labelPdfUrl?: string | undefined;
    labelStatus?: "none" | "queued" | "purchased" | "failed" | undefined;
    labelError?: string | undefined;
}>;
export declare const orderStatusHistoryEntrySchema: z.ZodObject<{
    status: z.ZodEnum<["pending_payment", "paid", "accepted", "on_hold", "processing", "shipped", "delivered", "complete", "cancelled", "refunded"]>;
    at: z.ZodString;
    note: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    at: string;
    status: "pending_payment" | "paid" | "accepted" | "on_hold" | "processing" | "shipped" | "delivered" | "complete" | "cancelled" | "refunded";
    note?: string | undefined;
}, {
    at: string;
    status: "pending_payment" | "paid" | "accepted" | "on_hold" | "processing" | "shipped" | "delivered" | "complete" | "cancelled" | "refunded";
    note?: string | undefined;
}>;
export declare const orderSchema: z.ZodObject<{
    orderId: z.ZodString;
    /**
     * Human-readable order number for staff, customers, and vendors.
     * Orange County fulfill orders: OC10001…
     * All other HalloweenReady orders: US10001…
     */
    orderNumber: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        lineId: z.ZodOptional<z.ZodString>;
        productSlug: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        price: z.ZodNumber;
        currency: z.ZodEnum<["USD", "INR"]>;
        quantity: z.ZodNumber;
        image: z.ZodOptional<z.ZodString>;
        vendorSlug: z.ZodOptional<z.ZodString>;
        vendorCost: z.ZodOptional<z.ZodNumber>;
        sku: z.ZodOptional<z.ZodString>;
        cjPid: z.ZodOptional<z.ZodString>;
        cjVid: z.ZodOptional<z.ZodString>;
        variantKey: z.ZodOptional<z.ZodString>;
        couponExcluded: z.ZodOptional<z.ZodBoolean>;
        addons: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
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
    }>, "many">;
    subtotal: z.ZodNumber;
    discount: z.ZodDefault<z.ZodNumber>;
    couponCode: z.ZodOptional<z.ZodString>;
    shipping: z.ZodDefault<z.ZodNumber>;
    tax: z.ZodDefault<z.ZodNumber>;
    total: z.ZodNumber;
    currency: z.ZodEnum<["USD", "INR"]>;
    /** Distinct vendorSlug values present on line items (for vendor order APIs). */
    vendorSlugs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    status: z.ZodEnum<["pending_payment", "paid", "accepted", "on_hold", "processing", "shipped", "delivered", "complete", "cancelled", "refunded"]>;
    statusHistory: z.ZodOptional<z.ZodArray<z.ZodObject<{
        status: z.ZodEnum<["pending_payment", "paid", "accepted", "on_hold", "processing", "shipped", "delivered", "complete", "cancelled", "refunded"]>;
        at: z.ZodString;
        note: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        at: string;
        status: "pending_payment" | "paid" | "accepted" | "on_hold" | "processing" | "shipped" | "delivered" | "complete" | "cancelled" | "refunded";
        note?: string | undefined;
    }, {
        at: string;
        status: "pending_payment" | "paid" | "accepted" | "on_hold" | "processing" | "shipped" | "delivered" | "complete" | "cancelled" | "refunded";
        note?: string | undefined;
    }>, "many">>;
    /** Primary / first delivery address (always set; mirrors shipments[0] when multi). */
    shippingAddress: z.ZodObject<{
        name: z.ZodString;
        line1: z.ZodString;
        line2: z.ZodOptional<z.ZodString>;
        city: z.ZodString;
        state: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        phone: z.ZodEffects<z.ZodString, string, string>;
        email: z.ZodString;
        /** Buyer / sender name — shown on the shipping label. */
        senderName: z.ZodOptional<z.ZodString>;
        /** Personal note from sister — printed on the shipping label. */
        senderMessage: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
        phone: string;
        country: string;
        city: string;
        line1: string;
        state: string;
        postalCode: string;
        line2?: string | undefined;
        senderName?: string | undefined;
        senderMessage?: string | undefined;
    }, {
        name: string;
        email: string;
        phone: string;
        country: string;
        city: string;
        line1: string;
        state: string;
        postalCode: string;
        line2?: string | undefined;
        senderName?: string | undefined;
        senderMessage?: string | undefined;
    }>;
    /** Multi-address deliveries. Omitted on older single-address orders. */
    shipments: z.ZodOptional<z.ZodArray<z.ZodObject<{
        shipmentId: z.ZodString;
        shippingAddress: z.ZodObject<{
            name: z.ZodString;
            line1: z.ZodString;
            line2: z.ZodOptional<z.ZodString>;
            city: z.ZodString;
            state: z.ZodString;
            postalCode: z.ZodString;
            country: z.ZodString;
            phone: z.ZodEffects<z.ZodString, string, string>;
            email: z.ZodString;
            /** Buyer / sender name — shown on the shipping label. */
            senderName: z.ZodOptional<z.ZodString>;
            /** Personal note from sister — printed on the shipping label. */
            senderMessage: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            email: string;
            phone: string;
            country: string;
            city: string;
            line1: string;
            state: string;
            postalCode: string;
            line2?: string | undefined;
            senderName?: string | undefined;
            senderMessage?: string | undefined;
        }, {
            name: string;
            email: string;
            phone: string;
            country: string;
            city: string;
            line1: string;
            state: string;
            postalCode: string;
            line2?: string | undefined;
            senderName?: string | undefined;
            senderMessage?: string | undefined;
        }>;
        items: z.ZodArray<z.ZodObject<{
            lineId: z.ZodOptional<z.ZodString>;
            productSlug: z.ZodString;
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            price: z.ZodNumber;
            currency: z.ZodEnum<["USD", "INR"]>;
            quantity: z.ZodNumber;
            image: z.ZodOptional<z.ZodString>;
            vendorSlug: z.ZodOptional<z.ZodString>;
            vendorCost: z.ZodOptional<z.ZodNumber>;
            sku: z.ZodOptional<z.ZodString>;
            cjPid: z.ZodOptional<z.ZodString>;
            cjVid: z.ZodOptional<z.ZodString>;
            variantKey: z.ZodOptional<z.ZodString>;
            couponExcluded: z.ZodOptional<z.ZodBoolean>;
            addons: z.ZodOptional<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
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
        }>, "many">;
        subtotal: z.ZodNumber;
        shipping: z.ZodDefault<z.ZodNumber>;
        trackingNumber: z.ZodOptional<z.ZodString>;
        carrier: z.ZodOptional<z.ZodString>;
        shippingServiceCode: z.ZodOptional<z.ZodString>;
        shippingServiceName: z.ZodOptional<z.ZodString>;
        shippingRateId: z.ZodOptional<z.ZodString>;
        estimatedLabelCost: z.ZodOptional<z.ZodNumber>;
        labelCost: z.ZodOptional<z.ZodNumber>;
        labelPdfUrl: z.ZodOptional<z.ZodString>;
        labelStatus: z.ZodOptional<z.ZodEnum<["none", "queued", "purchased", "failed"]>>;
        labelError: z.ZodOptional<z.ZodString>;
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
        shippingAddress: {
            name: string;
            email: string;
            phone: string;
            country: string;
            city: string;
            line1: string;
            state: string;
            postalCode: string;
            line2?: string | undefined;
            senderName?: string | undefined;
            senderMessage?: string | undefined;
        };
        shipmentId: string;
        subtotal: number;
        shipping: number;
        shippingServiceCode?: string | undefined;
        shippingRateId?: string | undefined;
        trackingNumber?: string | undefined;
        carrier?: string | undefined;
        shippingServiceName?: string | undefined;
        estimatedLabelCost?: number | undefined;
        labelCost?: number | undefined;
        labelPdfUrl?: string | undefined;
        labelStatus?: "none" | "queued" | "purchased" | "failed" | undefined;
        labelError?: string | undefined;
    }, {
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
                quantity?: number | undefined;
            }[] | undefined;
        }[];
        shippingAddress: {
            name: string;
            email: string;
            phone: string;
            country: string;
            city: string;
            line1: string;
            state: string;
            postalCode: string;
            line2?: string | undefined;
            senderName?: string | undefined;
            senderMessage?: string | undefined;
        };
        shipmentId: string;
        subtotal: number;
        shippingServiceCode?: string | undefined;
        shippingRateId?: string | undefined;
        shipping?: number | undefined;
        trackingNumber?: string | undefined;
        carrier?: string | undefined;
        shippingServiceName?: string | undefined;
        estimatedLabelCost?: number | undefined;
        labelCost?: number | undefined;
        labelPdfUrl?: string | undefined;
        labelStatus?: "none" | "queued" | "purchased" | "failed" | undefined;
        labelError?: string | undefined;
    }>, "many">>;
    paymentProvider: z.ZodOptional<z.ZodEnum<["stripe", "razorpay"]>>;
    paymentIntentId: z.ZodOptional<z.ZodString>;
    razorpayOrderId: z.ZodOptional<z.ZodString>;
    razorpayPaymentId: z.ZodOptional<z.ZodString>;
    trackingNumber: z.ZodOptional<z.ZodString>;
    carrier: z.ZodOptional<z.ZodString>;
    /**
     * Per-vendor fulfillment (tracking) for mixed Orange County + HalloweenReady carts.
     * Legacy single-vendor orders may only have top-level trackingNumber/carrier.
     */
    vendorFulfillments: z.ZodOptional<z.ZodArray<z.ZodObject<{
        vendorSlug: z.ZodString;
        warehouseId: z.ZodOptional<z.ZodString>;
        trackingNumber: z.ZodOptional<z.ZodString>;
        carrier: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodEnum<["pending", "processing", "shipped", "delivered"]>>;
        updatedAt: z.ZodOptional<z.ZodString>;
        cjOrderId: z.ZodOptional<z.ZodString>;
        cjOrderNumber: z.ZodOptional<z.ZodString>;
        cjPayUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        vendorSlug: string;
        status?: "processing" | "shipped" | "delivered" | "pending" | undefined;
        updatedAt?: string | undefined;
        warehouseId?: string | undefined;
        trackingNumber?: string | undefined;
        carrier?: string | undefined;
        cjOrderId?: string | undefined;
        cjOrderNumber?: string | undefined;
        cjPayUrl?: string | undefined;
    }, {
        vendorSlug: string;
        status?: "processing" | "shipped" | "delivered" | "pending" | undefined;
        updatedAt?: string | undefined;
        warehouseId?: string | undefined;
        trackingNumber?: string | undefined;
        carrier?: string | undefined;
        cjOrderId?: string | undefined;
        cjOrderNumber?: string | undefined;
        cjPayUrl?: string | undefined;
    }>, "many">>;
    assignedVendorId: z.ZodOptional<z.ZodString>;
    assignedWarehouseId: z.ZodOptional<z.ZodString>;
    fulfillmentCountry: z.ZodOptional<z.ZodString>;
    routingReason: z.ZodOptional<z.ZodString>;
    fulfillmentSplits: z.ZodOptional<z.ZodArray<z.ZodObject<{
        vendorId: z.ZodString;
        warehouseId: z.ZodString;
        productSlugs: z.ZodArray<z.ZodString, "many">;
        fulfillmentCountry: z.ZodString;
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
    /** Last shipment status string received from vendor tracking API (e.g. in_transit). */
    vendorShipmentStatus: z.ZodOptional<z.ZodString>;
    adminNotes: z.ZodOptional<z.ZodString>;
    estimatedDeliveryAt: z.ZodOptional<z.ZodString>;
    deliveredAt: z.ZodOptional<z.ZodString>;
    /** ISO timestamp when post-delivery review email should send (deliveredAt + 1 day). */
    reviewEmailDueAt: z.ZodOptional<z.ZodString>;
    /** Set after review request email is sent (idempotency). */
    reviewEmailSentAt: z.ZodOptional<z.ZodString>;
    /** Last pending-payment reminder send time (ISO). */
    pendingPaymentReminderLastSentAt: z.ZodOptional<z.ZodString>;
    /** America/New_York calendar day (YYYY-MM-DD) of last pending-payment reminder. */
    pendingPaymentReminderLastDateKey: z.ZodOptional<z.ZodString>;
    /** How many pending-payment reminder emails have been sent. */
    pendingPaymentReminderCount: z.ZodOptional<z.ZodNumber>;
    /** USPS rate-shopping metadata (customer may still pay $0 when mode is free). */
    shippingServiceCode: z.ZodOptional<z.ZodString>;
    shippingServiceName: z.ZodOptional<z.ZodString>;
    shippingRateId: z.ZodOptional<z.ZodString>;
    estimatedLabelCost: z.ZodOptional<z.ZodNumber>;
    labelCost: z.ZodOptional<z.ZodNumber>;
    labelPdfUrl: z.ZodOptional<z.ZodString>;
    labelStatus: z.ZodOptional<z.ZodEnum<["none", "queued", "purchased", "failed"]>>;
    labelError: z.ZodOptional<z.ZodString>;
    addressValidated: z.ZodOptional<z.ZodBoolean>;
    /**
     * Marketing attribution snapshot (first/last/assisted touch).
     * Stored on the order so Order Route survives analytics event TTL.
     */
    attribution: z.ZodOptional<z.ZodObject<{
        version: z.ZodOptional<z.ZodLiteral<1>>;
        visitorId: z.ZodOptional<z.ZodString>;
        sessionId: z.ZodOptional<z.ZodString>;
        firstTouch: z.ZodOptional<z.ZodObject<{
            source: z.ZodString;
            medium: z.ZodString;
            campaign: z.ZodOptional<z.ZodString>;
            term: z.ZodOptional<z.ZodString>;
            content: z.ZodOptional<z.ZodString>;
            referrer: z.ZodOptional<z.ZodString>;
            referrerDomain: z.ZodOptional<z.ZodString>;
            landingPage: z.ZodOptional<z.ZodString>;
            entryUrl: z.ZodOptional<z.ZodString>;
            clickIds: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            channel: z.ZodOptional<z.ZodEnum<["paid_search", "organic_search", "paid_social", "organic_social", "referral", "email", "direct", "unknown"]>>;
            confidence: z.ZodEnum<["high", "medium", "low", "unknown"]>;
            confidenceReason: z.ZodOptional<z.ZodString>;
            at: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }, {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }>>;
        lastTouch: z.ZodOptional<z.ZodObject<{
            source: z.ZodString;
            medium: z.ZodString;
            campaign: z.ZodOptional<z.ZodString>;
            term: z.ZodOptional<z.ZodString>;
            content: z.ZodOptional<z.ZodString>;
            referrer: z.ZodOptional<z.ZodString>;
            referrerDomain: z.ZodOptional<z.ZodString>;
            landingPage: z.ZodOptional<z.ZodString>;
            entryUrl: z.ZodOptional<z.ZodString>;
            clickIds: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            channel: z.ZodOptional<z.ZodEnum<["paid_search", "organic_search", "paid_social", "organic_social", "referral", "email", "direct", "unknown"]>>;
            confidence: z.ZodEnum<["high", "medium", "low", "unknown"]>;
            confidenceReason: z.ZodOptional<z.ZodString>;
            at: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }, {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }>>;
        conversionTouch: z.ZodOptional<z.ZodObject<{
            source: z.ZodString;
            medium: z.ZodString;
            campaign: z.ZodOptional<z.ZodString>;
            term: z.ZodOptional<z.ZodString>;
            content: z.ZodOptional<z.ZodString>;
            referrer: z.ZodOptional<z.ZodString>;
            referrerDomain: z.ZodOptional<z.ZodString>;
            landingPage: z.ZodOptional<z.ZodString>;
            entryUrl: z.ZodOptional<z.ZodString>;
            clickIds: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            channel: z.ZodOptional<z.ZodEnum<["paid_search", "organic_search", "paid_social", "organic_social", "referral", "email", "direct", "unknown"]>>;
            confidence: z.ZodEnum<["high", "medium", "low", "unknown"]>;
            confidenceReason: z.ZodOptional<z.ZodString>;
            at: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }, {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }>>;
        assistedTouches: z.ZodOptional<z.ZodArray<z.ZodObject<{
            source: z.ZodString;
            medium: z.ZodString;
            campaign: z.ZodOptional<z.ZodString>;
            term: z.ZodOptional<z.ZodString>;
            content: z.ZodOptional<z.ZodString>;
            referrer: z.ZodOptional<z.ZodString>;
            referrerDomain: z.ZodOptional<z.ZodString>;
            landingPage: z.ZodOptional<z.ZodString>;
            entryUrl: z.ZodOptional<z.ZodString>;
            clickIds: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            channel: z.ZodOptional<z.ZodEnum<["paid_search", "organic_search", "paid_social", "organic_social", "referral", "email", "direct", "unknown"]>>;
            confidence: z.ZodEnum<["high", "medium", "low", "unknown"]>;
            confidenceReason: z.ZodOptional<z.ZodString>;
            at: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }, {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }>, "many">>;
        landingPage: z.ZodOptional<z.ZodString>;
        checkoutUrl: z.ZodOptional<z.ZodString>;
        conversionPage: z.ZodOptional<z.ZodString>;
        deviceType: z.ZodOptional<z.ZodString>;
        browser: z.ZodOptional<z.ZodString>;
        os: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        region: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        isNewCustomer: z.ZodOptional<z.ZodBoolean>;
        sessionsBeforePurchase: z.ZodOptional<z.ZodNumber>;
        pagesViewed: z.ZodOptional<z.ZodNumber>;
        firstVisitAt: z.ZodOptional<z.ZodString>;
        lastVisitAt: z.ZodOptional<z.ZodString>;
        timeToPurchaseMs: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        landingPage?: string | undefined;
        version?: 1 | undefined;
        visitorId?: string | undefined;
        sessionId?: string | undefined;
        firstTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        lastTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        conversionTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        assistedTouches?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }[] | undefined;
        checkoutUrl?: string | undefined;
        conversionPage?: string | undefined;
        deviceType?: string | undefined;
        browser?: string | undefined;
        os?: string | undefined;
        country?: string | undefined;
        region?: string | undefined;
        city?: string | undefined;
        isNewCustomer?: boolean | undefined;
        sessionsBeforePurchase?: number | undefined;
        pagesViewed?: number | undefined;
        firstVisitAt?: string | undefined;
        lastVisitAt?: string | undefined;
        timeToPurchaseMs?: number | undefined;
    }, {
        landingPage?: string | undefined;
        version?: 1 | undefined;
        visitorId?: string | undefined;
        sessionId?: string | undefined;
        firstTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        lastTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        conversionTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        assistedTouches?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }[] | undefined;
        checkoutUrl?: string | undefined;
        conversionPage?: string | undefined;
        deviceType?: string | undefined;
        browser?: string | undefined;
        os?: string | undefined;
        country?: string | undefined;
        region?: string | undefined;
        city?: string | undefined;
        isNewCustomer?: boolean | undefined;
        sessionsBeforePurchase?: number | undefined;
        pagesViewed?: number | undefined;
        firstVisitAt?: string | undefined;
        lastVisitAt?: string | undefined;
        timeToPurchaseMs?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: "pending_payment" | "paid" | "accepted" | "on_hold" | "processing" | "shipped" | "delivered" | "complete" | "cancelled" | "refunded";
    currency: "USD" | "INR";
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
    orderId: string;
    shippingAddress: {
        name: string;
        email: string;
        phone: string;
        country: string;
        city: string;
        line1: string;
        state: string;
        postalCode: string;
        line2?: string | undefined;
        senderName?: string | undefined;
        senderMessage?: string | undefined;
    };
    subtotal: number;
    shipping: number;
    discount: number;
    tax: number;
    total: number;
    sessionId?: string | undefined;
    shipments?: {
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
        shippingAddress: {
            name: string;
            email: string;
            phone: string;
            country: string;
            city: string;
            line1: string;
            state: string;
            postalCode: string;
            line2?: string | undefined;
            senderName?: string | undefined;
            senderMessage?: string | undefined;
        };
        shipmentId: string;
        subtotal: number;
        shipping: number;
        shippingServiceCode?: string | undefined;
        shippingRateId?: string | undefined;
        trackingNumber?: string | undefined;
        carrier?: string | undefined;
        shippingServiceName?: string | undefined;
        estimatedLabelCost?: number | undefined;
        labelCost?: number | undefined;
        labelPdfUrl?: string | undefined;
        labelStatus?: "none" | "queued" | "purchased" | "failed" | undefined;
        labelError?: string | undefined;
    }[] | undefined;
    couponCode?: string | undefined;
    shippingServiceCode?: string | undefined;
    shippingRateId?: string | undefined;
    attribution?: {
        landingPage?: string | undefined;
        version?: 1 | undefined;
        visitorId?: string | undefined;
        sessionId?: string | undefined;
        firstTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        lastTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        conversionTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        assistedTouches?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }[] | undefined;
        checkoutUrl?: string | undefined;
        conversionPage?: string | undefined;
        deviceType?: string | undefined;
        browser?: string | undefined;
        os?: string | undefined;
        country?: string | undefined;
        region?: string | undefined;
        city?: string | undefined;
        isNewCustomer?: boolean | undefined;
        sessionsBeforePurchase?: number | undefined;
        pagesViewed?: number | undefined;
        firstVisitAt?: string | undefined;
        lastVisitAt?: string | undefined;
        timeToPurchaseMs?: number | undefined;
    } | undefined;
    trackingNumber?: string | undefined;
    carrier?: string | undefined;
    shippingServiceName?: string | undefined;
    estimatedLabelCost?: number | undefined;
    labelCost?: number | undefined;
    labelPdfUrl?: string | undefined;
    labelStatus?: "none" | "queued" | "purchased" | "failed" | undefined;
    labelError?: string | undefined;
    orderNumber?: string | undefined;
    userId?: string | undefined;
    vendorSlugs?: string[] | undefined;
    statusHistory?: {
        at: string;
        status: "pending_payment" | "paid" | "accepted" | "on_hold" | "processing" | "shipped" | "delivered" | "complete" | "cancelled" | "refunded";
        note?: string | undefined;
    }[] | undefined;
    paymentProvider?: "stripe" | "razorpay" | undefined;
    paymentIntentId?: string | undefined;
    razorpayOrderId?: string | undefined;
    razorpayPaymentId?: string | undefined;
    vendorFulfillments?: {
        vendorSlug: string;
        status?: "processing" | "shipped" | "delivered" | "pending" | undefined;
        updatedAt?: string | undefined;
        warehouseId?: string | undefined;
        trackingNumber?: string | undefined;
        carrier?: string | undefined;
        cjOrderId?: string | undefined;
        cjOrderNumber?: string | undefined;
        cjPayUrl?: string | undefined;
    }[] | undefined;
    assignedVendorId?: string | undefined;
    assignedWarehouseId?: string | undefined;
    fulfillmentCountry?: string | undefined;
    routingReason?: string | undefined;
    fulfillmentSplits?: {
        warehouseId: string;
        fulfillmentCountry: string;
        routingReason: string;
        vendorId: string;
        productSlugs: string[];
        estimatedDeliveryDays?: number | undefined;
    }[] | undefined;
    vendorShipmentStatus?: string | undefined;
    adminNotes?: string | undefined;
    estimatedDeliveryAt?: string | undefined;
    deliveredAt?: string | undefined;
    reviewEmailDueAt?: string | undefined;
    reviewEmailSentAt?: string | undefined;
    pendingPaymentReminderLastSentAt?: string | undefined;
    pendingPaymentReminderLastDateKey?: string | undefined;
    pendingPaymentReminderCount?: number | undefined;
    addressValidated?: boolean | undefined;
}, {
    status: "pending_payment" | "paid" | "accepted" | "on_hold" | "processing" | "shipped" | "delivered" | "complete" | "cancelled" | "refunded";
    currency: "USD" | "INR";
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
            quantity?: number | undefined;
        }[] | undefined;
    }[];
    orderId: string;
    shippingAddress: {
        name: string;
        email: string;
        phone: string;
        country: string;
        city: string;
        line1: string;
        state: string;
        postalCode: string;
        line2?: string | undefined;
        senderName?: string | undefined;
        senderMessage?: string | undefined;
    };
    subtotal: number;
    total: number;
    sessionId?: string | undefined;
    shipments?: {
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
                quantity?: number | undefined;
            }[] | undefined;
        }[];
        shippingAddress: {
            name: string;
            email: string;
            phone: string;
            country: string;
            city: string;
            line1: string;
            state: string;
            postalCode: string;
            line2?: string | undefined;
            senderName?: string | undefined;
            senderMessage?: string | undefined;
        };
        shipmentId: string;
        subtotal: number;
        shippingServiceCode?: string | undefined;
        shippingRateId?: string | undefined;
        shipping?: number | undefined;
        trackingNumber?: string | undefined;
        carrier?: string | undefined;
        shippingServiceName?: string | undefined;
        estimatedLabelCost?: number | undefined;
        labelCost?: number | undefined;
        labelPdfUrl?: string | undefined;
        labelStatus?: "none" | "queued" | "purchased" | "failed" | undefined;
        labelError?: string | undefined;
    }[] | undefined;
    couponCode?: string | undefined;
    shippingServiceCode?: string | undefined;
    shippingRateId?: string | undefined;
    attribution?: {
        landingPage?: string | undefined;
        version?: 1 | undefined;
        visitorId?: string | undefined;
        sessionId?: string | undefined;
        firstTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        lastTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        conversionTouch?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        } | undefined;
        assistedTouches?: {
            source: string;
            medium: string;
            confidence: "unknown" | "high" | "medium" | "low";
            at?: string | undefined;
            campaign?: string | undefined;
            term?: string | undefined;
            content?: string | undefined;
            referrer?: string | undefined;
            referrerDomain?: string | undefined;
            landingPage?: string | undefined;
            entryUrl?: string | undefined;
            clickIds?: Record<string, string> | undefined;
            channel?: "unknown" | "email" | "paid_search" | "organic_search" | "paid_social" | "organic_social" | "referral" | "direct" | undefined;
            confidenceReason?: string | undefined;
        }[] | undefined;
        checkoutUrl?: string | undefined;
        conversionPage?: string | undefined;
        deviceType?: string | undefined;
        browser?: string | undefined;
        os?: string | undefined;
        country?: string | undefined;
        region?: string | undefined;
        city?: string | undefined;
        isNewCustomer?: boolean | undefined;
        sessionsBeforePurchase?: number | undefined;
        pagesViewed?: number | undefined;
        firstVisitAt?: string | undefined;
        lastVisitAt?: string | undefined;
        timeToPurchaseMs?: number | undefined;
    } | undefined;
    shipping?: number | undefined;
    trackingNumber?: string | undefined;
    carrier?: string | undefined;
    shippingServiceName?: string | undefined;
    estimatedLabelCost?: number | undefined;
    labelCost?: number | undefined;
    labelPdfUrl?: string | undefined;
    labelStatus?: "none" | "queued" | "purchased" | "failed" | undefined;
    labelError?: string | undefined;
    orderNumber?: string | undefined;
    userId?: string | undefined;
    discount?: number | undefined;
    tax?: number | undefined;
    vendorSlugs?: string[] | undefined;
    statusHistory?: {
        at: string;
        status: "pending_payment" | "paid" | "accepted" | "on_hold" | "processing" | "shipped" | "delivered" | "complete" | "cancelled" | "refunded";
        note?: string | undefined;
    }[] | undefined;
    paymentProvider?: "stripe" | "razorpay" | undefined;
    paymentIntentId?: string | undefined;
    razorpayOrderId?: string | undefined;
    razorpayPaymentId?: string | undefined;
    vendorFulfillments?: {
        vendorSlug: string;
        status?: "processing" | "shipped" | "delivered" | "pending" | undefined;
        updatedAt?: string | undefined;
        warehouseId?: string | undefined;
        trackingNumber?: string | undefined;
        carrier?: string | undefined;
        cjOrderId?: string | undefined;
        cjOrderNumber?: string | undefined;
        cjPayUrl?: string | undefined;
    }[] | undefined;
    assignedVendorId?: string | undefined;
    assignedWarehouseId?: string | undefined;
    fulfillmentCountry?: string | undefined;
    routingReason?: string | undefined;
    fulfillmentSplits?: {
        warehouseId: string;
        fulfillmentCountry: string;
        routingReason: string;
        vendorId: string;
        productSlugs: string[];
        estimatedDeliveryDays?: number | undefined;
    }[] | undefined;
    vendorShipmentStatus?: string | undefined;
    adminNotes?: string | undefined;
    estimatedDeliveryAt?: string | undefined;
    deliveredAt?: string | undefined;
    reviewEmailDueAt?: string | undefined;
    reviewEmailSentAt?: string | undefined;
    pendingPaymentReminderLastSentAt?: string | undefined;
    pendingPaymentReminderLastDateKey?: string | undefined;
    pendingPaymentReminderCount?: number | undefined;
    addressValidated?: boolean | undefined;
}>;
/** Admin order status update payload. */
export declare const orderStatusUpdateSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<["pending_payment", "paid", "accepted", "on_hold", "processing", "shipped", "delivered", "complete", "cancelled", "refunded"]>>;
    trackingNumber: z.ZodOptional<z.ZodString>;
    carrier: z.ZodOptional<z.ZodString>;
    /** Upsert per-vendor tracking (mixed OC + HalloweenReady orders). */
    vendorFulfillments: z.ZodOptional<z.ZodArray<z.ZodObject<{
        vendorSlug: z.ZodString;
        warehouseId: z.ZodOptional<z.ZodString>;
        trackingNumber: z.ZodOptional<z.ZodString>;
        carrier: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodEnum<["pending", "processing", "shipped", "delivered"]>>;
    }, "strip", z.ZodTypeAny, {
        vendorSlug: string;
        status?: "processing" | "shipped" | "delivered" | "pending" | undefined;
        warehouseId?: string | undefined;
        trackingNumber?: string | undefined;
        carrier?: string | undefined;
    }, {
        vendorSlug: string;
        status?: "processing" | "shipped" | "delivered" | "pending" | undefined;
        warehouseId?: string | undefined;
        trackingNumber?: string | undefined;
        carrier?: string | undefined;
    }>, "many">>;
    note: z.ZodOptional<z.ZodString>;
    adminNotes: z.ZodOptional<z.ZodString>;
    estimatedDeliveryAt: z.ZodOptional<z.ZodString>;
    shippingServiceCode: z.ZodOptional<z.ZodString>;
    shippingServiceName: z.ZodOptional<z.ZodString>;
    shippingRateId: z.ZodOptional<z.ZodString>;
    estimatedLabelCost: z.ZodOptional<z.ZodNumber>;
    labelStatus: z.ZodOptional<z.ZodEnum<["none", "queued", "purchased", "failed"]>>;
    labelError: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: "pending_payment" | "paid" | "accepted" | "on_hold" | "processing" | "shipped" | "delivered" | "complete" | "cancelled" | "refunded" | undefined;
    shippingServiceCode?: string | undefined;
    shippingRateId?: string | undefined;
    trackingNumber?: string | undefined;
    carrier?: string | undefined;
    shippingServiceName?: string | undefined;
    estimatedLabelCost?: number | undefined;
    labelStatus?: "none" | "queued" | "purchased" | "failed" | undefined;
    labelError?: string | undefined;
    note?: string | undefined;
    vendorFulfillments?: {
        vendorSlug: string;
        status?: "processing" | "shipped" | "delivered" | "pending" | undefined;
        warehouseId?: string | undefined;
        trackingNumber?: string | undefined;
        carrier?: string | undefined;
    }[] | undefined;
    adminNotes?: string | undefined;
    estimatedDeliveryAt?: string | undefined;
}, {
    status?: "pending_payment" | "paid" | "accepted" | "on_hold" | "processing" | "shipped" | "delivered" | "complete" | "cancelled" | "refunded" | undefined;
    shippingServiceCode?: string | undefined;
    shippingRateId?: string | undefined;
    trackingNumber?: string | undefined;
    carrier?: string | undefined;
    shippingServiceName?: string | undefined;
    estimatedLabelCost?: number | undefined;
    labelStatus?: "none" | "queued" | "purchased" | "failed" | undefined;
    labelError?: string | undefined;
    note?: string | undefined;
    vendorFulfillments?: {
        vendorSlug: string;
        status?: "processing" | "shipped" | "delivered" | "pending" | undefined;
        warehouseId?: string | undefined;
        trackingNumber?: string | undefined;
        carrier?: string | undefined;
    }[] | undefined;
    adminNotes?: string | undefined;
    estimatedDeliveryAt?: string | undefined;
}>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type CheckoutShipment = z.infer<typeof checkoutShipmentSchema>;
export type OrderShipment = z.infer<typeof orderShipmentSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type OrderStatusUpdate = z.infer<typeof orderStatusUpdateSchema>;
export type OrderStatusHistoryEntry = z.infer<typeof orderStatusHistoryEntrySchema>;
export type Order = z.infer<typeof orderSchema> & {
    createdAt: string;
    updatedAt: string;
};
