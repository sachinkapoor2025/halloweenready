import { z } from "zod";
/**
 * Admin browser load-test presets.
 * `parallel` = max in-flight journeys (kept modest so Lambda scale-out doesn’t stampede into 503s).
 * `users` = total shopper journeys. p95 limits scale with load (no provisioned concurrency).
 */
export declare const LOAD_TEST_PRESETS: {
    readonly smoke: {
        readonly users: 20;
        readonly parallel: 10;
        readonly label: "Smoke";
        readonly description: "~20 journeys · quick check";
        readonly p95LimitMs: 4000;
        readonly failRateLimit: 0.01;
    };
    readonly u100: {
        readonly users: 100;
        readonly parallel: 40;
        readonly label: "100 users";
        readonly description: "100 journeys · up to 40 parallel";
        readonly p95LimitMs: 15000;
        readonly failRateLimit: 0.01;
    };
    readonly u250: {
        readonly users: 250;
        readonly parallel: 40;
        readonly label: "250 users";
        readonly description: "250 journeys · up to 40 parallel (waves)";
        readonly p95LimitMs: 18000;
        readonly failRateLimit: 0.03;
    };
    readonly u500: {
        readonly users: 500;
        readonly parallel: 40;
        readonly label: "500 users";
        readonly description: "500 journeys · up to 40 parallel (waves)";
        readonly p95LimitMs: 20000;
        readonly failRateLimit: 0.03;
    };
    readonly u750: {
        readonly users: 750;
        readonly parallel: 40;
        readonly label: "750 users";
        readonly description: "750 journeys · up to 40 parallel (waves)";
        readonly p95LimitMs: 22000;
        readonly failRateLimit: 0.03;
    };
    readonly u1000: {
        readonly users: 1000;
        readonly parallel: 50;
        readonly label: "1000 users";
        readonly description: "1000 journeys · up to 50 parallel (waves)";
        readonly p95LimitMs: 25000;
        readonly failRateLimit: 0.04;
    };
};
export type LoadTestPreset = keyof typeof LOAD_TEST_PRESETS;
export declare const loadTestPresetSchema: z.ZodEnum<["smoke", "u100", "u250", "u500", "u750", "u1000"]>;
export declare const loadTestRunRequestSchema: z.ZodObject<{
    preset: z.ZodDefault<z.ZodEnum<["smoke", "u100", "u250", "u500", "u750", "u1000"]>>;
    categorySlug: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    preset: "smoke" | "u100" | "u250" | "u500" | "u750" | "u1000";
    categorySlug?: string | undefined;
}, {
    categorySlug?: string | undefined;
    preset?: "smoke" | "u100" | "u250" | "u500" | "u750" | "u1000" | undefined;
}>;
export type LoadTestRunRequest = z.infer<typeof loadTestRunRequestSchema>;
export declare const LOAD_TEST_FAIL_RATE_LIMIT = 0.01;
/** @deprecated Use per-preset p95LimitMs from LOAD_TEST_PRESETS */
export declare const LOAD_TEST_P95_LIMIT_MS: 4000;
export declare function loadTestLimits(preset: LoadTestPreset): {
    users: 500 | 20 | 100 | 1000 | 250 | 750;
    parallel: 10 | 40 | 50;
    p95LimitMs: 4000 | 15000 | 18000 | 20000 | 22000 | 25000;
    failRateLimit: 0.01 | 0.03 | 0.04;
};
export declare const loadTestRunResultSchema: z.ZodObject<{
    preset: z.ZodEnum<["smoke", "u100", "u250", "u500", "u750", "u1000"]>;
    concurrency: z.ZodNumber;
    loops: z.ZodNumber;
    users: z.ZodOptional<z.ZodNumber>;
    parallel: z.ZodOptional<z.ZodNumber>;
    apiBase: z.ZodString;
    loadTestMode: z.ZodBoolean;
    durationMs: z.ZodNumber;
    journeys: z.ZodNumber;
    requestsApprox: z.ZodNumber;
    errors: z.ZodNumber;
    skipped: z.ZodOptional<z.ZodNumber>;
    failedRate: z.ZodNumber;
    p50: z.ZodNumber;
    p95: z.ZodNumber;
    p99: z.ZodNumber;
    pass: z.ZodBoolean;
    reliabilityPass: z.ZodBoolean;
    latencyPass: z.ZodBoolean;
    p95LimitMs: z.ZodNumber;
    failRateLimit: z.ZodOptional<z.ZodNumber>;
    reasons: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    truncated: z.ZodOptional<z.ZodBoolean>;
    sampleErrors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    preset: "smoke" | "u100" | "u250" | "u500" | "u750" | "u1000";
    concurrency: number;
    loops: number;
    apiBase: string;
    loadTestMode: boolean;
    durationMs: number;
    journeys: number;
    requestsApprox: number;
    errors: number;
    failedRate: number;
    p50: number;
    p95: number;
    p99: number;
    pass: boolean;
    reliabilityPass: boolean;
    latencyPass: boolean;
    p95LimitMs: number;
    skipped?: number | undefined;
    users?: number | undefined;
    parallel?: number | undefined;
    failRateLimit?: number | undefined;
    reasons?: string[] | undefined;
    truncated?: boolean | undefined;
    sampleErrors?: string[] | undefined;
}, {
    preset: "smoke" | "u100" | "u250" | "u500" | "u750" | "u1000";
    concurrency: number;
    loops: number;
    apiBase: string;
    loadTestMode: boolean;
    durationMs: number;
    journeys: number;
    requestsApprox: number;
    errors: number;
    failedRate: number;
    p50: number;
    p95: number;
    p99: number;
    pass: boolean;
    reliabilityPass: boolean;
    latencyPass: boolean;
    p95LimitMs: number;
    skipped?: number | undefined;
    users?: number | undefined;
    parallel?: number | undefined;
    failRateLimit?: number | undefined;
    reasons?: string[] | undefined;
    truncated?: boolean | undefined;
    sampleErrors?: string[] | undefined;
}>;
export type LoadTestRunResult = z.infer<typeof loadTestRunResultSchema>;
