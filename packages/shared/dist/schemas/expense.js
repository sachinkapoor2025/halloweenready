"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExpenseSchema = exports.createExpenseSchema = exports.EXPENSE_BILL_STATUS_LABELS = exports.EXPENSE_BILL_STATUSES = exports.EXPENSE_TYPE_LABELS = exports.EXPENSE_TYPES = exports.EXPENSE_MAX_BILL_IMAGES = exports.LEDGER_CURRENCIES = void 0;
exports.normalizeExpenseTypes = normalizeExpenseTypes;
exports.resolveBillStatus = resolveBillStatus;
exports.collectBillUrls = collectBillUrls;
const zod_1 = require("zod");
exports.LEDGER_CURRENCIES = ["USD", "INR"];
exports.EXPENSE_MAX_BILL_IMAGES = 10;
exports.EXPENSE_TYPES = [
    "shipping_charges",
    "inventory_purchase",
    "bills",
    "marketing",
    "office_expense",
    "other",
];
exports.EXPENSE_TYPE_LABELS = {
    shipping_charges: "Shipping Charges",
    inventory_purchase: "Inventory Purchase",
    bills: "Purchase Bills",
    marketing: "Marketing",
    office_expense: "Office Expense",
    other: "Other",
};
/** Bill availability for an expense. */
exports.EXPENSE_BILL_STATUSES = ["all_bills", "partial_bills", "no_bill"];
exports.EXPENSE_BILL_STATUS_LABELS = {
    all_bills: "I have all bills",
    partial_bills: "I have partial bills",
    no_bill: "This expense has no bill",
};
const billUrlSchema = zod_1.z.string().url();
function collectBillUrls(data) {
    return Array.from(new Set([
        ...(data.billImageUrls ?? []),
        ...(data.billImageUrl?.trim() ? [data.billImageUrl.trim()] : []),
    ].filter(Boolean)));
}
function resolveBillStatus(data) {
    if (data.billStatus)
        return data.billStatus;
    if (data.noBill)
        return "no_bill";
    return "all_bills";
}
const expenseTypeEnum = zod_1.z.enum(exports.EXPENSE_TYPES);
/** Normalize single + multi type fields into a unique ordered list. */
function normalizeExpenseTypes(input) {
    const fromMulti = (input.expenseTypes ?? []).filter(Boolean);
    const merged = fromMulti.length
        ? fromMulti
        : input.expenseType
            ? [input.expenseType]
            : [];
    const unique = [];
    for (const t of merged) {
        if (!unique.includes(t))
            unique.push(t);
    }
    return unique;
}
function refineExpenseTypes(data, ctx) {
    const types = normalizeExpenseTypes(data);
    if (types.length === 0) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Select at least one expense type",
            path: ["expenseTypes"],
        });
    }
}
exports.createExpenseSchema = zod_1.z
    .object({
    amount: zod_1.z.number().positive(),
    currency: zod_1.z.enum(exports.LEDGER_CURRENCIES).default("USD"),
    /** Primary type (first selected). Kept for older clients. */
    expenseType: expenseTypeEnum.optional(),
    /** Multi-select types (Shipping, Inventory, Purchase Bills, …). */
    expenseTypes: zod_1.z.array(expenseTypeEnum).min(1).max(exports.EXPENSE_TYPES.length).optional(),
    description: zod_1.z.string().trim().max(2000).optional(),
    expenseDate: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "expenseDate must be YYYY-MM-DD"),
    billStatus: zod_1.z.enum(exports.EXPENSE_BILL_STATUSES).optional(),
    /** @deprecated use billStatus === "no_bill" */
    noBill: zod_1.z.boolean().optional(),
    billImageUrls: zod_1.z.array(billUrlSchema).max(exports.EXPENSE_MAX_BILL_IMAGES).optional(),
    billImageUrl: zod_1.z.string().url().optional().or(zod_1.z.literal("")),
})
    .superRefine((data, ctx) => {
    refineExpenseTypes(data, ctx);
    const status = resolveBillStatus(data);
    const unique = collectBillUrls(data);
    if (status === "no_bill" && unique.length > 0) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Clear bill uploads when marking expense as having no bill",
            path: ["billStatus"],
        });
    }
    if (status !== "no_bill" && unique.length === 0) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Upload at least one bill, or select “This expense has no bill”",
            path: ["billImageUrls"],
        });
    }
    if (unique.length > exports.EXPENSE_MAX_BILL_IMAGES) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: `Maximum ${exports.EXPENSE_MAX_BILL_IMAGES} bill images allowed`,
            path: ["billImageUrls"],
        });
    }
});
exports.updateExpenseSchema = zod_1.z
    .object({
    amount: zod_1.z.number().positive().optional(),
    currency: zod_1.z.enum(exports.LEDGER_CURRENCIES).optional(),
    expenseType: expenseTypeEnum.optional(),
    expenseTypes: zod_1.z.array(expenseTypeEnum).min(1).max(exports.EXPENSE_TYPES.length).optional(),
    description: zod_1.z.string().trim().max(2000).optional(),
    expenseDate: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "expenseDate must be YYYY-MM-DD")
        .optional(),
    billStatus: zod_1.z.enum(exports.EXPENSE_BILL_STATUSES).optional(),
    noBill: zod_1.z.boolean().optional(),
    billImageUrls: zod_1.z.array(billUrlSchema).max(exports.EXPENSE_MAX_BILL_IMAGES).optional(),
    billImageUrl: zod_1.z.string().url().optional().or(zod_1.z.literal("")),
})
    .superRefine((data, ctx) => {
    if (data.expenseType !== undefined || data.expenseTypes !== undefined) {
        refineExpenseTypes(data, ctx);
    }
});
