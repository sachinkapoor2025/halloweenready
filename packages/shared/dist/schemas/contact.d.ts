import { z } from "zod";
export declare const contactFormSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    message: z.ZodString;
    sessionId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    message: string;
    email: string;
    phone?: string | undefined;
    sessionId?: string | undefined;
}, {
    name: string;
    message: string;
    email: string;
    phone?: string | undefined;
    sessionId?: string | undefined;
}>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
