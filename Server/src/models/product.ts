import mongoose, { Schema, Document, Types } from "mongoose";

export interface IReview {
    userId: Types.ObjectId;
    userName: string;
    rating: number;
    comment: string;
    createdAt: Date;
}

export interface IShipping {
    packageType: string;    
    weight: number;            
    estimatedDeliveryDays: number;
    shippingCost: number;
    freeShippingEligible: boolean;
}

export interface IProduct extends Document {
    userId: Types.ObjectId;
    name: string;
    price: number;
    discount: number;
    images: string[];
    description: string;
    category: string[];
    tags: string[];
    sizes: string[];
    quantity: number;
    rating: number;
    reviews: IReview[];
    shipping: IShipping;
    createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const shippingSchema = new Schema<IShipping>({
    packageType: {
        type: String,
        enum: ["Standard", "Express", "Fragile", "Bulk"],
        default: "Standard"
    },
    weight: {
        type: Number,
        default: 0
    },
    estimatedDeliveryDays: {
        type: Number,
        default: 5
    },
    shippingCost: {
        type: Number,
        default: 0
    },
    freeShippingEligible: {
        type: Boolean,
        default: false
    }
});

const productSchema: Schema<IProduct> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    images: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: [String],
        required: true
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        required: true
    },
    sizes: {
        type: [String],
        default: []
    },
    reviews: {
        type: [reviewSchema],
        default: []
    },
    shipping: {
        type: shippingSchema,
        default: () => ({})
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Product = mongoose.model("Product", productSchema);