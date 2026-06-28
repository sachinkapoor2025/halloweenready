"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartHandler = getCartHandler;
exports.addToCart = addToCart;
exports.removeFromCart = removeFromCart;
exports.updateCartItem = updateCartItem;
exports.clearCartForUser = clearCartForUser;
exports.clearCart = clearCart;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const shared_1 = require("@halloweenready/shared");
const db_1 = require("../lib/db");
const response_1 = require("../lib/response");
const auth_1 = require("../lib/auth");
const images_1 = require("../lib/images");
/** Stale carts auto-expire after this many days (TTL). */
const CART_TTL_DAYS = 30;
async function getCart(userKey) {
    const result = await db_1.docClient.send(new lib_dynamodb_1.GetCommand({
        TableName: db_1.CARTS_TABLE,
        Key: { PK: shared_1.cartKeys.pk(userKey), SK: shared_1.cartKeys.sk() },
    }));
    return result.Item ?? { items: [], updatedAt: (0, db_1.now)() };
}
async function saveCart(userKey, cart, sessionId) {
    const timestamp = (0, db_1.now)();
    const existing = await db_1.docClient.send(new lib_dynamodb_1.GetCommand({
        TableName: db_1.CARTS_TABLE,
        Key: { PK: shared_1.cartKeys.pk(userKey), SK: shared_1.cartKeys.sk() },
    }));
    const createdAt = existing.Item?.createdAt ?? timestamp;
    const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    const value = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    await db_1.docClient.send(new lib_dynamodb_1.PutCommand({
        TableName: db_1.CARTS_TABLE,
        Item: {
            PK: shared_1.cartKeys.pk(userKey),
            SK: shared_1.cartKeys.sk(),
            ...cart,
            userKey,
            sessionId,
            createdAt,
            itemCount,
            value,
            currency: cart.items[0]?.currency,
            updatedAt: timestamp,
            GSI1PK: shared_1.cartKeys.gsi1pk(),
            GSI1SK: shared_1.cartKeys.gsi1sk(timestamp),
            expiresAt: (0, db_1.ttlInDays)(CART_TTL_DAYS),
        },
    }));
}
async function getCartHandler(event) {
    const userKey = (0, auth_1.getUserOrSessionKey)(event);
    if (!userKey)
        return (0, response_1.unauthorized)("Session or auth required");
    const raw = await getCart(userKey);
    const items = (raw.items ?? []).map((item) => ({
        ...item,
        image: item.image ? (0, images_1.resolveProductImageUrl)(item.image) : item.image,
    }));
    return (0, response_1.ok)({ cart: { items, updatedAt: raw.updatedAt ?? (0, db_1.now)() } });
}
async function addToCart(event) {
    const userKey = (0, auth_1.getUserOrSessionKey)(event);
    if (!userKey)
        return (0, response_1.unauthorized)("Session or auth required");
    const body = JSON.parse(event.body ?? "{}");
    const parsed = shared_1.addToCartSchema.safeParse(body);
    if (!parsed.success)
        return (0, response_1.badRequest)(parsed.error.message);
    const productResult = await db_1.docClient.send(new lib_dynamodb_1.GetCommand({
        TableName: db_1.PRODUCTS_TABLE,
        Key: { PK: shared_1.productKeys.pk(parsed.data.productSlug), SK: shared_1.productKeys.sk() },
    }));
    if (!productResult.Item)
        return (0, response_1.badRequest)("Product not found");
    const product = productResult.Item;
    if (product.inventory < parsed.data.quantity) {
        return (0, response_1.badRequest)("Insufficient inventory");
    }
    const cart = await getCart(userKey);
    const existingIdx = cart.items.findIndex((i) => i.productSlug === parsed.data.productSlug);
    const item = {
        productSlug: product.slug,
        name: product.name,
        price: product.price,
        currency: product.currency,
        quantity: parsed.data.quantity,
        image: (0, images_1.resolveProductImageUrl)(product.images?.[0]),
    };
    if (existingIdx >= 0) {
        const newQty = cart.items[existingIdx].quantity + parsed.data.quantity;
        if (newQty > product.inventory)
            return (0, response_1.badRequest)("Insufficient inventory");
        cart.items[existingIdx].quantity = newQty;
    }
    else {
        cart.items.push(item);
    }
    await saveCart(userKey, cart, (0, auth_1.getSessionId)(event));
    return (0, response_1.ok)({ cart });
}
async function removeFromCart(event) {
    const userKey = (0, auth_1.getUserOrSessionKey)(event);
    if (!userKey)
        return (0, response_1.unauthorized)("Session or auth required");
    const productSlug = event.pathParameters?.productSlug;
    if (!productSlug)
        return (0, response_1.badRequest)("Product slug required");
    const cart = await getCart(userKey);
    cart.items = cart.items.filter((i) => i.productSlug !== productSlug);
    await saveCart(userKey, cart, (0, auth_1.getSessionId)(event));
    return (0, response_1.ok)({ cart });
}
async function updateCartItem(event) {
    const userKey = (0, auth_1.getUserOrSessionKey)(event);
    if (!userKey)
        return (0, response_1.unauthorized)("Session or auth required");
    const productSlug = event.pathParameters?.productSlug;
    if (!productSlug)
        return (0, response_1.badRequest)("Product slug required");
    const body = JSON.parse(event.body ?? "{}");
    const quantity = Number(body.quantity);
    if (!quantity || quantity < 1)
        return (0, response_1.badRequest)("Valid quantity required");
    const cart = await getCart(userKey);
    const item = cart.items.find((i) => i.productSlug === productSlug);
    if (!item)
        return (0, response_1.badRequest)("Item not in cart");
    const productResult = await db_1.docClient.send(new lib_dynamodb_1.GetCommand({
        TableName: db_1.PRODUCTS_TABLE,
        Key: { PK: shared_1.productKeys.pk(productSlug), SK: shared_1.productKeys.sk() },
    }));
    const product = productResult.Item;
    if (!product)
        return (0, response_1.badRequest)("Product not found");
    if (quantity > product.inventory)
        return (0, response_1.badRequest)("Insufficient inventory");
    item.quantity = quantity;
    await saveCart(userKey, cart, (0, auth_1.getSessionId)(event));
    return (0, response_1.ok)({ cart });
}
async function clearCartForUser(userKey) {
    await saveCart(userKey, { items: [], updatedAt: (0, db_1.now)() });
}
async function clearCart(event) {
    const userKey = (0, auth_1.getUserOrSessionKey)(event);
    if (!userKey)
        return (0, response_1.unauthorized)("Session or auth required");
    await clearCartForUser(userKey);
    return (0, response_1.ok)({ cart: { items: [] } });
}
