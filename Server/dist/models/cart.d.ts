import mongoose, { Document, Types } from "mongoose";
export interface ICart extends Document {
    userId: string;
    products: {
        product: Types.ObjectId;
        quantity: number;
    }[];
}
export declare const Cart: mongoose.Model<ICart, {}, {}, {}, mongoose.Document<unknown, {}, ICart, {}, mongoose.DefaultSchemaOptions> & ICart & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ICart>;
//# sourceMappingURL=cart.d.ts.map