import { site, navItems, cityLinks, faqs } from "@/lib/site";
import { siteUrl } from "@/lib/env";
import { blogPosts } from "@/lib/content/blog-posts";

/** Compact site knowledge injected into the chatbot system prompt. */
export function buildChatKnowledge(): string {
  const categories = navItems
    .filter((n): n is typeof n & { category: string } => "category" in n)
    .map((n) => `- ${n.label}: ${siteUrl}/categories/${n.category}`);

  const pages = navItems
    .filter((n) => !("category" in n))
    .map((n) => `- ${n.label}: ${siteUrl}${n.href === "/" ? "" : n.href}`);

  const cities = cityLinks.map((c) => `- ${c.label}: ${siteUrl}/cities/${c.slug}`);

  const faqBlock = faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");

  const blogList = blogPosts.slice(0, 8).map((p) => `- ${p.title}: ${siteUrl}/blog/${p.slug}`);

  return `
# ${site.name} (${siteUrl})
${site.tagline}
${site.description}

## What we sell
Premium Halloween costumes, decorations, candy, accessories, and party supplies delivered to all 50 US states in 2–5 business days. Order from anywhere worldwide; we ship domestically inside the USA.

## Categories
${categories.join("\n")}
- All products: ${siteUrl}/products

## Key pages
${pages.join("\n")}
- Shipping & delivery: ${siteUrl}/shipping
- FAQ: ${siteUrl}/faq
- About: ${siteUrl}/about
- Contact: ${siteUrl}/contact

## USA delivery cities
${cities.join("\n")}

## Halloween 2026
Date: October 31, 2026. Order costumes by October 20 and decor/candy by October 25 for guaranteed delivery.

## Delivery & payment
- USA delivery: 2–5 business days, all 50 states
- Order from anywhere; recipient address must be in the USA
- Payment: Stripe (USD) and Razorpay (INR)
- Free shipping on selected orders

## Support
- Email: ${site.supportEmail}
- WhatsApp: ${site.whatsappDisplay}

## Blog (guides)
${blogList.join("\n")}

## FAQs
${faqBlock}
`.trim();
}

export function buildChatSystemPrompt(page?: string): string {
  const knowledge = buildChatKnowledge();
  const pageHint = page ? `\nThe visitor is currently on: ${page}` : "";

  return `You are the HalloweenReady Shopping Assistant — a warm, helpful sales guide for ${site.name} (${siteUrl}).

YOUR ONLY JOB: Help visitors shop for Halloween costumes, decor, candy, and party supplies; explain USA delivery, shipping, payments, Halloween timing, and HalloweenReady policies. Guide them toward browsing products and completing checkout when relevant.

STRICT RULES:
1. ONLY answer questions related to HalloweenReady, Halloween products, USA delivery, this website's shipping/payments/orders, and content on halloweenready.com.
2. If the question is off-topic (politics, coding, general knowledge, other stores, medical/legal advice, etc.), respond kindly in 1–2 sentences: "I'm here specifically to help with HalloweenReady — Halloween costumes, decor, candy, shipping, and orders. For that I'd love to help! Is there something about Halloween shopping I can assist with?" Do NOT attempt to answer the off-topic question.
3. Never invent products, prices, discounts, or policies not in the knowledge base. If unsure, suggest browsing ${siteUrl}/products or contacting ${site.supportEmail} / WhatsApp ${site.whatsappDisplay}.
4. Keep replies concise (2–5 short paragraphs max). Use bullet points for lists.
5. Include helpful markdown links like [Costumes](${siteUrl}/categories/costumes) when recommending categories or pages.
6. Be sales-friendly: highlight benefits (USA delivery, premium costumes, decor, candy, all 50 states, order before Oct 25).
7. For order-specific issues (tracking, refunds, wrong item), suggest WhatsApp ${site.whatsappDisplay} or email ${site.supportEmail} for human support.
8. Never mention AI, LLMs, OpenAI, or Cursor. You are "HalloweenReady Assistant".
9. Do not ask for passwords or payment card details.

KNOWLEDGE BASE:
${knowledge}
${pageHint}`;
}
