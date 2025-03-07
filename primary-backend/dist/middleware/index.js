"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthenticate = UserAuthenticate;
exports.AdminAuthenticate = AdminAuthenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function UserAuthenticate(req, res, next) {
    try {
        const token = req.headers["authorization"];
        if (!token)
            return res.status(404).json({ message: "Token not found!" });
        const payload = jsonwebtoken_1.default.verify(token, config_1.USER_JWT);
        if (!payload)
            return res.status(403).json({ message: "Invalid Token!" });
        req.id = payload.id;
        console.log(payload, req.id);
        next();
    }
    catch (error) {
        console.error(error);
        res.status(411).json({ message: "Something went wrong!!" });
    }
}
function AdminAuthenticate(req, res, next) {
    try {
        const token = req.headers["authorization"];
        if (!token)
            return res.status(404).json({ message: "Token not found!" });
        const payload = jsonwebtoken_1.default.verify(token, config_1.ADMIN_JWT);
        if (!payload)
            return res.status(403).json({ message: "Invalid Token!" });
        req.id = payload.id;
        console.log(payload, req.id);
        next();
    }
    catch (error) {
        console.error(error);
        res.status(411).json({ message: "Something went wrong!!" });
    }
}
