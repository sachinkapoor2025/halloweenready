"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultShippingSettings = exports.shippingSettingsSchema = exports.festivalModeRangeSchema = exports.addressValidationResultSchema = exports.trackingStatusSchema = exports.labelResultSchema = exports.rateQuoteSchema = exports.DEFAULT_PACKAGE = exports.packageDetailsSchema = exports.originAddressSchema = exports.addressSchema = exports.DEFAULT_ENABLED_SERVICES = exports.USPS_MAIL_CLASSES = exports.RAKSHA_BANDHAN_FESTIVAL_DATE = exports.HALLOWEEN_FESTIVAL_DATE = void 0;
exports.estimatePackageFromItems = estimatePackageFromItems;
exports.productHasShippingDims = productHasShippingDims;
exports.selectRate = selectRate;
exports.mailClassDisplayName = mailClassDisplayName;
const zod_1 = require("zod");
/** Halloween 2026 — matches storefront countdown. */
exports.HALLOWEEN_FESTIVAL_DATE = "2026-10-31";
/** @deprecated Use HALLOWEEN_FESTIVAL_DATE */
exports.RAKSHA_BANDHAN_FESTIVAL_DATE = exports.HALLOWEEN_FESTIVAL_DATE;
exports.USPS_MAIL_CLASSES = {
    GROUND_ADVANTAGE: "USPS_GROUND_ADVANTAGE",
    PRIORITY_MAIL: "PRIORITY_MAIL",
    PRIORITY_MAIL_EXPRESS: "PRIORITY_MAIL_EXPRESS",
    FIRST_CLASS_PACKAGE_SERVICE: "FIRST-CLASS_PACKAGE_SERVICE",
};
exports.DEFAULT_ENABLED_SERVICES = {
    GROUND_ADVANTAGE: true,
    PRIORITY_MAIL: true,
    PRIORITY_MAIL_EXPRESS: false,
    FIRST_CLASS_PACKAGE_SERVICE: true,
};
exports.addressSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    line1: zod_1.z.string().min(1),
    line2: zod_1.z.string().optional(),
    city: zod_1.z.string().min(1),
    state: zod_1.z.string().min(1),
    postalCode: zod_1.z.string().min(1),
    country: zod_1.z.string().min(2).max(2),
    phone: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
});
/** Origin may be incomplete until admin configures fulfillment address. */
exports.originAddressSchema = zod_1.z.object({
    name: zod_1.z.string().default("HalloweenReady"),
    line1: zod_1.z.string().default(""),
    line2: zod_1.z.string().optional(),
    city: zod_1.z.string().default(""),
    state: zod_1.z.string().default(""),
    postalCode: zod_1.z.string().default(""),
    country: zod_1.z.string().min(2).max(2).default("US"),
    phone: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional().or(zod_1.z.literal("")),
});
exports.packageDetailsSchema = zod_1.z.object({
    weightOz: zod_1.z.number().positive(),
    lengthIn: zod_1.z.number().positive(),
    widthIn: zod_1.z.number().positive(),
    heightIn: zod_1.z.number().positive(),
});
exports.DEFAULT_PACKAGE = {
    weightOz: 8,
    lengthIn: 8,
    widthIn: 6,
    heightIn: 2,
};
exports.rateQuoteSchema = zod_1.z.object({
    rateId: zod_1.z.string(),
    mailClass: zod_1.z.string(),
    serviceName: zod_1.z.string(),
    price: zod_1.z.number(),
    currency: zod_1.z.literal("USD").default("USD"),
    estimatedDeliveryDate: zod_1.z.string().optional(),
    estimatedDeliveryDays: zod_1.z.number().optional(),
});
exports.labelResultSchema = zod_1.z.object({
    trackingNumber: zod_1.z.string(),
    labelPdfUrl: zod_1.z.string().optional(),
    labelCost: zod_1.z.number().optional(),
    mailClass: zod_1.z.string().optional(),
    serviceName: zod_1.z.string().optional(),
});
exports.trackingStatusSchema = zod_1.z.object({
    trackingNumber: zod_1.z.string(),
    status: zod_1.z.string(),
    statusDetail: zod_1.z.string().optional(),
    estimatedDeliveryDate: zod_1.z.string().optional(),
    events: zod_1.z
        .array(zod_1.z.object({
        date: zod_1.z.string(),
        description: zod_1.z.string(),
        location: zod_1.z.string().optional(),
    }))
        .optional(),
});
exports.addressValidationResultSchema = zod_1.z.object({
    valid: zod_1.z.boolean(),
    normalized: exports.addressSchema.partial().optional(),
    messages: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.festivalModeRangeSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    startDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    endDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    deliverByDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});
exports.shippingSettingsSchema = zod_1.z.object({
    provider: zod_1.z.enum(["usps", "shippo"]).default("usps"),
    defaultRatePriority: zod_1.z.enum(["cheapest", "fastest_by_date"]).default("cheapest"),
    deliverByDate: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .optional(),
    festivalModeRanges: zod_1.z.array(exports.festivalModeRangeSchema).default([]),
    enabledServices: zod_1.z
        .object({
        GROUND_ADVANTAGE: zod_1.z.boolean().default(true),
        PRIORITY_MAIL: zod_1.z.boolean().default(true),
        PRIORITY_MAIL_EXPRESS: zod_1.z.boolean().default(false),
        FIRST_CLASS_PACKAGE_SERVICE: zod_1.z.boolean().default(true),
    })
        .default(exports.DEFAULT_ENABLED_SERVICES),
    originAddress: exports.originAddressSchema,
    autoPurchaseOnPayment: zod_1.z.boolean().default(false),
    flatRateFallbackUsd: zod_1.z.number().positive().default(5.99),
    customerShippingMode: zod_1.z.enum(["free", "pass_through"]).default("free"),
    uspsBaseUrl: zod_1.z.string().url().optional(),
});
exports.defaultShippingSettings = {
    provider: "usps",
    defaultRatePriority: "cheapest",
    deliverByDate: exports.RAKSHA_BANDHAN_FESTIVAL_DATE,
    festivalModeRanges: [
        {
            name: "Halloween 2026",
            startDate: "2026-07-01",
            endDate: exports.RAKSHA_BANDHAN_FESTIVAL_DATE,
            deliverByDate: exports.RAKSHA_BANDHAN_FESTIVAL_DATE,
        },
    ],
    enabledServices: { ...exports.DEFAULT_ENABLED_SERVICES },
    originAddress: {
        name: "HalloweenReady",
        line1: "",
        city: "",
        state: "",
        postalCode: "",
        country: "US",
    },
    autoPurchaseOnPayment: false,
    flatRateFallbackUsd: 5.99,
    customerShippingMode: "free",
};
/** Sum weights (× qty) and use max of each dimension as floor; fall back to DEFAULT_PACKAGE. */
function estimatePackageFromItems(items) {
    if (!items.length)
        return { ...exports.DEFAULT_PACKAGE };
    let totalWeightOz = 0;
    let maxLength = 0;
    let maxWidth = 0;
    let maxHeight = 0;
    let hasWeight = false;
    let hasDims = false;
    for (const item of items) {
        const qty = item.quantity ?? 1;
        if (item.weightOz != null && item.weightOz > 0) {
            totalWeightOz += item.weightOz * qty;
            hasWeight = true;
        }
        if (item.lengthIn != null && item.lengthIn > 0) {
            maxLength = Math.max(maxLength, item.lengthIn);
            hasDims = true;
        }
        if (item.widthIn != null && item.widthIn > 0) {
            maxWidth = Math.max(maxWidth, item.widthIn);
            hasDims = true;
        }
        if (item.heightIn != null && item.heightIn > 0) {
            maxHeight = Math.max(maxHeight, item.heightIn);
            hasDims = true;
        }
    }
    return {
        weightOz: hasWeight ? totalWeightOz : exports.DEFAULT_PACKAGE.weightOz,
        lengthIn: hasDims ? Math.max(maxLength, exports.DEFAULT_PACKAGE.lengthIn) : exports.DEFAULT_PACKAGE.lengthIn,
        widthIn: hasDims ? Math.max(maxWidth, exports.DEFAULT_PACKAGE.widthIn) : exports.DEFAULT_PACKAGE.widthIn,
        heightIn: hasDims ? Math.max(maxHeight, exports.DEFAULT_PACKAGE.heightIn) : exports.DEFAULT_PACKAGE.heightIn,
    };
}
function productHasShippingDims(product) {
    return (product.weightOz != null &&
        product.weightOz > 0 &&
        product.lengthIn != null &&
        product.lengthIn > 0 &&
        product.widthIn != null &&
        product.widthIn > 0 &&
        product.heightIn != null &&
        product.heightIn > 0);
}
function mailClassToKey(mailClass) {
    const normalized = mailClass.toUpperCase().replace(/-/g, "_");
    for (const [key, value] of Object.entries(exports.USPS_MAIL_CLASSES)) {
        if (value === mailClass || value.replace(/-/g, "_") === normalized || key === normalized) {
            return key;
        }
    }
    return undefined;
}
function isQuoteEnabled(quote, settings) {
    const key = mailClassToKey(quote.mailClass);
    if (!key)
        return true;
    return settings.enabledServices[key] !== false;
}
function activeFestivalDeliverBy(settings, now) {
    const today = now.toISOString().slice(0, 10);
    for (const range of settings.festivalModeRanges) {
        if (today >= range.startDate && today <= range.endDate) {
            return { deliverByDate: range.deliverByDate, festivalName: range.name };
        }
    }
    return undefined;
}
function parseDateOnly(iso) {
    return new Date(`${iso.slice(0, 10)}T12:00:00.000Z`);
}
/** Pick best rate: festival deliver-by → priority mode → enabled services filter. */
function selectRate(quotes, settings, now = new Date()) {
    const enabled = quotes.filter((q) => isQuoteEnabled(q, settings));
    if (!enabled.length)
        return undefined;
    const festival = activeFestivalDeliverBy(settings, now);
    const deliverBy = festival?.deliverByDate ??
        (settings.defaultRatePriority === "fastest_by_date" ? settings.deliverByDate : undefined);
    const byPrice = [...enabled].sort((a, b) => a.price - b.price);
    if (deliverBy) {
        const deadline = parseDateOnly(deliverBy);
        const meeting = byPrice.filter((q) => {
            if (!q.estimatedDeliveryDate)
                return false;
            return parseDateOnly(q.estimatedDeliveryDate) <= deadline;
        });
        if (meeting.length)
            return meeting[0];
    }
    if (settings.defaultRatePriority === "fastest_by_date") {
        const withDates = enabled.filter((q) => q.estimatedDeliveryDate);
        if (withDates.length) {
            return [...withDates].sort((a, b) => parseDateOnly(a.estimatedDeliveryDate).getTime() -
                parseDateOnly(b.estimatedDeliveryDate).getTime())[0];
        }
    }
    return byPrice[0];
}
function mailClassDisplayName(mailClass) {
    const names = {
        USPS_GROUND_ADVANTAGE: "USPS Ground Advantage",
        PRIORITY_MAIL: "USPS Priority Mail",
        PRIORITY_MAIL_EXPRESS: "USPS Priority Mail Express",
        "FIRST-CLASS_PACKAGE_SERVICE": "USPS First-Class Package",
    };
    return names[mailClass] ?? mailClass.replace(/_/g, " ");
}
