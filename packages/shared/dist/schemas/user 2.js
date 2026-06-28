"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../constants");
exports.userProfileSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    email: zod_1.z.string().email(),
    name: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    role: zod_1.z.enum([constants_1.USER_ROLES.CUSTOMER, constants_1.USER_ROLES.ADMIN]).default(constants_1.USER_ROLES.CUSTOMER),
});
