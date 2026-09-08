/**
 * Storefront product URL helpers — always `/products/{slug}` with no query params.
 */
import { productHref as sharedProductHref } from "@halloweenready/shared";

export function productHref(slug: string): string {
  return sharedProductHref(slug);
}

/** Normalize a path param toward the canonical product slug (lowercase, trimmed). */
export function normalizeProductSlugParam(param: string): string {
  try {
    return decodeURIComponent(param).trim().toLowerCase();
  } catch {
    return param.trim().toLowerCase();
  }
}
