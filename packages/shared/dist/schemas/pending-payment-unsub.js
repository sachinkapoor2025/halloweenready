"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pendingPaymentUnsubscribeSchema = void 0;
const zod_1 = require("zod");
exports.pendingPaymentUnsubscribeSchema = zod_1.z.object({
    email: zod_1.z.string().trim().email("Enter a valid email address"),
});
