import mongoose, { Document, Types } from "mongoose";
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
export declare const Product: mongoose.Model<IProduct, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, IProduct, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<IProduct, mongoose.Model<IProduct, any, any, any, any, any, IProduct>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IProduct, mongoose.Document<unknown, {}, IProduct, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: mongoose.SchemaDefinitionProperty<Types.ObjectId, IProduct, mongoose.Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    userId?: mongoose.SchemaDefinitionProperty<Types.ObjectId, IProduct, mongoose.Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    name?: mongoose.SchemaDefinitionProperty<string, IProduct, mongoose.Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    price?: mongoose.SchemaDefinitionProperty<number, IProduct, mongoose.Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    discount?: mongoose.SchemaDefinitionProperty<number, IProduct, mongoose.Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    images?: mongoose.SchemaDefinitionProperty<string[], IProduct, mongoose.Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    description?: mongoose.SchemaDefinitionProperty<string, IProduct, mongoose.Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    category?: mongoose.SchemaDefinitionProperty<string[], IProduct, mongoose.Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    tags?: mongoose.SchemaDefinitionProperty<string[], IProduct, mongoose.Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    sizes?: mongoose.SchemaDefinitionProperty<string[], IProduct, mongoose.Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    quantity?: mongoose.SchemaDefinitionProperty<number, IProduct, mongoose.Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    rating?: mongoose.SchemaDefinitionProperty<number, IProduct, mongoose.Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    reviews?: mongoose.SchemaDefinitionProperty<IReview[], IProduct, mongoose.Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    shipping?: mongoose.SchemaDefinitionProperty<IShipping, IProduct, mongoose.Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    createdAt?: mongoose.SchemaDefinitionProperty<Date, IProduct, mongoose.Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, IProduct>, IProduct>;
//# sourceMappingURL=product.d.ts.map