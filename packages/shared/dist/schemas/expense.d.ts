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
export declare const createExpenseSchema: any;
export declare const updateExpenseSchema: any;
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
