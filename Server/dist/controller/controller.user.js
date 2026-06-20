"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const userController = {
    async getUser(req, res) {
        try {
            const user = await user_1.User.findById(req.userId);
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
        }
        catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            });
        }
    },
    async addAddress(req, res) {
        try {
            const { house, street, city, state, postalCode, country, isDefault } = req.body;
            if (isDefault) {
                await user_1.User.findByIdAndUpdate(req.userId, {
                    $set: { "addresses.$[].isDefault": false }
                });
            }
            const user = await user_1.User.findByIdAndUpdate(req.userId, {
                $push: {
                    addresses: {
                        house,
                        street,
                        city,
                        state,
                        postalCode,
                        country,
                        isDefault: isDefault || false,
                    },
                },
            }, { new: true });
            res.status(200).json({
                type: "success",
                message: "Address added successfully",
                addresses: user?.addresses,
            });
        }
        catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong",
                err,
            });
        }
    },
    async updateUser(req, res) {
        try {
            const updatedUser = await user_1.User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json({
                type: "success",
                message: "User updated successfully",
                updatedUser
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
    async deleteUser(req, res) {
        try {
            await user_1.User.findByIdAndDelete(req.params.id);
            res.status(200).json({
                type: "success",
                message: "User has been deleted successfully"
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
exports.default = userController;
//# sourceMappingURL=controller.user.js.map