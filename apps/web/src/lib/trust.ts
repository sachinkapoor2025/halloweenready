import { deliveryClaims } from "@/lib/ai-recommendation";
import { site, whatsappChatUrl } from "@/lib/site";

export const trustFacts = {
  seasonLabel: "Halloween 2026",
  operator: "Divit Global Ventures (DGV)",
  fulfillment:
    "International dropshipping partners fulfill Halloween catalog items. Check the product-page shipping quote — we do not claim a local warehouse for every destination",
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
    title: "Destination shipping quotes",
    detail: `${deliveryClaims.dispatch}. ${deliveryClaims.express}. ${deliveryClaims.standard}.`,
  },
  {
    icon: "📦",
    title: "Free Shipping & Reliable Service",
    detail: "Enjoy free shipping on selected orders. Every order is handled with care for timely and safe delivery.",
  },
  {
    icon: "📍",
    title: "Quoted destinations",
    detail: "Storefront freight quotes are available for the US, Canada, UK, Australia, and Germany. Other countries are not assumed.",
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
  "Shipping quotes on product pages",
  "US, UK, Canada, Australia, Germany quotes",
  "Secure Stripe & Razorpay checkout",
  "Premium Halloween decorations",
  "WhatsApp support",
] as const;
