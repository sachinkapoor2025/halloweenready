"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTestEmailSchema = exports.SES_RECIPIENT_STATUSES = exports.suppressEmailSchema = exports.sesSettingsSchema = exports.updateSesTemplateSchema = exports.createSesTemplateSchema = exports.marketingEmailContentSchema = exports.uploadSesRecipientsSchema = exports.updateSesCampaignSchema = exports.createSesCampaignSchema = exports.sesRecipientSchema = exports.DEFAULT_SENDER_MESSAGE_FOOTER = exports.SES_TIMEZONES = exports.SES_RECURRENCE_TYPES = exports.SES_CAMPAIGN_STATUSES = void 0;
exports.resolveSesTemplateHtml = resolveSesTemplateHtml;
exports.isValidSesEmail = isValidSesEmail;
exports.renderSesTemplate = renderSesTemplate;
const zod_1 = require("zod");
const marketing_email_html_1 = require("../lib/marketing-email-html");
exports.SES_CAMPAIGN_STATUSES = [
    "draft",
    "scheduled",
    "preparing",
    "sending",
    "paused",
    "completed",
    "cancelled",
    "failed",
];
exports.SES_RECURRENCE_TYPES = ["none", "daily", "weekly", "monthly", "cron"];
exports.SES_TIMEZONES = [
    "Asia/Kolkata",
    "UTC",
    "America/New_York",
    "Europe/London",
    "Australia/Sydney",
];
exports.DEFAULT_SENDER_MESSAGE_FOOTER = {
    companyName: "HalloweenReady / Divit Global Ventures",
    companyAddress: "California, United States",
    contactEmail: "order@halloweenready.com",
    privacyUrl: "https://www.halloweenready.com/privacy",
};
exports.sesRecipientSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string().max(120).optional(),
    company: zod_1.z.string().max(120).optional(),
    city: zod_1.z.string().max(80).optional(),
    state: zod_1.z.string().max(80).optional(),
    country: zod_1.z.string().max(80).optional(),
});
exports.createSesCampaignSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(120),
    subject: zod_1.z.string().min(1).max(200).optional(),
    senderName: zod_1.z.string().min(1).max(80).optional(),
    senderEmail: zod_1.z.string().email().optional(),
    replyTo: zod_1.z.string().email().optional(),
    htmlBody: zod_1.z.string().max(500_000).optional(),
    templateId: zod_1.z.string().optional(),
    scheduledAt: zod_1.z.string().datetime().optional(),
    timezone: zod_1.z.enum(exports.SES_TIMEZONES).optional(),
    recurrenceType: zod_1.z.enum(exports.SES_RECURRENCE_TYPES).optional(),
    recurrenceExpression: zod_1.z.string().max(120).optional(),
});
exports.updateSesCampaignSchema = exports.createSesCampaignSchema.partial().extend({
    status: zod_1.z.enum(exports.SES_CAMPAIGN_STATUSES).optional(),
    action: zod_1.z.enum(["pause", "resume", "cancel", "send_now", "duplicate"]).optional(),
});
exports.uploadSesRecipientsSchema = zod_1.z.object({
    campaignId: zod_1.z.string().min(1),
    recipients: zod_1.z.array(exports.sesRecipientSchema).min(1).max(50_000),
});
const marketingEmailCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(80),
    description: zod_1.z.string().max(200),
    imageUrl: zod_1.z.string().url().max(500),
    href: zod_1.z.string().url().max(500),
    buttonText: zod_1.z.string().min(1).max(40),
});
const marketingEmailPromiseSchema = zod_1.z.object({
    icon: zod_1.z.string().min(1).max(16),
    title: zod_1.z.string().min(1).max(80),
    description: zod_1.z.string().max(160),
});
/** Editable fields for structured premium marketing templates (Admin form). */
exports.marketingEmailContentSchema = zod_1.z.object({
    preheader: zod_1.z.string().max(200),
    logoUrl: zod_1.z.string().url().max(500),
    logoHref: zod_1.z.string().url().max(500),
    logoAlt: zod_1.z.string().max(160),
    heroImageUrl: zod_1.z.string().url().max(500),
    heroImageAlt: zod_1.z.string().max(200),
    heroImageHref: zod_1.z.string().url().max(500),
    heroOverlayTitle: zod_1.z.string().max(80),
    heroOverlaySubtitle: zod_1.z.string().max(160),
    heroButtonText: zod_1.z.string().min(1).max(40),
    heroButtonHref: zod_1.z.string().url().max(500),
    heading: zod_1.z.string().min(1).max(160),
    description: zod_1.z.string().max(600),
    categoriesHeading: zod_1.z.string().max(80),
    categoriesSubheading: zod_1.z.string().max(160),
    categories: zod_1.z.array(marketingEmailCategorySchema).min(1).max(4),
    promiseHeading: zod_1.z.string().max(80),
    promiseSubheading: zod_1.z.string().max(160),
    promises: zod_1.z.array(marketingEmailPromiseSchema).min(1).max(8),
    midCtaHeading: zod_1.z.string().max(120),
    midCtaDescription: zod_1.z.string().max(240),
    midCtaButtonText: zod_1.z.string().min(1).max(40),
    midCtaButtonHref: zod_1.z.string().url().max(500),
    footerTagline: zod_1.z.string().max(120),
    websiteUrl: zod_1.z.string().url().max(500),
    websiteLabel: zod_1.z.string().max(80),
    orderEmail: zod_1.z.string().email().max(120),
    facebookUrl: zod_1.z.string().url().max(500),
    facebookIconUrl: zod_1.z.string().url().max(500),
    instagramUrl: zod_1.z.string().url().max(500),
    instagramIconUrl: zod_1.z.string().url().max(500),
    copyrightText: zod_1.z.string().max(120),
    unsubscribeLabel: zod_1.z.string().max(40),
});
const sesTemplateFieldsSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(120),
    subject: zod_1.z.string().min(1).max(200),
    /** Required unless contentFields is provided (HTML is then generated). */
    htmlBody: zod_1.z.string().max(500_000).optional(),
    /** Optional stable id for starter/seed templates (e.g. raksha-bandhan-usa). */
    templateId: zod_1.z
        .string()
        .min(1)
        .max(80)
        .regex(/^[a-z0-9-]+$/, "templateId must be lowercase letters, numbers, or hyphens")
        .optional(),
    /** Structured layout — enables Admin visual editor without editing HTML. */
    layout: zod_1.z.literal(marketing_email_html_1.PREMIUM_MARKETING_EMAIL_LAYOUT).optional(),
    contentFields: exports.marketingEmailContentSchema.optional(),
});
exports.createSesTemplateSchema = sesTemplateFieldsSchema.superRefine((val, ctx) => {
    if (!val.htmlBody?.trim() && !val.contentFields) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "htmlBody or contentFields is required",
            path: ["htmlBody"],
        });
    }
});
exports.updateSesTemplateSchema = sesTemplateFieldsSchema.partial();
/** Resolve HTML for a template: prefer rebuilding from contentFields when present. */
function resolveSesTemplateHtml(input) {
    if (input.contentFields && input.layout === marketing_email_html_1.PREMIUM_MARKETING_EMAIL_LAYOUT) {
        return (0, marketing_email_html_1.buildPremiumMarketingEmailHtml)(input.contentFields);
    }
    if (input.contentFields && !input.htmlBody?.trim()) {
        return (0, marketing_email_html_1.buildPremiumMarketingEmailHtml)(input.contentFields);
    }
    return input.htmlBody?.trim() || (0, marketing_email_html_1.buildPremiumMarketingEmailHtml)(marketing_email_html_1.DEFAULT_PREMIUM_MARKETING_EMAIL_CONTENT);
}
exports.sesSettingsSchema = zod_1.z.object({
    awsRegion: zod_1.z.string().min(2).max(40).default("us-east-1"),
    defaultSenderName: zod_1.z.string().min(1).max(80).default("HalloweenReady"),
    defaultSenderEmail: zod_1.z.string().email().default("order@halloweenready.com"),
    defaultReplyTo: zod_1.z.string().email().default("order@halloweenready.com"),
    dailyLimit: zod_1.z.number().int().min(1).max(200_000).default(50_000),
    maxSendRatePerMinute: zod_1.z.number().int().min(1).max(14_000).default(600),
    batchSize: zod_1.z.number().int().min(1).max(500).default(50),
    delayBetweenBatchesMs: zod_1.z.number().int().min(0).max(60_000).default(5000),
    concurrentWorkers: zod_1.z.number().int().min(1).max(10).default(5),
    companyName: zod_1.z.string().max(120).optional(),
    companyAddress: zod_1.z.string().max(240).optional(),
    contactEmail: zod_1.z.string().email().optional(),
    privacyUrl: zod_1.z.string().url().optional(),
    adminNotifyEmail: zod_1.z.string().email().optional(),
    /**
     * Marketing transport. Default smtp — SES account may be suspended.
     * Transactional order mail still uses separate SMTP_* env (email.ts).
     */
    marketingTransport: zod_1.z.enum(["smtp", "ses"]).default("smtp"),
    smtpHost: zod_1.z.string().max(200).optional().or(zod_1.z.literal("")),
    smtpPort: zod_1.z.coerce.number().int().min(1).max(65535).default(587),
    /** true = SMTPS (465); false = STARTTLS (typically 587). */
    smtpSecure: zod_1.z.coerce.boolean().default(false),
    smtpUser: zod_1.z.string().max(200).optional().or(zod_1.z.literal("")),
    /** Stored in Dynamo settings; never returned in full by GET (redacted). */
    smtpPassword: zod_1.z.string().max(500).optional().or(zod_1.z.literal("")),
});
exports.suppressEmailSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    reason: zod_1.z.enum(["manual", "hard_bounce", "complaint", "unsubscribe"]).default("manual"),
});
/** Per-recipient lifecycle for marketing campaigns (stored on RECIPIENT# rows). */
exports.SES_RECIPIENT_STATUSES = [
    "ready",
    "queued",
    "sent",
    "delivered",
    "opened",
    "clicked",
    "failed",
    "bounced",
    "unsubscribed",
];
exports.sendTestEmailSchema = zod_1.z.object({
    campaignId: zod_1.z.string().min(1),
    to: zod_1.z.string().email(),
});
/** Basic email format check for client-side CSV preview. */
function isValidSesEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
/** Replace {{name}}, {{company}}, {{email}} placeholders. */
function renderSesTemplate(html, vars) {
    return html
        .replace(/\{\{\s*name\s*\}\}/gi, vars.name?.trim() || "there")
        .replace(/\{\{\s*company\s*\}\}/gi, vars.company?.trim() || "")
        .replace(/\{\{\s*email\s*\}\}/gi, vars.email?.trim() || "");
}
