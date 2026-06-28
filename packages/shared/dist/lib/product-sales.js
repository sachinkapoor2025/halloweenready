"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnitsSold = getUnitsSold;
exports.isFastSelling = isFastSelling;
exports.sortByUnitsSold = sortByUnitsSold;
const constants_1 = require("../constants");
/** Total units sold — only the counter incremented when orders are paid (never inferred from stock). */
function getUnitsSold(product) {
    return product.unitsSold ?? 0;
}
/** In stock and at least FAST_SELLING_THRESHOLD real paid orders. */
function isFastSelling(product) {
    return (product.inventory ?? 0) > 0 && getUnitsSold(product) >= constants_1.FAST_SELLING_THRESHOLD;
}
function sortByUnitsSold(a, b) {
    return getUnitsSold(b) - getUnitsSold(a);
}
