"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.USER_JWT = exports.ADMIN_JWT = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT;
exports.ADMIN_JWT = process.env.ADMIN_JWT;
exports.USER_JWT = process.env.USER_JWT;
exports.JWT_SECRET = process.env.JWT_SECRET;
