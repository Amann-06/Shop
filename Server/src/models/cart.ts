import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICart extends Document {
    userId: string;
    products: {
        product: Types.ObjectId;
        quantity: number;
    }[];
}

const CartSchema = new Schema<ICart>({
    userId: {
        type: String,
        required: true,
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        },
    ],
});

export const Cart = mongoose.model<ICart>("Cart",CartSchema);