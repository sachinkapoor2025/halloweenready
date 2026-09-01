/** Phrase → URL maps for SEO internal linking. Max 2–3 unique hrefs per page; each URL once. */

export type InlineLink = { phrase: string; href: string };

export const homepageInlineLinks: readonly InlineLink[] = [
  { phrase: "Halloween decorations", href: "/categories/home-decoration" },
  { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
  { phrase: "Halloween party supplies", href: "/categories/partysupplier" },
];

export const halloweenGuideInlineLinks: readonly InlineLink[] = [
  { phrase: "Halloween decorations", href: "/categories/home-decoration" },
  { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
  { phrase: "Halloween party supplies", href: "/categories/partysupplier" },
];

export const categoryPageInlineLinks: Record<string, readonly InlineLink[]> = {
  "home-decoration": [
    { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
    { phrase: "party supplies", href: "/categories/partysupplier" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  costumesandaccessories: [
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
    { phrase: "jewelry and accessories", href: "/categories/jewellryandaccessories" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  partysupplier: [
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
    { phrase: "toys and novelty", href: "/categories/toysandnovelty" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  toysandnovelty: [
    { phrase: "party supplies", href: "/categories/partysupplier" },
    { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  candlesandfragrance: [
    { phrase: "home decorations", href: "/categories/home-decoration" },
    { phrase: "Halloween party", href: "/categories/partysupplier" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  jewellryandaccessories: [
    { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
    { phrase: "lifestyle wearables", href: "/categories/lifestyleandwearable" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  lifestyleandwearable: [
    { phrase: "Halloween jewelry", href: "/categories/jewellryandaccessories" },
    { phrase: "costume accessories", href: "/categories/costumesandaccessories" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  printedandpapercrafts: [
    { phrase: "party supplies", href: "/categories/partysupplier" },
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
};

/** In-article links. Avoid duplicating each post's relatedCategory shop box URL. */
export const blogPostInlineLinks: Record<string, readonly InlineLink[]> = {
  "halloween-costume-guide-2026": [
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
    { phrase: "Halloween party supplies", href: "/categories/partysupplier" },
    { phrase: "last-minute costume ideas", href: "/blog/last-minute-halloween-costume-ideas" },
  ],
  "haunt-your-yard-halloween-decor": [
    { phrase: "inflatable Halloween decorations", href: "/blog/inflatable-halloween-decorations-yard-displays" },
    { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
    { phrase: "Halloween party supplies", href: "/categories/partysupplier" },
  ],
  "trick-or-treat-candy-guide": [
    { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  "halloween-party-planning-checklist": [
    { phrase: "Halloween party supplies", href: "/blog/halloween-party-supplies-usa" },
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
    { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
  ],
  "last-minute-halloween-costume-ideas": [
    { phrase: "costume guide for 2026", href: "/blog/halloween-costume-guide-2026" },
    { phrase: "shipping timelines", href: "/shipping" },
    { phrase: "Halloween party supplies", href: "/categories/partysupplier" },
  ],
  "halloween-party-supplies-usa": [
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
    { phrase: "party planning checklist", href: "/blog/halloween-party-planning-checklist" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  "indoor-halloween-decorations": [
    { phrase: "party supplies", href: "/categories/partysupplier" },
    { phrase: "outdoor Halloween decorations", href: "/blog/outdoor-halloween-decorations-transform-your-home" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  "halloween-decorations-usa": [
    { phrase: "Halloween party supplies", href: "/categories/partysupplier" },
    { phrase: "inflatable Halloween decorations", href: "/blog/inflatable-halloween-decorations-yard-displays" },
    { phrase: "indoor Halloween decorations", href: "/blog/indoor-halloween-decorations" },
  ],
  "inflatable-halloween-decorations-yard-displays": [
    { phrase: "outdoor Halloween decorations", href: "/blog/outdoor-halloween-decorations-transform-your-home" },
    { phrase: "Halloween party supplies", href: "/categories/partysupplier" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  "outdoor-halloween-decorations-transform-your-home": [
    { phrase: "inflatable Halloween decorations", href: "/blog/inflatable-halloween-decorations-yard-displays" },
    { phrase: "indoor Halloween decorations", href: "/blog/indoor-halloween-decorations" },
    { phrase: "Halloween party supplies", href: "/categories/partysupplier" },
  ],
  "diy-halloween-costume-ideas-2026": [
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
    { phrase: "Halloween party supplies", href: "/categories/partysupplier" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  "easy-diy-halloween-decorations": [
    { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
    { phrase: "party supplies", href: "/categories/partysupplier" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  "budget-halloween-party-ideas": [
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
    { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  "halloween-budget-tips-2026": [
    { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
    { phrase: "party supplies", href: "/categories/partysupplier" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  "pumpkin-carving-ideas-for-beginners": [
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
    { phrase: "Halloween party supplies", href: "/categories/partysupplier" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  "how-to-carve-a-pumpkin-step-by-step": [
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
    { phrase: "party supplies", href: "/categories/partysupplier" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  "halloween-safety-tips-for-families": [
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
    { phrase: "Halloween party supplies", href: "/categories/partysupplier" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  "group-halloween-costume-ideas-for-friends": [
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
    { phrase: "Halloween party supplies", href: "/categories/partysupplier" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  "halloween-makeup-ideas-for-beginners": [
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
    { phrase: "Halloween party supplies", href: "/categories/partysupplier" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  "halloween-candy-tips-2026": [
    { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  "halloween-party-menu-ideas": [
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
    { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  "apartment-halloween-decorating-tips": [
    { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
    { phrase: "party supplies", href: "/categories/partysupplier" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  "when-is-halloween-2026-order-deadline": [
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
    { phrase: "Halloween party supplies", href: "/categories/partysupplier" },
    { phrase: "shipping timelines", href: "/shipping" },
  ],
  "express-halloween-delivery-usa-guide": [
    { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
    { phrase: "Halloween party supplies", href: "/categories/partysupplier" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  "outdoor-halloween-decoration-ideas": [
    { phrase: "inflatable Halloween decorations", href: "/blog/inflatable-halloween-decorations-yard-displays" },
    { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
    { phrase: "Halloween party supplies", href: "/categories/partysupplier" },
  ],
  "inflatable-halloween-decorations-guide": [
    { phrase: "outdoor Halloween decorations", href: "/blog/outdoor-halloween-decorations-transform-your-home" },
    { phrase: "Halloween party supplies", href: "/categories/partysupplier" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  "cheap-halloween-decorations-that-look-expensive": [
    { phrase: "Halloween costumes", href: "/categories/costumesandaccessories" },
    { phrase: "party supplies", href: "/categories/partysupplier" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
  "best-halloween-costume-store-usa": [
    { phrase: "Halloween decorations", href: "/categories/home-decoration" },
    { phrase: "Halloween party supplies", href: "/categories/partysupplier" },
    { phrase: "Halloween planning guide", href: "/halloween-guide" },
  ],
};
