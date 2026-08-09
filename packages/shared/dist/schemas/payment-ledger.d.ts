import { z } from "zod";
import { type LedgerCurrency } from "./expense";
export declare const PAYMENT_LEDGER_SOURCES: readonly ["stripe", "razorpay", "other"];
export type PaymentLedgerSource = (typeof PAYMENT_LEDGER_SOURCES)[number];
export declare const PAYMENT_LEDGER_SOURCE_LABELS: Record<PaymentLedgerSource, string>;
/** Currency implied by payment source (Stripe→USD, Razorpay→INR). */
export declare function currencyForPaymentSource(source: PaymentLedgerSource, fallback?: LedgerCurrency): LedgerCurrency;
export declare const createPaymentLedgerSchema: z.ZodEffects<z.ZodObject<{
    /** Net amount credited by the gateway (after fees), when known. */
    amount: z.ZodNumber;
    /** Optional; overridden from paymentSource for stripe/razorpay. */
    currency: z.ZodOptional<z.ZodEnum<["USD", "INR"]>>;
    receivedDate: z.ZodString;
    paymentSource: z.ZodEnum<["stripe", "razorpay", "other"]>;
    /** Optional gateway fee deducted for this settlement (when known from payout). */
    gatewayFee: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    receivedDate: string;
    paymentSource: "stripe" | "razorpay" | "other";
    currency?: "USD" | "INR" | undefined;
    gatewayFee?: number | undefined;
    notes?: string | undefined;
}, {
    amount: number;
    receivedDate: string;
    paymentSource: "stripe" | "razorpay" | "other";
    currency?: "USD" | "INR" | undefined;
    gatewayFee?: number | undefined;
    notes?: string | undefined;
}>, {
    currency: "USD" | "INR";
    amount: number;
    receivedDate: string;
    paymentSource: "stripe" | "razorpay" | "other";
    gatewayFee?: number | undefined;
    notes?: string | undefined;
}, {
    amount: number;
    receivedDate: string;
    paymentSource: "stripe" | "razorpay" | "other";
    currency?: "USD" | "INR" | undefined;
    gatewayFee?: number | undefined;
    notes?: string | undefined;
}>;
export declare const updatePaymentLedgerSchema: z.ZodEffects<z.ZodObject<{
    amount: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodOptional<z.ZodEnum<["USD", "INR"]>>;
    receivedDate: z.ZodOptional<z.ZodString>;
    paymentSource: z.ZodOptional<z.ZodEnum<["stripe", "razorpay", "other"]>>;
    gatewayFee: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    currency?: "USD" | "INR" | undefined;
    amount?: number | undefined;
    receivedDate?: string | undefined;
    paymentSource?: "stripe" | "razorpay" | "other" | undefined;
    gatewayFee?: number | undefined;
    notes?: string | undefined;
}, {
    currency?: "USD" | "INR" | undefined;
    amount?: number | undefined;
    receivedDate?: string | undefined;
    paymentSource?: "stripe" | "razorpay" | "other" | undefined;
    gatewayFee?: number | undefined;
    notes?: string | undefined;
}>, {
    currency?: "USD" | "INR" | undefined;
    amount?: number | undefined;
    receivedDate?: string | undefined;
    paymentSource?: "stripe" | "razorpay" | "other" | undefined;
    gatewayFee?: number | undefined;
    notes?: string | undefined;
}, {
    currency?: "USD" | "INR" | undefined;
    amount?: number | undefined;
    receivedDate?: string | undefined;
    paymentSource?: "stripe" | "razorpay" | "other" | undefined;
    gatewayFee?: number | undefined;
    notes?: string | undefined;
}>;
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
export declare const bulkPaymentLedgerRowSchema: z.ZodObject<{
    amount: z.ZodNumber;
    receivedDate: z.ZodString;
    gatewayFee: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
    /** 1-based spreadsheet row for error reporting. */
    rowNumber: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    receivedDate: string;
    gatewayFee?: number | undefined;
    notes?: string | undefined;
    rowNumber?: number | undefined;
}, {
    amount: number;
    receivedDate: string;
    gatewayFee?: number | undefined;
    notes?: string | undefined;
    rowNumber?: number | undefined;
}>;
export declare const bulkCreatePaymentLedgerSchema: z.ZodObject<{
    paymentSource: z.ZodEnum<["stripe", "razorpay", "other"]>;
    rows: z.ZodArray<z.ZodObject<{
        amount: z.ZodNumber;
        receivedDate: z.ZodString;
        gatewayFee: z.ZodOptional<z.ZodNumber>;
        notes: z.ZodOptional<z.ZodString>;
        /** 1-based spreadsheet row for error reporting. */
        rowNumber: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        receivedDate: string;
        gatewayFee?: number | undefined;
        notes?: string | undefined;
        rowNumber?: number | undefined;
    }, {
        amount: number;
        receivedDate: string;
        gatewayFee?: number | undefined;
        notes?: string | undefined;
        rowNumber?: number | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    paymentSource: "stripe" | "razorpay" | "other";
    rows: {
        amount: number;
        receivedDate: string;
        gatewayFee?: number | undefined;
        notes?: string | undefined;
        rowNumber?: number | undefined;
    }[];
}, {
    paymentSource: "stripe" | "razorpay" | "other";
    rows: {
        amount: number;
        receivedDate: string;
        gatewayFee?: number | undefined;
        notes?: string | undefined;
        rowNumber?: number | undefined;
    }[];
}>;
export type BulkPaymentLedgerRow = z.infer<typeof bulkPaymentLedgerRowSchema>;
export type BulkCreatePaymentLedgerInput = z.infer<typeof bulkCreatePaymentLedgerSchema>;
/** Duplicate key: same calendar date + amount (+ currency). */
export declare function paymentLedgerDuplicateKey(receivedDate: string, amount: number, currency: LedgerCurrency): string;
