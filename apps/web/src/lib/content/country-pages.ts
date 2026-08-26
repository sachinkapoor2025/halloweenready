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
    title: "Halloween Costumes USA | Shop Online with Fast US Delivery",
    description:
      "Buy Halloween costumes, decorations, and party supplies online in the USA. HalloweenReady ships from our San Jose warehouse to all 50 states.",
    h1: "Halloween costumes online in the USA",
    keywords: [
      "Halloween costumes USA",
      "Halloween costumes online USA",
      "buy Halloween costumes in USA",
      "Halloween costumes delivered in USA",
    ],
    intro:
      "HalloweenReady is a US-based Halloween store. Browse costumes, yard decor, and party supplies, then check out with a US ZIP code so we can fulfill from our San Jose warehouse.",
    fulfillment:
      "US orders ship from 936 Bellhurst Ave, San Jose, California. Enter your ZIP code in the header to confirm serviceability before checkout.",
    postalLabel: "ZIP code",
    sections: [
      {
        heading: "What we sell for Halloween in the United States",
        body: "Shop adult and kids costumes, outdoor decorations, inflatables, party tableware, and accessories. Existing category and city pages stay at their current URLs so search equity is preserved.",
      },
      {
        heading: "Delivery across the USA",
        body: "We fulfill domestic US orders from California. Delivery times depend on the shipping method at checkout — typically a few business days to most ZIP codes.",
      },
    ],
    faqs: [
      {
        q: "Do you ship Halloween costumes across the USA?",
        a: "Yes. US orders are fulfilled from our San Jose warehouse and can be delivered to all 50 states.",
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
      "Buy Halloween costumes online in the UK. HalloweenReady prefers UK warehouse fulfilment from Southampton when stock is available.",
    h1: "Halloween costumes online in the UK",
    keywords: [
      "Halloween costumes UK",
      "Halloween costumes online UK",
      "buy Halloween costumes in the UK",
      "Halloween costumes delivered in the UK",
    ],
    intro:
      "Looking for Halloween costumes in the United Kingdom? Select United Kingdom in the header and enter your postcode. We prefer our Southampton warehouse for UK delivery whenever inventory allows.",
    fulfillment:
      "UK warehouse: 5 Exeter Road, Southampton SO18 2ED. UK support phone is stored exactly as 7710647388. Add a UK email from Admin → Markets when it is ready — no code change required.",
    postalLabel: "postcode",
    sections: [
      {
        heading: "UK spelling, sizing, and dates",
        body: "This page uses UK spelling (colour, favourite) where it helps shoppers. Halloween is still 31 October. Costume sizing follows the product size guide; UK customers should compare centimetres on the product page.",
      },
      {
        heading: "How UK fulfilment works",
        body: "If an item is in UK stock, we assign the UK warehouse. Mixed baskets may split internally between vendors or warehouses while you still see one customer order.",
      },
    ],
    faqs: [
      {
        q: "Can I buy Halloween costumes online for UK delivery?",
        a: "Yes. Choose United Kingdom, enter your postcode, and we will route eligible items through the UK warehouse when stock allows.",
      },
      {
        q: "What if a costume is only in the US warehouse?",
        a: "We show a realistic international estimate instead of promising local delivery. You can still change country at any time.",
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
      "Canada is served from our North American network, typically the US warehouse, with international transit times shown at checkout.",
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
      "Australian orders currently fulfil from our international-capable warehouse with longer transit than domestic US shipping.",
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
      "Select India in the header to prefer India warehouse inventory and INR checkout. Enter your 6-digit PIN code before placing an order.",
    fulfillment:
      "India warehouse: House No. 392, Mohalla Sodian Wala, Ferozepur City, 152002, Punjab. Phone +91 9266467887. This number is not shown to US shoppers by default.",
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
        a: "Yes. Choose India, enter your PIN code, and eligible orders fulfil from the Punjab warehouse.",
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
      "German shoppers get a dedicated country page — not a generic “Europe” URL. Select Germany and enter your postcode so we can prefer the UK warehouse for European delivery.",
    fulfillment: "European orders prefer the Southampton UK warehouse when it serves DE.",
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
        a: "Yes where the UK warehouse service area includes Germany. Enter your postcode to confirm.",
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
