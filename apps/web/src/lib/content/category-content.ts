/** Extended SEO content per category — shown below product listings. */
export interface CategoryContent {
  extraParagraphs: string[];
  sections?: { heading: string; paragraphs: string[] }[];
}

export const categoryContent: Record<string, CategoryContent> = {
  costumes: {
    extraParagraphs: [
      "Our Halloween costume collection includes adult, teen, and kids sizes across classic horror, pop culture, funny, and group themes. Each costume is selected for quality materials and comfortable all-night wear.",
      "Choose your country at checkout. Delivering in 5–7 days. Free shipping on orders of $49 or more; smaller carts show a stepped shipping fee before payment.",
    ],
    sections: [
      {
        heading: "Popular costume styles",
        paragraphs: [
          "Classic horror — vampires, witches, skeletons, and zombies.",
          "Pop culture — trending characters from movies, games, and TV.",
          "Kids favorites — werewolves, superheroes, and cartoon characters.",
          "Group costumes — matching sets for couples, families, and parties.",
        ],
      },
    ],
  },
  decorations: {
    extraParagraphs: [
      "Transform your home and yard with inflatable ghosts, LED pumpkins, skeleton graveyard sets, fog machines, and window clings. Our decor works indoors and outdoors for maximum spooky impact.",
      "Delivering in 5–7 days. Order earlier in October if you need setup time before trick-or-treat — we do not guarantee arrival before October 31.",
    ],
    sections: [
      {
        heading: "Decoration categories",
        paragraphs: [
          "Yard inflatables — ghosts, pumpkins, and graveyard scenes.",
          "Indoor props — skeletons, cobwebs, and haunted house accents.",
          "Lighting — LED pathway pumpkins and color-changing bulbs.",
          "Atmosphere — fog machines and sound effect accessories.",
        ],
      },
    ],
  },
  "candy-treats": {
    extraParagraphs: [
      "Stock up for trick-or-treat night with bulk candy assortments, chocolate variety packs, gummy mixes, and pre-filled treat bags. Fresh, well-packed, and ready to hand out on October 31.",
      "Perfect for home trick-or-treat bowls, office parties, and school events. Delivering in 5–7 days.",
    ],
    sections: [
      {
        heading: "Candy & treat options",
        paragraphs: [
          "Bulk mixed assortments — chocolate, gummies, and hard candy.",
          "Chocolate variety packs — mini bars in Halloween packaging.",
          "Pre-filled treat bags — ready to hand out to trick-or-treaters.",
          "Nut-free and kid-friendly options for safe Halloween fun.",
        ],
      },
    ],
  },
  accessories: {
    extraParagraphs: [
      "Complete any Halloween look with masks, wigs, face paint palettes, capes, glow sticks, and finishing touches. Accessories are the fastest way to elevate a basic costume into something unforgettable.",
      "Shop accessories alongside costumes for one convenient order. Delivering in 5–7 days.",
    ],
    sections: [
      {
        heading: "Must-have accessories",
        paragraphs: [
          "Masks — latex horror masks and lightweight character masks.",
          "Makeup — face paint palettes and cosmetic-grade glitter.",
          "Headwear — witch hats, crowns, and headbands.",
          "Safety — glow stick necklaces for trick-or-treat visibility.",
        ],
      },
    ],
  },
  "party-supplies": {
    extraParagraphs: [
      "Host a haunted gathering with themed plates, cups, balloons, table runners, photo booth props, and treat buckets. Our party supplies make setup easy so you can focus on the fun.",
      "Order party packs for groups of 16 or mix individual items. Delivering in 5–7 days.",
    ],
    sections: [
      {
        heading: "Party essentials",
        paragraphs: [
          "Tableware — plates, cups, napkins, and table runners.",
          "Decor — balloon garlands, banners, and hanging accents.",
          "Activities — photo booth props and game accessories.",
          "Trick-or-treat — buckets and favor bags for kids.",
        ],
      },
    ],
  },
};

/** Map live category slugs onto the copy keys above. */
const CATEGORY_CONTENT_ALIASES: Record<string, string> = {
  costumesandaccessories: "costumes",
  costumes: "costumes",
  "home-decoration": "decorations",
  decorations: "decorations",
  partysupplier: "party-supplies",
  "party-supplies": "party-supplies",
  jewellryandaccessories: "accessories",
  accessories: "accessories",
  "candy-treats": "candy-treats",
};

export function getCategoryContent(slug: string): CategoryContent | undefined {
  return categoryContent[slug] ?? categoryContent[CATEGORY_CONTENT_ALIASES[slug]];
}
