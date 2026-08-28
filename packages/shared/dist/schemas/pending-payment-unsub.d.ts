import { z } from "zod";
export declare const pendingPaymentUnsubscribeSchema: any;
export type PendingPaymentUnsubscribeInput = z.infer<typeof pendingPaymentUnsubscribeSchema>;
export type PendingPaymentUnsubRecord = {
    email: string;
    unsubscribedAt: string;
    source: "payment_reminder";
};
