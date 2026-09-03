import { z } from "zod";
export declare const homepageProductOverrideSchema: z.ZodObject<{
    pin: z.ZodOptional<z.ZodBoolean>;
    exclude: z.ZodOptional<z.ZodBoolean>;
    featured: z.ZodOptional<z.ZodBoolean>;
    trending: z.ZodOptional<z.ZodBoolean>;
    seasonal: z.ZodOptional<z.ZodBoolean>;
    /** Multiplier applied after the score (0.5–2). */
    boost: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    pin?: boolean | undefined;
    exclude?: boolean | undefined;
    featured?: boolean | undefined;
    trending?: boolean | undefined;
    seasonal?: boolean | undefined;
    boost?: number | undefined;
}, {
    pin?: boolean | undefined;
    exclude?: boolean | undefined;
    featured?: boolean | undefined;
    trending?: boolean | undefined;
    seasonal?: boolean | undefined;
    boost?: number | undefined;
}>;
export declare const homepageRankingConfigSchema: z.ZodObject<{
    homepageProductCount: z.ZodDefault<z.ZodNumber>;
    explorationPercentage: z.ZodDefault<z.ZodNumber>;
    performanceWindowDays: z.ZodDefault<z.ZodNumber>;
    trendWindowDays: z.ZodDefault<z.ZodNumber>;
    minimumClicksForRanking: z.ZodDefault<z.ZodNumber>;
    minimumOrdersForConversionRanking: z.ZodDefault<z.ZodNumber>;
    minimumImpressionsForCtr: z.ZodDefault<z.ZodNumber>;
    countryPersonalizationEnabled: z.ZodDefault<z.ZodBoolean>;
    regionPersonalizationEnabled: z.ZodDefault<z.ZodBoolean>;
    cityPersonalizationEnabled: z.ZodDefault<z.ZodBoolean>;
    profitabilityWeight: z.ZodDefault<z.ZodNumber>;
    seasonalWeight: z.ZodDefault<z.ZodNumber>;
    maxShareSameCategory: z.ZodDefault<z.ZodNumber>;
    maxShareSameTheme: z.ZodDefault<z.ZodNumber>;
    slotTopPerformers: z.ZodDefault<z.ZodNumber>;
    slotTrending: z.ZodDefault<z.ZodNumber>;
    slotNew: z.ZodDefault<z.ZodNumber>;
    slotCategoryDiversity: z.ZodDefault<z.ZodNumber>;
    slotExploration: z.ZodDefault<z.ZodNumber>;
    weights: z.ZodDefault<z.ZodObject<{
        ctr: z.ZodDefault<z.ZodNumber>;
        atcRate: z.ZodDefault<z.ZodNumber>;
        conversionRate: z.ZodDefault<z.ZodNumber>;
        orders: z.ZodDefault<z.ZodNumber>;
        revenue: z.ZodDefault<z.ZodNumber>;
        trend: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        ctr: number;
        atcRate: number;
        conversionRate: number;
        orders: number;
        revenue: number;
        trend: number;
    }, {
        ctr?: number | undefined;
        atcRate?: number | undefined;
        conversionRate?: number | undefined;
        orders?: number | undefined;
        revenue?: number | undefined;
        trend?: number | undefined;
    }>>;
    overrides: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodObject<{
        pin: z.ZodOptional<z.ZodBoolean>;
        exclude: z.ZodOptional<z.ZodBoolean>;
        featured: z.ZodOptional<z.ZodBoolean>;
        trending: z.ZodOptional<z.ZodBoolean>;
        seasonal: z.ZodOptional<z.ZodBoolean>;
        /** Multiplier applied after the score (0.5–2). */
        boost: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        pin?: boolean | undefined;
        exclude?: boolean | undefined;
        featured?: boolean | undefined;
        trending?: boolean | undefined;
        seasonal?: boolean | undefined;
        boost?: number | undefined;
    }, {
        pin?: boolean | undefined;
        exclude?: boolean | undefined;
        featured?: boolean | undefined;
        trending?: boolean | undefined;
        seasonal?: boolean | undefined;
        boost?: number | undefined;
    }>>>;
}, "strip", z.ZodTypeAny, {
    homepageProductCount: number;
    explorationPercentage: number;
    performanceWindowDays: number;
    trendWindowDays: number;
    minimumClicksForRanking: number;
    minimumOrdersForConversionRanking: number;
    minimumImpressionsForCtr: number;
    countryPersonalizationEnabled: boolean;
    regionPersonalizationEnabled: boolean;
    cityPersonalizationEnabled: boolean;
    profitabilityWeight: number;
    seasonalWeight: number;
    maxShareSameCategory: number;
    maxShareSameTheme: number;
    slotTopPerformers: number;
    slotTrending: number;
    slotNew: number;
    slotCategoryDiversity: number;
    slotExploration: number;
    weights: {
        ctr: number;
        atcRate: number;
        conversionRate: number;
        orders: number;
        revenue: number;
        trend: number;
    };
    overrides: Record<string, {
        pin?: boolean | undefined;
        exclude?: boolean | undefined;
        featured?: boolean | undefined;
        trending?: boolean | undefined;
        seasonal?: boolean | undefined;
        boost?: number | undefined;
    }>;
}, {
    homepageProductCount?: number | undefined;
    explorationPercentage?: number | undefined;
    performanceWindowDays?: number | undefined;
    trendWindowDays?: number | undefined;
    minimumClicksForRanking?: number | undefined;
    minimumOrdersForConversionRanking?: number | undefined;
    minimumImpressionsForCtr?: number | undefined;
    countryPersonalizationEnabled?: boolean | undefined;
    regionPersonalizationEnabled?: boolean | undefined;
    cityPersonalizationEnabled?: boolean | undefined;
    profitabilityWeight?: number | undefined;
    seasonalWeight?: number | undefined;
    maxShareSameCategory?: number | undefined;
    maxShareSameTheme?: number | undefined;
    slotTopPerformers?: number | undefined;
    slotTrending?: number | undefined;
    slotNew?: number | undefined;
    slotCategoryDiversity?: number | undefined;
    slotExploration?: number | undefined;
    weights?: {
        ctr?: number | undefined;
        atcRate?: number | undefined;
        conversionRate?: number | undefined;
        orders?: number | undefined;
        revenue?: number | undefined;
        trend?: number | undefined;
    } | undefined;
    overrides?: Record<string, {
        pin?: boolean | undefined;
        exclude?: boolean | undefined;
        featured?: boolean | undefined;
        trending?: boolean | undefined;
        seasonal?: boolean | undefined;
        boost?: number | undefined;
    }> | undefined;
}>;
export type HomepageRankingConfig = z.infer<typeof homepageRankingConfigSchema>;
export type HomepageProductOverride = z.infer<typeof homepageProductOverrideSchema>;
export declare const DEFAULT_HOMEPAGE_RANKING_CONFIG: HomepageRankingConfig;
export declare const homepageSnapshotGroupSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    slugs: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    slugs: string[];
}, {
    id: string;
    title: string;
    slugs: string[];
}>;
export declare const homepageSnapshotSchema: z.ZodObject<{
    generatedAt: z.ZodString;
    windowDays: z.ZodNumber;
    poolSize: z.ZodNumber;
    groups: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        slugs: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
        slugs: string[];
    }, {
        id: string;
        title: string;
        slugs: string[];
    }>, "many">;
    ranked: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    generatedAt: string;
    windowDays: number;
    poolSize: number;
    groups: {
        id: string;
        title: string;
        slugs: string[];
    }[];
    ranked: string[];
}, {
    generatedAt: string;
    windowDays: number;
    poolSize: number;
    groups: {
        id: string;
        title: string;
        slugs: string[];
    }[];
    ranked: string[];
}>;
export type HomepageSnapshot = z.infer<typeof homepageSnapshotSchema>;
export type HomepageSnapshotGroup = z.infer<typeof homepageSnapshotGroupSchema>;
