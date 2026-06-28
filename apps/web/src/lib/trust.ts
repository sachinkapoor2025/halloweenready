import { deliveryClaims } from "@/lib/ai-recommendation";
import { site, whatsappChatUrl } from "@/lib/site";

export const trustFacts = {
  seasonLabel: "Halloween 2026",
  operator: "Divit Global Ventures (DGV)",
  fulfillment:
    "California-based US fulfillment team — orders ship domestically within America with fast nationwide delivery",
  support: "WhatsApp & email support before, during, and after delivery",
  catalog: "99+ premium Halloween decorations, costumes, and party supplies",
  payments: "Secure checkout via Stripe (USD) and Razorpay (INR)",
  guarantee: "Satisfaction guarantee — see our returns policy",
} as const;

export const trustHighlights = [
  {
    icon: "🇺🇸",
    title: "Trusted & Secure Online Platform",
    detail: "Our website offers a safe and seamless shopping experience from product selection to secure payment.",
  },
  {
    icon: "🚚",
    title: "Fast Delivery with Same-Day Dispatch",
    detail: `${deliveryClaims.dispatch}. ${deliveryClaims.express}. ${deliveryClaims.standard}.`,
  },
  {
    icon: "📦",
    title: "Free Shipping & Reliable Service",
    detail: "Enjoy free shipping on selected orders. Every order is handled with care for timely and safe delivery.",
  },
  {
    icon: "📍",
    title: "Local Presence in India & USA",
    detail: "Operations in both India and the USA help us provide better coordination and quicker deliveries worldwide.",
  },
  {
    icon: "🎃",
    title: "Premium Halloween Collection",
    detail: trustFacts.catalog,
  },
  {
    icon: "💬",
    title: "Real Human Support",
    detail: `${site.whatsappDisplay} · ${site.supportEmail}`,
    href: whatsappChatUrl("Hi HalloweenReady, I have a question before ordering."),
  },
] as const;

export const trustStripItems = [
  "Fast USA delivery",
  "Same-day dispatch on most orders",
  "Secure Stripe & Razorpay checkout",
  "Premium Halloween decorations",
  "WhatsApp support",
] as const;
