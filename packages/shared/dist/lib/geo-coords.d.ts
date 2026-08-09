/** Map country (+ optional city) to approximate lat/lng for the live visitors graph. */
export declare function approxGeoCoords(input: {
    country?: string | null;
    city?: string | null;
    region?: string | null;
}): {
    lat: number;
    lng: number;
};
