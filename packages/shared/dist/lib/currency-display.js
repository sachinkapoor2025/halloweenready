"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_USD_RATES = exports.isDisplayCurrency = exports.displayCurrencyLocale = exports.displayCurrencyFractionDigits = exports.displayCurrencyForCountry = exports.REST_DISPLAY_CURRENCIES = exports.PREFERRED_DISPLAY_CURRENCIES = exports.DISPLAY_CURRENCY_OPTIONS = exports.DISPLAY_CURRENCIES = void 0;
exports.normalizeDisplayCurrency = normalizeDisplayCurrency;
exports.usdRateFor = usdRateFor;
exports.roundDisplayAmount = roundDisplayAmount;
exports.convertCurrency = convertCurrency;
exports.completeUsdRates = completeUsdRates;
const currency_1 = require("../currency");
const display_currencies_1 = require("./display-currencies");
var display_currencies_2 = require("./display-currencies");
Object.defineProperty(exports, "DISPLAY_CURRENCIES", { enumerable: true, get: function () { return display_currencies_2.DISPLAY_CURRENCIES; } });
Object.defineProperty(exports, "DISPLAY_CURRENCY_OPTIONS", { enumerable: true, get: function () { return display_currencies_2.DISPLAY_CURRENCY_OPTIONS; } });
Object.defineProperty(exports, "PREFERRED_DISPLAY_CURRENCIES", { enumerable: true, get: function () { return display_currencies_2.PREFERRED_DISPLAY_CURRENCIES; } });
Object.defineProperty(exports, "REST_DISPLAY_CURRENCIES", { enumerable: true, get: function () { return display_currencies_2.REST_DISPLAY_CURRENCIES; } });
Object.defineProperty(exports, "displayCurrencyForCountry", { enumerable: true, get: function () { return display_currencies_2.displayCurrencyForCountry; } });
Object.defineProperty(exports, "displayCurrencyFractionDigits", { enumerable: true, get: function () { return display_currencies_2.displayCurrencyFractionDigits; } });
Object.defineProperty(exports, "displayCurrencyLocale", { enumerable: true, get: function () { return display_currencies_2.displayCurrencyLocale; } });
Object.defineProperty(exports, "isDisplayCurrency", { enumerable: true, get: function () { return display_currencies_2.isDisplayCurrency; } });
function normalizeDisplayCurrency(value) {
    const code = value.trim().toUpperCase();
    return (0, display_currencies_1.isDisplayCurrency)(code) ? code : "USD";
}
/** Last-resort USD→X rates when live FX is unavailable. */
exports.DEFAULT_USD_RATES = {
    USD: 1,
    GBP: 0.74,
    CAD: 1.38,
    AUD: 1.52,
    AED: 3.6725,
    EUR: 0.85,
    INR: currency_1.DEFAULT_USD_INR_RATE,
    BDT: 122,
    BRL: 5.4,
    CHF: 0.8,
    CNY: 7.2,
    CZK: 21,
    DKK: 6.4,
    EGP: 48,
    HKD: 7.8,
    HUF: 340,
    IDR: 16400,
    ILS: 3.3,
    JPY: 150,
    KES: 129,
    KRW: 1390,
    MXN: 18.5,
    MYR: 4.2,
    NOK: 10,
    NZD: 1.68,
    PHP: 58,
    PKR: 280,
    PLN: 3.65,
    QAR: 3.64,
    RON: 4.3,
    SAR: 3.75,
    SEK: 9.5,
    SGD: 1.28,
    THB: 32.5,
    TRY: 41,
    TWD: 32,
    VND: 26300,
    ZAR: 17.8,
};
function usdRateFor(currency, rates) {
    if (typeof rates === "number") {
        if (currency === "USD")
            return 1;
        if (currency === "INR")
            return rates;
        return exports.DEFAULT_USD_RATES[currency] ?? 1;
    }
    if (currency === "USD")
        return 1;
    const live = rates[currency];
    if (live && live > 0)
        return live;
    return exports.DEFAULT_USD_RATES[currency] ?? 1;
}
function roundDisplayAmount(amount, currency) {
    const digits = (0, display_currencies_1.displayCurrencyFractionDigits)(currency);
    const f = 10 ** digits;
    return Math.round(amount * f) / f;
}
/**
 * Convert between display currencies.
 * `rateOrRates` may be the legacy USD→INR number or a USD→currency map.
 */
function convertCurrency(amount, from, to, rateOrRates) {
    const src = normalizeDisplayCurrency(from);
    const dest = normalizeDisplayCurrency(to);
    if (src === dest) {
        return typeof rateOrRates === "number"
            ? (0, currency_1.roundForCurrency)(amount, dest === "INR" ? "INR" : "USD")
            : roundDisplayAmount(amount, dest);
    }
    if (typeof rateOrRates === "number" && (src === "USD" || src === "INR") && (dest === "USD" || dest === "INR")) {
        return (0, currency_1.roundForCurrency)((0, currency_1.convertCurrencyAmount)(amount, src, dest, rateOrRates), dest);
    }
    const fromRate = usdRateFor(src, rateOrRates);
    const toRate = usdRateFor(dest, rateOrRates);
    const usd = src === "USD" ? amount : amount / fromRate;
    return roundDisplayAmount(usd * toRate, dest);
}
function completeUsdRates(partial) {
    const next = { ...exports.DEFAULT_USD_RATES };
    for (const code of display_currencies_1.DISPLAY_CURRENCIES) {
        const live = partial?.[code];
        if (live && live > 0)
            next[code] = live;
    }
    next.USD = 1;
    return next;
}
