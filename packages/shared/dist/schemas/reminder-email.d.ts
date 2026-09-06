import { z } from "zod";
export declare const REMINDER_EMAIL_STATUSES: readonly ["show", "deleted"];
export type ReminderEmailStatus = (typeof REMINDER_EMAIL_STATUSES)[number];
export declare const REMINDER_EMAIL_SOURCES: readonly ["lead", "visitor", "abandoned_cart", "welcome_coupon", "account", "checkout_pending", "contact", "newsletter", "other"];
export type ReminderEmailSource = (typeof REMINDER_EMAIL_SOURCES)[number];
export declare const reminderEmailSchema: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    sources: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    status: z.ZodDefault<z.ZodEnum<["show", "deleted"]>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    deletedAt: z.ZodOptional<z.ZodString>;
    lastReminderSentAt: z.ZodOptional<z.ZodString>;
    reminderCount: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    status: "show" | "deleted";
    email: string;
    updatedAt: string;
    createdAt: string;
    sources: string[];
    reminderCount: number;
    name?: string | undefined;
    phone?: string | undefined;
    deletedAt?: string | undefined;
    lastReminderSentAt?: string | undefined;
}, {
    email: string;
    updatedAt: string;
    createdAt: string;
    name?: string | undefined;
    status?: "show" | "deleted" | undefined;
    phone?: string | undefined;
    sources?: string[] | undefined;
    deletedAt?: string | undefined;
    lastReminderSentAt?: string | undefined;
    reminderCount?: number | undefined;
}>;
export type ReminderEmail = z.infer<typeof reminderEmailSchema>;
export declare const sendReminderEmailsSchema: z.ZodObject<{
    emails: z.ZodArray<z.ZodString, "many">;
    subject: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    emails: string[];
    subject?: string | undefined;
}, {
    emails: string[];
    subject?: string | undefined;
}>;
export type SendReminderEmailsInput = z.infer<typeof sendReminderEmailsSchema>;
export declare const DEFAULT_CHECKOUT_NUDGE_SUBJECT = "Your Halloween cart is waiting \u2014 complete your OccasionFun order";
export declare function defaultCheckoutNudgeHtml(opts: {
    name?: string;
    siteUrl: string;
}): string;
