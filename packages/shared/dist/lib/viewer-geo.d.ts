/** Estimated visitor location from CDN edge headers (CloudFront on Amplify). */
export type ViewerGeo = {
    country?: string;
    region?: string;
    regionName?: string;
    city?: string;
};
/** Parse CloudFront / CDN geo headers (keys may be any casing). */
export declare function parseViewerGeoFromHeaders(headers: Record<string, string | undefined>): ViewerGeo;
export declare function mergeViewerGeo(client: ViewerGeo, edge: ViewerGeo): ViewerGeo;
/** Human-readable location for admin. */
export declare function formatViewerLocation(geo: ViewerGeo, hints?: {
    timezone?: string;
    locale?: string;
}): string;
/**
 * Best-effort ISO country for analytics pies.
 * Prefer CDN/geo country; otherwise infer from timezone/locale (same cues as Location column).
 */
export declare function inferViewerCountryCode(geo: ViewerGeo, hints?: {
    timezone?: string;
    locale?: string;
}): string | undefined;
export declare function viewerGeoFromMetadata(metadata?: Record<string, string>): ViewerGeo;
