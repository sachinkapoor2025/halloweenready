import { z } from "zod";
export declare const ATTRIBUTION_CONFIDENCE: readonly ["high", "medium", "low", "unknown"];
export type AttributionConfidence = (typeof ATTRIBUTION_CONFIDENCE)[number];
export declare const ATTRIBUTION_CHANNELS: readonly ["paid_search", "organic_search", "paid_social", "organic_social", "referral", "email", "direct", "unknown"];
export type AttributionChannel = (typeof ATTRIBUTION_CHANNELS)[number];
/** Normalized marketing touch (first / last / assisted). */
export declare const trafficTouchSchema: any;
export type TrafficTouch = z.infer<typeof trafficTouchSchema>;
/**
 * Snapshot stamped on the order at checkout (survives event TTL).
 * Supports first/last/assisted attribution and future source analytics.
 */
export declare const orderAttributionSchema: any;
export type OrderAttribution = z.infer<typeof orderAttributionSchema>;
/** Client → checkout payload (subset; server may enrich). */
export declare const checkoutAttributionSchema: any;
export type CheckoutAttributionInput = z.infer<typeof checkoutAttributionSchema>;
export declare const orderRouteEventSchema: any;
export type OrderRouteEvent = z.infer<typeof orderRouteEventSchema>;
