"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eproloSearchQuerySchema = exports.eproloSaveCredentialsSchema = exports.EPROLO_DEFAULT_API_BASE = void 0;
const zod_1 = require("zod");
/** Default Open API host; override with EPROLO_API_BASE if the partner PDF differs. */
exports.EPROLO_DEFAULT_API_BASE = "https://openapi.eprolo.com";
exports.eproloSaveCredentialsSchema = zod_1.z.object({
    openApiKey: zod_1.z.string().trim().min(8).max(400),
    openApiSecret: zod_1.z.string().trim().min(8).max(400),
});
exports.eproloSearchQuerySchema = zod_1.z.object({
    keyWord: zod_1.z.string().trim().max(200).optional(),
    page: zod_1.z.coerce.number().int().min(1).max(1000).optional(),
    size: zod_1.z.coerce.number().int().min(1).max(100).optional(),
});
