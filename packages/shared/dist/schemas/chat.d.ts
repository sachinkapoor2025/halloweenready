import { z } from "zod";
export declare const CHAT_INTENTS: readonly ["product_search", "category_search", "product_comparison", "product_information", "price_query", "shipping_query", "order_query", "return_query", "payment_query", "size_query", "styling_help", "halloween_ideas", "location_query", "general_halloween", "support", "navigation", "surprise", "party_planner", "start_over", "smalltalk"];
export type ChatIntent = (typeof CHAT_INTENTS)[number];
export declare const shoppingStateSchema: z.ZodObject<{
    category: z.ZodOptional<z.ZodString>;
    categorySlug: z.ZodOptional<z.ZodString>;
    subcategory: z.ZodOptional<z.ZodString>;
    audience: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodString>;
    ageGroup: z.ZodOptional<z.ZodString>;
    theme: z.ZodOptional<z.ZodString>;
    style: z.ZodOptional<z.ZodString>;
    occasion: z.ZodOptional<z.ZodString>;
    budgetMin: z.ZodOptional<z.ZodNumber>;
    budgetMax: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    size: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    shippingRequirement: z.ZodOptional<z.ZodString>;
    query: z.ZodOptional<z.ZodString>;
    preferences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    shownSlugs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    selectedSlug: z.ZodOptional<z.ZodString>;
    partySize: z.ZodOptional<z.ZodNumber>;
    indoorOutdoor: z.ZodOptional<z.ZodEnum<["indoor", "outdoor", "both"]>>;
}, "strip", z.ZodTypeAny, {
    categorySlug?: string | undefined;
    size?: string | undefined;
    country?: string | undefined;
    category?: string | undefined;
    city?: string | undefined;
    subcategory?: string | undefined;
    audience?: string | undefined;
    gender?: string | undefined;
    ageGroup?: string | undefined;
    theme?: string | undefined;
    style?: string | undefined;
    occasion?: string | undefined;
    budgetMin?: number | undefined;
    budgetMax?: number | undefined;
    color?: string | undefined;
    region?: string | undefined;
    shippingRequirement?: string | undefined;
    query?: string | undefined;
    preferences?: string[] | undefined;
    shownSlugs?: string[] | undefined;
    selectedSlug?: string | undefined;
    partySize?: number | undefined;
    indoorOutdoor?: "indoor" | "outdoor" | "both" | undefined;
}, {
    categorySlug?: string | undefined;
    size?: string | undefined;
    country?: string | undefined;
    category?: string | undefined;
    city?: string | undefined;
    subcategory?: string | undefined;
    audience?: string | undefined;
    gender?: string | undefined;
    ageGroup?: string | undefined;
    theme?: string | undefined;
    style?: string | undefined;
    occasion?: string | undefined;
    budgetMin?: number | undefined;
    budgetMax?: number | undefined;
    color?: string | undefined;
    region?: string | undefined;
    shippingRequirement?: string | undefined;
    query?: string | undefined;
    preferences?: string[] | undefined;
    shownSlugs?: string[] | undefined;
    selectedSlug?: string | undefined;
    partySize?: number | undefined;
    indoorOutdoor?: "indoor" | "outdoor" | "both" | undefined;
}>;
export type ShoppingState = z.infer<typeof shoppingStateSchema>;
export declare const chatQuickActionSchema: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodString;
    message: z.ZodString;
    href: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    message: string;
    label: string;
    href?: string | undefined;
}, {
    id: string;
    message: string;
    label: string;
    href?: string | undefined;
}>;
export type ChatQuickAction = z.infer<typeof chatQuickActionSchema>;
export declare const assistantProductSchema: z.ZodObject<{
    slug: z.ZodString;
    name: z.ZodString;
    image: z.ZodOptional<z.ZodString>;
    price: z.ZodNumber;
    compareAtPrice: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodDefault<z.ZodString>;
    categorySlug: z.ZodOptional<z.ZodString>;
    url: z.ZodString;
    inventory: z.ZodOptional<z.ZodNumber>;
    available: z.ZodOptional<z.ZodBoolean>;
    badge: z.ZodOptional<z.ZodString>;
    variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
        vid: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        inventory: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        vid: string;
        name?: string | undefined;
        inventory?: number | undefined;
    }, {
        vid: string;
        name?: string | undefined;
        inventory?: number | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    price: number;
    currency: string;
    slug: string;
    url: string;
    image?: string | undefined;
    compareAtPrice?: number | undefined;
    categorySlug?: string | undefined;
    inventory?: number | undefined;
    available?: boolean | undefined;
    badge?: string | undefined;
    variants?: {
        vid: string;
        name?: string | undefined;
        inventory?: number | undefined;
    }[] | undefined;
}, {
    name: string;
    price: number;
    slug: string;
    url: string;
    currency?: string | undefined;
    image?: string | undefined;
    compareAtPrice?: number | undefined;
    categorySlug?: string | undefined;
    inventory?: number | undefined;
    available?: boolean | undefined;
    badge?: string | undefined;
    variants?: {
        vid: string;
        name?: string | undefined;
        inventory?: number | undefined;
    }[] | undefined;
}>;
export type AssistantProduct = z.infer<typeof assistantProductSchema>;
export declare const chatBlockSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"text">;
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "text";
    text: string;
}, {
    type: "text";
    text: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"quick_actions">;
    actions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
        message: z.ZodString;
        href: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        message: string;
        label: string;
        href?: string | undefined;
    }, {
        id: string;
        message: string;
        label: string;
        href?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "quick_actions";
    actions: {
        id: string;
        message: string;
        label: string;
        href?: string | undefined;
    }[];
}, {
    type: "quick_actions";
    actions: {
        id: string;
        message: string;
        label: string;
        href?: string | undefined;
    }[];
}>, z.ZodObject<{
    type: z.ZodLiteral<"product_carousel">;
    heading: z.ZodOptional<z.ZodString>;
    products: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        name: z.ZodString;
        image: z.ZodOptional<z.ZodString>;
        price: z.ZodNumber;
        compareAtPrice: z.ZodOptional<z.ZodNumber>;
        currency: z.ZodDefault<z.ZodString>;
        categorySlug: z.ZodOptional<z.ZodString>;
        url: z.ZodString;
        inventory: z.ZodOptional<z.ZodNumber>;
        available: z.ZodOptional<z.ZodBoolean>;
        badge: z.ZodOptional<z.ZodString>;
        variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
            vid: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            inventory: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            vid: string;
            name?: string | undefined;
            inventory?: number | undefined;
        }, {
            vid: string;
            name?: string | undefined;
            inventory?: number | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        price: number;
        currency: string;
        slug: string;
        url: string;
        image?: string | undefined;
        compareAtPrice?: number | undefined;
        categorySlug?: string | undefined;
        inventory?: number | undefined;
        available?: boolean | undefined;
        badge?: string | undefined;
        variants?: {
            vid: string;
            name?: string | undefined;
            inventory?: number | undefined;
        }[] | undefined;
    }, {
        name: string;
        price: number;
        slug: string;
        url: string;
        currency?: string | undefined;
        image?: string | undefined;
        compareAtPrice?: number | undefined;
        categorySlug?: string | undefined;
        inventory?: number | undefined;
        available?: boolean | undefined;
        badge?: string | undefined;
        variants?: {
            vid: string;
            name?: string | undefined;
            inventory?: number | undefined;
        }[] | undefined;
    }>, "many">;
    viewAllHref: z.ZodOptional<z.ZodString>;
    viewAllLabel: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "product_carousel";
    products: {
        name: string;
        price: number;
        currency: string;
        slug: string;
        url: string;
        image?: string | undefined;
        compareAtPrice?: number | undefined;
        categorySlug?: string | undefined;
        inventory?: number | undefined;
        available?: boolean | undefined;
        badge?: string | undefined;
        variants?: {
            vid: string;
            name?: string | undefined;
            inventory?: number | undefined;
        }[] | undefined;
    }[];
    heading?: string | undefined;
    viewAllHref?: string | undefined;
    viewAllLabel?: string | undefined;
}, {
    type: "product_carousel";
    products: {
        name: string;
        price: number;
        slug: string;
        url: string;
        currency?: string | undefined;
        image?: string | undefined;
        compareAtPrice?: number | undefined;
        categorySlug?: string | undefined;
        inventory?: number | undefined;
        available?: boolean | undefined;
        badge?: string | undefined;
        variants?: {
            vid: string;
            name?: string | undefined;
            inventory?: number | undefined;
        }[] | undefined;
    }[];
    heading?: string | undefined;
    viewAllHref?: string | undefined;
    viewAllLabel?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"product_card">;
    product: z.ZodObject<{
        slug: z.ZodString;
        name: z.ZodString;
        image: z.ZodOptional<z.ZodString>;
        price: z.ZodNumber;
        compareAtPrice: z.ZodOptional<z.ZodNumber>;
        currency: z.ZodDefault<z.ZodString>;
        categorySlug: z.ZodOptional<z.ZodString>;
        url: z.ZodString;
        inventory: z.ZodOptional<z.ZodNumber>;
        available: z.ZodOptional<z.ZodBoolean>;
        badge: z.ZodOptional<z.ZodString>;
        variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
            vid: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            inventory: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            vid: string;
            name?: string | undefined;
            inventory?: number | undefined;
        }, {
            vid: string;
            name?: string | undefined;
            inventory?: number | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        price: number;
        currency: string;
        slug: string;
        url: string;
        image?: string | undefined;
        compareAtPrice?: number | undefined;
        categorySlug?: string | undefined;
        inventory?: number | undefined;
        available?: boolean | undefined;
        badge?: string | undefined;
        variants?: {
            vid: string;
            name?: string | undefined;
            inventory?: number | undefined;
        }[] | undefined;
    }, {
        name: string;
        price: number;
        slug: string;
        url: string;
        currency?: string | undefined;
        image?: string | undefined;
        compareAtPrice?: number | undefined;
        categorySlug?: string | undefined;
        inventory?: number | undefined;
        available?: boolean | undefined;
        badge?: string | undefined;
        variants?: {
            vid: string;
            name?: string | undefined;
            inventory?: number | undefined;
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "product_card";
    product: {
        name: string;
        price: number;
        currency: string;
        slug: string;
        url: string;
        image?: string | undefined;
        compareAtPrice?: number | undefined;
        categorySlug?: string | undefined;
        inventory?: number | undefined;
        available?: boolean | undefined;
        badge?: string | undefined;
        variants?: {
            vid: string;
            name?: string | undefined;
            inventory?: number | undefined;
        }[] | undefined;
    };
}, {
    type: "product_card";
    product: {
        name: string;
        price: number;
        slug: string;
        url: string;
        currency?: string | undefined;
        image?: string | undefined;
        compareAtPrice?: number | undefined;
        categorySlug?: string | undefined;
        inventory?: number | undefined;
        available?: boolean | undefined;
        badge?: string | undefined;
        variants?: {
            vid: string;
            name?: string | undefined;
            inventory?: number | undefined;
        }[] | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"category_card">;
    title: z.ZodString;
    href: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "category_card";
    title: string;
    href: string;
    subtitle?: string | undefined;
}, {
    type: "category_card";
    title: string;
    href: string;
    subtitle?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"link">;
    label: z.ZodString;
    href: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "link";
    href: string;
    label: string;
}, {
    type: "link";
    href: string;
    label: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"comparison">;
    products: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        name: z.ZodString;
        image: z.ZodOptional<z.ZodString>;
        price: z.ZodNumber;
        compareAtPrice: z.ZodOptional<z.ZodNumber>;
        currency: z.ZodDefault<z.ZodString>;
        categorySlug: z.ZodOptional<z.ZodString>;
        url: z.ZodString;
        inventory: z.ZodOptional<z.ZodNumber>;
        available: z.ZodOptional<z.ZodBoolean>;
        badge: z.ZodOptional<z.ZodString>;
        variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
            vid: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            inventory: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            vid: string;
            name?: string | undefined;
            inventory?: number | undefined;
        }, {
            vid: string;
            name?: string | undefined;
            inventory?: number | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        price: number;
        currency: string;
        slug: string;
        url: string;
        image?: string | undefined;
        compareAtPrice?: number | undefined;
        categorySlug?: string | undefined;
        inventory?: number | undefined;
        available?: boolean | undefined;
        badge?: string | undefined;
        variants?: {
            vid: string;
            name?: string | undefined;
            inventory?: number | undefined;
        }[] | undefined;
    }, {
        name: string;
        price: number;
        slug: string;
        url: string;
        currency?: string | undefined;
        image?: string | undefined;
        compareAtPrice?: number | undefined;
        categorySlug?: string | undefined;
        inventory?: number | undefined;
        available?: boolean | undefined;
        badge?: string | undefined;
        variants?: {
            vid: string;
            name?: string | undefined;
            inventory?: number | undefined;
        }[] | undefined;
    }>, "many">;
    summary: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "comparison";
    products: {
        name: string;
        price: number;
        currency: string;
        slug: string;
        url: string;
        image?: string | undefined;
        compareAtPrice?: number | undefined;
        categorySlug?: string | undefined;
        inventory?: number | undefined;
        available?: boolean | undefined;
        badge?: string | undefined;
        variants?: {
            vid: string;
            name?: string | undefined;
            inventory?: number | undefined;
        }[] | undefined;
    }[];
    summary: string;
}, {
    type: "comparison";
    products: {
        name: string;
        price: number;
        slug: string;
        url: string;
        currency?: string | undefined;
        image?: string | undefined;
        compareAtPrice?: number | undefined;
        categorySlug?: string | undefined;
        inventory?: number | undefined;
        available?: boolean | undefined;
        badge?: string | undefined;
        variants?: {
            vid: string;
            name?: string | undefined;
            inventory?: number | undefined;
        }[] | undefined;
    }[];
    summary: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"error">;
    text: z.ZodString;
    href: z.ZodOptional<z.ZodString>;
    hrefLabel: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "error";
    text: string;
    href?: string | undefined;
    hrefLabel?: string | undefined;
}, {
    type: "error";
    text: string;
    href?: string | undefined;
    hrefLabel?: string | undefined;
}>]>;
export type ChatBlock = z.infer<typeof chatBlockSchema>;
export declare const chatPageContextSchema: z.ZodObject<{
    path: z.ZodString;
    productSlug: z.ZodOptional<z.ZodString>;
    productName: z.ZodOptional<z.ZodString>;
    categorySlug: z.ZodOptional<z.ZodString>;
    searchQuery: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    path: string;
    productSlug?: string | undefined;
    categorySlug?: string | undefined;
    productName?: string | undefined;
    searchQuery?: string | undefined;
}, {
    path: string;
    productSlug?: string | undefined;
    categorySlug?: string | undefined;
    productName?: string | undefined;
    searchQuery?: string | undefined;
}>;
export declare const chatCartItemSchema: z.ZodObject<{
    slug: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    slug: string;
    name?: string | undefined;
}, {
    slug: string;
    name?: string | undefined;
}>;
export declare const chatMarketContextSchema: z.ZodObject<{
    countryCode: z.ZodOptional<z.ZodString>;
    postalCode: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    countryCode?: string | undefined;
    city?: string | undefined;
    region?: string | undefined;
    postalCode?: string | undefined;
}, {
    countryCode?: string | undefined;
    city?: string | undefined;
    region?: string | undefined;
    postalCode?: string | undefined;
}>;
export declare const chatMessageSchema: z.ZodObject<{
    role: z.ZodEnum<["user", "assistant"]>;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    role: "user" | "assistant";
    content: string;
}, {
    role: "user" | "assistant";
    content: string;
}>;
export declare const chatRequestSchema: z.ZodObject<{
    messages: z.ZodDefault<z.ZodArray<z.ZodObject<{
        role: z.ZodEnum<["user", "assistant"]>;
        content: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        role: "user" | "assistant";
        content: string;
    }, {
        role: "user" | "assistant";
        content: string;
    }>, "many">>;
    page: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodOptional<z.ZodString>;
    shoppingState: z.ZodOptional<z.ZodObject<{
        category: z.ZodOptional<z.ZodString>;
        categorySlug: z.ZodOptional<z.ZodString>;
        subcategory: z.ZodOptional<z.ZodString>;
        audience: z.ZodOptional<z.ZodString>;
        gender: z.ZodOptional<z.ZodString>;
        ageGroup: z.ZodOptional<z.ZodString>;
        theme: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodString>;
        occasion: z.ZodOptional<z.ZodString>;
        budgetMin: z.ZodOptional<z.ZodNumber>;
        budgetMax: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        size: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        region: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        shippingRequirement: z.ZodOptional<z.ZodString>;
        query: z.ZodOptional<z.ZodString>;
        preferences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        shownSlugs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        selectedSlug: z.ZodOptional<z.ZodString>;
        partySize: z.ZodOptional<z.ZodNumber>;
        indoorOutdoor: z.ZodOptional<z.ZodEnum<["indoor", "outdoor", "both"]>>;
    }, "strip", z.ZodTypeAny, {
        categorySlug?: string | undefined;
        size?: string | undefined;
        country?: string | undefined;
        category?: string | undefined;
        city?: string | undefined;
        subcategory?: string | undefined;
        audience?: string | undefined;
        gender?: string | undefined;
        ageGroup?: string | undefined;
        theme?: string | undefined;
        style?: string | undefined;
        occasion?: string | undefined;
        budgetMin?: number | undefined;
        budgetMax?: number | undefined;
        color?: string | undefined;
        region?: string | undefined;
        shippingRequirement?: string | undefined;
        query?: string | undefined;
        preferences?: string[] | undefined;
        shownSlugs?: string[] | undefined;
        selectedSlug?: string | undefined;
        partySize?: number | undefined;
        indoorOutdoor?: "indoor" | "outdoor" | "both" | undefined;
    }, {
        categorySlug?: string | undefined;
        size?: string | undefined;
        country?: string | undefined;
        category?: string | undefined;
        city?: string | undefined;
        subcategory?: string | undefined;
        audience?: string | undefined;
        gender?: string | undefined;
        ageGroup?: string | undefined;
        theme?: string | undefined;
        style?: string | undefined;
        occasion?: string | undefined;
        budgetMin?: number | undefined;
        budgetMax?: number | undefined;
        color?: string | undefined;
        region?: string | undefined;
        shippingRequirement?: string | undefined;
        query?: string | undefined;
        preferences?: string[] | undefined;
        shownSlugs?: string[] | undefined;
        selectedSlug?: string | undefined;
        partySize?: number | undefined;
        indoorOutdoor?: "indoor" | "outdoor" | "both" | undefined;
    }>>;
    pageContext: z.ZodOptional<z.ZodObject<{
        path: z.ZodString;
        productSlug: z.ZodOptional<z.ZodString>;
        productName: z.ZodOptional<z.ZodString>;
        categorySlug: z.ZodOptional<z.ZodString>;
        searchQuery: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        path: string;
        productSlug?: string | undefined;
        categorySlug?: string | undefined;
        productName?: string | undefined;
        searchQuery?: string | undefined;
    }, {
        path: string;
        productSlug?: string | undefined;
        categorySlug?: string | undefined;
        productName?: string | undefined;
        searchQuery?: string | undefined;
    }>>;
    cart: z.ZodOptional<z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        name?: string | undefined;
    }, {
        slug: string;
        name?: string | undefined;
    }>, "many">>;
    market: z.ZodOptional<z.ZodObject<{
        countryCode: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        region: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        countryCode?: string | undefined;
        city?: string | undefined;
        region?: string | undefined;
        postalCode?: string | undefined;
    }, {
        countryCode?: string | undefined;
        city?: string | undefined;
        region?: string | undefined;
        postalCode?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    messages: {
        role: "user" | "assistant";
        content: string;
    }[];
    page?: string | undefined;
    sessionId?: string | undefined;
    shoppingState?: {
        categorySlug?: string | undefined;
        size?: string | undefined;
        country?: string | undefined;
        category?: string | undefined;
        city?: string | undefined;
        subcategory?: string | undefined;
        audience?: string | undefined;
        gender?: string | undefined;
        ageGroup?: string | undefined;
        theme?: string | undefined;
        style?: string | undefined;
        occasion?: string | undefined;
        budgetMin?: number | undefined;
        budgetMax?: number | undefined;
        color?: string | undefined;
        region?: string | undefined;
        shippingRequirement?: string | undefined;
        query?: string | undefined;
        preferences?: string[] | undefined;
        shownSlugs?: string[] | undefined;
        selectedSlug?: string | undefined;
        partySize?: number | undefined;
        indoorOutdoor?: "indoor" | "outdoor" | "both" | undefined;
    } | undefined;
    pageContext?: {
        path: string;
        productSlug?: string | undefined;
        categorySlug?: string | undefined;
        productName?: string | undefined;
        searchQuery?: string | undefined;
    } | undefined;
    cart?: {
        slug: string;
        name?: string | undefined;
    }[] | undefined;
    market?: {
        countryCode?: string | undefined;
        city?: string | undefined;
        region?: string | undefined;
        postalCode?: string | undefined;
    } | undefined;
}, {
    page?: string | undefined;
    messages?: {
        role: "user" | "assistant";
        content: string;
    }[] | undefined;
    sessionId?: string | undefined;
    shoppingState?: {
        categorySlug?: string | undefined;
        size?: string | undefined;
        country?: string | undefined;
        category?: string | undefined;
        city?: string | undefined;
        subcategory?: string | undefined;
        audience?: string | undefined;
        gender?: string | undefined;
        ageGroup?: string | undefined;
        theme?: string | undefined;
        style?: string | undefined;
        occasion?: string | undefined;
        budgetMin?: number | undefined;
        budgetMax?: number | undefined;
        color?: string | undefined;
        region?: string | undefined;
        shippingRequirement?: string | undefined;
        query?: string | undefined;
        preferences?: string[] | undefined;
        shownSlugs?: string[] | undefined;
        selectedSlug?: string | undefined;
        partySize?: number | undefined;
        indoorOutdoor?: "indoor" | "outdoor" | "both" | undefined;
    } | undefined;
    pageContext?: {
        path: string;
        productSlug?: string | undefined;
        categorySlug?: string | undefined;
        productName?: string | undefined;
        searchQuery?: string | undefined;
    } | undefined;
    cart?: {
        slug: string;
        name?: string | undefined;
    }[] | undefined;
    market?: {
        countryCode?: string | undefined;
        city?: string | undefined;
        region?: string | undefined;
        postalCode?: string | undefined;
    } | undefined;
}>;
export declare const chatResponseSchema: z.ZodObject<{
    message: z.ZodOptional<z.ZodString>;
    blocks: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"text">;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "text";
        text: string;
    }, {
        type: "text";
        text: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"quick_actions">;
        actions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            message: z.ZodString;
            href: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            message: string;
            label: string;
            href?: string | undefined;
        }, {
            id: string;
            message: string;
            label: string;
            href?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "quick_actions";
        actions: {
            id: string;
            message: string;
            label: string;
            href?: string | undefined;
        }[];
    }, {
        type: "quick_actions";
        actions: {
            id: string;
            message: string;
            label: string;
            href?: string | undefined;
        }[];
    }>, z.ZodObject<{
        type: z.ZodLiteral<"product_carousel">;
        heading: z.ZodOptional<z.ZodString>;
        products: z.ZodArray<z.ZodObject<{
            slug: z.ZodString;
            name: z.ZodString;
            image: z.ZodOptional<z.ZodString>;
            price: z.ZodNumber;
            compareAtPrice: z.ZodOptional<z.ZodNumber>;
            currency: z.ZodDefault<z.ZodString>;
            categorySlug: z.ZodOptional<z.ZodString>;
            url: z.ZodString;
            inventory: z.ZodOptional<z.ZodNumber>;
            available: z.ZodOptional<z.ZodBoolean>;
            badge: z.ZodOptional<z.ZodString>;
            variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
                vid: z.ZodString;
                name: z.ZodOptional<z.ZodString>;
                inventory: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }, {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            price: number;
            currency: string;
            slug: string;
            url: string;
            image?: string | undefined;
            compareAtPrice?: number | undefined;
            categorySlug?: string | undefined;
            inventory?: number | undefined;
            available?: boolean | undefined;
            badge?: string | undefined;
            variants?: {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }[] | undefined;
        }, {
            name: string;
            price: number;
            slug: string;
            url: string;
            currency?: string | undefined;
            image?: string | undefined;
            compareAtPrice?: number | undefined;
            categorySlug?: string | undefined;
            inventory?: number | undefined;
            available?: boolean | undefined;
            badge?: string | undefined;
            variants?: {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }[] | undefined;
        }>, "many">;
        viewAllHref: z.ZodOptional<z.ZodString>;
        viewAllLabel: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "product_carousel";
        products: {
            name: string;
            price: number;
            currency: string;
            slug: string;
            url: string;
            image?: string | undefined;
            compareAtPrice?: number | undefined;
            categorySlug?: string | undefined;
            inventory?: number | undefined;
            available?: boolean | undefined;
            badge?: string | undefined;
            variants?: {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }[] | undefined;
        }[];
        heading?: string | undefined;
        viewAllHref?: string | undefined;
        viewAllLabel?: string | undefined;
    }, {
        type: "product_carousel";
        products: {
            name: string;
            price: number;
            slug: string;
            url: string;
            currency?: string | undefined;
            image?: string | undefined;
            compareAtPrice?: number | undefined;
            categorySlug?: string | undefined;
            inventory?: number | undefined;
            available?: boolean | undefined;
            badge?: string | undefined;
            variants?: {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }[] | undefined;
        }[];
        heading?: string | undefined;
        viewAllHref?: string | undefined;
        viewAllLabel?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"product_card">;
        product: z.ZodObject<{
            slug: z.ZodString;
            name: z.ZodString;
            image: z.ZodOptional<z.ZodString>;
            price: z.ZodNumber;
            compareAtPrice: z.ZodOptional<z.ZodNumber>;
            currency: z.ZodDefault<z.ZodString>;
            categorySlug: z.ZodOptional<z.ZodString>;
            url: z.ZodString;
            inventory: z.ZodOptional<z.ZodNumber>;
            available: z.ZodOptional<z.ZodBoolean>;
            badge: z.ZodOptional<z.ZodString>;
            variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
                vid: z.ZodString;
                name: z.ZodOptional<z.ZodString>;
                inventory: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }, {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            price: number;
            currency: string;
            slug: string;
            url: string;
            image?: string | undefined;
            compareAtPrice?: number | undefined;
            categorySlug?: string | undefined;
            inventory?: number | undefined;
            available?: boolean | undefined;
            badge?: string | undefined;
            variants?: {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }[] | undefined;
        }, {
            name: string;
            price: number;
            slug: string;
            url: string;
            currency?: string | undefined;
            image?: string | undefined;
            compareAtPrice?: number | undefined;
            categorySlug?: string | undefined;
            inventory?: number | undefined;
            available?: boolean | undefined;
            badge?: string | undefined;
            variants?: {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }[] | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "product_card";
        product: {
            name: string;
            price: number;
            currency: string;
            slug: string;
            url: string;
            image?: string | undefined;
            compareAtPrice?: number | undefined;
            categorySlug?: string | undefined;
            inventory?: number | undefined;
            available?: boolean | undefined;
            badge?: string | undefined;
            variants?: {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }[] | undefined;
        };
    }, {
        type: "product_card";
        product: {
            name: string;
            price: number;
            slug: string;
            url: string;
            currency?: string | undefined;
            image?: string | undefined;
            compareAtPrice?: number | undefined;
            categorySlug?: string | undefined;
            inventory?: number | undefined;
            available?: boolean | undefined;
            badge?: string | undefined;
            variants?: {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }[] | undefined;
        };
    }>, z.ZodObject<{
        type: z.ZodLiteral<"category_card">;
        title: z.ZodString;
        href: z.ZodString;
        subtitle: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "category_card";
        title: string;
        href: string;
        subtitle?: string | undefined;
    }, {
        type: "category_card";
        title: string;
        href: string;
        subtitle?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"link">;
        label: z.ZodString;
        href: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "link";
        href: string;
        label: string;
    }, {
        type: "link";
        href: string;
        label: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"comparison">;
        products: z.ZodArray<z.ZodObject<{
            slug: z.ZodString;
            name: z.ZodString;
            image: z.ZodOptional<z.ZodString>;
            price: z.ZodNumber;
            compareAtPrice: z.ZodOptional<z.ZodNumber>;
            currency: z.ZodDefault<z.ZodString>;
            categorySlug: z.ZodOptional<z.ZodString>;
            url: z.ZodString;
            inventory: z.ZodOptional<z.ZodNumber>;
            available: z.ZodOptional<z.ZodBoolean>;
            badge: z.ZodOptional<z.ZodString>;
            variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
                vid: z.ZodString;
                name: z.ZodOptional<z.ZodString>;
                inventory: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }, {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            price: number;
            currency: string;
            slug: string;
            url: string;
            image?: string | undefined;
            compareAtPrice?: number | undefined;
            categorySlug?: string | undefined;
            inventory?: number | undefined;
            available?: boolean | undefined;
            badge?: string | undefined;
            variants?: {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }[] | undefined;
        }, {
            name: string;
            price: number;
            slug: string;
            url: string;
            currency?: string | undefined;
            image?: string | undefined;
            compareAtPrice?: number | undefined;
            categorySlug?: string | undefined;
            inventory?: number | undefined;
            available?: boolean | undefined;
            badge?: string | undefined;
            variants?: {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }[] | undefined;
        }>, "many">;
        summary: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "comparison";
        products: {
            name: string;
            price: number;
            currency: string;
            slug: string;
            url: string;
            image?: string | undefined;
            compareAtPrice?: number | undefined;
            categorySlug?: string | undefined;
            inventory?: number | undefined;
            available?: boolean | undefined;
            badge?: string | undefined;
            variants?: {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }[] | undefined;
        }[];
        summary: string;
    }, {
        type: "comparison";
        products: {
            name: string;
            price: number;
            slug: string;
            url: string;
            currency?: string | undefined;
            image?: string | undefined;
            compareAtPrice?: number | undefined;
            categorySlug?: string | undefined;
            inventory?: number | undefined;
            available?: boolean | undefined;
            badge?: string | undefined;
            variants?: {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }[] | undefined;
        }[];
        summary: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"error">;
        text: z.ZodString;
        href: z.ZodOptional<z.ZodString>;
        hrefLabel: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "error";
        text: string;
        href?: string | undefined;
        hrefLabel?: string | undefined;
    }, {
        type: "error";
        text: string;
        href?: string | undefined;
        hrefLabel?: string | undefined;
    }>]>, "many">;
    shoppingState: z.ZodDefault<z.ZodObject<{
        category: z.ZodOptional<z.ZodString>;
        categorySlug: z.ZodOptional<z.ZodString>;
        subcategory: z.ZodOptional<z.ZodString>;
        audience: z.ZodOptional<z.ZodString>;
        gender: z.ZodOptional<z.ZodString>;
        ageGroup: z.ZodOptional<z.ZodString>;
        theme: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodString>;
        occasion: z.ZodOptional<z.ZodString>;
        budgetMin: z.ZodOptional<z.ZodNumber>;
        budgetMax: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        size: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        region: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        shippingRequirement: z.ZodOptional<z.ZodString>;
        query: z.ZodOptional<z.ZodString>;
        preferences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        shownSlugs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        selectedSlug: z.ZodOptional<z.ZodString>;
        partySize: z.ZodOptional<z.ZodNumber>;
        indoorOutdoor: z.ZodOptional<z.ZodEnum<["indoor", "outdoor", "both"]>>;
    }, "strip", z.ZodTypeAny, {
        categorySlug?: string | undefined;
        size?: string | undefined;
        country?: string | undefined;
        category?: string | undefined;
        city?: string | undefined;
        subcategory?: string | undefined;
        audience?: string | undefined;
        gender?: string | undefined;
        ageGroup?: string | undefined;
        theme?: string | undefined;
        style?: string | undefined;
        occasion?: string | undefined;
        budgetMin?: number | undefined;
        budgetMax?: number | undefined;
        color?: string | undefined;
        region?: string | undefined;
        shippingRequirement?: string | undefined;
        query?: string | undefined;
        preferences?: string[] | undefined;
        shownSlugs?: string[] | undefined;
        selectedSlug?: string | undefined;
        partySize?: number | undefined;
        indoorOutdoor?: "indoor" | "outdoor" | "both" | undefined;
    }, {
        categorySlug?: string | undefined;
        size?: string | undefined;
        country?: string | undefined;
        category?: string | undefined;
        city?: string | undefined;
        subcategory?: string | undefined;
        audience?: string | undefined;
        gender?: string | undefined;
        ageGroup?: string | undefined;
        theme?: string | undefined;
        style?: string | undefined;
        occasion?: string | undefined;
        budgetMin?: number | undefined;
        budgetMax?: number | undefined;
        color?: string | undefined;
        region?: string | undefined;
        shippingRequirement?: string | undefined;
        query?: string | undefined;
        preferences?: string[] | undefined;
        shownSlugs?: string[] | undefined;
        selectedSlug?: string | undefined;
        partySize?: number | undefined;
        indoorOutdoor?: "indoor" | "outdoor" | "both" | undefined;
    }>>;
    intent: z.ZodEnum<["product_search", "category_search", "product_comparison", "product_information", "price_query", "shipping_query", "order_query", "return_query", "payment_query", "size_query", "styling_help", "halloween_ideas", "location_query", "general_halloween", "support", "navigation", "surprise", "party_planner", "start_over", "smalltalk"]>;
    unfulfilled: z.ZodOptional<z.ZodBoolean>;
    searchQuery: z.ZodOptional<z.ZodString>;
    resultCount: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    shoppingState: {
        categorySlug?: string | undefined;
        size?: string | undefined;
        country?: string | undefined;
        category?: string | undefined;
        city?: string | undefined;
        subcategory?: string | undefined;
        audience?: string | undefined;
        gender?: string | undefined;
        ageGroup?: string | undefined;
        theme?: string | undefined;
        style?: string | undefined;
        occasion?: string | undefined;
        budgetMin?: number | undefined;
        budgetMax?: number | undefined;
        color?: string | undefined;
        region?: string | undefined;
        shippingRequirement?: string | undefined;
        query?: string | undefined;
        preferences?: string[] | undefined;
        shownSlugs?: string[] | undefined;
        selectedSlug?: string | undefined;
        partySize?: number | undefined;
        indoorOutdoor?: "indoor" | "outdoor" | "both" | undefined;
    };
    blocks: ({
        type: "text";
        text: string;
    } | {
        type: "quick_actions";
        actions: {
            id: string;
            message: string;
            label: string;
            href?: string | undefined;
        }[];
    } | {
        type: "product_carousel";
        products: {
            name: string;
            price: number;
            currency: string;
            slug: string;
            url: string;
            image?: string | undefined;
            compareAtPrice?: number | undefined;
            categorySlug?: string | undefined;
            inventory?: number | undefined;
            available?: boolean | undefined;
            badge?: string | undefined;
            variants?: {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }[] | undefined;
        }[];
        heading?: string | undefined;
        viewAllHref?: string | undefined;
        viewAllLabel?: string | undefined;
    } | {
        type: "product_card";
        product: {
            name: string;
            price: number;
            currency: string;
            slug: string;
            url: string;
            image?: string | undefined;
            compareAtPrice?: number | undefined;
            categorySlug?: string | undefined;
            inventory?: number | undefined;
            available?: boolean | undefined;
            badge?: string | undefined;
            variants?: {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }[] | undefined;
        };
    } | {
        type: "category_card";
        title: string;
        href: string;
        subtitle?: string | undefined;
    } | {
        type: "link";
        href: string;
        label: string;
    } | {
        type: "comparison";
        products: {
            name: string;
            price: number;
            currency: string;
            slug: string;
            url: string;
            image?: string | undefined;
            compareAtPrice?: number | undefined;
            categorySlug?: string | undefined;
            inventory?: number | undefined;
            available?: boolean | undefined;
            badge?: string | undefined;
            variants?: {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }[] | undefined;
        }[];
        summary: string;
    } | {
        type: "error";
        text: string;
        href?: string | undefined;
        hrefLabel?: string | undefined;
    })[];
    intent: "product_search" | "category_search" | "product_comparison" | "product_information" | "price_query" | "shipping_query" | "order_query" | "return_query" | "payment_query" | "size_query" | "styling_help" | "halloween_ideas" | "location_query" | "general_halloween" | "support" | "navigation" | "surprise" | "party_planner" | "start_over" | "smalltalk";
    message?: string | undefined;
    searchQuery?: string | undefined;
    unfulfilled?: boolean | undefined;
    resultCount?: number | undefined;
}, {
    blocks: ({
        type: "text";
        text: string;
    } | {
        type: "quick_actions";
        actions: {
            id: string;
            message: string;
            label: string;
            href?: string | undefined;
        }[];
    } | {
        type: "product_carousel";
        products: {
            name: string;
            price: number;
            slug: string;
            url: string;
            currency?: string | undefined;
            image?: string | undefined;
            compareAtPrice?: number | undefined;
            categorySlug?: string | undefined;
            inventory?: number | undefined;
            available?: boolean | undefined;
            badge?: string | undefined;
            variants?: {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }[] | undefined;
        }[];
        heading?: string | undefined;
        viewAllHref?: string | undefined;
        viewAllLabel?: string | undefined;
    } | {
        type: "product_card";
        product: {
            name: string;
            price: number;
            slug: string;
            url: string;
            currency?: string | undefined;
            image?: string | undefined;
            compareAtPrice?: number | undefined;
            categorySlug?: string | undefined;
            inventory?: number | undefined;
            available?: boolean | undefined;
            badge?: string | undefined;
            variants?: {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }[] | undefined;
        };
    } | {
        type: "category_card";
        title: string;
        href: string;
        subtitle?: string | undefined;
    } | {
        type: "link";
        href: string;
        label: string;
    } | {
        type: "comparison";
        products: {
            name: string;
            price: number;
            slug: string;
            url: string;
            currency?: string | undefined;
            image?: string | undefined;
            compareAtPrice?: number | undefined;
            categorySlug?: string | undefined;
            inventory?: number | undefined;
            available?: boolean | undefined;
            badge?: string | undefined;
            variants?: {
                vid: string;
                name?: string | undefined;
                inventory?: number | undefined;
            }[] | undefined;
        }[];
        summary: string;
    } | {
        type: "error";
        text: string;
        href?: string | undefined;
        hrefLabel?: string | undefined;
    })[];
    intent: "product_search" | "category_search" | "product_comparison" | "product_information" | "price_query" | "shipping_query" | "order_query" | "return_query" | "payment_query" | "size_query" | "styling_help" | "halloween_ideas" | "location_query" | "general_halloween" | "support" | "navigation" | "surprise" | "party_planner" | "start_over" | "smalltalk";
    message?: string | undefined;
    searchQuery?: string | undefined;
    shoppingState?: {
        categorySlug?: string | undefined;
        size?: string | undefined;
        country?: string | undefined;
        category?: string | undefined;
        city?: string | undefined;
        subcategory?: string | undefined;
        audience?: string | undefined;
        gender?: string | undefined;
        ageGroup?: string | undefined;
        theme?: string | undefined;
        style?: string | undefined;
        occasion?: string | undefined;
        budgetMin?: number | undefined;
        budgetMax?: number | undefined;
        color?: string | undefined;
        region?: string | undefined;
        shippingRequirement?: string | undefined;
        query?: string | undefined;
        preferences?: string[] | undefined;
        shownSlugs?: string[] | undefined;
        selectedSlug?: string | undefined;
        partySize?: number | undefined;
        indoorOutdoor?: "indoor" | "outdoor" | "both" | undefined;
    } | undefined;
    unfulfilled?: boolean | undefined;
    resultCount?: number | undefined;
}>;
export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
export type ChatPageContext = z.infer<typeof chatPageContextSchema>;
export type ChatMarketContext = z.infer<typeof chatMarketContextSchema>;
export declare const chatConfigSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    launcherEnabled: z.ZodDefault<z.ZodBoolean>;
    invitationEnabled: z.ZodDefault<z.ZodBoolean>;
    invitationDelayMs: z.ZodDefault<z.ZodNumber>;
    welcomeMessage: z.ZodDefault<z.ZodString>;
    productResultCount: z.ZodDefault<z.ZodNumber>;
    upsellLimit: z.ZodDefault<z.ZodNumber>;
    countryPersonalization: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    launcherEnabled: boolean;
    invitationEnabled: boolean;
    invitationDelayMs: number;
    welcomeMessage: string;
    productResultCount: number;
    upsellLimit: number;
    countryPersonalization: boolean;
}, {
    enabled?: boolean | undefined;
    launcherEnabled?: boolean | undefined;
    invitationEnabled?: boolean | undefined;
    invitationDelayMs?: number | undefined;
    welcomeMessage?: string | undefined;
    productResultCount?: number | undefined;
    upsellLimit?: number | undefined;
    countryPersonalization?: boolean | undefined;
}>;
export type ChatConfig = z.infer<typeof chatConfigSchema>;
export declare const DEFAULT_CHAT_CONFIG: ChatConfig;
