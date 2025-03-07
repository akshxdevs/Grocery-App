import { z } from "zod";

export const signupSchema = z.object({
    name:z.string().min(1).max(10),
    username:z.string().email(),
    password:z.string().min(5).max(15),
});

export const signinSchema = z.object({
    username:z.string().email(),
    password:z.string().min(5).max(15),
});

export const productSchema = z.object({
    productName:z.string().min(1).max(20),
    productCategory:z.string(),
    productPrice:z.number().min(1).max(100000),
    productImg:z.string(),
});

export const adminSignupSchema = z.object({
    companyName:z.string().min(1).max(30),
    username:z.string().email(),
    password:z.string().min(5).max(15),
});

export const adminSigninSchema = z.object({
    username:z.string().email(),
    password:z.string().min(5).max(15),
});

export const updateAdminSchema = z.object({
    name:z.string().min(1).max(10).optional(),
    username:z.string().email().optional(),
    password:z.string().min(5).max(15).optional(),
    mobileNo:z.string().min(10).max(10).optional(),
    address:z.string().optional()
});

export const updateUserSchema = z.object({
    name:z.string().min(1).max(10).optional(),
    username:z.string().email().optional(),
    password:z.string().min(5).max(15).optional(),
    mobileNo:z.string().min(10).max(10).optional(),
    address:z.string().optional()
});