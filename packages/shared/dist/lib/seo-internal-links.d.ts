export type SeoLink = {
    href: string;
    label: string;
};
export type SeoLinkGroup = {
    heading: string;
    links: SeoLink[];
};
export type InternalLinkPage = {
    type: "home";
} | {
    type: "listing";
} | {
    type: "category";
    categorySlug: string;
} | {
    type: "product";
    categorySlug: string;
    productSlug: string;
    availableCountryCodes?: string[] | null;
} | {
    type: "country";
    countrySlug: string;
} | {
    type: "city";
    citySlug: string;
} | {
    type: "guide";
} | {
    type: "events";
} | {
    type: "blog";
    blogSlug: string;
    relatedCategory?: string;
} | {
    type: "shipping";
};
export declare const SEO_CATEGORY_LINKS: readonly SeoLink[];
/** Countries we can quote CJ freight for — never market unquoted destinations as shippable. */
export declare const VERIFIED_COUNTRY_LINKS: readonly (SeoLink & {
    slug: string;
    code: string;
    name: string;
})[];
/** High-value US metros/states already live at /cities/{slug}. */
export declare const PRIORITY_CITY_LINKS: readonly SeoLink[];
export declare const PLANNING_LINKS: readonly SeoLink[];
export declare const FEATURED_BLOG_LINKS: readonly SeoLink[];
export declare function pickStable<T>(items: readonly T[], seed: string, count: number): T[];
/**
 * Contextual internal links. Caps each group so pages do not become doorway blocks.
 * Location links never imply delivery unless the destination is quoteable.
 */
export declare function getInternalLinkGroups(page: InternalLinkPage): SeoLinkGroup[];
