"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const orderController = {
    async getOrder(req, res) {
        try {
            const orders = await order_1.Order.findById({ userId: req.params.id });
            if (!orders) {
                res.status(404).json({
                    type: "error",
                    message: "User doesn't exists"
                });
            }
            else {
                res.status(200).json({
                    type: "success",
                    orders
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
    async createOrder(req, res) {
        const newOrder = new order_1.Order(req.body);
        try {
            const savedOrder = await newOrder.save();
            res.status(201).json({
                type: "success",
                message: "Order created successfully",
                savedOrder
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
    async updateOrder(req, res) {
        try {
            const updatedOrder = await order_1.Order.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json({
                type: "success",
                message: "Cart updated successfully",
                updatedOrder
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
    async deleteOrder(req, res) {
        try {
            await order_1.Order.findByIdAndDelete(req.params.id);
            res.status(200).json({
                type: "success",
                message: "Order has been deleted successfully"
            });
        }
        catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            });
        }
    }
};
exports.default = orderController;
//# sourceMappingURL=controller.order.js.map