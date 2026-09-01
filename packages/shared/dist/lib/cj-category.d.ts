/** Map CJ Dropshipping category names onto HalloweenReady storefront slugs. */
export declare const CJ_HALLOWEEN_KEYWORDS: readonly ["halloween", "halloween costume", "pumpkin", "witch", "ghost", "skeleton", "spider web", "scary mask"];
export declare function mapCjCategoryToStoreSlug(input: {
    oneCategoryName?: string;
    twoCategoryName?: string;
    threeCategoryName?: string;
    categoryName?: string;
    productName?: string;
}): string;
export declare function gramsToOz(grams: number): number | undefined;
export declare function mmToInches(mm: number): number | undefined;
export declare function stripHtml(html: string): string;
