import type { Product } from "@halloweenready/shared";
import { getCdnUrl } from "./env";
import { resolveImageUrls } from "./images";
import { api } from "./api";
import {
  getCatalogProduct,
  getCatalogProducts,
  getCatalogProductsByCategory,
} from "./catalog-fallback";
import { filterDisplayableProductImages, isPlaceholderProductImage } from "./product-images";

/**
 * Always use absolute CloudFront URLs on storefront listings/PDP.
 * Amplify `/uploads/...` often contains the pumpkin placeholder JPEG for missing files.
 */
function toListingImageUrl(url: string): string {
  const cdn = getCdnUrl();
  const resolved = resolveImageUrls([url])[0] || url.trim();
  if (!resolved) return "";
  if (resolved.startsWith("/uploads/")) return `${cdn}${resolved}`;
  if (resolved.startsWith("uploads/")) return `${cdn}/${resolved}`;
  if (isPlaceholderProductImage(resolved)) return "";
  return resolved;
}

/** Map stored paths to working display URLs; drop pumpkin placeholders. */
function withDisplayImages(product: Product): Product {
  const cleaned = filterDisplayableProductImages(product.images);
  const resolved = cleaned.map(toListingImageUrl).filter(Boolean);
  return {
    ...product,
    images: resolved,
  };
}

/**
 * Admin / DynamoDB is the source of truth for product images.
 * Catalog JSON is only used when the API is unreachable (build/offline fallback).
 */
export async function loadProduct(slug: string): Promise<Product | null> {
  try {
    const data = await api<{ product: Product }>(`/products/${slug}`, { revalidate: false });
    return withDisplayImages(data.product);
  } catch {
    const catalog = getCatalogProduct(slug);
    return catalog ? withDisplayImages(catalog) : null;
  }
}

export async function loadRelatedProducts(categorySlug: string, excludeSlug: string): Promise<Product[]> {
  try {
    const data = await api<{ products: Product[] }>(`/products?category=${categorySlug}`, {
      revalidate: false,
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

/** Apply display image cleanup for listing pages that load products from the API. */
export function withListingImages(products: Product[]): Product[] {
  return products.map(withDisplayImages);
}
