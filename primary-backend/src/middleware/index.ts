import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { ADMIN_JWT, USER_JWT } from "../config";

interface AuthRequest extends Request {
    id?:string
}

export function UserAuthenticate (req:AuthRequest,res:Response,next:NextFunction){
    try {
        const token = req.headers["authorization"] as unknown as string;
        if (!token) return res.status(404).json({message:"Token not found!"})
        const payload = jwt.verify(token,USER_JWT as string) as {id:string}
        if (!payload) return res.status(403).json({message:"Invalid Token!"}) 
        req.id = payload.id;
        console.log(payload,req.id);
        next();

    } catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
}

export function AdminAuthenticate (req:AuthRequest,res:Response,next:NextFunction){
    try {
        const token = req.headers["authorization"] as unknown as string;
        if (!token) return res.status(404).json({message:"Token not found!"})
        const payload = jwt.verify(token,ADMIN_JWT as string) as {id:string}
        if (!payload) return res.status(403).json({message:"Invalid Token!"}) 
        req.id = payload.id;
        console.log(payload,req.id);
        next();
    } catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
}