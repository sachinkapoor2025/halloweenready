import { z } from "zod";
export declare const REMINDER_EMAIL_STATUSES: readonly ["show", "deleted"];
export type ReminderEmailStatus = (typeof REMINDER_EMAIL_STATUSES)[number];
export declare const REMINDER_EMAIL_SOURCES: readonly ["lead", "visitor", "abandoned_cart", "welcome_coupon", "account", "checkout_pending", "contact", "newsletter", "other"];
export type ReminderEmailSource = (typeof REMINDER_EMAIL_SOURCES)[number];
export declare const reminderEmailSchema: any;
export type ReminderEmail = z.infer<typeof reminderEmailSchema>;
export declare const sendReminderEmailsSchema: any;
export type SendReminderEmailsInput = z.infer<typeof sendReminderEmailsSchema>;
export declare const DEFAULT_CHECKOUT_NUDGE_SUBJECT = "Your Halloween cart is waiting \u2014 complete your HalloweenReady order";
export declare function defaultCheckoutNudgeHtml(opts: {
    name?: string;
    siteUrl: string;
}): string;
