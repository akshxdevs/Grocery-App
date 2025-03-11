import { Router } from "express";
import { prismaClient } from "../db/db";
import { UserAuthenticate } from "../middleware";

const router = Router();

router.get("/getorders/:id",UserAuthenticate,async(req,res)=>{
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(403).json({message:"Invalid Inputs!"})
        }
        const getAllOrders = await prismaClient.order.findMany({
            where:{
                userId:userId,
            },include:{
                products:true
            }
        })
        if (!getAllOrders) return res.status(402).json({message:[]})
        res.json({getAllOrders});
        } catch (error) {
            console.error(error);
            res.status(411).json({message:"Something went wrong!!"})   
        }
});

router.post("/place-order/:id",UserAuthenticate,async(req,res)=>{
    try {
        const userId = req.params.id ;
        const productId = req.body.productId;
        const totalPrice = req.body.totalPrice;
        const productIds = Array.isArray(productId) ? productId : [productId]
        if (!userId || !productId ||!totalPrice) {
            return res.status(403).json({message:"Invalid Inputs!"})
        }
        const order = await prismaClient.order.create({
            data:{
                userId:userId,
                totalPrice:totalPrice,
                products:{
                    connect:productIds.map((id:string)=>({id}))
                },
                paymentMethord:"ONLINEPAYMENT",
                orderStatus:"PACKED"
            },
            include:{
                products:true
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