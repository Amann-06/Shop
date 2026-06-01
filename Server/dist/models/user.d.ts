import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    profilePhoto: string;
    createdAt: Date;
    addresses: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        isDefault: boolean;
    }[];
    resetOtp: string;
    resetOtpExpires: Date;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
//# sourceMappingURL=user.d.ts.map