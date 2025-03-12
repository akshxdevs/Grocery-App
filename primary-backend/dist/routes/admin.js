"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const types_1 = require("../types");
const db_1 = require("../db/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsedBody = types_1.adminSignupSchema.safeParse(req.body);
        if (!parsedBody.success) {
            console.log((_a = parsedBody.error) === null || _a === void 0 ? void 0 : _a.errors);
            return res.status(403).json({ message: "Invalid inputs!" });
        }
        const { companyName, username, password } = parsedBody.data;
        const existingAdmin = yield db_1.prismaClient.admin.findFirst({
            where: {
                username: username
            }
        });
        if (existingAdmin) {
            return res.status(402).json({
                message: "User Exist!"
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const admin = yield db_1.prismaClient.admin.create({
            data: {
                companyName: companyName,
                username: username,
                password: hashedPassword,
            }
        });
        res.json({
            message: "Admin Created Successfully!",
            user: admin
        });
    }
    catch (error) {
        console.error(error);
        res.status(411).json({ message: "Something went wrong!!" });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = types_1.adminSigninSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(403).json({ message: "Invalid inputs!" });
        }
        const { username, password } = parsedBody.data;
        const admin = yield db_1.prismaClient.admin.findFirst({
            where: {
                username,
                password
            }
        });
        if (!admin) {
            return res.status(402).json({
                message: "Admin Not Exist / Signup!"
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: admin.id
        }, config_1.JWT_SECRET);
        res.json({
            message: "Admin Login Successfully!",
            token: token,
            admin: admin
        });
    }
    catch (error) {
        console.error(error);
        res.status(411).json({ message: "Something went wrong!!" });
    }
}));
exports.AdminRouter = router;
