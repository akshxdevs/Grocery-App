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
exports.productRouter = void 0;
const express_1 = require("express");
const types_1 = require("../types");
const db_1 = require("../db/db");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.get("/getallproducts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllProducts = yield db_1.prismaClient.product.findMany({});
        if (!getAllProducts) {
            return res.send(402).json({
                message: "No products"
            });
        }
        res.json({
            getAllProducts
        });
    }
    catch (error) {
        console.error(error);
        res.status(411).json({ message: "Something went wrong!!" });
    }
}));
router.post("/addproduct/:id", middleware_1.AdminAuthenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyId = req.params.id;
        const parsedBody = types_1.productSchema.safeParse(req.body);
        if (!parsedBody.success) {
            console.log(parsedBody.error.errors);
            return res.status(403).json({
                message: "Invalid Inputs!"
            });
        }
        const { productName, productCategory, productPrice, productImg } = parsedBody.data;
        const product = yield db_1.prismaClient.product.create({
            data: {
                productName,
                productCategory,
                productPrice,
                productImg,
                stock: 50,
                stockStatus: "INSTOCK",
                companyId: companyId
            }
        });
        if (product) {
            return res.json({
                message: "Product Added Successfully!",
                product: product
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(411).json({ message: "Something went wrong!!" });
    }
}));
exports.productRouter = router;
