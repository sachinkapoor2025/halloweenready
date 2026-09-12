import type { CjStorefrontShippingMethod } from "../schemas/cj-dropshipping";
/** Turn CJ `logisticAging` ("3-7", "2-2") into a customer-facing label. */
export declare function formatCjAging(raw: string): string;
export declare function normalizeCjFreightQuotes(data: unknown): CjStorefrontShippingMethod[];
