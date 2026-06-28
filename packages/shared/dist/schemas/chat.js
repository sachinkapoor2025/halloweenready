"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatResponseSchema = exports.chatRequestSchema = exports.chatMessageSchema = void 0;
const zod_1 = require("zod");
exports.chatMessageSchema = zod_1.z.object({
    role: zod_1.z.enum(["user", "assistant"]),
    content: zod_1.z.string().min(1).max(2000),
});
exports.chatRequestSchema = zod_1.z.object({
    messages: zod_1.z.array(exports.chatMessageSchema).min(1).max(16),
    page: zod_1.z.string().max(500).optional(),
    sessionId: zod_1.z.string().max(64).optional(),
});
exports.chatResponseSchema = zod_1.z.object({
    message: zod_1.z.string(),
});
