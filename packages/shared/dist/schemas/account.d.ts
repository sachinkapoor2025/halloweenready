import { z } from "zod";
export declare const accountAddressSchema: any;
export declare const accountProfileSchema: any;
export declare const accountProfileUpdateSchema: any;
export declare const accountAddressInputSchema: any;
export declare const accountAddressUpdateSchema: any;
export type AccountAddress = z.infer<typeof accountAddressSchema>;
export type AccountProfile = z.infer<typeof accountProfileSchema> & {
    createdAt: string;
    updatedAt: string;
};
