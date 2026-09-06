/** From-address / SMTP login for cart, payment, and order-status mail. */
export declare const ORDER_SMTP_USER = "order@occasionfun.com";
/**
 * Staff copies of cart/checkout, paid, and status emails.
 * Always unioned with NOTIFY_EMAIL so a stale Lambda env cannot drop inboxes.
 */
export declare const DEFAULT_ORDER_NOTIFY_EMAILS: readonly ["order@occasionfun.com", "order@usarakhi.com", "priya.yadav@mydgv.com"];
export declare const DEFAULT_ORDER_NOTIFY_EMAIL: string;
export declare function parseNotifyEmails(raw: string | undefined, fallback?: readonly string[]): string[];
/** Staff inboxes: env list plus the required HalloweenReady / UsaRakhi / Priya copies. */
export declare function staffOrderNotifyEmails(envNotify?: string): string[];
