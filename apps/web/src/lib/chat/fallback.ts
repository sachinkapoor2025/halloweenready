import { site, navItems, faqs, whatsappChatUrl } from "@/lib/site";
import { siteUrl } from "@/lib/env";

const OFF_TOPIC_REPLY = `I'm here specifically to help with HalloweenReady — Halloween costumes, decor, candy, shipping, and orders. Is there something about Halloween shopping I can help with?

Browse our catalog: [All Products](${siteUrl}/products) · [Chat on WhatsApp](${whatsappChatUrl()})`;

const SITE_KEYWORDS =
  /\b(halloween|costume|decor|decorations|candy|treat|party|accessories|usa|us\b|shipping|deliver|order|payment|stripe|razorpay|product|categor|california|texas|new york|florida|checkout|cart|price|track|support|halloweenready|october|trick|treat|spooky|mask|pumpkin)\b/i;

function categoriesReply(): string {
  const links = navItems
    .filter((n): n is typeof n & { category: string } => "category" in n)
    .map((n) => `- [${n.label}](${siteUrl}/categories/${n.category})`)
    .join("\n");

  return `We sell Halloween costumes, decor, candy, accessories, and party supplies for USA delivery:\n\n${links}\n- [All Products](${siteUrl}/products)\n\nShop early for the best selection before October 31!`;
}

function deliveryReply(): string {
  return `Shipping depends on the product and destination. Open a product page and request a quote — storefront quotes are available for the US, Canada, UK, Australia, and Germany.\n\nWe do not claim a local warehouse or a blanket 2–5 day nationwide SLA.\n\nMore details: [Shipping & Delivery](${siteUrl}/shipping)`;
}

function halloweenReply(): string {
  return `Halloween 2026 is on October 31, 2026.\n\nOrder earlier in October if you need transit buffer, and confirm the product-page shipping quote.\n\nStart browsing: [Costumes](${siteUrl}/categories/costumesandaccessories) · [Decorations](${siteUrl}/categories/home-decoration) · [Halloween guide](${siteUrl}/halloween-guide)`;
}

function orderWorldwideReply(): string {
  return `Yes — customers can order from many countries. Confirm shipping on the product page. Quoted destinations today are the US, Canada, UK, Australia, and Germany.\n\nReady to shop? [Browse all Halloween products](${siteUrl}/products)`;
}

function paymentReply(): string {
  return `We accept secure online checkout via:\n- Stripe (USD)\n- Razorpay (INR)\n\nPrices are shown in USD or INR at checkout. We never store card details.\n\nQuestions about a specific order? [Chat on WhatsApp](${whatsappChatUrl()}) or email ${site.supportEmail}.`;
}

function greetingReply(): string {
  return `Welcome to HalloweenReady! I can help you find costumes, decor, candy, explain USA delivery, or answer questions about shipping and payment.\n\nPopular picks:\n- [Costumes](${siteUrl}/categories/costumes)\n- [Decorations](${siteUrl}/categories/decorations)\n- [Candy & Treats](${siteUrl}/categories/candy-treats)\n\nWhat would you like to know?`;
}

function findFaqMatch(query: string): string | null {
  const q = query.toLowerCase();
  for (const faq of faqs) {
    const faqWords = faq.q.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
    const matches = faqWords.filter((w) => q.includes(w)).length;
    if (matches >= 2) return faq.a;
  }
  return null;
}

/** Rule-based replies when OPENAI_API_KEY is not configured. */
export function fallbackChatReply(userMessage: string): string {
  const q = userMessage.trim().toLowerCase();

  if (!q) return greetingReply();

  if (!SITE_KEYWORDS.test(q)) {
    return OFF_TOPIC_REPLY;
  }

  if (/type|sell|categor|collection|what.*costume|what.*decor|offer|product/.test(q)) {
    return categoriesReply();
  }

  if (/deliver|shipping|how long|when.*arriv|business day|state|california|texas|new york/.test(q)) {
    return deliveryReply();
  }

  if (/halloween|october|2026|when.*order|deadline|oct 31/.test(q)) {
    return halloweenReply();
  }

  if (/india|uk|canada|australia|abroad|international|worldwide|outside/.test(q)) {
    return orderWorldwideReply();
  }

  if (/payment|pay|stripe|razorpay|usd|inr|card|checkout/.test(q)) {
    return paymentReply();
  }

  if (/hello|hi\b|hey|help|start/.test(q) && q.length < 30) {
    return greetingReply();
  }

  if (/contact|support|email|whatsapp|phone|call|track|order status|refund|cancel/.test(q)) {
    return `For order-specific help (tracking, changes, refunds), our team responds fastest on [WhatsApp](${whatsappChatUrl()}) or email ${site.supportEmail}.\n\nGeneral info: [FAQ](${siteUrl}/faq) · [Contact Us](${siteUrl}/contact)`;
  }

  if (/costume|outfit|dress up/.test(q)) {
    return `Browse our [Costumes](${siteUrl}/categories/costumes) collection — adult, teen, and kids sizes. Add [Accessories](${siteUrl}/categories/accessories) to complete your look. USA delivery in 2–5 days.`;
  }

  if (/decor|inflatable|fog|pumpkin|yard|haunt/.test(q)) {
    return `Transform your home with our [Decorations](${siteUrl}/categories/decorations) — inflatables, LED pumpkins, fog machines, and more. Delivered across all 50 US states.`;
  }

  if (/candy|treat|trick or treat|chocolate|bulk/.test(q)) {
    return `Stock up with our [Candy & Treats](${siteUrl}/categories/candy-treats) — bulk assortments and pre-filled treat bags for Halloween night.\n\n[Shop Candy](${siteUrl}/categories/candy-treats)`;
  }

  const faqAnswer = findFaqMatch(q);
  if (faqAnswer) {
    return `${faqAnswer}\n\nBrowse: [All Products](${siteUrl}/products) · [FAQ](${siteUrl}/faq)`;
  }

  return `Thanks for your question! HalloweenReady delivers costumes, decor, and candy to all 50 US states in 2–5 business days.\n\n- [Shop all products](${siteUrl}/products)\n- [Shipping info](${siteUrl}/shipping)\n- [FAQ](${siteUrl}/faq)\n\nFor order help: [WhatsApp](${whatsappChatUrl()}) or ${site.supportEmail}`;
}
