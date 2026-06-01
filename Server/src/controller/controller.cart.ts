import { Cart } from "../models/cart";
import { Request , Response } from "express";

const CartController = {

    async getCart( req: Request , res: Response ){
        try{
            const cart = await Cart.findById({ userId: req.params.userId});
            if(!cart){
                return res.status(404).json({
                    type: "error",
                    message: "User doesn't exists"
                })
            }else{
                res.status(200).json({
                    type:"success",
                    cart
                })
            }
        }catch(err){
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },

    async createCart( req: Request , res: Response ){
        try{
            const newCart = new Cart(req.body);
            const savedCart = await newCart.save();
            res.status(200).json({
                type:"success",
                message: "Product added successfully",
                savedCart
            })
        }catch(err){
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },

    async updateCart( req: Request , res: Response ){
        try{
            const cart = await Cart.findById(req.params.id);
            if(!cart){
                return res.status(404).json({
                    type: "error",
                    message: "User doesn't exists"
                })
            }
            const updatedCart = await Cart.findByIdAndUpdate(req.params.id ,{$set : req.body},{new : true});
            res.status(200).json({
                type:"success",
                message:"Cart updated successfully",
                updatedCart
            })
        }catch(err){
            res.status(404).json({
                type: "error",
                message: "User doesn't exists"
            })
        }
    },

    async deleteCart( req: Request , res: Response ){
        try{
            const cart = await Cart.findById(req.params.id);
            if(!cart){
                return res.status(404).json({
                    type: "error",
                    message: "User doesn't exists"
                })
            }
            await Cart.findByIdAndDelete(req.params.id);
            res.status(200).json({
                type:"success",
                message:"Cart deleted successfully"
            })
        }catch(err){
            res.status(404).json({
                type: "error",
                message: "User doesn't exists"
            })
        }

    }
}

export default CartController;