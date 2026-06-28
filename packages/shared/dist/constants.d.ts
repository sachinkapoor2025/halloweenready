export declare const ORDER_STATUS: {
    readonly PENDING_PAYMENT: "pending_payment";
    readonly PAID: "paid";
    readonly ACCEPTED: "accepted";
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
};
export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];
/** Raw analytics events expire after this many days (TTL); rollups are kept. */
export declare const EVENT_TTL_DAYS = 90;
export declare const USER_ROLES: {
    readonly CUSTOMER: "customer";
    readonly ADMIN: "admin";
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
/** Email restock alert when inventory drops to this level or below. */
export declare const LOW_STOCK_THRESHOLD = 10;
export declare const LOW_STOCK_ALERT_EMAIL = "dgv@mydgv.com";
/** Minimum units sold to show in "Fast Selling" section and badge. */
export declare const FAST_SELLING_THRESHOLD = 10;
/** WooCommerce slugs on halloweenready.com plus legacy app slugs. */
export declare const CATEGORY_SLUG_ALIASES: Record<string, string[]>;
export declare function categorySlugVariants(slug: string): string[];
export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type PaymentRegion = (typeof PAYMENT_REGIONS)[keyof typeof PAYMENT_REGIONS];
export type PaymentProvider = (typeof PAYMENT_PROVIDERS)[keyof typeof PAYMENT_PROVIDERS];
