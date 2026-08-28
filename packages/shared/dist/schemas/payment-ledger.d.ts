import { z } from "zod";
import { type LedgerCurrency } from "./expense";
export declare const PAYMENT_LEDGER_SOURCES: readonly ["stripe", "razorpay", "other"];
export type PaymentLedgerSource = (typeof PAYMENT_LEDGER_SOURCES)[number];
export declare const PAYMENT_LEDGER_SOURCE_LABELS: Record<PaymentLedgerSource, string>;
/** Currency implied by payment source (Stripe→USD, Razorpay→INR). */
export declare function currencyForPaymentSource(source: PaymentLedgerSource, fallback?: LedgerCurrency): LedgerCurrency;
export declare const createPaymentLedgerSchema: any;
export declare const updatePaymentLedgerSchema: any;
export type CreatePaymentLedgerInput = z.infer<typeof createPaymentLedgerSchema>;
export type UpdatePaymentLedgerInput = z.infer<typeof updatePaymentLedgerSchema>;
export type PaymentLedgerEntry = {
    paymentId: string;
    amount: number;
    currency: LedgerCurrency;
    receivedDate: string;
    paymentSource: PaymentLedgerSource;
    gatewayFee?: number;
    notes?: string;
    createdBy?: string;
    createdAt: string;
    updatedAt: string;
};
/** One row from a Stripe/Razorpay settlement export (client-parsed). */
export declare const bulkPaymentLedgerRowSchema: any;
export declare const bulkCreatePaymentLedgerSchema: any;
export type BulkPaymentLedgerRow = z.infer<typeof bulkPaymentLedgerRowSchema>;
export type BulkCreatePaymentLedgerInput = z.infer<typeof bulkCreatePaymentLedgerSchema>;
/** Duplicate key: same calendar date + amount (+ currency). */
export declare function paymentLedgerDuplicateKey(receivedDate: string, amount: number, currency: LedgerCurrency): string;
