"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_SLUG_ALIASES = exports.FAST_SELLING_THRESHOLD = exports.LOW_STOCK_ALERT_EMAIL = exports.LOW_STOCK_THRESHOLD = exports.ORANGE_COUNTY_SALE_MARKUP = exports.ORANGE_COUNTY_LIST_MARKUP = exports.ORANGE_COUNTY_CATEGORY_SLUG = exports.VENDOR_CJ_DROPSHIPPING = exports.VENDOR_HALLOWEENREADY = exports.VENDOR_ORANGE_COUNTY = exports.ORANGE_COUNTY_PRODUCT_INVENTORY = exports.DEFAULT_PRODUCT_INVENTORY = exports.PAYMENT_PROVIDERS = exports.PAYMENT_REGIONS = exports.USER_ROLES = exports.EVENT_TTL_DAYS = exports.EVENT_TYPES = exports.ORDER_STATUS_TRANSITIONS = exports.ORDER_STATUS = void 0;
exports.categorySlugVariants = categorySlugVariants;
exports.ORDER_STATUS = {
    PENDING_PAYMENT: "pending_payment",
    PAID: "paid",
    ACCEPTED: "accepted",
    /** Paid order paused for review (fraud, underpricing, stock, etc.). */
    ON_HOLD: "on_hold",
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
        exports.ORDER_STATUS.ON_HOLD,
        exports.ORDER_STATUS.PROCESSING,
        exports.ORDER_STATUS.SHIPPED,
        exports.ORDER_STATUS.DELIVERED,
        exports.ORDER_STATUS.COMPLETE,
        exports.ORDER_STATUS.CANCELLED,
        exports.ORDER_STATUS.REFUNDED,
    ],
    [exports.ORDER_STATUS.ACCEPTED]: [
        exports.ORDER_STATUS.ON_HOLD,
        exports.ORDER_STATUS.PROCESSING,
        exports.ORDER_STATUS.SHIPPED,
        exports.ORDER_STATUS.DELIVERED,
        exports.ORDER_STATUS.COMPLETE,
        exports.ORDER_STATUS.CANCELLED,
        exports.ORDER_STATUS.REFUNDED,
    ],
    [exports.ORDER_STATUS.ON_HOLD]: [
        exports.ORDER_STATUS.ACCEPTED,
        exports.ORDER_STATUS.PROCESSING,
        exports.ORDER_STATUS.SHIPPED,
        exports.ORDER_STATUS.CANCELLED,
        exports.ORDER_STATUS.REFUNDED,
    ],
    [exports.ORDER_STATUS.PROCESSING]: [
        exports.ORDER_STATUS.ON_HOLD,
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
    /** Admin can revive a cancelled (non-refunded) order for fulfillment. */
    [exports.ORDER_STATUS.CANCELLED]: [
        exports.ORDER_STATUS.ON_HOLD,
        exports.ORDER_STATUS.ACCEPTED,
        exports.ORDER_STATUS.PROCESSING,
    ],
    [exports.ORDER_STATUS.REFUNDED]: [],
};
exports.EVENT_TYPES = {
    PAGE_VIEW: "page_view",
    PRODUCT_VIEW: "product_view",
    /** Listing card entered the viewport (prefer rollup-only writes). */
    PRODUCT_IMPRESSION: "product_impression",
    /** Listing card click through to PDP. */
    PRODUCT_CLICK: "product_click",
    SEARCH: "search",
    CART_ADD: "cart_add",
    CART_REMOVE: "cart_remove",
    CHECKOUT_START: "checkout_start",
    PURCHASE: "purchase",
    /** Time spent on a page before leave/navigation (metadata.durationMs). */
    SESSION_PING: "session_ping",
    COUNTRY_CHANGED: "country_changed",
    POSTAL_CODE_ENTERED: "postal_code_entered",
};
/** Raw analytics events expire after this many days (TTL); rollups are kept. */
exports.EVENT_TTL_DAYS = 90;
exports.USER_ROLES = {
    CUSTOMER: "customer",
    ADMIN: "admin",
    SUPER_ADMIN: "super-admin",
    VENDOR: "vendor",
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
/** Stock for Orange County hamper imports (keep cart-ready). */
exports.ORANGE_COUNTY_PRODUCT_INVENTORY = 500;
/**
 * Backend-only vendor key for hamper fulfillment API / order tagging.
 * Internal vendor stub — not shown on the HalloweenReady storefront.
 */
exports.VENDOR_ORANGE_COUNTY = "orange-county";
/** Default HalloweenReady fulfillment key (catalog lines without product.vendorSlug). */
exports.VENDOR_HALLOWEENREADY = "halloweenready";
/** CJ Dropshipping catalog + fulfillment vendor. */
exports.VENDOR_CJ_DROPSHIPPING = "cj-dropshipping";
/** Internal OC category slug stub (not used on HalloweenReady storefront). */
exports.ORANGE_COUNTY_CATEGORY_SLUG = "rakhi-hampers";
/**
 * Hamper pricing from vendor cost (Excel). Uses retail margin on selling price:
 *   sale price = cost × 2.0  → 50% margin before coupons  ((P−C)/P)
 *   list/compare-at = cost × 2.5 → sale badge (~20% off list)
 *
 * After spin-the-wheel 6–10% off sale price, net margin stays ~44–47%
 * (≈40–44%+ band at the higher discount end).
 */
exports.ORANGE_COUNTY_LIST_MARKUP = 2.5;
exports.ORANGE_COUNTY_SALE_MARKUP = 2.0;
/** Email restock alert when inventory drops to this level or below. */
exports.LOW_STOCK_THRESHOLD = 10;
exports.LOW_STOCK_ALERT_EMAIL = "dgv@mydgv.com";
/** Minimum units sold to show in "Fast Selling" section and badge. */
exports.FAST_SELLING_THRESHOLD = 10;
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
