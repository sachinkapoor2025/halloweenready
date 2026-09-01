import { z } from "zod";

export const cjVariantSchema = z.object({
  vid: z.string().min(1),
  sku: z.string().optional(),
  key: z.string().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  inventory: z.number().int().min(0).optional(),
  /** Storefront sale price for this variant (USD). */
  price: z.number().positive().optional(),
  /** Wholesale CJ sell price (USD) — never expose on public APIs. */
  vendorCost: z.number().positive().optional(),
  weightOz: z.number().positive().optional(),
  lengthIn: z.number().positive().optional(),
  widthIn: z.number().positive().optional(),
  heightIn: z.number().positive().optional(),
});

export const cjSearchQuerySchema = z.object({
  keyWord: z.string().trim().max(200).optional(),
  page: z.coerce.number().int().min(1).max(1000).optional(),
  size: z.coerce.number().int().min(1).max(100).optional(),
  categoryId: z.string().max(200).optional(),
  countryCode: z.string().trim().length(2).optional(),
});

/** One API Gateway call stays under ~29s (CJ is 1 QPS; import also queries each pid). */
export const CJ_IMPORT_MAX_PIDS = 6;

export const cjImportProductsSchema = z.object({
  pids: z
    .array(z.string().min(1).max(80))
    .min(1)
    .max(CJ_IMPORT_MAX_PIDS, `Import at most ${CJ_IMPORT_MAX_PIDS} products per request`),
  categorySlug: z.string().min(1).max(80).optional(),
  published: z.boolean().optional(),
  addToMyProduct: z.boolean().optional(),
});

export const cjImportHalloweenSchema = z.object({
  page: z.coerce.number().int().min(1).max(1000).default(1),
  size: z.coerce.number().int().min(1).max(20).default(10),
  categorySlug: z.string().min(1).max(80).optional(),
  published: z.boolean().optional(),
  addToMyProduct: z.boolean().optional(),
  keyWord: z.string().trim().max(200).optional(),
});

export const cjSaveApiKeySchema = z.object({
  apiKey: z.string().trim().min(8).max(400),
});

export const cjFreightQuoteSchema = z.object({
  startCountryCode: z.string().trim().length(2).default("CN"),
  endCountryCode: z.string().trim().length(2),
  zip: z.string().trim().max(20).optional(),
  products: z
    .array(
      z.object({
        vid: z.string().min(1),
        quantity: z.number().int().min(1).max(99),
      })
    )
    .min(1)
    .max(40),
});

export const cjFulfillOrderSchema = z.object({
  orderId: z.string().min(1),
  /** 1=page pay URL, 2=CJ wallet, 3=create only (default). */
  payType: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
  logisticName: z.string().min(1).max(80).optional(),
  fromCountryCode: z.string().trim().length(2).optional(),
});

export type CjVariant = z.infer<typeof cjVariantSchema>;
export type CjSearchQuery = z.infer<typeof cjSearchQuerySchema>;
export type CjImportProductsInput = z.infer<typeof cjImportProductsSchema>;
export type CjImportHalloweenInput = z.infer<typeof cjImportHalloweenSchema>;
