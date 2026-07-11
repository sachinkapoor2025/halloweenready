/** Phrase → URL maps for SEO internal linking on category and marketing pages. */

export const homepageInlineLinks = [
  { phrase: "Halloween decorations", href: "/categories/home-decoration" },
  { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
] as const;

export const categoryPageInlineLinks: Record<string, readonly { phrase: string; href: string }[]> = {
  "home-decoration": [
    { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
    { phrase: "party supplies", href: "/categories/partysupplier" },
  ],
  costumesandaccessories: [
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
    { phrase: "jewelry and accessories", href: "/categories/jewellryandaccessories" },
  ],
  partysupplier: [
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
    { phrase: "toys and novelty", href: "/categories/toysandnovelty" },
  ],
  toysandnovelty: [
    { phrase: "party supplies", href: "/categories/partysupplier" },
    { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
  ],
  candlesandfragrance: [
    { phrase: "home decorations", href: "/categories/home-decoration" },
    { phrase: "Halloween party", href: "/categories/partysupplier" },
  ],
  jewellryandaccessories: [
    { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
    { phrase: "lifestyle wearables", href: "/categories/lifestyleandwearable" },
  ],
  lifestyleandwearable: [
    { phrase: "Halloween jewelry", href: "/categories/jewellryandaccessories" },
    { phrase: "costume accessories", href: "/categories/costumesandaccessories" },
  ],
  printedandpapercrafts: [
    { phrase: "party supplies", href: "/categories/partysupplier" },
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
  ],
};

export const halloweenGuideInlineLinks = [
  { phrase: "shop Halloween decorations", href: "/categories/home-decoration" },
  { phrase: "Halloween costumes online", href: "/categories/costumesandaccessories" },
] as const;
