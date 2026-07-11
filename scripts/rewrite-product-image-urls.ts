/**
 * Rewrite product image URLs in DynamoDB to absolute CloudFront CDN URLs.
 * Never writes Amplify-relative `/uploads/...` paths into the database.
 *
 *   ENVIRONMENT=prod NEXT_PUBLIC_IMAGE_MODE=cdn npm run rewrite:product-images
 */
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { DEFAULT_PRODUCT_CDN, isAdminUploadedProductImage, resolveProductImageUrls } from "@halloweenready/shared";

const ENV = process.env.ENVIRONMENT ?? "prod";
const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE ?? `halloweenready-products-${ENV}`;
const CDN = (process.env.CLOUDFRONT_DOMAIN
  ? `https://${process.env.CLOUDFRONT_DOMAIN.replace(/^https?:\/\//, "").replace(/\/$/, "")}`
  : DEFAULT_PRODUCT_CDN
).replace(/\/$/, "");

function toCdnUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (isAdminUploadedProductImage(trimmed)) {
    if (trimmed.startsWith("http")) return trimmed.replace(/^http:\/\//i, "https://");
    if (trimmed.startsWith("/products/")) return `${CDN}${trimmed}`;
    if (trimmed.startsWith("products/")) return `${CDN}/${trimmed}`;
  }
  if (trimmed.startsWith("/uploads/")) return `${CDN}${trimmed}`;
  if (trimmed.startsWith("uploads/")) return `${CDN}/${trimmed}`;
  process.env.NEXT_PUBLIC_IMAGE_MODE = "cdn";
  const resolved = resolveProductImageUrlSafe(trimmed);
  if (resolved.startsWith("/uploads/")) return `${CDN}${resolved}`;
  return resolved;
}

function resolveProductImageUrlSafe(url: string): string {
  const [out] = resolveProductImageUrls([url], CDN);
  return out || url;
}

async function main() {
  process.env.NEXT_PUBLIC_IMAGE_MODE = "cdn";
  const doc = DynamoDBDocumentClient.from(
    new DynamoDBClient({ region: process.env.AWS_REGION ?? "us-east-1" })
  );

  let updated = 0;
  let lastKey: Record<string, unknown> | undefined;

  do {
    const page = await doc.send(
      new ScanCommand({ TableName: PRODUCTS_TABLE, ExclusiveStartKey: lastKey })
    );

    for (const item of page.Items ?? []) {
      if (item.SK !== "META" || !String(item.PK).startsWith("PRODUCT#")) continue;
      const images = (item.images as string[]) ?? [];
      if (!images.length) continue;

      const migrated = images.map(toCdnUrl).filter(Boolean);
      if (migrated.join("|") === images.join("|")) continue;

      await doc.send(
        new PutCommand({
          TableName: PRODUCTS_TABLE,
          Item: { ...item, images: migrated, updatedAt: new Date().toISOString() },
        })
      );
      updated++;
    }

    lastKey = page.LastEvaluatedKey;
  } while (lastKey);

  console.log(`Updated ${updated} products with absolute CDN image URLs.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
