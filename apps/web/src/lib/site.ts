export const site = {
  name: "OccasionFun",
  domain: "occasionfun.com",
  tagline: "Gifts, party supplies, and everyday products for every occasion",
  description:
    "OccasionFun.com — shop gifts, home goods, fashion, toys, and party supplies. We deliver across 200 countries in 5–9 days. Check each product for a shipping quote.",
  supportEmail: "support@occasionfun.com",
  phone: "+1 (669) 260-3819",
  /** Customer WhatsApp — India store number (do not display the digits on the storefront). */
  whatsapp: "919266467887",
  whatsappDisplay: "+91 9266467887",
  logoSrc: "/logo.png",
  primaryColor: "#0f3d48",
  navBlue: "#e11d48",
  accentColor: "#f59e0b",
} as const;

export const STORE_LOCATIONS = [
  {
    id: "uk",
    flag: "🇬🇧",
    country: "United Kingdom",
    lines: ["5 Exeter Road", "Southampton, Hampshire", "SO18 2ED", "United Kingdom"],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=5+Exeter+Road%2C+Southampton+SO18+2ED",
  },
  {
    id: "in",
    flag: "🇮🇳",
    country: "India",
    lines: ["House No. 392", "Mohalla Sodian Wala", "Ferozepur City, Punjab 152002", "India"],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=House+No.+392%2C+Mohalla+Sodian+Wala%2C+Ferozepur+City%2C+Punjab+152002",
  },
] as const;

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop all", href: "/products" },
  { label: "Home & living", href: "/categories/home-decoration", category: "home-decoration" },
  { label: "Fashion", href: "/categories/costumesandaccessories", category: "costumesandaccessories" },
  { label: "Party supplies", href: "/categories/partysupplier", category: "partysupplier" },
  { label: "Toys & gifts", href: "/categories/toysandnovelty", category: "toysandnovelty" },
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
    alt: "Gifts, party supplies, and home products — OccasionFun",
    href: "/products",
    eyebrow: "SHIP TO 200 COUNTRIES · 5–9 DAYS",
    title: "Make every occasion",
    titleAccent: "Fun",
    description:
      "Gifts, home goods, fashion, toys, and party supplies. We deliver across 200 countries in 5–9 days — confirm shipping on each product page.",
    cta: "Shop the catalog",
    pill: "Gifts · Home · Fashion · Party",
  },
  {
    src: "/banners/bannerpage2.png",
    alt: "Party supplies and celebration products — OccasionFun",
    href: "/categories/partysupplier",
    eyebrow: "EVERY CELEBRATION",
    title: "Host, gift, and celebrate with",
    titleAccent: "one store",
    description:
      "Balloons, tableware, décor, and surprise-ready gifts for birthdays, holidays, and everyday moments.",
    cta: "Shop party supplies",
    pill: "Birthdays · Holidays · Everyday",
  },
] as const;

export const promoBanners = [
  {
    src: "/banners/bannerpage1.png",
    alt: "Happy OccasionFun customers",
  },
  {
    src: "/banners/bannerpage2.png",
    alt: "Celebration and gifts",
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

export const categoryOrder = ["halloween-hampers", ...homeCategoryOrder] as const;

export function orderCategories<T extends { slug: string }>(categories: readonly T[]): T[] {
  const rank = new Map<string, number>(homeCategoryOrder.map((slug, index) => [slug, index]));
  return [...categories].sort((a, b) => (rank.get(a.slug) ?? 99) - (rank.get(b.slug) ?? 99));
}

export function whatsappChatUrl(message = "Hi OccasionFun, I need help with my order."): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const testimonials = [
  {
    name: "Emily",
    rating: 5,
    timeAgo: "2 weeks ago",
    image: "/testimonials/emily.jpg",
    text: "I ordered gifts from OccasionFun and they arrived in Texas quickly. Packaging was festive and the products matched the photos.",
  },
  {
    name: "Sarah",
    rating: 5,
    timeAgo: "3 weeks ago",
    image: "/testimonials/sarah.jpg",
    text: "Party supplies and home décor for our Ohio gathering were a hit. Clear shipping quote and easy checkout.",
  },
  {
    name: "Jessica",
    rating: 5,
    timeAgo: "1 month ago",
    image: "/testimonials/jessica.jpg",
    text: "OccasionFun made gifting to family overseas simple. Tracking was clear and support replied on WhatsApp the same day.",
  },
  {
    name: "Amanda",
    rating: 5,
    timeAgo: "1 month ago",
    image: "/testimonials/amanda.jpg",
    text: "Great mix of everyday products and celebration pieces. My family in Florida loved the order.",
  },
] as const;

export const faqs = [
  {
    q: "Where does OccasionFun ship?",
    a: "We deliver across 200 countries with 5–9 days delivery. Choose your country at checkout and confirm the quote on each product page.",
  },
  {
    q: "What do you sell?",
    a: "Gifts, home & living, fashion and accessories, toys, party supplies, and other CJ Dropshipping catalog products — not only seasonal items.",
  },
  {
    q: "How long does delivery take?",
    a: "Most orders arrive in 5–9 days after dispatch. Exact timing depends on destination and the product’s shipping quote.",
  },
  {
    q: "Do you offer free shipping?",
    a: "Carts under $49 pay a stepped shipping fee; $49+ ships free where the quote allows. The checkout total matches the payment page.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Stripe in USD (Visa, Mastercard, Amex) or Razorpay in INR (UPI, cards, net banking). Prices can display in other currencies.",
  },
  {
    q: "Can I trust OccasionFun?",
    a: "Checkout is encrypted. Reach the team on WhatsApp or email if something arrives damaged — we stand behind the purchase.",
  },
] as const;
