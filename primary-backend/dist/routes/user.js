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
exports.UserRouter = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const types_1 = require("../types");
const db_1 = require("../db/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const middleware_1 = require("../middleware");
const ioredis_1 = __importDefault(require("ioredis"));
const router = (0, express_1.Router)();
const redis = new ioredis_1.default({
    host: "localhost",
    port: 6379
});
const OTP_LIMIT = 3;
const OTP_EXPIRY = 100;
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsedBody = types_1.signupSchema.safeParse(req.body);
        if (!parsedBody.success) {
            console.log((_a = parsedBody.error) === null || _a === void 0 ? void 0 : _a.errors);
            return res.status(403).json({ message: "Invalid inputs!" });
        }
        const { name, username, password } = parsedBody.data;
        const existingUser = yield db_1.prismaClient.user.findFirst({
            where: {
                username: username
            }
        });
        if (existingUser) {
            return res.status(402).json({
                message: "User Exist!"
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield db_1.prismaClient.user.create({
            data: {
                username: username,
                password: hashedPassword,
                name: name
            }
        });
        res.json({
            message: "User Created Successfully!",
            user: user
        });
    }
    catch (error) {
        console.error(error);
        res.status(411).json({ message: "Something went wrong!!" });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = types_1.signinSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(403).json({ message: "Invalid inputs!" });
        }
        const { username, password } = parsedBody.data;
        const user = yield db_1.prismaClient.user.findFirst({
            where: {
                username,
            }
        });
        if (!user) {
            return res.status(402).json({
                message: "User Not Exist / Signup!"
            });
        }
        const comparePassword = yield bcrypt_1.default.compare(password, user.password);
        if (!comparePassword) {
            return res.status(403).json({ message: "Password Mismatch!" });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id
        }, config_1.JWT_SECRET);
        res.json({
            message: "User Login Successfully!",
            token: token,
            user: user
        });
    }
    catch (error) {
        console.error(error);
        res.status(411).json({ message: "Something went wrong!!" });
    }
}));
router.post("/login/phone", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mobileNo } = req.body;
        if (!mobileNo) {
            return res.status(403).send({ message: "Invalid inputs!" });
        }
        const user = yield db_1.prismaClient.user.findFirst({
            where: {
                mobileNo: mobileNo,
            }
        });
        if (!user) {
            return res.status(402).send({
                message: "Mobile Number Not Exist / Signup!"
            });
        }
        const generateOtp = String(Math.floor(100000 + Math.random() * 900000));
        const otpKey = `otp:${String(mobileNo)}`;
        const otpRequestCounts = yield redis.get(`otp_count:${mobileNo}`);
        if (otpRequestCounts && Number(otpRequestCounts) >= OTP_LIMIT) {
            res.status(429).json({ message: "Too many otp requests!" });
        }
        yield redis.setex(otpKey, OTP_EXPIRY, generateOtp);
        yield redis.incr(`otp_count:${mobileNo}`);
        yield redis.expire(`otp_count:${mobileNo}`, OTP_EXPIRY);
        res.json({
            message: "Otp Generated Successfully!",
            mobileNo: mobileNo,
            otp: generateOtp
        });
    }
    catch (error) {
        console.error(error);
        res.status(411).json({ message: "Something went wrong!!" });
    }
}));
router.post("/verify-otp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mobileNo, otp } = req.body;
        if (!mobileNo || !otp) {
            return res.status(403).json({ message: "Invalid inputs!" });
        }
        const storedOtp = yield redis.get(`otp:${mobileNo}`);
        if (!storedOtp || storedOtp !== otp) {
            return res.status(401).json({ message: "Invalid or expired OTP!" });
        }
        const user = yield db_1.prismaClient.user.findFirst({ where: { mobileNo } });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id
        }, config_1.JWT_SECRET, { expiresIn: '7d' });
        yield redis.del(`otp:${mobileNo}`);
        yield redis.del(`otp_count:${mobileNo}`);
        res.json({
            message: "User Login Successfully!",
            token: token,
            user: user
        });
    }
    catch (error) {
        console.error(error);
        res.status(411).json({ message: "Something went wrong!!" });
    }
}));
router.post("/update/:id", middleware_1.UserAuthenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = req.params.id;
        const checkuser = yield db_1.prismaClient.user.findFirst({
            where: {
                id: userId
            }
        });
        if (!checkuser)
            return res.status(403).json({ message: "User Not Found!" });
        const parsedBody = types_1.updateUserSchema.safeParse(req.body);
        if (!parsedBody.success) {
            console.log((_a = parsedBody.error) === null || _a === void 0 ? void 0 : _a.errors);
            return res.status(403).json({ message: "Invalid inputs!" });
        }
        const { name, username, password, address, mobileNo } = parsedBody.data;
        const updateData = {};
        if (name)
            updateData.name = name;
        if (username)
            updateData.username = username;
        if (password) {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            if (password)
                updateData.password = hashedPassword;
        }
        updateData.username = username;
        if (address)
            updateData.address = address;
        if (mobileNo)
            updateData.mobileNo = mobileNo;
        console.log(updateData);
        const updateUser = yield db_1.prismaClient.user.update({
            where: {
                id: userId
            },
            data: updateData
        });
        res.json({
            message: "User Updated Successfully!",
            updateDetails: updateUser
        });
    }
    catch (error) {
        console.error(error);
        res.status(411).json({ message: "Something went wrong!!" });
    }
}));
exports.UserRouter = router;
