import type { Product } from "@halloweenready/shared";
import { resolveImageUrls } from "./images";
import { api } from "./api";
import {
  getCatalogProduct,
  getCatalogProducts,
  getCatalogProductsByCategory,
} from "./catalog-fallback";

/** Prefer catalog WordPress image URLs; always resolve for display on the web. */
function withDisplayImages(product: Product): Product {
  const catalog = getCatalogProduct(product.slug);
  const sourceImages =
    catalog?.images?.length ? catalog.images : product.images?.length ? product.images : [];
  const resolved = resolveImageUrls(sourceImages);
  return {
    ...product,
    images: resolved.length > 0 ? resolved : sourceImages,
  };
}

export async function loadProduct(slug: string): Promise<Product | null> {
  try {
    const data = await api<{ product: Product }>(`/products/${slug}`, { revalidate: 3600 });
    return withDisplayImages(data.product);
  } catch {
    const catalog = getCatalogProduct(slug);
    return catalog ? withDisplayImages(catalog) : null;
  }
}

export async function loadRelatedProducts(categorySlug: string, excludeSlug: string): Promise<Product[]> {
  try {
    const data = await api<{ products: Product[] }>(`/products?category=${categorySlug}`, {
      revalidate: 3600,
    });
    const related = data.products.filter((p) => p.slug !== excludeSlug).slice(0, 5);
    if (related.length > 0) return related.map(withDisplayImages);
  } catch {
    // fall through to catalog
  }
  return getCatalogProductsByCategory(categorySlug)
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, 5)
    .map(withDisplayImages);
}

/** Prefer catalog slugs at build time — avoids CI/API rate-limit prerender failures. */
export function getStaticProductSlugs(): string[] {
  const fromCatalog = getCatalogProducts().map((p) => p.slug);
  if (fromCatalog.length > 0) return fromCatalog;
  return [];
}
