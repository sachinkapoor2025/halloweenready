"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseViewerGeoFromHeaders = parseViewerGeoFromHeaders;
exports.mergeViewerGeo = mergeViewerGeo;
exports.formatViewerLocation = formatViewerLocation;
exports.viewerGeoFromMetadata = viewerGeoFromMetadata;
const GEO_HEADER_KEYS = {
    country: ["cloudfront-viewer-country", "cf-ipcountry", "x-country-code"],
    city: ["cloudfront-viewer-city"],
    region: ["cloudfront-viewer-country-region"],
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
    if (hints?.timezone?.includes("Kolkata") || hints?.timezone?.includes("Calcutta")) {
        return "IN";
    }
    if (hints?.locale?.startsWith("en-IN"))
        return "IN";
    if (hints?.locale?.startsWith("en-US"))
        return "US";
    if (hints?.timezone)
        return hints.timezone;
    return "—";
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
