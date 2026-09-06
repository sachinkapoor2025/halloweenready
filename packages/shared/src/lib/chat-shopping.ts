import type {
  AssistantProduct,
  ChatBlock,
  ChatIntent,
  ChatQuickAction,
  ShoppingState,
} from "../schemas/chat";
import type { Product } from "../schemas/product";
import { inferProductAudience, inferProductTheme } from "./homepage-ranking";
import { isProductAvailableForCountry } from "./shipping-availability";

export const CATEGORY_SLUGS = {
  costumes: "costumesandaccessories",
  decorations: "home-decoration",
  party: "partysupplier",
  toys: "toysandnovelty",
  jewelry: "jewellryandaccessories",
  wearable: "lifestyleandwearable",
  paper: "printedandpapercrafts",
  candles: "candlesandfragrance",
  hampers: "halloween-hampers",
} as const;

const CATEGORY_KEYWORDS: Array<{ slug: string; label: string; pattern: RegExp }> = [
  { slug: CATEGORY_SLUGS.costumes, label: "costumes", pattern: /\b(costume|cosplay|outfit|dress up|witch|vampire|zombie|skeleton|superhero|princess)\b/i },
  { slug: CATEGORY_SLUGS.decorations, label: "decorations", pattern: /\b(decor|decoration|inflatable|yard|porch|tombstone|pumpkin|lighting|lights|outdoor|indoor|haunted house)\b/i },
  { slug: CATEGORY_SLUGS.party, label: "party supplies", pattern: /\b(party|balloon|banner|tableware|cups|plates|favors|games)\b/i },
  { slug: CATEGORY_SLUGS.toys, label: "toys", pattern: /\b(toy|novelty|prank|gag)\b/i },
  { slug: CATEGORY_SLUGS.jewelry, label: "accessories", pattern: /\b(wig|mask|makeup|gloves|jewelry|accessory|accessories|hat)\b/i },
  { slug: CATEGORY_SLUGS.candles, label: "candles", pattern: /\b(candle|fragrance|scent)\b/i },
  { slug: CATEGORY_SLUGS.hampers, label: "hampers", pattern: /\b(hamper|gift basket|boo basket|gift kit)\b/i },
];

const THEME_PATTERNS: Array<{ value: string; pattern: RegExp }> = [
  { value: "witch", pattern: /\bwitch(es)?\b/i },
  { value: "vampire", pattern: /\bvampire|dracula\b/i },
  { value: "skeleton", pattern: /\bskeleton|skull\b/i },
  { value: "ghost", pattern: /\bghost|ghoul\b/i },
  { value: "zombie", pattern: /\bzombie\b/i },
  { value: "pumpkin", pattern: /\bpumpkin|jack[- ]?o[- ]?lantern\b/i },
  { value: "devil", pattern: /\bdevil|demon\b/i },
  { value: "pirate", pattern: /\bpirate\b/i },
  { value: "superhero", pattern: /\bsuperhero|spiderman|batman|wonder woman\b/i },
  { value: "princess", pattern: /\bprincess\b/i },
  { value: "clown", pattern: /\bclown\b/i },
  { value: "cat", pattern: /\bblack cat|cat costume\b/i },
  { value: "dragon", pattern: /\bdragon\b/i },
];

const AUDIENCE_PATTERNS: Array<{ value: string; pattern: RegExp }> = [
  { value: "women", pattern: /\b(women|woman|female|ladies|lady|girls?'?s? adult)\b/i },
  { value: "men", pattern: /\b(men|man|male|guys?|boys?'?s? adult)\b/i },
  { value: "kids", pattern: /\b(kids?|child|children|toddler|boy|girl|8 year|daughter|son)\b/i },
  { value: "couples", pattern: /\b(couples?|boyfriend|girlfriend|husband|wife)\b/i },
  { value: "family", pattern: /\b(family|families|group of four)\b/i },
  { value: "pets", pattern: /\b(pet|dog|cat costume for)\b/i },
];

const STYLE_PATTERNS: Array<{ value: string; pattern: RegExp }> = [
  { value: "scary", pattern: /\b(scary|spooky|horror|creepy|terrifying)\b/i },
  { value: "sexy", pattern: /\b(sexy|seductive)\b/i },
  { value: "gothic", pattern: /\b(gothic|goth)\b/i },
  { value: "funny", pattern: /\b(funny|hilarious|humor|joke|comedy)\b/i },
  { value: "cute", pattern: /\b(cute|adorable|kawaii)\b/i },
  { value: "classic", pattern: /\b(classic|traditional)\b/i },
  { value: "family-friendly", pattern: /\b(family[- ]friendly|not too scary|kid friendly)\b/i },
];

const OCCASION_PATTERNS: Array<{ value: string; pattern: RegExp }> = [
  { value: "halloween-party", pattern: /\b(halloween party|party)\b/i },
  { value: "trick-or-treat", pattern: /\b(trick[- ]or[- ]treat)\b/i },
  { value: "school", pattern: /\b(school|classroom)\b/i },
  { value: "office", pattern: /\b(office|work)\b/i },
  { value: "yard", pattern: /\b(front yard|yard|porch|outdoor)\b/i },
];

const CITY_COUNTRY: Array<{ pattern: RegExp; city: string; country: string; region?: string }> = [
  { pattern: /\blondon\b/i, city: "London", country: "GB", region: "England" },
  { pattern: /\bmanchester\b/i, city: "Manchester", country: "GB" },
  { pattern: /\bsouthampton\b/i, city: "Southampton", country: "GB" },
  { pattern: /\bcalgary\b/i, city: "Calgary", country: "CA", region: "Alberta" },
  { pattern: /\btoronto\b/i, city: "Toronto", country: "CA", region: "Ontario" },
  { pattern: /\bvancouver\b/i, city: "Vancouver", country: "CA" },
  { pattern: /\bsydney\b/i, city: "Sydney", country: "AU" },
  { pattern: /\bmelbourne\b/i, city: "Melbourne", country: "AU" },
  { pattern: /\bdubai\b/i, city: "Dubai", country: "AE" },
  { pattern: /\bberlin\b/i, city: "Berlin", country: "DE" },
  { pattern: /\bnew york|nyc\b/i, city: "New York", country: "US" },
  { pattern: /\blos angeles|la\b/i, city: "Los Angeles", country: "US" },
  { pattern: /\bdelhi|mumbai|bangalore|india\b/i, city: "", country: "IN" },
];

function firstMatch<T extends { value: string; pattern: RegExp }>(text: string, list: T[]): string | undefined {
  return list.find((item) => item.pattern.test(text))?.value;
}

function parseBudget(text: string): { budgetMin?: number; budgetMax?: number } {
  const under = text.match(/\b(?:under|below|less than|max(?:imum)?)\s*\$?\s*(\d{1,4})\b/i);
  if (under) return { budgetMax: Number(under[1]) };
  const around = text.match(/\b(?:around|about)\s*\$?\s*(\d{1,4})\b/i);
  if (around) {
    const n = Number(around[1]);
    return { budgetMin: Math.max(0, n - 10), budgetMax: n + 10 };
  }
  const range = text.match(/\$?\s*(\d{1,4})\s*[-–to]+\s*\$?\s*(\d{1,4})/i);
  if (range) return { budgetMin: Number(range[1]), budgetMax: Number(range[2]) };
  return {};
}

function parsePartySize(text: string): number | undefined {
  const m = text.match(/\b(?:for|of)\s+(\d{1,3})\s+(?:people|guests|kids|children|persons)\b/i)
    ?? text.match(/\b(\d{1,3})\s+(?:people|guests)\b/i);
  if (!m) return undefined;
  const n = Number(m[1]);
  return n >= 2 && n <= 500 ? n : undefined;
}

export function classifyChatIntent(text: string): ChatIntent {
  const q = text.toLowerCase();
  if (/start over|new search|start again|reset/.test(q)) return "start_over";
  if (/surprise me|dealer.?s choice|show me anything/.test(q)) return "surprise";
  if (/compar|which (one|is better)|vs\b/.test(q)) return "product_comparison";
  if (/where is my order|track|order status|cancel (my )?order/.test(q)) return "order_query";
  if (/return policy|refund|exchange/.test(q)) return "return_query";
  if (/razorpay|stripe|pay|upi|card/.test(q) && !/costume|decor/.test(q)) return "payment_query";
  if (/ship|deliver|arrive|reach|transit|london|calgary|uk\b|canada|australia/.test(q) && /can|will|does|to\b|in\b/.test(q)) {
    return "shipping_query";
  }
  if (/when is halloween|why (do people )?celebrat|tradition|history of halloween|question about halloween/.test(q)) return "general_halloween";
  if (/hosting a .{0,20}party|plan(ning)? a (halloween )?party|party for \d/.test(q)) return "party_planner";
  if (/size|small|medium|large|\bxl\b|\bsm\b/.test(q) && /costume|fit|wear/.test(q)) return "size_query";
  if (/help|support|whatsapp|contact|human/.test(q) && !/find|buy|costume|decor/.test(q)) return "support";
  if (/decorat(e|ing|ion)|costume|buy|need|want|show me|looking for|find/.test(q)) return "product_search";
  if (/category|browse|all (halloween )?(decor|costume|party)/.test(q)) return "category_search";
  if (/idea|what should i wear|how (do i|to) decorat/.test(q)) return "halloween_ideas";
  if (/hello|hi\b|hey|thanks/.test(q) && q.length < 24) return "smalltalk";
  return "product_search";
}

export function mergeShoppingState(prev: ShoppingState, text: string): ShoppingState {
  const next: ShoppingState = { ...prev };
  const cat = CATEGORY_KEYWORDS.find((c) => c.pattern.test(text));
  if (cat) {
    next.category = cat.label;
    next.categorySlug = cat.slug;
  }
  const theme = firstMatch(text, THEME_PATTERNS);
  if (theme) next.theme = theme;
  const audience = firstMatch(text, AUDIENCE_PATTERNS);
  if (audience) {
    next.audience = audience;
    if (audience === "women" || audience === "men") next.gender = audience;
    if (audience === "kids") next.ageGroup = "kids";
  }
  const style = firstMatch(text, STYLE_PATTERNS);
  if (style) next.style = style;
  const occasion = firstMatch(text, OCCASION_PATTERNS);
  if (occasion) next.occasion = occasion;
  const budget = parseBudget(text);
  if (budget.budgetMax != null) next.budgetMax = budget.budgetMax;
  if (budget.budgetMin != null) next.budgetMin = budget.budgetMin;
  if (/\b(cheaper|less expensive|lower budget|under budget)\b/i.test(text)) {
    if (next.budgetMax != null) next.budgetMax = Math.max(8, Math.round(next.budgetMax * 0.7));
    else next.budgetMax = 30;
  }
  if (/\b(more expensive|upgrade|premium)\b/i.test(text) && next.budgetMax != null) {
    next.budgetMin = next.budgetMax;
    delete next.budgetMax;
  }
  const partySize = parsePartySize(text);
  if (partySize) next.partySize = partySize;
  if (/\boutdoor|yard|porch\b/i.test(text)) next.indoorOutdoor = "outdoor";
  else if (/\bindoor|inside|table\b/i.test(text)) next.indoorOutdoor = "indoor";
  const loc = CITY_COUNTRY.find((c) => c.pattern.test(text));
  if (loc) {
    next.country = loc.country;
    if (loc.city) next.city = loc.city;
    if (loc.region) next.region = loc.region;
  }
  if (/\buk\b|united kingdom|britain/i.test(text)) next.country = "GB";
  if (/\busa\b|united states|\bus\b/i.test(text)) next.country = "US";
  if (/\bcanada\b/i.test(text)) next.country = "CA";
  if (/\baustralia\b/i.test(text)) next.country = "AU";

  const cleaned = text
    .replace(/[?!.,]/g, " ")
    .replace(/\b(i|want|need|to|buy|a|an|the|for|my|me|please|looking|show|find|something)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (cleaned.length >= 3 && cleaned.length <= 80) next.query = cleaned;
  return next;
}

export function buildSearchQuery(state: ShoppingState): string {
  const parts = [state.theme, state.style, state.audience, state.indoorOutdoor, state.category, state.query]
    .filter(Boolean)
    .map((s) => String(s));
  const unique = [...new Set(parts.map((p) => p.toLowerCase()))];
  return unique.join(" ").trim() || "halloween";
}

export function viewAllHref(state: ShoppingState): string {
  if (state.categorySlug && !state.theme && !state.query) return `/categories/${state.categorySlug}`;
  const q = buildSearchQuery(state);
  const params = new URLSearchParams();
  if (q && q !== "halloween") params.set("search", q);
  if (state.categorySlug) params.set("category", state.categorySlug);
  const qs = params.toString();
  return qs ? `/products?${qs}` : "/products";
}

export function missingShoppingSlots(state: ShoppingState, intent: ChatIntent): string[] {
  if (intent === "surprise" || intent === "general_halloween" || intent === "support") return [];
  if (intent === "shipping_query" || intent === "order_query" || intent === "return_query") return [];
  if (intent === "party_planner" && !state.partySize) return ["partySize"];
  const missing: string[] = [];
  const isCostume = state.categorySlug === CATEGORY_SLUGS.costumes || /\bcostume\b/i.test(state.query ?? "") || Boolean(state.theme);
  const isDecor = state.categorySlug === CATEGORY_SLUGS.decorations || state.indoorOutdoor === "outdoor";
  if (!state.categorySlug && !state.theme && !state.query) missing.push("category");
  if (isCostume && !state.audience) missing.push("audience");
  if ((isCostume || isDecor) && !state.style && !state.theme) missing.push("style");
  return missing;
}

export function slotQuickActions(slot: string): ChatQuickAction[] {
  if (slot === "category") {
    return [
      { id: "cat-costumes", label: "🎭 Costumes", message: "I'm looking for costumes" },
      { id: "cat-decor", label: "👻 Decorations", message: "I need Halloween decorations" },
      { id: "cat-party", label: "🎃 Party supplies", message: "I need party supplies" },
      { id: "cat-couples", label: "💑 Couple costumes", message: "I need couples costumes" },
      { id: "cat-family", label: "👨‍👩‍👧 Family ideas", message: "I need family Halloween ideas" },
    ];
  }
  if (slot === "audience") {
    return [
      { id: "aud-women", label: "Women", message: "For women" },
      { id: "aud-men", label: "Men", message: "For men" },
      { id: "aud-kids", label: "Kids", message: "For kids" },
      { id: "aud-couples", label: "Couples", message: "For couples" },
      { id: "aud-unsure", label: "Not sure", message: "Not sure, surprise me" },
    ];
  }
  if (slot === "style") {
    return [
      { id: "st-scary", label: "Scary", message: "Scary" },
      { id: "st-gothic", label: "Gothic", message: "Gothic" },
      { id: "st-classic", label: "Classic", message: "Classic" },
      { id: "st-funny", label: "Funny", message: "Funny" },
      { id: "st-surprise", label: "Surprise me", message: "Surprise me" },
    ];
  }
  if (slot === "partySize") {
    return [
      { id: "ps-8", label: "Under 10", message: "About 8 guests" },
      { id: "ps-20", label: "10–25", message: "About 20 guests" },
      { id: "ps-40", label: "25+", message: "About 40 guests" },
    ];
  }
  return [];
}

export function scoreProductForState(product: Product, state: ShoppingState, country?: string): number {
  const hay = `${product.name} ${product.tags?.join(" ") ?? ""} ${product.description ?? ""}`.toLowerCase();
  const inferredTheme = inferProductTheme(product.name, product.tags);
  if (state.theme) {
    const theme = state.theme.toLowerCase();
    if (!hay.includes(theme) && inferredTheme !== state.theme) return 0;
  }
  let score = 1;
  if (state.theme && hay.includes(state.theme.toLowerCase())) score += 8;
  if (state.style && hay.includes(state.style.toLowerCase())) score += 4;
  if (state.audience) {
    const aud = inferProductAudience(product.name, product.tags);
    if (aud === state.audience || (state.audience === "kids" && aud === "kids")) score += 5;
    else if (aud !== "all") score -= 2;
  }
  if (state.categorySlug && product.categorySlug === state.categorySlug) score += 3;
  if (state.indoorOutdoor === "outdoor" && /outdoor|yard|inflatable|porch/.test(hay)) score += 4;
  if (state.query) {
    for (const word of state.query.toLowerCase().split(/\s+/).filter((w) => w.length > 2)) {
      if (hay.includes(word)) score += 2;
    }
  }
  if (state.budgetMax != null && product.price <= state.budgetMax) score += 3;
  if (state.budgetMax != null && product.price > state.budgetMax) score -= 6;
  if (country) {
    const avail = isProductAvailableForCountry(product, country);
    if (avail === "unavailable") score -= 20;
    if (avail === "available") score += 1;
  }
  if ((product.inventory ?? 0) <= 0) score -= 30;
  if ((product.unitsSold ?? 0) > 20) score += 1;
  if (state.theme && inferredTheme === state.theme) score += 2;
  return score;
}

export function toAssistantProduct(product: Product): AssistantProduct {
  const sold = product.unitsSold ?? 0;
  let badge: string | undefined;
  if (sold >= 80) badge = "Best Seller";
  else if (sold >= 25) badge = "Popular";
  const available = (product.inventory ?? 0) > 0 && product.published !== false;
  return {
    slug: product.slug,
    name: product.name,
    image: product.images?.[0],
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    currency: product.currency ?? "USD",
    categorySlug: product.categorySlug,
    url: `/products/${product.slug}`,
    inventory: product.inventory,
    available,
    badge,
    variants: product.cjVariants
      ?.filter((v) => (v.inventory ?? 1) > 0)
      .slice(0, 8)
      .map((v) => ({ vid: v.vid, name: v.name || v.key, inventory: v.inventory })),
  };
}

export function welcomeQuickActions(): ChatQuickAction[] {
  return [
    { id: "q-gifts", label: "🎁 Find a gift", message: "I want to find a gift" },
    { id: "q-home", label: "🏠 Home & living", message: "I need home and living products" },
    { id: "q-party", label: "🎉 Party supplies", message: "I'm planning a party" },
    { id: "q-fashion", label: "👗 Fashion", message: "Show me fashion and accessories" },
    { id: "q-toys", label: "🧸 Toys & novelty", message: "Show me toys and novelty gifts" },
    { id: "q-find", label: "🔍 Find a product", message: "Help me find a product" },
    { id: "q-ship", label: "📦 Shipping", message: "How does shipping work?" },
    { id: "q-ask", label: "❓ Ask anything", message: "I have a question about OccasionFun" },
  ];
}

export function invitationQuickActions(): ChatQuickAction[] {
  return [
    { id: "inv-gift", label: "Find a Gift", message: "I want to find a gift" },
    { id: "inv-home", label: "Home & Living", message: "I need home and living products" },
    { id: "inv-party", label: "Plan a Party", message: "I'm planning a party" },
    { id: "inv-ask", label: "Ask Me Anything", message: "I have a question about OccasionFun" },
  ];
}

export function productPageQuickActions(name: string): ChatQuickAction[] {
  return [
    { id: "p-similar", label: "Find similar", message: `Find similar products to ${name}` },
    { id: "p-accessories", label: "Matching accessories", message: `Find matching accessories for ${name}` },
    { id: "p-cheaper", label: "Something cheaper", message: "Show me something cheaper" },
    { id: "p-ship", label: "Check shipping", message: "Can this ship to my location?" },
  ];
}

export function textBlock(text: string): ChatBlock {
  return { type: "text", text };
}

export function actionsBlock(actions: ChatQuickAction[]): ChatBlock {
  return { type: "quick_actions", actions };
}
