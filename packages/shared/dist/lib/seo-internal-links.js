"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURED_BLOG_LINKS = exports.PLANNING_LINKS = exports.PRIORITY_CITY_LINKS = exports.VERIFIED_COUNTRY_LINKS = exports.SEO_CATEGORY_LINKS = void 0;
exports.pickStable = pickStable;
exports.getInternalLinkGroups = getInternalLinkGroups;
const shipping_availability_1 = require("./shipping-availability");
exports.SEO_CATEGORY_LINKS = [
    { href: "/categories/home-decoration", label: "Halloween decorations" },
    { href: "/categories/costumesandaccessories", label: "Halloween costumes" },
    { href: "/categories/partysupplier", label: "Halloween party supplies" },
    { href: "/categories/toysandnovelty", label: "Halloween toys & novelty" },
    { href: "/categories/candlesandfragrance", label: "Halloween candles" },
    { href: "/categories/jewellryandaccessories", label: "Halloween jewelry" },
    { href: "/categories/lifestyleandwearable", label: "Halloween apparel" },
    { href: "/categories/printedandpapercrafts", label: "Halloween paper crafts" },
];
/** Countries we can quote CJ freight for — never market unquoted destinations as shippable. */
exports.VERIFIED_COUNTRY_LINKS = [
    { slug: "us", code: "US", href: "/countries/us", label: "Halloween in the USA", name: "United States" },
    { slug: "uk", code: "GB", href: "/countries/uk", label: "Halloween in the UK", name: "United Kingdom" },
    { slug: "ca", code: "CA", href: "/countries/ca", label: "Halloween in Canada", name: "Canada" },
    { slug: "au", code: "AU", href: "/countries/au", label: "Halloween in Australia", name: "Australia" },
    { slug: "de", code: "DE", href: "/countries/de", label: "Halloween in Germany", name: "Germany" },
];
/** High-value US metros/states already live at /cities/{slug}. */
exports.PRIORITY_CITY_LINKS = [
    { href: "/cities/new-york", label: "Halloween in New York" },
    { href: "/cities/los-angeles", label: "Halloween in Los Angeles" },
    { href: "/cities/chicago", label: "Halloween in Chicago" },
    { href: "/cities/houston", label: "Halloween in Houston" },
    { href: "/cities/miami", label: "Halloween in Miami" },
    { href: "/cities/dallas", label: "Halloween in Dallas" },
    { href: "/cities/seattle", label: "Halloween in Seattle" },
    { href: "/cities/boston", label: "Halloween in Boston" },
    { href: "/cities/california", label: "Halloween in California" },
    { href: "/cities/texas", label: "Halloween in Texas" },
];
exports.PLANNING_LINKS = [
    { href: "/halloween", label: "Halloween by location" },
    { href: "/halloween-guide", label: "Halloween planning guide" },
    { href: "/halloween-guide/events", label: "Halloween events guide" },
    { href: "/blog", label: "Halloween blog" },
    { href: "/shipping", label: "Shipping & delivery" },
];
exports.FEATURED_BLOG_LINKS = [
    { href: "/blog/halloween-costume-guide-2026", label: "Costume guide 2026" },
    { href: "/blog/haunt-your-yard-halloween-decor", label: "Yard haunt ideas" },
    { href: "/blog/halloween-party-planning-checklist", label: "Party planning checklist" },
    { href: "/blog/last-minute-halloween-costume-ideas", label: "Last-minute costume ideas" },
];
const RELATED_CATEGORIES = {
    "home-decoration": ["costumesandaccessories", "partysupplier"],
    costumesandaccessories: ["home-decoration", "jewellryandaccessories"],
    partysupplier: ["home-decoration", "toysandnovelty"],
    toysandnovelty: ["partysupplier", "costumesandaccessories"],
    candlesandfragrance: ["home-decoration", "partysupplier"],
    jewellryandaccessories: ["costumesandaccessories", "lifestyleandwearable"],
    lifestyleandwearable: ["jewellryandaccessories", "costumesandaccessories"],
    printedandpapercrafts: ["partysupplier", "home-decoration"],
};
const MAX_PER_GROUP = 8;
function pathFor(page) {
    switch (page.type) {
        case "home":
            return "/";
        case "listing":
            return "/products";
        case "category":
            return `/categories/${page.categorySlug}`;
        case "product":
            return `/products/${page.productSlug}`;
        case "country":
            return `/countries/${page.countrySlug}`;
        case "city":
            return `/cities/${page.citySlug}`;
        case "guide":
            return "/halloween-guide";
        case "events":
            return "/halloween-guide/events";
        case "blog":
            return `/blog/${page.blogSlug}`;
        case "shipping":
            return "/shipping";
    }
}
function hashSeed(seed) {
    let h = 0;
    for (let i = 0; i < seed.length; i++)
        h = (h + seed.charCodeAt(i) * (i + 1)) % 997;
    return h;
}
function pickStable(items, seed, count) {
    if (items.length === 0 || count <= 0)
        return [];
    const start = hashSeed(seed) % items.length;
    const out = [];
    const seen = new Set();
    for (let i = 0; out.length < Math.min(count, items.length) && i < items.length * 2; i++) {
        const item = items[(start + i) % items.length];
        if (!seen.has(item)) {
            seen.add(item);
            out.push(item);
        }
    }
    return out;
}
function withoutPath(links, currentPath) {
    return links.filter((l) => l.href !== currentPath);
}
function cap(links, n = MAX_PER_GROUP) {
    const seen = new Set();
    const out = [];
    for (const link of links) {
        if (seen.has(link.href))
            continue;
        seen.add(link.href);
        out.push(link);
        if (out.length >= n)
            break;
    }
    return out;
}
function group(heading, links, currentPath, n = MAX_PER_GROUP) {
    const next = cap(withoutPath(links, currentPath), n);
    if (next.length === 0)
        return null;
    return { heading, links: next };
}
function relatedCategoryLinks(categorySlug) {
    const related = RELATED_CATEGORIES[categorySlug] ?? [];
    const byHref = new Map(exports.SEO_CATEGORY_LINKS.map((l) => [l.href, l]));
    return related
        .map((slug) => byHref.get(`/categories/${slug}`))
        .filter((l) => Boolean(l));
}
function countryLinksForProduct(availableCountryCodes) {
    return exports.VERIFIED_COUNTRY_LINKS.filter((c) => {
        const status = (0, shipping_availability_1.isProductAvailableForCountry)({ availableCountryCodes }, c.code);
        return status === "available" || status === "quoteable";
    }).map(({ href, label }) => ({ href, label }));
}
/**
 * Contextual internal links. Caps each group so pages do not become doorway blocks.
 * Location links never imply delivery unless the destination is quoteable.
 */
function getInternalLinkGroups(page) {
    const current = pathFor(page);
    const groups = [];
    const push = (g) => {
        if (g)
            groups.push(g);
    };
    const shop = group("Shop Halloween", exports.SEO_CATEGORY_LINKS, current, 6);
    const markets = group("Shop by country", exports.VERIFIED_COUNTRY_LINKS, current, 5);
    const cities = group("Shop by city", exports.PRIORITY_CITY_LINKS, current, 6);
    const planning = group("Guides", exports.PLANNING_LINKS, current, 4);
    const articles = group("Popular articles", exports.FEATURED_BLOG_LINKS, current, 4);
    switch (page.type) {
        case "home":
        case "listing":
            push(shop);
            push(markets);
            push(cities);
            push(planning);
            break;
        case "category": {
            push(group("Related categories", relatedCategoryLinks(page.categorySlug), current, 4));
            push(markets);
            push(group("Halloween near you", pickStable(exports.PRIORITY_CITY_LINKS, page.categorySlug, 4), current, 4));
            push(planning);
            push(articles);
            break;
        }
        case "product": {
            const cat = exports.SEO_CATEGORY_LINKS.find((l) => l.href === `/categories/${page.categorySlug}`);
            push(group("This collection", [cat, ...relatedCategoryLinks(page.categorySlug)].filter((l) => Boolean(l)), current, 4));
            push(group("Delivery destinations", countryLinksForProduct(page.availableCountryCodes), current, 4));
            push(group("Halloween near you", pickStable(exports.PRIORITY_CITY_LINKS, page.productSlug, 4), current, 4));
            push(planning);
            break;
        }
        case "country": {
            push(shop);
            if (page.countrySlug === "us")
                push(cities);
            push(group("Other countries", exports.VERIFIED_COUNTRY_LINKS, current, 4));
            push(planning);
            push(articles);
            break;
        }
        case "city": {
            push(group("United States", [{ href: "/countries/us", label: "Halloween in the USA" }], current, 1));
            push(shop);
            push(group("Nearby & popular cities", pickStable(exports.PRIORITY_CITY_LINKS, page.citySlug, 5), current, 5));
            push(planning);
            break;
        }
        case "guide":
            push(shop);
            push(markets);
            push(cities);
            push(articles);
            push(group("More", [{ href: "/halloween-guide/events", label: "Halloween events guide" }], current, 1));
            break;
        case "events":
            push(shop);
            push(cities);
            push(group("Guides", [{ href: "/halloween-guide", label: "Halloween planning guide" }, ...exports.FEATURED_BLOG_LINKS], current, 5));
            break;
        case "blog": {
            const related = page.relatedCategory
                ? exports.SEO_CATEGORY_LINKS.filter((l) => l.href === `/categories/${page.relatedCategory}`)
                : [];
            push(group("Shop this topic", related, current, 2));
            push(shop);
            push(planning);
            push(articles);
            break;
        }
        case "shipping":
            push(markets);
            push(shop);
            push(planning);
            break;
    }
    return groups;
}
