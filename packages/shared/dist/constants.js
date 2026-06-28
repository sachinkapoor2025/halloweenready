"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_SLUG_ALIASES = exports.FAST_SELLING_THRESHOLD = exports.LOW_STOCK_ALERT_EMAIL = exports.LOW_STOCK_THRESHOLD = exports.DEFAULT_PRODUCT_INVENTORY = exports.PAYMENT_PROVIDERS = exports.PAYMENT_REGIONS = exports.USER_ROLES = exports.EVENT_TTL_DAYS = exports.EVENT_TYPES = exports.ORDER_STATUS_TRANSITIONS = exports.ORDER_STATUS = void 0;
exports.categorySlugVariants = categorySlugVariants;
exports.ORDER_STATUS = {
    PENDING_PAYMENT: "pending_payment",
    PAID: "paid",
    ACCEPTED: "accepted",
    PROCESSING: "processing",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    COMPLETE: "complete",
    CANCELLED: "cancelled",
    REFUNDED: "refunded",
};
/** Allowed next statuses an admin can move an order to from its current status. */
exports.ORDER_STATUS_TRANSITIONS = {
    [exports.ORDER_STATUS.PENDING_PAYMENT]: [exports.ORDER_STATUS.PAID, exports.ORDER_STATUS.CANCELLED],
    [exports.ORDER_STATUS.PAID]: [
        exports.ORDER_STATUS.ACCEPTED,
        exports.ORDER_STATUS.PROCESSING,
        exports.ORDER_STATUS.SHIPPED,
        exports.ORDER_STATUS.DELIVERED,
        exports.ORDER_STATUS.COMPLETE,
        exports.ORDER_STATUS.CANCELLED,
        exports.ORDER_STATUS.REFUNDED,
    ],
    [exports.ORDER_STATUS.ACCEPTED]: [
        exports.ORDER_STATUS.PROCESSING,
        exports.ORDER_STATUS.SHIPPED,
        exports.ORDER_STATUS.DELIVERED,
        exports.ORDER_STATUS.COMPLETE,
        exports.ORDER_STATUS.CANCELLED,
        exports.ORDER_STATUS.REFUNDED,
    ],
    [exports.ORDER_STATUS.PROCESSING]: [
        exports.ORDER_STATUS.SHIPPED,
        exports.ORDER_STATUS.DELIVERED,
        exports.ORDER_STATUS.COMPLETE,
        exports.ORDER_STATUS.CANCELLED,
        exports.ORDER_STATUS.REFUNDED,
    ],
    [exports.ORDER_STATUS.SHIPPED]: [
        exports.ORDER_STATUS.DELIVERED,
        exports.ORDER_STATUS.COMPLETE,
        exports.ORDER_STATUS.REFUNDED,
    ],
    [exports.ORDER_STATUS.DELIVERED]: [exports.ORDER_STATUS.COMPLETE, exports.ORDER_STATUS.REFUNDED],
    [exports.ORDER_STATUS.COMPLETE]: [exports.ORDER_STATUS.REFUNDED],
    [exports.ORDER_STATUS.CANCELLED]: [],
    [exports.ORDER_STATUS.REFUNDED]: [],
};
exports.EVENT_TYPES = {
    PAGE_VIEW: "page_view",
    PRODUCT_VIEW: "product_view",
    SEARCH: "search",
    CART_ADD: "cart_add",
    CART_REMOVE: "cart_remove",
    CHECKOUT_START: "checkout_start",
    PURCHASE: "purchase",
};
/** Raw analytics events expire after this many days (TTL); rollups are kept. */
exports.EVENT_TTL_DAYS = 90;
exports.USER_ROLES = {
    CUSTOMER: "customer",
    ADMIN: "admin",
};
exports.PAYMENT_REGIONS = {
    US: "US",
    IN: "IN",
};
exports.PAYMENT_PROVIDERS = {
    STRIPE: "stripe",
    RAZORPAY: "razorpay",
};
/** Default stock when creating products or seeding catalog. */
exports.DEFAULT_PRODUCT_INVENTORY = 200;
/** Email restock alert when inventory drops to this level or below. */
exports.LOW_STOCK_THRESHOLD = 10;
exports.LOW_STOCK_ALERT_EMAIL = "dgv@mydgv.com";
/** Minimum units sold to show in "Fast Selling" section and badge. */
exports.FAST_SELLING_THRESHOLD = 10;
/** WooCommerce slugs on halloweenready.com plus legacy app slugs. */
exports.CATEGORY_SLUG_ALIASES = {
    "home-decoration": ["home-decoration", "decorations"],
    costumesandaccessories: ["costumesandaccessories", "costumes", "accessories"],
    partysupplier: ["partysupplier", "party-supplies"],
    toysandnovelty: ["toysandnovelty"],
    candlesandfragrance: ["candlesandfragrance"],
    jewellryandaccessories: ["jewellryandaccessories"],
    lifestyleandwearable: ["lifestyleandwearable"],
    printedandpapercrafts: ["printedandpapercrafts"],
    decorations: ["home-decoration", "decorations"],
    costumes: ["costumesandaccessories", "costumes"],
    "party-supplies": ["partysupplier", "party-supplies"],
    "candy-treats": ["partysupplier", "candy-treats"],
    accessories: ["costumesandaccessories", "jewellryandaccessories", "accessories"],
};
function categorySlugVariants(slug) {
    const variants = exports.CATEGORY_SLUG_ALIASES[slug];
    return variants ? [...new Set([slug, ...variants])] : [slug];
}
