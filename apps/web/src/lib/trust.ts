import { deliveryClaims } from "@/lib/ai-recommendation";
import { site, whatsappChatUrl } from "@/lib/site";

export const trustFacts = {
  seasonLabel: "Every occasion",
  operator: "Divit Global Ventures (DGV)",
  fulfillment: "Delivering in 5–9 days",
  support: "WhatsApp & email support before, during, and after delivery",
  catalog: "Gifts, home goods, fashion, toys, party supplies, and more",
  payments: "Secure checkout via Stripe (USD) and Razorpay (INR)",
  guarantee: "Satisfaction guarantee — see our returns policy",
} as const;

export const trustHighlights = [
  {
    icon: "🌍",
    title: "Trusted & Secure Online Platform",
    detail: "Our website offers a safe and seamless shopping experience from product selection to secure payment.",
  },
  {
    icon: "🚚",
    title: "Destination shipping quotes",
    detail: `${deliveryClaims.dispatch}. ${deliveryClaims.express}. ${deliveryClaims.standard}.`,
  },
  {
    icon: "📦",
    title: "Free Shipping & Reliable Service",
    detail: "Free shipping on orders of $49 or more. Smaller carts use a stepped shipping fee.",
  },
  {
    icon: "📍",
    title: "Ships to 200 countries",
    detail: "We deliver across 200 countries with 5–9 days delivery. Confirm shipping on each product page.",
  },
  {
    icon: "🎁",
    title: "Full product catalog",
    detail: trustFacts.catalog,
  },
  {
    icon: "💬",
    title: "Real Human Support",
    detail: `WhatsApp · ${site.supportEmail}`,
    href: whatsappChatUrl("Hi OccasionFun, I have a question before ordering."),
  },
] as const;

export const trustStripItems = [
  "Delivering in 5–9 days",
  "200 countries worldwide",
  "Secure Stripe & Razorpay checkout",
  "Gifts, home, fashion & party",
  "WhatsApp support",
] as const;
