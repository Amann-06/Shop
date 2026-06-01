import { User } from "../models/user";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import config from "../config/config";

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:config.emailUser,
        pass:config.emailPass
    }
})

function generateOTP() {
  return Math.floor(Math.random() * 900000) + 100000;
}

const AuthController = {

    async signup(req : Request , res : Response){

        const existingUser = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        });

        if (existingUser) {
            return res.status(409).json({
                type: "error",
                message: "Username or email already exists"
            });
        }

        const newUser = new User({
            username : req.body.username,
            email:req.body.email,
            password: bcrypt.hashSync(req.body.password,10)
        })

        try{
            const user = await newUser.save();
            const { password, ...data } = user.toObject();
            const accessToken = jwt.sign(
                { id: user._id },
                config.jwtSecret!,
                { expiresIn: "7d" }
            );

            res.status(201).json({
            type: "success",
            message: "Account created",
            accessToken
            });
        }catch(err){
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }

    },

    async login(req:Request , res : Response){
        try{
            const identifier = req.body.username;
            const isEmail = identifier.includes('@');
            let user;
            if(isEmail){
                user = await User.findOne({email:identifier});
            }else{
                user = await User.findOne({username:identifier});
            }
            if(!user){
                return res.status(404).json({
                    type:"error",
                    message:"User not found"
                })
            }
            if(!bcrypt.compareSync(req.body.password, user.password)){
                return res.status(400).json({
                    type:"error",
                    message:"Password incorrect"
                })
            }

            const accessToken = jwt.sign({id:user._id},config.jwtSecret!,{expiresIn:"7d"});
            const {password,...data} = user.toObject();
            res.status(200).json({
                type:"success",
                message:"Login successfully",
                data,
                accessToken
            })
        }catch(err){
            res.status(500).json({
                type:"error",
                message:"Something went wrong please try again",
                err
            })
        }
    },

    async sendVerificationCode(req: Request, res: Response) {
        try {
            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                return res.status(404).json({
                    type: "error",
                    message: "User doesn't exist"
                });
            }
            const otp = generateOTP();
            user.resetOtp = otp.toString();
            user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
            await user.save();
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: "Verification code for password reset",
                html: `
                    <div style="font-family: Arial, sans-serif">
                        <h2>Password Reset Request</h2>
                        <p>Your verification code is:</p>
                        <h1>${otp}</h1>
                        <p>This verification code is valid for 10 minutes.</p>
                        <p>If you didn't request a password reset, ignore this email.</p>
                    </div>
                `
            });

            return res.status(200).json({
                type: "success",
                message: "OTP sent successfully"
            });

        } catch (err) {
            return res.status(500).json({
                type: "error",
                message: "Something went wrong",
                err
            });
        }
    },

    async verifyVerificationCode(req:Request , res:Response){
        try{
            const user = await User.findOne({
                email: req.body.email
            });

            if (!user) {
                return res.status(404).json({
                    type: "error",
                    message: "User not found"
                });
            }
            if(user.resetOtp !== req.body.otp){
                return res.status(400).json({
                    type:"error",
                    message:"Verification code is incorrect"
                })
            }
            if(!user.resetOtpExpires || Date.now() > user.resetOtpExpires.getTime()){
                return res.status(400).json({
                    type:"error",
                    message:"Verification code is expired"
                })                
            }
            res.status(200).json({
                type:"success",
                message:"Password changed successfully"
            })
        }catch(err){
            res.status(500).json({
                type:"error",
                message:"Something went wrong please try again",
                err
            })
        }
    },

    async forgetPassword(req:Request,res:Response){
        try{
            const user = await User.findOne({email:req.body.email});
            if(!user){
                return res.status(400).json({
                    type:"error",
                    message:"User doesn't exists"
                })
            }
            user.password = await bcrypt.hashSync(req.body.newPassword,10);
            res.status(200).json({
                type:"success",
                message:"Password changed successfully"
            })
        }catch(err){
            res.status(500).json({
                type:"error",
                message:"Something went wrong please try again",
                err
            }) 
        }
    },

    async changePassword(req: Request, res: Response) {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({
                type:"error",
                message:"User doesn't exists"
            })
        }
        const isMatch = await bcrypt.compare(
            req.body.currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                type: "error",
                message: "Current password is incorrect"
            });
        }

        user.password = await bcrypt.hashSync(
            req.body.newPassword,
            10
        );

        await user.save();

        res.status(200).json({
            type: "success",
            message: "Password changed successfully"
        });
    }

}

export default AuthController;