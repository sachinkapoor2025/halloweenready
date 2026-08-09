/**
 * Premium marketing email HTML builder (table + inline CSS for Gmail/Outlook).
 * Content is driven by MarketingEmailContent — edit fields in Admin, not the HTML.
 */
export type MarketingEmailCategory = {
    name: string;
    description: string;
    imageUrl: string;
    href: string;
    buttonText: string;
};
export type MarketingEmailPromise = {
    icon: string;
    title: string;
    description: string;
};
export type MarketingEmailContent = {
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
    description: string;
    categoriesHeading: string;
    categoriesSubheading: string;
    categories: MarketingEmailCategory[];
    promiseHeading: string;
    promiseSubheading: string;
    promises: MarketingEmailPromise[];
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
};
export declare const DEFAULT_PREMIUM_MARKETING_EMAIL_CONTENT: MarketingEmailContent;
/** Layout id for structured (form-editable) premium templates. */
export declare const PREMIUM_MARKETING_EMAIL_LAYOUT: "premium-marketing";
/** Build a full HTML email document from editable content fields. */
export declare function buildPremiumMarketingEmailHtml(content: MarketingEmailContent): string;
