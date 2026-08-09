import { z } from "zod";
export declare const LEDGER_CURRENCIES: readonly ["USD", "INR"];
export type LedgerCurrency = (typeof LEDGER_CURRENCIES)[number];
export declare const EXPENSE_MAX_BILL_IMAGES = 10;
export declare const EXPENSE_TYPES: readonly ["shipping_charges", "inventory_purchase", "bills", "marketing", "office_expense", "other"];
export type ExpenseType = (typeof EXPENSE_TYPES)[number];
export declare const EXPENSE_TYPE_LABELS: Record<ExpenseType, string>;
/** Bill availability for an expense. */
export declare const EXPENSE_BILL_STATUSES: readonly ["all_bills", "partial_bills", "no_bill"];
export type ExpenseBillStatus = (typeof EXPENSE_BILL_STATUSES)[number];
export declare const EXPENSE_BILL_STATUS_LABELS: Record<ExpenseBillStatus, string>;
declare function collectBillUrls(data: {
    billImageUrls?: string[];
    billImageUrl?: string;
}): string[];
declare function resolveBillStatus(data: {
    billStatus?: ExpenseBillStatus;
    noBill?: boolean;
}): ExpenseBillStatus;
/** Normalize single + multi type fields into a unique ordered list. */
export declare function normalizeExpenseTypes(input: {
    expenseType?: ExpenseType;
    expenseTypes?: ExpenseType[];
}): ExpenseType[];
export declare const createExpenseSchema: z.ZodEffects<z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodDefault<z.ZodEnum<["USD", "INR"]>>;
    /** Primary type (first selected). Kept for older clients. */
    expenseType: z.ZodOptional<z.ZodEnum<["shipping_charges", "inventory_purchase", "bills", "marketing", "office_expense", "other"]>>;
    /** Multi-select types (Shipping, Inventory, Purchase Bills, …). */
    expenseTypes: z.ZodOptional<z.ZodArray<z.ZodEnum<["shipping_charges", "inventory_purchase", "bills", "marketing", "office_expense", "other"]>, "many">>;
    description: z.ZodOptional<z.ZodString>;
    expenseDate: z.ZodString;
    billStatus: z.ZodOptional<z.ZodEnum<["all_bills", "partial_bills", "no_bill"]>>;
    /** @deprecated use billStatus === "no_bill" */
    noBill: z.ZodOptional<z.ZodBoolean>;
    billImageUrls: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    billImageUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
}, "strip", z.ZodTypeAny, {
    currency: "USD" | "INR";
    amount: number;
    expenseDate: string;
    description?: string | undefined;
    expenseTypes?: ("other" | "shipping_charges" | "inventory_purchase" | "bills" | "marketing" | "office_expense")[] | undefined;
    expenseType?: "other" | "shipping_charges" | "inventory_purchase" | "bills" | "marketing" | "office_expense" | undefined;
    billStatus?: "all_bills" | "partial_bills" | "no_bill" | undefined;
    noBill?: boolean | undefined;
    billImageUrls?: string[] | undefined;
    billImageUrl?: string | undefined;
}, {
    amount: number;
    expenseDate: string;
    currency?: "USD" | "INR" | undefined;
    description?: string | undefined;
    expenseTypes?: ("other" | "shipping_charges" | "inventory_purchase" | "bills" | "marketing" | "office_expense")[] | undefined;
    expenseType?: "other" | "shipping_charges" | "inventory_purchase" | "bills" | "marketing" | "office_expense" | undefined;
    billStatus?: "all_bills" | "partial_bills" | "no_bill" | undefined;
    noBill?: boolean | undefined;
    billImageUrls?: string[] | undefined;
    billImageUrl?: string | undefined;
}>, {
    currency: "USD" | "INR";
    amount: number;
    expenseDate: string;
    description?: string | undefined;
    expenseTypes?: ("other" | "shipping_charges" | "inventory_purchase" | "bills" | "marketing" | "office_expense")[] | undefined;
    expenseType?: "other" | "shipping_charges" | "inventory_purchase" | "bills" | "marketing" | "office_expense" | undefined;
    billStatus?: "all_bills" | "partial_bills" | "no_bill" | undefined;
    noBill?: boolean | undefined;
    billImageUrls?: string[] | undefined;
    billImageUrl?: string | undefined;
}, {
    amount: number;
    expenseDate: string;
    currency?: "USD" | "INR" | undefined;
    description?: string | undefined;
    expenseTypes?: ("other" | "shipping_charges" | "inventory_purchase" | "bills" | "marketing" | "office_expense")[] | undefined;
    expenseType?: "other" | "shipping_charges" | "inventory_purchase" | "bills" | "marketing" | "office_expense" | undefined;
    billStatus?: "all_bills" | "partial_bills" | "no_bill" | undefined;
    noBill?: boolean | undefined;
    billImageUrls?: string[] | undefined;
    billImageUrl?: string | undefined;
}>;
export declare const updateExpenseSchema: z.ZodEffects<z.ZodObject<{
    amount: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodOptional<z.ZodEnum<["USD", "INR"]>>;
    expenseType: z.ZodOptional<z.ZodEnum<["shipping_charges", "inventory_purchase", "bills", "marketing", "office_expense", "other"]>>;
    expenseTypes: z.ZodOptional<z.ZodArray<z.ZodEnum<["shipping_charges", "inventory_purchase", "bills", "marketing", "office_expense", "other"]>, "many">>;
    description: z.ZodOptional<z.ZodString>;
    expenseDate: z.ZodOptional<z.ZodString>;
    billStatus: z.ZodOptional<z.ZodEnum<["all_bills", "partial_bills", "no_bill"]>>;
    noBill: z.ZodOptional<z.ZodBoolean>;
    billImageUrls: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    billImageUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
}, "strip", z.ZodTypeAny, {
    currency?: "USD" | "INR" | undefined;
    description?: string | undefined;
    expenseTypes?: ("other" | "shipping_charges" | "inventory_purchase" | "bills" | "marketing" | "office_expense")[] | undefined;
    amount?: number | undefined;
    expenseType?: "other" | "shipping_charges" | "inventory_purchase" | "bills" | "marketing" | "office_expense" | undefined;
    expenseDate?: string | undefined;
    billStatus?: "all_bills" | "partial_bills" | "no_bill" | undefined;
    noBill?: boolean | undefined;
    billImageUrls?: string[] | undefined;
    billImageUrl?: string | undefined;
}, {
    currency?: "USD" | "INR" | undefined;
    description?: string | undefined;
    expenseTypes?: ("other" | "shipping_charges" | "inventory_purchase" | "bills" | "marketing" | "office_expense")[] | undefined;
    amount?: number | undefined;
    expenseType?: "other" | "shipping_charges" | "inventory_purchase" | "bills" | "marketing" | "office_expense" | undefined;
    expenseDate?: string | undefined;
    billStatus?: "all_bills" | "partial_bills" | "no_bill" | undefined;
    noBill?: boolean | undefined;
    billImageUrls?: string[] | undefined;
    billImageUrl?: string | undefined;
}>, {
    currency?: "USD" | "INR" | undefined;
    description?: string | undefined;
    expenseTypes?: ("other" | "shipping_charges" | "inventory_purchase" | "bills" | "marketing" | "office_expense")[] | undefined;
    amount?: number | undefined;
    expenseType?: "other" | "shipping_charges" | "inventory_purchase" | "bills" | "marketing" | "office_expense" | undefined;
    expenseDate?: string | undefined;
    billStatus?: "all_bills" | "partial_bills" | "no_bill" | undefined;
    noBill?: boolean | undefined;
    billImageUrls?: string[] | undefined;
    billImageUrl?: string | undefined;
}, {
    currency?: "USD" | "INR" | undefined;
    description?: string | undefined;
    expenseTypes?: ("other" | "shipping_charges" | "inventory_purchase" | "bills" | "marketing" | "office_expense")[] | undefined;
    amount?: number | undefined;
    expenseType?: "other" | "shipping_charges" | "inventory_purchase" | "bills" | "marketing" | "office_expense" | undefined;
    expenseDate?: string | undefined;
    billStatus?: "all_bills" | "partial_bills" | "no_bill" | undefined;
    noBill?: boolean | undefined;
    billImageUrls?: string[] | undefined;
    billImageUrl?: string | undefined;
}>;
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;
export type Expense = {
    expenseId: string;
    amount: number;
    currency: LedgerCurrency;
    /** Primary / first type (backward compatible). */
    expenseType: ExpenseType;
    /** All selected types when multi-select is used. */
    expenseTypes?: ExpenseType[];
    description?: string;
    expenseDate: string;
    billStatus?: ExpenseBillStatus;
    /** @deprecated use billStatus */
    noBill?: boolean;
    billImageUrls?: string[];
    billImageUrl?: string;
    createdBy?: string;
    createdAt: string;
    updatedAt: string;
};
export { resolveBillStatus, collectBillUrls };
