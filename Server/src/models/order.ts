import mongoose , { Schema , Document , Types} from "mongoose";
export interface IAddress extends Document {
    house: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
}

const addressSchema: Schema<IAddress> = new Schema({
    house: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
});

export interface IOrder extends Document {
    userId: Types.ObjectId;
    products:{
        product: Types.ObjectId;
        quantity: number;
    }[];
    amount: number;
    address : IAddress;
    status: string;
    deliveredOn: Date;
    createdAt: Date;
}

const orderSchema = new Schema<IOrder>(
    {
        userId: {
            type:Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1
                }
            }
        ],

        amount: {
            type: Number,
            required: true
        },

        address: {
            type: addressSchema,
            required: true
        },

        status: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "pending"
        },

        deliveredOn: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

export const Order = mongoose.model<IOrder>("Order",orderSchema);