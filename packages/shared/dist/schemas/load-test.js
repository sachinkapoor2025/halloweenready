"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTestRunResultSchema = exports.LOAD_TEST_P95_LIMIT_MS = exports.LOAD_TEST_FAIL_RATE_LIMIT = exports.loadTestRunRequestSchema = exports.loadTestPresetSchema = exports.LOAD_TEST_PRESETS = void 0;
exports.loadTestLimits = loadTestLimits;
const zod_1 = require("zod");
/**
 * Admin browser load-test presets.
 * `parallel` = max in-flight journeys (kept modest so Lambda scale-out doesn’t stampede into 503s).
 * `users` = total shopper journeys. p95 limits scale with load (no provisioned concurrency).
 */
exports.LOAD_TEST_PRESETS = {
    smoke: {
        users: 20,
        parallel: 10,
        label: "Smoke",
        description: "~20 journeys · quick check",
        p95LimitMs: 4_000,
        failRateLimit: 0.01,
    },
    u100: {
        users: 100,
        parallel: 40,
        label: "100 users",
        description: "100 journeys · up to 40 parallel",
        p95LimitMs: 15_000,
        failRateLimit: 0.01,
    },
    u250: {
        users: 250,
        parallel: 40,
        label: "250 users",
        description: "250 journeys · up to 40 parallel (waves)",
        p95LimitMs: 18_000,
        failRateLimit: 0.03,
    },
    u500: {
        users: 500,
        parallel: 40,
        label: "500 users",
        description: "500 journeys · up to 40 parallel (waves)",
        p95LimitMs: 20_000,
        failRateLimit: 0.03,
    },
    u750: {
        users: 750,
        parallel: 40,
        label: "750 users",
        description: "750 journeys · up to 40 parallel (waves)",
        p95LimitMs: 22_000,
        failRateLimit: 0.03,
    },
    u1000: {
        users: 1000,
        parallel: 50,
        label: "1000 users",
        description: "1000 journeys · up to 50 parallel (waves)",
        p95LimitMs: 25_000,
        failRateLimit: 0.04,
    },
};
exports.loadTestPresetSchema = zod_1.z.enum([
    "smoke",
    "u100",
    "u250",
    "u500",
    "u750",
    "u1000",
]);
exports.loadTestRunRequestSchema = zod_1.z.object({
    preset: exports.loadTestPresetSchema.default("smoke"),
    categorySlug: zod_1.z.string().min(1).max(80).optional(),
});
exports.LOAD_TEST_FAIL_RATE_LIMIT = 0.01;
/** @deprecated Use per-preset p95LimitMs from LOAD_TEST_PRESETS */
exports.LOAD_TEST_P95_LIMIT_MS = exports.LOAD_TEST_PRESETS.smoke.p95LimitMs;
function loadTestLimits(preset) {
    const p = exports.LOAD_TEST_PRESETS[preset];
    return {
        users: p.users,
        parallel: p.parallel,
        p95LimitMs: p.p95LimitMs,
        failRateLimit: p.failRateLimit,
    };
}
exports.loadTestRunResultSchema = zod_1.z.object({
    preset: exports.loadTestPresetSchema,
    concurrency: zod_1.z.number(),
    loops: zod_1.z.number(),
    users: zod_1.z.number().optional(),
    parallel: zod_1.z.number().optional(),
    apiBase: zod_1.z.string(),
    loadTestMode: zod_1.z.boolean(),
    durationMs: zod_1.z.number(),
    journeys: zod_1.z.number(),
    requestsApprox: zod_1.z.number(),
    errors: zod_1.z.number(),
    skipped: zod_1.z.number().optional(),
    failedRate: zod_1.z.number(),
    p50: zod_1.z.number(),
    p95: zod_1.z.number(),
    p99: zod_1.z.number(),
    pass: zod_1.z.boolean(),
    reliabilityPass: zod_1.z.boolean(),
    latencyPass: zod_1.z.boolean(),
    p95LimitMs: zod_1.z.number(),
    failRateLimit: zod_1.z.number().optional(),
    reasons: zod_1.z.array(zod_1.z.string()).optional(),
    truncated: zod_1.z.boolean().optional(),
    sampleErrors: zod_1.z.array(zod_1.z.string()).optional(),
});
