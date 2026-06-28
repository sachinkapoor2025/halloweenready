"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactFormSchema = void 0;
const zod_1 = require("zod");
exports.contactFormSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(120),
    email: zod_1.z.string().email().max(254),
    phone: zod_1.z.string().min(6).max(30).optional(),
    message: zod_1.z.string().min(1).max(5000),
    sessionId: zod_1.z.string().max(64).optional(),
});
