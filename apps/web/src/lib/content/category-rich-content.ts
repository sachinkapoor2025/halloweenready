/** Rich SEO layout content for category pages (mirrors city page structure). */

export interface CategoryRichContent {
  slug: string;
  headline: string;
  intro: string[];
  delivery: { heading: string; paragraphs: string[] };
  highlights: { heading: string; items: string[] };
  tradition?: { heading: string; paragraphs: string[] };
  whyUs: { heading: string; bullets: string[] };
  howTo: { heading: string; steps: string[] };
  faqs: { q: string; a: string }[];
  relatedCategories: { label: string; href: string; text: string }[];
}

const relatedAll = [
  {
    label: "Home Decorations",
    href: "/categories/home-decoration",
    text: "Yard decor, inflatables, and haunted indoor props.",
  },
  {
    label: "Costumes & Accessories",
    href: "/categories/costumesandaccessories",
    text: "Adult, kids, and group Halloween costumes.",
  },
  {
    label: "Party Supplies",
    href: "/categories/partysupplier",
    text: "Tableware, balloons, candy, and party packs.",
  },
  {
    label: "Toys & Novelty",
    href: "/categories/toysandnovelty",
    text: "Goodie-bag fillers, prank toys, and spooky gifts.",
  },
  {
    label: "Candles & Fragrance",
    href: "/categories/candlesandfragrance",
    text: "Pumpkin spice candles and haunted house scents.",
  },
  {
    label: "Jewelry & Accessories",
    href: "/categories/jewellryandaccessories",
    text: "Gothic jewelry and costume finishing touches.",
  },
  {
    label: "Lifestyle & Wearables",
    href: "/categories/lifestyleandwearable",
    text: "Halloween apparel, totes, and everyday gifts.",
  },
  {
    label: "Printed & Paper Crafts",
    href: "/categories/printedandpapercrafts",
    text: "Wrapping paper, gift tags, cards, and window clings.",
  },
];

function relatedExcept(slug: string) {
  return relatedAll.filter((c) => !c.href.endsWith(`/${slug}`)).slice(0, 4);
}

export const categoryRichContent: Record<string, CategoryRichContent> = {
  "home-decoration": {
    slug: "home-decoration",
    headline: "Halloween decorations for yards, porches, and indoor spaces",
    intro: [
      "Shop inflatables, LED pumpkins, skeletons, and fog machines for haunted homes and yard displays. Pair a statement piece with Halloween costumes if you are hosting a themed night at home.",
      "Indoor and outdoor decor ships from domestic warehouses — order by October 25 so you have time to set up before trick-or-treat. Add party supplies in the same cart if you need matching tableware.",
      "For costumes, candy, and timing in one overview, use the Halloween planning guide before you build a long shopping list.",
    ],
    delivery: {
      heading: "Halloween Decor Delivery",
      paragraphs: [
        "Decor items ship in 2–5 business days nationwide. Large inflatables include stakes and blowers unless noted otherwise.",
        "Popular destinations include California, Texas, Florida, New York, and Illinois — with delivery to every US state.",
      ],
    },
    highlights: {
      heading: "Top Decoration Picks",
      items: [
        "Inflatable yard ghosts and pumpkins with LED lights",
        "LED pumpkin pathway stakes and string lights",
        "Fog machines for indoor or covered outdoor haunts",
        "Life-size skeleton and graveyard prop sets",
        "Reusable window spider web clings and banners",
      ],
    },
    whyUs: {
      heading: "Why Shop Decor at HalloweenReady",
      bullets: [
        "Indoor and outdoor options in one catalog",
        "Fast domestic USA shipping",
        "Quality props that last multiple seasons",
        "Bundle decor with costumes and party supplies",
      ],
    },
    howTo: {
      heading: "Tips for Halloween Home Decor",
      steps: [
        "Start with a focal piece — inflatable or graveyard set.",
        "Add pathway lighting for safety and atmosphere.",
        "Use fog machines indoors or in covered outdoor areas.",
        "Layer window clings and smaller props for detail.",
        "Order by Oct 25 for setup time before Halloween.",
      ],
    },
    faqs: [
      {
        q: "Where can I buy outdoor Halloween decorations online with USA shipping?",
        a: "HalloweenReady ships outdoor yard decor — inflatables, tombstones, and LED stakes — to all 50 US states with domestic fulfillment.",
      },
      {
        q: "Do inflatable Halloween decorations include stakes and blowers?",
        a: "Yes. Our inflatables typically include stakes, tethers, and blower units unless a product page notes otherwise.",
      },
      {
        q: "When should I order Halloween yard decor for Halloween 2026?",
        a: "Order by October 25, 2026 for guaranteed pre-Halloween delivery so you have time to set up your display.",
      },
    ],
    relatedCategories: relatedExcept("home-decoration"),
  },

  costumesandaccessories: {
    slug: "costumesandaccessories",
    headline: "Halloween costumes for adults, teens, and kids",
    intro: [
      "Browse adult, teen, and kids outfits for parties, trick-or-treat, and group looks. Classic vampires and witches still work; add a few Halloween decorations at home if you want photos to match the costume.",
      "Order online from anywhere, then enter a US shipping address at checkout. Add jewelry and accessories such as masks, hats, and gothic finishes so a simple base outfit looks complete.",
      "For sizing windows and Halloween 2026 timing, the Halloween planning guide outlines when to order so outfits arrive before October 31.",
    ],
    delivery: {
      heading: "Costume Delivery Across the USA",
      paragraphs: [
        "HalloweenReady ships costumes to all 50 US states. Popular destinations include California, New York, Texas, Florida, and Illinois.",
        "Order by October 20 for guaranteed pre-Halloween delivery. Popular sizes sell out early in October.",
      ],
    },
    highlights: {
      heading: "Popular Costume Categories",
      items: [
        "Adult horror classics — vampires, witches, skeletons",
        "Kids costumes — werewolves, superheroes, cartoons",
        "Group and couple costumes — pirates, zombies, haunted themes",
        "Last-minute bodysuits, capes, and accessory kits",
      ],
    },
    whyUs: {
      heading: "Why Buy Costumes from HalloweenReady",
      bullets: [
        "Domestic USA shipping from US warehouses",
        "Adult, teen, and kids sizes",
        "2–5 business day delivery nationwide",
        "Secure USD and INR checkout",
        "WhatsApp support for sizing help",
      ],
    },
    howTo: {
      heading: "How to Order a Halloween Costume",
      steps: [
        "Browse costumes by theme and select your size.",
        "Add accessories like masks or makeup if needed.",
        "Enter your US shipping address at checkout.",
        "Pay with Stripe or Razorpay.",
        "Receive your costume in 2–5 business days.",
      ],
    },
    faqs: [
      {
        q: "Can I order adult and kids Halloween costumes online for USA delivery?",
        a: "Yes. We carry adult, teen, kids, and toddler sizes across classic horror, funny, and group themes with domestic US shipping.",
      },
      {
        q: "How early should I buy a Halloween costume for Halloween 2026?",
        a: "Order by October 20, 2026 for guaranteed delivery before Halloween night — popular sizes sell out mid-October.",
      },
      {
        q: "Do you sell last-minute Halloween costume delivery in the USA?",
        a: "Yes. Many costumes and accessories ship in 2–5 business days nationwide. Order ASAP in late October for the best chance of arrival before Oct 31.",
      },
    ],
    relatedCategories: relatedExcept("costumesandaccessories"),
  },

  partysupplier: {
    slug: "partysupplier",
    headline: "Halloween party supplies for tables, photos, and treats",
    intro: [
      "Host a haunted gathering with themed tableware, balloon garlands, treat bowls, and photo booth props. Match the table to Halloween decorations in the same room so the setup looks planned rather than pieced together.",
      "Bundle plates, candy, and toys and novelty fillers in one order when you are packing goodie bags or a kids' table.",
      "The Halloween planning guide covers guest flow, treats, and timing if you are still mapping the night.",
    ],
    delivery: {
      heading: "Party Supply Delivery",
      paragraphs: [
        "Party packs and individual supplies ship in 2–5 business days to all 50 states.",
        "Order by October 25 for pre-Halloween party setup.",
      ],
    },
    highlights: {
      heading: "Party Must-Haves",
      items: [
        "Haunted mansion party packs for groups",
        "Orange and black balloon garland kits",
        "Trick-or-treat buckets and candy bowls",
        "Table runners, plates, cups, and napkins",
        "Photo booth prop sets for guests",
      ],
    },
    whyUs: {
      heading: "Why Buy Party Supplies Here",
      bullets: [
        "Complete party packs for easy setup",
        "Themed tableware and decor",
        "Candy and treat options in the same catalog",
        "Fast domestic shipping",
      ],
    },
    howTo: {
      heading: "Plan Your Halloween Party",
      steps: [
        "Choose a party pack or mix individual items.",
        "Add balloon garlands and banners.",
        "Include photo booth props for guests.",
        "Stock candy and treat buckets if hosting kids.",
        "Order by Oct 25 for delivery before your event.",
      ],
    },
    faqs: [
      {
        q: "Where can I buy Halloween party supplies with USA delivery?",
        a: "Shop tableware, balloons, candy bowls, and party packs at HalloweenReady — we ship to all 50 US states with domestic fulfillment.",
      },
      {
        q: "Do Halloween party packs include plates and cups?",
        a: "Most party packs include plates, cups, napkins, a tablecloth or runner, and a banner for the listed guest count — check each product page for details.",
      },
      {
        q: "Can I combine party supplies with costumes in one order?",
        a: "Yes. Add everything to one cart for a single USA delivery.",
      },
    ],
    relatedCategories: relatedExcept("partysupplier"),
  },

  toysandnovelty: {
    slug: "toysandnovelty",
    headline: "Halloween toys and novelty gifts for bags and parties",
    intro: [
      "Stock goodie bags and party favors with fidget toys, prank props, and small spooky gifts. Mix them with party supplies such as treat bags and themed bowls so fillers and wrapping match.",
      "These pieces work for classroom treats, office parties, and trick-or-treat extras. Pair a few items with Halloween costumes when kids want a toy that matches their look.",
      "The Halloween planning guide helps you estimate quantities before you order for a school or community event.",
    ],
    delivery: {
      heading: "Novelty Toy Delivery",
      paragraphs: [
        "Toys and novelty items ship in 2–5 business days across all 50 US states.",
        "Bulk filler packs are popular in October — order early for school and community events.",
      ],
    },
    highlights: {
      heading: "Popular Novelty Picks",
      items: [
        "Halloween fidget spinners and stress toys",
        "Bouncy eyeballs and mini plastic spiders",
        "Glow and prank toys for parties",
        "Goodie-bag filler assortments",
        "Skeleton hand and spooky novelty gifts",
      ],
    },
    whyUs: {
      heading: "Why Shop Toys & Novelty Here",
      bullets: [
        "Affordable bulk filler options",
        "Kid-friendly and party-ready picks",
        "Combine with candy and party supplies",
        "Fast USA shipping",
      ],
    },
    howTo: {
      heading: "How to Stock Halloween Goodie Bags",
      steps: [
        "Estimate fillers per guest or trick-or-treater.",
        "Mix novelty toys with candy for variety.",
        "Add glow sticks for evening safety.",
        "Checkout with your US shipping address.",
        "Order by mid-October for school events.",
      ],
    },
    faqs: [
      {
        q: "Do you sell Halloween novelty toys for goodie bags?",
        a: "Yes. Shop fidget toys, mini spiders, eyeballs, and other spooky fillers designed for treat bags and party favors.",
      },
      {
        q: "Can I buy Halloween prank toys online with USA shipping?",
        a: "Yes. Our novelty and prank toys ship domestically to all 50 US states in about 2–5 business days.",
      },
      {
        q: "Are Halloween toys suitable for kids' party favors?",
        a: "Many items are designed as kid-friendly fillers. Always check age guidance on the product page before packing bags for young children.",
      },
    ],
    relatedCategories: relatedExcept("toysandnovelty"),
  },

  candlesandfragrance: {
    slug: "candlesandfragrance",
    headline: "Halloween candles and fragrance for a seasonal mood",
    intro: [
      "Set the mood with pumpkin spice candles, skull tealights, and haunted-house reed diffusers. They sit naturally next to home decorations on a mantel or dining table.",
      "Use them for party tables and quiet October evenings. If you are hosting a Halloween party, keep open flames away from fabric table runners and hanging props.",
      "The Halloween planning guide covers lighting and safety alongside costumes and decor timing.",
    ],
    delivery: {
      heading: "Candle & Fragrance Delivery",
      paragraphs: [
        "Candles and home fragrance ship carefully packed in 2–5 business days nationwide.",
        "Order by late October to enjoy scents through Halloween week.",
      ],
    },
    highlights: {
      heading: "Spooky Scent Favorites",
      items: [
        "Pumpkin spice and autumn scented candles",
        "Blood-red taper candles for table settings",
        "Skull tealights and bat tealight holders",
        "Haunted house reed diffusers",
        "Witch's brew and soy spooky scents",
      ],
    },
    whyUs: {
      heading: "Why Shop Candles Here",
      bullets: [
        "Seasonal scents made for Halloween ambiance",
        "Bundle with home decorations",
        "Gift-ready options for hosts",
        "Fast domestic USA shipping",
      ],
    },
    howTo: {
      heading: "How to Style Halloween Candles Safely",
      steps: [
        "Place candles on stable, heat-safe surfaces.",
        "Use tealights and tapers for table layers.",
        "Add a reed diffuser for continuous scent.",
        "Keep open flames away from fabric decor.",
        "Never leave burning candles unattended.",
      ],
    },
    faqs: [
      {
        q: "Where can I buy Halloween candles and pumpkin spice scents online?",
        a: "HalloweenReady carries seasonal candles, tealights, and reed diffusers with fast USA shipping to all 50 states.",
      },
      {
        q: "Do you sell haunted house reed diffusers?",
        a: "Yes. Shop spooky home fragrance options including haunted-house reed diffusers and autumn candle scents.",
      },
      {
        q: "Can Halloween candles ship with decorations in one order?",
        a: "Yes. Add candles and decor to the same cart for a single domestic delivery.",
      },
    ],
    relatedCategories: relatedExcept("candlesandfragrance"),
  },

  jewellryandaccessories: {
    slug: "jewellryandaccessories",
    headline: "Halloween jewelry and finishing touches for costumes",
    intro: [
      "Finish a look with spider-web chokers, skeleton rings, gothic pendants, and charm keychains. These pieces work especially well with Halloween costumes when you want impact without a full extra outfit.",
      "Pair jewelry with lifestyle wearables such as a hoodie or tote if the gift needs to last past October 31.",
      "The Halloween planning guide can help you decide what to order first when you are assembling group looks.",
    ],
    delivery: {
      heading: "Jewelry & Accessory Delivery",
      paragraphs: [
        "Small accessories ship quickly in 2–5 business days to all US states.",
        "Add jewelry when you order costumes to complete the look in one delivery.",
      ],
    },
    highlights: {
      heading: "Top Jewelry Picks",
      items: [
        "Spider web choker necklaces",
        "Skeleton hand rings and skull bracelets",
        "Gothic cross pendants",
        "Black cat and bat earrings",
        "Witch hat charm keychains",
      ],
    },
    whyUs: {
      heading: "Why Shop Jewelry Here",
      bullets: [
        "Costume-ready gothic finishes",
        "Affordable statement pieces",
        "Easy add-ons to any outfit",
        "Fast USA shipping",
      ],
    },
    howTo: {
      heading: "How to Choose Costume Jewelry",
      steps: [
        "Start with your base costume theme.",
        "Add a necklace or choker for impact.",
        "Layer rings or earrings for detail.",
        "Include a keychain or charm as a gift extra.",
        "Checkout with domestic USA shipping.",
      ],
    },
    faqs: [
      {
        q: "Do you sell gothic Halloween jewelry for costumes?",
        a: "Yes. Shop chokers, skull jewelry, bat earrings, and gothic pendants designed to finish Halloween costumes.",
      },
      {
        q: "Can I buy a skeleton hand ring online with USA shipping?",
        a: "Yes. Skeleton rings and similar costume jewelry ship domestically across all 50 US states.",
      },
      {
        q: "Are Halloween necklace and earring sets one-size?",
        a: "Most fashion jewelry is one-size. Check individual product descriptions for materials and fit notes.",
      },
    ],
    relatedCategories: relatedExcept("jewellryandaccessories"),
  },

  lifestyleandwearable: {
    slug: "lifestyleandwearable",
    headline: "Halloween apparel and everyday October gifts",
    intro: [
      "Wear the season with hoodies, socks, tote bags, printed mugs, and cozy gifts. Add Halloween jewelry if you want a small finishing piece that still works after costume night.",
      "These items work for everyday October style, hostess gifts, and family photos. Layer costume accessories such as a pin or hat when you need a quicker dress-up option.",
      "The Halloween planning guide covers what to order first if you are gifting and dressing up in the same week.",
    ],
    delivery: {
      heading: "Apparel & Lifestyle Delivery",
      paragraphs: [
        "Apparel and lifestyle gifts ship in 2–5 business days nationwide.",
        "Order early in October for personalized gift timing before Halloween parties.",
      ],
    },
    highlights: {
      heading: "Lifestyle Favorites",
      items: [
        "Halloween hoodies and printed tees",
        "Spooky socks and enamel pin sets",
        "Tote bags and cushion covers",
        "Printed mugs and kitchen aprons",
        "Everyday apparel for October vibes",
      ],
    },
    whyUs: {
      heading: "Why Shop Lifestyle Wearables",
      bullets: [
        "Wearable beyond a single night",
        "Gift-ready Halloween finds",
        "Matches costumes and party themes",
        "Fast domestic shipping",
      ],
    },
    howTo: {
      heading: "How to Gift Halloween Apparel",
      steps: [
        "Pick a wearable that matches their style — hoodie, tee, or tote.",
        "Add a mug or socks for a complete gift set.",
        "Bundle with candy or decor if hosting.",
        "Enter the recipient's US address at checkout.",
        "Order a week ahead of your party date.",
      ],
    },
    faqs: [
      {
        q: "Do you sell Halloween hoodies and apparel with USA shipping?",
        a: "Yes. Shop hoodies, tees, socks, and other Halloween apparel with domestic delivery to all 50 states.",
      },
      {
        q: "Can Halloween tote bags and printed mugs be gift options?",
        a: "Absolutely. Lifestyle gifts like totes, mugs, and cushion covers make easy hostess and coworker presents.",
      },
      {
        q: "Is Halloween apparel only for costume parties?",
        a: "No. Many pieces are everyday October wearables — cozy, casual, and reusable after Halloween night.",
      },
    ],
    relatedCategories: relatedExcept("lifestyleandwearable"),
  },

  printedandpapercrafts: {
    slug: "printedandpapercrafts",
    headline: "Halloween paper crafts, cards, and wrapping",
    intro: [
      "Craft and wrap with wrapping paper, gift tags, window clings, greeting cards, and coloring books. Use tags and bags with party supplies so treat bags look finished.",
      "These pieces work for invitations, classroom crafts, and last-minute mantel accents. Window clings and paper bats also count as light Halloween decorations when you cannot use large props.",
      "The Halloween planning guide is useful if you are timing crafts, candy, and costumes in the same week.",
    ],
    delivery: {
      heading: "Paper Craft Delivery",
      paragraphs: [
        "Lightweight paper goods ship quickly in 2–5 business days across the USA.",
        "Order gift wrap and tags early if you're preparing multiple Halloween gifts.",
      ],
    },
    highlights: {
      heading: "Paper Craft Favorites",
      items: [
        "Halloween wrapping paper and gift tags",
        "Window clings and sticker sheets",
        "Spooky greeting cards",
        "Pumpkin carving templates",
        "Coloring books and temporary tattoos",
      ],
    },
    whyUs: {
      heading: "Why Shop Paper Crafts Here",
      bullets: [
        "Party and gift finishing touches",
        "Kid-friendly craft options",
        "Pairs with candy and party supplies",
        "Fast USA shipping",
      ],
    },
    howTo: {
      heading: "How to Use Halloween Paper Crafts",
      steps: [
        "Choose wrapping and tags for treat bags or gifts.",
        "Add window clings for quick apartment-friendly decor.",
        "Print or use carving templates for pumpkin night.",
        "Include coloring pages for kids' tables.",
        "Order by late October for party week.",
      ],
    },
    faqs: [
      {
        q: "Do you sell Halloween wrapping paper and gift tags online?",
        a: "Yes. Shop seasonal wrapping paper, gift tags, and greeting cards with USA shipping from HalloweenReady.",
      },
      {
        q: "Can I buy Halloween window clings for apartments?",
        a: "Yes. Window clings and sticker sheets are popular for renters and small spaces — no nails required.",
      },
      {
        q: "Are pumpkin carving templates included in paper crafts?",
        a: "We carry printable-style carving templates and craft sheets — check product details for each listing.",
      },
    ],
    relatedCategories: relatedExcept("printedandpapercrafts"),
  },
};

export function getCategoryRichContent(slug: string): CategoryRichContent | undefined {
  return categoryRichContent[slug];
}
