"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGlobalAdmin = isGlobalAdmin;
exports.vendorScopeSlug = vendorScopeSlug;
exports.assertVendorOwnsVendorId = assertVendorOwnsVendorId;
exports.orderVisibleToActor = orderVisibleToActor;
exports.productVisibleToActor = productVisibleToActor;
exports.warehouseVisibleToActor = warehouseVisibleToActor;
exports.redactOrderForVendor = redactOrderForVendor;
exports.defaultVendorSlugForNewProduct = defaultVendorSlugForNewProduct;
const constants_1 = require("../constants");
const order_vendors_1 = require("./order-vendors");
function isGlobalAdmin(actor) {
    return Boolean(actor?.isAdmin);
}
function vendorScopeSlug(actor) {
    if (!actor)
        return undefined;
    if (actor.isAdmin)
        return undefined;
    if (actor.isVendor && actor.vendorSlug)
        return actor.vendorSlug;
    return undefined;
}
function assertVendorOwnsVendorId(actor, vendorId) {
    if (isGlobalAdmin(actor))
        return true;
    if (!actor.vendorSlug)
        return false;
    return actor.vendorSlug === vendorId;
}
function orderVisibleToActor(order, actor) {
    if (isGlobalAdmin(actor))
        return true;
    if (!actor.vendorSlug)
        return false;
    return (0, order_vendors_1.orderHasVendor)(order, actor.vendorSlug);
}
function productVisibleToActor(product, actor) {
    if (isGlobalAdmin(actor))
        return true;
    if (!actor.vendorSlug)
        return false;
    return (0, order_vendors_1.lineVendorKey)(product) === actor.vendorSlug;
}
function warehouseVisibleToActor(warehouse, actor, vendorWarehouseIds) {
    if (isGlobalAdmin(actor))
        return true;
    if (!actor.vendorSlug)
        return false;
    if (warehouse.vendorId && warehouse.vendorId === actor.vendorSlug)
        return true;
    if (vendorWarehouseIds?.includes(warehouse.warehouseId))
        return true;
    return false;
}
function redactOrderForVendor(order, vendorSlug) {
    const items = (order.items ?? []).filter((i) => (0, order_vendors_1.lineVendorKey)(i) === vendorSlug);
    return { ...order, items };
}
function defaultVendorSlugForNewProduct(actor) {
    if (!isGlobalAdmin(actor) && actor.vendorSlug)
        return actor.vendorSlug;
    return constants_1.VENDOR_HALLOWEENREADY;
}
