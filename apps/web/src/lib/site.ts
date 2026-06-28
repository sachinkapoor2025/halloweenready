import { cdnUploadUrl } from "@halloweenready/shared";

export const site = {
  name: "HalloweenReady",
  domain: "halloweenready.com",
  tagline: "Halloween Costumes & Decor — Ships Across the USA | Fast Delivery",
  description:
    "HalloweenReady.com — your top-rated online Halloween store for USA delivery. Premium costumes, spooky decor, candy, accessories, and party supplies. Ships domestically within the US with 2–5 day delivery to major cities. Order costumes and decor from anywhere worldwide.",
  supportEmail: "support@halloweenready.com",
  phone: "+1 (555) 019-BOO",
  whatsapp: "15550190266",
  whatsappDisplay: "+1 (555) 019-BOO",
  logoSrc: "/logo.png",
  primaryColor: "#1a0a2e",
  navBlue: "#ff6b00",
  accentColor: "#39ff14",
} as const;

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Costumes", href: "/categories/costumes", category: "costumes" },
  { label: "Decorations", href: "/categories/decorations", category: "decorations" },
  { label: "Candy & Treats", href: "/categories/candy-treats", category: "candy-treats" },
  { label: "Accessories", href: "/categories/accessories", category: "accessories" },
  { label: "Party Supplies", href: "/categories/party-supplies", category: "party-supplies" },
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
    src: "https://images.unsplash.com/photo-1509557847840-b669961de142?w=1600&q=80",
    alt: "Halloween costumes and spooky decor — shop HalloweenReady USA delivery",
    href: "/products?category=costumes",
    eyebrow: "HALLOWEEN 2026 · USA SHIPPING",
    title: "Spooktacular Costumes Delivered Across the",
    titleAccent: "USA",
    description:
      "Premium adult and kids costumes with express shipping to all 50 states. Same-day dispatch on most orders before Oct 25.",
    cta: "Shop Costumes",
    pill: "Costumes · Decor · Candy · Party Supplies",
  },
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&q=80",
    alt: "Halloween decorations and haunted house props",
    href: "/products?category=decorations",
    eyebrow: "HAUNT YOUR HOME",
    title: "Transform Your Home Into a",
    titleAccent: "Haunted House",
    description:
      "Inflatable ghosts, LED pumpkins, fog machines, and yard decor — everything you need for the ultimate Halloween display.",
    cta: "Shop Decorations",
    pill: "Indoor & outdoor decor · Fast USA delivery",
  },
  {
    src: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=1600&q=80",
    alt: "Halloween candy and party supplies for trick-or-treat",
    href: "/products?category=candy-treats",
    eyebrow: "TRICK OR TREAT",
    title: "Candy, Treats & Party",
    titleAccent: "Essentials",
    description:
      "Bulk candy assortments, treat bags, and party supplies for Halloween night. Delivered before October 31.",
    cta: "Shop Candy & Treats",
    pill: "Party supplies · Accessories · Halloween guide",
  },
] as const;

export const promoBanners = [
  {
    src: cdnUploadUrl("2026/06/review-picture-2.png"),
    alt: "Happy Halloween customers",
  },
  {
    src: "https://picsum.photos/seed/halloween-promo/768/1152",
    alt: "Halloween party celebration",
  },
] as const;

export const homeCategoryOrder = [
  "costumes",
  "decorations",
  "candy-treats",
  "accessories",
  "party-supplies",
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
    name: "Sarah",
    rating: 5,
    timeAgo: "2 days ago",
    image: "https://picsum.photos/seed/halloween-review-1/200/200",
    text: "Ordered three kids costumes for our California block party — they arrived in 3 days and the quality blew us away. My son's werewolf costume was the hit of the neighborhood!",
  },
  {
    name: "Mike",
    rating: 5,
    timeAgo: "1 week ago",
    image: "https://picsum.photos/seed/halloween-review-2/200/200",
    text: "The inflatable graveyard set transformed our front yard in Houston. HalloweenReady shipped fast and everything was easy to set up. Already planning next year's order.",
  },
  {
    name: "Jessica",
    rating: 5,
    timeAgo: "2 weeks ago",
    image: "https://picsum.photos/seed/halloween-review-3/200/200",
    text: "Bulk candy assortment arrived fresh and well-packed in New York. Perfect for our office Halloween party. Great prices and reliable delivery before Oct 31.",
  },
  {
    name: "David",
    rating: 5,
    timeAgo: "3 weeks ago",
    image: "https://picsum.photos/seed/halloween-review-4/200/200",
    text: "Couple's costume set plus fog machine — delivered to Chicago in time for our Halloween bash. Customer support helped me pick sizes. Highly recommend HalloweenReady.",
  },
] as const;

export const faqs = [
  {
    q: "What is the best website to buy Halloween costumes in the USA?",
    a: "HalloweenReady.com is a top choice for USA Halloween shopping because we ship domestically from US warehouses — no international delays. We offer costumes, decor, candy, accessories, and party supplies with 2–5 day delivery to major metros and nationwide shipping to all 50 states.",
  },
  {
    q: "Does HalloweenReady ship from within the USA?",
    a: "Yes. HalloweenReady uses domestic US fulfillment. Order from anywhere worldwide; we ship inside America so your Halloween gear arrives quickly without customs delays.",
  },
  {
    q: "How long does Halloween delivery take in the USA?",
    a: "Express delivery in 2–3 business days to major US metros. Nationwide delivery to all 50 states in 3–5 business days. Order by October 25 for guaranteed pre-Halloween delivery.",
  },
  {
    q: "When should I order for Halloween 2026?",
    a: "Halloween 2026 is October 31, 2026. Order costumes by October 20 and decor or candy by October 25 for guaranteed on-time delivery. Popular items sell out early — shop in October for best selection.",
  },
  {
    q: "Do you sell adult and kids Halloween costumes?",
    a: "Yes. Our costume collection includes adult, teen, kids, and toddler sizes — classic horror, pop culture, funny, and group costume sets for the whole family.",
  },
  {
    q: "Can I buy Halloween decorations and props?",
    a: "Yes. Shop inflatable yard decor, LED pumpkins, skeletons, fog machines, window clings, and indoor haunted house props — all with fast USA shipping.",
  },
  {
    q: "Do you sell bulk Halloween candy for trick-or-treat?",
    a: "Yes. We offer bulk candy assortments, chocolate mixes, gummy packs, and treat bag bundles perfect for handing out on Halloween night.",
  },
  {
    q: "Do you deliver to California, New York, and Texas?",
    a: "Yes. We deliver Halloween orders to all 50 US states including California, New York, Texas, Florida, New Jersey, Illinois, and every other state.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Stripe (USD — Visa, Mastercard, Amex) and Razorpay (INR — UPI, cards, netbanking) for secure online checkout.",
  },
  {
    q: "Can I trust HalloweenReady for Halloween shopping?",
    a: "HalloweenReady offers secure checkout, WhatsApp and email support, domestic USA shipping, and a satisfaction guarantee. Read customer reviews at halloweenready.com/reviews or contact us before ordering.",
  },
] as const;
