"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedIfEmpty = seedIfEmpty;
const fs_1 = require("fs");
const path_1 = require("path");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const shared_1 = require("@halloweenready/shared");
const db_1 = require("./db");
const memory_store_1 = require("./memory-store");
const CATALOG_PATH = (0, path_1.join)(process.cwd(), "scripts/data/halloweenready-catalog.json");
function loadCatalog() {
    if (!(0, fs_1.existsSync)(CATALOG_PATH))
        return null;
    return JSON.parse((0, fs_1.readFileSync)(CATALOG_PATH, "utf-8"));
}
async function seedIfEmpty() {
    if (process.env.USE_MEMORY_DB !== "true")
        return;
    if ((0, memory_store_1.getMemoryStoreSize)() > 0)
        return;
    const catalog = loadCatalog();
    if (!catalog) {
        console.log("No halloweenready-catalog.json found — skipping seed.");
        return;
    }
    const timestamp = (0, db_1.now)();
    console.log(`Seeding in-memory DB: ${catalog.products.length} HalloweenReady products...`);
    for (const cat of catalog.categories) {
        await db_1.docClient.send(new lib_dynamodb_1.PutCommand({
            TableName: db_1.PRODUCTS_TABLE,
            Item: {
                ...cat,
                published: true,
                PK: shared_1.categoryKeys.pk(cat.slug),
                SK: shared_1.categoryKeys.sk(),
                createdAt: timestamp,
                updatedAt: timestamp,
            },
        }));
    }
    for (const p of catalog.products) {
        await db_1.docClient.send(new lib_dynamodb_1.PutCommand({
            TableName: db_1.PRODUCTS_TABLE,
            Item: {
                ...p,
                published: true,
                PK: shared_1.productKeys.pk(p.slug),
                SK: shared_1.productKeys.sk(),
                GSI1PK: shared_1.productKeys.gsi1pk(p.categorySlug),
                GSI1SK: shared_1.productKeys.gsi1sk(p.slug),
                createdAt: timestamp,
                updatedAt: timestamp,
            },
        }));
    }
    await db_1.docClient.send(new lib_dynamodb_1.PutCommand({
        TableName: db_1.CONFIG_TABLE,
        Item: {
            PK: shared_1.configKeys.payments.pk,
            SK: shared_1.configKeys.payments.sk,
            ...shared_1.defaultPaymentConfig,
            updatedAt: timestamp,
        },
    }));
    console.log("HalloweenReady demo data ready.");
}
