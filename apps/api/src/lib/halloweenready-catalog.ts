/**
 * Bundled HalloweenReady catalog — auto-creates DynamoDB products when the storefront
 * lists catalog fallback items that were never imported (or were deleted).
 *
 * Same pattern as orange-county-catalog.ts for hampers.
 */
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { productKeys, categoryKeys, DEFAULT_PRODUCT_INVENTORY } from "@halloweenready/shared";
import {
  HALLOWEEN_HAMPERS_CATEGORY,
  buildHalloweenHamperCatalogProducts,
  isHalloweenHamperProduct,
} from "@halloweenready/shared";
import { docClient, PRODUCTS_TABLE, now } from "./db";
import catalogJson from "../data/halloweenready-catalog.json";

type CatalogCategory = {
  name: string;
  slug: string;
  description?: string;
  sortOrder?: number;
};

type CatalogProduct = {
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: "USD" | "INR";
  categorySlug: string;
  additionalCategorySlugs?: string[];
  images: string[];
  sku?: string;
  inventory?: number;
  tags?: string[];
  couponExcluded?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  published?: boolean;
  vendorSlug?: string;
  vendorCost?: number;
  cjPid?: string;
  cjVid?: string;
  hamperContents?: Array<{ slug: string; name: string; image?: string; price?: number }>;
  hamperAddons?: Array<{ slug: string; name: string; image?: string; price: number }>;
};

const jsonCategories = (catalogJson as { categories?: CatalogCategory[] }).categories ?? [];
const jsonProducts = (catalogJson as { products: CatalogProduct[] }).products ?? [];
const hamperProducts = buildHalloweenHamperCatalogProducts() as CatalogProduct[];
const categories = [
  HALLOWEEN_HAMPERS_CATEGORY,
  ...jsonCategories.filter((c) => c.slug !== HALLOWEEN_HAMPERS_CATEGORY.slug),
];
const products = [
  ...hamperProducts,
  ...jsonProducts.filter((p) => !hamperProducts.some((h) => h.slug === p.slug)),
];
const bySlug = new Map(products.map((p) => [p.slug, p]));

export function getBundledHalloweenReadyProduct(slug: string): CatalogProduct | undefined {
  return bySlug.get(slug);
}

/**
 * Ensure WooCommerce/catalog categories exist in Dynamo with GSI1 list keys.
 * Creates missing rows only — does not overwrite admin edits.
 */
export async function ensureHalloweenreadyCategoriesInDb(): Promise<number> {
  if (categories.length === 0) return 0;
  const ts = now();
  let created = 0;

  await Promise.all(
    categories.map(async (cat) => {
      const existing = await docClient.send(
        new GetCommand({
          TableName: PRODUCTS_TABLE,
          Key: { PK: categoryKeys.pk(cat.slug), SK: categoryKeys.sk() },
        })
      );
      if (existing.Item) {
        // Repair list index if a prior import wrote CATEGORY# without GSI1.
        if (existing.Item.GSI1PK !== categoryKeys.gsi1pk()) {
          const sortOrder =
            typeof existing.Item.sortOrder === "number"
              ? existing.Item.sortOrder
              : typeof cat.sortOrder === "number"
                ? cat.sortOrder
                : 0;
          await docClient.send(
            new PutCommand({
              TableName: PRODUCTS_TABLE,
              Item: {
                ...existing.Item,
                GSI1PK: categoryKeys.gsi1pk(),
                GSI1SK: categoryKeys.gsi1sk(sortOrder, cat.slug),
                updatedAt: ts,
              },
            })
          );
        }
        return;
      }

      const sortOrder = typeof cat.sortOrder === "number" ? cat.sortOrder : 0;
      await docClient.send(
        new PutCommand({
          TableName: PRODUCTS_TABLE,
          Item: {
            name: cat.name,
            slug: cat.slug,
            description: cat.description ?? "",
            published: true,
            sortOrder,
            PK: categoryKeys.pk(cat.slug),
            SK: categoryKeys.sk(),
            GSI1PK: categoryKeys.gsi1pk(),
            GSI1SK: categoryKeys.gsi1sk(sortOrder, cat.slug),
            createdAt: ts,
            updatedAt: ts,
          },
        })
      );
      created += 1;
    })
  );

  if (created > 0) {
    console.log(`ensured ${created} halloweenready catalog categories`);
  }
  await ensureHalloweenHampersInDb();
  return created;
}

function catalogItemFromBundled(bundled: CatalogProduct, ts: string) {
  const categorySlug = bundled.categorySlug;
  return {
    name: bundled.name,
    slug: bundled.slug,
    description: bundled.description,
    price: bundled.price,
    compareAtPrice: bundled.compareAtPrice,
    currency: bundled.currency ?? "USD",
    categorySlug,
    additionalCategorySlugs: bundled.additionalCategorySlugs,
    images: bundled.images ?? [],
    sku: bundled.sku,
    inventory: bundled.inventory ?? DEFAULT_PRODUCT_INVENTORY,
    tags: bundled.tags ?? [],
    ...(bundled.couponExcluded ? { couponExcluded: true } : {}),
    ...(bundled.vendorSlug ? { vendorSlug: bundled.vendorSlug } : {}),
    ...(typeof bundled.vendorCost === "number" ? { vendorCost: bundled.vendorCost } : {}),
    ...(bundled.cjPid ? { cjPid: bundled.cjPid } : {}),
    ...(bundled.cjVid ? { cjVid: bundled.cjVid } : {}),
    ...(bundled.hamperContents ? { hamperContents: bundled.hamperContents } : {}),
    ...(bundled.hamperAddons ? { hamperAddons: bundled.hamperAddons } : {}),
    seoTitle: bundled.seoTitle,
    seoDescription: bundled.seoDescription,
    published: bundled.published !== false,
    PK: productKeys.pk(bundled.slug),
    SK: productKeys.sk(),
    GSI1PK: productKeys.gsi1pk(categorySlug),
    GSI1SK: productKeys.gsi1sk(bundled.slug),
    createdAt: ts,
    updatedAt: ts,
  };
}

/** Upsert all curated hampers if they are missing from DynamoDB. */
export async function ensureHalloweenHampersInDb(): Promise<number> {
  const results = await Promise.all(hamperProducts.map((p) => ensureHalloweenreadyCatalogProductInDb(p.slug)));
  return results.filter(Boolean).length;
}

/**
 * If the slug exists in the bundled catalog but not in DynamoDB, create it.
 * Does not overwrite existing products (prices/inventory stay admin-controlled).
 */
export async function ensureHalloweenreadyCatalogProductInDb(
  slug: string
): Promise<Record<string, unknown> | null> {
  const bundled = bySlug.get(slug);
  if (!bundled) return null;
  const hamper = isHalloweenHamperProduct(bundled);
  if (!hamper && bundled.vendorSlug !== "cj-dropshipping" && !bundled.cjPid) return null;

  const key = { PK: productKeys.pk(slug), SK: productKeys.sk() };
  const existing = await docClient.send(
    new GetCommand({
      TableName: PRODUCTS_TABLE,
      Key: key,
    })
  );
  if (existing.Item) {
    if (hamper && !Array.isArray(existing.Item.hamperContents)) {
      const patched = {
        ...existing.Item,
        hamperContents: bundled.hamperContents,
        hamperAddons: bundled.hamperAddons,
        tags: bundled.tags ?? existing.Item.tags,
        couponExcluded: true,
        updatedAt: now(),
      };
      await docClient.send(new PutCommand({ TableName: PRODUCTS_TABLE, Item: patched }));
      return patched as Record<string, unknown>;
    }
    return existing.Item as Record<string, unknown>;
  }

  const item = catalogItemFromBundled(bundled, now());
  await docClient.send(new PutCommand({ TableName: PRODUCTS_TABLE, Item: item }));
  console.log(`upserted halloweenready catalog product ${slug}`);
  return item;
}
