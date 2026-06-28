/** SEO copy for USA city/state Halloween delivery landing pages. */

export interface CityPageContent {
  slug: string;
  label: string;
  region: "state" | "city";
  state?: string;
  headline: string;
  metaExtra: string;
  intro: string[];
  delivery: { heading: string; paragraphs: string[] };
  areas: { heading: string; items: string[] };
  whyUs: { heading: string; bullets: string[] };
  howTo: { heading: string; steps: string[] };
  faqs: { q: string; a: string }[];
  relatedCategories: { label: string; href: string; text: string }[];
}

const sharedCategories = [
  {
    label: "Costumes",
    href: "/categories/costumes",
    text: "Adult, teen, and kids Halloween costumes with fast delivery.",
  },
  {
    label: "Decorations",
    href: "/categories/decorations",
    text: "Yard inflatables, LED pumpkins, skeletons, and fog machines.",
  },
  {
    label: "Candy & Treats",
    href: "/categories/candy-treats",
    text: "Bulk candy assortments and treat bag bundles.",
  },
  {
    label: "Party Supplies",
    href: "/categories/party-supplies",
    text: "Plates, banners, balloons, and themed tableware.",
  },
] as const;

function halloweenCityContent(
  slug: string,
  label: string,
  region: "state" | "city",
  areas: string[],
  state?: string
): CityPageContent {
  const place = state ? `${label}, ${state}` : label;
  return {
    slug,
    label,
    region,
    state,
    headline: `Halloween Costumes & Decor Delivery to ${place}`,
    metaExtra: `Shop Halloween costumes, decor, and candy with delivery to ${place} in 2–5 business days.`,
    intro: [
      `Getting ready for Halloween in ${place}? HalloweenReady delivers costumes, decorations, candy, accessories, and party supplies across ${label} with domestic US shipping — no customs delays.`,
      `Order from anywhere worldwide; enter your ${place} delivery address at checkout. We ship from US warehouses so your Halloween gear arrives before October 31.`,
    ],
    delivery: {
      heading: `Halloween Delivery Across ${label}`,
      paragraphs: [
        `Standard delivery to ${place} is 2–5 business days. Express shipping reaches major metros in 2–3 business days.`,
        `Popular orders include kids costumes, yard inflatables, bulk candy, and party supply bundles.`,
      ],
    },
    areas: {
      heading: `${label} Areas We Serve`,
      items: areas,
    },
    whyUs: {
      heading: `Why ${label} Shoppers Choose HalloweenReady`,
      bullets: [
        "Domestic US fulfillment — fast delivery",
        "Costumes, decor, candy, and party supplies in one store",
        "Secure Stripe (USD) and Razorpay (INR) checkout",
        "Order by October 25 for guaranteed pre-Halloween delivery",
        "WhatsApp and email customer support",
      ],
    },
    howTo: {
      heading: `How to Order Halloween Supplies for ${place}`,
      steps: [
        "Browse costumes, decor, candy, or party supplies.",
        `Enter your ${place} address at checkout.`,
        "Pay securely online.",
        "We ship domestically within the USA.",
        "Receive delivery in 2–5 business days.",
      ],
    },
    faqs: [
      {
        q: `Do you deliver Halloween orders to ${label}?`,
        a: `Yes. We deliver to ${place} and surrounding areas with domestic US shipping.`,
      },
      {
        q: "Can I order from outside the USA?",
        a: `Yes. Order on HalloweenReady.com, enter the ${place} delivery address, and pay in USD or INR.`,
      },
    ],
    relatedCategories: [...sharedCategories],
  };
}

export const cityPages: CityPageContent[] = [
  halloweenCityContent("california", "California", "state", [
    "Los Angeles",
    "San Francisco",
    "San Diego",
    "San Jose",
    "Sacramento",
    "Oakland",
    "Fresno",
  ]),
  halloweenCityContent("new-york", "New York", "state", [
    "New York City",
    "Buffalo",
    "Rochester",
    "Albany",
    "Syracuse",
    "Yonkers",
  ]),
  halloweenCityContent("texas", "Texas", "state", [
    "Houston",
    "Dallas",
    "Austin",
    "San Antonio",
    "Fort Worth",
    "El Paso",
  ]),
  halloweenCityContent("florida", "Florida", "state", [
    "Miami",
    "Orlando",
    "Tampa",
    "Jacksonville",
    "Fort Lauderdale",
  ]),
  halloweenCityContent("new-jersey", "New Jersey", "state", [
    "Newark",
    "Jersey City",
    "Paterson",
    "Edison",
    "Trenton",
  ]),
  halloweenCityContent("los-angeles", "Los Angeles", "city", [
    "Downtown LA",
    "Hollywood",
    "Santa Monica",
    "Pasadena",
    "Long Beach",
  ], "CA"),
  halloweenCityContent("chicago", "Chicago", "city", [
    "Loop",
    "Lincoln Park",
    "Wicker Park",
    "Hyde Park",
    "Evanston",
  ], "IL"),
  halloweenCityContent("houston", "Houston", "city", [
    "Downtown Houston",
    "Sugar Land",
    "Katy",
    "Pearland",
    "The Woodlands",
  ], "TX"),
  halloweenCityContent("san-francisco", "San Francisco", "city", [
    "SOMA",
    "Mission District",
    "Marina",
    "Sunset",
    "Oakland Bay Area",
  ], "CA"),
];

const cityMap = new Map(cityPages.map((c) => [c.slug, c]));

export function getCityContent(slug: string): CityPageContent | undefined {
  return cityMap.get(slug);
}

export function allCityContent(): CityPageContent[] {
  return cityPages;
}
