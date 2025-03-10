import { Router } from "express";
import { prismaClient } from "../db/db";
import { UserAuthenticate } from "../middleware";

const router = Router();

router.get("/getorders/:id",UserAuthenticate,async(req,res)=>{
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

router.post("/place-order/:id",UserAuthenticate,async(req,res)=>{
    try {
        const userId = req.params.id ;
        const productId = req.body
        if (!userId || !productId) {
            return res.status(403).json({message:"Invalid Inputs!"})
        }
        const order = await prismaClient.order.create({
            data:{
                userId:userId,
                products:{
                    connect:productId.map((id:string)=>({id}))
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