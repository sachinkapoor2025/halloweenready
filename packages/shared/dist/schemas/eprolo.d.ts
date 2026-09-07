import { z } from "zod";
/** Default Open API host; override with EPROLO_API_BASE if the partner PDF differs. */
export declare const EPROLO_DEFAULT_API_BASE = "https://openapi.eprolo.com";
export declare const eproloSaveCredentialsSchema: z.ZodObject<{
    openApiKey: z.ZodString;
    openApiSecret: z.ZodString;
}, "strip", z.ZodTypeAny, {
    openApiKey: string;
    openApiSecret: string;
}, {
    openApiKey: string;
    openApiSecret: string;
}>;
export declare const eproloSearchQuerySchema: z.ZodObject<{
    keyWord: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    size: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    keyWord?: string | undefined;
    page?: number | undefined;
    size?: number | undefined;
}, {
    keyWord?: string | undefined;
    page?: number | undefined;
    size?: number | undefined;
}>;
