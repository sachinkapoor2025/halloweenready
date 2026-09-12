/** Delivery estimate: 5–7 business days from today. */
export declare function addBusinessDays(from: Date, days: number): Date;
export declare function formatDeliveryDate(date: Date): string;
export declare function estimatedDeliveryRange(from?: Date): {
    start: Date;
    end: Date;
};
export declare function estimatedDeliveryLabel(from?: Date): string;
export declare function estimatedDeliveryShort(from?: Date): string;
