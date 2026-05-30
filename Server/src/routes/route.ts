import { Router, Request,Response,NextFunction } from "express";
const router = Router();

router.get('/',(req:Request,res:Response)=>{
    res.send("Hello from server :>");
})

router.get("/login",(req:Request,res:Response)=>{
    res.send("Login Page");
})

export default router;