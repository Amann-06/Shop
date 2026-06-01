"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = require("../models/cart");
const CartController = {
    async getCart(req, res) {
        try {
            const cart = await cart_1.Cart.findById({ userId: req.params.userId });
            if (!cart) {
                return res.status(404).json({
                    type: "error",
                    message: "User doesn't exists"
                });
            }
            else {
                res.status(200).json({
                    type: "success",
                    cart
                });
            }
        }
        catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            });
        }
    },
    async createCart(req, res) {
        try {
            const newCart = new cart_1.Cart(req.body);
            const savedCart = await newCart.save();
            res.status(200).json({
                type: "success",
                message: "Product added successfully",
                savedCart
            });
        }
        catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            });
        }
    },
    async updateCart(req, res) {
        try {
            const cart = await cart_1.Cart.findById(req.params.id);
            if (!cart) {
                return res.status(404).json({
                    type: "error",
                    message: "User doesn't exists"
                });
            }
            const updatedCart = await cart_1.Cart.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json({
                type: "success",
                message: "Cart updated successfully",
                updatedCart
            });
        }
        catch (err) {
            res.status(404).json({
                type: "error",
                message: "User doesn't exists"
            });
        }
    },
    async deleteCart(req, res) {
        try {
            const cart = await cart_1.Cart.findById(req.params.id);
            if (!cart) {
                return res.status(404).json({
                    type: "error",
                    message: "User doesn't exists"
                });
            }
            await cart_1.Cart.findByIdAndDelete(req.params.id);
            res.status(200).json({
                type: "success",
                message: "Cart deleted successfully"
            });
        }
        catch (err) {
            res.status(404).json({
                type: "error",
                message: "User doesn't exists"
            });
        }
    }
};
exports.default = CartController;
//# sourceMappingURL=controller.cart.js.map