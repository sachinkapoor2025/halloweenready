import { z } from "zod";
export declare const userProfileSchema: any;
export type UserProfile = z.infer<typeof userProfileSchema> & {
    createdAt: string;
    updatedAt: string;
};
