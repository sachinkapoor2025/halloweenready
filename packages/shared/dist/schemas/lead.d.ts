import { z } from "zod";
export declare const leadCaptureSchema: any;
export declare const LEAD_STATUS: {
    readonly NEW: "new";
    readonly CONTACTED: "contacted";
    readonly FOLLOW_UP: "follow_up";
    readonly CONVERTED: "converted";
};
export type LeadStatus = (typeof LEAD_STATUS)[keyof typeof LEAD_STATUS];
export declare const leadStatusSchema: any;
export declare const updateLeadSchema: any;
export type LeadCaptureInput = z.infer<typeof leadCaptureSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type Lead = LeadCaptureInput & {
    leadId: string;
    createdAt: string;
    updatedAt: string;
    leadStatus?: LeadStatus;
    adminNotes?: string;
    assignedTo?: string;
};
