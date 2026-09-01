import { z } from "zod";
export declare const chatMessageSchema: z.ZodObject<{
    role: z.ZodEnum<["user", "assistant"]>;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
    role: "user" | "assistant";
}, {
    content: string;
    role: "user" | "assistant";
}>;
export declare const chatRequestSchema: z.ZodObject<{
    messages: z.ZodArray<z.ZodObject<{
        role: z.ZodEnum<["user", "assistant"]>;
        content: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        content: string;
        role: "user" | "assistant";
    }, {
        content: string;
        role: "user" | "assistant";
    }>, "many">;
    page: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    messages: {
        content: string;
        role: "user" | "assistant";
    }[];
    page?: string | undefined;
    sessionId?: string | undefined;
}, {
    messages: {
        content: string;
        role: "user" | "assistant";
    }[];
    page?: string | undefined;
    sessionId?: string | undefined;
}>;
export declare const chatResponseSchema: z.ZodObject<{
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
}, {
    message: string;
}>;
export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
