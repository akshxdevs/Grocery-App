import { Router } from "express";
import jwt from "jsonwebtoken"
import { adminSigninSchema, adminSignupSchema } from "../types";
import { prismaClient } from "../db/db";
import bcrypt from "bcrypt"
import { JWT_SECRET } from "../config";

const router = Router();

router.post("/signup",async(req,res)=>{
    try {
        const parsedBody = adminSignupSchema.safeParse(req.body);
        if (!parsedBody.success) {
            console.log(parsedBody.error?.errors);
            return res.status(403).json({message:"Invalid inputs!"})
            
        }
        const {companyName,username,password}  = parsedBody.data;
        const existingAdmin = await prismaClient.admin.findFirst({
            where:{
                username:username
            }
        })
        if (existingAdmin) {
            return res.status(402).json({
                message:"User Exist!"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const admin = await prismaClient.admin.create({
            data:{
                companyName:companyName,
                username:username,
                password:hashedPassword,
            }
        })
        res.json({
            message:"Admin Created Successfully!",
            user:admin
        })
    } catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
})

router.post("/signin",async(req,res)=>{
    try {
        const parsedBody = adminSigninSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(403).json({message:"Invalid inputs!"})
        }
        const {username,password}  = parsedBody.data;
        const admin = await prismaClient.admin.findFirst({
            where:{
                username,
            }
        })
        if (!admin) {
            return res.status(402).json({
                message:"Admin Not Exist / Signup!"
            })
        }
        const comparePassword = await bcrypt.compare(password,admin.password)
        if (!comparePassword) {
            return res.status(403).json({message:"Password Mismatch!"})
        }
        const token = jwt.sign({
            id:admin.id
        },JWT_SECRET as string)
        res.json({
            message:"Admin Login Successfully!",
            token:token,
            admin:admin})
    } catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
})



export const AdminRouter = router;