import { z } from "zod";
export declare const paymentConfigSchema: z.ZodObject<{
    defaultRegion: z.ZodEnum<["US", "IN"]>;
    regions: z.ZodObject<{
        US: z.ZodObject<{
            provider: z.ZodLiteral<"stripe">;
            currency: z.ZodLiteral<"USD">;
            enabled: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            currency: "USD";
            provider: "stripe";
            enabled: boolean;
        }, {
            currency: "USD";
            provider: "stripe";
            enabled?: boolean | undefined;
        }>;
        IN: z.ZodObject<{
            provider: z.ZodLiteral<"razorpay">;
            currency: z.ZodLiteral<"INR">;
            enabled: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            currency: "INR";
            provider: "razorpay";
            enabled: boolean;
        }, {
            currency: "INR";
            provider: "razorpay";
            enabled?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        US: {
            currency: "USD";
            provider: "stripe";
            enabled: boolean;
        };
        IN: {
            currency: "INR";
            provider: "razorpay";
            enabled: boolean;
        };
    }, {
        US: {
            currency: "USD";
            provider: "stripe";
            enabled?: boolean | undefined;
        };
        IN: {
            currency: "INR";
            provider: "razorpay";
            enabled?: boolean | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    defaultRegion: "US" | "IN";
    regions: {
        US: {
            currency: "USD";
            provider: "stripe";
            enabled: boolean;
        };
        IN: {
            currency: "INR";
            provider: "razorpay";
            enabled: boolean;
        };
    };
}, {
    defaultRegion: "US" | "IN";
    regions: {
        US: {
            currency: "USD";
            provider: "stripe";
            enabled?: boolean | undefined;
        };
        IN: {
            currency: "INR";
            provider: "razorpay";
            enabled?: boolean | undefined;
        };
    };
}>;
export type PaymentConfig = z.infer<typeof paymentConfigSchema>;
export declare const defaultPaymentConfig: PaymentConfig;
