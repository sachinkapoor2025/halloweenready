/** Title, meta description, H1, and image alt for public category landing pages.
 * Sourced from data/seo/halloweenready-keywords.csv via scripts/generate-seo-from-keywords.py
 * (categoryPrimary block) — keep titles under 60 chars and descriptions under 155.
 */
import { seoCategoryPrimary, productKeywordsForCategory } from "./seo-data";

export type CategoryPageSeo = {
  title: string;
  description: string;
  h1: string;
  alt: string;
  keywords: string;
};

export const categoryPageSeo: Record<string, CategoryPageSeo> = Object.fromEntries(
  Object.entries(seoCategoryPrimary).map(([slug, meta]) => {
    const kws = productKeywordsForCategory(slug).slice(0, 10);
    return [
      slug,
      {
        title: meta.title,
        description: meta.description,
        h1: meta.h1,
        alt: meta.alt,
        keywords: [...new Set([meta.primaryKeyword, ...kws, "HalloweenReady", "halloweenready.com"])].join(
          ", "
        ),
      },
    ];
  })
) as Record<string, CategoryPageSeo>;

export function getCategoryPageSeo(slug: string): CategoryPageSeo | undefined {
  if (slug === "halloween-hampers") {
    return {
      title: "Halloween Hampers | Gift Kits from $49",
      description:
        "Shop Halloween hampers from $49–$299. Swap included items at the same hamper price, add extras, and get free shipping on every kit.",
      h1: "Halloween Hampers",
      alt: "Halloween gift hampers with decorations, costumes, and party supplies",
      keywords: "Halloween hampers, Halloween gift baskets, boo baskets, Halloween kits, HalloweenReady",
    };
  }
  return categoryPageSeo[slug];
}
