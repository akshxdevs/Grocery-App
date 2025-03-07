"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.updateAdminSchema = exports.adminSigninSchema = exports.adminSignupSchema = exports.productSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(10),
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(5).max(15),
});
exports.signinSchema = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(5).max(15),
});
exports.productSchema = zod_1.z.object({
    productName: zod_1.z.string().min(1).max(20),
    productCategory: zod_1.z.string(),
    productPrice: zod_1.z.number().min(1).max(100000),
    productImg: zod_1.z.string(),
});
exports.adminSignupSchema = zod_1.z.object({
    companyName: zod_1.z.string().min(1).max(30),
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(5).max(15),
});
exports.adminSigninSchema = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(5).max(15),
});
exports.updateAdminSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(10).optional(),
    username: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(5).max(15).optional(),
    mobileNo: zod_1.z.string().min(10).max(10).optional(),
    address: zod_1.z.string().optional()
});
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(10).optional(),
    username: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(5).max(15).optional(),
    mobileNo: zod_1.z.string().min(10).max(10).optional(),
    address: zod_1.z.string().optional()
});
