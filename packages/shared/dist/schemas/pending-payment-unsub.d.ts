import { z } from "zod";
export declare const pendingPaymentUnsubscribeSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export type PendingPaymentUnsubscribeInput = z.infer<typeof pendingPaymentUnsubscribeSchema>;
export type PendingPaymentUnsubRecord = {
    email: string;
    unsubscribedAt: string;
    source: "payment_reminder";
};
