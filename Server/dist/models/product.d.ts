import mongoose, { Document, Types } from "mongoose";
export interface IProduct extends Document {
    userId: Types.ObjectId;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string[];
    tags: string[];
    rating: number;
    quantity: number;
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
    description?: mongoose.SchemaDefinitionProperty<string, IProduct, mongoose.Document<unknown, {}, IProduct, {
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
    quantity?: mongoose.SchemaDefinitionProperty<number, IProduct, mongoose.Document<unknown, {}, IProduct, {
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
    price?: mongoose.SchemaDefinitionProperty<number, IProduct, mongoose.Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    image?: mongoose.SchemaDefinitionProperty<string, IProduct, mongoose.Document<unknown, {}, IProduct, {
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
    rating?: mongoose.SchemaDefinitionProperty<number, IProduct, mongoose.Document<unknown, {}, IProduct, {
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