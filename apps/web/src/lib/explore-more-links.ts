import { categoryHref } from "@/lib/category-urls";
import { cityLinks } from "@/lib/site";

export type ExploreMoreLink = {
  label: string;
  href: string;
};

export type ExploreMoreGroup = {
  heading: string;
  links: ExploreMoreLink[];
};

const CITY_LINKS: ExploreMoreLink[] = cityLinks.slice(0, 20).map((c) => ({
  label: `Halloween in ${c.label}`,
  href: `/cities/${c.slug}`,
}));

/** Explore More link groups for HalloweenReady product pages. */
export const EXPLORE_MORE_GROUPS: ExploreMoreGroup[] = [
  {
    heading: "Shop by City",
    links: CITY_LINKS,
  },
  {
    heading: "Shop by Category",
    links: [
      { label: "Home Decorations", href: categoryHref("home-decoration") },
      { label: "Costumes & Accessories", href: categoryHref("costumesandaccessories") },
      { label: "Party Supplies", href: categoryHref("partysupplier") },
      { label: "Toys & Novelty", href: categoryHref("toysandnovelty") },
      { label: "Candles & Fragrance", href: categoryHref("candlesandfragrance") },
      { label: "Jewelry & Accessories", href: categoryHref("jewellryandaccessories") },
      { label: "Lifestyle & Wearable", href: categoryHref("lifestyleandwearable") },
      { label: "Printed & Paper Crafts", href: categoryHref("printedandpapercrafts") },
    ],
  },
  {
    heading: "Planning",
    links: [
      { label: "Halloween Guide", href: "/halloween-guide" },
      { label: "All Products", href: "/products" },
      { label: "Blog", href: "/blog" },
      { label: "Shipping", href: "/shipping" },
    ],
  },
];
