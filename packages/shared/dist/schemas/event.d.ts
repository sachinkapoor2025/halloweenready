import { z } from "zod";
export declare const eventTypeEnum: any;
export declare const trackEventSchema: any;
/** Events are sent in batches to reduce request volume. */
export declare const trackEventBatchSchema: any;
export type TrackEventInput = z.infer<typeof trackEventSchema>;
export type TrackEventBatch = z.infer<typeof trackEventBatchSchema>;
export type AnalyticsEvent = TrackEventInput & {
    eventId: string;
    createdAt: string;
};
