"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const ProductController = {
    async getProduct(req, res) {
        try {
            const product = await product_1.Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({
                    type: "error",
                    message: "Product doesn't exists"
                });
            }
            res.status(200).json({ type: "success", product });
        }
        catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            });
        }
    },
    async getProducts(req, res) {
        const qNew = req.query.new;
        const qCategory = req.query.category;
        const qDiscounted = req.query.discounted;
        const qSearch = req.query.search;
        try {
            let products;
            if (qNew) {
                products = await product_1.Product.find().sort({ createdAt: -1 }).limit(5);
            }
            else if (qSearch) {
                products = await product_1.Product.find({
                    $or: [
                        { name: { $regex: qSearch, $options: "i" } },
                        { category: { $in: [qSearch] } },
                        { tags: { $in: [qSearch] } },
                    ]
                });
            }
            else if (qCategory) {
                products = await product_1.Product.find({ category: { $in: [qCategory] } });
            }
            else if (qDiscounted) {
                products = await product_1.Product.find({ discount: { $gt: 0 } });
            }
            else {
                products = await product_1.Product.find();
            }
            res.status(200).json({ type: "success", products });
        }
        catch (err) {
            res.status(500).json({ type: "error", message: "Something went wrong" });
        }
    },
    async createProduct(req, res) {
        try {
            const authReq = req;
            const newProduct = new product_1.Product({
                ...req.body,
                userId: authReq.userId
            });
            const savedProduct = await newProduct.save();
            res.status(201).json({
                type: "success",
                savedProduct
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
    async updateProduct(req, res) {
        const existing = await product_1.Product.findById(req.params.id);
        if (!existing) {
            return res.status(400).json({
                type: "error",
                message: "Product doesn't exists"
            });
        }
        else {
            try {
                const updatedProduct = await product_1.Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
                res.status(200).json({
                    type: "success",
                    message: "Product updated successfully",
                    updatedProduct
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
    },
    async deleteProduct(req, res) {
        const product = await product_1.Product.findById(req.params.id);
        if (!product) {
            return res.status(400).json({
                type: "error",
                message: "Product doesn't exists"
            });
        }
        try {
            await product_1.Product.findByIdAndDelete(req.params.id);
            res.status(200).json({
                type: "success",
                message: "Product deleted successfully"
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
    async addReview(req, res) {
        try {
            const { rating, comment, userName } = req.body;
            if (!rating || rating < 1 || rating > 5) {
                return res.status(400).json({
                    type: "error",
                    message: "Rating must be between 1 and 5"
                });
            }
            const product = await product_1.Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({
                    type: "error",
                    message: "Product doesn't exists"
                });
            }
            const review = {
                userId: req.userId,
                userName,
                rating,
                comment,
                createdAt: new Date()
            };
            product.reviews.push(review);
            const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
            product.rating = totalRating / product.reviews.length;
            await product.save();
            res.status(201).json({
                type: "success",
                message: "Review added successfully",
                product
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
exports.default = ProductController;
//# sourceMappingURL=controller.product.js.map