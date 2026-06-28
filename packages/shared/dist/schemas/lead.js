"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLeadSchema = exports.leadStatusSchema = exports.LEAD_STATUS = exports.leadCaptureSchema = void 0;
const zod_1 = require("zod");
exports.leadCaptureSchema = zod_1.z.object({
    sessionId: zod_1.z.string().min(1),
    userId: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    /** Partial emails while typing are allowed; server keeps only valid addresses on profile. */
    email: zod_1.z.string().max(254).optional(),
    phone: zod_1.z.string().optional(),
    page: zod_1.z.string().optional(),
    productSlug: zod_1.z.string().optional(),
    source: zod_1.z.enum(["checkout", "newsletter", "product", "browse", "admin", "contact", "chat", "review"]).default("browse"),
    metadata: zod_1.z.record(zod_1.z.string()).optional(),
});
exports.LEAD_STATUS = {
    NEW: "new",
    CONTACTED: "contacted",
    FOLLOW_UP: "follow_up",
    CONVERTED: "converted",
};
exports.leadStatusSchema = zod_1.z.enum([
    exports.LEAD_STATUS.NEW,
    exports.LEAD_STATUS.CONTACTED,
    exports.LEAD_STATUS.FOLLOW_UP,
    exports.LEAD_STATUS.CONVERTED,
]);
exports.updateLeadSchema = zod_1.z.object({
    sessionId: zod_1.z.string().min(1),
    createdAt: zod_1.z.string().min(1),
    leadStatus: exports.leadStatusSchema.optional(),
    adminNotes: zod_1.z.string().max(2000).optional(),
    assignedTo: zod_1.z.string().max(120).optional(),
});
