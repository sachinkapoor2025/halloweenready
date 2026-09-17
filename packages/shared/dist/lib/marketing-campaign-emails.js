"use strict";
/**
 * Conversion-focused marketing email templates for HalloweenReady.
 *
 * Edit the CONFIG objects below to update images, copy, CTAs, and links —
 * then rebuild / open Admin → Email → Templates to sync starters.
 *
 * Both builders emit table + inline-CSS HTML for Gmail / Outlook / Apple Mail.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HALLOWEEN_COLLECTION_EMAIL_CONFIG = exports.SHOP_MORE_SAVE_MORE_EMAIL_CONFIG = exports.STARTING_PRICE_EMAIL_CONFIG = exports.FREE_SHIPPING_EMAIL_CONFIG = void 0;
exports.buildFreeShippingEmailHtml = buildFreeShippingEmailHtml;
exports.buildStartingPriceEmailHtml = buildStartingPriceEmailHtml;
exports.buildShopMoreSaveMoreEmailHtml = buildShopMoreSaveMoreEmailHtml;
exports.buildHalloweenCollectionEmailHtml = buildHalloweenCollectionEmailHtml;
const SITE = "https://www.halloweenready.com";
const SITE_SHORT = "https://halloweenready.com";
const SHOP = `${SITE}/products`;
const LOGO = `${SITE}/logo.png`;
const HERO = `${SITE}/banners/bannerpage1.png`;
const FB = `${SITE}/email-templates/icons/facebook.png`;
const IG = `${SITE}/email-templates/icons/instagram.png`;
// ─── Palette ───────────────────────────────────────────────────────────────
const NAVY = "#1a0a2e";
const GOLD = "#ff6b00";
const RED = "#e11d48";
const CREAM = "#fff8ef";
const PAGE_BG = "#f3eee6";
const PAGE_BG_HALLOWEEN = "#14081f";
/** ═══════════════ TEMPLATE 1 — Free Shipping Above $7 ═══════════════ */
exports.FREE_SHIPPING_EMAIL_CONFIG = {
    templateId: "free-shipping-above-7",
    name: "Free Shipping Above $7",
    subject: "FREE SHIPPING on Orders Above $7 — HalloweenReady",
    preheader: "Free shipping on orders above $7. Halloween decorations & costumes, ships from the USA.",
    logoUrl: LOGO,
    logoHref: SITE,
    heroImageUrl: HERO,
    heroImageHref: SHOP,
    heroImageAlt: "HalloweenReady — Free shipping on Halloween orders above $7",
    offerEyebrow: "HALLOWEEN OFFER",
    offerHeadline: "FREE SHIPPING",
    offerSubhead: "On Orders Above $7",
    offerBody: "Stock up on Halloween decorations, costumes, and party supplies — and enjoy free domestic shipping when your order is $7 or more. Ships from the USA. No customs delays.",
    ctaText: "Shop Halloween",
    ctaHref: SHOP,
    benefitsHeading: "Why Shop HalloweenReady",
    benefits: [
        { icon: "🚚", title: "Fast USA Delivery", description: "2–5 business days to all 50 states." },
        { icon: "✨", title: "Seasonal Selection", description: "Decor, costumes, and party supplies." },
        { icon: "🔒", title: "Secure Checkout", description: "Pay safely with Stripe or Razorpay." },
        { icon: "🇺🇸", title: "Ships From USA", description: "Domestic fulfillment — no customs." },
    ],
    categoriesHeading: "Featured Categories",
    categoriesSubheading: "Everything you need for a spooky season.",
    categories: [
        {
            name: "Home Decorations",
            description: "Inflatables, yard signs, lights, and haunted-house décor.",
            imageUrl: `${SITE}/banners/bannerpage1.png`,
            href: `${SITE}/categories/home-decoration`,
            buttonText: "Shop Now",
        },
        {
            name: "Costumes",
            description: "Costumes and accessories for every look.",
            imageUrl: `${SITE}/banners/bannerpage2.png`,
            href: `${SITE}/categories/costumesandaccessories`,
            buttonText: "Shop Now",
        },
        {
            name: "Party Supplies",
            description: "Tableware, banners, balloons, and kits.",
            imageUrl: `${SITE}/banners/bannerpage1.png`,
            href: `${SITE}/categories/partysupplier`,
            buttonText: "Shop Now",
        },
        {
            name: "Toys & Novelty",
            description: "Fun novelties and trick-or-treat extras.",
            imageUrl: `${SITE}/banners/bannerpage2.png`,
            href: `${SITE}/categories/toysandnovelty`,
            buttonText: "Shop Now",
        },
    ],
    midCtaHeading: "Ready for Halloween?",
    midCtaBody: "Orders $7+ ship free across the USA. Shop the seasonal collection today.",
    midCtaText: "Shop Free Shipping Deals",
    midCtaHref: SHOP,
    footerTagline: "Halloween Decorations & Party Supplies",
    websiteUrl: SITE,
    websiteLabel: "www.halloweenready.com",
    orderEmail: "order@halloweenready.com",
    facebookUrl: "https://www.facebook.com/halloweenready/",
    facebookIconUrl: FB,
    instagramUrl: "https://www.instagram.com/halloweenready/",
    instagramIconUrl: IG,
    copyrightText: "© 2026 HalloweenReady. All Rights Reserved.",
    unsubscribeLabel: "Unsubscribe",
};
/** ═══════════════ TEMPLATE 2 — Starting price promo ═══════════════ */
exports.STARTING_PRICE_EMAIL_CONFIG = {
    templateId: "halloween-starting-deals",
    name: "Halloween Starting Deals",
    subject: "Halloween Finds Starting at Great Prices — Limited Time",
    preheader: "Limited time: Halloween decorations and costumes at great starting prices.",
    logoUrl: LOGO,
    logoHref: SITE,
    heroImageUrl: HERO,
    heroImageHref: SHOP,
    heroImageAlt: "Halloween deals — HalloweenReady",
    urgencyText: "⚡ Limited Time Offer",
    offerEyebrow: "HALLOWEEN DEAL",
    offerHeadline: "Spooky Season Deals",
    offerSubhead: "Decorations, costumes & party supplies",
    offerBody: "Get Halloween-ready without stretching your budget. Explore decorations, costumes, and party supplies with festive packaging and USA delivery.",
    ctaText: "Shop Deals",
    ctaHref: SHOP,
    sections: [
        {
            heading: "Best Sellers",
            subheading: "Most-loved Halloween picks.",
            cards: [
                {
                    name: "Home Decorations",
                    description: "Yard décor and haunted-house favorites.",
                    imageUrl: `${SITE}/banners/bannerpage1.png`,
                    href: `${SITE}/categories/home-decoration`,
                    buttonText: "Shop Now",
                    badge: "BEST SELLER",
                    priceLabel: "Shop décor",
                },
                {
                    name: "Costumes",
                    description: "Looks for every Halloween party.",
                    imageUrl: `${SITE}/banners/bannerpage2.png`,
                    href: `${SITE}/categories/costumesandaccessories`,
                    buttonText: "Shop Now",
                    badge: "HOT",
                    priceLabel: "Shop costumes",
                },
            ],
        },
        {
            heading: "Party Essentials",
            subheading: "Supplies to host a memorable night.",
            cards: [
                {
                    name: "Party Supplies",
                    description: "Tableware, banners, and balloons.",
                    imageUrl: `${SITE}/banners/bannerpage1.png`,
                    href: `${SITE}/categories/partysupplier`,
                    buttonText: "Shop Party",
                    badge: "PARTY",
                    priceLabel: "Host ready",
                },
                {
                    name: "Toys & Novelty",
                    description: "Fun extras for trick-or-treat.",
                    imageUrl: `${SITE}/banners/bannerpage2.png`,
                    href: `${SITE}/categories/toysandnovelty`,
                    buttonText: "Shop Novelty",
                    badge: "FUN",
                    priceLabel: "Add-ons",
                },
            ],
        },
        {
            heading: "Atmosphere",
            subheading: "Candles, fragrance, and wearable accents.",
            cards: [
                {
                    name: "Candles & Fragrance",
                    description: "Set the spooky mood.",
                    imageUrl: `${SITE}/banners/bannerpage1.png`,
                    href: `${SITE}/categories/candlesandfragrance`,
                    buttonText: "Shop Candles",
                    badge: "MOOD",
                    priceLabel: "Atmosphere",
                },
                {
                    name: "Lifestyle & Wearable",
                    description: "Seasonal wearables and accents.",
                    imageUrl: `${SITE}/banners/bannerpage2.png`,
                    href: `${SITE}/categories/lifestyleandwearable`,
                    buttonText: "Shop Wearables",
                    badge: "STYLE",
                    priceLabel: "Seasonal",
                },
            ],
        },
        {
            heading: "More to Explore",
            subheading: "Jewelry, paper crafts, and finishing touches.",
            cards: [
                {
                    name: "Jewelry & Accessories",
                    description: "Finishing touches for costumes.",
                    imageUrl: `${SITE}/banners/bannerpage1.png`,
                    href: `${SITE}/categories/jewellryandaccessories`,
                    buttonText: "Shop Accessories",
                    badge: "ACCENT",
                    priceLabel: "Complete the look",
                },
                {
                    name: "Printed & Paper Crafts",
                    description: "Signs, crafts, and printable fun.",
                    imageUrl: `${SITE}/banners/bannerpage2.png`,
                    href: `${SITE}/categories/printedandpapercrafts`,
                    buttonText: "Shop Crafts",
                    badge: "CRAFT",
                    priceLabel: "DIY ready",
                },
            ],
        },
    ],
    midCtaHeading: "Don't Miss These Halloween Deals",
    midCtaBody: "Order decorations and costumes early for guaranteed pre-Halloween delivery.",
    midCtaText: "Shop Halloween",
    midCtaHref: SHOP,
    footerTagline: "Halloween Decorations & Party Supplies",
    websiteUrl: SITE,
    websiteLabel: "www.halloweenready.com",
    orderEmail: "order@halloweenready.com",
    facebookUrl: "https://www.facebook.com/halloweenready/",
    facebookIconUrl: FB,
    instagramUrl: "https://www.instagram.com/halloweenready/",
    instagramIconUrl: IG,
    copyrightText: "© 2026 HalloweenReady. All Rights Reserved.",
    unsubscribeLabel: "Unsubscribe",
};
/** ═══════════════ TEMPLATE 3 — Shop More, Save More ═══════════════ */
exports.SHOP_MORE_SAVE_MORE_EMAIL_CONFIG = {
    templateId: "shop-more-save-more",
    name: "Shop More, Save More — Halloween",
    subject: "Shop More, Save More on Halloween Essentials",
    preheader: "Shop more, save more on Halloween decorations, costumes, and party supplies with USA delivery.",
    logoUrl: LOGO,
    logoHref: SITE_SHORT,
    logoTagline: "Halloween Decorations & Party Supplies",
    heroImageUrl: `${SITE}/banners/bannerpage1.png`,
    heroImageHref: SITE_SHORT,
    heroImageAlt: "Shop More, Save More — HalloweenReady",
    offerEyebrow: "HALLOWEEN SPECIAL",
    offerHeadline: "Shop More, Save More",
    offerSubhead: "Stock up for Halloween night",
    offerThreshold: "Free shipping on carts of $49+",
    offerBody: "Celebrate Halloween with decorations, costumes, and party supplies — delivered across America. Add more to your cart and unlock seasonal savings.",
    ctaText: "Shop Now",
    ctaHref: SITE_SHORT,
    categoriesHeading: "Shop by Category",
    categoriesSubheading: "Tap a collection to find the perfect Halloween picks.",
    categories: [
        {
            name: "Home Decorations",
            description: "Yard décor and haunted-house favorites.",
            imageUrl: `${SITE}/banners/bannerpage1.png`,
            href: `${SITE}/categories/home-decoration`,
            buttonText: "Shop Now",
        },
        {
            name: "Costumes",
            description: "Costumes and accessories for every look.",
            imageUrl: `${SITE}/banners/bannerpage2.png`,
            href: `${SITE}/categories/costumesandaccessories`,
            buttonText: "Shop Now",
        },
        {
            name: "Party Supplies",
            description: "Tableware, banners, and balloons.",
            imageUrl: `${SITE}/banners/bannerpage1.png`,
            href: `${SITE}/categories/partysupplier`,
            buttonText: "Shop Now",
        },
        {
            name: "Toys & Novelty",
            description: "Fun extras for trick-or-treat.",
            imageUrl: `${SITE}/banners/bannerpage2.png`,
            href: `${SITE}/categories/toysandnovelty`,
            buttonText: "Shop Now",
        },
        {
            name: "Candles & Fragrance",
            description: "Set the spooky mood.",
            imageUrl: `${SITE}/banners/bannerpage1.png`,
            href: `${SITE}/categories/candlesandfragrance`,
            buttonText: "Shop Now",
        },
        {
            name: "Lifestyle & Wearable",
            description: "Seasonal wearables and accents.",
            imageUrl: `${SITE}/banners/bannerpage2.png`,
            href: `${SITE}/categories/lifestyleandwearable`,
            buttonText: "Shop Now",
        },
    ],
    productsHeading: "Featured Picks",
    productsSubheading: "Handpicked Halloween favorites — tap Shop Now to order.",
    products: [
        {
            name: "Home Decorations",
            description: "Transform your yard and home.",
            imageUrl: `${SITE}/banners/bannerpage1.png`,
            href: `${SITE}/categories/home-decoration`,
            buttonText: "Shop Now",
            priceLabel: "Decor",
            badge: "BESTSELLER",
        },
        {
            name: "Costumes & Accessories",
            description: "Complete your Halloween look.",
            imageUrl: `${SITE}/banners/bannerpage2.png`,
            href: `${SITE}/categories/costumesandaccessories`,
            buttonText: "Shop Now",
            priceLabel: "Costume",
            badge: "HOT",
        },
        {
            name: "Party Supplies",
            description: "Host a memorable Halloween party.",
            imageUrl: `${SITE}/banners/bannerpage1.png`,
            href: `${SITE}/categories/partysupplier`,
            buttonText: "Shop Now",
            priceLabel: "Party",
            badge: "PARTY",
        },
        {
            name: "Toys & Novelty",
            description: "Fun extras for the season.",
            imageUrl: `${SITE}/banners/bannerpage2.png`,
            href: `${SITE}/categories/toysandnovelty`,
            buttonText: "Shop Now",
            priceLabel: "Novelty",
            badge: "FUN",
        },
        {
            name: "Candles & Fragrance",
            description: "Atmosphere for haunted nights.",
            imageUrl: `${SITE}/banners/bannerpage1.png`,
            href: `${SITE}/categories/candlesandfragrance`,
            buttonText: "Shop Now",
            priceLabel: "Mood",
            badge: "MOOD",
        },
        {
            name: "Halloween Guide",
            description: "Tips and deadlines for Halloween 2026.",
            imageUrl: `${SITE}/banners/bannerpage2.png`,
            href: `${SITE}/halloween-guide`,
            buttonText: "Read Guide",
            priceLabel: "Guide",
            badge: "TIPS",
        },
    ],
    whyHeading: "Why Choose HalloweenReady",
    whySubheading: "Trusted for Halloween decorations and party supplies with USA delivery.",
    whyBenefits: [
        { icon: "🚚", title: "Fast USA Delivery", description: "2–5 day domestic shipping to all 50 states." },
        { icon: "🔒", title: "Secure Payments", description: "Safe checkout with Stripe & Razorpay." },
        { icon: "✨", title: "Seasonal Quality", description: "Premium Halloween products." },
        { icon: "🤝", title: "Trusted Service", description: "WhatsApp support before & after delivery." },
    ],
    midCtaHeading: "Don't Miss This Halloween Offer",
    midCtaBody: "Shop more, save more when your cart is $49 or more — free shipping. Get Halloween-ready — order today.",
    midCtaText: "Shop Now",
    midCtaHref: SITE_SHORT,
    footerTagline: "Halloween Decorations & Party Supplies",
    footerLogoUrl: LOGO,
    websiteUrl: SITE_SHORT,
    websiteLabel: "halloweenready.com",
    orderEmail: "order@halloweenready.com",
    facebookUrl: "https://www.facebook.com/halloweenready/",
    facebookIconUrl: FB,
    instagramUrl: "https://www.instagram.com/halloweenready/",
    instagramIconUrl: IG,
    copyrightText: "© 2026 HalloweenReady. All Rights Reserved.",
    unsubscribeLabel: "Unsubscribe",
};
function productUrl(slug) {
    return `${SITE}/products/${slug}`;
}
function categoryUrl(slug) {
    return `${SITE}/categories/${slug}`;
}
/**
 * Flagship Halloween collection mailer.
 * Swap banner, products, offers, copy, and links in this CONFIG for future campaigns.
 * Product photos and prices are from the live HalloweenReady homepage catalog.
 */
exports.HALLOWEEN_COLLECTION_EMAIL_CONFIG = {
    templateId: "halloween-collection-mailer",
    name: "Halloween Collection Mailer",
    subject: "Celebrate Halloween in Style — Decor, Costumes & Party Supplies",
    preheader: "Shop real HalloweenReady favorites: inflatables, décor, costumes, and hampers. 20% off selected picks. Free shipping on $49+.",
    logoUrl: LOGO,
    logoHref: SITE,
    logoAlt: "HalloweenReady",
    logoTagline: "Halloween Decorations, Costumes & Party Supplies",
    promoStrip: "20% OFF selected picks  ·  Free shipping on orders $49+",
    heroImageUrl: HERO,
    heroImageHref: SHOP,
    heroImageAlt: "Halloween decorations, costumes, and party supplies — HalloweenReady",
    heroEyebrow: "HALLOWEEN 2026 · SHOP WORLDWIDE",
    heroHeadline: "Celebrate Halloween in Style",
    heroSubhead: "Premium décor, costumes, and party supplies",
    heroBody: "Haunt the porch, dress the party, and gift a hamper — all from HalloweenReady. Delivering in 5–7 days. Confirm shipping on each product page.",
    heroButtonText: "Shop Now",
    heroButtonHref: SHOP,
    productsHeading: "Featured Halloween Picks",
    productsSubheading: "Live catalog favorites — tap Shop Now to view each product.",
    products: [
        {
            name: "12-ft Inflatable Ghost",
            description: "A statement yard haunt with LED presence for trick-or-treat night.",
            imageUrl: "https://cf.cjdropshipping.com/doba-import/4ce1e41b08c7458eb8719c11f0d40956.jpg",
            href: productUrl("12-feet-halloween-inflatable-ghost-decoration-20953423"),
            buttonText: "Shop Now",
            badge: "STATEMENT",
            priceLabel: "$142.08",
        },
        {
            name: "Luminous Hanging Ghost",
            description: "Inverted mummy induction ghost — electric glow for indoor or porch drama.",
            imageUrl: "https://cf.cjdropshipping.com/quick/product/6ff22050-8c31-449f-bf04-51533fae2f02.jpg",
            href: productUrl("halloween-inverted-mummy-induction-electric-luminous-hanging-ghost-25090702"),
            buttonText: "Shop Now",
            badge: "HOT",
            priceLabel: "$20.90",
        },
        {
            name: "Wooden Pumpkin Welcome Sign",
            description: "Door-hanging pumpkin garland to greet guests before they knock.",
            imageUrl: "https://cf.cjdropshipping.com/4ff4ee46-2dd4-4deb-baf7-fef328cffb69.jpg",
            href: productUrl("welcome-sign-garland-door-hanging-halloween-wooden-pumpkin-14347162"),
            buttonText: "Shop Now",
            badge: "PORCH",
            priceLabel: "$5.32",
        },
        {
            name: "Orange Ghost Pillowcase",
            description: "Linen ghost pillow cover — instant indoor Halloween refresh.",
            imageUrl: "https://cf.cjdropshipping.com/6522b69c-c237-4d2d-88b1-98e4b404b07f.jpg",
            href: productUrl("halloween-orange-ghost-linen-pillowcase-14303924"),
            buttonText: "Shop Now",
            badge: "HOME",
            priceLabel: "$1.70",
        },
        {
            name: "Pumpkin Crew Neck Sweatshirt",
            description: "Women’s Halloween pumpkin print — cozy, festive, and photo-ready.",
            imageUrl: "https://cf.cjdropshipping.com/a9024d86-3403-40f7-9e9d-d740f6d2849c.jpg",
            href: productUrl("womens-halloween-print-pumpkin-crew-neck-sweatshirt-15706440"),
            buttonText: "Shop Now",
            badge: "APPAREL",
            priceLabel: "$6.52",
        },
        {
            name: "Kids Ghost Doll Dress",
            description: "Children’s horror-ghost cosplay dress for parties and school events.",
            imageUrl: "https://cf.cjdropshipping.com/quick/product/f0776e39-02a0-4f94-b22b-cf37cb4013a1.jpg",
            href: productUrl("halloween-costume-childrens-cosplay-horror-ghost-doll-white-dress-25082808"),
            buttonText: "Shop Now",
            badge: "COSTUME",
            priceLabel: "$13.26",
        },
    ],
    offerHeading: "Season Offer",
    offerTitle: "Free shipping on $49+",
    offerBody: "Selected picks show 20% off on the site. Carts of $49 or more ship free. Smaller orders use a stepped shipping fee — totals match checkout.",
    offerButtonText: "Shop the Collection",
    offerButtonHref: SHOP,
    categoriesHeading: "Shop by Category",
    categoriesSubheading: "Real product photography from each HalloweenReady collection.",
    categories: [
        {
            name: "Home Decorations",
            description: "Skull lights, inflatables, and haunted-house décor.",
            imageUrl: "https://cf.cjdropshipping.com/4aa3fe2b-d04c-4b07-a0fe-28626693745a.jpg",
            href: categoryUrl("home-decoration"),
            buttonText: "Shop Now",
        },
        {
            name: "Costumes",
            description: "Looks for kids, adults, and every Halloween party.",
            imageUrl: "https://cf.cjdropshipping.com/quick/product/f0776e39-02a0-4f94-b22b-cf37cb4013a1.jpg",
            href: categoryUrl("costumesandaccessories"),
            buttonText: "Shop Now",
        },
        {
            name: "Party Supplies",
            description: "Balloons, tableware, and host-ready kits.",
            imageUrl: "https://cf.cjdropshipping.com/97fe4de0-2531-4b27-b1a3-8f59f1eea12e.jpg",
            href: categoryUrl("partysupplier"),
            buttonText: "Shop Now",
        },
        {
            name: "Halloween Hampers",
            description: "Ready-to-gift kits from $49 — free shipping.",
            imageUrl: "https://cf.cjdropshipping.com/0ceac233-1580-45f5-b2b2-f9c660947db1.jpg",
            href: categoryUrl("halloween-hampers"),
            buttonText: "Shop Now",
        },
    ],
    hampersHeading: "Ready-to-Gift Hampers",
    hampersSubheading: "Curated kits with swap-able items — same hamper price.",
    hampers: [
        {
            name: "Apartment Haunt Hamper",
            description: "Compact indoor haunt kit — candles, lights, and décor in one box.",
            imageUrl: "https://cf.cjdropshipping.com/0ceac233-1580-45f5-b2b2-f9c660947db1.jpg",
            href: productUrl("apartment-haunt-hamper"),
            buttonText: "Shop Now",
            badge: "FROM $99",
            priceLabel: "$99.00",
        },
        {
            name: "Party in a Box Hamper",
            description: "Host-ready party supplies bundled for a complete Halloween night.",
            imageUrl: "https://cf.cjdropshipping.com/15958656/26524287831.jpg",
            href: productUrl("party-in-a-box-hamper"),
            buttonText: "Shop Now",
            badge: "HOST",
            priceLabel: "$129.00",
        },
    ],
    whyHeading: "Why Shop HalloweenReady",
    whySubheading: "The same promises we make on halloweenready.com.",
    whyBenefits: [
        { icon: "🎃", title: "Premium Collection", description: "Decor, costumes, and party supplies in one store." },
        { icon: "🚚", title: "5–7 Day Delivery", description: "Confirm the product-page quote for your country." },
        { icon: "🔒", title: "Secure Checkout", description: "Pay with Stripe (USD) or Razorpay (INR)." },
        { icon: "💬", title: "Human Support", description: "WhatsApp and email before and after delivery." },
    ],
    midCtaHeading: "Your Halloween night starts here",
    midCtaBody: "Shop decorations, costumes, and hampers now — October 31 will be here before you know it.",
    midCtaText: "Shop Now",
    midCtaHref: SHOP,
    footerTagline: "Halloween Decorations, Costumes & Party Supplies",
    footerLogoUrl: LOGO,
    websiteUrl: SITE,
    websiteLabel: "www.halloweenready.com",
    orderEmail: "order@halloweenready.com",
    facebookUrl: "https://www.facebook.com/halloweenready/",
    facebookIconUrl: FB,
    instagramUrl: "https://www.instagram.com/halloweenready/",
    instagramIconUrl: IG,
    copyrightText: "© 2026 HalloweenReady. All Rights Reserved.",
    unsubscribeLabel: "Unsubscribe",
};
// ─── Shared HTML helpers ───────────────────────────────────────────────────
function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
function escAttr(value) {
    return escapeHtml(value);
}
function ctaButton(href, label, opts) {
    const fill = opts?.fill ?? RED;
    const textColor = opts?.textColor ?? "#ffffff";
    const width = opts?.width ?? 200;
    const pad = opts?.pad ?? "15px 32px";
    const fontSize = opts?.fontSize ?? "16px";
    const safeHref = escAttr(href);
    const safeLabel = escapeHtml(label);
    return `
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${safeHref}" style="height:50px;v-text-anchor:middle;width:${width}px;" arcsize="16%" stroke="f" fillcolor="${fill}">
                      <w:anchorlock/>
                      <center style="color:${textColor};font-family:Arial,Helvetica,sans-serif;font-size:${fontSize};font-weight:bold;">${safeLabel}</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-- -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 auto;">
                      <tr>
                        <td align="center" bgcolor="${fill}" style="background-color:${fill};border-radius:10px;">
                          <a href="${safeHref}" target="_blank" style="display:inline-block;padding:${pad};font-family:Arial,Helvetica,sans-serif;font-size:${fontSize};line-height:20px;font-weight:bold;color:${textColor};text-decoration:none;border-radius:10px;">
                            ${safeLabel}
                          </a>
                        </td>
                      </tr>
                    </table>
                    <!--<![endif]-->`;
}
function productCard(card, opts) {
    const href = escAttr(card.href);
    const img = escAttr(card.imageUrl);
    const name = escapeHtml(card.name);
    const desc = escapeHtml(card.description);
    const btn = escapeHtml(card.buttonText);
    const badge = card.badge ? escapeHtml(card.badge) : "";
    const price = card.priceLabel ? escapeHtml(card.priceLabel) : "";
    return `
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background-color:#ffffff;border:1px solid #efe6d6;border-radius:12px;overflow:hidden;">
                      <tr>
                        <td align="center" style="padding:0;line-height:0;font-size:0;background-color:${CREAM};position:relative;">
                          <a href="${href}" target="_blank" style="text-decoration:none;">
                            <img class="card-img fluid" src="${img}" width="260" alt="${name}" style="display:block;width:100%;max-width:260px;height:auto;border:0;margin:0 auto;" />
                          </a>
                        </td>
                      </tr>
                      ${opts?.showBadge !== false && badge
        ? `<tr>
                        <td align="center" style="padding:10px 12px 0 12px;">
                          <span style="display:inline-block;padding:4px 10px;background-color:${RED};color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;letter-spacing:0.5px;border-radius:999px;">${badge}</span>
                        </td>
                      </tr>`
        : ""}
                      <tr>
                        <td align="center" style="padding:12px 14px 18px 14px;">
                          <div style="font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:22px;font-weight:bold;color:${NAVY};padding-bottom:6px;">${name}</div>
                          ${price ? `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:18px;font-weight:bold;color:${RED};padding-bottom:6px;">${price}</div>` : ""}
                          <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#6b5e4e;padding-bottom:12px;">${desc}</div>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                            <tr>
                              <td align="center" bgcolor="${opts?.buttonFill ?? GOLD}" style="background-color:${opts?.buttonFill ?? GOLD};border-radius:8px;">
                                <a href="${href}" target="_blank" style="display:inline-block;padding:10px 18px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:16px;font-weight:bold;color:${opts?.buttonColor ?? NAVY};text-decoration:none;border-radius:8px;">${btn}</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>`;
}
function twoColCards(cards, cardOpts) {
    const a = cards[0];
    const b = cards[1];
    if (!a)
        return "";
    return `
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td class="stack-col" width="50%" valign="top" style="width:50%;padding:0 6px 14px 0;">
                    ${productCard(a, cardOpts)}
                  </td>
                  <td class="stack-col" width="50%" valign="top" style="width:50%;padding:0 0 14px 6px;">
                    ${b ? productCard(b, cardOpts) : "&nbsp;"}
                  </td>
                </tr>
              </table>`;
}
function cardGrid(cards, cardOpts) {
    const rows = [];
    for (let i = 0; i < cards.length; i += 2) {
        rows.push(twoColCards([cards[i], cards[i + 1]].filter(Boolean), cardOpts));
    }
    return rows.join("");
}
function benefitsRow(benefits) {
    const cells = benefits
        .slice(0, 4)
        .map((b, i) => `
                  <td class="stack-col-25" width="25%" valign="top" style="width:25%;padding:${i === 0 ? "0 4px 10px 0" : i === 3 ? "0 0 10px 4px" : "0 4px 10px 4px"};">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background-color:#ffffff;border:1px solid #efe6d6;border-radius:12px;">
                      <tr>
                        <td align="center" style="padding:16px 10px;">
                          <div style="font-size:22px;line-height:28px;padding-bottom:8px;">${escapeHtml(b.icon)}</div>
                          <div style="font-family:Georgia,'Times New Roman',serif;font-size:13px;line-height:17px;font-weight:bold;color:${NAVY};padding-bottom:4px;">${escapeHtml(b.title)}</div>
                          <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:15px;color:#6b5e4e;">${escapeHtml(b.description)}</div>
                        </td>
                      </tr>
                    </table>
                  </td>`)
        .join("");
    return `
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                <tr>${cells}</tr>
              </table>`;
}
function emailShell(opts) {
    const f = opts.footer;
    const pageBg = opts.pageBg ?? PAGE_BG;
    const headerBg = opts.headerBg ?? "#fffdf8";
    const barLeft = opts.barLeft ?? NAVY;
    const barRight = opts.barRight ?? GOLD;
    const taglineColor = opts.taglineColor ?? NAVY;
    const logoAlt = opts.logoAlt ?? "HalloweenReady";
    const logoTagline = opts.logoTagline
        ? `
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:13px;line-height:18px;font-style:italic;color:${taglineColor};padding-top:10px;">
                ${escapeHtml(opts.logoTagline)}
              </div>`
        : "";
    const footerLogo = f.logoUrl
        ? `
                <tr>
                  <td align="center" style="padding:0 0 14px 0;">
                    <a href="${escAttr(f.websiteUrl)}" target="_blank" style="text-decoration:none;">
                      <img src="${escAttr(f.logoUrl)}" width="140" alt="HalloweenReady" style="display:block;width:140px;max-width:55%;height:auto;border:0;margin:0 auto;background-color:#ffffff;border-radius:8px;padding:8px;" />
                    </a>
                  </td>
                </tr>`
        : "";
    return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
  <title>${escapeHtml(opts.title)}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style type="text/css">
    table { border-collapse: collapse; }
    td, th, div, p, a, h1, h2, h3, span { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
  <style type="text/css">
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .fluid { width: 100% !important; max-width: 100% !important; height: auto !important; }
      .stack-col { display: block !important; width: 100% !important; max-width: 100% !important; padding-left: 0 !important; padding-right: 0 !important; }
      .stack-col-25 { display: inline-block !important; width: 50% !important; max-width: 50% !important; box-sizing: border-box !important; }
      .mobile-pad { padding-left: 18px !important; padding-right: 18px !important; }
      .hero-title { font-size: 30px !important; line-height: 36px !important; }
      .section-title { font-size: 22px !important; line-height: 28px !important; }
      .card-img { width: 100% !important; max-width: 100% !important; height: auto !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${pageBg};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
    ${escapeHtml(opts.preheader)}
  </div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background-color:${pageBg};">
    <tr>
      <td align="center" style="padding:20px 10px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="email-container" style="border-collapse:collapse;width:600px;max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
          <!-- Logo -->
          <tr>
            <td align="center" bgcolor="${headerBg}" style="padding:20px 24px 14px 24px;background-color:${headerBg};">
              <a href="${escAttr(opts.logoHref)}" target="_blank" style="text-decoration:none;">
                <img src="${escAttr(opts.logoUrl)}" width="168" alt="${escAttr(logoAlt)}" style="display:block;width:168px;max-width:70%;height:auto;border:0;margin:0 auto;" />
              </a>
              ${logoTagline}
            </td>
          </tr>
          <tr>
            <td height="5" style="height:5px;line-height:5px;font-size:0;background-color:${barLeft};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td width="70%" height="5" bgcolor="${barLeft}" style="background-color:${barLeft};font-size:0;line-height:5px;">&nbsp;</td>
                  <td width="30%" height="5" bgcolor="${barRight}" style="background-color:${barRight};font-size:0;line-height:5px;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>
          ${opts.bodyRows}
          <!-- Footer -->
          <tr>
            <td class="mobile-pad" style="padding:32px 28px 36px 28px;background-color:${NAVY};text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                ${footerLogo}
                <tr>
                  <td align="center" style="padding:0 0 14px 0;font-family:Georgia,'Times New Roman',serif;font-size:14px;line-height:20px;color:#f0d78c;">
                    ${escapeHtml(f.tagline)}
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#d7dde8;">
                    Website:
                    <a href="${escAttr(f.websiteUrl)}" target="_blank" style="color:#f0d78c;text-decoration:underline;">${escapeHtml(f.websiteLabel)}</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#d7dde8;">
                    Orders:
                    <a href="mailto:${escAttr(f.orderEmail)}" style="color:#f0d78c;text-decoration:underline;">${escapeHtml(f.orderEmail)}</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#9aa8c0;">
                    Follow us
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:0 0 16px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 auto;">
                      <tr>
                        <td style="padding:0 8px;">
                          <a href="${escAttr(f.facebookUrl)}" target="_blank" style="text-decoration:none;">
                            <img src="${escAttr(f.facebookIconUrl)}" width="36" height="36" alt="Facebook" style="display:block;border:0;width:36px;height:36px;" />
                          </a>
                        </td>
                        <td style="padding:0 8px;">
                          <a href="${escAttr(f.instagramUrl)}" target="_blank" style="text-decoration:none;">
                            <img src="${escAttr(f.instagramIconUrl)}" width="36" height="36" alt="Instagram" style="display:block;border:0;width:36px;height:36px;" />
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:0 0 12px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#9aa8c0;">
                    ${escapeHtml(f.copyrightText)}
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#9aa8c0;">
                    <a href="{{unsubscribe}}" target="_blank" style="color:#f0d78c;text-decoration:underline;">${escapeHtml(f.unsubscribeLabel)}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
function footerFrom(cfg) {
    return {
        tagline: cfg.footerTagline,
        websiteUrl: cfg.websiteUrl,
        websiteLabel: cfg.websiteLabel,
        orderEmail: cfg.orderEmail,
        facebookUrl: cfg.facebookUrl,
        facebookIconUrl: cfg.facebookIconUrl,
        instagramUrl: cfg.instagramUrl,
        instagramIconUrl: cfg.instagramIconUrl,
        copyrightText: cfg.copyrightText,
        unsubscribeLabel: cfg.unsubscribeLabel,
        logoUrl: cfg.footerLogoUrl,
    };
}
/** Template 1 HTML — Free shipping above $7. */
function buildFreeShippingEmailHtml(cfg = exports.FREE_SHIPPING_EMAIL_CONFIG) {
    const bodyRows = `
          <!-- Hero image -->
          <tr>
            <td align="center" style="padding:0;line-height:0;font-size:0;">
              <a href="${escAttr(cfg.heroImageHref)}" target="_blank" style="text-decoration:none;">
                <img class="fluid" src="${escAttr(cfg.heroImageUrl)}" width="600" alt="${escAttr(cfg.heroImageAlt)}" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
              </a>
            </td>
          </tr>
          <!-- Offer hero -->
          <tr>
            <td class="mobile-pad" align="center" bgcolor="${CREAM}" style="padding:36px 28px 32px 28px;background-color:${CREAM};border-bottom:1px solid #efe6d6;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:16px;letter-spacing:2px;text-transform:uppercase;color:${GOLD};font-weight:bold;padding-bottom:10px;">
                ${escapeHtml(cfg.offerEyebrow)}
              </div>
              <div class="hero-title" style="font-family:Georgia,'Times New Roman',serif;font-size:38px;line-height:44px;font-weight:bold;color:${RED};padding-bottom:8px;">
                ${escapeHtml(cfg.offerHeadline)}
              </div>
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:30px;font-weight:bold;color:${NAVY};padding-bottom:14px;">
                ${escapeHtml(cfg.offerSubhead)}
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:#5c5348;padding:0 8px 22px 8px;max-width:480px;margin:0 auto;">
                ${escapeHtml(cfg.offerBody)}
              </div>
              ${ctaButton(cfg.ctaHref, cfg.ctaText, { fill: RED, width: 180 })}
            </td>
          </tr>
          <!-- Benefits -->
          <tr>
            <td class="mobile-pad" style="padding:32px 20px 12px 20px;background-color:#ffffff;">
              <div class="section-title" style="font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:30px;font-weight:bold;color:${NAVY};text-align:center;padding-bottom:18px;">
                ${escapeHtml(cfg.benefitsHeading)}
              </div>
              ${benefitsRow(cfg.benefits)}
            </td>
          </tr>
          <!-- Categories -->
          <tr>
            <td class="mobile-pad" style="padding:20px 20px 8px 20px;background-color:#ffffff;">
              <div class="section-title" style="font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:30px;font-weight:bold;color:${NAVY};text-align:center;padding-bottom:6px;">
                ${escapeHtml(cfg.categoriesHeading)}
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;color:#6b5e4e;text-align:center;padding-bottom:18px;">
                ${escapeHtml(cfg.categoriesSubheading)}
              </div>
              ${twoColCards([cfg.categories[0], cfg.categories[1]])}
              ${twoColCards([cfg.categories[2], cfg.categories[3]])}
            </td>
          </tr>
          <!-- Mid CTA -->
          <tr>
            <td class="mobile-pad" style="padding:16px 24px 36px 24px;background-color:#ffffff;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background-color:${NAVY};border-radius:14px;">
                <tr>
                  <td align="center" style="padding:32px 22px;">
                    <div class="section-title" style="font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:28px;font-weight:bold;color:#ffffff;padding-bottom:8px;">
                      ${escapeHtml(cfg.midCtaHeading)}
                    </div>
                    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#e8e0d0;padding-bottom:18px;">
                      ${escapeHtml(cfg.midCtaBody)}
                    </div>
                    ${ctaButton(cfg.midCtaHref, cfg.midCtaText, { fill: GOLD, textColor: NAVY, width: 240 })}
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
    return emailShell({
        title: `${cfg.offerHeadline} | HalloweenReady`,
        preheader: cfg.preheader,
        logoUrl: cfg.logoUrl,
        logoHref: cfg.logoHref,
        bodyRows,
        footer: footerFrom(cfg),
    });
}
/** Template 2 HTML — Starting at ₹343 / $3.99. */
function buildStartingPriceEmailHtml(cfg = exports.STARTING_PRICE_EMAIL_CONFIG) {
    const sectionBlocks = cfg.sections
        .map((section) => {
        return `
          <tr>
            <td class="mobile-pad" style="padding:24px 20px 4px 20px;background-color:#ffffff;">
              <div class="section-title" style="font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:30px;font-weight:bold;color:${NAVY};text-align:center;padding-bottom:6px;">
                ${escapeHtml(section.heading)}
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;color:#6b5e4e;text-align:center;padding-bottom:16px;">
                ${escapeHtml(section.subheading)}
              </div>
              ${twoColCards([...section.cards])}
            </td>
          </tr>`;
    })
        .join("");
    const bodyRows = `
          <!-- Urgency strip -->
          <tr>
            <td align="center" bgcolor="${RED}" style="padding:10px 16px;background-color:${RED};">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:18px;font-weight:bold;letter-spacing:0.5px;color:#ffffff;">
                ${escapeHtml(cfg.urgencyText)}
              </div>
            </td>
          </tr>
          <!-- Hero image -->
          <tr>
            <td align="center" style="padding:0;line-height:0;font-size:0;">
              <a href="${escAttr(cfg.heroImageHref)}" target="_blank" style="text-decoration:none;">
                <img class="fluid" src="${escAttr(cfg.heroImageUrl)}" width="600" alt="${escAttr(cfg.heroImageAlt)}" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
              </a>
            </td>
          </tr>
          <!-- Offer hero -->
          <tr>
            <td class="mobile-pad" align="center" bgcolor="${CREAM}" style="padding:34px 28px 30px 28px;background-color:${CREAM};border-bottom:1px solid #efe6d6;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:16px;letter-spacing:2px;text-transform:uppercase;color:${GOLD};font-weight:bold;padding-bottom:10px;">
                ${escapeHtml(cfg.offerEyebrow)}
              </div>
              <div class="hero-title" style="font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:40px;font-weight:bold;color:${NAVY};padding-bottom:8px;">
                ${escapeHtml(cfg.offerHeadline)}
              </div>
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:32px;font-weight:bold;color:${RED};padding-bottom:14px;">
                ${escapeHtml(cfg.offerSubhead)}
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:#5c5348;padding:0 8px 22px 8px;">
                ${escapeHtml(cfg.offerBody)}
              </div>
              ${ctaButton(cfg.ctaHref, cfg.ctaText, { fill: RED, width: 200 })}
            </td>
          </tr>
          ${sectionBlocks}
          <!-- Mid CTA -->
          <tr>
            <td class="mobile-pad" style="padding:12px 24px 36px 24px;background-color:#ffffff;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background-color:${RED};border-radius:14px;">
                <tr>
                  <td align="center" style="padding:32px 22px;">
                    <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#ffd7de;font-weight:bold;padding-bottom:8px;">
                      ${escapeHtml(cfg.urgencyText)}
                    </div>
                    <div class="section-title" style="font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:28px;font-weight:bold;color:#ffffff;padding-bottom:8px;">
                      ${escapeHtml(cfg.midCtaHeading)}
                    </div>
                    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#ffe8ec;padding-bottom:18px;">
                      ${escapeHtml(cfg.midCtaBody)}
                    </div>
                    ${ctaButton(cfg.midCtaHref, cfg.midCtaText, { fill: GOLD, textColor: NAVY, width: 200 })}
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
    return emailShell({
        title: `${cfg.offerSubhead} | HalloweenReady`,
        preheader: cfg.preheader,
        logoUrl: cfg.logoUrl,
        logoHref: cfg.logoHref,
        bodyRows,
        footer: footerFrom(cfg),
    });
}
/** Template 3 HTML — Shop More, Save More (free shipping at $49+). */
function buildShopMoreSaveMoreEmailHtml(cfg = exports.SHOP_MORE_SAVE_MORE_EMAIL_CONFIG) {
    const categoryBlocks = [
        twoColCards([cfg.categories[0], cfg.categories[1]]),
        twoColCards([cfg.categories[2], cfg.categories[3]]),
        twoColCards([cfg.categories[4], cfg.categories[5]]),
    ].join("");
    const productBlocks = [
        twoColCards([cfg.products[0], cfg.products[1]]),
        twoColCards([cfg.products[2], cfg.products[3]]),
        twoColCards([cfg.products[4], cfg.products[5]]),
    ].join("");
    const bodyRows = `
          <!-- Hero image -->
          <tr>
            <td align="center" style="padding:0;line-height:0;font-size:0;">
              <a href="${escAttr(cfg.heroImageHref)}" target="_blank" style="text-decoration:none;">
                <img class="fluid" src="${escAttr(cfg.heroImageUrl)}" width="600" alt="${escAttr(cfg.heroImageAlt)}" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
              </a>
            </td>
          </tr>
          <!-- Offer hero -->
          <tr>
            <td class="mobile-pad" align="center" bgcolor="${CREAM}" style="padding:36px 28px 34px 28px;background-color:${CREAM};border-bottom:1px solid #efe6d6;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:16px;letter-spacing:2px;text-transform:uppercase;color:${GOLD};font-weight:bold;padding-bottom:10px;">
                ${escapeHtml(cfg.offerEyebrow)}
              </div>
              <div class="hero-title" style="font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:40px;font-weight:bold;color:${NAVY};padding-bottom:8px;">
                ${escapeHtml(cfg.offerHeadline)}
              </div>
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:32px;font-weight:bold;color:${RED};padding-bottom:10px;">
                ${escapeHtml(cfg.offerSubhead)}
              </div>
              <div style="display:inline-block;padding:8px 16px;margin-bottom:14px;background-color:${NAVY};border-radius:999px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:18px;font-weight:bold;color:#ffffff;">
                ${escapeHtml(cfg.offerThreshold)}
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:#5c5348;padding:0 8px 22px 8px;max-width:480px;margin:0 auto;">
                ${escapeHtml(cfg.offerBody)}
              </div>
              ${ctaButton(cfg.ctaHref, cfg.ctaText, { fill: RED, width: 200, pad: "16px 36px", fontSize: "17px" })}
            </td>
          </tr>
          <!-- Categories -->
          <tr>
            <td class="mobile-pad" style="padding:28px 20px 8px 20px;background-color:#ffffff;">
              <div class="section-title" style="font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:30px;font-weight:bold;color:${NAVY};text-align:center;padding-bottom:6px;">
                ${escapeHtml(cfg.categoriesHeading)}
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;color:#6b5e4e;text-align:center;padding-bottom:18px;">
                ${escapeHtml(cfg.categoriesSubheading)}
              </div>
              ${categoryBlocks}
            </td>
          </tr>
          <!-- Featured products -->
          <tr>
            <td class="mobile-pad" style="padding:16px 20px 8px 20px;background-color:#ffffff;">
              <div class="section-title" style="font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:30px;font-weight:bold;color:${NAVY};text-align:center;padding-bottom:6px;">
                ${escapeHtml(cfg.productsHeading)}
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;color:#6b5e4e;text-align:center;padding-bottom:18px;">
                ${escapeHtml(cfg.productsSubheading)}
              </div>
              ${productBlocks}
            </td>
          </tr>
          <!-- Why Choose -->
          <tr>
            <td class="mobile-pad" style="padding:24px 20px 12px 20px;background-color:#ffffff;">
              <div class="section-title" style="font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:30px;font-weight:bold;color:${NAVY};text-align:center;padding-bottom:6px;">
                ${escapeHtml(cfg.whyHeading)}
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;color:#6b5e4e;text-align:center;padding-bottom:18px;">
                ${escapeHtml(cfg.whySubheading)}
              </div>
              ${benefitsRow(cfg.whyBenefits)}
            </td>
          </tr>
          <!-- Festive mid CTA -->
          <tr>
            <td class="mobile-pad" style="padding:12px 24px 36px 24px;background-color:#ffffff;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background:linear-gradient(135deg, ${NAVY} 0%, #2a5080 100%);background-color:${NAVY};border-radius:14px;">
                <tr>
                  <td align="center" style="padding:34px 22px;">
                    <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#f0d78c;font-weight:bold;padding-bottom:8px;">
                      ${escapeHtml(cfg.offerThreshold)}
                    </div>
                    <div class="section-title" style="font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:28px;font-weight:bold;color:#ffffff;padding-bottom:8px;">
                      ${escapeHtml(cfg.midCtaHeading)}
                    </div>
                    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#e8e0d0;padding-bottom:18px;">
                      ${escapeHtml(cfg.midCtaBody)}
                    </div>
                    ${ctaButton(cfg.midCtaHref, cfg.midCtaText, { fill: GOLD, textColor: NAVY, width: 200 })}
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
    return emailShell({
        title: `${cfg.offerHeadline} | HalloweenReady`,
        preheader: cfg.preheader,
        logoUrl: cfg.logoUrl,
        logoHref: cfg.logoHref,
        logoTagline: cfg.logoTagline,
        bodyRows,
        footer: footerFrom(cfg),
    });
}
const COLLECTION_CARD_CTA = { buttonFill: GOLD, buttonColor: "#ffffff" };
/** Flagship collection mailer — edit HALLOWEEN_COLLECTION_EMAIL_CONFIG for future campaigns. */
function buildHalloweenCollectionEmailHtml(cfg = exports.HALLOWEEN_COLLECTION_EMAIL_CONFIG) {
    const bodyRows = `
          <!-- Promo strip -->
          <tr>
            <td align="center" bgcolor="${RED}" style="padding:11px 16px;background-color:${RED};">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:18px;font-weight:bold;letter-spacing:0.4px;color:#ffffff;">
                ${escapeHtml(cfg.promoStrip)}
              </div>
            </td>
          </tr>
          <!-- Hero banner -->
          <tr>
            <td align="center" style="padding:0;line-height:0;font-size:0;">
              <a href="${escAttr(cfg.heroImageHref)}" target="_blank" style="text-decoration:none;">
                <img class="fluid" src="${escAttr(cfg.heroImageUrl)}" width="600" alt="${escAttr(cfg.heroImageAlt)}" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
              </a>
            </td>
          </tr>
          <!-- Hero copy -->
          <tr>
            <td class="mobile-pad" align="center" bgcolor="${NAVY}" style="padding:34px 28px 32px 28px;background-color:${NAVY};">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;letter-spacing:2.2px;text-transform:uppercase;color:${GOLD};font-weight:bold;padding-bottom:10px;">
                ${escapeHtml(cfg.heroEyebrow)}
              </div>
              <div class="hero-title" style="font-family:Georgia,'Times New Roman',serif;font-size:32px;line-height:40px;font-weight:bold;color:#ffffff;padding-bottom:8px;">
                ${escapeHtml(cfg.heroHeadline)}
              </div>
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:26px;color:#f0d78c;padding-bottom:12px;">
                ${escapeHtml(cfg.heroSubhead)}
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:#d7dde8;padding:0 4px 22px 4px;max-width:480px;margin:0 auto;">
                ${escapeHtml(cfg.heroBody)}
              </div>
              ${ctaButton(cfg.heroButtonHref, cfg.heroButtonText, { fill: GOLD, textColor: "#ffffff", width: 180, pad: "16px 36px", fontSize: "16px" })}
            </td>
          </tr>
          <!-- Featured products -->
          <tr>
            <td class="mobile-pad" style="padding:32px 20px 8px 20px;background-color:#ffffff;">
              <div class="section-title" style="font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:30px;font-weight:bold;color:${NAVY};text-align:center;padding-bottom:6px;">
                ${escapeHtml(cfg.productsHeading)}
              </div>
              <div style="width:56px;height:3px;background-color:${GOLD};margin:0 auto 12px auto;font-size:0;line-height:0;">&nbsp;</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;color:#6b5e4e;text-align:center;padding-bottom:18px;">
                ${escapeHtml(cfg.productsSubheading)}
              </div>
              ${cardGrid(cfg.products, COLLECTION_CARD_CTA)}
            </td>
          </tr>
          <!-- Seasonal offer -->
          <tr>
            <td class="mobile-pad" style="padding:8px 24px 20px 24px;background-color:#ffffff;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background-color:${CREAM};border:1px solid #efe6d6;border-radius:14px;">
                <tr>
                  <td align="center" style="padding:28px 22px;">
                    <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1.8px;text-transform:uppercase;color:${RED};font-weight:bold;padding-bottom:8px;">
                      ${escapeHtml(cfg.offerHeading)}
                    </div>
                    <div class="section-title" style="font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:30px;font-weight:bold;color:${NAVY};padding-bottom:10px;">
                      ${escapeHtml(cfg.offerTitle)}
                    </div>
                    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#5c5348;padding-bottom:18px;">
                      ${escapeHtml(cfg.offerBody)}
                    </div>
                    ${ctaButton(cfg.offerButtonHref, cfg.offerButtonText, { fill: RED, width: 220 })}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Categories -->
          <tr>
            <td class="mobile-pad" style="padding:16px 20px 8px 20px;background-color:#ffffff;">
              <div class="section-title" style="font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:30px;font-weight:bold;color:${NAVY};text-align:center;padding-bottom:6px;">
                ${escapeHtml(cfg.categoriesHeading)}
              </div>
              <div style="width:56px;height:3px;background-color:${GOLD};margin:0 auto 12px auto;font-size:0;line-height:0;">&nbsp;</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;color:#6b5e4e;text-align:center;padding-bottom:18px;">
                ${escapeHtml(cfg.categoriesSubheading)}
              </div>
              ${cardGrid(cfg.categories, COLLECTION_CARD_CTA)}
            </td>
          </tr>
          <!-- Hampers -->
          <tr>
            <td class="mobile-pad" style="padding:16px 20px 8px 20px;background-color:#fffaf2;">
              <div class="section-title" style="font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:30px;font-weight:bold;color:${NAVY};text-align:center;padding-bottom:6px;">
                ${escapeHtml(cfg.hampersHeading)}
              </div>
              <div style="width:56px;height:3px;background-color:${GOLD};margin:0 auto 12px auto;font-size:0;line-height:0;">&nbsp;</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;color:#6b5e4e;text-align:center;padding-bottom:18px;">
                ${escapeHtml(cfg.hampersSubheading)}
              </div>
              ${cardGrid(cfg.hampers, COLLECTION_CARD_CTA)}
            </td>
          </tr>
          <!-- Why shop -->
          <tr>
            <td class="mobile-pad" style="padding:24px 20px 12px 20px;background-color:#ffffff;">
              <div class="section-title" style="font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:30px;font-weight:bold;color:${NAVY};text-align:center;padding-bottom:6px;">
                ${escapeHtml(cfg.whyHeading)}
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;color:#6b5e4e;text-align:center;padding-bottom:18px;">
                ${escapeHtml(cfg.whySubheading)}
              </div>
              ${benefitsRow(cfg.whyBenefits)}
            </td>
          </tr>
          <!-- Closing CTA -->
          <tr>
            <td class="mobile-pad" style="padding:8px 24px 36px 24px;background-color:#ffffff;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background-color:${NAVY};border-radius:14px;">
                <tr>
                  <td align="center" style="padding:34px 22px;">
                    <div class="section-title" style="font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:28px;font-weight:bold;color:#ffffff;padding-bottom:8px;">
                      ${escapeHtml(cfg.midCtaHeading)}
                    </div>
                    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#e8e0d0;padding-bottom:18px;">
                      ${escapeHtml(cfg.midCtaBody)}
                    </div>
                    ${ctaButton(cfg.midCtaHref, cfg.midCtaText, { fill: GOLD, textColor: "#ffffff", width: 180 })}
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
    return emailShell({
        title: `${cfg.heroHeadline} | HalloweenReady`,
        preheader: cfg.preheader,
        logoUrl: cfg.logoUrl,
        logoHref: cfg.logoHref,
        logoAlt: cfg.logoAlt,
        logoTagline: cfg.logoTagline,
        pageBg: PAGE_BG_HALLOWEEN,
        headerBg: "#fffdf8",
        barLeft: GOLD,
        barRight: RED,
        taglineColor: NAVY,
        bodyRows,
        footer: footerFrom(cfg),
    });
}
