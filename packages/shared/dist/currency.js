"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_USD_INR_RATE = void 0;
exports.roundForCurrency = roundForCurrency;
exports.convertCurrencyAmount = convertCurrencyAmount;
exports.convertCartItemsToCurrency = convertCartItemsToCurrency;
exports.cartSubtotal = cartSubtotal;
exports.resolveUsdInrRate = resolveUsdInrRate;
exports.fetchLiveUsdInrRate = fetchLiveUsdInrRate;
/** Last-resort fallback when live providers are unavailable (~Jun 2026). */
exports.DEFAULT_USD_INR_RATE = 96;
function roundForCurrency(amount, currency) {
    return currency === "INR" ? Math.round(amount) : Math.round(amount * 100) / 100;
}
function convertCurrencyAmount(amount, from, to, rate) {
    if (from === to)
        return amount;
    if (from === "USD" && to === "INR")
        return amount * rate;
    return amount / rate;
}
/** Convert cart line items to the checkout currency (e.g. USD catalog → INR Razorpay). */
function convertCartItemsToCurrency(items, to, rate) {
    if (!items.length)
        return items;
    const from = items[0].currency;
    if (from === to)
        return items;
    return items.map((item) => ({
        ...item,
        price: roundForCurrency(convertCurrencyAmount(item.price, from, to, rate), to),
        currency: to,
    }));
}
function cartSubtotal(items) {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
function resolveUsdInrRate(envRate) {
    const parsed = Number(envRate);
    if (Number.isFinite(parsed) && parsed > 0)
        return parsed;
    return exports.DEFAULT_USD_INR_RATE;
}
async function fetchJson(url, timeoutMs = 8000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
        if (!res.ok)
            throw new Error(`HTTP ${res.status}`);
        return res.json();
    }
    finally {
        clearTimeout(timer);
    }
}
/** Fetch USD→INR from public rate APIs (no API key). Tries multiple providers. */
async function fetchLiveUsdInrRate() {
    const asOf = new Date().toISOString();
    try {
        const data = (await fetchJson("https://api.frankfurter.app/latest?from=USD&to=INR"));
        const rate = data.rates?.INR;
        if (rate && rate > 0) {
            return { rate, source: "frankfurter", asOf };
        }
    }
    catch {
        /* try next provider */
    }
    try {
        const data = (await fetchJson("https://open.er-api.com/v6/latest/USD"));
        const rate = data.rates?.INR;
        if (rate && rate > 0) {
            return { rate, source: "open.er-api.com", asOf };
        }
    }
    catch {
        /* try next provider */
    }
    try {
        const data = (await fetchJson("https://api.exchangerate.host/latest?base=USD&symbols=INR"));
        const rate = data.rates?.INR;
        if (rate && rate > 0) {
            return { rate, source: "exchangerate.host", asOf };
        }
    }
    catch {
        /* exhausted providers */
    }
    return null;
}
