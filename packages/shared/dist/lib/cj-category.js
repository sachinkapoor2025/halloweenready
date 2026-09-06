"use strict";
/** Map CJ Dropshipping category names onto OccasionFun storefront slugs. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CJ_HALLOWEEN_KEYWORDS = void 0;
exports.mapCjCategoryToStoreSlug = mapCjCategoryToStoreSlug;
exports.gramsToOz = gramsToOz;
exports.mmToInches = mmToInches;
exports.stripHtml = stripHtml;
const RULES = [
    {
        slug: "costumesandaccessories",
        needles: [
            "costume",
            "cosplay",
            "mask",
            "wig",
            "cape",
            "hat",
            "gloves",
            "clothing",
            "apparel",
            "dress",
            "cloak",
        ],
    },
    {
        slug: "jewellryandaccessories",
        needles: ["jewel", "necklace", "earring", "bracelet", "ring", "accessory"],
    },
    {
        slug: "candlesandfragrance",
        needles: ["candle", "fragrance", "incense", "wax", "scent"],
    },
    {
        slug: "toysandnovelty",
        needles: ["toy", "novelty", "game", "puzzle", "plush", "figure"],
    },
    {
        slug: "printedandpapercrafts",
        needles: ["paper", "card", "sticker", "print", "banner", "poster"],
    },
    {
        slug: "lifestyleandwearable",
        needles: [
            "wearable",
            "watch",
            "bag",
            "backpack",
            "shoe",
            "sock",
            "electronic",
            "phone",
            "usb",
            "beauty",
            "cosmetic",
            "kitchen",
            "sport",
            "fitness",
            "baby",
            "pet",
            "outdoor",
            "tool",
            "auto",
            "office",
        ],
    },
    {
        slug: "partysupplier",
        needles: ["party", "balloon", "tableware", "cup", "plate", "napkin", "confetti"],
    },
    {
        slug: "home-decoration",
        needles: [
            "decor",
            "decoration",
            "home",
            "garden",
            "light",
            "lamp",
            "pumpkin",
            "skeleton",
            "spider",
            "ghost",
            "halloween",
        ],
    },
];
exports.CJ_HALLOWEEN_KEYWORDS = [
    "halloween",
    "halloween costume",
    "pumpkin",
    "witch",
    "ghost",
    "skeleton",
    "spider web",
    "scary mask",
];
function mapCjCategoryToStoreSlug(input) {
    const hay = [
        input.threeCategoryName,
        input.twoCategoryName,
        input.oneCategoryName,
        input.categoryName,
        input.productName,
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
    for (const rule of RULES) {
        if (rule.needles.some((n) => hay.includes(n)))
            return rule.slug;
    }
    return "home-decoration";
}
function gramsToOz(grams) {
    if (!Number.isFinite(grams) || grams <= 0)
        return undefined;
    return Math.round((grams / 28.3495) * 100) / 100;
}
function mmToInches(mm) {
    if (!Number.isFinite(mm) || mm <= 0)
        return undefined;
    return Math.round((mm / 25.4) * 100) / 100;
}
function stripHtml(html) {
    return html
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, " ")
        .trim();
}
