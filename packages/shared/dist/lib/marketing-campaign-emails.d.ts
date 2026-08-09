/**
 * Conversion-focused marketing email templates for HalloweenReady.
 *
 * Edit the CONFIG objects below to update images, copy, CTAs, and links —
 * then rebuild / open Admin → Email → Templates to sync starters.
 *
 * Both builders emit table + inline-CSS HTML for Gmail / Outlook / Apple Mail.
 */
export type CampaignCard = {
    name: string;
    description: string;
    imageUrl: string;
    href: string;
    buttonText: string;
    badge?: string;
    priceLabel?: string;
};
export type CampaignBenefit = {
    icon: string;
    title: string;
    description: string;
};
/** ═══════════════ TEMPLATE 1 — Free Shipping Above $7 ═══════════════ */
export declare const FREE_SHIPPING_EMAIL_CONFIG: {
    readonly templateId: "free-shipping-above-7";
    readonly name: "Free Shipping Above $7";
    readonly subject: "FREE SHIPPING on Orders Above $7 — HalloweenReady";
    readonly preheader: "Free shipping on orders above $7. Halloween decorations & costumes, ships from the USA.";
    readonly logoUrl: "https://www.halloweenready.com/logo.png";
    readonly logoHref: "https://www.halloweenready.com";
    readonly heroImageUrl: "https://www.halloweenready.com/banners/bannerpage1.png";
    readonly heroImageHref: "https://www.halloweenready.com/products";
    readonly heroImageAlt: "HalloweenReady — Free shipping on Halloween orders above $7";
    readonly offerEyebrow: "HALLOWEEN OFFER";
    readonly offerHeadline: "FREE SHIPPING";
    readonly offerSubhead: "On Orders Above $7";
    readonly offerBody: "Stock up on Halloween decorations, costumes, and party supplies — and enjoy free domestic shipping when your order is $7 or more. Ships from the USA. No customs delays.";
    readonly ctaText: "Shop Halloween";
    readonly ctaHref: "https://www.halloweenready.com/products";
    readonly benefitsHeading: "Why Shop HalloweenReady";
    readonly benefits: {
        icon: string;
        title: string;
        description: string;
    }[];
    readonly categoriesHeading: "Featured Categories";
    readonly categoriesSubheading: "Everything you need for a spooky season.";
    readonly categories: {
        name: string;
        description: string;
        imageUrl: string;
        href: string;
        buttonText: string;
    }[];
    readonly midCtaHeading: "Ready for Halloween?";
    readonly midCtaBody: "Orders $7+ ship free across the USA. Shop the seasonal collection today.";
    readonly midCtaText: "Shop Free Shipping Deals";
    readonly midCtaHref: "https://www.halloweenready.com/products";
    readonly footerTagline: "Halloween Decorations & Party Supplies";
    readonly websiteUrl: "https://www.halloweenready.com";
    readonly websiteLabel: "www.halloweenready.com";
    readonly orderEmail: "order@halloweenready.com";
    readonly facebookUrl: "https://www.facebook.com/halloweenready/";
    readonly facebookIconUrl: "https://www.halloweenready.com/email-templates/icons/facebook.png";
    readonly instagramUrl: "https://www.instagram.com/halloweenready/";
    readonly instagramIconUrl: "https://www.halloweenready.com/email-templates/icons/instagram.png";
    readonly copyrightText: "© 2026 HalloweenReady. All Rights Reserved.";
    readonly unsubscribeLabel: "Unsubscribe";
};
/** ═══════════════ TEMPLATE 2 — Starting price promo ═══════════════ */
export declare const STARTING_PRICE_EMAIL_CONFIG: {
    readonly templateId: "halloween-starting-deals";
    readonly name: "Halloween Starting Deals";
    readonly subject: "Halloween Finds Starting at Great Prices — Limited Time";
    readonly preheader: "Limited time: Halloween decorations and costumes at great starting prices.";
    readonly logoUrl: "https://www.halloweenready.com/logo.png";
    readonly logoHref: "https://www.halloweenready.com";
    readonly heroImageUrl: "https://www.halloweenready.com/banners/bannerpage1.png";
    readonly heroImageHref: "https://www.halloweenready.com/products";
    readonly heroImageAlt: "Halloween deals — HalloweenReady";
    readonly urgencyText: "⚡ Limited Time Offer";
    readonly offerEyebrow: "HALLOWEEN DEAL";
    readonly offerHeadline: "Spooky Season Deals";
    readonly offerSubhead: "Decorations, costumes & party supplies";
    readonly offerBody: "Get Halloween-ready without stretching your budget. Explore decorations, costumes, and party supplies with festive packaging and USA delivery.";
    readonly ctaText: "Shop Deals";
    readonly ctaHref: "https://www.halloweenready.com/products";
    readonly sections: readonly [{
        readonly heading: "Best Sellers";
        readonly subheading: "Most-loved Halloween picks.";
        readonly cards: {
            name: string;
            description: string;
            imageUrl: string;
            href: string;
            buttonText: string;
            badge: string;
            priceLabel: string;
        }[];
    }, {
        readonly heading: "Party Essentials";
        readonly subheading: "Supplies to host a memorable night.";
        readonly cards: {
            name: string;
            description: string;
            imageUrl: string;
            href: string;
            buttonText: string;
            badge: string;
            priceLabel: string;
        }[];
    }, {
        readonly heading: "Atmosphere";
        readonly subheading: "Candles, fragrance, and wearable accents.";
        readonly cards: {
            name: string;
            description: string;
            imageUrl: string;
            href: string;
            buttonText: string;
            badge: string;
            priceLabel: string;
        }[];
    }, {
        readonly heading: "More to Explore";
        readonly subheading: "Jewelry, paper crafts, and finishing touches.";
        readonly cards: {
            name: string;
            description: string;
            imageUrl: string;
            href: string;
            buttonText: string;
            badge: string;
            priceLabel: string;
        }[];
    }];
    readonly midCtaHeading: "Don't Miss These Halloween Deals";
    readonly midCtaBody: "Order decorations and costumes early for guaranteed pre-Halloween delivery.";
    readonly midCtaText: "Shop Halloween";
    readonly midCtaHref: "https://www.halloweenready.com/products";
    readonly footerTagline: "Halloween Decorations & Party Supplies";
    readonly websiteUrl: "https://www.halloweenready.com";
    readonly websiteLabel: "www.halloweenready.com";
    readonly orderEmail: "order@halloweenready.com";
    readonly facebookUrl: "https://www.facebook.com/halloweenready/";
    readonly facebookIconUrl: "https://www.halloweenready.com/email-templates/icons/facebook.png";
    readonly instagramUrl: "https://www.instagram.com/halloweenready/";
    readonly instagramIconUrl: "https://www.halloweenready.com/email-templates/icons/instagram.png";
    readonly copyrightText: "© 2026 HalloweenReady. All Rights Reserved.";
    readonly unsubscribeLabel: "Unsubscribe";
};
/** ═══════════════ TEMPLATE 3 — Shop More, Save More ═══════════════ */
export declare const SHOP_MORE_SAVE_MORE_EMAIL_CONFIG: {
    readonly templateId: "shop-more-save-more";
    readonly name: "Shop More, Save More — Halloween";
    readonly subject: "Shop More, Save More on Halloween Essentials";
    readonly preheader: "Shop more, save more on Halloween decorations, costumes, and party supplies with USA delivery.";
    readonly logoUrl: "https://www.halloweenready.com/logo.png";
    readonly logoHref: "https://halloweenready.com";
    readonly logoTagline: "Halloween Decorations & Party Supplies";
    readonly heroImageUrl: "https://www.halloweenready.com/banners/bannerpage1.png";
    readonly heroImageHref: "https://halloweenready.com";
    readonly heroImageAlt: "Shop More, Save More — HalloweenReady";
    readonly offerEyebrow: "HALLOWEEN SPECIAL";
    readonly offerHeadline: "Shop More, Save More";
    readonly offerSubhead: "Stock up for Halloween night";
    readonly offerThreshold: "Cart Value Above $10.99";
    readonly offerBody: "Celebrate Halloween with decorations, costumes, and party supplies — delivered across America. Add more to your cart and unlock seasonal savings.";
    readonly ctaText: "Shop Now";
    readonly ctaHref: "https://halloweenready.com";
    readonly categoriesHeading: "Shop by Category";
    readonly categoriesSubheading: "Tap a collection to find the perfect Halloween picks.";
    readonly categories: {
        name: string;
        description: string;
        imageUrl: string;
        href: string;
        buttonText: string;
    }[];
    readonly productsHeading: "Featured Picks";
    readonly productsSubheading: "Handpicked Halloween favorites — tap Shop Now to order.";
    readonly products: {
        name: string;
        description: string;
        imageUrl: string;
        href: string;
        buttonText: string;
        priceLabel: string;
        badge: string;
    }[];
    readonly whyHeading: "Why Choose HalloweenReady";
    readonly whySubheading: "Trusted for Halloween decorations and party supplies with USA delivery.";
    readonly whyBenefits: {
        icon: string;
        title: string;
        description: string;
    }[];
    readonly midCtaHeading: "Don't Miss This Halloween Offer";
    readonly midCtaBody: "Shop more, save more when your cart is above $10.99. Get Halloween-ready — order today.";
    readonly midCtaText: "Shop Now";
    readonly midCtaHref: "https://halloweenready.com";
    readonly footerTagline: "Halloween Decorations & Party Supplies";
    readonly footerLogoUrl: "https://www.halloweenready.com/logo.png";
    readonly websiteUrl: "https://halloweenready.com";
    readonly websiteLabel: "halloweenready.com";
    readonly orderEmail: "order@halloweenready.com";
    readonly facebookUrl: "https://www.facebook.com/halloweenready/";
    readonly facebookIconUrl: "https://www.halloweenready.com/email-templates/icons/facebook.png";
    readonly instagramUrl: "https://www.instagram.com/halloweenready/";
    readonly instagramIconUrl: "https://www.halloweenready.com/email-templates/icons/instagram.png";
    readonly copyrightText: "© 2026 HalloweenReady. All Rights Reserved.";
    readonly unsubscribeLabel: "Unsubscribe";
};
/** Template 1 HTML — Free shipping above $7. */
export declare function buildFreeShippingEmailHtml(cfg?: typeof FREE_SHIPPING_EMAIL_CONFIG): string;
/** Template 2 HTML — Starting at ₹343 / $3.99. */
export declare function buildStartingPriceEmailHtml(cfg?: typeof STARTING_PRICE_EMAIL_CONFIG): string;
/** Template 3 HTML — Shop More, Save More (cart above $10.99 / ₹1,046). */
export declare function buildShopMoreSaveMoreEmailHtml(cfg?: typeof SHOP_MORE_SAVE_MORE_EMAIL_CONFIG): string;
