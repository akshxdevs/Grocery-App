import { Router } from "express";
import jwt from "jsonwebtoken";
import { signinSchema, signupSchema, updateUserSchema } from "../types";
import { prismaClient } from "../db/db";
import bcrypt from "bcrypt"
import { JWT_SECRET } from "../config";
import { UserAuthenticate } from "../middleware";
import Redis from "ioredis";

const router = Router();
const redis = new Redis({
    host:"localhost",
    port:6379
});
const OTP_LIMIT = 3;
const OTP_EXPIRY = 100;

router.post("/signup",async(req,res)=>{
    try {
        const parsedBody = signupSchema.safeParse(req.body);
        if (!parsedBody.success) {
            console.log(parsedBody.error?.errors);
            return res.status(403).json({message:"Invalid inputs!"})
            
        }
        const {name,username,password}  = parsedBody.data;
        const existingUser = await prismaClient.user.findFirst({
            where:{
                username:username
            }
        })
        if (existingUser) {
            return res.status(402).json({
                message:"User Exist!"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await prismaClient.user.create({
            data:{
                username:username,
                password:hashedPassword,
                name:name
            }
        })
        res.json({
            message:"User Created Successfully!",
            user:user
        })
    } catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
})

router.post("/signin",async(req,res)=>{
    try {
        const parsedBody = signinSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(403).json({message:"Invalid inputs!"})
        }
        const {username,password}  = parsedBody.data;
        const user = await prismaClient.user.findFirst({
            where:{
                username,
            }
        })
        if (!user) {
            return res.status(402).json({
                message:"User Not Exist / Signup!"
            })
        }
        const comparePassword = await bcrypt.compare(password,user.password)
        if (!comparePassword) {
            return res.status(403).json({message:"Password Mismatch!"})
        }
        const token = jwt.sign({
            id:user.id
        },JWT_SECRET as string)
        res.json({
            message:"User Login Successfully!",
            token:token,
            user:user
        })
    } catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
})

router.post("/login/phone",async(req,res)=>{
    try {
        const {mobileNo} = req.body;
        if (!mobileNo) {
            return res.status(403).send({message:"Invalid inputs!"})
        }
        const user = await prismaClient.user.findFirst({
            where:{
                mobileNo:mobileNo,
            }
        })        
        if (!user) {
            return res.status(402).send({
                message:"Mobile Number Not Exist / Signup!"
            })
        }
        const generateOtp = String(Math.floor(100000+Math.random()*900000))

        const otpKey = `otp:${String(mobileNo)}`;

        const otpRequestCounts = await redis.get(`otp_count:${mobileNo}`);
        if (otpRequestCounts && Number(otpRequestCounts) >= OTP_LIMIT) {
            res.status(429).json({message:"Too many otp requests!"})
        }
        await redis.setex(otpKey,OTP_EXPIRY,generateOtp);
        await redis.incr(`otp_count:${mobileNo}`);
        await redis.expire(`otp_count:${mobileNo}`,OTP_EXPIRY);
        
        res.json({
            message:"Otp Generated Successfully!",
            mobileNo:mobileNo,
            otp:generateOtp
        })
    } catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
})

router.post("/verify-otp",async(req,res)=>{
    try {
        const {mobileNo,otp} = req.body;
        if (!mobileNo || !otp) {
            return res.status(403).json({message:"Invalid inputs!"})
        }
        const storedOtp = await redis.get(`otp:${mobileNo}`);
        if (!storedOtp || storedOtp !== otp) {
            return res.status(401).json({ message: "Invalid or expired OTP!" });
          }
        const user = await prismaClient.user.findFirst({ where: { mobileNo } });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
          }
        const token = jwt.sign({
            id:user.id
        },JWT_SECRET as string,{expiresIn:'7d'}); 
        await redis.del(`otp:${mobileNo}`);
        await redis.del(`otp_count:${mobileNo}`);
        res.json({
            message:"User Login Successfully!",
            token:token,
            user:user
        })
    } catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
})

router.post("/update/:id",UserAuthenticate,async(req,res)=>{
    try {
        const userId = req.params.id
        const checkuser = await prismaClient.user.findFirst({
            where:{
                id:userId
            }
        })
        if (!checkuser) return res.status(403).json({message:"User Not Found!"})
        const parsedBody = updateUserSchema.safeParse(req.body);
        if (!parsedBody.success) {
            console.log(parsedBody.error?.errors);
            return res.status(403).json({message:"Invalid inputs!"})
            
        }
        const {name,username,password,address,mobileNo}  = parsedBody.data;
        const updateData:any = {}

        if (name) updateData.name = name;
        if (username) updateData.username = username;
        if (password){
        const hashedPassword = await bcrypt.hash(password,10);
        if (password) updateData.password = hashedPassword;
        } updateData.username = username;
        if (address) updateData.address = address;
        if (mobileNo) updateData.mobileNo = mobileNo;
        console.log(updateData);
        
        const updateUser = await prismaClient.user.update({
            where:{
                id:userId
            },
            data:updateData
        })
        res.json({
            message:"User Updated Successfully!",
            updateDetails:updateUser
        })
    } catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
})

export const UserRouter = router;