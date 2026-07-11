export const site = {
  name: "HalloweenReady",
  domain: "halloweenready.com",
  tagline: "Halloween Decorations & Party Supplies — Fast USA Delivery",
  description:
    "HalloweenReady.com — shop Halloween decorations, costumes, party supplies, and seasonal accessories with fast delivery across the USA. Premium-quality products for haunted houses, yard displays, and Halloween parties.",
  supportEmail: "support@halloweenready.com",
  phone: "+1 6692603819",
  whatsapp: "16692603819",
  whatsappDisplay: "+1 6692603819",
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

export type CityLink = { label: string; slug: string };

/** All SEO city/state landing pages — kept in sync with seo-locations.data.json */
export const cityLinks: CityLink[] = [
  { label: "California", slug: "california" },
  { label: "New York", slug: "new-york" },
  { label: "Texas", slug: "texas" },
  { label: "Florida", slug: "florida" },
  { label: "New Jersey", slug: "new-jersey" },
  { label: "Los Angeles", slug: "los-angeles" },
  { label: "Chicago", slug: "chicago" },
  { label: "Houston", slug: "houston" },
  { label: "San Francisco", slug: "san-francisco" },
  { label: "Illinois", slug: "illinois" },
  { label: "Pennsylvania", slug: "pennsylvania" },
  { label: "Ohio", slug: "ohio" },
  { label: "Georgia", slug: "georgia" },
  { label: "Arizona", slug: "arizona" },
  { label: "Massachusetts", slug: "massachusetts" },
  { label: "Michigan", slug: "michigan" },
  { label: "North Carolina", slug: "north-carolina" },
  { label: "Virginia", slug: "virginia" },
  { label: "Washington", slug: "washington" },
  { label: "Colorado", slug: "colorado" },
  { label: "Dallas", slug: "dallas" },
  { label: "Miami", slug: "miami" },
  { label: "Atlanta", slug: "atlanta" },
  { label: "Phoenix", slug: "phoenix" },
  { label: "Boston", slug: "boston" },
  { label: "Seattle", slug: "seattle" },
  { label: "San Diego", slug: "san-diego" },
  { label: "Philadelphia", slug: "philadelphia" },
  { label: "Austin", slug: "austin" },
  { label: "Denver", slug: "denver" },
  { label: "Las Vegas", slug: "las-vegas" },
];

export const homeBanners = [
  {
    src: "/banners/bannerpage1.png",
    alt: "Halloween decorations costumes and party supplies for USA shipping — HalloweenReady",
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
    alt: "Outdoor Halloween decorations and inflatable yard decor — HalloweenReady",
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
    src: "/banners/bannerpage1.png",
    alt: "Happy Halloween customers",
  },
  {
    src: "/banners/bannerpage2.png",
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
    name: "Emily",
    rating: 5,
    timeAgo: "2 weeks ago",
    image: "/testimonials/emily.jpg",
    text: "I ordered outdoor Halloween decorations from HalloweenReady and they arrived in Texas within a week. The inflatables and yard signs looked amazing — our whole block stopped to take photos.",
  },
  {
    name: "Sarah",
    rating: 5,
    timeAgo: "3 weeks ago",
    image: "/testimonials/sarah.jpg",
    text: "The hanging ghost decorations and LED pumpkins were a huge hit in our Ohio neighborhood. Great prices, fast USA shipping, and everything matched the photos online.",
  },
  {
    name: "Jessica",
    rating: 5,
    timeAgo: "1 month ago",
    image: "/testimonials/jessica.jpg",
    text: "HalloweenReady made decorating our California home so easy. The products were exactly as described and helped us create the perfect haunted house for trick-or-treaters.",
  },
  {
    name: "Amanda",
    rating: 5,
    timeAgo: "1 month ago",
    image: "/testimonials/amanda.jpg",
    text: "Excellent customer service and fantastic Halloween products. My family in Florida loved the party supplies and we received so many compliments from guests.",
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
