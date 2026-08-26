"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLogSchema = exports.adminFulfillmentOverrideSchema = exports.orderFulfillmentAssignmentSchema = exports.fulfillmentSplitSchema = exports.serviceabilityRequestSchema = exports.upsertInventoryListingSchema = exports.inventoryListingSchema = exports.updateMarketSchema = exports.createMarketSchema = exports.marketSchema = exports.marketContactSchema = exports.updateVendorSchema = exports.createVendorSchema = exports.vendorSchema = exports.vendorUserSchema = exports.updateWarehouseSchema = exports.createWarehouseSchema = exports.warehouseSchema = exports.warehouseServiceAreaSchema = exports.CHECKOUT_CURRENCIES = exports.MARKET_CURRENCIES = exports.countryCodeSchema = void 0;
const zod_1 = require("zod");
/** ISO 3166-1 alpha-2. Europe is stored as real country codes, never a fake "EU" country. */
exports.countryCodeSchema = zod_1.z
    .string()
    .trim()
    .length(2)
    .transform((v) => v.toUpperCase());
exports.MARKET_CURRENCIES = ["USD", "GBP", "CAD", "AUD", "INR", "AED", "EUR"];
exports.CHECKOUT_CURRENCIES = ["USD", "INR"];
exports.warehouseServiceAreaSchema = zod_1.z.object({
    countryCodes: zod_1.z.array(exports.countryCodeSchema).default([]),
    /** Empty = all regions in the listed countries. */
    stateOrRegionCodes: zod_1.z.array(zod_1.z.string().trim().min(1).max(12)).default([]),
    /** Empty = all postal codes. Prefix match (e.g. "SO" for Southampton). */
    postalPrefixes: zod_1.z.array(zod_1.z.string().trim().min(1).max(12)).default([]),
    internationalShipping: zod_1.z.boolean().default(false),
});
exports.warehouseSchema = zod_1.z.object({
    warehouseId: zod_1.z.string().min(1).max(80),
    warehouseCode: zod_1.z.string().min(1).max(40),
    name: zod_1.z.string().min(1).max(120),
    /** Null / omitted = company-owned warehouse. */
    vendorId: zod_1.z.string().min(1).max(80).nullable().optional(),
    addressLine1: zod_1.z.string().min(1).max(200),
    addressLine2: zod_1.z.string().max(200).optional().or(zod_1.z.literal("")),
    city: zod_1.z.string().min(1).max(120),
    stateOrRegion: zod_1.z.string().min(1).max(120),
    postalCode: zod_1.z.string().min(1).max(20),
    countryCode: exports.countryCodeSchema,
    /** Display exactly as configured (may be a local national number). */
    phone: zod_1.z.string().min(1).max(40),
    /** Digits-only helper for dialers / WhatsApp. */
    phoneNormalized: zod_1.z.string().max(20).optional().or(zod_1.z.literal("")),
    email: zod_1.z.string().email().optional().or(zod_1.z.literal("")),
    latitude: zod_1.z.number().min(-90).max(90).optional(),
    longitude: zod_1.z.number().min(-180).max(180).optional(),
    timezone: zod_1.z.string().min(1).max(80).default("UTC"),
    active: zod_1.z.boolean().default(true),
    fulfillmentEnabled: zod_1.z.boolean().default(true),
    pickupEnabled: zod_1.z.boolean().default(false),
    serviceArea: exports.warehouseServiceAreaSchema.default({
        countryCodes: [],
        stateOrRegionCodes: [],
        postalPrefixes: [],
        internationalShipping: false,
    }),
    priority: zod_1.z.number().int().min(0).max(1000).default(100),
    createdAt: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
});
exports.createWarehouseSchema = exports.warehouseSchema.omit({
    warehouseId: true,
    createdAt: true,
    updatedAt: true,
});
exports.updateWarehouseSchema = exports.createWarehouseSchema.partial();
exports.vendorUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string().max(120).optional(),
    role: zod_1.z.enum(["vendor_admin", "vendor_staff"]).default("vendor_admin"),
    active: zod_1.z.boolean().default(true),
});
exports.vendorSchema = zod_1.z.object({
    vendorId: zod_1.z.string().min(1).max(80),
    slug: zod_1.z.string().min(1).max(80),
    name: zod_1.z.string().min(1).max(120),
    countryCode: exports.countryCodeSchema,
    companyOwned: zod_1.z.boolean().default(false),
    active: zod_1.z.boolean().default(true),
    warehouseIds: zod_1.z.array(zod_1.z.string().min(1).max(80)).default([]),
    userEmails: zod_1.z.array(zod_1.z.string().email()).default([]),
    users: zod_1.z.array(exports.vendorUserSchema).default([]),
    contactEmail: zod_1.z.string().email().optional().or(zod_1.z.literal("")),
    contactPhone: zod_1.z.string().max(40).optional().or(zod_1.z.literal("")),
    notes: zod_1.z.string().max(2000).optional().or(zod_1.z.literal("")),
    /** Higher = preferred when multiple vendors can fulfill the same country. */
    priority: zod_1.z.number().int().min(0).max(1000).default(100),
    createdAt: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
});
exports.createVendorSchema = exports.vendorSchema.omit({
    vendorId: true,
    createdAt: true,
    updatedAt: true,
});
exports.updateVendorSchema = exports.createVendorSchema.partial();
exports.marketContactSchema = zod_1.z.object({
    phone: zod_1.z.string().max(40).optional().or(zod_1.z.literal("")),
    phoneNormalized: zod_1.z.string().max(20).optional().or(zod_1.z.literal("")),
    whatsapp: zod_1.z.string().max(20).optional().or(zod_1.z.literal("")),
    email: zod_1.z.string().email().optional().or(zod_1.z.literal("")),
    addressLine1: zod_1.z.string().max(200).optional().or(zod_1.z.literal("")),
    addressLine2: zod_1.z.string().max(200).optional().or(zod_1.z.literal("")),
    city: zod_1.z.string().max(120).optional().or(zod_1.z.literal("")),
    stateOrRegion: zod_1.z.string().max(120).optional().or(zod_1.z.literal("")),
    postalCode: zod_1.z.string().max(20).optional().or(zod_1.z.literal("")),
    countryCode: exports.countryCodeSchema.optional(),
});
exports.marketSchema = zod_1.z.object({
    countryCode: exports.countryCodeSchema,
    name: zod_1.z.string().min(1).max(80),
    slug: zod_1.z.string().min(2).max(40),
    active: zod_1.z.boolean().default(true),
    locale: zod_1.z.string().min(2).max(12).default("en-US"),
    /** Display currency for this market (checkout may still be USD/INR). */
    currency: zod_1.z.enum(exports.MARKET_CURRENCIES).default("USD"),
    checkoutCurrency: zod_1.z.enum(exports.CHECKOUT_CURRENCIES).default("USD"),
    flagEmoji: zod_1.z.string().max(8).default(""),
    postalLabel: zod_1.z.string().min(1).max(40).default("Postal code"),
    defaultWarehouseId: zod_1.z.string().min(1).max(80).optional().or(zod_1.z.literal("")),
    allowInternationalFallback: zod_1.z.boolean().default(true),
    contact: exports.marketContactSchema.default({}),
    hreflang: zod_1.z.string().min(2).max(12).optional(),
    createdAt: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
});
exports.createMarketSchema = exports.marketSchema.omit({ createdAt: true, updatedAt: true });
exports.updateMarketSchema = exports.createMarketSchema.partial().omit({ countryCode: true });
exports.inventoryListingSchema = zod_1.z.object({
    listingId: zod_1.z.string().min(1).max(120),
    productSlug: zod_1.z.string().min(1).max(200),
    vendorId: zod_1.z.string().min(1).max(80),
    warehouseId: zod_1.z.string().min(1).max(80),
    countryCode: exports.countryCodeSchema,
    sku: zod_1.z.string().max(80).optional().or(zod_1.z.literal("")),
    quantityAvailable: zod_1.z.number().int().min(0).default(0),
    quantityReserved: zod_1.z.number().int().min(0).default(0),
    reorderLevel: zod_1.z.number().int().min(0).default(10),
    sellingPriceOverride: zod_1.z.number().positive().optional(),
    processingDays: zod_1.z.number().int().min(0).max(60).default(1),
    active: zod_1.z.boolean().default(true),
    createdAt: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
});
exports.upsertInventoryListingSchema = exports.inventoryListingSchema.omit({
    listingId: true,
    createdAt: true,
    updatedAt: true,
});
exports.serviceabilityRequestSchema = zod_1.z.object({
    countryCode: exports.countryCodeSchema,
    postalCode: zod_1.z.string().trim().max(20).optional().or(zod_1.z.literal("")),
    productSlug: zod_1.z.string().min(1).max(200).optional(),
});
exports.fulfillmentSplitSchema = zod_1.z.object({
    vendorId: zod_1.z.string().min(1),
    warehouseId: zod_1.z.string().min(1),
    productSlugs: zod_1.z.array(zod_1.z.string().min(1)),
    fulfillmentCountry: exports.countryCodeSchema,
    routingReason: zod_1.z.string().max(200),
    estimatedDeliveryDays: zod_1.z.number().int().min(1).max(60).optional(),
});
exports.orderFulfillmentAssignmentSchema = zod_1.z.object({
    assignedVendorId: zod_1.z.string().min(1).optional(),
    assignedWarehouseId: zod_1.z.string().min(1).optional(),
    fulfillmentCountry: exports.countryCodeSchema.optional(),
    routingReason: zod_1.z.string().max(200).optional(),
    splits: zod_1.z.array(exports.fulfillmentSplitSchema).optional(),
});
exports.adminFulfillmentOverrideSchema = zod_1.z.object({
    assignedVendorId: zod_1.z.string().min(1).max(80).optional(),
    assignedWarehouseId: zod_1.z.string().min(1).max(80).optional(),
    routingReason: zod_1.z.string().max(200).optional(),
    note: zod_1.z.string().max(500).optional(),
});
exports.auditLogSchema = zod_1.z.object({
    auditId: zod_1.z.string().min(1),
    action: zod_1.z.string().min(1).max(80),
    actorEmail: zod_1.z.string().email().optional(),
    vendorId: zod_1.z.string().max(80).optional(),
    warehouseId: zod_1.z.string().max(80).optional(),
    orderId: zod_1.z.string().max(80).optional(),
    details: zod_1.z.string().max(2000).optional(),
    createdAt: zod_1.z.string(),
});
