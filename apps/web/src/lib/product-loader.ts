import type { Product } from "@halloweenready/shared";
import { isAdminUploadedProductImage, uploadsRelativePath } from "@halloweenready/shared";
import { resolveImageUrls } from "./images";
import { api } from "./api";
import {
  getCatalogProduct,
  getCatalogProducts,
  getCatalogProductsByCategory,
} from "./catalog-fallback";

function dedupeImageUrls(urls: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const url of urls) {
    const key = uploadsRelativePath(url) ?? url.trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(url);
  }
  return out;
}

function imageMatchesProductSlug(url: string, slug: string): boolean {
  const rel = uploadsRelativePath(url) ?? url;
  return rel.includes(slug);
}

function countSlugMatchedImages(images: string[], slug: string): number {
  return images.filter((url) => imageMatchesProductSlug(url, slug)).length;
}

/** Prefer the richer / slug-matched image set — catalog JSON is updated with imports before ISR pages refresh. */
function pickBestImages(
  apiImages: string[] | undefined,
  catalogImages: string[] | undefined,
  slug: string
): string[] {
  const api = apiImages ?? [];
  const catalog = catalogImages ?? [];
  if (api.length === 0) return catalog;
  if (catalog.length === 0) return api;

  // Live admin/S3 uploads must win over stale catalog JSON
  if (api.some(isAdminUploadedProductImage)) {
    return dedupeImageUrls([...api, ...catalog]);
  }

  const apiMatches = countSlugMatchedImages(api, slug);
  const catalogMatches = countSlugMatchedImages(catalog, slug);
  if (catalogMatches > apiMatches) return catalog;
  if (apiMatches > catalogMatches) return api;
  if (catalog.length > api.length) return catalog;
  if (api.length > catalog.length) return api;

  const merged = dedupeImageUrls([...api, ...catalog]);
  return merged.length > api.length ? merged : api;
}

function mergeWithCatalog(product: Product): Product {
  const catalog = getCatalogProduct(product.slug);
  if (!catalog?.images?.length) return product;
  const images = pickBestImages(product.images, catalog.images, product.slug);
  if (images === product.images) return product;
  return { ...product, images };
}

/** Map stored wp-content paths to CloudFront CDN URLs for display. */
function withDisplayImages(product: Product): Product {
  const merged = mergeWithCatalog(product);
  const resolved = resolveImageUrls(merged.images);
  return {
    ...merged,
    images: resolved.length > 0 ? resolved : merged.images ?? [],
  };
}

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
