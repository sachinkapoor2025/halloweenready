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
            enabled: boolean;
            provider: "stripe";
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
            enabled: boolean;
            provider: "razorpay";
        }, {
            currency: "INR";
            provider: "razorpay";
            enabled?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        US: {
            currency: "USD";
            enabled: boolean;
            provider: "stripe";
        };
        IN: {
            currency: "INR";
            enabled: boolean;
            provider: "razorpay";
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
            enabled: boolean;
            provider: "stripe";
        };
        IN: {
            currency: "INR";
            enabled: boolean;
            provider: "razorpay";
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
