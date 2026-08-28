import { z } from "zod";
export declare const paymentConfigSchema: any;
export type PaymentConfig = z.infer<typeof paymentConfigSchema>;
export declare const defaultPaymentConfig: PaymentConfig;
