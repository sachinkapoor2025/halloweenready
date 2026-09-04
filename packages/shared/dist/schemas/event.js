"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackEventBatchSchema = exports.trackEventSchema = exports.eventTypeEnum = void 0;
const zod_1 = require("zod");
const constants_1 = require("../constants");
exports.eventTypeEnum = zod_1.z.enum([
    constants_1.EVENT_TYPES.PAGE_VIEW,
    constants_1.EVENT_TYPES.PRODUCT_VIEW,
    constants_1.EVENT_TYPES.PRODUCT_IMPRESSION,
    constants_1.EVENT_TYPES.PRODUCT_CLICK,
    constants_1.EVENT_TYPES.SEARCH,
    constants_1.EVENT_TYPES.CART_ADD,
    constants_1.EVENT_TYPES.CART_REMOVE,
    constants_1.EVENT_TYPES.CHECKOUT_START,
    constants_1.EVENT_TYPES.PURCHASE,
    constants_1.EVENT_TYPES.SESSION_PING,
    constants_1.EVENT_TYPES.COUNTRY_CHANGED,
    constants_1.EVENT_TYPES.POSTAL_CODE_ENTERED,
    constants_1.EVENT_TYPES.CHAT_OPEN,
    constants_1.EVENT_TYPES.CHAT_CLOSE,
    constants_1.EVENT_TYPES.CHAT_MESSAGE,
]);
exports.trackEventSchema = zod_1.z.object({
    type: exports.eventTypeEnum,
    sessionId: zod_1.z.string().min(1),
    path: zod_1.z.string().max(512).optional(),
    productSlug: zod_1.z.string().max(256).optional(),
    query: zod_1.z.string().max(256).optional(),
    resultCount: zod_1.z.number().int().nonnegative().optional(),
    value: zod_1.z.number().nonnegative().optional(),
    referrer: zod_1.z.string().max(512).optional(),
    metadata: zod_1.z.record(zod_1.z.string()).optional(),
    at: zod_1.z.string().optional(),
});
/** Events are sent in batches to reduce request volume. */
exports.trackEventBatchSchema = zod_1.z.object({
    events: zod_1.z.array(exports.trackEventSchema).min(1).max(50),
});
