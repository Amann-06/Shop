import { Cart } from "../models/cart";
import { Request , Response } from "express";

interface AuthRequest extends Request{
    userId?:string;
}

const CartController = {

    async getCart(req: AuthRequest, res: Response) {
    try {
        if (!req.userId) {
        return res.status(401).json({
            type: "error",
            message: "Unauthorized"
        });
        }

        const cart = await Cart.findOne({
        userId: req.userId
        }).populate("products.product");

        if (!cart) {
        return res.status(404).json({
            type: "error",
            message: "Cart not found"
        });
        }

        return res.status(200).json({
        type: "success",
        cart
        });
    } catch (err) {
        return res.status(500).json({
        type: "error",
        err
        });
    }
    },

    async createCart(req: AuthRequest, res: Response) {
    try {
        const { productId, quantity } = req.body;
        if (!req.userId) {
            return res.status(401).json({
                type: "error",
                message: "Unauthorized"
            });
        }
        let cart = await Cart.findOne({
        userId: req.userId
        });

        if (!cart) {
        cart = new Cart({
            userId: req.userId,
            products: [
            {
                product:productId,
                quantity
            }
            ]
        });
        } else {
        const existingProduct = cart.products.find(
            (item) => item.product.toString() === productId
        );

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({
                product:productId,
                quantity
            });
        }
        }

        await cart.save();

        res.status(200).json({
        type: "success",
        message: "Product added to cart",
        cart
        });

    } catch (err) {
        res.status(500).json({
        type: "error",
        err
        });
    }
    },

    async updateCart( req: AuthRequest , res: Response ){
        try{
            const { productId, quantity } = req.body;
            if (!req.userId) {
                return res.status(401).json({
                    type: "error",
                    message: "Unauthorized"
                });
            }
            const cart = await Cart.findOne({userId:req.userId});
            if(!cart){
                return res.status(404).json({
                    type: "error",
                    message: "User doesn't exists"
                })
            }
            const item = cart.products.find(product => product.product.toString() === productId);
            if (!item) {
                return res.status(404).json({
                    type: "error",
                    message: "Product not found in cart"
                });
            }
            item.quantity = quantity;
            await cart.save();
            res.status(200).json({
                type:"success",
                message:"Cart updated successfully",
                cart
            })
        }catch(err){
            res.status(404).json({
                type: "error",
                message: "User doesn't exists"
            })
        }
    },

    async deleteCart( req: AuthRequest , res: Response ){
        try{
            const { productId } = req.body;
            if(!req.userId){
                return res.status(401).json({
                    type: "error",
                    message: "Unauthorized"
                });        
            }
            const cart = await Cart.findOne({userId:req.userId});
            if(!cart){
                return res.status(404).json({
                    type: "error",
                    message: "User doesn't exists"
                })
            }
            cart.products = cart.products.filter(item => item.product.toString() !== productId);
            await cart.save();
            res.status(200).json({
                type:"success",
                message:"Cart deleted successfully",
                cart
            })
        }catch(err){
            res.status(404).json({
                type: "error",
                message: "User doesn't exists"
            })
        }

    },
    async clearCart(req: AuthRequest, res: Response) {
        try {
            if (!req.userId) {
                return res.status(401).json({
                    type: "error",
                    message: "Unauthorized"
                });
            }

            const cart = await Cart.findOne({
                userId: req.userId
            });

            if (!cart) {
                return res.status(404).json({
                    type: "error",
                    message: "Cart not found"
                });
            }

            cart.products = [];

            await cart.save();

            return res.status(200).json({
                type: "success",
                message: "Cart cleared successfully"
            });
        } catch (err) {
            return res.status(500).json({
                type: "error",
                err
            });
        }
    }
}

export default CartController;