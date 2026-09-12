export type ProductAddonGroup = "dry-fruits" | "chocolates";
export type ProductAddonDef = {
    id: string;
    name: string;
    priceUsd: number;
    group: ProductAddonGroup;
    /** Short weight / pack label for UI. */
    detail: string;
};
/** Max packs of a single add-on per cart line. */
export declare const MAX_PRODUCT_ADDON_QUANTITY = 10;
/** Fixed HalloweenReady PDP add-on catalog (USD). Not Dynamo SKUs. */
export declare const PRODUCT_ADDONS: readonly ProductAddonDef[];
export type ProductAddonId = (typeof PRODUCT_ADDONS)[number]["id"];
/** Client / API selection before server fills name & unit price. */
export type ProductAddonSelection = {
    id: string;
    quantity: number;
};
export declare function getProductAddon(id: string): ProductAddonDef | undefined;
export declare function productAllowsAddons(product: {
    vendorSlug?: string | null;
    categorySlug?: string | null;
    tags?: string[] | null;
    slug?: string | null;
}): boolean;
export type CartAddonLike = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};
export declare function sumAddonPrices(addons: Array<{
    price: number;
    quantity: number;
}> | undefined | null): number;
/**
 * Stable merge key: sorted `id:qty` pairs.
 * Empty string = no add-ons. Quantity is part of the signature so 2× of an add-on
 * does not merge with 1× of the same add-on.
 */
export declare function cartAddonSignature(addons: Array<{
    id: string;
    quantity?: number;
}> | undefined | null): string;
export declare function cartLineUnitTotal(item: {
    price: number;
    addons?: Array<{
        price: number;
        quantity: number;
    }> | null;
}): number;
export type AddonResolveInput = string | {
    id: string;
    quantity?: number;
};
/** Normalize API / client payload into selections (dedupe by id, clamp qty). */
export declare function normalizeAddonSelections(input: AddonResolveInput[] | undefined | null): {
    ok: true;
    selections: ProductAddonSelection[];
} | {
    ok: false;
    error: string;
};
export declare function resolveProductAddons(input: AddonResolveInput[] | undefined | null): {
    ok: true;
    addons: CartAddonLike[];
} | {
    ok: false;
    error: string;
};
/** @deprecated Prefer resolveProductAddons — kept for call-site compatibility. */
export declare function resolveProductAddonsFromIds(ids: string[] | undefined | null): {
    ok: true;
    addons: CartAddonLike[];
} | {
    ok: false;
    error: string;
};
