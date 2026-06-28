"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeDisplayCurrency = normalizeDisplayCurrency;
exports.convertCurrency = convertCurrency;
const currency_1 = require("../currency");
function normalizeDisplayCurrency(value) {
    return value === "INR" ? "INR" : "USD";
}
function convertCurrency(amount, from, to, rate) {
    return (0, currency_1.roundForCurrency)((0, currency_1.convertCurrencyAmount)(amount, from, to, rate), to);
}
