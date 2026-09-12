import { site, navItems, faqs, whatsappChatUrl } from "@/lib/site";
import { siteUrl } from "@/lib/env";

const OFF_TOPIC_REPLY = `I'm here specifically to help with HalloweenReady — Halloween costumes, decor, candy, shipping, and orders. Is there something about Halloween shopping I can help with?

Browse our catalog: [All Products](${siteUrl}/products) · [Chat on WhatsApp](${whatsappChatUrl()})`;

const SITE_KEYWORDS =
  /\b(halloween|costume|decor|decorations|candy|treat|party|accessories|usa|uk|canada|australia|india|uae|us\b|shipping|deliver|order|payment|stripe|razorpay|product|categor|california|texas|new york|florida|checkout|cart|price|track|support|halloweenready|october|trick|treat|spooky|mask|pumpkin)\b/i;

function categoriesReply(): string {
  const links = navItems
    .filter((n): n is typeof n & { category: string } => "category" in n)
    .map((n) => `- [${n.label}](${siteUrl}/categories/${n.category})`)
    .join("\n");

  return `We sell Halloween costumes, decor, candy, accessories, and party supplies for international shoppers:\n\n${links}\n- [All Products](${siteUrl}/products)\n\nDelivering in 5–7 days. Shop early for the best selection before October 31!`;
}

function deliveryReply(): string {
  return `Delivering in 5–7 days. Confirm shipping on the product page. Free shipping on orders of $49 or more.\n\nWe do not claim a local US warehouse, same-day dispatch, or guaranteed October 31 arrival.\n\nMore details: [Shipping & Delivery](${siteUrl}/shipping)`;
}

function halloweenReply(): string {
  return `Halloween 2026 is on October 31, 2026.\n\nDelivering in 5–7 days — order earlier in October if you need buffer. We do not guarantee arrival before October 31.\n\nStart browsing: [Costumes](${siteUrl}/categories/costumesandaccessories) · [Decorations](${siteUrl}/categories/home-decoration) · [Halloween guide](${siteUrl}/halloween-guide)`;
}

function orderWorldwideReply(): string {
  return `Yes — HalloweenReady is a global store. Choose your country at checkout. Country pages include the [USA](${siteUrl}/countries/us), [UK](${siteUrl}/countries/uk), [Canada](${siteUrl}/countries/ca), [Australia](${siteUrl}/countries/au), [India](${siteUrl}/countries/in), and [UAE](${siteUrl}/countries/ae).\n\nDelivering in 5–7 days. Confirm shipping on the product page.\n\nReady to shop? [Browse all Halloween products](${siteUrl}/products)`;
}

function paymentReply(): string {
  return `We accept secure online checkout via:\n- Stripe (USD)\n- Razorpay (INR)\n\nPrices can display in local currency. Checkout is charged in USD or INR. We never store card details.\n\nQuestions about a specific order? [Chat on WhatsApp](${whatsappChatUrl()}) or email ${site.supportEmail}.`;
}

function greetingReply(): string {
  return `Welcome to HalloweenReady! I can help you find costumes, decor, and party supplies, or answer questions about shipping and payment.\n\nPopular picks:\n- [Costumes](${siteUrl}/categories/costumesandaccessories)\n- [Decorations](${siteUrl}/categories/home-decoration)\n- [Party supplies](${siteUrl}/categories/partysupplier)\n\nWhat would you like to know?`;
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

  if (/india|uk|canada|australia|uae|dubai|abroad|international|worldwide|outside/.test(q)) {
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
    return `Browse our [Costumes](${siteUrl}/categories/costumesandaccessories) collection — adult, teen, and kids sizes. Add [Jewelry & Accessories](${siteUrl}/categories/jewellryandaccessories) to complete your look. Delivering in 5–7 days.`;
  }

  if (/decor|inflatable|fog|pumpkin|yard|haunt/.test(q)) {
    return `Transform your home with our [Decorations](${siteUrl}/categories/home-decoration) — inflatables, LED pumpkins, fog machines, and more. Delivering in 5–7 days.`;
  }

  if (/candy|treat|trick or treat|chocolate|bulk/.test(q)) {
    return `Stock up with our [Party Supplies](${siteUrl}/categories/partysupplier) — bulk assortments and treat bags for Halloween night.\n\n[Shop party supplies](${siteUrl}/categories/partysupplier)`;
  }

  const faqAnswer = findFaqMatch(q);
  if (faqAnswer) {
    return `${faqAnswer}\n\nBrowse: [All Products](${siteUrl}/products) · [FAQ](${siteUrl}/faq)`;
  }

  return `Thanks for your question! HalloweenReady is a global Halloween store. Delivering in 5–7 days.\n\n- [Shop all products](${siteUrl}/products)\n- [Shipping info](${siteUrl}/shipping)\n- [FAQ](${siteUrl}/faq)\n\nFor order help: [WhatsApp](${whatsappChatUrl()}) or ${site.supportEmail}`;
}
