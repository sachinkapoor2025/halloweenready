import type { CartItemAddon } from "../schemas/cart";
import type { Product } from "../schemas/product";
export declare const HAMPER_TAG = "halloween-hamper";
/** Individual product value inside a hamper may exceed the bundle price by this ratio. */
export declare const HAMPER_CONTENTS_VALUE_HEADROOM = 0.07;
export type HamperLine = {
    slug: string;
    name: string;
    image?: string;
    price: number;
};
export type HamperCustomization = {
    excludedSlugs: string[];
    replacements: Array<{
        fromSlug: string;
        toSlug: string;
    }>;
    extraSlugs: string[];
};
/** Shared swap/extra pool — family-safe fillers already on the live catalog. */
export declare const HAMPER_ADDON_POOL: HamperLine[];
type HamperDef = {
    slug: string;
    name: string;
    price: number;
    tagline: string;
    description: string;
    contents: HamperLine[];
    images: string[];
};
export declare const HALLOWEEN_HAMPER_DEFS: HamperDef[];
export declare const HALLOWEEN_HAMPERS_CATEGORY: {
    readonly name: "Halloween Hampers";
    readonly slug: "halloween-hampers";
    readonly description: "Ready-to-gift Halloween hampers — curated décor, costume, and party kits with free shipping over $49. Swap included items for add-ons at the same hamper price.";
    readonly sortOrder: 0;
};
export declare function isHalloweenHamperProduct(product: {
    categorySlug?: string | null;
    tags?: string[] | null;
    slug?: string | null;
}): boolean;
export declare function isStorefrontVisibleProduct(product: {
    vendorSlug?: string | null;
    cjPid?: string | null;
    categorySlug?: string | null;
    tags?: string[] | null;
    slug?: string | null;
}): boolean;
export declare function hamperContentsValue(contents: HamperLine[]): number;
export declare function addonsForHamper(contents: HamperLine[]): HamperLine[];
export declare function hamperCustomizationSignature(custom: HamperCustomization | undefined | null): string;
export declare function emptyHamperCustomization(): HamperCustomization;
/** Contents actually shipped after swaps + paid extras. */
export declare function resolvedHamperContentSlugs(contents: HamperLine[], custom?: HamperCustomization | null): string[];
export declare function cartLinesMatch(a: {
    addons?: Array<{
        id: string;
        quantity?: number;
    }> | null;
    hamperCustomization?: HamperCustomization | null;
    cjVid?: string | null;
}, b: {
    addons?: Array<{
        id: string;
        quantity?: number;
    }> | null;
    hamperCustomization?: HamperCustomization | null;
    cjVid?: string | null;
}): boolean;
export declare function resolveHamperCustomization(product: {
    hamperContents?: HamperLine[] | null;
    hamperAddons?: HamperLine[] | null;
    price: number;
}, custom?: HamperCustomization | null): {
    ok: true;
    extras: CartItemAddon[];
    custom: HamperCustomization;
} | {
    ok: false;
    error: string;
};
export declare function buildHalloweenHamperCatalogProducts(): Array<Omit<Product, "createdAt" | "updatedAt"> & {
    vendorSlug: string;
}>;
export declare function getHalloweenHamperDef(slug: string): HamperDef | undefined;
export {};
