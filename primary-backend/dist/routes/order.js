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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.get("/getorders/:id", middleware_1.UserAuthenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(403).json({ message: "Invalid Inputs!" });
        }
        const getAllOrders = yield db_1.prismaClient.order.findMany({
            where: {
                userId: userId,
            }, include: {
                products: true
            }
        });
        if (!getAllOrders)
            return res.status(402).json({ message: [] });
        res.json({ getAllOrders });
    }
    catch (error) {
        console.error(error);
        res.status(411).json({ message: "Something went wrong!!" });
    }
}));
router.post("/place-order/:id", middleware_1.UserAuthenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const productId = req.body.productId;
        const totalPrice = req.body.totalPrice;
        const productIds = Array.isArray(productId) ? productId : [productId];
        if (!userId || !productId || !totalPrice) {
            return res.status(403).json({ message: "Invalid Inputs!" });
        }
        const order = yield db_1.prismaClient.order.create({
            data: {
                userId: userId,
                totalPrice: totalPrice,
                products: {
                    connect: productIds.map((id) => ({ id }))
                },
                paymentMethord: "ONLINEPAYMENT",
                orderStatus: "PACKED"
            },
            include: {
                products: true
            }
        });
        if (!order)
            return res.status(402).json({ message: "Order failed" });
        res.json({ message: "Order Placed Successfully!!" });
    }
    catch (error) {
        console.error(error);
        res.status(411).json({ message: "Something went wrong!!" });
    }
}));
exports.orderRouter = router;
