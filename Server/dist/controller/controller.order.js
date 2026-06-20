"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const user_1 = require("../models/user");
const cart_1 = require("../models/cart");
const product_1 = require("../models/product");
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config/config"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: config_1.default.emailUser,
        pass: config_1.default.emailPass
    }
});
const orderController = {
    async getOrder(req, res) {
        try {
            if (!req.userId) {
                return res.status(401).json({ type: "error", message: "Unauthorized" });
            }
            const orders = await order_1.Order.find({ userId: req.userId });
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
        try {
            if (!req.userId) {
                return res.status(401).json({ type: "error", message: "Unauthorized" });
            }
            const user = await user_1.User.findById(req.userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const cart = await cart_1.Cart.findOne({ userId: req.userId }).populate("products.product");
            if (!cart || cart.products.length === 0) {
                return res.status(400).json({ type: "error", message: "Cart is empty" });
            }
            const amount = parseFloat(cart.products.reduce((total, item) => {
                const product = item.product;
                const price = product.price;
                const discount = product.discount ?? 0;
                const discountedPrice = price - (price * discount / 100);
                return total + discountedPrice * item.quantity;
            }, 0).toFixed(2));
            for (const item of cart.products) {
                const product = item.product;
                if (product.quantity < item.quantity) {
                    return res.status(400).json({
                        type: "error",
                        message: `${product.name} is out of stock or has insufficient quantity`
                    });
                }
            }
            const newOrder = new order_1.Order({
                userId: req.userId,
                products: cart.products,
                amount: amount,
                address: req.body.address,
            });
            const savedOrder = await newOrder.save();
            await cart_1.Cart.findOneAndUpdate({ userId: req.userId }, { $set: { products: [] } });
            await Promise.all(cart.products.map(async (item) => {
                const product = item.product;
                await product_1.Product.findByIdAndUpdate(product._id, {
                    $inc: { quantity: -item.quantity }
                });
            }));
            if (user?.email) {
                await transporter.sendMail({
                    from: config_1.default.emailUser,
                    to: user.email,
                    subject: "Order confirmed!",
                    html: `
                    <h2>Thanks for your order!</h2>
                    <p>Your order <b>#${savedOrder._id}</b> has been placed successfully.</p>
                    <p>Amount: ₹${amount}</p>
                    <p>Payment: Cash on delivery</p>
                    <p>We'll notify you once it's shipped.</p>
                `
                });
            }
            res.status(201).json({
                type: "success",
                message: "Order created successfully",
                savedOrder
            });
        }
        catch (err) {
            // console.error("createOrder error:", err);
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
    },
    async cancelOrder(req, res) {
        try {
            if (!req.userId) {
                return res.status(401).json({ type: "error", message: "Unauthorized" });
            }
            const order = await order_1.Order.findById(req.params.id).populate("products.product");
            if (!order) {
                return res.status(404).json({ type: "error", message: "Order not found" });
            }
            if (order.status === "cancelled") {
                return res.status(400).json({ type: "error", message: "Order is already cancelled" });
            }
            if (order.status === "delivered") {
                return res.status(400).json({ type: "error", message: "Delivered orders cannot be cancelled" });
            }
            // Restore product stock
            await Promise.all(order.products.map(async (item) => {
                const product = item.product;
                await product_1.Product.findByIdAndUpdate(product._id, {
                    $inc: { quantity: item.quantity }
                });
            }));
            order.status = "cancelled";
            await order.save();
            res.status(200).json({
                type: "success",
                message: "Order cancelled successfully",
                order
            });
        }
        catch (err) {
            res.status(500).json({ type: "error", message: "Something went wrong", err });
        }
    }
};
exports.default = orderController;
//# sourceMappingURL=controller.order.js.map