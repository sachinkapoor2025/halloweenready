"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProducts = listProducts;
exports.getProduct = getProduct;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.listAdminProducts = listAdminProducts;
exports.deleteProduct = deleteProduct;
exports.bulkUploadProducts = bulkUploadProducts;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const shared_1 = require("@halloweenready/shared");
const db_1 = require("../lib/db");
const response_1 = require("../lib/response");
const auth_1 = require("../lib/auth");
const images_1 = require("../lib/images");
const inventory_1 = require("../lib/inventory");
async function listProducts(event) {
    const category = event.queryStringParameters?.category;
    const search = event.queryStringParameters?.search?.toLowerCase();
    let items = [];
    if (category) {
        const result = await db_1.docClient.send(new lib_dynamodb_1.QueryCommand({
            TableName: db_1.PRODUCTS_TABLE,
            IndexName: "GSI1",
            KeyConditionExpression: "GSI1PK = :pk",
            ExpressionAttributeValues: { ":pk": shared_1.productKeys.gsi1pk(category) },
        }));
        items = (result.Items ?? []);
    }
    else {
        const result = await db_1.docClient.send(new lib_dynamodb_1.ScanCommand({
            TableName: db_1.PRODUCTS_TABLE,
            FilterExpression: "begins_with(PK, :prefix) AND SK = :sk",
            ExpressionAttributeValues: { ":prefix": "PRODUCT#", ":sk": "META" },
        }));
        items = (result.Items ?? []);
    }
    items = items.filter((p) => p.published !== false && (p.inventory ?? 0) > 0);
    if (search) {
        items = items.filter((p) => p.name.toLowerCase().includes(search) ||
            p.description.toLowerCase().includes(search) ||
            p.tags?.some((t) => t.toLowerCase().includes(search)));
    }
    return (0, response_1.ok)({ products: items.map(images_1.withResolvedProductImages) });
}
async function getProduct(event) {
    const slug = event.pathParameters?.slug;
    if (!slug)
        return (0, response_1.badRequest)("Slug required");
    const result = await db_1.docClient.send(new lib_dynamodb_1.GetCommand({
        TableName: db_1.PRODUCTS_TABLE,
        Key: { PK: shared_1.productKeys.pk(slug), SK: shared_1.productKeys.sk() },
    }));
    if (!result.Item)
        return (0, response_1.notFound)("Product not found");
    const product = result.Item;
    if (product.published === false)
        return (0, response_1.notFound)("Product not found");
    return (0, response_1.ok)({ product: (0, images_1.withResolvedProductImages)(result.Item) });
}
async function createProduct(event) {
    const auth = (0, auth_1.getAuth)(event);
    if (!auth?.isAdmin)
        return (0, response_1.forbidden)();
    const body = JSON.parse(event.body ?? "{}");
    const parsed = shared_1.createProductSchema.safeParse(body);
    if (!parsed.success)
        return (0, response_1.badRequest)(parsed.error.message);
    const slug = (0, db_1.slugify)(parsed.data.name);
    const timestamp = (0, db_1.now)();
    const inventory = parsed.data.inventory ?? shared_1.DEFAULT_PRODUCT_INVENTORY;
    const item = {
        ...parsed.data,
        inventory,
        slug,
        PK: shared_1.productKeys.pk(slug),
        SK: shared_1.productKeys.sk(),
        GSI1PK: shared_1.productKeys.gsi1pk(parsed.data.categorySlug),
        GSI1SK: shared_1.productKeys.gsi1sk(slug),
        createdAt: timestamp,
        updatedAt: timestamp,
    };
    await db_1.docClient.send(new lib_dynamodb_1.PutCommand({ TableName: db_1.PRODUCTS_TABLE, Item: item }));
    return (0, response_1.created)({ product: item });
}
async function updateProduct(event) {
    const auth = (0, auth_1.getAuth)(event);
    if (!auth?.isAdmin)
        return (0, response_1.forbidden)();
    const slug = event.pathParameters?.slug;
    if (!slug)
        return (0, response_1.badRequest)("Slug required");
    const existing = await db_1.docClient.send(new lib_dynamodb_1.GetCommand({
        TableName: db_1.PRODUCTS_TABLE,
        Key: { PK: shared_1.productKeys.pk(slug), SK: shared_1.productKeys.sk() },
    }));
    if (!existing.Item)
        return (0, response_1.notFound)("Product not found");
    const previous = existing.Item;
    const body = JSON.parse(event.body ?? "{}");
    const parsed = shared_1.updateProductSchema.safeParse(body);
    if (!parsed.success)
        return (0, response_1.badRequest)(parsed.error.message);
    const updated = {
        ...previous,
        ...parsed.data,
        updatedAt: (0, db_1.now)(),
    };
    if (parsed.data.categorySlug) {
        updated.GSI1PK = shared_1.productKeys.gsi1pk(parsed.data.categorySlug);
        updated.GSI1SK = shared_1.productKeys.gsi1sk(slug);
    }
    await db_1.docClient.send(new lib_dynamodb_1.PutCommand({ TableName: db_1.PRODUCTS_TABLE, Item: updated }));
    if (parsed.data.inventory !== undefined) {
        await (0, inventory_1.syncInventoryAlertState)(slug, previous, parsed.data.inventory);
    }
    return (0, response_1.ok)({ product: updated });
}
/** Admin: list all products including unpublished. */
async function listAdminProducts(event) {
    const auth = (0, auth_1.getAuth)(event);
    if (!auth?.isAdmin)
        return (0, response_1.forbidden)();
    const result = await db_1.docClient.send(new lib_dynamodb_1.ScanCommand({
        TableName: db_1.PRODUCTS_TABLE,
        FilterExpression: "begins_with(PK, :prefix) AND SK = :sk",
        ExpressionAttributeValues: { ":prefix": "PRODUCT#", ":sk": "META" },
    }));
    const items = (result.Items ?? []).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    return (0, response_1.ok)({ products: items.map(images_1.withResolvedProductImages) });
}
async function deleteProduct(event) {
    const auth = (0, auth_1.getAuth)(event);
    if (!auth?.isAdmin)
        return (0, response_1.forbidden)();
    const slug = event.pathParameters?.slug;
    if (!slug)
        return (0, response_1.badRequest)("Slug required");
    await db_1.docClient.send(new lib_dynamodb_1.DeleteCommand({
        TableName: db_1.PRODUCTS_TABLE,
        Key: { PK: shared_1.productKeys.pk(slug), SK: shared_1.productKeys.sk() },
    }));
    return (0, response_1.ok)({ deleted: true });
}
async function bulkUploadProducts(event) {
    const auth = (0, auth_1.getAuth)(event);
    if (!auth?.isAdmin)
        return (0, response_1.forbidden)();
    const body = JSON.parse(event.body ?? "{}");
    const rows = body.rows ?? body;
    if (!Array.isArray(rows))
        return (0, response_1.badRequest)("Expected array of products");
    const createdProducts = [];
    const errors = [];
    for (let i = 0; i < rows.length; i++) {
        const parsed = shared_1.bulkProductRowSchema.safeParse(rows[i]);
        if (!parsed.success) {
            errors.push({ row: i + 1, error: parsed.error.message });
            continue;
        }
        const slug = (0, db_1.slugify)(parsed.data.name);
        const timestamp = (0, db_1.now)();
        const tags = parsed.data.tags
            ? parsed.data.tags.split(",").map((t) => t.trim()).filter(Boolean)
            : [];
        const item = {
            ...parsed.data,
            slug,
            tags,
            images: [],
            PK: shared_1.productKeys.pk(slug),
            SK: shared_1.productKeys.sk(),
            GSI1PK: shared_1.productKeys.gsi1pk(parsed.data.categorySlug),
            GSI1SK: shared_1.productKeys.gsi1sk(slug),
            createdAt: timestamp,
            updatedAt: timestamp,
        };
        await db_1.docClient.send(new lib_dynamodb_1.PutCommand({ TableName: db_1.PRODUCTS_TABLE, Item: item }));
        createdProducts.push(item);
    }
    return (0, response_1.ok)({ created: createdProducts.length, errors, products: createdProducts });
}
