"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ORDER_NOTIFY_EMAIL = exports.DEFAULT_ORDER_NOTIFY_EMAILS = exports.ORDER_SMTP_USER = void 0;
exports.parseNotifyEmails = parseNotifyEmails;
exports.staffOrderNotifyEmails = staffOrderNotifyEmails;
/** From-address / SMTP login for cart, payment, and order-status mail. */
exports.ORDER_SMTP_USER = "order@occasionfun.com";
/**
 * Staff copies of cart/checkout, paid, and status emails.
 * Always unioned with NOTIFY_EMAIL so a stale Lambda env cannot drop inboxes.
 */
exports.DEFAULT_ORDER_NOTIFY_EMAILS = [
    "order@occasionfun.com",
    "order@usarakhi.com",
    "priya.yadav@mydgv.com",
];
exports.DEFAULT_ORDER_NOTIFY_EMAIL = exports.DEFAULT_ORDER_NOTIFY_EMAILS.join(",");
function parseNotifyEmails(raw, fallback = exports.DEFAULT_ORDER_NOTIFY_EMAILS) {
    const source = raw?.trim() ? raw : fallback.join(",");
    const seen = new Set();
    const out = [];
    for (const part of source.split(/[,;]+/)) {
        const email = part.trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            continue;
        if (seen.has(email))
            continue;
        seen.add(email);
        out.push(email);
    }
    return out.length ? out : [...fallback];
}
/** Staff inboxes: env list plus the required HalloweenReady / UsaRakhi / Priya copies. */
function staffOrderNotifyEmails(envNotify) {
    return parseNotifyEmails([...parseNotifyEmails(envNotify), ...exports.DEFAULT_ORDER_NOTIFY_EMAILS].join(","));
}
