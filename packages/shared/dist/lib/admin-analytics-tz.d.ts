/**
 * Admin analytics calendar timezone.
 * Operators are IST-based; event GSI keys remain UTC — we expand each IST day
 * to the overlapping UTC day buckets for queries.
 */
export declare const ADMIN_ANALYTICS_TIMEZONE = "Asia/Kolkata";
/** IST has no DST — fixed offset for day boundaries. */
export declare const ADMIN_ANALYTICS_UTC_OFFSET = "+05:30";
/** YYYY-MM-DD in the admin analytics timezone (default Asia/Kolkata). */
export declare function businessDayKey(date?: Date, timeZone?: string): string;
/** Trailing N business days (newest first), including today in that timezone. */
export declare function rangeBusinessDays(days: number, timeZone?: string): string[];
/** Inclusive business-day list from → to (chronological). */
export declare function businessDaysBetween(from: string, to: string): string[];
/**
 * UTC YYYY-MM-DD GSI day buckets that overlap the given Asia/Kolkata business days.
 * Needed because events are stored under UTC dayBucket keys.
 */
export declare function utcDayBucketsForBusinessDays(businessDays: string[]): string[];
/** Map an instant to an IST (or configured TZ) calendar day for charts. */
export declare function instantToBusinessDay(iso: string | undefined, timeZone?: string): string | undefined;
