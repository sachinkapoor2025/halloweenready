import type { Product } from "../schemas/product";
/** Total units sold — only the counter incremented when orders are paid (never inferred from stock). */
export declare function getUnitsSold(product: Product): number;
/** In stock and at least FAST_SELLING_THRESHOLD real paid orders. */
export declare function isFastSelling(product: Product): boolean;
export declare function sortByUnitsSold(a: Product, b: Product): number;
