export type CountrySeoPage = {
  slug: string;
  countryCode: string;
  name: string;
  hreflang: string;
  locale: string;
  title: string;
  description: string;
  h1: string;
  keywords: string[];
  intro: string;
  fulfillment: string;
  postalLabel: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export const countrySeoPages: CountrySeoPage[] = [
  {
    slug: "us",
    countryCode: "US",
    name: "United States",
    hreflang: "en-US",
    locale: "en_US",
    title: "Halloween Costumes USA | Shop Online for US Delivery",
    description:
      "Buy Halloween costumes, decorations, and party supplies online for the USA. Check each product’s shipping quote for delivery to your ZIP code.",
    h1: "Halloween costumes online in the USA",
    keywords: [
      "Halloween costumes USA",
      "Halloween costumes online USA",
      "buy Halloween costumes in USA",
      "Halloween costumes delivered in USA",
    ],
    intro:
      "Shop Halloween costumes, decorations, and party supplies for delivery to the United States. Browse the catalog, then open a product page to see a shipping quote for your ZIP code. Availability depends on the item — we do not assume every product ships to every address.",
    fulfillment:
      "Halloween catalog items are fulfilled through international dropshipping partners. Delivery times vary by product and destination. Use the shipping panel on the product page rather than a blanket nationwide promise.",
    postalLabel: "ZIP code",
    sections: [
      {
        heading: "What we sell for Halloween in the United States",
        body: "Shop adult and kids costumes, outdoor decorations, inflatables, party tableware, and accessories. Existing category and city pages stay at their current URLs so search equity is preserved.",
      },
      {
        heading: "Delivery across the USA",
        body: "We do not operate a blanket ‘ships in two days to every ZIP’ policy for this catalog. Storefront freight quotes for the United States are available on product pages. Confirm the method and transit estimate before checkout.",
      },
    ],
    faqs: [
      {
        q: "Do you ship Halloween costumes across the USA?",
        a: "Many items can be quoted for US delivery on the product page. Confirm the destination and method there before checkout — we do not claim a local warehouse for every SKU.",
      },
      {
        q: "How do I confirm you deliver to my ZIP code?",
        a: "Use Change Country / Delivery Location in the header, enter your ZIP code, and we will check serviceability before you checkout.",
      },
    ],
  },
  {
    slug: "uk",
    countryCode: "GB",
    name: "United Kingdom",
    hreflang: "en-GB",
    locale: "en_GB",
    title: "Halloween Costumes UK | Shop Online for UK Delivery",
    description:
      "Buy Halloween costumes online in the UK. Check each product’s shipping quote for delivery to your postcode — availability depends on the item.",
    h1: "Halloween costumes online in the UK",
    keywords: [
      "Halloween costumes UK",
      "Halloween costumes online UK",
      "buy Halloween costumes in the UK",
      "Halloween costumes delivered in the UK",
    ],
    intro:
      "Looking for Halloween costumes in the United Kingdom? Select United Kingdom in the header and enter your postcode. Open a product page for a shipping quote. We do not promise a local UK warehouse for every SKU.",
    fulfillment:
      "UK-bound Halloween catalog items are fulfilled through international dropshipping partners. Transit estimates appear on the product shipping panel when a quote is available.",
    postalLabel: "postcode",
    sections: [
      {
        heading: "UK spelling, sizing, and dates",
        body: "This page uses UK spelling (colour, favourite) where it helps shoppers. Halloween is still 31 October. Costume sizing follows the product size guide; UK customers should compare centimetres on the product page.",
      },
      {
        heading: "How UK fulfilment works",
        body: "If a live freight quote returns methods for GB, those methods are the delivery estimate. Mixed baskets may still use store checkout shipping policy. We never invent next-day UK delivery.",
      },
    ],
    faqs: [
      {
        q: "Can I buy Halloween costumes online for UK delivery?",
        a: "Choose United Kingdom, enter your postcode, and check the product-page shipping quote. A quote is the only confirmation that a method is available.",
      },
      {
        q: "What if a costume cannot be quoted to the UK?",
        a: "We show that the destination is unavailable instead of promising local delivery. You can still change country at any time.",
      },
    ],
  },
  {
    slug: "ca",
    countryCode: "CA",
    name: "Canada",
    hreflang: "en-CA",
    locale: "en_CA",
    title: "Halloween Costumes Canada | Shop Online for Canadian Delivery",
    description:
      "Shop Halloween costumes online in Canada. Enter your postal code to check HalloweenReady delivery and fulfilment options.",
    h1: "Halloween costumes online in Canada",
    keywords: ["Halloween costumes Canada", "Halloween costumes online Canada"],
    intro:
      "Canadian shoppers can browse the same HalloweenReady catalogue and enter a postal code to confirm whether we can deliver to their address.",
    fulfillment:
      "Canada-bound catalog items use international dropshipping partners. Storefront freight quotes are available for CA on product pages when the method is offered.",
    postalLabel: "postal code",
    sections: [
      {
        heading: "Shopping Halloween from Canada",
        body: "Prices may display in CAD as a guide; checkout for non-India markets is charged in USD via Stripe unless you switch to INR.",
      },
    ],
    faqs: [
      {
        q: "Do you deliver Halloween costumes to Canada?",
        a: "Enter your postal code in the header. If we can serve that code, checkout will show the fulfilment source and a realistic delivery estimate.",
      },
    ],
  },
  {
    slug: "au",
    countryCode: "AU",
    name: "Australia",
    hreflang: "en-AU",
    locale: "en_AU",
    title: "Halloween Costumes Australia | Shop Online for AU Delivery",
    description:
      "Buy Halloween costumes online in Australia. Check your postcode for HalloweenReady delivery estimates.",
    h1: "Halloween costumes online in Australia",
    keywords: ["Halloween costumes Australia", "Halloween costumes online Australia"],
    intro:
      "Halloween falls in Australian spring. Order earlier than US shoppers if you want costumes before 31 October, and confirm your postcode in the header.",
    fulfillment:
      "Australian orders use international dropshipping partners. Expect longer transit than domestic US shipping, and confirm the product-page quote before checkout.",
    postalLabel: "postcode",
    sections: [
      {
        heading: "Seasonal timing for Australia",
        body: "Because Halloween is not a public holiday everywhere in Australia, last-minute local stock can be limited. Ordering in early October is safer for party dates.",
      },
    ],
    faqs: [
      {
        q: "Can I get Halloween costumes delivered in Australia?",
        a: "Yes where serviceability allows. Enter a 4-digit postcode to check, and expect longer delivery than US domestic orders.",
      },
    ],
  },
  {
    slug: "in",
    countryCode: "IN",
    name: "India",
    hreflang: "en-IN",
    locale: "en_IN",
    title: "Halloween Costumes India | Shop Online for India Delivery",
    description:
      "Buy Halloween costumes online in India. HalloweenReady prefers our Punjab warehouse and INR checkout when you select India.",
    h1: "Halloween costumes online in India",
    keywords: ["Halloween costumes India", "Halloween costumes online India"],
    intro:
      "Select India in the header and enter your 6-digit PIN code before placing an order. India delivery depends on a product shipping quote — we do not assume every Halloween SKU can be delivered there.",
    fulfillment:
      "We do not treat India as a guaranteed destination for every catalog item. Check the product page; if no quote is offered, do not assume delivery.",
    postalLabel: "PIN code",
    sections: [
      {
        heading: "India checkout and support",
        body: "India market checkout uses INR and Razorpay. Support contact for India is the India warehouse number, not the US warehouse line.",
      },
    ],
    faqs: [
      {
        q: "Do you deliver Halloween costumes in India?",
        a: "Choose India, enter your PIN code, and check whether a shipping quote is offered on the product. We do not promise Punjab warehouse fulfilment for every SKU.",
      },
    ],
  },
  {
    slug: "ae",
    countryCode: "AE",
    name: "United Arab Emirates",
    hreflang: "en-AE",
    locale: "en_AE",
    title: "Halloween Costumes UAE | Dubai & Abu Dhabi Delivery",
    description:
      "Shop Halloween costumes online in the UAE, including Dubai and Abu Dhabi. Confirm delivery with your address details at checkout.",
    h1: "Halloween costumes online in the UAE",
    keywords: ["Halloween costumes UAE", "Halloween costumes Dubai", "Halloween costumes Abu Dhabi"],
    intro:
      "UAE shoppers can order costumes and party supplies for Dubai, Abu Dhabi, and other emirates. Delivery depends on international fulfilment capacity — we never promise local stock we do not have.",
    fulfillment:
      "UAE orders currently ship from an international-capable warehouse with a realistic transit estimate at checkout.",
    postalLabel: "postal code",
    sections: [
      {
        heading: "Dubai and Abu Dhabi shopping notes",
        body: "Indoor events and hotel parties are common. Focus on costumes, accessories, and compact decor that travel well. Confirm the shipping address in English at checkout.",
      },
    ],
    faqs: [
      {
        q: "Do you deliver Halloween costumes to Dubai or Abu Dhabi?",
        a: "Select United Arab Emirates, enter your postal or area details, and checkout will confirm whether we can deliver.",
      },
    ],
  },
  {
    slug: "de",
    countryCode: "DE",
    name: "Germany",
    hreflang: "de-DE",
    locale: "en_DE",
    title: "Halloween Costumes Germany | Online Delivery",
    description:
      "Buy Halloween costumes online in Germany. HalloweenReady prefers UK/EU warehouse fulfilment when inventory allows.",
    h1: "Halloween costumes online in Germany",
    keywords: ["Halloween costumes Germany", "Halloween costumes online Germany"],
    intro:
      "German shoppers get a dedicated country page — not a generic Europe URL. Select Germany and enter your postcode, then confirm a product-page freight quote. We do not assume UK-warehouse stock for every item.",
    fulfillment: "Germany is a quoteable storefront destination. Use the product shipping panel rather than a local-warehouse promise.",
    postalLabel: "postcode",
    sections: [
      {
        heading: "Why this is not an EU doorway page",
        body: "We publish Germany-specific copy because fulfilment, language, and delivery expectations differ from France or Spain. Thin city pages are not generated.",
      },
    ],
    faqs: [
      {
        q: "Can I order Halloween costumes to Germany?",
        a: "Enter your postcode and check the product-page quote. A successful quote is the only confirmation that a method is available.",
      },
    ],
  },
  {
    slug: "fr",
    countryCode: "FR",
    name: "France",
    hreflang: "fr-FR",
    locale: "en_FR",
    title: "Halloween Costumes France | Online Delivery",
    description:
      "Shop Halloween costumes online in France with postcode serviceability and UK-warehouse preference when stock allows.",
    h1: "Halloween costumes online in France",
    keywords: ["Halloween costumes France", "Halloween costumes online France"],
    intro:
      "Halloween is growing in France for parties and kids’ events. Choose France in the header so we do not treat Europe as a single country.",
    fulfillment: "France is in the UK warehouse European service area when that warehouse is active.",
    postalLabel: "code postal",
    sections: [
      {
        heading: "Delivery in France",
        body: "Enter a French postal code before checkout. If UK stock cannot cover the item, we show international shipping instead of hiding the product without explanation.",
      },
    ],
    faqs: [
      {
        q: "Livrez-vous des costumes d’Halloween en France?",
        a: "Select France, enter your code postal, and we confirm warehouse eligibility before payment.",
      },
    ],
  },
  {
    slug: "es",
    countryCode: "ES",
    name: "Spain",
    hreflang: "es-ES",
    locale: "en_ES",
    title: "Halloween Costumes Spain | Online Delivery",
    description:
      "Buy Halloween costumes online in Spain. Confirm your código postal for HalloweenReady European fulfilment.",
    h1: "Halloween costumes online in Spain",
    keywords: ["Halloween costumes Spain", "Halloween costumes online Spain"],
    intro:
      "Spain celebrates Halloween alongside All Saints’ traditions. This page is for Spanish delivery — not a duplicate of the UK or US homepage.",
    fulfillment: "Spain is served from the UK warehouse European service area when active.",
    postalLabel: "código postal",
    sections: [
      {
        heading: "Ordering for Spain",
        body: "Use the country selector, enter a código postal, and complete checkout only after serviceability is confirmed.",
      },
    ],
    faqs: [
      {
        q: "Do you ship Halloween costumes to Spain?",
        a: "Yes when the European service area includes your código postal. The header selector lets you switch away from an auto-detected country.",
      },
    ],
  },
  {
    slug: "it",
    countryCode: "IT",
    name: "Italy",
    hreflang: "it-IT",
    locale: "en_IT",
    title: "Halloween Costumes Italy | Online Delivery",
    description:
      "Shop Halloween costumes online in Italy. Enter your CAP to check HalloweenReady European delivery.",
    h1: "Halloween costumes online in Italy",
    keywords: ["Halloween costumes Italy", "Halloween costumes online Italy"],
    intro:
      "Italian customers get country-specific fulfilment routing. Select Italy rather than a generic Europe option.",
    fulfillment: "Italy is included in the UK warehouse European service area.",
    postalLabel: "CAP",
    sections: [
      {
        heading: "Italian delivery",
        body: "Enter a CAP (postal code) to check serviceability. Checkout shipping address remains the source of truth for fulfilment.",
      },
    ],
    faqs: [
      {
        q: "Spedite costumi di Halloween in Italia?",
        a: "Sì, quando il magazzino UK copre il tuo CAP. Puoi cambiare paese dal selettore in testata.",
      },
    ],
  },
  {
    slug: "nl",
    countryCode: "NL",
    name: "Netherlands",
    hreflang: "nl-NL",
    locale: "en_NL",
    title: "Halloween Costumes Netherlands | Online Delivery",
    description:
      "Buy Halloween costumes online in the Netherlands. Check your postcode for European warehouse fulfilment.",
    h1: "Halloween costumes online in the Netherlands",
    keywords: ["Halloween costumes Netherlands", "Halloween costumes online Netherlands"],
    intro:
      "Dutch shoppers can order costumes for 31 October parties. We store NL as its own country code, not as “Europe”.",
    fulfillment: "The UK warehouse service area includes the Netherlands.",
    postalLabel: "postcode",
    sections: [
      {
        heading: "Netherlands delivery",
        body: "Enter a Dutch postcode in the header. If local/EU stock is unavailable, we disclose international shipping instead of blocking browsing.",
      },
    ],
    faqs: [
      {
        q: "Do you deliver Halloween costumes to the Netherlands?",
        a: "Yes when your postcode is serviceable. Change country any time — automatic detection is never a trap.",
      },
    ],
  },
  {
    slug: "ie",
    countryCode: "IE",
    name: "Ireland",
    hreflang: "en-IE",
    locale: "en_IE",
    title: "Halloween Costumes Ireland | Online Delivery",
    description:
      "Shop Halloween costumes online in Ireland. HalloweenReady prefers UK warehouse fulfilment for Irish eircodes when stock allows.",
    h1: "Halloween costumes online in Ireland",
    keywords: ["Halloween costumes Ireland", "Halloween costumes online Ireland"],
    intro:
      "Ireland has deep Halloween roots. Select Ireland and enter your Eircode so we can prefer the Southampton warehouse.",
    fulfillment: "Ireland is in the UK warehouse service area.",
    postalLabel: "Eircode",
    sections: [
      {
        heading: "Ordering in Ireland",
        body: "Use an Eircode at checkout. Irish delivery is routed separately from US ZIP fulfilment.",
      },
    ],
    faqs: [
      {
        q: "Can I get Halloween costumes delivered in Ireland?",
        a: "Yes. Choose Ireland, enter your Eircode, and we assign the UK warehouse when it can fulfil the order.",
      },
    ],
  },
  {
    slug: "be",
    countryCode: "BE",
    name: "Belgium",
    hreflang: "nl-BE",
    locale: "en_BE",
    title: "Halloween Costumes Belgium | Online Delivery",
    description:
      "Buy Halloween costumes online in Belgium. Confirm your postcode for HalloweenReady European fulfilment.",
    h1: "Halloween costumes online in Belgium",
    keywords: ["Halloween costumes Belgium", "Halloween costumes online Belgium"],
    intro:
      "Belgium is stored as BE, not as part of a fake EU country. Enter your postcode to check warehouse eligibility.",
    fulfillment: "Belgium is included in the UK warehouse European service area.",
    postalLabel: "postcode",
    sections: [
      {
        heading: "Belgian delivery",
        body: "Checkout uses the shipping address as the final fulfilment truth, even if geo-detection first guessed another country.",
      },
    ],
    faqs: [
      {
        q: "Do you ship Halloween costumes to Belgium?",
        a: "When the UK warehouse serves your postcode, yes. You can override auto-detected country in the header.",
      },
    ],
  },
];

export function getCountrySeoPage(slug: string): CountrySeoPage | undefined {
  return countrySeoPages.find((p) => p.slug === slug);
}

export function allCountrySeoSlugs(): string[] {
  return countrySeoPages.map((p) => p.slug);
}
