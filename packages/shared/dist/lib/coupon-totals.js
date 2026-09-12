"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testOrderForceTotal = testOrderForceTotal;
exports.applyCouponToOrderTotals = applyCouponToOrderTotals;
const currency_1 = require("../currency");
const coupon_1 = require("../schemas/coupon");
/** Checkout total charged when a test-order coupon is applied ($1 USD, or INR equivalent). */
function testOrderForceTotal(currency, usdInrRate = 0) {
    if (currency === "INR") {
        const rate = usdInrRate > 0 ? usdInrRate : currency_1.DEFAULT_USD_INR_RATE;
        return (0, currency_1.roundForCurrency)(coupon_1.TEST_ORDER_FORCE_TOTAL_USD * rate, "INR");
    }
    return coupon_1.TEST_ORDER_FORCE_TOTAL_USD;
}
function applyCouponToOrderTotals(input) {
    const tax = input.tax ?? 0;
    const currency = input.currency;
    const gross = (0, currency_1.roundForCurrency)(input.subtotal + input.shipping + tax, currency);
    if (input.kind === coupon_1.TEST_ORDER_COUPON_KIND) {
        const total = testOrderForceTotal(currency, input.usdInrRate ?? 0);
        return {
            discount: (0, currency_1.roundForCurrency)(gross - total, currency),
            total,
        };
    }
    const discount = (0, currency_1.roundForCurrency)(input.eligibleSubtotal * ((input.discountPercent ?? 0) / 100), currency);
    return {
        discount,
        total: Math.max(0, (0, currency_1.roundForCurrency)(input.subtotal - discount + input.shipping + tax, currency)),
    };
}
