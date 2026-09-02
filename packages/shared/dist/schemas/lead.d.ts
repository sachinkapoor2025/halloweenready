import { z } from "zod";
export declare const leadCaptureSchema: z.ZodObject<{
    sessionId: z.ZodString;
    userId: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    /** Partial emails while typing are allowed; server keeps only valid addresses on profile. */
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodString>;
    productSlug: z.ZodOptional<z.ZodString>;
    source: z.ZodDefault<z.ZodEnum<["checkout", "newsletter", "product", "browse", "admin", "contact", "chat", "review"]>>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    source: "admin" | "checkout" | "newsletter" | "product" | "browse" | "contact" | "chat" | "review";
    sessionId: string;
    name?: string | undefined;
    productSlug?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    page?: string | undefined;
    metadata?: Record<string, string> | undefined;
    userId?: string | undefined;
}, {
    sessionId: string;
    name?: string | undefined;
    productSlug?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    source?: "admin" | "checkout" | "newsletter" | "product" | "browse" | "contact" | "chat" | "review" | undefined;
    page?: string | undefined;
    metadata?: Record<string, string> | undefined;
    userId?: string | undefined;
}>;
export declare const LEAD_STATUS: {
    readonly NEW: "new";
    readonly CONTACTED: "contacted";
    readonly FOLLOW_UP: "follow_up";
    readonly CONVERTED: "converted";
};
export type LeadStatus = (typeof LEAD_STATUS)[keyof typeof LEAD_STATUS];
export declare const leadStatusSchema: z.ZodEnum<["new", "contacted", "follow_up", "converted"]>;
export declare const updateLeadSchema: z.ZodObject<{
    sessionId: z.ZodString;
    createdAt: z.ZodString;
    leadStatus: z.ZodOptional<z.ZodEnum<["new", "contacted", "follow_up", "converted"]>>;
    adminNotes: z.ZodOptional<z.ZodString>;
    assignedTo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    sessionId: string;
    adminNotes?: string | undefined;
    leadStatus?: "new" | "contacted" | "follow_up" | "converted" | undefined;
    assignedTo?: string | undefined;
}, {
    createdAt: string;
    sessionId: string;
    adminNotes?: string | undefined;
    leadStatus?: "new" | "contacted" | "follow_up" | "converted" | undefined;
    assignedTo?: string | undefined;
}>;
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
