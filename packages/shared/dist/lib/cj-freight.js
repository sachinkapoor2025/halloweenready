"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCjAging = formatCjAging;
exports.normalizeCjFreightQuotes = normalizeCjFreightQuotes;
/** Turn CJ `logisticAging` ("3-7", "2-2") into a customer-facing label. */
function formatCjAging(raw) {
    const trimmed = String(raw ?? "").trim();
    if (!trimmed)
        return "";
    const stripped = trimmed.replace(/\s*days?\s*/gi, "").trim();
    const range = stripped.match(/^(\d+)\s*[-–to]+\s*(\d+)$/i);
    if (range) {
        const a = range[1];
        const b = range[2];
        if (a === b)
            return `${a} days`;
        return `${a}–${b} days`;
    }
    if (/^\d+$/.test(stripped))
        return `${stripped} days`;
    return /day/i.test(trimmed) ? trimmed : `${trimmed} days`;
}
function minDays(label) {
    const m = label.match(/(\d+)/);
    return m ? Number(m[1]) : 99;
}
function normalizeCjFreightQuotes(data) {
    const rows = Array.isArray(data)
        ? data
        : data && typeof data === "object" && Array.isArray(data.data)
            ? (data.data)
            : [];
    const methods = [];
    const seen = new Set();
    for (const row of rows) {
        if (!row || typeof row !== "object")
            continue;
        const rec = row;
        const name = String(rec.logisticName ?? rec.logisticsName ?? rec.channel ?? "").trim();
        if (!name || seen.has(name.toLowerCase()))
            continue;
        const price = Number(rec.logisticPrice ?? rec.price ?? rec.postage ?? rec.totalPostageFee);
        const aging = formatCjAging(String(rec.logisticAging ?? rec.aging ?? rec.deliveryTime ?? ""));
        if (!aging || !Number.isFinite(price) || price < 0)
            continue;
        seen.add(name.toLowerCase());
        methods.push({
            name,
            daysLabel: aging,
            priceUsd: Math.round(price * 100) / 100,
        });
    }
    methods.sort((a, b) => {
        const days = minDays(a.daysLabel) - minDays(b.daysLabel);
        if (days !== 0)
            return days;
        return a.priceUsd - b.priceUsd;
    });
    return methods.slice(0, 12);
}
