/**
 * Import HalloweenReady catalog from scripts/data/halloweenready-catalog.json into DynamoDB.
 *
 * Usage:
 *   npm run import:halloweenready -- --fetch-only   # refresh catalog JSON (no-op for static catalog)
 *   ENVIRONMENT=prod npm run import:halloweenready   # import to AWS (prod tables)
 */
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { productKeys, categoryKeys, configKeys, defaultPaymentConfig } from "@halloweenready/shared";

const CATALOG_PATH = join(process.cwd(), "scripts/data/halloweenready-catalog.json");
const SOURCE_CATALOG = join(process.cwd(), "scripts/data/halloweenready-catalog.json");

interface CatalogCategory {
  name: string;
  slug: string;
  description: string;
  sortOrder: number;
}

interface CatalogProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: "USD" | "INR";
  categorySlug: string;
  images: string[];
  sku?: string;
  inventory: number;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
}

function loadStaticCatalog(): { categories: CatalogCategory[]; products: CatalogProduct[] } {
  if (!existsSync(SOURCE_CATALOG)) {
    throw new Error(`Catalog not found at ${SOURCE_CATALOG}`);
  }
  return JSON.parse(readFileSync(SOURCE_CATALOG, "utf-8"));
}

function getDocClient() {
  const endpoint = process.env.DYNAMODB_ENDPOINT;
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION ?? "us-east-1",
    ...(endpoint
      ? { endpoint, credentials: { accessKeyId: "local", secretAccessKey: "local" } }
      : {}),
  });
  return DynamoDBDocumentClient.from(client);
}

async function importToDb(catalog: { categories: CatalogCategory[]; products: CatalogProduct[] }) {
  const ENV = process.env.ENVIRONMENT ?? "dev";
  const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE ?? `halloweenready-products-${ENV}`;
  const CONFIG_TABLE = process.env.CONFIG_TABLE ?? `halloweenready-config-${ENV}`;
  const docClient = getDocClient();
  const timestamp = new Date().toISOString();

  for (const cat of catalog.categories) {
    await docClient.send(
      new PutCommand({
        TableName: PRODUCTS_TABLE,
        Item: {
          ...cat,
          published: true,
          PK: categoryKeys.pk(cat.slug),
          SK: categoryKeys.sk(),
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      })
    );
  }

  for (const p of catalog.products) {
    await docClient.send(
      new PutCommand({
        TableName: PRODUCTS_TABLE,
        Item: {
          ...p,
          published: true,
          PK: productKeys.pk(p.slug),
          SK: productKeys.sk(),
          GSI1PK: productKeys.gsi1pk(p.categorySlug),
          GSI1SK: productKeys.gsi1sk(p.slug),
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      })
    );
  }

  await docClient.send(
    new PutCommand({
      TableName: CONFIG_TABLE,
      Item: {
        PK: configKeys.payments.pk,
        SK: configKeys.payments.sk,
        ...defaultPaymentConfig,
        updatedAt: timestamp,
      },
    })
  );

  console.log(`Imported ${catalog.categories.length} categories, ${catalog.products.length} products → ${PRODUCTS_TABLE}`);
}

async function main() {
  const fetchOnly = process.argv.includes("--fetch-only");
  const refresh = process.argv.includes("--refresh");

  let catalog = loadStaticCatalog();

  if (refresh || fetchOnly) {
    catalog = loadStaticCatalog();
    mkdirSync(join(process.cwd(), "scripts/data"), { recursive: true });
    writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));
    console.log(`Saved ${CATALOG_PATH} (${catalog.products.length} products)`);
  } else if (existsSync(CATALOG_PATH)) {
    catalog = JSON.parse(readFileSync(CATALOG_PATH, "utf-8"));
    console.log(`Using cached catalog: ${catalog.products.length} products`);
  }

  if (!fetchOnly) {
    await importToDb(catalog);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
