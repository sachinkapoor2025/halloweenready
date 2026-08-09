"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkCreatePaymentLedgerSchema = exports.bulkPaymentLedgerRowSchema = exports.updatePaymentLedgerSchema = exports.createPaymentLedgerSchema = exports.PAYMENT_LEDGER_SOURCE_LABELS = exports.PAYMENT_LEDGER_SOURCES = void 0;
exports.currencyForPaymentSource = currencyForPaymentSource;
exports.paymentLedgerDuplicateKey = paymentLedgerDuplicateKey;
const zod_1 = require("zod");
const expense_1 = require("./expense");
exports.PAYMENT_LEDGER_SOURCES = ["stripe", "razorpay", "other"];
exports.PAYMENT_LEDGER_SOURCE_LABELS = {
    stripe: "Stripe",
    razorpay: "Razorpay",
    other: "Other",
};
/** Currency implied by payment source (Stripe→USD, Razorpay→INR). */
function currencyForPaymentSource(source, fallback = "USD") {
    if (source === "stripe")
        return "USD";
    if (source === "razorpay")
        return "INR";
    return fallback;
}
exports.createPaymentLedgerSchema = zod_1.z
    .object({
    /** Net amount credited by the gateway (after fees), when known. */
    amount: zod_1.z.number().positive(),
    /** Optional; overridden from paymentSource for stripe/razorpay. */
    currency: zod_1.z.enum(expense_1.LEDGER_CURRENCIES).optional(),
    receivedDate: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "receivedDate must be YYYY-MM-DD"),
    paymentSource: zod_1.z.enum(exports.PAYMENT_LEDGER_SOURCES),
    /** Optional gateway fee deducted for this settlement (when known from payout). */
    gatewayFee: zod_1.z.number().nonnegative().optional(),
    notes: zod_1.z.string().trim().max(2000).optional(),
})
    .transform((data) => ({
    ...data,
    currency: currencyForPaymentSource(data.paymentSource, data.currency ?? "USD"),
}));
exports.updatePaymentLedgerSchema = zod_1.z
    .object({
    amount: zod_1.z.number().positive().optional(),
    currency: zod_1.z.enum(expense_1.LEDGER_CURRENCIES).optional(),
    receivedDate: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "receivedDate must be YYYY-MM-DD")
        .optional(),
    paymentSource: zod_1.z.enum(exports.PAYMENT_LEDGER_SOURCES).optional(),
    gatewayFee: zod_1.z.number().nonnegative().optional(),
    notes: zod_1.z.string().trim().max(2000).optional(),
})
    .transform((data) => {
    if (!data.paymentSource)
        return data;
    return {
        ...data,
        currency: currencyForPaymentSource(data.paymentSource, data.currency ?? "USD"),
    };
});
/** One row from a Stripe/Razorpay settlement export (client-parsed). */
exports.bulkPaymentLedgerRowSchema = zod_1.z.object({
    amount: zod_1.z.number().positive(),
    receivedDate: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "receivedDate must be YYYY-MM-DD"),
    gatewayFee: zod_1.z.number().nonnegative().optional(),
    notes: zod_1.z.string().trim().max(2000).optional(),
    /** 1-based spreadsheet row for error reporting. */
    rowNumber: zod_1.z.number().int().positive().optional(),
});
exports.bulkCreatePaymentLedgerSchema = zod_1.z.object({
    paymentSource: zod_1.z.enum(exports.PAYMENT_LEDGER_SOURCES),
    rows: zod_1.z.array(exports.bulkPaymentLedgerRowSchema).min(1).max(500),
});
/** Duplicate key: same calendar date + amount (+ currency). */
function paymentLedgerDuplicateKey(receivedDate, amount, currency) {
    const rounded = Math.round(amount * 100) / 100;
    return `${receivedDate}|${currency}|${rounded.toFixed(2)}`;
}
