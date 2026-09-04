import { deliveryClaims } from "@/lib/ai-recommendation";
import { site, whatsappChatUrl } from "@/lib/site";

export const trustFacts = {
  seasonLabel: "Halloween 2026",
  operator: "Divit Global Ventures (DGV)",
  fulfillment: "Delivering in 5–7 days",
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
    detail: "Free shipping on orders of $49 or more. Smaller carts use a stepped shipping fee.",
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
    detail: `WhatsApp · ${site.supportEmail}`,
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
