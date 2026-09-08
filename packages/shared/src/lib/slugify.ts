/** Lowercase kebab-case slug for product/category URLs. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const SEO_SLUG_MAX_BASE = 72;

/**
 * Keyword-friendly product slug base: lowercase, hyphenated, de-duplicated
 * "halloween" runs, truncated at a word boundary.
 */
export function seoSlugBase(name: string, maxLen = SEO_SLUG_MAX_BASE): string {
  let base = slugify(name);
  if (!base) return "product";

  // Collapse repeated halloween segments: halloween-halloween-x → halloween-x
  base = base.replace(/(?:^|-)(halloween)(?:-halloween)+/g, "$1");

  if (base.length <= maxLen) return base;

  const truncated = base.slice(0, maxLen);
  const atBoundary = truncated.replace(/-[^-]*$/, "");
  return atBoundary.length >= 12 ? atBoundary : truncated.replace(/-+$/g, "") || "product";
}

/**
 * Unique storefront product slug: readable name + short stable unique suffix when provided.
 * Suffix keeps collisions impossible without embedding full UUIDs or query params.
 */
export function buildProductSlug(name: string, uniqueKey?: string): string {
  const base = seoSlugBase(name);
  if (!uniqueKey?.trim()) return base;
  const suffix = uniqueKey.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toLowerCase();
  return suffix ? `${base}-${suffix}` : base;
}

/** Canonical storefront path for a product slug (no query params). */
export function productHref(slug: string): string {
  const clean = slug.trim().replace(/^\/+|\/+$/g, "");
  return `/products/${clean}`;
}
