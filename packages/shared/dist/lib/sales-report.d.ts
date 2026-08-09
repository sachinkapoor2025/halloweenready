import type { Order } from "../schemas/order";
/** Order statuses that count as received payment (excludes pending, cancelled, refunded). */
export declare const REVENUE_ORDER_STATUSES: readonly ["paid", "accepted", "on_hold", "processing", "shipped", "delivered", "complete"];
export type RevenueOrderStatus = (typeof REVENUE_ORDER_STATUSES)[number];
export declare function isRevenueOrder(status: string): boolean;
/** When payment was received — paid status history entry or createdAt fallback. */
export declare function getOrderPaidAt(order: Pick<Order, "status" | "createdAt" | "statusHistory">): string | null;
export type SalesPeriod = "day" | "week" | "month";
export type SalesOrderRow = {
    orderId: string;
    paidAt: string;
    customerName: string;
    email: string;
    total: number;
    currency: "USD" | "INR";
    status: string;
    paymentProvider?: string;
    itemCount: number;
};
export type SalesBucket = {
    label: string;
    date: string;
    orderCount: number;
    revenueUSD: number;
    revenueINR: number;
};
export type SalesPeriodReport = {
    period: SalesPeriod;
    label: string;
    from: string;
    to: string;
    orderCount: number;
    revenueUSD: number;
    revenueINR: number;
    excluded: {
        refunded: number;
        cancelled: number;
        pendingPayment: number;
    };
    breakdown: SalesBucket[];
    orders: SalesOrderRow[];
};
export type SalesReportResponse = {
    generatedAt: string;
    day: SalesPeriodReport;
    week: SalesPeriodReport;
    month: SalesPeriodReport;
};
export declare function periodRange(period: SalesPeriod, now?: Date): {
    from: Date;
    to: Date;
    label: string;
};
export declare function addToRevenue(totals: {
    USD: number;
    INR: number;
}, currency: "USD" | "INR", amount: number): void;
