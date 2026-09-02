export const site = {
  name: "HalloweenReady",
  domain: "halloweenready.com",
  tagline: "Halloween Decorations, Costumes & Party Supplies",
  description:
    "HalloweenReady.com — shop Halloween decorations, costumes, party supplies, and seasonal accessories. Check each product for a shipping quote to your destination.",
  supportEmail: "support@halloweenready.com",
  phone: "+1 (669) 260-3819",
  whatsapp: "16692603819",
  whatsappDisplay: "+1 (669) 260-3819",
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
      "Premium Halloween decorations, costumes, and party supplies. Confirm shipping on each product page.",
    cta: "Shop Halloween",
    pill: "Decorations · Costumes · Party Supplies",
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
    pill: "Indoor & outdoor decor",
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
    a: "Transit time depends on the product and destination. Open the product page and request a shipping quote — we do not advertise a blanket 2–5 day nationwide SLA.",
  },
  {
    q: "Do you offer outdoor Halloween decorations?",
    a: "Yes. The collection includes inflatables, yard signs, tombstones, lighting, and larger display props. Choose outdoor-rated items for yards and porches, and keep walkways clear when you set them up.",
  },
  {
    q: "Are your Halloween products suitable for parties?",
    a: "Yes. You can find tableware, banners, balloons, photo props, and themed accessories for small family gatherings or larger Halloween events.",
  },
  {
    q: "Can I decorate both indoor and outdoor spaces?",
    a: "Yes. Indoor pieces work well on tables, shelves, and walls. Outdoor pieces are meant for yards and porches — check each product page if you need weather-resistant materials.",
  },
  {
    q: "Do you sell inflatable Halloween decorations?",
    a: "Yes. We carry inflatable pumpkins, ghosts, skeletons, and other popular characters. Most include stakes and a blower unless the product page says otherwise.",
  },
  {
    q: "What are your most popular Halloween categories?",
    a: "Shoppers often start with hanging decorations, inflatables, skeletons, lighting, yard pieces, party supplies, and trick-or-treat accessories, then add costumes if they need outfits too.",
  },
  {
    q: "Does HalloweenReady ship across the USA?",
    a: "Many items can be quoted for US delivery on the product page. Availability is not universal — confirm the destination before checkout.",
  },
  {
    q: "What payment methods do you accept?",
    a: "You can pay with Stripe in USD (Visa, Mastercard, Amex) or Razorpay in INR (UPI, cards, net banking) at secure checkout.",
  },
  {
    q: "Can I trust HalloweenReady for Halloween shopping?",
    a: "Checkout is encrypted, and you can reach the team on WhatsApp or email for sizing and delivery questions. Orders ship from within the USA, and we stand behind the purchase if something arrives damaged.",
  },
  {
    q: "When should I order for Halloween 2026?",
    a: "Halloween 2026 is Saturday, October 31. Aim to order costumes by about October 20 and decorations or party supplies by October 25 so there is time for delivery and setup.",
  },
] as const;
