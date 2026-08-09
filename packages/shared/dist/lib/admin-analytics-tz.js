"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_ANALYTICS_UTC_OFFSET = exports.ADMIN_ANALYTICS_TIMEZONE = void 0;
exports.businessDayKey = businessDayKey;
exports.rangeBusinessDays = rangeBusinessDays;
exports.businessDaysBetween = businessDaysBetween;
exports.utcDayBucketsForBusinessDays = utcDayBucketsForBusinessDays;
exports.instantToBusinessDay = instantToBusinessDay;
/**
 * Admin analytics calendar timezone.
 * Operators are IST-based; event GSI keys remain UTC — we expand each IST day
 * to the overlapping UTC day buckets for queries.
 */
exports.ADMIN_ANALYTICS_TIMEZONE = "Asia/Kolkata";
/** IST has no DST — fixed offset for day boundaries. */
exports.ADMIN_ANALYTICS_UTC_OFFSET = "+05:30";
/** YYYY-MM-DD in the admin analytics timezone (default Asia/Kolkata). */
function businessDayKey(date = new Date(), timeZone = exports.ADMIN_ANALYTICS_TIMEZONE) {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);
}
/** Trailing N business days (newest first), including today in that timezone. */
function rangeBusinessDays(days, timeZone = exports.ADMIN_ANALYTICS_TIMEZONE) {
    const n = Math.max(1, Math.floor(days));
    const out = [];
    const today = businessDayKey(new Date(), timeZone);
    // Noon on that business day avoids edge ambiguity when stepping back.
    let cursor = new Date(`${today}T12:00:00${exports.ADMIN_ANALYTICS_UTC_OFFSET}`);
    for (let i = 0; i < n; i++) {
        out.push(businessDayKey(cursor, timeZone));
        cursor = new Date(cursor.getTime() - 86_400_000);
    }
    return out;
}
/** Inclusive business-day list from → to (chronological). */
function businessDaysBetween(from, to) {
    const days = [];
    let cursor = new Date(`${from}T12:00:00${exports.ADMIN_ANALYTICS_UTC_OFFSET}`);
    const end = new Date(`${to}T12:00:00${exports.ADMIN_ANALYTICS_UTC_OFFSET}`);
    if (Number.isNaN(cursor.getTime()) || Number.isNaN(end.getTime()))
        return days;
    while (cursor.getTime() <= end.getTime()) {
        days.push(businessDayKey(cursor));
        cursor = new Date(cursor.getTime() + 86_400_000);
    }
    return days;
}
/**
 * UTC YYYY-MM-DD GSI day buckets that overlap the given Asia/Kolkata business days.
 * Needed because events are stored under UTC dayBucket keys.
 */
function utcDayBucketsForBusinessDays(businessDays) {
    const utc = new Set();
    for (const day of businessDays) {
        const start = new Date(`${day}T00:00:00${exports.ADMIN_ANALYTICS_UTC_OFFSET}`);
        const end = new Date(`${day}T23:59:59.999${exports.ADMIN_ANALYTICS_UTC_OFFSET}`);
        if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()))
            continue;
        utc.add(start.toISOString().slice(0, 10));
        utc.add(end.toISOString().slice(0, 10));
    }
    return [...utc].sort();
}
/** Map an instant to an IST (or configured TZ) calendar day for charts. */
function instantToBusinessDay(iso, timeZone = exports.ADMIN_ANALYTICS_TIMEZONE) {
    if (!iso)
        return undefined;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime()))
        return undefined;
    return businessDayKey(d, timeZone);
}
