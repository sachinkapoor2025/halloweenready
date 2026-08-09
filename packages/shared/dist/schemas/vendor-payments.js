"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVendorPayoutSchema = exports.createVendorPayoutSchema = exports.VENDOR_PAYOUT_METHOD_LABELS = exports.VENDOR_PAYOUT_METHODS = exports.VENDOR_PAYMENT_SLUG_LABELS = exports.VENDOR_PAYMENT_SLUGS = void 0;
const zod_1 = require("zod");
const constants_1 = require("../constants");
const expense_1 = require("./expense");
/** Vendors we track payouts for (extend as new vendors onboard). */
exports.VENDOR_PAYMENT_SLUGS = [constants_1.VENDOR_ORANGE_COUNTY];
exports.VENDOR_PAYMENT_SLUG_LABELS = {
    [constants_1.VENDOR_ORANGE_COUNTY]: "Orange County",
};
exports.VENDOR_PAYOUT_METHODS = [
    "bank_transfer",
    "wire",
    "zelle",
    "venmo",
    "upi",
    "cash",
    "other",
];
exports.VENDOR_PAYOUT_METHOD_LABELS = {
    bank_transfer: "Bank transfer",
    wire: "Wire",
    zelle: "Zelle",
    venmo: "Venmo",
    upi: "UPI",
    cash: "Cash",
    other: "Other",
};
exports.createVendorPayoutSchema = zod_1.z.object({
    vendorSlug: zod_1.z.enum(exports.VENDOR_PAYMENT_SLUGS).default(constants_1.VENDOR_ORANGE_COUNTY),
    amount: zod_1.z.number().positive(),
    currency: zod_1.z.enum(expense_1.LEDGER_CURRENCIES).default("USD"),
    paidDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "paidDate must be YYYY-MM-DD"),
    paymentMethod: zod_1.z.enum(exports.VENDOR_PAYOUT_METHODS).default("bank_transfer"),
    /** Optional human order numbers / UUIDs this payment covers. */
    orderIds: zod_1.z.array(zod_1.z.string().min(1).max(80)).max(200).optional(),
    notes: zod_1.z.string().trim().max(2000).optional(),
    reference: zod_1.z.string().trim().max(120).optional(),
});
exports.updateVendorPayoutSchema = zod_1.z.object({
    amount: zod_1.z.number().positive().optional(),
    currency: zod_1.z.enum(expense_1.LEDGER_CURRENCIES).optional(),
    paidDate: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "paidDate must be YYYY-MM-DD")
        .optional(),
    paymentMethod: zod_1.z.enum(exports.VENDOR_PAYOUT_METHODS).optional(),
    orderIds: zod_1.z.array(zod_1.z.string().min(1).max(80)).max(200).optional(),
    notes: zod_1.z.string().trim().max(2000).optional(),
    reference: zod_1.z.string().trim().max(120).optional(),
});
