/**
 * Order Confirmed transactional email + WhatsApp copy.
 * Table + inline CSS for Gmail / Outlook / Apple Mail. No emoji.
 * All customer/order values come from the order — nothing is hardcoded.
 */
export type OrderConfirmedLineAddon = {
    name: string;
    price: number;
    quantity: number;
};
export type OrderConfirmedLineItem = {
    name: string;
    quantity: number;
    price: number;
    image?: string;
    description?: string;
    productSlug?: string;
    addons?: OrderConfirmedLineAddon[];
};
export type OrderConfirmedNotifyOrder = {
    orderId: string;
    orderNumber?: string | null;
    currency: string;
    subtotal: number;
    shipping?: number;
    tax?: number;
    discount?: number;
    couponCode?: string;
    total: number;
    items: OrderConfirmedLineItem[];
    shippingAddress?: {
        name?: string;
        email?: string;
        phone?: string;
    } | null;
};
/** True when admin moved the order into Confirmed (stored as `accepted`). */
export declare function shouldSendOrderConfirmedNotification(previousStatus: string, nextStatus: string): boolean;
export declare function isOrderConfirmedStatus(status: string): boolean;
export declare function isDeliveredNotifyStatus(status: string): boolean;
/** Statuses that email automatically and expose a manual Admin WhatsApp deep-link. */
export declare function isManualWhatsAppStatus(status: string): boolean;
export declare function shouldSendOrderDeliveredNotification(previousStatus: string, nextStatus: string): boolean;
export declare const ORDER_CONFIRMED_HEADING = "Your Order is Confirmed!";
export declare const ORDER_DELIVERED_HEADING = "Your Order Has Been Delivered!";
export declare const ORDER_COMPLETE_HEADING = "Your Order is Complete!";
export declare const ORDER_REVIEW_HEADING = "We Value Your Feedback!";
export declare const ORDER_REVIEW_CTA = "Write a Review";
export declare const ORDER_SEO_BLURB = "OccasionFun ships Gifts, party supplies, and everyday products worldwide. Shoppers trust us for quality party supplies, secure checkout, and delivery across 200 countries in 5\u20139 days.";
export type DeliveredNotifyKind = "delivered" | "complete";
export declare function orderReviewUrl(): string;
export declare function customerPhoneDigits(phone?: string | null): string;
export declare function customerWhatsAppDeepLink(phone: string | undefined | null, message: string): string | null;
export declare function siteBaseUrl(): string;
export declare function formatOrderMoney(amount: number, currency: string): string;
export declare function customerFirstName(order: OrderConfirmedNotifyOrder): string;
export declare function customerFullName(order: OrderConfirmedNotifyOrder): string;
export declare function lineUnitPrice(item: OrderConfirmedLineItem): number;
export declare function lineTotal(item: OrderConfirmedLineItem): number;
/** Strip HTML and collapse whitespace; optional max length for email snippets. */
export declare function plainProductDescription(raw: string | undefined | null, max?: number): string | undefined;
export declare function orderConfirmedSubject(order: OrderConfirmedNotifyOrder): string;
export declare function orderConfirmedPreheader(order: OrderConfirmedNotifyOrder): string;
export declare function buildOrderConfirmedEmailHtml(order: OrderConfirmedNotifyOrder): string;
export declare function orderDeliveredSubject(order: OrderConfirmedNotifyOrder, kind: DeliveredNotifyKind): string;
export declare function buildOrderDeliveredEmailHtml(order: OrderConfirmedNotifyOrder, kind?: DeliveredNotifyKind): string;
export declare function buildOrderDeliveredEmailText(order: OrderConfirmedNotifyOrder, kind?: DeliveredNotifyKind): string;
export declare function buildOrderDeliveredWhatsAppMessage(order: OrderConfirmedNotifyOrder, kind?: DeliveredNotifyKind): string;
export declare function orderStatusWhatsAppDeepLink(order: OrderConfirmedNotifyOrder & {
    status: string;
}): string | null;
export declare function buildOrderConfirmedEmailText(order: OrderConfirmedNotifyOrder): string;
export declare function buildOrderConfirmedWhatsAppMessage(order: OrderConfirmedNotifyOrder): string;
