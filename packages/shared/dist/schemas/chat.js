"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CHAT_CONFIG = exports.chatConfigSchema = exports.chatResponseSchema = exports.chatRequestSchema = exports.chatMessageSchema = exports.chatMarketContextSchema = exports.chatCartItemSchema = exports.chatPageContextSchema = exports.chatBlockSchema = exports.assistantProductSchema = exports.chatQuickActionSchema = exports.shoppingStateSchema = exports.CHAT_INTENTS = void 0;
const zod_1 = require("zod");
exports.CHAT_INTENTS = [
    "product_search",
    "category_search",
    "product_comparison",
    "product_information",
    "price_query",
    "shipping_query",
    "order_query",
    "return_query",
    "payment_query",
    "size_query",
    "styling_help",
    "halloween_ideas",
    "location_query",
    "general_halloween",
    "support",
    "navigation",
    "surprise",
    "party_planner",
    "start_over",
    "smalltalk",
];
exports.shoppingStateSchema = zod_1.z.object({
    category: zod_1.z.string().max(80).optional(),
    categorySlug: zod_1.z.string().max(80).optional(),
    subcategory: zod_1.z.string().max(80).optional(),
    audience: zod_1.z.string().max(40).optional(),
    gender: zod_1.z.string().max(40).optional(),
    ageGroup: zod_1.z.string().max(40).optional(),
    theme: zod_1.z.string().max(80).optional(),
    style: zod_1.z.string().max(80).optional(),
    occasion: zod_1.z.string().max(80).optional(),
    budgetMin: zod_1.z.number().nonnegative().optional(),
    budgetMax: zod_1.z.number().nonnegative().optional(),
    color: zod_1.z.string().max(40).optional(),
    size: zod_1.z.string().max(40).optional(),
    country: zod_1.z.string().max(8).optional(),
    region: zod_1.z.string().max(80).optional(),
    city: zod_1.z.string().max(80).optional(),
    shippingRequirement: zod_1.z.string().max(80).optional(),
    query: zod_1.z.string().max(200).optional(),
    preferences: zod_1.z.array(zod_1.z.string().max(80)).max(12).optional(),
    shownSlugs: zod_1.z.array(zod_1.z.string().max(160)).max(24).optional(),
    selectedSlug: zod_1.z.string().max(160).optional(),
    partySize: zod_1.z.number().int().positive().max(500).optional(),
    indoorOutdoor: zod_1.z.enum(["indoor", "outdoor", "both"]).optional(),
});
exports.chatQuickActionSchema = zod_1.z.object({
    id: zod_1.z.string().max(80),
    label: zod_1.z.string().max(80),
    message: zod_1.z.string().max(200),
    href: zod_1.z.string().max(500).optional(),
});
exports.assistantProductSchema = zod_1.z.object({
    slug: zod_1.z.string(),
    name: zod_1.z.string(),
    image: zod_1.z.string().optional(),
    price: zod_1.z.number(),
    compareAtPrice: zod_1.z.number().optional(),
    currency: zod_1.z.string().default("USD"),
    categorySlug: zod_1.z.string().optional(),
    url: zod_1.z.string(),
    inventory: zod_1.z.number().int().optional(),
    available: zod_1.z.boolean().optional(),
    badge: zod_1.z.string().max(40).optional(),
    variants: zod_1.z
        .array(zod_1.z.object({
        vid: zod_1.z.string(),
        name: zod_1.z.string().optional(),
        inventory: zod_1.z.number().int().optional(),
    }))
        .optional(),
});
exports.chatBlockSchema = zod_1.z.discriminatedUnion("type", [
    zod_1.z.object({ type: zod_1.z.literal("text"), text: zod_1.z.string().max(2000) }),
    zod_1.z.object({ type: zod_1.z.literal("quick_actions"), actions: zod_1.z.array(exports.chatQuickActionSchema).max(12) }),
    zod_1.z.object({ type: zod_1.z.literal("product_carousel"), heading: zod_1.z.string().max(120).optional(), products: zod_1.z.array(exports.assistantProductSchema).max(8), viewAllHref: zod_1.z.string().max(500).optional(), viewAllLabel: zod_1.z.string().max(80).optional() }),
    zod_1.z.object({ type: zod_1.z.literal("product_card"), product: exports.assistantProductSchema }),
    zod_1.z.object({ type: zod_1.z.literal("category_card"), title: zod_1.z.string().max(80), href: zod_1.z.string().max(500), subtitle: zod_1.z.string().max(160).optional() }),
    zod_1.z.object({ type: zod_1.z.literal("link"), label: zod_1.z.string().max(80), href: zod_1.z.string().max(500) }),
    zod_1.z.object({ type: zod_1.z.literal("comparison"), products: zod_1.z.array(exports.assistantProductSchema).max(4), summary: zod_1.z.string().max(800) }),
    zod_1.z.object({ type: zod_1.z.literal("error"), text: zod_1.z.string().max(400), href: zod_1.z.string().max(500).optional(), hrefLabel: zod_1.z.string().max(80).optional() }),
]);
exports.chatPageContextSchema = zod_1.z.object({
    path: zod_1.z.string().max(500),
    productSlug: zod_1.z.string().max(160).optional(),
    productName: zod_1.z.string().max(200).optional(),
    categorySlug: zod_1.z.string().max(80).optional(),
    searchQuery: zod_1.z.string().max(200).optional(),
});
exports.chatCartItemSchema = zod_1.z.object({
    slug: zod_1.z.string().max(160),
    name: zod_1.z.string().max(200).optional(),
});
exports.chatMarketContextSchema = zod_1.z.object({
    countryCode: zod_1.z.string().max(8).optional(),
    postalCode: zod_1.z.string().max(20).optional(),
    city: zod_1.z.string().max(80).optional(),
    region: zod_1.z.string().max(80).optional(),
});
exports.chatMessageSchema = zod_1.z.object({
    role: zod_1.z.enum(["user", "assistant"]),
    content: zod_1.z.string().min(1).max(2000),
});
exports.chatRequestSchema = zod_1.z.object({
    messages: zod_1.z.array(exports.chatMessageSchema).max(16).default([]),
    page: zod_1.z.string().max(500).optional(),
    sessionId: zod_1.z.string().max(64).optional(),
    shoppingState: exports.shoppingStateSchema.optional(),
    pageContext: exports.chatPageContextSchema.optional(),
    cart: zod_1.z.array(exports.chatCartItemSchema).max(20).optional(),
    market: exports.chatMarketContextSchema.optional(),
});
exports.chatResponseSchema = zod_1.z.object({
    message: zod_1.z.string().optional(),
    blocks: zod_1.z.array(exports.chatBlockSchema).max(12),
    shoppingState: exports.shoppingStateSchema.default({}),
    intent: zod_1.z.enum(exports.CHAT_INTENTS),
    unfulfilled: zod_1.z.boolean().optional(),
    searchQuery: zod_1.z.string().max(200).optional(),
    resultCount: zod_1.z.number().int().nonnegative().optional(),
});
exports.chatConfigSchema = zod_1.z.object({
    enabled: zod_1.z.boolean().default(true),
    launcherEnabled: zod_1.z.boolean().default(true),
    invitationEnabled: zod_1.z.boolean().default(true),
    invitationDelayMs: zod_1.z.number().int().min(3000).max(120000).default(14000),
    welcomeMessage: zod_1.z.string().max(400).default("Hi! I'm your OccasionFun shopping assistant. We sell gifts, home goods, fashion, toys, and party supplies for every occasion — I can help you find what you want."),
    productResultCount: zod_1.z.number().int().min(3).max(8).default(5),
    upsellLimit: zod_1.z.number().int().min(0).max(4).default(2),
    countryPersonalization: zod_1.z.boolean().default(true),
});
exports.DEFAULT_CHAT_CONFIG = exports.chatConfigSchema.parse({});
