import { User } from "../models/user";
import { Request,Response } from "express";

const userController = {
    async getUser(req:Request , res:Response){
        try{
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    type: "error",
                    message: "User not found"
                });
            }
            const { password, ...data } = user.toObject();
            res.status(200).json({
                type: "success",
                data
            });
        }catch(err){
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },
    async updateUser(req:Request,res:Response){
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id ,
                {$set:req.body},
                {new:true}
            );
            res.status(200).json({
                type: "success",
                message: "User updated successfully",
                updatedUser
            })
        }catch(err){
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })            
        }
    },
    async deleteUser(req:Request,res:Response){
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json({
                type: "success",
                message: "User has been deleted successfully"
            });
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    }
}

export default userController;