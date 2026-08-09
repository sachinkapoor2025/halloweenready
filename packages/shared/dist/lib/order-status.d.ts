/** True when the customer has paid — includes shipped / delivered / complete, not only `paid`. */
export declare function isOrderPaymentSettled(status: string): boolean;
/** True when the customer still needs to complete checkout payment. */
export declare function isOrderAwaitingPayment(status: string): boolean;
/** Human-readable customer-facing status label. */
export declare function formatOrderStatusLabel(status: string): string;
/** Short customer headline for the order confirmation page. */
export declare function orderConfirmationHeadline(status: string): string;
/** Supporting copy under the confirmation headline. */
export declare function orderConfirmationSubcopy(status: string): string;
