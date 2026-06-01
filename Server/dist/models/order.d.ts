import mongoose, { Document, Types } from "mongoose";
export interface IAddress extends Document {
    house: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
}
export interface IOrder extends Document {
    userId: Types.ObjectId;
    products: {
        product: Types.ObjectId;
        quantity: number;
    }[];
    amount: number;
    address: IAddress;
    status: string;
    deliveredOn: Date;
    createdAt: Date;
}
export declare const Order: mongoose.Model<IOrder, {}, {}, {}, mongoose.Document<unknown, {}, IOrder, {}, mongoose.DefaultSchemaOptions> & IOrder & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IOrder>;
//# sourceMappingURL=order.d.ts.map