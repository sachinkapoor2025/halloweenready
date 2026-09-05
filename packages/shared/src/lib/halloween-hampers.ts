import {
  DEFAULT_PRODUCT_INVENTORY,
  HALLOWEEN_HAMPERS_CATEGORY_SLUG,
  VENDOR_HALLOWEENREADY,
} from "../constants";
import type { CartItemAddon } from "../schemas/cart";
import type { Product } from "../schemas/product";
import { cartAddonSignature } from "./product-addons";

export const HAMPER_TAG = "halloween-hamper";

/** Individual product value inside a hamper may exceed the bundle price by this ratio. */
export const HAMPER_CONTENTS_VALUE_HEADROOM = 0.07;

export type HamperLine = {
  slug: string;
  name: string;
  image?: string;
  price: number;
};

/** Site banners / logos — never use these as hamper gallery photos. */
export function isPromotionalHamperImage(url?: string | null): boolean {
  if (!url?.trim()) return true;
  const u = url.trim().toLowerCase();
  return (
    u.includes("/banners/") ||
    u.includes("bannerpage") ||
    u.includes("product-fallback") ||
    u.endsWith("/logo.png") ||
    u.includes("/logo-options/")
  );
}

export function firstProductPhoto(images?: Array<string | undefined> | null): string | undefined {
  return (images ?? []).find((url) => url && !isPromotionalHamperImage(url));
}

/** Main photo is the first included product; remaining unique product photos follow. */
export function galleryImagesForHamper(
  contents: Array<{ image?: string | null }> | null | undefined,
  fallback: string[] = []
): string[] {
  const unique: string[] = [];
  for (const url of [
    ...(contents ?? []).map((c) => c.image?.trim()),
    ...fallback.map((u) => u.trim()),
  ]) {
    if (!url || isPromotionalHamperImage(url) || unique.includes(url)) continue;
    unique.push(url);
  }
  return unique.slice(0, 8);
}

export function withHamperProductPhotos<
  T extends {
    hamperContents?: Array<{ slug: string; name: string; image?: string; price?: number }> | null;
    hamperAddons?: Array<{ slug: string; name: string; image?: string; price?: number }> | null;
    images?: string[];
  },
>(product: T, photoBySlug: Map<string, string>): T {
  const patch = <L extends { slug: string; image?: string }>(line: L): L => {
    const fromCatalog = photoBySlug.get(line.slug);
    const image = fromCatalog || (!isPromotionalHamperImage(line.image) ? line.image : undefined);
    return { ...line, image };
  };
  const hamperContents = (product.hamperContents ?? []).map(patch);
  const hamperAddons = (product.hamperAddons ?? []).map(patch);
  return {
    ...product,
    hamperContents,
    hamperAddons,
    images: galleryImagesForHamper(hamperContents, product.images),
  };
}

export type HamperCustomization = {
  excludedSlugs: string[];
  replacements: Array<{ fromSlug: string; toSlug: string }>;
  extraSlugs: string[];
};

const PUMPKIN_LAMP =
  "https://cf.cjdropshipping.com/0ceac233-1580-45f5-b2b2-f9c660947db1.jpg";
const BALLOON =
  "https://cf.cjdropshipping.com/5f6274b8-f967-45c4-84e9-c0e1303fc01e.jpg";
const ZOMBIE =
  "https://cf.cjdropshipping.com/7cb98850-7bdb-4d21-9222-3b97d6658578.jpg";
const PRINCESS =
  "https://cf.cjdropshipping.com/ac2e33c9-442f-409c-971e-a48d082f1eda.png";
const BANNER =
  "https://www.halloweenready.com/banners/bannerpage1.png";
const YARD =
  "https://www.halloweenready.com/banners/bannerpage2.png";

function line(slug: string, name: string, price: number, image: string): HamperLine {
  return { slug, name, price, image };
}

/** Shared swap/extra pool — family-safe fillers already on the live catalog. */
export const HAMPER_ADDON_POOL: HamperLine[] = [
  line("witch-pumpkin-halloween-wreath-decoration-26082406", "Witch pumpkin wreath", 12.2, YARD),
  line("halloween-party-decoration-balloon-combo-skull-pumpkin-25082306", "Skull pumpkin balloon combo", 7.86, BALLOON),
  line("halloween-pumpkin-lantern-decorations-children-halloween-hal-20877429", "Kids pumpkin lantern", 6.68, PUMPKIN_LAMP),
  line("halloween-pumpkin-pattern-cute-funny-embroidered-low-cut-socks-25090409", "Pumpkin embroidered socks", 5.62, BANNER),
  line("halloween-portable-glowing-pumpkin-bucket-14363020", "Glowing pumpkin bucket", 4.18, PUMPKIN_LAMP),
  line("creative-halloween-pumpkin-scented-candle-26061307", "Pumpkin scented candle", 3.8, PUMPKIN_LAMP),
  line("halloween-party-festival-couplet-background-banner-24092508", "Halloween party banner", 3.52, BANNER),
  line("pumpkin-throw-pillow-halloween-plush-toy-15653239", "Pumpkin plush pillow", 2.88, BANNER),
  line("halloween-flannel-doormat-holiday-atmosphere-decoration-25112502", "Halloween flannel doormat", 2.38, BANNER),
  line("led-halloween-pumpkin-spider-bat-skull-string-light-lamp-home-garden-party-outdoor-hallowe", "LED pumpkin string lights", 2.18, PUMPKIN_LAMP),
  line("halloween-little-ghost-aromatherapy-candle-16837594", "Little ghost candle", 1.96, PUMPKIN_LAMP),
  line("luminous-cartoon-halloween-3d-stickers-24080703", "Glow Halloween stickers", 1.34, BANNER),
  line("halloween-pumpkin-bat-holiday-printing-flannel-blanket-17015630", "Pumpkin bat flannel blanket", 6.32, BANNER),
  line("halloween-pumpkin-lamp-rgbww-color-remote-control-candle-light-2507220", "RGB pumpkin lamp", 21.56, PUMPKIN_LAMP),
];

type HamperDef = {
  slug: string;
  name: string;
  price: number;
  tagline: string;
  description: string;
  contents: HamperLine[];
  images: string[];
};

function hamper(
  slug: string,
  name: string,
  price: number,
  tagline: string,
  description: string,
  contents: HamperLine[],
  extraImages: string[] = []
): HamperDef {
  return {
    slug,
    name,
    price,
    tagline,
    description,
    contents,
    images: galleryImagesForHamper(contents, extraImages),
  };
}

export const HALLOWEEN_HAMPER_DEFS: HamperDef[] = [
  hamper(
    "youve-been-bood-hamper",
    "You've Been Boo'd Hamper",
    49,
    "Doorstep gift — wreath, lantern, socks, bucket, and party extras.",
    "A ready-to-give Halloween boo basket: wreath, glow bucket, lantern, socks, candle, balloons, and cozy extras. Free shipping. Swap any included piece for an add-on at the same hamper price, or add extras.",
    [
      line("witch-pumpkin-halloween-wreath-decoration-26082406", "Witch pumpkin wreath", 12.2, YARD),
      line("halloween-party-decoration-balloon-combo-skull-pumpkin-25082306", "Skull pumpkin balloon combo", 7.86, BALLOON),
      line("halloween-pumpkin-lantern-decorations-children-halloween-hal-20877429", "Kids pumpkin lantern", 6.68, PUMPKIN_LAMP),
      line("halloween-pumpkin-pattern-cute-funny-embroidered-low-cut-socks-25090409", "Pumpkin embroidered socks", 5.62, BANNER),
      line("halloween-portable-glowing-pumpkin-bucket-14363020", "Glowing pumpkin bucket", 4.18, PUMPKIN_LAMP),
      line("creative-halloween-pumpkin-scented-candle-26061307", "Pumpkin scented candle", 3.8, PUMPKIN_LAMP),
      line("halloween-party-festival-couplet-background-banner-24092508", "Halloween party banner", 3.52, BANNER),
      line("pumpkin-throw-pillow-halloween-plush-toy-15653239", "Pumpkin plush pillow", 2.88, BANNER),
      line("halloween-flannel-doormat-holiday-atmosphere-decoration-25112502", "Halloween flannel doormat", 2.38, BANNER),
      line("led-halloween-pumpkin-spider-bat-skull-string-light-lamp-home-garden-party-outdoor-hallowe", "LED pumpkin string lights", 2.18, PUMPKIN_LAMP),
    ]
  ),
  hamper(
    "trick-or-treat-night-hamper",
    "Trick-or-Treat Night Hamper",
    79,
    "Kids cloak, princess extras, lantern, pail, and glow toys.",
    "Everything for trick-or-treat night: cloak, princess dress and accessories, lantern, glow bucket, balloons, and activity extras. Swap included pieces at the same $79 price.",
    [
      line("halloween-party-costume-kids-cloak-pumpkin-ghost-monster-cape-26082005", "Kids pumpkin ghost cloak", 17.32, PRINCESS),
      line("korean-version-of-the-girl-princess-dress-tutu-skirt-childrens-dress-childrens-day-costume", "Girls princess tutu dress", 12.28, PRINCESS),
      line("16-piece-princess-accessories-set-with-red-hair-jewelry-for-theme-parties-and-costumes-par", "16-piece princess accessories", 11.98, PRINCESS),
      line("halloween-party-decoration-balloon-combo-skull-pumpkin-25082306", "Skull pumpkin balloon combo", 7.86, BALLOON),
      line("halloween-decorations-childrens-portable-pumpkin-lantern-hal-20877183", "Portable pumpkin lantern", 6.78, PUMPKIN_LAMP),
      line("childrens-halloween-terry-mid-calf-socks-17036129", "Kids Halloween socks", 5.7, BANNER),
      line("halloween-portable-glowing-pumpkin-bucket-14363020", "Glowing pumpkin bucket", 4.18, PUMPKIN_LAMP),
      line("halloween-party-festival-couplet-background-banner-24092508", "Halloween party banner", 3.52, BANNER),
      line("led-halloween-pumpkin-spider-bat-skull-string-light-lamp-home-garden-party-outdoor-hallowe", "LED pumpkin string lights", 2.18, PUMPKIN_LAMP),
      line("new-set-cartoon-halloween-funny-fluorescent-luminous-tattoo-stickers-14176894", "Glow tattoos", 1.9, BANNER),
      line("halloween-elf-pumpkin-devil-horn-headband-funny-cute-headband-15847169", "Horn headband", 1.9, BANNER),
      line("luminous-cartoon-halloween-3d-stickers-24080703", "Glow Halloween stickers", 1.34, BANNER),
      line("halloween-funny-pumpkin-squeezing-toy-vent-decompression-toy-17101826", "Pumpkin squeeze toy", 1.12, BANNER),
      line("halloween-pumpkin-cart-glow-in-the-dark-necklace-b2dc63f6", "Glow necklace", 1.12, BANNER),
    ]
  ),
  hamper(
    "apartment-haunt-hamper",
    "Apartment Haunt Hamper",
    99,
    "Indoor décor, carving kit, lamp, and renter-friendly textiles.",
    "A complete indoor haunt for apartments: carving kit, ghost rug, RGB pumpkin lamp, blanket, wreath, and candles. Customize with add-ons — hamper price stays $99.",
    [
      line("13pcs-halloween-pumpkin-carving-kit-stainless-steel-carving-kit-pumpki", "13-pc pumpkin carving kit", 25.98, PUMPKIN_LAMP),
      line("halloween-cute-ghost-carpet-living-room-17358373", "Cute ghost living-room carpet", 22.88, BANNER),
      line("halloween-pumpkin-lamp-rgbww-color-remote-control-candle-light-2507220", "RGB pumpkin lamp", 21.56, PUMPKIN_LAMP),
      line("halloween-pumpkin-bat-holiday-printing-flannel-blanket-17015630", "Pumpkin bat flannel blanket", 6.32, BANNER),
      line("halloween-autumn-maple-leaf-wreath-pumpkin-berry-door-hanging-14354349", "Maple pumpkin wreath", 5.1, YARD),
      line("halloween-witch-black-cat-led-lights-3192ede8", "Witch black cat LED", 4.06, BANNER),
      line("creative-halloween-pumpkin-scented-candle-26061307", "Pumpkin scented candle", 3.8, PUMPKIN_LAMP),
      line("3d-holiday-halloween-horror-witch-window-cover-family-party-decoration-witch-zombie-ghosts", "Witch window cover", 2.72, BANNER),
      line("halloween-flannel-doormat-holiday-atmosphere-decoration-25112502", "Halloween flannel doormat", 2.38, BANNER),
      line("led-halloween-pumpkin-spider-bat-skull-string-light-lamp-home-garden-party-outdoor-hallowe", "LED pumpkin string lights", 2.18, PUMPKIN_LAMP),
      line("halloween-orange-ghost-linen-pillowcase-14303924", "Ghost pillowcase", 1.7, BANNER),
      line("halloween-little-ghost-aromatherapy-candle-16837594", "Little ghost candle", 1.96, PUMPKIN_LAMP),
    ]
  ),
  hamper(
    "party-in-a-box-hamper",
    "Party in a Box Hamper",
    129,
    "Balloons, backdrop, inflatable, hanging ghost, and table extras.",
    "Host 8–12 people without hunting SKUs: inflatable, hanging mummy, wreath, balloon kits, banners, and table décor. Swap pieces at the same $129 price.",
    [
      line("halloween-pumpkin-inflatable-model-ed4d9b82", "Pumpkin inflatable", 23.46, YARD),
      line("halloween-pumpkin-lamp-rgbww-color-remote-control-candle-light-2507220", "RGB pumpkin lamp", 21.56, PUMPKIN_LAMP),
      line("halloween-inverted-mummy-induction-electric-luminous-hanging-ghost-250", "Luminous hanging mummy", 20.9, BANNER),
      line("witch-pumpkin-halloween-wreath-decoration-26082406", "Witch pumpkin wreath", 12.2, YARD),
      line("halloween-party-decoration-balloon-combo-skull-pumpkin-25082306", "Skull pumpkin balloon combo", 7.86, BALLOON),
      line("latex-halloween-irregular-balloon-chain-ghost-festival-theme-package-1", "Balloon chain pack", 7.1, BALLOON),
      line("halloween-decorations-accessories-horror-grim-reaper-hanging-ghost-28ab0345", "Grim reaper hanging ghost", 6.98, BANNER),
      line("halloween-3d-banner-horror-background-fabric-24110806", "3D horror backdrop banner", 6.04, BANNER),
      line("halloween-banner-couplet-cartoon-printing-party-decoration-supplies-16996081", "Cartoon party banner", 3.5, BANNER),
      line("halloween-party-festival-couplet-background-banner-24092508", "Festival couplet banner", 3.52, BANNER),
      line("halloween-set-ghost-festival-bar-party-aluminum-film-balloon-15728855", "Foil balloon set", 3.48, BALLOON),
      line("wooden-halloween-witch-napkin-holder-kitchen-restaurant-decoration-17656477", "Witch napkin holder", 3.88, BANNER),
      line("creative-halloween-pumpkin-scented-candle-26061307", "Pumpkin scented candle", 3.8, PUMPKIN_LAMP),
      line("led-halloween-pumpkin-spider-bat-skull-string-light-lamp-home-garden-party-outdoor-hallowe", "LED pumpkin string lights", 2.18, PUMPKIN_LAMP),
      line("halloween-decoration-props-skull-manual-light-creative-ornaments-17068462", "Skull light ornament", 1.84, BANNER),
      line("halloween-paper-glasses-scene-decoration-funny-25083111", "Party photo glasses", 1.38, BANNER),
    ]
  ),
  hamper(
    "witch-night-hamper",
    "Witch Night Hamper",
    149,
    "Adult witch dress, socks, wreath, lamp, and spell-night extras.",
    "The #1 adult Halloween look in one box: costume dress, over-knee socks, wreath, RGB lamp, candles, and witchy extras. Size is one-size / listed on the dress. Swap add-ons at the same $149 price.",
    [
      line("womens-european-and-american-halloween-costume-dress-15673416", "Women's Halloween costume dress", 52.1, PRINCESS),
      line("halloween-pumpkin-lamp-rgbww-color-remote-control-candle-light-2507220", "RGB pumpkin lamp", 21.56, PUMPKIN_LAMP),
      line("witch-pumpkin-halloween-wreath-decoration-26082406", "Witch pumpkin wreath", 12.2, YARD),
      line("halloween-pumpkin-print-over-the-knee-socks-13922739", "Pumpkin over-knee socks", 10, BANNER),
      line("halloween-pumpkin-bat-holiday-printing-flannel-blanket-17015630", "Pumpkin bat flannel blanket", 6.32, BANNER),
      line("halloween-horror-witch-hand-seat-single-wick-candlestick-14293703", "Witch-hand candlestick", 5.84, PUMPKIN_LAMP),
      line("halloween-pumpkin-pattern-cute-funny-embroidered-low-cut-socks-25090409", "Pumpkin embroidered socks", 5.62, BANNER),
      line("halloween-witch-decoration-trio-resin-craft-14358691", "Witch trio resin décor", 5.1, BANNER),
      line("halloween-witch-black-cat-led-lights-3192ede8", "Witch black cat LED", 4.06, BANNER),
      line("kormesic-witch-bath-bomb-20899563", "Witch bath bomb", 3.94, BANNER),
      line("creative-halloween-pumpkin-scented-candle-26061307", "Pumpkin scented candle", 3.8, PUMPKIN_LAMP),
      line("3d-holiday-halloween-horror-witch-window-cover-family-party-decoration-witch-zombie-ghosts", "Witch window cover", 2.72, BANNER),
      line("halloween-letter-spider-witch-hat-headband-masquerade-atmosphere-props-bat-ghost-hair-acce", "Witch hat headband", 1.72, BANNER),
      line("halloween-witch-role-play-ghost-festival-carnival-necklace-17032933", "Witch necklace", 1.64, BANNER),
      line("halloween-witch-gift-canvas-makeup-bag-25110503", "Witch makeup bag", 1.6, BANNER),
      line("halloween-little-ghost-aromatherapy-candle-16837594", "Little ghost candle", 1.96, PUMPKIN_LAMP),
    ]
  ),
  hamper(
    "movie-night-boo-box-hamper",
    "Movie-Night Boo Box Hamper",
    179,
    "Witch comforter, hoodie, lamp, socks, and cozy October extras.",
    "Curl-up October in a box: 8-piece witch comforter, hoodie, plush pillow, socks, RGB lamp, and candles. The hamper price stays $179 when you swap included items for add-ons.",
    [
      line("8-pieces-halloween-comforter-set-witch-pattern-bed-in-a-bag-bedding-wi", "8-piece witch comforter set", 74.06, BANNER),
      line("halloween-pumpkin-lamp-rgbww-color-remote-control-candle-light-2507220", "RGB pumpkin lamp", 21.56, PUMPKIN_LAMP),
      line("plush-little-ghost-pillow-cushion-halloween-photo-props-17388280", "Plush ghost pillow", 13.72, BANNER),
      line("halloween-skull-horror-full-print-unisex-hoodie-15590460", "Skull print hoodie", 13.26, ZOMBIE),
      line("witch-pumpkin-halloween-wreath-decoration-26082406", "Witch pumpkin wreath", 12.2, YARD),
      line("halloween-pumpkin-print-over-the-knee-socks-13922739", "Pumpkin over-knee socks", 10, BANNER),
      line("halloween-pumpkin-bat-holiday-printing-flannel-blanket-17015630", "Pumpkin bat flannel blanket", 6.32, BANNER),
      line("halloween-pumpkin-pattern-cute-funny-embroidered-low-cut-socks-25090409", "Pumpkin embroidered socks", 5.62, BANNER),
      line("halloween-funny-spider-ghost-scary-flat-indoor-house-shoes-for-women-men-soft-plush-cozy-h", "Spider ghost slippers", 4.62, BANNER),
      line("creative-halloween-pumpkin-scented-candle-26061307", "Pumpkin scented candle", 3.8, PUMPKIN_LAMP),
      line("pumpkin-throw-pillow-halloween-plush-toy-15653239", "Pumpkin plush pillow", 2.88, BANNER),
      line("halloween-flannel-doormat-holiday-atmosphere-decoration-25112502", "Halloween flannel doormat", 2.38, BANNER),
      line("led-halloween-pumpkin-spider-bat-skull-string-light-lamp-home-garden-party-outdoor-hallowe", "LED pumpkin string lights", 2.18, PUMPKIN_LAMP),
      line("halloween-little-ghost-aromatherapy-candle-16837594", "Little ghost candle", 1.96, PUMPKIN_LAMP),
      line("halloween-witch-gift-canvas-makeup-bag-25110503", "Witch makeup bag", 1.6, BANNER),
    ]
  ),
  hamper(
    "porch-yard-takeover-hamper",
    "Porch & Yard Takeover Hamper",
    199,
    "Two inflatables, tombstone, path lights, and outdoor ghosts.",
    "A street-visible yard kit: witch inflatable, yard inflatable, tombstone, pumpkin inflatable, garden house, and path lights. Free shipping. Swap add-ons at the same $199 price.",
    [
      line("halloween-witch-inflation-model-indoor-and-outdoor-decoration-25092301", "Witch inflatable", 63.84, YARD),
      line("inflatable-halloween-decoration-19598636", "Inflatable Halloween decoration", 49.82, YARD),
      line("halloween-decoration-luminous-sound-tombstone-light-layout-decoration-", "Luminous sound tombstone", 26.84, BANNER),
      line("halloween-pumpkin-inflatable-model-ed4d9b82", "Pumpkin inflatable", 23.46, YARD),
      line("halloween-witch-pumpkin-house-decoration-garden-luminous-decoration-24", "Witch pumpkin garden house", 15.26, YARD),
      line("new-halloween-glowing-pumpkin-and-ghost-yard-stake-lights-26082501", "Pumpkin ghost yard stakes", 8.78, PUMPKIN_LAMP),
      line("halloween-props-luminous-white-ghost-outdoor-decoration-ornaments-16913185", "Luminous outdoor ghost", 7.84, BANNER),
      line("led-halloween-pumpkin-spider-bat-skull-string-light-lamp-home-garden-party-outdoor-hallowe", "LED outdoor string lights", 2.18, PUMPKIN_LAMP),
      line("halloween-cat-pumpkin-garden-banner-garden-decoration-flag-24090302", "Pumpkin garden flag", 1.96, YARD),
    ]
  ),
  hamper(
    "princess-bedroom-party-hamper",
    "Princess Bedroom Party Hamper",
    229,
    "Two princess looks, pumpkin bedding, lamp, and party extras.",
    "Grandparent-ready gift: girls costume set, Aurora dress, cloak, pumpkin comforter, RGB lamp, lantern, and party extras. Swap included items at the same $229 price.",
    [
      line("3pcs-halloween-pumpkin-set-comforter-set-for-girls-boys-women-soft-lig", "3-pc pumpkin comforter set", 63.7, BANNER),
      line("girls-blue-color-childrens-halloween-costume-set-15648758", "Girls Halloween costume set", 48.38, PRINCESS),
      line("princess-aurora-dress-girls-halloween-costume-performance-wear-cd2d423", "Princess Aurora dress", 24.72, PRINCESS),
      line("halloween-pumpkin-lamp-rgbww-color-remote-control-candle-light-2507220", "RGB pumpkin lamp", 21.56, PUMPKIN_LAMP),
      line("halloween-party-costume-kids-cloak-pumpkin-ghost-monster-cape-26082005", "Kids pumpkin ghost cloak", 17.32, PRINCESS),
      line("16-piece-princess-accessories-set-with-red-hair-jewelry-for-theme-parties-and-costumes-par", "16-piece princess accessories", 11.98, PRINCESS),
      line("halloween-party-decoration-balloon-combo-skull-pumpkin-25082306", "Skull pumpkin balloon combo", 7.86, BALLOON),
      line("halloween-decorations-childrens-portable-pumpkin-lantern-hal-20877183", "Portable pumpkin lantern", 6.78, PUMPKIN_LAMP),
      line("halloween-pumpkin-bat-holiday-printing-flannel-blanket-17015630", "Pumpkin bat flannel blanket", 6.32, BANNER),
      line("childrens-halloween-terry-mid-calf-socks-17036129", "Kids Halloween socks", 5.7, BANNER),
      line("halloween-portable-glowing-pumpkin-bucket-14363020", "Glowing pumpkin bucket", 4.18, PUMPKIN_LAMP),
      line("pumpkin-throw-pillow-halloween-plush-toy-15653239", "Pumpkin plush pillow", 2.88, BANNER),
      line("led-halloween-pumpkin-spider-bat-skull-string-light-lamp-home-garden-party-outdoor-hallowe", "LED pumpkin string lights", 2.18, PUMPKIN_LAMP),
      line("new-set-cartoon-halloween-funny-fluorescent-luminous-tattoo-stickers-14176894", "Glow tattoos", 1.9, BANNER),
      line("halloween-elf-pumpkin-devil-horn-headband-funny-cute-headband-15847169", "Horn headband", 1.9, BANNER),
      line("luminous-cartoon-halloween-3d-stickers-24080703", "Glow Halloween stickers", 1.34, BANNER),
      line("halloween-funny-pumpkin-squeezing-toy-vent-decompression-toy-17101826", "Pumpkin squeeze toy", 1.12, BANNER),
    ]
  ),
  hamper(
    "indoor-haunted-house-hamper",
    "Indoor Haunted House Hamper",
    249,
    "Voice skull, hanging ghosts, tombstone, inflatable, and backdrop.",
    "Turn a room into a haunted house: voice-control skull, witch inflatable, hanging ghosts, tombstone, RGB lamp, and horror backdrop. Customize with add-ons — $249 stays the hamper price.",
    [
      line("halloween-witch-inflation-model-indoor-and-outdoor-decoration-25092301", "Witch inflatable", 63.84, YARD),
      line("halloween-resin-skull-head-horror-voice-control-electric-prop-15691592", "Voice-control resin skull", 57.7, BANNER),
      line("halloween-decoration-luminous-sound-tombstone-light-layout-decoration-", "Luminous sound tombstone", 26.84, BANNER),
      line("halloween-induction-witch-hanging-ghost-voice-control-touch-toy-143259", "Induction hanging witch", 25.18, BANNER),
      line("halloween-pumpkin-lamp-rgbww-color-remote-control-candle-light-2507220", "RGB pumpkin lamp", 21.56, PUMPKIN_LAMP),
      line("halloween-inverted-mummy-induction-electric-luminous-hanging-ghost-250", "Luminous hanging mummy", 20.9, BANNER),
      line("halloween-props-chain-hanging-ghost-decorations-15519163", "Chain hanging ghost", 17.04, BANNER),
      line("halloween-decorations-accessories-horror-grim-reaper-hanging-ghost-28ab0345", "Grim reaper hanging ghost", 6.98, BANNER),
      line("halloween-3d-banner-horror-background-fabric-24110806", "3D horror backdrop banner", 6.04, BANNER),
      line("led-halloween-pumpkin-spider-bat-skull-string-light-lamp-home-garden-party-outdoor-hallowe", "LED pumpkin string lights", 2.18, PUMPKIN_LAMP),
      line("halloween-scary-vampire-mask-3ab3b39f", "Vampire mask", 1.02, ZOMBIE),
    ]
  ),
  hamper(
    "whole-house-halloween-hq-hamper",
    "Whole-House Halloween HQ Hamper",
    299,
    "Yard inflatable, witch inflatable, bedding, costume, and party lighting.",
    "One decision for the whole house: comforter, witch inflatable, adult costume dress, yard inflatable, RGB lamp, balloons, lantern, and socks. $299 hamper price does not change when you swap included items.",
    [
      line("8pcs-halloween-comforter-set-witch-pattern-bed-in-a-bag-bedding-with-c", "8-pc witch comforter set", 92.16, BANNER),
      line("halloween-witch-inflation-model-indoor-and-outdoor-decoration-25092301", "Witch inflatable", 63.84, YARD),
      line("womens-european-and-american-halloween-costume-dress-15673416", "Women's Halloween costume dress", 52.1, PRINCESS),
      line("inflatable-halloween-decoration-19598636", "Yard inflatable", 49.82, YARD),
      line("halloween-pumpkin-lamp-rgbww-color-remote-control-candle-light-2507220", "RGB pumpkin lamp", 21.56, PUMPKIN_LAMP),
      line("halloween-party-decoration-balloon-combo-skull-pumpkin-25082306", "Skull pumpkin balloon combo", 7.86, BALLOON),
      line("halloween-pumpkin-lantern-decorations-children-halloween-hal-20877429", "Kids pumpkin lantern", 6.78, PUMPKIN_LAMP),
      line("halloween-pumpkin-pattern-cute-funny-embroidered-low-cut-socks-25090409", "Pumpkin embroidered socks", 5.62, BANNER),
    ]
  ),
];

export const HALLOWEEN_HAMPERS_CATEGORY = {
  name: "Halloween Hampers",
  slug: HALLOWEEN_HAMPERS_CATEGORY_SLUG,
  description:
    "Ready-to-gift Halloween hampers — curated décor, costume, and party kits with free shipping over $49. Swap included items for add-ons at the same hamper price.",
  sortOrder: 0,
} as const;

export function isHalloweenHamperProduct(product: {
  categorySlug?: string | null;
  tags?: string[] | null;
  slug?: string | null;
}): boolean {
  if (product.categorySlug === HALLOWEEN_HAMPERS_CATEGORY_SLUG) return true;
  if (product.tags?.includes(HAMPER_TAG)) return true;
  if (product.slug && HALLOWEEN_HAMPER_DEFS.some((h) => h.slug === product.slug)) return true;
  return false;
}

export function isStorefrontVisibleProduct(product: {
  vendorSlug?: string | null;
  cjPid?: string | null;
  categorySlug?: string | null;
  tags?: string[] | null;
  slug?: string | null;
}): boolean {
  if (isHalloweenHamperProduct(product)) return true;
  return product.vendorSlug === "cj-dropshipping" || Boolean(product.cjPid);
}

export function hamperContentsValue(contents: HamperLine[]): number {
  return contents.reduce((sum, item) => sum + item.price, 0);
}

export function addonsForHamper(contents: HamperLine[]): HamperLine[] {
  const used = new Set(contents.map((c) => c.slug));
  return HAMPER_ADDON_POOL.filter((a) => !used.has(a.slug));
}

export function hamperCustomizationSignature(
  custom: HamperCustomization | undefined | null
): string {
  if (!custom) return "";
  const excluded = [...(custom.excludedSlugs ?? [])].sort().join(",");
  const reps = [...(custom.replacements ?? [])]
    .map((r) => `${r.fromSlug}>${r.toSlug}`)
    .sort()
    .join(",");
  const extras = [...(custom.extraSlugs ?? [])].sort().join(",");
  if (!excluded && !reps && !extras) return "";
  return `ex:${excluded}|rp:${reps}|ad:${extras}`;
}

export function emptyHamperCustomization(): HamperCustomization {
  return { excludedSlugs: [], replacements: [], extraSlugs: [] };
}

/** Contents actually shipped after swaps + paid extras. */
export function resolvedHamperContentSlugs(
  contents: HamperLine[],
  custom?: HamperCustomization | null
): string[] {
  const excluded = new Set(custom?.excludedSlugs ?? []);
  const kept = contents.filter((c) => !excluded.has(c.slug)).map((c) => c.slug);
  const swapped = (custom?.replacements ?? []).map((r) => r.toSlug);
  const extras = custom?.extraSlugs ?? [];
  return [...kept, ...swapped, ...extras];
}

export function cartLinesMatch(
  a: { addons?: Array<{ id: string; quantity?: number }> | null; hamperCustomization?: HamperCustomization | null; cjVid?: string | null },
  b: { addons?: Array<{ id: string; quantity?: number }> | null; hamperCustomization?: HamperCustomization | null; cjVid?: string | null }
): boolean {
  if ((a.cjVid || "") !== (b.cjVid || "")) return false;
  const aHamper = hamperCustomizationSignature(a.hamperCustomization);
  const bHamper = hamperCustomizationSignature(b.hamperCustomization);
  // Hamper extras are stored as add-ons for pricing; merge on customization, not those derived add-ons.
  if (aHamper || bHamper) return aHamper === bHamper;
  return cartAddonSignature(a.addons) === cartAddonSignature(b.addons);
}

export function resolveHamperCustomization(
  product: Pick<Product, "hamperContents" | "hamperAddons" | "price">,
  custom?: HamperCustomization | null
): { ok: true; extras: CartItemAddon[]; custom: HamperCustomization } | { ok: false; error: string } {
  const contents = product.hamperContents ?? [];
  const addons = product.hamperAddons ?? [];
  const contentSlugs = new Set(contents.map((c) => c.slug));
  const addonBySlug = new Map(addons.map((a) => [a.slug, a]));
  const excluded = [...new Set((custom?.excludedSlugs ?? []).map((s) => s.trim()).filter(Boolean))];
  const replacements = custom?.replacements ?? [];
  const extrasIn = [...new Set((custom?.extraSlugs ?? []).map((s) => s.trim()).filter(Boolean))];

  for (const slug of excluded) {
    if (!contentSlugs.has(slug)) return { ok: false, error: `Cannot exclude ${slug} — it is not in this hamper` };
  }

  const fromSet = new Set(replacements.map((r) => r.fromSlug));
  if (fromSet.size !== replacements.length) {
    return { ok: false, error: "Each excluded item can only be replaced once" };
  }
  if (excluded.length !== replacements.length) {
    return { ok: false, error: "Each excluded item needs one add-on replacement — hamper price stays the same" };
  }
  for (const row of replacements) {
    if (!excluded.includes(row.fromSlug)) {
      return { ok: false, error: "Replacement must match an excluded hamper item" };
    }
    if (!addonBySlug.has(row.toSlug)) {
      return { ok: false, error: "Replacement must be chosen from this hamper's add-ons" };
    }
    if (contentSlugs.has(row.toSlug) && !excluded.includes(row.toSlug)) {
      return { ok: false, error: "That add-on is already included in the hamper" };
    }
  }
  const toSet = new Set(replacements.map((r) => r.toSlug));
  if (toSet.size !== replacements.length) {
    return { ok: false, error: "Pick a different add-on for each swap" };
  }

  const extraAddons: CartItemAddon[] = [];
  for (const slug of extrasIn) {
    if (toSet.has(slug)) {
      return { ok: false, error: "That add-on is already used as a swap — extras are additional paid items" };
    }
    const def = addonBySlug.get(slug);
    if (!def) return { ok: false, error: "Extra add-on must be from this hamper's add-on list" };
    extraAddons.push({
      id: `hamper-extra:${slug}`,
      name: `${def.name} (extra)`,
      price: def.price,
      quantity: 1,
    });
  }

  return {
    ok: true,
    extras: extraAddons,
    custom: {
      excludedSlugs: excluded,
      replacements: replacements.map((r) => ({ fromSlug: r.fromSlug, toSlug: r.toSlug })),
      extraSlugs: extrasIn,
    },
  };
}

export function buildHalloweenHamperCatalogProducts(): Array<
  Omit<Product, "createdAt" | "updatedAt"> & { vendorSlug: string }
> {
  return HALLOWEEN_HAMPER_DEFS.map((def) => {
    const addons = addonsForHamper(def.contents);
    const contentsValue = hamperContentsValue(def.contents);
    const compareAt = Math.max(def.price, Math.round(contentsValue * 100) / 100);
    return {
      name: def.name,
      slug: def.slug,
      description: `<p>${def.description}</p><p><strong>What's included in this hamper:</strong></p><ul>${def.contents
        .map((c) => `<li>${c.name}</li>`)
        .join("")}</ul><p>Free shipping (all hampers are over $49). Swap any included item for an add-on — the hamper price stays $${def.price}. Extra add-ons are added on top at their listed prices.</p>`,
      price: def.price,
      compareAtPrice: compareAt > def.price ? compareAt : undefined,
      currency: "USD" as const,
      categorySlug: HALLOWEEN_HAMPERS_CATEGORY_SLUG,
      images: galleryImagesForHamper(def.contents, def.images),
      sku: `HR-HAMPER-${def.price}`,
      inventory: DEFAULT_PRODUCT_INVENTORY,
      tags: [HAMPER_TAG, "halloween", "hamper"],
      vendorSlug: VENDOR_HALLOWEENREADY,
      published: true,
      couponExcluded: true,
      seoTitle: `${def.name} — $${def.price} Halloween Hamper | HalloweenReady`,
      seoDescription: def.tagline,
      hamperContents: def.contents,
      hamperAddons: addons,
    };
  });
}

export function getHalloweenHamperDef(slug: string): HamperDef | undefined {
  return HALLOWEEN_HAMPER_DEFS.find((h) => h.slug === slug);
}
