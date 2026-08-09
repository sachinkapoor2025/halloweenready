import type { Order } from "../schemas/order";
/**
 * Last calendar day (America/New_York) to send pending-payment reminders.
 * Reminders send through this date inclusive; campaign stops after.
 */
export declare const PENDING_PAYMENT_REMINDER_END_DATE = "2026-08-28";
/** Wait before the first reminder so checkout isn't followed by an immediate nudge. */
export declare const PENDING_PAYMENT_REMINDER_MIN_AGE_MS: number;
/** YYYY-MM-DD in America/New_York. */
export declare function calendarDateKeyNy(date?: Date): string;
/** Inclusive: reminders run through end of Aug 28 NY time. */
export declare function isPendingPaymentReminderCampaignActive(now?: Date): boolean;
export declare function shouldSendPendingPaymentReminder(order: Pick<Order, "status" | "createdAt" | "pendingPaymentReminderLastSentAt" | "pendingPaymentReminderLastDateKey" | "shippingAddress">, now?: Date): boolean;
