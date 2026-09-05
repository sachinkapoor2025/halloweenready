import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { categorySlugVariants, isStorefrontVisibleProduct, type Category, type Product } from "@halloweenready/shared";
import {
  HALLOWEEN_HAMPERS_CATEGORY,
  buildHalloweenHamperCatalogProducts,
} from "@halloweenready/shared";

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

function withHampers(file: CatalogFile): CatalogFile {
  const ts = "2026-01-01T00:00:00.000Z";
  const hamperProducts = buildHalloweenHamperCatalogProducts().map((p) => ({
    ...p,
    createdAt: ts,
    updatedAt: ts,
  })) as Product[];
  const categories: Category[] = [
    {
      ...HALLOWEEN_HAMPERS_CATEGORY,
      published: true,
      createdAt: ts,
      updatedAt: ts,
    },
    ...(file.categories ?? []).filter((c) => c.slug !== HALLOWEEN_HAMPERS_CATEGORY.slug),
  ];
  const products = [
    ...hamperProducts,
    ...(file.products ?? []).filter((p) => !hamperProducts.some((h) => h.slug === p.slug)),
  ];
  return { categories, products };
}

/** Read bundled catalog JSON — reliable when API is empty or category metadata is missing. */
export function getCatalogProducts(): Product[] {
  if (cachedProducts) return cachedProducts;
  cachedProducts = (withHampers(loadCatalogFile()).products ?? []).filter(isStorefrontVisibleProduct);
  return cachedProducts;
}

export function getCatalogCategories(): Category[] {
  if (cachedCategories) return cachedCategories;
  cachedCategories = withHampers(loadCatalogFile()).categories ?? [];
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
