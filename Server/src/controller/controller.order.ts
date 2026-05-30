import { Order } from "../models/order";
import { Request , Response } from "express";

const orderController = {

    async getOrder(req:Request,res:Response){
        try{
            const orders = await Order.findById({userId:req.params.id});
            if (!orders) {
                res.status(404).json({
                    type: "error",
                    message: "User doesn't exists"
                })
            } else {
                res.status(200).json({
                    type: "success",
                    orders
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
    
    async createOrder(req:Request,res:Response){
        const newOrder = new Order(req.body);
        try{
            const savedOrder = await newOrder.save();
            res.status(201).json({
                type:"success",
                message: "Order created successfully",
                savedOrder
            })
        }catch(err){
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })            
        }
    },

    async updateOrder(req:Request,res:Response){
        try {
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                { new: true }
            );
            res.status(200).json({
                type: "success",
                message: "Cart updated successfully",
                updatedOrder
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },

    async deleteOrder(req:Request,res:Response){
        try {
            await Order.findByIdAndDelete(req.params.id);
            res.status(200).json({
                type: "success",
                message: "Order has been deleted successfully"
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

export default orderController