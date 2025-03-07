"use client";
import { Router } from "express";
import { productSchema } from "../types";
import { prismaClient } from "../db/db";
import { AdminAuthenticate } from "../middleware";

const router = Router()


router.get("/getallproducts",async(req,res)=>{
    try {
        const getAllProducts = await prismaClient.product.findMany({
        
        });
        if (!getAllProducts) {
            return res.send(402).json({
                message:"No products"
            })
        }
        res.json({
            getAllProducts
        })
    } catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
})

router.post("/addproduct/:id",AdminAuthenticate,async(req,res)=>{
    try {
        const companyId = req.params.id;
        const parsedBody = productSchema.safeParse(req.body);
        if (!parsedBody.success) {
            console.log(parsedBody.error.errors);
            return res.status(403).json({
                message:"Invalid Inputs!"
            })
        }
        const { productName,productCategory,productPrice,productImg} = parsedBody.data
        const product = await prismaClient.product.create({
            data:{
                productName,
                productCategory,
                productPrice,
                productImg,
                stock:50,
                stockStatus:"INSTOCK",
                companyId:companyId
            }
        });
        if (product) {
            return res.json({
                message:"Product Added Successfully!",
                product:product
            })
        }
    } catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
})

export const productRouter = router;