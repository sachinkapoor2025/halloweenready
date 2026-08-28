import { z } from "zod";
import { PREMIUM_MARKETING_EMAIL_LAYOUT, type MarketingEmailContent } from "../lib/marketing-email-html";
export declare const SES_CAMPAIGN_STATUSES: readonly ["draft", "scheduled", "preparing", "sending", "paused", "completed", "cancelled", "failed"];
export type SesCampaignStatus = (typeof SES_CAMPAIGN_STATUSES)[number];
export declare const SES_RECURRENCE_TYPES: readonly ["none", "daily", "weekly", "monthly", "cron"];
export type SesRecurrenceType = (typeof SES_RECURRENCE_TYPES)[number];
export declare const SES_TIMEZONES: readonly ["Asia/Kolkata", "UTC", "America/New_York", "Europe/London", "Australia/Sydney"];
export declare const DEFAULT_SENDER_MESSAGE_FOOTER: {
    readonly companyName: "HalloweenReady / Divit Global Ventures";
    readonly companyAddress: "California, United States";
    readonly contactEmail: "order@halloweenready.com";
    readonly privacyUrl: "https://www.halloweenready.com/privacy";
};
export declare const sesRecipientSchema: any;
export declare const createSesCampaignSchema: any;
export declare const updateSesCampaignSchema: any;
export declare const uploadSesRecipientsSchema: any;
/** Editable fields for structured premium marketing templates (Admin form). */
export declare const marketingEmailContentSchema: any;
export type MarketingEmailContentInput = z.infer<typeof marketingEmailContentSchema>;
export declare const createSesTemplateSchema: any;
export declare const updateSesTemplateSchema: any;
/** Resolve HTML for a template: prefer rebuilding from contentFields when present. */
export declare function resolveSesTemplateHtml(input: {
    htmlBody?: string;
    layout?: string;
    contentFields?: MarketingEmailContent | MarketingEmailContentInput | null;
}): string;
export declare const sesSettingsSchema: any;
export declare const suppressEmailSchema: any;
/** Per-recipient lifecycle for marketing campaigns (stored on RECIPIENT# rows). */
export declare const SES_RECIPIENT_STATUSES: readonly ["ready", "queued", "sent", "delivered", "opened", "clicked", "failed", "bounced", "unsubscribed"];
export type SesRecipientStatus = (typeof SES_RECIPIENT_STATUSES)[number];
export type SesRecipientActivity = {
    email: string;
    name?: string;
    campaignId: string;
    campaignName?: string;
    status: SesRecipientStatus | string;
    sentAt?: string;
    deliveredAt?: string;
    openedAt?: string;
    clickedAt?: string;
    bouncedAt?: string;
    failedAt?: string;
    lastError?: string;
    /** Clicked a tracked link in the email (visited site via campaign). */
    visitedSite: boolean;
    /** Matched a store order email after the campaign send. */
    placedOrder: boolean;
    orderId?: string;
};
export declare const sendTestEmailSchema: any;
export type SesRecipient = z.infer<typeof sesRecipientSchema>;
export type CreateSesCampaignInput = z.infer<typeof createSesCampaignSchema>;
export type UpdateSesCampaignInput = z.infer<typeof updateSesCampaignSchema>;
export type CreateSesTemplateInput = z.infer<typeof createSesTemplateSchema>;
export type UpdateSesTemplateInput = z.infer<typeof updateSesTemplateSchema>;
export type SesSettings = z.infer<typeof sesSettingsSchema>;
export type SesTemplate = {
    templateId: string;
    name: string;
    subject: string;
    htmlBody: string;
    layout?: typeof PREMIUM_MARKETING_EMAIL_LAYOUT;
    contentFields?: MarketingEmailContentInput;
    createdAt: string;
    updatedAt: string;
};
export type SesCampaign = {
    campaignId: string;
    name: string;
    subject: string;
    senderName: string;
    senderEmail: string;
    replyTo: string;
    htmlBody: string;
    templateId?: string;
    status: SesCampaignStatus;
    scheduledAt?: string;
    timezone: string;
    recurrenceType: SesRecurrenceType;
    recurrenceExpression?: string;
    nextRunAt?: string;
    lastRunAt?: string;
    recipientCount: number;
    queuedCount: number;
    sentCount: number;
    deliveredCount: number;
    failedCount: number;
    bouncedCount: number;
    complaintCount: number;
    openCount: number;
    clickCount: number;
    createdBy?: string;
    createdAt: string;
    updatedAt: string;
};
/** Basic email format check for client-side CSV preview. */
export declare function isValidSesEmail(value: string): boolean;
/** Replace {{name}}, {{company}}, {{email}} placeholders. */
export declare function renderSesTemplate(html: string, vars: {
    name?: string;
    company?: string;
    email?: string;
}): string;
