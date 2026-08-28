"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartSchema = exports.addToCartSchema = exports.cartItemSchema = exports.cartItemAddonSchema = void 0;
const zod_1 = require("zod");
exports.cartItemAddonSchema = zod_1.z.object({
    id: zod_1.z.string().min(1).max(80),
    name: zod_1.z.string().min(1).max(160),
    /** Unit price in the cart line currency. */
    price: zod_1.z.number().nonnegative(),
    quantity: zod_1.z.number().int().min(1).default(1),
});
exports.cartItemSchema = zod_1.z.object({
    /** Stable cart line id (required for update/delete when add-ons differ). */
    lineId: zod_1.z.string().min(1).optional(),
    productSlug: zod_1.z.string(),
    name: zod_1.z.string(),
    /** Plain-text product snippet for order emails (optional; older carts omit this). */
    description: zod_1.z.string().max(200).optional(),
    price: zod_1.z.number(),
    currency: zod_1.z.enum(["USD", "INR"]),
    quantity: zod_1.z.number().int().min(1),
    image: zod_1.z.string().optional(),
    /** Copied from product at add-to-cart for vendor order feeds. */
    vendorSlug: zod_1.z.string().min(1).max(80).optional(),
    /**
     * Snapshot of product.vendorCost at add-to-cart (USD wholesale).
     * Used for vendor payouts so catalog price changes do not rewrite history.
     */
    vendorCost: zod_1.z.number().nonnegative().optional(),
    sku: zod_1.z.string().optional(),
    /** Copied from product — flash / fixed deals are not coupon-eligible. */
    couponExcluded: zod_1.z.boolean().optional(),
    /** Optional HalloweenReady dry-fruit / chocolate extras on this line. */
    addons: zod_1.z.array(exports.cartItemAddonSchema).max(20).optional(),
});
const addToCartAddonSchema = zod_1.z.union([
    zod_1.z.string().min(1).max(80),
    zod_1.z.object({
        id: zod_1.z.string().min(1).max(80),
        quantity: zod_1.z.number().int().min(1).max(10).default(1),
    }),
]);
exports.addToCartSchema = zod_1.z.object({
    productSlug: zod_1.z.string(),
    quantity: zod_1.z.number().int().min(1).default(1),
    name: zod_1.z.string().max(120).optional(),
    email: zod_1.z.string().max(254).optional(),
    phone: zod_1.z.string().max(40).optional(),
    /**
     * Product add-ons: catalog ids and/or `{ id, quantity }` (server fills name/price).
     * Plain string ids still accepted (= quantity 1).
     */
    addons: zod_1.z.array(addToCartAddonSchema).max(20).optional(),
});
exports.cartSchema = zod_1.z.object({
    items: zod_1.z.array(exports.cartItemSchema).default([]),
    updatedAt: zod_1.z.string(),
});
