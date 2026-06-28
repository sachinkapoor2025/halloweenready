import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { categorySlugVariants, type Category, type Product } from "@halloweenready/shared";

interface CatalogFile {
  categories: Category[];
  products: Product[];
}

let cachedCategories: Category[] | null = null;
let cachedProducts: Product[] | null = null;

function resolveCatalogPath(): string | null {
  const candidates = [
    join(process.cwd(), "scripts/data/halloweenready-catalog.json"),
    join(process.cwd(), "../scripts/data/halloweenready-catalog.json"),
    join(process.cwd(), "../../scripts/data/halloweenready-catalog.json"),
  ];
  return candidates.find((p) => existsSync(p)) ?? null;
}

function loadCatalogFile(): CatalogFile {
  const path = resolveCatalogPath();
  if (!path) return { categories: [], products: [] };
  return JSON.parse(readFileSync(path, "utf-8")) as CatalogFile;
}

/** Read bundled catalog JSON — reliable when API is empty or category metadata is missing. */
export function getCatalogProducts(): Product[] {
  if (cachedProducts) return cachedProducts;
  cachedProducts = loadCatalogFile().products ?? [];
  return cachedProducts;
}

export function getCatalogCategories(): Category[] {
  if (cachedCategories) return cachedCategories;
  cachedCategories = loadCatalogFile().categories ?? [];
  return cachedCategories;
}

export function getCatalogProduct(slug: string): Product | undefined {
  return getCatalogProducts().find((p) => p.slug === slug);
}

export function getCatalogCategory(slug: string): Category | undefined {
  const variants = categorySlugVariants(slug);
  return getCatalogCategories().find((c) => variants.includes(c.slug));
}

export function getCatalogProductsByCategory(categorySlug: string): Product[] {
  const variants = new Set(categorySlugVariants(categorySlug));
  return getCatalogProducts().filter((p) => variants.has(p.categorySlug));
}
