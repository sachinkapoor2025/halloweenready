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
export declare const sesRecipientSchema: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    company: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    name?: string | undefined;
    country?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    company?: string | undefined;
}, {
    email: string;
    name?: string | undefined;
    country?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    company?: string | undefined;
}>;
export declare const createSesCampaignSchema: z.ZodObject<{
    name: z.ZodString;
    subject: z.ZodOptional<z.ZodString>;
    senderName: z.ZodOptional<z.ZodString>;
    senderEmail: z.ZodOptional<z.ZodString>;
    replyTo: z.ZodOptional<z.ZodString>;
    htmlBody: z.ZodOptional<z.ZodString>;
    templateId: z.ZodOptional<z.ZodString>;
    scheduledAt: z.ZodOptional<z.ZodString>;
    timezone: z.ZodOptional<z.ZodEnum<["Asia/Kolkata", "UTC", "America/New_York", "Europe/London", "Australia/Sydney"]>>;
    recurrenceType: z.ZodOptional<z.ZodEnum<["none", "daily", "weekly", "monthly", "cron"]>>;
    recurrenceExpression: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    senderName?: string | undefined;
    subject?: string | undefined;
    senderEmail?: string | undefined;
    replyTo?: string | undefined;
    htmlBody?: string | undefined;
    templateId?: string | undefined;
    scheduledAt?: string | undefined;
    timezone?: "America/New_York" | "Asia/Kolkata" | "UTC" | "Europe/London" | "Australia/Sydney" | undefined;
    recurrenceType?: "none" | "daily" | "weekly" | "monthly" | "cron" | undefined;
    recurrenceExpression?: string | undefined;
}, {
    name: string;
    senderName?: string | undefined;
    subject?: string | undefined;
    senderEmail?: string | undefined;
    replyTo?: string | undefined;
    htmlBody?: string | undefined;
    templateId?: string | undefined;
    scheduledAt?: string | undefined;
    timezone?: "America/New_York" | "Asia/Kolkata" | "UTC" | "Europe/London" | "Australia/Sydney" | undefined;
    recurrenceType?: "none" | "daily" | "weekly" | "monthly" | "cron" | undefined;
    recurrenceExpression?: string | undefined;
}>;
export declare const updateSesCampaignSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    subject: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    senderName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    senderEmail: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    replyTo: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    htmlBody: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    templateId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    scheduledAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    timezone: z.ZodOptional<z.ZodOptional<z.ZodEnum<["Asia/Kolkata", "UTC", "America/New_York", "Europe/London", "Australia/Sydney"]>>>;
    recurrenceType: z.ZodOptional<z.ZodOptional<z.ZodEnum<["none", "daily", "weekly", "monthly", "cron"]>>>;
    recurrenceExpression: z.ZodOptional<z.ZodOptional<z.ZodString>>;
} & {
    status: z.ZodOptional<z.ZodEnum<["draft", "scheduled", "preparing", "sending", "paused", "completed", "cancelled", "failed"]>>;
    action: z.ZodOptional<z.ZodEnum<["pause", "resume", "cancel", "send_now", "duplicate"]>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    status?: "cancelled" | "failed" | "draft" | "scheduled" | "preparing" | "sending" | "paused" | "completed" | undefined;
    senderName?: string | undefined;
    subject?: string | undefined;
    senderEmail?: string | undefined;
    replyTo?: string | undefined;
    htmlBody?: string | undefined;
    templateId?: string | undefined;
    scheduledAt?: string | undefined;
    timezone?: "America/New_York" | "Asia/Kolkata" | "UTC" | "Europe/London" | "Australia/Sydney" | undefined;
    recurrenceType?: "none" | "daily" | "weekly" | "monthly" | "cron" | undefined;
    recurrenceExpression?: string | undefined;
    action?: "pause" | "resume" | "cancel" | "send_now" | "duplicate" | undefined;
}, {
    name?: string | undefined;
    status?: "cancelled" | "failed" | "draft" | "scheduled" | "preparing" | "sending" | "paused" | "completed" | undefined;
    senderName?: string | undefined;
    subject?: string | undefined;
    senderEmail?: string | undefined;
    replyTo?: string | undefined;
    htmlBody?: string | undefined;
    templateId?: string | undefined;
    scheduledAt?: string | undefined;
    timezone?: "America/New_York" | "Asia/Kolkata" | "UTC" | "Europe/London" | "Australia/Sydney" | undefined;
    recurrenceType?: "none" | "daily" | "weekly" | "monthly" | "cron" | undefined;
    recurrenceExpression?: string | undefined;
    action?: "pause" | "resume" | "cancel" | "send_now" | "duplicate" | undefined;
}>;
export declare const uploadSesRecipientsSchema: z.ZodObject<{
    campaignId: z.ZodString;
    recipients: z.ZodArray<z.ZodObject<{
        email: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        company: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        name?: string | undefined;
        country?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        company?: string | undefined;
    }, {
        email: string;
        name?: string | undefined;
        country?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        company?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    campaignId: string;
    recipients: {
        email: string;
        name?: string | undefined;
        country?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        company?: string | undefined;
    }[];
}, {
    campaignId: string;
    recipients: {
        email: string;
        name?: string | undefined;
        country?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        company?: string | undefined;
    }[];
}>;
/** Editable fields for structured premium marketing templates (Admin form). */
export declare const marketingEmailContentSchema: z.ZodObject<{
    preheader: z.ZodString;
    logoUrl: z.ZodString;
    logoHref: z.ZodString;
    logoAlt: z.ZodString;
    heroImageUrl: z.ZodString;
    heroImageAlt: z.ZodString;
    heroImageHref: z.ZodString;
    heroOverlayTitle: z.ZodString;
    heroOverlaySubtitle: z.ZodString;
    heroButtonText: z.ZodString;
    heroButtonHref: z.ZodString;
    heading: z.ZodString;
    description: z.ZodString;
    categoriesHeading: z.ZodString;
    categoriesSubheading: z.ZodString;
    categories: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        imageUrl: z.ZodString;
        href: z.ZodString;
        buttonText: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description: string;
        imageUrl: string;
        href: string;
        buttonText: string;
    }, {
        name: string;
        description: string;
        imageUrl: string;
        href: string;
        buttonText: string;
    }>, "many">;
    promiseHeading: z.ZodString;
    promiseSubheading: z.ZodString;
    promises: z.ZodArray<z.ZodObject<{
        icon: z.ZodString;
        title: z.ZodString;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        description: string;
        title: string;
        icon: string;
    }, {
        description: string;
        title: string;
        icon: string;
    }>, "many">;
    midCtaHeading: z.ZodString;
    midCtaDescription: z.ZodString;
    midCtaButtonText: z.ZodString;
    midCtaButtonHref: z.ZodString;
    footerTagline: z.ZodString;
    websiteUrl: z.ZodString;
    websiteLabel: z.ZodString;
    orderEmail: z.ZodString;
    facebookUrl: z.ZodString;
    facebookIconUrl: z.ZodString;
    instagramUrl: z.ZodString;
    instagramIconUrl: z.ZodString;
    copyrightText: z.ZodString;
    unsubscribeLabel: z.ZodString;
}, "strip", z.ZodTypeAny, {
    description: string;
    preheader: string;
    logoUrl: string;
    logoHref: string;
    logoAlt: string;
    heroImageUrl: string;
    heroImageAlt: string;
    heroImageHref: string;
    heroOverlayTitle: string;
    heroOverlaySubtitle: string;
    heroButtonText: string;
    heroButtonHref: string;
    heading: string;
    categoriesHeading: string;
    categoriesSubheading: string;
    categories: {
        name: string;
        description: string;
        imageUrl: string;
        href: string;
        buttonText: string;
    }[];
    promiseHeading: string;
    promiseSubheading: string;
    promises: {
        description: string;
        title: string;
        icon: string;
    }[];
    midCtaHeading: string;
    midCtaDescription: string;
    midCtaButtonText: string;
    midCtaButtonHref: string;
    footerTagline: string;
    websiteUrl: string;
    websiteLabel: string;
    orderEmail: string;
    facebookUrl: string;
    facebookIconUrl: string;
    instagramUrl: string;
    instagramIconUrl: string;
    copyrightText: string;
    unsubscribeLabel: string;
}, {
    description: string;
    preheader: string;
    logoUrl: string;
    logoHref: string;
    logoAlt: string;
    heroImageUrl: string;
    heroImageAlt: string;
    heroImageHref: string;
    heroOverlayTitle: string;
    heroOverlaySubtitle: string;
    heroButtonText: string;
    heroButtonHref: string;
    heading: string;
    categoriesHeading: string;
    categoriesSubheading: string;
    categories: {
        name: string;
        description: string;
        imageUrl: string;
        href: string;
        buttonText: string;
    }[];
    promiseHeading: string;
    promiseSubheading: string;
    promises: {
        description: string;
        title: string;
        icon: string;
    }[];
    midCtaHeading: string;
    midCtaDescription: string;
    midCtaButtonText: string;
    midCtaButtonHref: string;
    footerTagline: string;
    websiteUrl: string;
    websiteLabel: string;
    orderEmail: string;
    facebookUrl: string;
    facebookIconUrl: string;
    instagramUrl: string;
    instagramIconUrl: string;
    copyrightText: string;
    unsubscribeLabel: string;
}>;
export type MarketingEmailContentInput = z.infer<typeof marketingEmailContentSchema>;
export declare const createSesTemplateSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    subject: z.ZodString;
    /** Required unless contentFields is provided (HTML is then generated). */
    htmlBody: z.ZodOptional<z.ZodString>;
    /** Optional stable id for starter/seed templates (e.g. raksha-bandhan-usa). */
    templateId: z.ZodOptional<z.ZodString>;
    /** Structured layout — enables Admin visual editor without editing HTML. */
    layout: z.ZodOptional<z.ZodLiteral<"premium-marketing">>;
    contentFields: z.ZodOptional<z.ZodObject<{
        preheader: z.ZodString;
        logoUrl: z.ZodString;
        logoHref: z.ZodString;
        logoAlt: z.ZodString;
        heroImageUrl: z.ZodString;
        heroImageAlt: z.ZodString;
        heroImageHref: z.ZodString;
        heroOverlayTitle: z.ZodString;
        heroOverlaySubtitle: z.ZodString;
        heroButtonText: z.ZodString;
        heroButtonHref: z.ZodString;
        heading: z.ZodString;
        description: z.ZodString;
        categoriesHeading: z.ZodString;
        categoriesSubheading: z.ZodString;
        categories: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            description: z.ZodString;
            imageUrl: z.ZodString;
            href: z.ZodString;
            buttonText: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            description: string;
            imageUrl: string;
            href: string;
            buttonText: string;
        }, {
            name: string;
            description: string;
            imageUrl: string;
            href: string;
            buttonText: string;
        }>, "many">;
        promiseHeading: z.ZodString;
        promiseSubheading: z.ZodString;
        promises: z.ZodArray<z.ZodObject<{
            icon: z.ZodString;
            title: z.ZodString;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            description: string;
            title: string;
            icon: string;
        }, {
            description: string;
            title: string;
            icon: string;
        }>, "many">;
        midCtaHeading: z.ZodString;
        midCtaDescription: z.ZodString;
        midCtaButtonText: z.ZodString;
        midCtaButtonHref: z.ZodString;
        footerTagline: z.ZodString;
        websiteUrl: z.ZodString;
        websiteLabel: z.ZodString;
        orderEmail: z.ZodString;
        facebookUrl: z.ZodString;
        facebookIconUrl: z.ZodString;
        instagramUrl: z.ZodString;
        instagramIconUrl: z.ZodString;
        copyrightText: z.ZodString;
        unsubscribeLabel: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        description: string;
        preheader: string;
        logoUrl: string;
        logoHref: string;
        logoAlt: string;
        heroImageUrl: string;
        heroImageAlt: string;
        heroImageHref: string;
        heroOverlayTitle: string;
        heroOverlaySubtitle: string;
        heroButtonText: string;
        heroButtonHref: string;
        heading: string;
        categoriesHeading: string;
        categoriesSubheading: string;
        categories: {
            name: string;
            description: string;
            imageUrl: string;
            href: string;
            buttonText: string;
        }[];
        promiseHeading: string;
        promiseSubheading: string;
        promises: {
            description: string;
            title: string;
            icon: string;
        }[];
        midCtaHeading: string;
        midCtaDescription: string;
        midCtaButtonText: string;
        midCtaButtonHref: string;
        footerTagline: string;
        websiteUrl: string;
        websiteLabel: string;
        orderEmail: string;
        facebookUrl: string;
        facebookIconUrl: string;
        instagramUrl: string;
        instagramIconUrl: string;
        copyrightText: string;
        unsubscribeLabel: string;
    }, {
        description: string;
        preheader: string;
        logoUrl: string;
        logoHref: string;
        logoAlt: string;
        heroImageUrl: string;
        heroImageAlt: string;
        heroImageHref: string;
        heroOverlayTitle: string;
        heroOverlaySubtitle: string;
        heroButtonText: string;
        heroButtonHref: string;
        heading: string;
        categoriesHeading: string;
        categoriesSubheading: string;
        categories: {
            name: string;
            description: string;
            imageUrl: string;
            href: string;
            buttonText: string;
        }[];
        promiseHeading: string;
        promiseSubheading: string;
        promises: {
            description: string;
            title: string;
            icon: string;
        }[];
        midCtaHeading: string;
        midCtaDescription: string;
        midCtaButtonText: string;
        midCtaButtonHref: string;
        footerTagline: string;
        websiteUrl: string;
        websiteLabel: string;
        orderEmail: string;
        facebookUrl: string;
        facebookIconUrl: string;
        instagramUrl: string;
        instagramIconUrl: string;
        copyrightText: string;
        unsubscribeLabel: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    subject: string;
    htmlBody?: string | undefined;
    templateId?: string | undefined;
    layout?: "premium-marketing" | undefined;
    contentFields?: {
        description: string;
        preheader: string;
        logoUrl: string;
        logoHref: string;
        logoAlt: string;
        heroImageUrl: string;
        heroImageAlt: string;
        heroImageHref: string;
        heroOverlayTitle: string;
        heroOverlaySubtitle: string;
        heroButtonText: string;
        heroButtonHref: string;
        heading: string;
        categoriesHeading: string;
        categoriesSubheading: string;
        categories: {
            name: string;
            description: string;
            imageUrl: string;
            href: string;
            buttonText: string;
        }[];
        promiseHeading: string;
        promiseSubheading: string;
        promises: {
            description: string;
            title: string;
            icon: string;
        }[];
        midCtaHeading: string;
        midCtaDescription: string;
        midCtaButtonText: string;
        midCtaButtonHref: string;
        footerTagline: string;
        websiteUrl: string;
        websiteLabel: string;
        orderEmail: string;
        facebookUrl: string;
        facebookIconUrl: string;
        instagramUrl: string;
        instagramIconUrl: string;
        copyrightText: string;
        unsubscribeLabel: string;
    } | undefined;
}, {
    name: string;
    subject: string;
    htmlBody?: string | undefined;
    templateId?: string | undefined;
    layout?: "premium-marketing" | undefined;
    contentFields?: {
        description: string;
        preheader: string;
        logoUrl: string;
        logoHref: string;
        logoAlt: string;
        heroImageUrl: string;
        heroImageAlt: string;
        heroImageHref: string;
        heroOverlayTitle: string;
        heroOverlaySubtitle: string;
        heroButtonText: string;
        heroButtonHref: string;
        heading: string;
        categoriesHeading: string;
        categoriesSubheading: string;
        categories: {
            name: string;
            description: string;
            imageUrl: string;
            href: string;
            buttonText: string;
        }[];
        promiseHeading: string;
        promiseSubheading: string;
        promises: {
            description: string;
            title: string;
            icon: string;
        }[];
        midCtaHeading: string;
        midCtaDescription: string;
        midCtaButtonText: string;
        midCtaButtonHref: string;
        footerTagline: string;
        websiteUrl: string;
        websiteLabel: string;
        orderEmail: string;
        facebookUrl: string;
        facebookIconUrl: string;
        instagramUrl: string;
        instagramIconUrl: string;
        copyrightText: string;
        unsubscribeLabel: string;
    } | undefined;
}>, {
    name: string;
    subject: string;
    htmlBody?: string | undefined;
    templateId?: string | undefined;
    layout?: "premium-marketing" | undefined;
    contentFields?: {
        description: string;
        preheader: string;
        logoUrl: string;
        logoHref: string;
        logoAlt: string;
        heroImageUrl: string;
        heroImageAlt: string;
        heroImageHref: string;
        heroOverlayTitle: string;
        heroOverlaySubtitle: string;
        heroButtonText: string;
        heroButtonHref: string;
        heading: string;
        categoriesHeading: string;
        categoriesSubheading: string;
        categories: {
            name: string;
            description: string;
            imageUrl: string;
            href: string;
            buttonText: string;
        }[];
        promiseHeading: string;
        promiseSubheading: string;
        promises: {
            description: string;
            title: string;
            icon: string;
        }[];
        midCtaHeading: string;
        midCtaDescription: string;
        midCtaButtonText: string;
        midCtaButtonHref: string;
        footerTagline: string;
        websiteUrl: string;
        websiteLabel: string;
        orderEmail: string;
        facebookUrl: string;
        facebookIconUrl: string;
        instagramUrl: string;
        instagramIconUrl: string;
        copyrightText: string;
        unsubscribeLabel: string;
    } | undefined;
}, {
    name: string;
    subject: string;
    htmlBody?: string | undefined;
    templateId?: string | undefined;
    layout?: "premium-marketing" | undefined;
    contentFields?: {
        description: string;
        preheader: string;
        logoUrl: string;
        logoHref: string;
        logoAlt: string;
        heroImageUrl: string;
        heroImageAlt: string;
        heroImageHref: string;
        heroOverlayTitle: string;
        heroOverlaySubtitle: string;
        heroButtonText: string;
        heroButtonHref: string;
        heading: string;
        categoriesHeading: string;
        categoriesSubheading: string;
        categories: {
            name: string;
            description: string;
            imageUrl: string;
            href: string;
            buttonText: string;
        }[];
        promiseHeading: string;
        promiseSubheading: string;
        promises: {
            description: string;
            title: string;
            icon: string;
        }[];
        midCtaHeading: string;
        midCtaDescription: string;
        midCtaButtonText: string;
        midCtaButtonHref: string;
        footerTagline: string;
        websiteUrl: string;
        websiteLabel: string;
        orderEmail: string;
        facebookUrl: string;
        facebookIconUrl: string;
        instagramUrl: string;
        instagramIconUrl: string;
        copyrightText: string;
        unsubscribeLabel: string;
    } | undefined;
}>;
export declare const updateSesTemplateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    subject: z.ZodOptional<z.ZodString>;
    htmlBody: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    templateId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    layout: z.ZodOptional<z.ZodOptional<z.ZodLiteral<"premium-marketing">>>;
    contentFields: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        preheader: z.ZodString;
        logoUrl: z.ZodString;
        logoHref: z.ZodString;
        logoAlt: z.ZodString;
        heroImageUrl: z.ZodString;
        heroImageAlt: z.ZodString;
        heroImageHref: z.ZodString;
        heroOverlayTitle: z.ZodString;
        heroOverlaySubtitle: z.ZodString;
        heroButtonText: z.ZodString;
        heroButtonHref: z.ZodString;
        heading: z.ZodString;
        description: z.ZodString;
        categoriesHeading: z.ZodString;
        categoriesSubheading: z.ZodString;
        categories: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            description: z.ZodString;
            imageUrl: z.ZodString;
            href: z.ZodString;
            buttonText: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            description: string;
            imageUrl: string;
            href: string;
            buttonText: string;
        }, {
            name: string;
            description: string;
            imageUrl: string;
            href: string;
            buttonText: string;
        }>, "many">;
        promiseHeading: z.ZodString;
        promiseSubheading: z.ZodString;
        promises: z.ZodArray<z.ZodObject<{
            icon: z.ZodString;
            title: z.ZodString;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            description: string;
            title: string;
            icon: string;
        }, {
            description: string;
            title: string;
            icon: string;
        }>, "many">;
        midCtaHeading: z.ZodString;
        midCtaDescription: z.ZodString;
        midCtaButtonText: z.ZodString;
        midCtaButtonHref: z.ZodString;
        footerTagline: z.ZodString;
        websiteUrl: z.ZodString;
        websiteLabel: z.ZodString;
        orderEmail: z.ZodString;
        facebookUrl: z.ZodString;
        facebookIconUrl: z.ZodString;
        instagramUrl: z.ZodString;
        instagramIconUrl: z.ZodString;
        copyrightText: z.ZodString;
        unsubscribeLabel: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        description: string;
        preheader: string;
        logoUrl: string;
        logoHref: string;
        logoAlt: string;
        heroImageUrl: string;
        heroImageAlt: string;
        heroImageHref: string;
        heroOverlayTitle: string;
        heroOverlaySubtitle: string;
        heroButtonText: string;
        heroButtonHref: string;
        heading: string;
        categoriesHeading: string;
        categoriesSubheading: string;
        categories: {
            name: string;
            description: string;
            imageUrl: string;
            href: string;
            buttonText: string;
        }[];
        promiseHeading: string;
        promiseSubheading: string;
        promises: {
            description: string;
            title: string;
            icon: string;
        }[];
        midCtaHeading: string;
        midCtaDescription: string;
        midCtaButtonText: string;
        midCtaButtonHref: string;
        footerTagline: string;
        websiteUrl: string;
        websiteLabel: string;
        orderEmail: string;
        facebookUrl: string;
        facebookIconUrl: string;
        instagramUrl: string;
        instagramIconUrl: string;
        copyrightText: string;
        unsubscribeLabel: string;
    }, {
        description: string;
        preheader: string;
        logoUrl: string;
        logoHref: string;
        logoAlt: string;
        heroImageUrl: string;
        heroImageAlt: string;
        heroImageHref: string;
        heroOverlayTitle: string;
        heroOverlaySubtitle: string;
        heroButtonText: string;
        heroButtonHref: string;
        heading: string;
        categoriesHeading: string;
        categoriesSubheading: string;
        categories: {
            name: string;
            description: string;
            imageUrl: string;
            href: string;
            buttonText: string;
        }[];
        promiseHeading: string;
        promiseSubheading: string;
        promises: {
            description: string;
            title: string;
            icon: string;
        }[];
        midCtaHeading: string;
        midCtaDescription: string;
        midCtaButtonText: string;
        midCtaButtonHref: string;
        footerTagline: string;
        websiteUrl: string;
        websiteLabel: string;
        orderEmail: string;
        facebookUrl: string;
        facebookIconUrl: string;
        instagramUrl: string;
        instagramIconUrl: string;
        copyrightText: string;
        unsubscribeLabel: string;
    }>>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    subject?: string | undefined;
    htmlBody?: string | undefined;
    templateId?: string | undefined;
    layout?: "premium-marketing" | undefined;
    contentFields?: {
        description: string;
        preheader: string;
        logoUrl: string;
        logoHref: string;
        logoAlt: string;
        heroImageUrl: string;
        heroImageAlt: string;
        heroImageHref: string;
        heroOverlayTitle: string;
        heroOverlaySubtitle: string;
        heroButtonText: string;
        heroButtonHref: string;
        heading: string;
        categoriesHeading: string;
        categoriesSubheading: string;
        categories: {
            name: string;
            description: string;
            imageUrl: string;
            href: string;
            buttonText: string;
        }[];
        promiseHeading: string;
        promiseSubheading: string;
        promises: {
            description: string;
            title: string;
            icon: string;
        }[];
        midCtaHeading: string;
        midCtaDescription: string;
        midCtaButtonText: string;
        midCtaButtonHref: string;
        footerTagline: string;
        websiteUrl: string;
        websiteLabel: string;
        orderEmail: string;
        facebookUrl: string;
        facebookIconUrl: string;
        instagramUrl: string;
        instagramIconUrl: string;
        copyrightText: string;
        unsubscribeLabel: string;
    } | undefined;
}, {
    name?: string | undefined;
    subject?: string | undefined;
    htmlBody?: string | undefined;
    templateId?: string | undefined;
    layout?: "premium-marketing" | undefined;
    contentFields?: {
        description: string;
        preheader: string;
        logoUrl: string;
        logoHref: string;
        logoAlt: string;
        heroImageUrl: string;
        heroImageAlt: string;
        heroImageHref: string;
        heroOverlayTitle: string;
        heroOverlaySubtitle: string;
        heroButtonText: string;
        heroButtonHref: string;
        heading: string;
        categoriesHeading: string;
        categoriesSubheading: string;
        categories: {
            name: string;
            description: string;
            imageUrl: string;
            href: string;
            buttonText: string;
        }[];
        promiseHeading: string;
        promiseSubheading: string;
        promises: {
            description: string;
            title: string;
            icon: string;
        }[];
        midCtaHeading: string;
        midCtaDescription: string;
        midCtaButtonText: string;
        midCtaButtonHref: string;
        footerTagline: string;
        websiteUrl: string;
        websiteLabel: string;
        orderEmail: string;
        facebookUrl: string;
        facebookIconUrl: string;
        instagramUrl: string;
        instagramIconUrl: string;
        copyrightText: string;
        unsubscribeLabel: string;
    } | undefined;
}>;
/** Resolve HTML for a template: prefer rebuilding from contentFields when present. */
export declare function resolveSesTemplateHtml(input: {
    htmlBody?: string;
    layout?: string;
    contentFields?: MarketingEmailContent | MarketingEmailContentInput | null;
}): string;
export declare const sesSettingsSchema: z.ZodObject<{
    awsRegion: z.ZodDefault<z.ZodString>;
    defaultSenderName: z.ZodDefault<z.ZodString>;
    defaultSenderEmail: z.ZodDefault<z.ZodString>;
    defaultReplyTo: z.ZodDefault<z.ZodString>;
    dailyLimit: z.ZodDefault<z.ZodNumber>;
    maxSendRatePerMinute: z.ZodDefault<z.ZodNumber>;
    batchSize: z.ZodDefault<z.ZodNumber>;
    delayBetweenBatchesMs: z.ZodDefault<z.ZodNumber>;
    concurrentWorkers: z.ZodDefault<z.ZodNumber>;
    companyName: z.ZodOptional<z.ZodString>;
    companyAddress: z.ZodOptional<z.ZodString>;
    contactEmail: z.ZodOptional<z.ZodString>;
    privacyUrl: z.ZodOptional<z.ZodString>;
    adminNotifyEmail: z.ZodOptional<z.ZodString>;
    /**
     * Marketing transport. Default smtp — SES account may be suspended.
     * Transactional order mail still uses separate SMTP_* env (email.ts).
     */
    marketingTransport: z.ZodDefault<z.ZodEnum<["smtp", "ses"]>>;
    smtpHost: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    smtpPort: z.ZodDefault<z.ZodNumber>;
    /** true = SMTPS (465); false = STARTTLS (typically 587). */
    smtpSecure: z.ZodDefault<z.ZodBoolean>;
    smtpUser: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    /** Stored in Dynamo settings; never returned in full by GET (redacted). */
    smtpPassword: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
}, "strip", z.ZodTypeAny, {
    awsRegion: string;
    defaultSenderName: string;
    defaultSenderEmail: string;
    defaultReplyTo: string;
    dailyLimit: number;
    maxSendRatePerMinute: number;
    batchSize: number;
    delayBetweenBatchesMs: number;
    concurrentWorkers: number;
    marketingTransport: "smtp" | "ses";
    smtpPort: number;
    smtpSecure: boolean;
    companyName?: string | undefined;
    companyAddress?: string | undefined;
    contactEmail?: string | undefined;
    privacyUrl?: string | undefined;
    adminNotifyEmail?: string | undefined;
    smtpHost?: string | undefined;
    smtpUser?: string | undefined;
    smtpPassword?: string | undefined;
}, {
    awsRegion?: string | undefined;
    defaultSenderName?: string | undefined;
    defaultSenderEmail?: string | undefined;
    defaultReplyTo?: string | undefined;
    dailyLimit?: number | undefined;
    maxSendRatePerMinute?: number | undefined;
    batchSize?: number | undefined;
    delayBetweenBatchesMs?: number | undefined;
    concurrentWorkers?: number | undefined;
    companyName?: string | undefined;
    companyAddress?: string | undefined;
    contactEmail?: string | undefined;
    privacyUrl?: string | undefined;
    adminNotifyEmail?: string | undefined;
    marketingTransport?: "smtp" | "ses" | undefined;
    smtpHost?: string | undefined;
    smtpPort?: number | undefined;
    smtpSecure?: boolean | undefined;
    smtpUser?: string | undefined;
    smtpPassword?: string | undefined;
}>;
export declare const suppressEmailSchema: z.ZodObject<{
    email: z.ZodString;
    reason: z.ZodDefault<z.ZodEnum<["manual", "hard_bounce", "complaint", "unsubscribe"]>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    reason: "manual" | "hard_bounce" | "complaint" | "unsubscribe";
}, {
    email: string;
    reason?: "manual" | "hard_bounce" | "complaint" | "unsubscribe" | undefined;
}>;
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
export declare const sendTestEmailSchema: z.ZodObject<{
    campaignId: z.ZodString;
    to: z.ZodString;
}, "strip", z.ZodTypeAny, {
    campaignId: string;
    to: string;
}, {
    campaignId: string;
    to: string;
}>;
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
