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
  { label: "Costumes", href: "/categories/costumes", text: "Adult and kids Halloween costumes." },
  { label: "Decorations", href: "/categories/decorations", text: "Yard decor, inflatables, and haunted props." },
  { label: "Candy & Treats", href: "/categories/candy-treats", text: "Bulk candy and treat bags." },
  { label: "Accessories", href: "/categories/accessories", text: "Masks, makeup, and costume finishing touches." },
  { label: "Party Supplies", href: "/categories/party-supplies", text: "Plates, balloons, and party packs." },
];

function relatedExcept(slug: string) {
  return relatedAll.filter((c) => !c.href.endsWith(slug));
}

export const categoryRichContent: Record<string, CategoryRichContent> = {
  costumes: {
    slug: "costumes",
    headline: "Halloween Costumes — Adult & Kids | USA Delivery",
    intro: [
      "Shop premium Halloween costumes for adults, teens, and kids. From classic vampires and witches to skeleton bodysuits and pirate captains — find the perfect look for Halloween 2026.",
      "Order online from anywhere worldwide. Enter your US shipping address at checkout and we deliver domestically within America in 2–5 business days.",
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
        "Last-minute bodysuits and capes — fast shipping options",
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
        q: "Do you sell adult and kids costumes?",
        a: "Yes. We carry adult, teen, kids, and toddler costume sizes across many themes.",
      },
      {
        q: "How early should I order a Halloween costume?",
        a: "Order by October 20, 2026 for guaranteed delivery before Halloween night.",
      },
    ],
    relatedCategories: relatedExcept("costumes"),
  },
  decorations: {
    slug: "decorations",
    headline: "Halloween Decorations — Yard & Indoor Props | USA Shipping",
    intro: [
      "Create a haunted home with inflatable ghosts, LED pumpkin lights, fog machines, skeleton graveyard sets, and spider web clings.",
      "Indoor and outdoor decor ships fast across all 50 US states from domestic warehouses.",
    ],
    delivery: {
      heading: "Halloween Decor Delivery",
      paragraphs: [
        "Decor items ship in 2–5 business days nationwide. Large inflatables include stakes and blowers.",
        "Order yard decor by October 25 to set up before trick-or-treat night.",
      ],
    },
    highlights: {
      heading: "Top Decoration Picks",
      items: [
        "12ft inflatable ghosts with LED lights",
        "LED pumpkin pathway stakes",
        "Fog machines with remote control",
        "Skeleton graveyard prop sets",
        "Reusable window spider web clings",
      ],
    },
    whyUs: {
      heading: "Why Shop Decor at HalloweenReady",
      bullets: [
        "Indoor and outdoor options",
        "Fast domestic USA shipping",
        "Quality props that last multiple seasons",
        "Bundle decor with costumes in one order",
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
        q: "Do inflatables include everything needed?",
        a: "Yes. Our inflatables include stakes, tethers, and blower units unless noted otherwise.",
      },
      {
        q: "Can I use fog machines outdoors?",
        a: "Yes, in covered or wind-sheltered areas. Check product specs for outdoor suitability.",
      },
    ],
    relatedCategories: relatedExcept("decorations"),
  },
  "candy-treats": {
    slug: "candy-treats",
    headline: "Halloween Candy & Treats — Bulk Assortments | USA Delivery",
    intro: [
      "Stock up for trick-or-treat with bulk candy assortments, chocolate variety packs, gummy mixes, and pre-filled treat bags.",
      "Fresh candy shipped domestically across all 50 US states — order before October 25 for Halloween night.",
    ],
    delivery: {
      heading: "Candy Delivery for Halloween",
      paragraphs: [
        "Candy orders ship in 2–5 business days. Bulk packs are sealed for freshness.",
        "Ideal for home bowls, school events, and office Halloween parties.",
      ],
    },
    highlights: {
      heading: "Popular Candy Options",
      items: [
        "5 lb mixed Halloween candy assortments",
        "Chocolate mini bar variety packs",
        "Gummy worms and bats mixes",
        "Pre-filled treat bags for trick-or-treat",
        "Limited edition seasonal candy",
      ],
    },
    whyUs: {
      heading: "Why Buy Candy from HalloweenReady",
      bullets: [
        "Bulk options for trick-or-treat",
        "Fresh, well-packed shipments",
        "Nut-free options available",
        "Combine with costumes and decor in one order",
      ],
    },
    howTo: {
      heading: "Trick-or-Treat Planning Tips",
      steps: [
        "Estimate 2–3 pieces per expected visitor.",
        "Order bulk assortments for variety.",
        "Add pre-filled bags for quick handouts.",
        "Store candy in a cool, dry place until Halloween.",
        "Order by Oct 25 for delivery before Oct 31.",
      ],
    },
    faqs: [
      {
        q: "Do you sell bulk Halloween candy?",
        a: "Yes. Shop 3 lb and 5 lb assortments plus variety packs for trick-or-treat.",
      },
      {
        q: "Is the candy fresh?",
        a: "We ship sealed bulk packs from US fulfillment centers for maximum freshness.",
      },
    ],
    relatedCategories: relatedExcept("candy-treats"),
  },
  accessories: {
    slug: "accessories",
    headline: "Halloween Accessories — Masks, Makeup & More",
    intro: [
      "Complete your costume with latex masks, witch hats, face paint palettes, glow sticks, and universal capes.",
      "Accessories ship fast with costumes and decor — one order, one delivery.",
    ],
    delivery: {
      heading: "Accessory Delivery",
      paragraphs: [
        "Small accessories ship quickly in 2–5 business days to all US states.",
        "Pair accessories with costumes for a complete Halloween look.",
      ],
    },
    highlights: {
      heading: "Top Accessories",
      items: [
        "Realistic latex horror masks",
        "Face paint and glitter palettes",
        "Witch hats and broom kits",
        "Glow stick safety necklaces",
        "Universal black hooded capes",
      ],
    },
    whyUs: {
      heading: "Why Shop Accessories Here",
      bullets: [
        "Finish any costume with one stop",
        "Quality masks and makeup kits",
        "Glow sticks for trick-or-treat safety",
        "Fast USA shipping",
      ],
    },
    howTo: {
      heading: "How to Choose Accessories",
      steps: [
        "Start with your base costume.",
        "Add a mask or face paint for impact.",
        "Include hat or cape if needed.",
        "Grab glow sticks for outdoor trick-or-treat.",
        "Checkout with domestic USA shipping.",
      ],
    },
    faqs: [
      {
        q: "Are face paints safe for skin?",
        a: "Our palettes use cosmetic-grade face paint suitable for Halloween makeup.",
      },
      {
        q: "Do masks fit most adults?",
        a: "Most latex masks are one-size with elastic straps. Check product descriptions for details.",
      },
    ],
    relatedCategories: relatedExcept("accessories"),
  },
  "party-supplies": {
    slug: "party-supplies",
    headline: "Halloween Party Supplies — Tableware & Decor",
    intro: [
      "Host a haunted party with themed tableware, balloon garlands, treat buckets, photo booth props, and complete party packs.",
      "Party supplies delivered across the USA in time for your Halloween celebration.",
    ],
    delivery: {
      heading: "Party Supply Delivery",
      paragraphs: [
        "Party packs and individual supplies ship in 2–5 business days.",
        "Order by October 25 for pre-Halloween party setup.",
      ],
    },
    highlights: {
      heading: "Party Must-Haves",
      items: [
        "Haunted mansion party packs (serves 16)",
        "Orange and black balloon garland kits",
        "Trick-or-treat bucket 4-packs",
        "Table runners and placemat sets",
        "Photo booth prop sets",
      ],
    },
    whyUs: {
      heading: "Why Buy Party Supplies Here",
      bullets: [
        "Complete party packs for easy setup",
        "Themed tableware and decor",
        "Photo booth props for memorable parties",
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
        q: "Do party packs include everything?",
        a: "Party packs include plates, cups, napkins, tablecloth, and banner for the listed guest count.",
      },
      {
        q: "Can I combine party supplies with costumes?",
        a: "Yes. Add everything to one cart for a single USA delivery.",
      },
    ],
    relatedCategories: relatedExcept("party-supplies"),
  },
};

export function getCategoryRichContent(slug: string): CategoryRichContent | undefined {
  return categoryRichContent[slug];
}
