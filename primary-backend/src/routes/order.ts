import { Router } from "express";
import { prismaClient } from "../db/db";

const router = Router();

router.get("/getorders/:id",async(req,res)=>{
    try {
        const orderId = req.params.id ;
        const {userId} = req.body;
        if (!orderId ||!userId) {
            return res.status(403).json({message:"Invalid Inputs!"})
        }
        const order = await prismaClient.order.findFirst({
            where:{
                id:orderId,
                userId:userId
            }
        })
        if (!order) return res.status(402).json({message:[]})
        res.json({order});
        } catch (error) {
            console.error(error);
            res.status(411).json({message:"Something went wrong!!"})   
        }
});

router.post("/place-order/:id",async(req,res)=>{
    try {
        const productId = req.params.id ;
        const {userId} = req.body;
        if (!productId ||!userId) {
            return res.status(403).json({message:"Invalid Inputs!"})
        }
        const order = await prismaClient.order.create({
            data:{
                userId:userId,
                productId:productId,
                paymentMethord:"CASHONDELIVERY",
                orderStatus:"PACKED"
            }
        })
        if (!order) return res.status(402).json({message:"Order failed"})
        res.json({message:"Order Placed Successfully!!"});
        } catch (error) {
            console.error(error);
            res.status(411).json({message:"Something went wrong!!"})   
        }
});

export const orderRouter = router;