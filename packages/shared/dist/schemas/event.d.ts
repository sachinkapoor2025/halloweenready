import { z } from "zod";
export declare const eventTypeEnum: z.ZodEnum<["page_view", "product_view", "search", "cart_add", "cart_remove", "checkout_start", "purchase"]>;
export declare const trackEventSchema: z.ZodObject<{
    type: z.ZodEnum<["page_view", "product_view", "search", "cart_add", "cart_remove", "checkout_start", "purchase"]>;
    sessionId: z.ZodString;
    path: z.ZodOptional<z.ZodString>;
    productSlug: z.ZodOptional<z.ZodString>;
    query: z.ZodOptional<z.ZodString>;
    resultCount: z.ZodOptional<z.ZodNumber>;
    value: z.ZodOptional<z.ZodNumber>;
    referrer: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    at: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "page_view" | "product_view" | "search" | "cart_add" | "cart_remove" | "checkout_start" | "purchase";
    sessionId: string;
    productSlug?: string | undefined;
    value?: number | undefined;
    at?: string | undefined;
    path?: string | undefined;
    metadata?: Record<string, string> | undefined;
    query?: string | undefined;
    resultCount?: number | undefined;
    referrer?: string | undefined;
}, {
    type: "page_view" | "product_view" | "search" | "cart_add" | "cart_remove" | "checkout_start" | "purchase";
    sessionId: string;
    productSlug?: string | undefined;
    value?: number | undefined;
    at?: string | undefined;
    path?: string | undefined;
    metadata?: Record<string, string> | undefined;
    query?: string | undefined;
    resultCount?: number | undefined;
    referrer?: string | undefined;
}>;
/** Events are sent in batches to reduce request volume. */
export declare const trackEventBatchSchema: z.ZodObject<{
    events: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["page_view", "product_view", "search", "cart_add", "cart_remove", "checkout_start", "purchase"]>;
        sessionId: z.ZodString;
        path: z.ZodOptional<z.ZodString>;
        productSlug: z.ZodOptional<z.ZodString>;
        query: z.ZodOptional<z.ZodString>;
        resultCount: z.ZodOptional<z.ZodNumber>;
        value: z.ZodOptional<z.ZodNumber>;
        referrer: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        at: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "page_view" | "product_view" | "search" | "cart_add" | "cart_remove" | "checkout_start" | "purchase";
        sessionId: string;
        productSlug?: string | undefined;
        value?: number | undefined;
        at?: string | undefined;
        path?: string | undefined;
        metadata?: Record<string, string> | undefined;
        query?: string | undefined;
        resultCount?: number | undefined;
        referrer?: string | undefined;
    }, {
        type: "page_view" | "product_view" | "search" | "cart_add" | "cart_remove" | "checkout_start" | "purchase";
        sessionId: string;
        productSlug?: string | undefined;
        value?: number | undefined;
        at?: string | undefined;
        path?: string | undefined;
        metadata?: Record<string, string> | undefined;
        query?: string | undefined;
        resultCount?: number | undefined;
        referrer?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    events: {
        type: "page_view" | "product_view" | "search" | "cart_add" | "cart_remove" | "checkout_start" | "purchase";
        sessionId: string;
        productSlug?: string | undefined;
        value?: number | undefined;
        at?: string | undefined;
        path?: string | undefined;
        metadata?: Record<string, string> | undefined;
        query?: string | undefined;
        resultCount?: number | undefined;
        referrer?: string | undefined;
    }[];
}, {
    events: {
        type: "page_view" | "product_view" | "search" | "cart_add" | "cart_remove" | "checkout_start" | "purchase";
        sessionId: string;
        productSlug?: string | undefined;
        value?: number | undefined;
        at?: string | undefined;
        path?: string | undefined;
        metadata?: Record<string, string> | undefined;
        query?: string | undefined;
        resultCount?: number | undefined;
        referrer?: string | undefined;
    }[];
}>;
export type TrackEventInput = z.infer<typeof trackEventSchema>;
export type TrackEventBatch = z.infer<typeof trackEventBatchSchema>;
export type AnalyticsEvent = TrackEventInput & {
    eventId: string;
    createdAt: string;
};
