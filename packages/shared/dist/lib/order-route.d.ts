import type { OrderAttribution, OrderRouteEvent, TrafficTouch } from "../schemas/attribution";
import type { Order } from "../schemas/order";
export type RawAnalyticsEvent = {
    eventId?: string;
    type?: string;
    createdAt?: string;
    at?: string;
    path?: string;
    productSlug?: string;
    referrer?: string;
    metadata?: Record<string, string>;
};
/** Reconstruct acquisition touches from session events (legacy orders / backfill). */
export declare function reconstructTouchesFromEvents(events: RawAnalyticsEvent[]): TrafficTouch[];
export declare function buildTimeline(events: RawAnalyticsEvent[], order: Order): OrderRouteEvent[];
export type OrderRouteResponse = {
    orderId: string;
    orderNumber?: string;
    customerEmail?: string;
    customerName?: string;
    sessionId?: string;
    visitorId?: string;
    orderCreatedAt: string;
    attribution: OrderAttribution;
    summary: {
        firstTouchLabel: string;
        lastTouchLabel: string;
        conversionLabel: string;
        confidence: string;
        confidenceReason?: string;
        sessionsBeforePurchase?: number;
        pagesViewed: number;
        daysToConversion?: number;
        device?: string;
        browser?: string;
        os?: string;
        location?: string;
        landingPage?: string;
        referrer?: string;
        primaryCampaign?: string;
    };
    timeline: OrderRouteEvent[];
    eventsAvailable: number;
    eventsNote?: string;
};
/** Lean row for Analytics → Order routes overview. */
export type OrderRouteListItem = {
    orderId: string;
    orderNumber?: string;
    orderCreatedAt: string;
    customerName?: string;
    customerEmail?: string;
    total: number;
    currency: "USD" | "INR";
    status: string;
    paymentProvider?: string;
    firstTouchLabel: string;
    lastTouchLabel: string;
    firstSource?: string;
    lastSource?: string;
    medium?: string;
    campaign?: string;
    confidence: string;
    landingPage?: string;
    referrer?: string;
    device?: string;
    /** True when checkout stamped attribution on the order. */
    hasAttributionSnapshot: boolean;
    /** Where overview fields came from. */
    attributionOrigin: "checkout_snapshot" | "session_events" | "none";
};
export declare function buildOrderRouteListItem(order: Order, events?: RawAnalyticsEvent[]): OrderRouteListItem;
export declare function buildOrderRoutePayload(order: Order, events: RawAnalyticsEvent[]): OrderRouteResponse;
