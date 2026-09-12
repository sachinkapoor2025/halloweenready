/** Lowercase kebab-case slug for product/category URLs. */
export declare function slugify(text: string): string;
/**
 * Keyword-friendly product slug base: lowercase, hyphenated, de-duplicated
 * "halloween" runs, truncated at a word boundary.
 */
export declare function seoSlugBase(name: string, maxLen?: number): string;
/**
 * Unique storefront product slug: readable name + short stable unique suffix when provided.
 * Suffix keeps collisions impossible without embedding full UUIDs or query params.
 */
export declare function buildProductSlug(name: string, uniqueKey?: string): string;
/** Canonical storefront path for a product slug (no query params). */
export declare function productHref(slug: string): string;
