import { z } from "zod";
export declare const blogImageMapSchema: any;
export declare const blogImageConfigSchema: any;
export type BlogImageMap = z.infer<typeof blogImageMapSchema>;
export type BlogImageConfig = z.infer<typeof blogImageConfigSchema>;
