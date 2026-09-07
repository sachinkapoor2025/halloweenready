import { z } from "zod";

export const eproloSaveCredentialsSchema = z.object({
  openApiKey: z.string().trim().min(8).max(400),
  openApiSecret: z.string().trim().min(8).max(400),
});

export const eproloSearchQuerySchema = z.object({
  keyWord: z.string().trim().max(200).optional(),
  page: z.coerce.number().int().min(1).max(1000).optional(),
  size: z.coerce.number().int().min(1).max(100).optional(),
});
