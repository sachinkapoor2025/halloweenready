import type { AttributionConfidence, TrafficTouch } from "../schemas/attribution";
export type ResolveTrafficInput = {
    /** Full page URL or path+search (may include utm_* / click ids). */
    pageUrl?: string;
    /** document.referrer */
    referrer?: string;
    /** ISO timestamp for the touch */
    at?: string;
};
export declare function referrerHostname(referrer?: string): string | undefined;
export declare function isInternalHost(host?: string): boolean;
export declare function extractCampaignParams(pageUrl?: string): {
    utm: Record<string, string>;
    clickIds: Record<string, string>;
    path: string;
};
/**
 * Central source-detection / normalization.
 * Priority: explicit UTM → click ids → known referrer (search/social) → referral → direct/unknown.
 */
export declare function resolveTrafficSource(input: ResolveTrafficInput): TrafficTouch;
/** Human label for admin UI. */
export declare function formatTrafficTouchLabel(t: TrafficTouch): string;
export declare function isAcquisitionTouch(t: TrafficTouch): boolean;
/** Merge first-touch (never overwrite) + last-touch (always update on new acquisition). */
export declare function applyTouchToJourney(existing: {
    first?: TrafficTouch;
    last?: TrafficTouch;
    assisted: TrafficTouch[];
}, next: TrafficTouch): {
    first: TrafficTouch;
    last: TrafficTouch;
    assisted: TrafficTouch[];
};
export declare function touchKey(t: TrafficTouch): string;
/** Build assisted list from ordered acquisition touches (excluding first & last). */
export declare function assistedFromTouches(touches: TrafficTouch[]): TrafficTouch[];
export declare function confidenceRank(c: AttributionConfidence): number;
/** Best overall confidence for an order route summary. */
export declare function overallAttributionConfidence(first?: TrafficTouch, last?: TrafficTouch): AttributionConfidence;
