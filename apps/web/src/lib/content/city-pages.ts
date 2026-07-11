/** SEO copy for USA city/state Halloween delivery landing pages. */

import { seoLocations, type SeoLocation } from "./seo-data";

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

const sharedCategories: CityPageContent["relatedCategories"] = [
  {
    label: "Costumes & Accessories",
    href: "/categories/costumesandaccessories",
    text: "Adult, teen, and kids Halloween costumes with fast delivery.",
  },
  {
    label: "Home Decorations",
    href: "/categories/home-decoration",
    text: "Yard inflatables, LED pumpkins, skeletons, and fog machines.",
  },
  {
    label: "Party Supplies",
    href: "/categories/partysupplier",
    text: "Plates, banners, balloons, and themed tableware.",
  },
  {
    label: "Toys & Novelty",
    href: "/categories/toysandnovelty",
    text: "Novelty toys, favor bags, and fun Halloween add-ons.",
  },
];

function halloweenCityContent(loc: SeoLocation): CityPageContent {
  const { slug, label, region, areas, seasonalNote, h1, description } = loc;
  const state = loc.state ?? undefined;
  const place = state ? `${label}, ${state}` : label;

  return {
    slug,
    label,
    region,
    state,
    headline: h1,
    metaExtra: description,
    intro: [
      `Getting ready for Halloween in ${place}? HalloweenReady delivers costumes, decorations, party supplies, and novelty items across ${label} with domestic US shipping — no customs delays.`,
      seasonalNote,
      `Order from anywhere in the USA or abroad; enter your ${place} delivery address at checkout. We ship from US warehouses so your Halloween gear arrives before October 31.`,
    ],
    delivery: {
      heading: `Halloween Delivery Across ${label}`,
      paragraphs: [
        `Standard delivery to ${place} is 2–5 business days. Express shipping reaches major metros in 2–3 business days.`,
        `Popular orders include kids costumes, yard inflatables, party supply bundles, and novelty add-ons — geared for ${label} shoppers. ${seasonalNote}`,
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
        "Costumes, decor, party supplies, and novelty in one store",
        "Secure Stripe (USD) and Razorpay (INR) checkout",
        "Order by October 25 for guaranteed pre-Halloween delivery",
        "WhatsApp and email customer support",
      ],
    },
    howTo: {
      heading: `How to Order Halloween Supplies for ${place}`,
      steps: [
        "Browse costumes, decor, party supplies, or toys & novelty.",
        `Enter your ${place} address at checkout.`,
        "Pay securely online.",
        "We ship domestically within the USA.",
        "Receive delivery in 2–5 business days.",
      ],
    },
    faqs: [
      {
        q: `Do you deliver Halloween orders to ${label}?`,
        a: `Yes. We deliver to ${place} and surrounding areas with domestic US shipping in 2–5 business days.`,
      },
      {
        q: "Can I order from outside the USA?",
        a: `Yes. Order on HalloweenReady.com, enter the ${place} delivery address, and pay in USD or INR. We ship domestically within America.`,
      },
      {
        q: `What should I know about Halloween in ${label}?`,
        a: seasonalNote,
      },
    ],
    relatedCategories: [...sharedCategories],
  };
}

export const cityPages: CityPageContent[] = seoLocations.map(halloweenCityContent);

const cityMap = new Map(cityPages.map((c) => [c.slug, c]));

export function getCityContent(slug: string): CityPageContent | undefined {
  return cityMap.get(slug);
}

export function allCityContent(): CityPageContent[] {
  return cityPages;
}
