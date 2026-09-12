"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseViewerGeoFromHeaders = parseViewerGeoFromHeaders;
exports.mergeViewerGeo = mergeViewerGeo;
exports.formatViewerLocation = formatViewerLocation;
exports.inferViewerCountryCode = inferViewerCountryCode;
exports.viewerGeoFromMetadata = viewerGeoFromMetadata;
const GEO_HEADER_KEYS = {
    country: [
        "cloudfront-viewer-country",
        "cf-ipcountry",
        "x-vercel-ip-country",
        "x-country-code",
        "x-geo-country",
    ],
    city: ["cloudfront-viewer-city", "x-vercel-ip-city"],
    region: ["cloudfront-viewer-country-region", "x-vercel-ip-country-region"],
    regionName: ["cloudfront-viewer-country-region-name"],
};
function decodeGeoHeader(value) {
    try {
        return decodeURIComponent(value.replace(/\+/g, " ")).trim();
    }
    catch {
        return value.trim();
    }
}
function headerValue(headers, names) {
    for (const name of names) {
        const direct = headers[name];
        if (direct)
            return decodeGeoHeader(direct);
        const lower = headers[name.toLowerCase()];
        if (lower)
            return decodeGeoHeader(lower);
    }
    return undefined;
}
/** Parse CloudFront / CDN geo headers (keys may be any casing). */
function parseViewerGeoFromHeaders(headers) {
    const normalized = {};
    for (const [key, value] of Object.entries(headers)) {
        if (value)
            normalized[key.toLowerCase()] = value;
    }
    const country = headerValue(normalized, GEO_HEADER_KEYS.country)?.toUpperCase();
    const city = headerValue(normalized, GEO_HEADER_KEYS.city);
    const region = headerValue(normalized, GEO_HEADER_KEYS.region)?.toUpperCase();
    const regionName = headerValue(normalized, GEO_HEADER_KEYS.regionName);
    const geo = {};
    if (country && /^[A-Z]{2}$/.test(country))
        geo.country = country;
    if (city)
        geo.city = city;
    if (region)
        geo.region = region;
    if (regionName)
        geo.regionName = regionName;
    return geo;
}
function mergeViewerGeo(client, edge) {
    return {
        country: client.country ?? edge.country,
        city: client.city ?? edge.city,
        region: client.region ?? edge.region,
        regionName: client.regionName ?? edge.regionName,
    };
}
/** Human-readable location for admin. */
function formatViewerLocation(geo, hints) {
    const parts = [];
    if (geo.city)
        parts.push(geo.city);
    const regionLabel = geo.regionName ?? geo.region;
    if (regionLabel && regionLabel.toLowerCase() !== geo.city?.toLowerCase()) {
        parts.push(regionLabel);
    }
    if (geo.country)
        parts.push(geo.country);
    if (parts.length > 0)
        return parts.join(", ");
    const inferred = inferViewerCountryCode(geo, hints);
    if (inferred)
        return inferred;
    if (hints?.timezone)
        return hints.timezone;
    return "—";
}
/**
 * Best-effort ISO country for analytics pies.
 * Prefer CDN/geo country; otherwise infer from timezone/locale (same cues as Location column).
 */
function inferViewerCountryCode(geo, hints) {
    if (geo.country && /^[A-Z]{2}$/i.test(geo.country)) {
        return geo.country.toUpperCase();
    }
    const tz = hints?.timezone ?? "";
    const locale = (hints?.locale ?? "").toLowerCase();
    if (tz.includes("Kolkata") || tz.includes("Calcutta") || locale.startsWith("en-in") || locale.startsWith("hi")) {
        return "IN";
    }
    if (tz.startsWith("Asia/Singapore") || locale.endsWith("-sg"))
        return "SG";
    if (tz.startsWith("Asia/Shanghai") || tz.startsWith("Asia/Chongqing") || tz.startsWith("Asia/Harbin")) {
        return "CN";
    }
    if (tz.startsWith("Asia/Hong_Kong"))
        return "HK";
    if (tz.startsWith("Asia/Tokyo"))
        return "JP";
    if (tz.startsWith("Asia/Dubai"))
        return "AE";
    if (tz.startsWith("Asia/Ho_Chi_Minh") || tz.startsWith("Asia/Saigon"))
        return "VN";
    if (tz.startsWith("Australia/") || locale.endsWith("-au"))
        return "AU";
    if (tz.startsWith("America/Toronto") ||
        tz.startsWith("America/Vancouver") ||
        tz.startsWith("America/Edmonton") ||
        tz.startsWith("America/Winnipeg") ||
        locale.endsWith("-ca")) {
        return "CA";
    }
    if (tz.startsWith("America/") || locale.startsWith("en-us"))
        return "US";
    if (tz.startsWith("Europe/London") || locale.endsWith("-gb"))
        return "GB";
    if (tz.startsWith("Europe/"))
        return undefined; // don't guess a single EU country
    if (locale.startsWith("en-us"))
        return "US";
    if (locale.startsWith("en-in"))
        return "IN";
    return undefined;
}
function viewerGeoFromMetadata(metadata) {
    if (!metadata)
        return {};
    return {
        country: metadata.country,
        city: metadata.city,
        region: metadata.region,
        regionName: metadata.regionName,
    };
}
