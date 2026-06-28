export const site = {
  name: "HalloweenReady",
  domain: "halloweenready.com",
  tagline: "Halloween Decorations & Party Supplies — Fast USA Delivery",
  description:
    "HalloweenReady.com — shop Halloween decorations, costumes, party supplies, and seasonal accessories with fast delivery across the USA. Premium-quality products for haunted houses, yard displays, and Halloween parties.",
  supportEmail: "support@halloweenready.com",
  phone: "+1 (555) 019-BOO",
  whatsapp: "15550190266",
  whatsappDisplay: "+1 (555) 019-BOO",
  logoSrc: "/logo.png",
  primaryColor: "#1a0a2e",
  navBlue: "#ff6b00",
  accentColor: "#e11d48",
} as const;

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Home Decorations", href: "/categories/home-decoration", category: "home-decoration" },
  { label: "Costumes", href: "/categories/costumesandaccessories", category: "costumesandaccessories" },
  { label: "Party Supplies", href: "/categories/partysupplier", category: "partysupplier" },
  { label: "Toys & Novelty", href: "/categories/toysandnovelty", category: "toysandnovelty" },
  { label: "Halloween Guide", href: "/halloween-guide" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const cityLinks = [
  { label: "California", slug: "california" },
  { label: "New York", slug: "new-york" },
  { label: "Texas", slug: "texas" },
  { label: "Florida", slug: "florida" },
  { label: "New Jersey", slug: "new-jersey" },
  { label: "Los Angeles", slug: "los-angeles" },
  { label: "Chicago", slug: "chicago" },
  { label: "Houston", slug: "houston" },
  { label: "San Francisco", slug: "san-francisco" },
] as const;

export const homeBanners = [
  {
    src: "/banners/bannerpage1.png",
    alt: "Celebrate Halloween in Style — HalloweenReady USA delivery",
    href: "/products",
    eyebrow: "HALLOWEEN 2026 · USA SHIPPING",
    title: "Celebrate Halloween in",
    titleAccent: "Style",
    description:
      "Premium Halloween decorations, costumes, and party supplies with fast shipping across all 50 states.",
    cta: "Shop Halloween",
    pill: "Decorations · Costumes · Party Supplies · Fast USA delivery",
  },
  {
    src: "/banners/bannerpage2.png",
    alt: "Halloween decorations and party supplies — HalloweenReady",
    href: "/categories/home-decoration",
    eyebrow: "HAUNT YOUR HOME",
    title: "Transform Your Space Into a",
    titleAccent: "Spooky Wonderland",
    description:
      "Inflatable ghosts, LED pumpkins, skeletons, and yard decor — everything for the ultimate Halloween display.",
    cta: "Shop Decorations",
    pill: "Indoor & outdoor decor · Same-day dispatch on most orders",
  },
] as const;

export const promoBanners = [
  {
    src: "https://halloweenready.com/wp-content/uploads/2026/03/revire-1.webp",
    alt: "Happy Halloween customers",
  },
  {
    src: "https://halloweenready.com/wp-content/uploads/2026/03/coustomer-3-768x1152-1.webp",
    alt: "Halloween party celebration",
  },
] as const;

export const homeCategoryOrder = [
  "home-decoration",
  "costumesandaccessories",
  "partysupplier",
  "toysandnovelty",
  "candlesandfragrance",
  "jewellryandaccessories",
  "lifestyleandwearable",
  "printedandpapercrafts",
] as const;

export const categoryOrder = homeCategoryOrder;

export function orderCategories<T extends { slug: string }>(categories: readonly T[]): T[] {
  const rank = new Map<string, number>(homeCategoryOrder.map((slug, index) => [slug, index]));
  return [...categories].sort((a, b) => (rank.get(a.slug) ?? 99) - (rank.get(b.slug) ?? 99));
}

export function whatsappChatUrl(message = "Hi HalloweenReady, I need help with my Halloween order."): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const testimonials = [
  {
    name: "Neha",
    rating: 4,
    timeAgo: "2 weeks ago",
    image: "https://halloweenready.com/wp-content/uploads/2026/03/coustomer-1.webp",
    text: "I ordered several outdoor Halloween decorations from HalloweenReady.com and was impressed by the quality. Everything arrived quickly and looked amazing in my yard.",
  },
  {
    name: "Anjali",
    rating: 4,
    timeAgo: "3 weeks ago",
    image: "https://halloweenready.com/wp-content/uploads/2026/03/coustomer-4.webp",
    text: "The hanging ghost decorations and inflatable pumpkins were a huge hit with the neighborhood. Great prices and fast delivery.",
  },
  {
    name: "Pooja",
    rating: 3,
    timeAgo: "1 month ago",
    image: "https://halloweenready.com/wp-content/uploads/2026/03/revire-1.webp",
    text: "HalloweenReady.com made decorating so easy. The products were exactly as described and helped us create the perfect haunted house.",
  },
  {
    name: "Meera",
    rating: 4,
    timeAgo: "1 month ago",
    image: "https://halloweenready.com/wp-content/uploads/2026/03/coustomer-3-768x1152-1.webp",
    text: "Excellent customer service and fantastic Halloween products. My family loved the decorations, and we received so many compliments.",
  },
] as const;

export const faqs = [
  {
    q: "How quickly do you ship Halloween decorations?",
    a: "Most orders are processed quickly and shipped within standard business timeframes. Delivery times vary based on location and shipping method selected.",
  },
  {
    q: "Do you offer outdoor Halloween decorations?",
    a: "Yes, we offer a wide range of outdoor decorations including inflatables, yard signs, tombstones, lighting, and large display props.",
  },
  {
    q: "Are your Halloween products suitable for parties?",
    a: "Absolutely. We offer party supplies, tableware, decorations, banners, balloons, and themed accessories for Halloween events of all sizes.",
  },
  {
    q: "Can I decorate both indoor and outdoor spaces?",
    a: "Yes. Our collection includes products specifically designed for both indoor and outdoor Halloween decorating.",
  },
  {
    q: "Do you sell inflatable Halloween decorations?",
    a: "Yes. We carry a variety of inflatable pumpkins, ghosts, skeletons, and other popular Halloween characters.",
  },
  {
    q: "What are your most popular Halloween categories?",
    a: "Our best-selling categories include hanging decorations, inflatables, skeletons, lighting, yard décor, party supplies, and trick-or-treat accessories.",
  },
  {
    q: "Does HalloweenReady ship across the USA?",
    a: "Yes. We deliver Halloween orders to all 50 US states with fast domestic fulfillment.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Stripe (USD — Visa, Mastercard, Amex) and Razorpay (INR — UPI, cards, netbanking) for secure online checkout.",
  },
  {
    q: "Can I trust HalloweenReady for Halloween shopping?",
    a: "HalloweenReady offers secure checkout, WhatsApp and email support, domestic USA shipping, and a satisfaction guarantee.",
  },
  {
    q: "When should I order for Halloween 2026?",
    a: "Halloween 2026 is October 31, 2026. Order decor and party supplies by October 25 for guaranteed pre-Halloween delivery.",
  },
] as const;
