import express from "express";
import { PORT } from "./config";
import cors from "cors"
import { UserRouter } from "./routes/user";
import { productRouter } from "./routes/product";
import { AdminRouter } from "./routes/admin";
import { orderRouter } from "./routes/order";
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/user",UserRouter);
app.use("/api/v1/product",productRouter);
app.use("/api/v1/admin",AdminRouter);``
app.use("/api/v1/order",orderRouter);

app.listen(PORT||3000,()=>{
    console.log(`server running on port ${PORT || "3000"}`);
})