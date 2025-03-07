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
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
function user() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prismaClient.user.create({
            data: {
                name: "akash",
                username: "akash@gmail.com",
                password: "123random"
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prismaClient.product.create({
            data: {
                productName: "Cabbage",
                productCategory: "Fruits & Vegetables",
                productPrice: 30,
                stock: 50,
                companyId: "",
                productImg: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQrFltP2609tNGzyZUr1wC6mGQSxy2j9U8na8Qy37OjGqzKdN0sMzvEo06jbazjx-Y_o2sJ1lAkcJJfKOHQPNQDWp71jkA-n0oWwmBvfEtE&usqp=CAE",
                stockStatus: "INSTOCK"
            }
        });
    });
}
main();
user();
