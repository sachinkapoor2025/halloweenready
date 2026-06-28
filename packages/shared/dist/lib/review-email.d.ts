import type { Order } from "../schemas/order";
/** Days after delivery before asking for a review. */
export declare const REVIEW_EMAIL_DELAY_DAYS = 1;
export declare const REVIEW_EMAIL_DELAY_MS: number;
export declare function isDeliveredStatus(status: string): boolean;
export declare function reviewEmailDueAtFrom(deliveredAtIso: string): string;
/** Resolve when a review email should send (for backfill on older orders). */
export declare function resolveReviewEmailDueAt(order: Pick<Order, "status" | "deliveredAt" | "reviewEmailDueAt" | "reviewEmailSentAt" | "statusHistory">): string | null;
export declare function isReviewEmailDue(order: Pick<Order, "status" | "deliveredAt" | "reviewEmailDueAt" | "reviewEmailSentAt" | "statusHistory">, now?: Date): boolean;
