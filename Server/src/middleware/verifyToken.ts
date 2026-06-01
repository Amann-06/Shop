import jwt from "jsonwebtoken";
import config from "../config/config";
import { NextFunction, Request, Response } from "express";

export interface AuthRequest extends Request {
    userId?:string;
}

const authenticationVerifier = (req:AuthRequest,res:Response,next:NextFunction) => {
    const authHeader = req.headers.token as string;
    if (!authHeader) {
        return res.status(401).json({
            type: "error",
            message: "No token provided"
        });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            type: "error",
            message: "Token missing"
        });
    }
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err || !decoded || typeof decoded === "string") {
            return res.status(401).json({
                type: "error",
                message: "Invalid token"
            });
        }
        req.userId = decoded.id;
        next();
    });
}

const accessLevelVerifier = (req:AuthRequest,res:Response,next:NextFunction) => {
    authenticationVerifier(req,res,()=>{
        if (req.userId !== req.params.id) {
            return res.status(403).json({
                type: "error",
                message: "You are not allowed to perform this task"
            });
        }
        next();
    })
}

export {
    accessLevelVerifier , authenticationVerifier
}