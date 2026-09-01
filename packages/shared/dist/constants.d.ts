export declare const ORDER_STATUS: {
    readonly PENDING_PAYMENT: "pending_payment";
    readonly PAID: "paid";
    readonly ACCEPTED: "accepted";
    /** Paid order paused for review (fraud, underpricing, stock, etc.). */
    readonly ON_HOLD: "on_hold";
    readonly PROCESSING: "processing";
    readonly SHIPPED: "shipped";
    readonly DELIVERED: "delivered";
    readonly COMPLETE: "complete";
    readonly CANCELLED: "cancelled";
    readonly REFUNDED: "refunded";
};
/** Allowed next statuses an admin can move an order to from its current status. */
export declare const ORDER_STATUS_TRANSITIONS: Record<string, string[]>;
export declare const EVENT_TYPES: {
    readonly PAGE_VIEW: "page_view";
    readonly PRODUCT_VIEW: "product_view";
    readonly SEARCH: "search";
    readonly CART_ADD: "cart_add";
    readonly CART_REMOVE: "cart_remove";
    readonly CHECKOUT_START: "checkout_start";
    readonly PURCHASE: "purchase";
    /** Time spent on a page before leave/navigation (metadata.durationMs). */
    readonly SESSION_PING: "session_ping";
    readonly COUNTRY_CHANGED: "country_changed";
    readonly POSTAL_CODE_ENTERED: "postal_code_entered";
};
export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];
/** Raw analytics events expire after this many days (TTL); rollups are kept. */
export declare const EVENT_TTL_DAYS = 90;
export declare const USER_ROLES: {
    readonly CUSTOMER: "customer";
    readonly ADMIN: "admin";
    readonly SUPER_ADMIN: "super-admin";
    readonly VENDOR: "vendor";
};
export declare const PAYMENT_REGIONS: {
    readonly US: "US";
    readonly IN: "IN";
};
export declare const PAYMENT_PROVIDERS: {
    readonly STRIPE: "stripe";
    readonly RAZORPAY: "razorpay";
};
/** Default stock when creating products or seeding catalog. */
export declare const DEFAULT_PRODUCT_INVENTORY = 200;
/** Stock for Orange County hamper imports (keep cart-ready). */
export declare const ORANGE_COUNTY_PRODUCT_INVENTORY = 500;
/**
 * Backend-only vendor key for hamper fulfillment API / order tagging.
 * Internal vendor stub — not shown on the HalloweenReady storefront.
 */
export declare const VENDOR_ORANGE_COUNTY: "orange-county";
/** Default HalloweenReady fulfillment key (catalog lines without product.vendorSlug). */
export declare const VENDOR_HALLOWEENREADY: "halloweenready";
/** CJ Dropshipping catalog + fulfillment vendor. */
export declare const VENDOR_CJ_DROPSHIPPING: "cj-dropshipping";
/** Internal OC category slug stub (not used on HalloweenReady storefront). */
export declare const ORANGE_COUNTY_CATEGORY_SLUG: "rakhi-hampers";
/**
 * Hamper pricing from vendor cost (Excel). Uses retail margin on selling price:
 *   sale price = cost × 2.0  → 50% margin before coupons  ((P−C)/P)
 *   list/compare-at = cost × 2.5 → sale badge (~20% off list)
 *
 * After spin-the-wheel 6–10% off sale price, net margin stays ~44–47%
 * (≈40–44%+ band at the higher discount end).
 */
export declare const ORANGE_COUNTY_LIST_MARKUP = 2.5;
export declare const ORANGE_COUNTY_SALE_MARKUP = 2;
/** Email restock alert when inventory drops to this level or below. */
export declare const LOW_STOCK_THRESHOLD = 10;
export declare const LOW_STOCK_ALERT_EMAIL = "dgv@mydgv.com";
/** Minimum units sold to show in "Fast Selling" section and badge. */
export declare const FAST_SELLING_THRESHOLD = 10;
export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type PaymentRegion = (typeof PAYMENT_REGIONS)[keyof typeof PAYMENT_REGIONS];
export type PaymentProvider = (typeof PAYMENT_PROVIDERS)[keyof typeof PAYMENT_PROVIDERS];
export declare const CATEGORY_SLUG_ALIASES: Record<string, string[]>;
export declare function categorySlugVariants(slug: string): string[];
