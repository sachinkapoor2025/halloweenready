import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import {
  DEFAULT_PRODUCT_INVENTORY,
  VENDOR_CJ_DROPSHIPPING,
  gramsToOz,
  mapCjCategoryToStoreSlug,
  mmToInches,
  pricingFromVendorCost,
  productKeys,
  resolveProductImagesForUpsert,
  stripHtml,
  type Product,
} from "@halloweenready/shared";
import { docClient, PRODUCTS_TABLE, now, slugify } from "./db";
import {
  cjAddToMyProduct,
  cjGetProduct,
  type CjListProduct,
  type CjProductDetail,
  type CjVariantRaw,
} from "./cj-dropshipping";

function num(value: unknown): number | undefined {
  const n = typeof value === "number" ? value : Number(String(value ?? "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

function inventoryFromVariant(variant: CjVariantRaw | undefined): number {
  const stocks = variant?.inventories ?? [];
  const total = stocks.reduce((sum, row) => sum + (Number(row.totalInventory) || 0), 0);
  if (total > 0) return total;
  return DEFAULT_PRODUCT_INVENTORY;
}

function mapVariants(detail: CjProductDetail) {
  return (detail.variants ?? [])
    .filter((v): v is CjVariantRaw & { vid: string } => Boolean(v.vid))
    .map((v) => {
      const cost = num(v.variantSellPrice);
      const priced = cost ? pricingFromVendorCost(cost, "USD") : undefined;
      return {
        vid: v.vid,
        sku: v.variantSku,
        key: v.variantKey,
        name: v.variantNameEn || v.variantKey,
        image: v.variantImage,
        inventory: inventoryFromVariant(v),
        ...(priced
          ? { price: priced.price, vendorCost: priced.vendorCost }
          : {}),
        ...(gramsToOz(Number(v.variantWeight)) ? { weightOz: gramsToOz(Number(v.variantWeight)) } : {}),
        ...(mmToInches(Number(v.variantLength)) ? { lengthIn: mmToInches(Number(v.variantLength)) } : {}),
        ...(mmToInches(Number(v.variantWidth)) ? { widthIn: mmToInches(Number(v.variantWidth)) } : {}),
        ...(mmToInches(Number(v.variantHeight)) ? { heightIn: mmToInches(Number(v.variantHeight)) } : {}),
      };
    });
}

function pickDefaultVariant(variants: ReturnType<typeof mapVariants>) {
  return (
    variants.find((v) => (v.inventory ?? 0) > 0) ??
    variants[0]
  );
}

function productSlug(name: string, pid: string): string {
  const base = slugify(name) || "cj-product";
  const suffix = pid.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toLowerCase();
  return suffix ? `${base}-${suffix}` : base;
}

export function catalogPreviewFromList(row: CjListProduct) {
  const cost = num(row.nowPrice) ?? num(row.discountPrice) ?? num(row.sellPrice);
  const priced = cost ? pricingFromVendorCost(cost, "USD") : undefined;
  return {
    pid: row.id,
    name: row.nameEn,
    sku: row.sku || row.spu,
    image: row.bigImage,
    vendorCost: priced?.vendorCost,
    price: priced?.price,
    compareAtPrice: priced?.compareAtPrice,
    inventory: Number(row.warehouseInventoryNum) || undefined,
    categorySlug: mapCjCategoryToStoreSlug({
      oneCategoryName: row.oneCategoryName,
      twoCategoryName: row.twoCategoryName,
      threeCategoryName: row.threeCategoryName,
      productName: row.nameEn,
    }),
    categoryName: row.threeCategoryName || row.twoCategoryName,
    description: row.description ? stripHtml(row.description).slice(0, 400) : undefined,
  };
}

export async function importCjProduct(
  pid: string,
  options: { categorySlug?: string; published?: boolean; addToMyProduct?: boolean } = {}
): Promise<{ product: Product; created: boolean }> {
  const detail = await cjGetProduct(pid);
  const name = (detail.productNameEn || "").trim() || `CJ product ${pid.slice(0, 8)}`;
  const slug = productSlug(name, detail.pid || pid);
  const variants = mapVariants(detail);
  const chosen = pickDefaultVariant(variants);
  const cost =
    chosen?.vendorCost ??
    num(detail.sellPrice) ??
    num(detail.variants?.[0]?.variantSellPrice);
  if (!cost) {
    throw new Error(`CJ product ${pid} has no sell price`);
  }
  const priced = pricingFromVendorCost(cost, "USD");
  const images = [
    detail.bigImage,
    ...(detail.productImageSet ?? []),
    ...variants.map((v) => v.image),
  ].filter((url): url is string => Boolean(url && /^https?:\/\//i.test(url)));

  const categorySlug =
    options.categorySlug ||
    mapCjCategoryToStoreSlug({
      categoryName: detail.categoryName,
      productName: name,
    });

  const weightOz =
    chosen?.weightOz ?? gramsToOz(Number(detail.packingWeight) || Number(detail.productWeight));
  const inventory =
    chosen?.inventory && chosen.inventory > 0
      ? chosen.inventory
      : DEFAULT_PRODUCT_INVENTORY;

  const existing = await docClient.send(
    new GetCommand({
      TableName: PRODUCTS_TABLE,
      Key: { PK: productKeys.pk(slug), SK: productKeys.sk() },
    })
  );
  const previous = existing.Item as Product | undefined;
  const imageUpdate = resolveProductImagesForUpsert(images, previous?.images);
  const timestamp = now();
  const description = stripHtml(detail.description || "") || name;

  const item: Product & { PK: string; SK: string; GSI1PK: string; GSI1SK: string } = {
    ...(previous ?? {}),
    slug,
    name,
    description,
    price: priced.price,
    compareAtPrice: priced.compareAtPrice,
    currency: "USD",
    categorySlug,
    images: imageUpdate.images,
    sku: chosen?.sku || detail.productSku,
    inventory,
    tags: Array.from(new Set([...(previous?.tags ?? []), "cj-dropshipping", "halloween"])),
    vendorSlug: VENDOR_CJ_DROPSHIPPING,
    vendorCost: priced.vendorCost,
    cjPid: detail.pid || pid,
    ...(chosen?.vid ? { cjVid: chosen.vid } : {}),
    ...(variants.length ? { cjVariants: variants } : {}),
    published: options.published ?? previous?.published ?? true,
    ...(weightOz ? { weightOz } : {}),
    ...(chosen?.lengthIn ? { lengthIn: chosen.lengthIn } : {}),
    ...(chosen?.widthIn ? { widthIn: chosen.widthIn } : {}),
    ...(chosen?.heightIn ? { heightIn: chosen.heightIn } : {}),
    seoTitle: `${name} | HalloweenReady`,
    seoDescription: description.slice(0, 160),
    PK: productKeys.pk(slug),
    SK: productKeys.sk(),
    GSI1PK: productKeys.gsi1pk(categorySlug),
    GSI1SK: productKeys.gsi1sk(slug),
    createdAt: previous?.createdAt ?? timestamp,
    updatedAt: timestamp,
  };

  await docClient.send(new PutCommand({ TableName: PRODUCTS_TABLE, Item: item }));
  const { invalidateProductListCache } = await import("../handlers/products");
  invalidateProductListCache(categorySlug);

  if (options.addToMyProduct !== false) {
    try {
      await cjAddToMyProduct(detail.pid || pid);
    } catch (err) {
      console.warn("CJ addToMyProduct failed", pid, err);
    }
  }

  return { product: item, created: !previous };
}

export async function importCjProducts(
  pids: string[],
  options: { categorySlug?: string; published?: boolean; addToMyProduct?: boolean } = {}
) {
  const imported: Product[] = [];
  const errors: Array<{ pid: string; error: string }> = [];
  for (const pid of pids) {
    try {
      const result = await importCjProduct(pid, options);
      imported.push(result.product);
    } catch (err) {
      errors.push({ pid, error: err instanceof Error ? err.message : "Import failed" });
    }
  }
  return { imported, errors };
}