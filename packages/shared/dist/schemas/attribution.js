"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouteEventSchema = exports.checkoutAttributionSchema = exports.orderAttributionSchema = exports.trafficTouchSchema = exports.ATTRIBUTION_CHANNELS = exports.ATTRIBUTION_CONFIDENCE = void 0;
const zod_1 = require("zod");
exports.ATTRIBUTION_CONFIDENCE = ["high", "medium", "low", "unknown"];
exports.ATTRIBUTION_CHANNELS = [
    "paid_search",
    "organic_search",
    "paid_social",
    "organic_social",
    "referral",
    "email",
    "direct",
    "chat",
    "unknown",
];
/** Normalized marketing touch (first / last / assisted). */
exports.trafficTouchSchema = zod_1.z.object({
    source: zod_1.z.string().min(1).max(80),
    medium: zod_1.z.string().min(1).max(80),
    campaign: zod_1.z.string().max(200).optional(),
    term: zod_1.z.string().max(200).optional(),
    content: zod_1.z.string().max(200).optional(),
    referrer: zod_1.z.string().max(512).optional(),
    referrerDomain: zod_1.z.string().max(200).optional(),
    landingPage: zod_1.z.string().max(512).optional(),
    entryUrl: zod_1.z.string().max(1024).optional(),
    /** Platform click ids (gclid, msclkid, fbclid, ttclid, …) — values only. */
    clickIds: zod_1.z.record(zod_1.z.string().max(256)).optional(),
    channel: zod_1.z.enum(exports.ATTRIBUTION_CHANNELS).optional(),
    confidence: zod_1.z.enum(exports.ATTRIBUTION_CONFIDENCE),
    confidenceReason: zod_1.z.string().max(300).optional(),
    at: zod_1.z.string().optional(),
});
/**
 * Snapshot stamped on the order at checkout (survives event TTL).
 * Supports first/last/assisted attribution and future source analytics.
 */
exports.orderAttributionSchema = zod_1.z.object({
    version: zod_1.z.literal(1).optional(),
    visitorId: zod_1.z.string().max(80).optional(),
    sessionId: zod_1.z.string().max(80).optional(),
    firstTouch: exports.trafficTouchSchema.optional(),
    lastTouch: exports.trafficTouchSchema.optional(),
    conversionTouch: exports.trafficTouchSchema.optional(),
    assistedTouches: zod_1.z.array(exports.trafficTouchSchema).max(20).optional(),
    landingPage: zod_1.z.string().max(512).optional(),
    checkoutUrl: zod_1.z.string().max(512).optional(),
    conversionPage: zod_1.z.string().max(512).optional(),
    deviceType: zod_1.z.string().max(40).optional(),
    browser: zod_1.z.string().max(40).optional(),
    os: zod_1.z.string().max(40).optional(),
    country: zod_1.z.string().max(80).optional(),
    region: zod_1.z.string().max(80).optional(),
    city: zod_1.z.string().max(80).optional(),
    isNewCustomer: zod_1.z.boolean().optional(),
    sessionsBeforePurchase: zod_1.z.number().int().nonnegative().optional(),
    pagesViewed: zod_1.z.number().int().nonnegative().optional(),
    firstVisitAt: zod_1.z.string().optional(),
    lastVisitAt: zod_1.z.string().optional(),
    timeToPurchaseMs: zod_1.z.number().nonnegative().optional(),
});
/** Client → checkout payload (subset; server may enrich). */
exports.checkoutAttributionSchema = exports.orderAttributionSchema.omit({ version: true }).extend({
    version: zod_1.z.literal(1).optional(),
});
exports.orderRouteEventSchema = zod_1.z.object({
    eventId: zod_1.z.string().optional(),
    eventType: zod_1.z.string(),
    timestamp: zod_1.z.string(),
    label: zod_1.z.string(),
    pageUrl: zod_1.z.string().optional(),
    productSlug: zod_1.z.string().optional(),
    source: zod_1.z.string().optional(),
    medium: zod_1.z.string().optional(),
    campaign: zod_1.z.string().optional(),
    referrer: zod_1.z.string().optional(),
    confidence: zod_1.z.enum(exports.ATTRIBUTION_CONFIDENCE).optional(),
    confidenceReason: zod_1.z.string().optional(),
    metadata: zod_1.z.record(zod_1.z.string()).optional(),
});
