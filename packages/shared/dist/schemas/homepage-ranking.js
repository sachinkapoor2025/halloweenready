"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homepageSnapshotSchema = exports.homepageSnapshotGroupSchema = exports.DEFAULT_HOMEPAGE_RANKING_CONFIG = exports.homepageRankingConfigSchema = exports.homepageProductOverrideSchema = void 0;
const zod_1 = require("zod");
exports.homepageProductOverrideSchema = zod_1.z.object({
    pin: zod_1.z.boolean().optional(),
    exclude: zod_1.z.boolean().optional(),
    featured: zod_1.z.boolean().optional(),
    trending: zod_1.z.boolean().optional(),
    seasonal: zod_1.z.boolean().optional(),
    /** Multiplier applied after the score (0.5–2). */
    boost: zod_1.z.number().min(0.5).max(2).optional(),
});
exports.homepageRankingConfigSchema = zod_1.z.object({
    homepageProductCount: zod_1.z.number().int().min(20).max(800).default(500),
    explorationPercentage: zod_1.z.number().min(0).max(50).default(20),
    performanceWindowDays: zod_1.z.number().int().min(7).max(90).default(30),
    trendWindowDays: zod_1.z.number().int().min(3).max(30).default(14),
    minimumClicksForRanking: zod_1.z.number().int().min(0).max(500).default(20),
    minimumOrdersForConversionRanking: zod_1.z.number().int().min(0).max(50).default(5),
    minimumImpressionsForCtr: zod_1.z.number().int().min(0).max(2000).default(40),
    countryPersonalizationEnabled: zod_1.z.boolean().default(false),
    regionPersonalizationEnabled: zod_1.z.boolean().default(false),
    cityPersonalizationEnabled: zod_1.z.boolean().default(false),
    /** Chat product clicks are stored separately and do not dominate homepage ranking. */
    chatClickWeight: zod_1.z.number().min(0).max(1).default(0),
    profitabilityWeight: zod_1.z.number().min(0).max(1).default(0),
    seasonalWeight: zod_1.z.number().min(0).max(1).default(0),
    maxShareSameCategory: zod_1.z.number().min(0.05).max(1).default(0.28),
    maxShareSameTheme: zod_1.z.number().min(0.05).max(1).default(0.35),
    slotTopPerformers: zod_1.z.number().int().min(0).max(500).default(200),
    slotTrending: zod_1.z.number().int().min(0).max(500).default(100),
    slotNew: zod_1.z.number().int().min(0).max(500).default(75),
    slotCategoryDiversity: zod_1.z.number().int().min(0).max(500).default(75),
    slotExploration: zod_1.z.number().int().min(0).max(500).default(50),
    weights: zod_1.z
        .object({
        ctr: zod_1.z.number().min(0).max(1).default(0.2),
        atcRate: zod_1.z.number().min(0).max(1).default(0.15),
        conversionRate: zod_1.z.number().min(0).max(1).default(0.25),
        orders: zod_1.z.number().min(0).max(1).default(0.2),
        revenue: zod_1.z.number().min(0).max(1).default(0.1),
        trend: zod_1.z.number().min(0).max(1).default(0.1),
    })
        .default({
        ctr: 0.2,
        atcRate: 0.15,
        conversionRate: 0.25,
        orders: 0.2,
        revenue: 0.1,
        trend: 0.1,
    }),
    overrides: zod_1.z.record(exports.homepageProductOverrideSchema).default({}),
});
exports.DEFAULT_HOMEPAGE_RANKING_CONFIG = exports.homepageRankingConfigSchema.parse({});
exports.homepageSnapshotGroupSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    slugs: zod_1.z.array(zod_1.z.string()),
});
exports.homepageSnapshotSchema = zod_1.z.object({
    generatedAt: zod_1.z.string(),
    windowDays: zod_1.z.number().int(),
    poolSize: zod_1.z.number().int(),
    groups: zod_1.z.array(exports.homepageSnapshotGroupSchema),
    ranked: zod_1.z.array(zod_1.z.string()),
});
