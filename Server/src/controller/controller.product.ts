import { Product } from "../models/product";
import { Request, Response } from "express";

interface AuthRequest extends Request {
    userId?: string;
}

const ProductController = {

    async getProduct(req: Request, res: Response) {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({
                    type: "error",
                    message: "Product doesn't exists"
                })
            }
            res.status(200).json({ type: "success", product })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },
    async getProducts(req: Request, res: Response) {
        const qNew = req.query.new;
        const qCategory = req.query.category as string;
        const qDiscounted = req.query.discounted;
        try {
            let products;
            if (qNew) {
                products = await Product.find().sort({ createdAt: -1 }).limit(5);
            } else if (qCategory) {
                products = await Product.find({
                    category: {
                        $in: [qCategory]
                    }
                })
            } else if (qDiscounted) {
                products = await Product.find({
                    discount: { $gt: 0 }
                })
            } else {
                products = await Product.find();
            }
            res.status(200).json({ type: "success", products });
        } catch (err) {
            res.status(500).json({
                type: "error",
                messsage: "Something went wrong please try again"
            })
        }
    },
    async createProduct(req: AuthRequest, res: Response) {
        try {
            const authReq = req as AuthRequest;

            const newProduct = new Product({
                ...req.body,
                userId: authReq.userId
            });

            const savedProduct = await newProduct.save();

            res.status(201).json({
                type: "success",
                savedProduct
            });
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            });
        }
    },
    async updateProduct(req: Request, res: Response) {
        const existing = await Product.findById(req.params.id);
        if (!existing) {
            return res.status(400).json({
                type: "error",
                message: "Product doesn't exists"
            })
        } else {
            try {
                const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
                res.status(200).json({
                    type: "success",
                    message: "Product updated successfully",
                    updatedProduct
                })
            } catch (err) {
                res.status(500).json({
                    type: "error",
                    message: "Something went wrong please try again",
                    err
                })
            }
        }
    },
    async deleteProduct(req: Request, res: Response) {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).json({
                type: "error",
                message: "Product doesn't exists"
            })
        }
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json({
                type: "success",
                message: "Product deleted successfully"
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },
    async addReview(req: AuthRequest, res: Response) {
        try {
            const { rating, comment, userName } = req.body;

            if (!rating || rating < 1 || rating > 5) {
                return res.status(400).json({
                    type: "error",
                    message: "Rating must be between 1 and 5"
                })
            }

            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({
                    type: "error",
                    message: "Product doesn't exists"
                })
            }

            const review = {
                userId: req.userId,
                userName,
                rating,
                comment,
                createdAt: new Date()
            };

            product.reviews.push(review as any);

            const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
            product.rating = totalRating / product.reviews.length;

            await product.save();

            res.status(201).json({
                type: "success",
                message: "Review added successfully",
                product
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    }
}

export default ProductController;