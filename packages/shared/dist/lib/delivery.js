"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBusinessDays = addBusinessDays;
exports.formatDeliveryDate = formatDeliveryDate;
exports.estimatedDeliveryRange = estimatedDeliveryRange;
exports.estimatedDeliveryLabel = estimatedDeliveryLabel;
exports.estimatedDeliveryShort = estimatedDeliveryShort;
/** US delivery estimate: 5–7 business days from today. */
function addBusinessDays(from, days) {
    const date = new Date(from);
    let added = 0;
    while (added < days) {
        date.setDate(date.getDate() + 1);
        if (date.getDay() !== 0 && date.getDay() !== 6)
            added++;
    }
    return date;
}
function formatDeliveryDate(date) {
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}
function estimatedDeliveryRange(from = new Date()) {
    return {
        start: addBusinessDays(from, 5),
        end: addBusinessDays(from, 7),
    };
}
function estimatedDeliveryLabel(from = new Date()) {
    const { start, end } = estimatedDeliveryRange(from);
    return `Arrives ${formatDeliveryDate(start)} – ${formatDeliveryDate(end)} (USA)`;
}
function estimatedDeliveryShort(from = new Date()) {
    const { start, end } = estimatedDeliveryRange(from);
    return `${formatDeliveryDate(start)} – ${formatDeliveryDate(end)}`;
}
