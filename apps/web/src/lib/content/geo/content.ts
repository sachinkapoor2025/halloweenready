import { isQuoteableStorefrontCountry } from "@halloweenready/shared";
import { ADMIN_KIND_LABEL, type GeoLocation } from "./types";
import { getGeoChildren, getGeoCountry, getGeoParent, getGeoSiblings } from "./catalog";

export type LocationFaq = { q: string; a: string };

export type LocationPageContent = {
  title: string;
  description: string;
  h1: string;
  keywords: string;
  intro: string;
  hierarchyNote: string;
  halloweenContext: string;
  shipping: string;
  planning: string;
  childHeading: string | null;
  siblingHeading: string | null;
  faqs: LocationFaq[];
  quoteable: boolean;
};

const COUNTRY_CONTEXT: Record<
  string,
  { halloween: string; planning: string }
> = {
  IN: {
    halloween:
      "Halloween is not an Indian public holiday. Interest is mainly commercial and urban — costume parties, school events, and mall displays — and often sits close on the calendar to Diwali, which is the major autumn festival.",
    planning:
      "Use this page to browse costumes, decorations, and party supplies. Confirm whether a product can be quoted to an Indian address before you treat it as deliverable.",
  },
  US: {
    halloween:
      "Halloween is widely observed on 31 October, with trick-or-treat, yard displays, and costume parties common across states and cities. This page is a shopping and planning hub, not a local events calendar.",
    planning:
      "Open a product page to request a live shipping quote for a US ZIP code. Transit varies by item — we do not promise 31 October arrival.",
  },
  GB: {
    halloween:
      "Halloween is widely marked across the United Kingdom with costumes, parties, and neighbourhood displays. England, Scotland, Wales, and Northern Ireland are constituent countries, not US-style states.",
    planning:
      "Product pages can request a shipping quote for a UK postcode when the item supports it. We do not run a local UK warehouse for every SKU.",
  },
  CA: {
    halloween:
      "Halloween is widely observed in Canada, similar to the United States, with costumes, decorations, and community trick-or-treat. Provinces and territories are not interchangeable — Quebec in particular is often searched in both English and French.",
    planning:
      "Product pages can request a shipping quote for a Canadian destination when the item supports it. This catalog page is in English.",
  },
  AU: {
    halloween:
      "Late October in Australia is spring, not autumn. Halloween is a commercial and community event rather than a public holiday, with costume parties and shop displays strongest in the larger cities.",
    planning:
      "Product pages can request a shipping quote for an Australian address when the item supports it. Plan around spring weather, not Northern Hemisphere fall foliage.",
  },
  JP: {
    halloween:
      "Halloween is not a national holiday in Japan. It is a commercial costume occasion, especially in large cities. We do not sell event tickets and we do not publish unverified crowd or street-party dates.",
    planning:
      "Treat this as a shopping and planning page. Live storefront freight quotes are not currently offered for Japan; confirm destination support on the product page before checkout.",
  },
  HK: {
    halloween:
      "Hong Kong is not divided into states. Halloween demand concentrates in shopping districts, hotels, and nightlife areas. Districts and areas below sit under Hong Kong, not under China in this URL tree.",
    planning:
      "Live storefront freight quotes are not currently offered for Hong Kong. Use this page to plan costumes and decor, then confirm shipping on each product.",
  },
  AE: {
    halloween:
      "The UAE is seven emirates. Dubai is an emirate, not a country. Halloween is not a public holiday; costume and party demand is strongest in hospitality and mall settings in the larger emirates.",
    planning:
      "Live storefront freight quotes are not currently offered for the UAE. Confirm destination support on the product page before checkout.",
  },
  DE: {
    halloween:
      "Germany is organised as 16 Länder (federal states), not US states. Halloween is a commercial costume and party occasion. 31 October is not a nationwide public holiday, though some Länder observe Reformation Day on the same date.",
    planning:
      "Product pages can request a shipping quote for Germany when the item supports it. We do not claim a German warehouse for every SKU.",
  },
};

const DEFAULT_CONTEXT = {
  halloween:
    "Halloween on 31 October is not a universal public holiday. In many European and other markets it is a commercial costume, party, and decoration occasion rather than a civic festival.",
  planning:
    "This page exists so shoppers can browse by geography. Shipping is confirmed per product — we do not assume every SKU reaches every country listed in this directory.",
};

function placeLabel(loc: GeoLocation): string {
  const country = getGeoCountry(loc);
  if (loc.kind === "country") return loc.name;
  if (loc.kind === "city") {
    const parent = getGeoParent(loc);
    return parent ? `${loc.name}, ${parent.name}` : `${loc.name}, ${country.name}`;
  }
  return `${loc.name}, ${country.name}`;
}

function kindPhrase(loc: GeoLocation): string {
  if (loc.kind === "country") return `${loc.name} is listed as a country in the HalloweenReady location directory.`;
  const country = getGeoCountry(loc);
  const parent = getGeoParent(loc);
  const label = ADMIN_KIND_LABEL[loc.adminKind];
  if (parent && parent.kind !== "country") {
    return `${loc.name} is classified as a ${label} in ${parent.name}, ${country.name} — not as a country and not as a generic “state.”`;
  }
  return `${loc.name} is classified as a ${label} of ${country.name} — not as a country and not forced into a US-style state label.`;
}

function shippingCopy(loc: GeoLocation, quoteable: boolean): string {
  const country = getGeoCountry(loc);
  if (quoteable) {
    return `HalloweenReady can request a live shipping quote on product pages for destinations in ${country.name} (${loc.isoCountry}). Quotes are per item, not a blanket nationwide SLA. Catalog goods are fulfilled through international dropshipping partners — we do not claim a local warehouse in ${loc.name}.`;
  }
  return `HalloweenReady does not currently publish a live storefront freight quote for ${country.name} (${loc.isoCountry}). This is a shopping and planning page for Halloween ${loc.name}. Confirm destination support on the product page before checkout, and do not assume every SKU ships here.`;
}

function titleFor(loc: GeoLocation): string {
  if (loc.kind === "country") return `Halloween ${loc.name} | Costumes, Decor & Party Supplies`;
  if (loc.kind === "city") return `Halloween ${loc.name} | Shop Costumes & Decor`;
  return `Halloween ${loc.name} | ${ADMIN_KIND_LABEL[loc.adminKind]} in ${getGeoCountry(loc).name}`;
}

function h1For(loc: GeoLocation): string {
  if (loc.kind === "country") return `Halloween in ${loc.name}`;
  if (loc.kind === "city") return `Halloween in ${loc.name}`;
  return `Halloween in ${loc.name}`;
}

function descriptionFor(loc: GeoLocation, quoteable: boolean): string {
  const place = placeLabel(loc);
  const kind = ADMIN_KIND_LABEL[loc.adminKind];
  if (quoteable) {
    return `Shop Halloween costumes, decorations, and party supplies for ${place}. ${loc.name} is a ${kind} in our location directory. Check the product shipping quote before you order.`;
  }
  return `Halloween shopping and planning for ${place}. ${loc.name} is listed as a ${kind}. Live freight quotes are not published for this destination — confirm shipping on each product.`;
}

export function buildLocationContent(loc: GeoLocation): LocationPageContent {
  const country = getGeoCountry(loc);
  const parent = getGeoParent(loc);
  const children = getGeoChildren(loc.id);
  const siblings = getGeoSiblings(loc).filter((s) => s.kind === loc.kind || s.adminKind === loc.adminKind);
  const quoteable = isQuoteableStorefrontCountry(loc.isoCountry);
  const ctx = COUNTRY_CONTEXT[loc.isoCountry] ?? DEFAULT_CONTEXT;
  const place = placeLabel(loc);

  const childHeading =
    children.length === 0
      ? null
      : loc.kind === "country"
        ? `Places in ${loc.name}`
        : `Places in ${loc.name}`;

  const siblingHeading =
    loc.kind === "country" || siblings.length === 0
      ? null
      : parent
        ? `Other ${ADMIN_KIND_LABEL[loc.adminKind]} pages in ${parent.name}`
        : `Related ${ADMIN_KIND_LABEL[loc.adminKind]} pages`;

  const hemisphereNote =
    loc.hemisphere === "south"
      ? " This location is in the Southern Hemisphere, so 31 October falls in spring rather than autumn."
      : "";

  const intro = [
    `Shop Halloween costumes, decorations, and party supplies with a dedicated page for ${place}.`,
    kindPhrase(loc),
    loc.kind === "country"
      ? `${children.length} administrative and city pages sit under Halloween ${loc.name} in this directory.`
      : parent
        ? `This page sits under Halloween ${parent.name} in the ${country.name} location tree.`
        : "",
    hemisphereNote.trim(),
  ]
    .filter(Boolean)
    .join(" ");

  const faqs: LocationFaq[] = [
    {
      q: `Do you ship Halloween orders to ${loc.name}?`,
      a: quoteable
        ? `We can request a shipping quote on product pages for ${country.name}. Availability is per SKU and destination — this page does not mean every product ships to ${loc.name}.`
        : `We do not currently publish a live freight quote for ${country.name}. Use this page to plan a Halloween shop, then confirm destination support on the product page before checkout.`,
    },
    {
      q: `What kind of place is ${loc.name} in this directory?`,
      a: kindPhrase(loc),
    },
    {
      q: `Is Halloween a public holiday in ${country.name}?`,
      a: ctx.halloween,
    },
    {
      q: `Are these local event or ticket pages?`,
      a: `No. HalloweenReady sells costumes, decorations, and party supplies. We do not sell haunted-house tickets and we do not invent local event listings for ${loc.name}.`,
    },
  ];

  if (loc.adminKind === "emirate" || country.slug === "uae") {
    faqs.push({
      q: "Is Dubai a country on this site?",
      a: "No. Dubai is an emirate of the United Arab Emirates. The country page is Halloween UAE; Dubai, Abu Dhabi, and Sharjah sit underneath it.",
    });
  }

  return {
    title: titleFor(loc),
    description: descriptionFor(loc, quoteable),
    h1: h1For(loc),
    keywords: [
      `Halloween ${loc.name}`,
      `Halloween ${country.name}`,
      `Halloween costumes ${loc.name}`,
      `Halloween decorations ${loc.name}`,
    ].join(", "),
    intro,
    hierarchyNote: kindPhrase(loc),
    halloweenContext: ctx.halloween,
    shipping: shippingCopy(loc, quoteable),
    planning: ctx.planning,
    childHeading,
    siblingHeading,
    faqs,
    quoteable,
  };
}

export function locationBreadcrumbs(loc: GeoLocation): { label: string; href?: string }[] {
  const crumbs: { label: string; href?: string }[] = [
    { label: "Home", href: "/" },
    { label: "Halloween", href: "/halloween" },
  ];
  const chain: GeoLocation[] = [];
  let cur: GeoLocation | undefined = loc;
  while (cur) {
    chain.unshift(cur);
    cur = getGeoParent(cur);
  }
  for (let i = 0; i < chain.length; i++) {
    const node = chain[i];
    crumbs.push(i === chain.length - 1 ? { label: node.name } : { label: node.name, href: node.path });
  }
  return crumbs;
}

export function schemaPlaceType(loc: GeoLocation): string {
  if (loc.kind === "country") return "Country";
  if (loc.kind === "city") return loc.adminKind === "area" ? "Place" : "City";
  if (loc.adminKind === "constituent_country") return "Country";
  return "AdministrativeArea";
}
