import { z } from "zod";
/** Halloween 2026 — matches storefront countdown. */
export declare const HALLOWEEN_FESTIVAL_DATE = "2026-10-31";
/** @deprecated Use HALLOWEEN_FESTIVAL_DATE */
export declare const RAKSHA_BANDHAN_FESTIVAL_DATE = "2026-10-31";
export declare const USPS_MAIL_CLASSES: {
    readonly GROUND_ADVANTAGE: "USPS_GROUND_ADVANTAGE";
    readonly PRIORITY_MAIL: "PRIORITY_MAIL";
    readonly PRIORITY_MAIL_EXPRESS: "PRIORITY_MAIL_EXPRESS";
    readonly FIRST_CLASS_PACKAGE_SERVICE: "FIRST-CLASS_PACKAGE_SERVICE";
};
export type MailClassKey = keyof typeof USPS_MAIL_CLASSES;
export declare const DEFAULT_ENABLED_SERVICES: Record<MailClassKey, boolean>;
export declare const addressSchema: any;
/** Origin may be incomplete until admin configures fulfillment address. */
export declare const originAddressSchema: any;
export declare const packageDetailsSchema: any;
export declare const DEFAULT_PACKAGE: z.infer<typeof packageDetailsSchema>;
export declare const rateQuoteSchema: any;
export declare const labelResultSchema: any;
export declare const trackingStatusSchema: any;
export declare const addressValidationResultSchema: any;
export declare const festivalModeRangeSchema: any;
export declare const shippingSettingsSchema: any;
export declare const defaultShippingSettings: ShippingSettings;
export type Address = z.infer<typeof addressSchema>;
export type PackageDetails = z.infer<typeof packageDetailsSchema>;
export type RateQuote = z.infer<typeof rateQuoteSchema>;
export type LabelResult = z.infer<typeof labelResultSchema>;
export type TrackingStatus = z.infer<typeof trackingStatusSchema>;
export type AddressValidationResult = z.infer<typeof addressValidationResultSchema>;
export type FestivalModeRange = z.infer<typeof festivalModeRangeSchema>;
export type ShippingSettings = z.infer<typeof shippingSettingsSchema>;
export interface PackageItemInput {
    weightOz?: number;
    lengthIn?: number;
    widthIn?: number;
    heightIn?: number;
    quantity: number;
}
export interface ProductShippingDims {
    weightOz?: number;
    lengthIn?: number;
    widthIn?: number;
    heightIn?: number;
}
/** Sum weights (× qty) and use max of each dimension as floor; fall back to DEFAULT_PACKAGE. */
export declare function estimatePackageFromItems(items: PackageItemInput[]): PackageDetails;
export declare function productHasShippingDims(product: ProductShippingDims): boolean;
/** Pick best rate: festival deliver-by → priority mode → enabled services filter. */
export declare function selectRate(quotes: RateQuote[], settings: ShippingSettings, now?: Date): RateQuote | undefined;
export declare function mailClassDisplayName(mailClass: string): string;
