"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const user_1 = require("./routes/user");
const product_1 = require("./routes/product");
const admin_1 = require("./routes/admin");
const order_1 = require("./routes/order");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/user", user_1.UserRouter);
app.use("/api/v1/product", product_1.productRouter);
app.use("/api/v1/admin", admin_1.AdminRouter);
app.use("/api/v1/order", order_1.orderRouter);
app.listen(config_1.PORT || 3000, () => {
    console.log(`server running on port ${config_1.PORT || "3000"}`);
});
