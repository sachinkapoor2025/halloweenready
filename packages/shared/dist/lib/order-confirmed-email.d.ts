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
export declare function buildOrderConfirmedEmailText(order: OrderConfirmedNotifyOrder): string;
export declare function buildOrderConfirmedWhatsAppMessage(order: OrderConfirmedNotifyOrder): string;
