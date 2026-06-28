/**
 * Trim text to a SERP-safe length without cutting mid-word.
 * Prefers ending at a sentence boundary when one fits within the limit.
 */
export declare function metaDescription(text: string, maxLength?: number): string;
/** Detect catalog/import descriptions cut at a fixed char limit mid-word. */
export declare function isTruncatedMeta(text: string | undefined, maxLength?: number): boolean;
/** Prefer complete seoDescription; fall back to smart-trimmed product description. */
export declare function productMetaDescription(seoDescription?: string, description?: string): string;
