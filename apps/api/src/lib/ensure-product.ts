/**
 * Resolve a product for storefront/cart: DynamoDB first, then auto-create from
 * bundled HalloweenReady catalog when missing.
 */
import { ensureHalloweenreadyCatalogProductInDb } from "./halloweenready-catalog";

export async function ensureProductInDb(slug: string): Promise<Record<string, unknown> | null> {
  return ensureHalloweenreadyCatalogProductInDb(slug);
}
