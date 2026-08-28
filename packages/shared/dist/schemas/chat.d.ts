import { z } from "zod";
export declare const chatMessageSchema: any;
export declare const chatRequestSchema: any;
export declare const chatResponseSchema: any;
export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
