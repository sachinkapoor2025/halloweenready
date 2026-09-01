"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundMoney = roundMoney;
exports.pricingFromVendorCost = pricingFromVendorCost;
exports.stripVendorPrivateFields = stripVendorPrivateFields;
exports.stripVendorCost = stripVendorCost;
const currency_1 = require("../currency");
const constants_1 = require("../constants");
/** Round money to cents for USD (or currency-aware). */
function roundMoney(n, currency = "USD") {
    return (0, currency_1.roundForCurrency)(n, currency);
}
/**
 * Convert vendor wholesale cost → store list + sale prices.
 * Sale targets ~50% gross margin; list is higher for the sale strikethrough.
 * Vendor identity is backend-only — not part of customer-facing copy.
 */
function pricingFromVendorCost(vendorCost, currency = "USD") {
    const cost = Number(vendorCost);
    if (!Number.isFinite(cost) || cost <= 0) {
        throw new Error("vendorCost must be a positive number");
    }
    const compareAtPrice = roundMoney(cost * constants_1.ORANGE_COUNTY_LIST_MARKUP, currency);
    const price = roundMoney(cost * constants_1.ORANGE_COUNTY_SALE_MARKUP, currency);
    return { vendorCost: roundMoney(cost, currency), price, compareAtPrice };
}
/** Strip backend-only vendor fields before public product APIs / SSR. */
function stripVendorPrivateFields(product) {
    const { vendorCost: _c, vendorSlug: _v, ...rest } = product;
    if (!rest.cjVariants?.length)
        return rest;
    return {
        ...rest,
        cjVariants: rest.cjVariants.map(({ vendorCost: _vc, ...variant }) => variant),
    };
}
/** @deprecated Use stripVendorPrivateFields */
function stripVendorCost(product) {
    const { vendorCost: _cost, ...rest } = product;
    return rest;
}
