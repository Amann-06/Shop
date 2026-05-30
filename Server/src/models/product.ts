import mongoose ,{ Schema , Document } from "mongoose";

export interface IProduct extends Document {
    name:string;
    price:number;
    image:string;
    description:string;
    category:string[];
    tags:string[];
    createdAt:Date;
}

const productSchema : Schema<IProduct> = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,required:true
    },
    image:{
        type:String,required:true
    },
    description:{
        type:String,required:true
    },
    category:{
        type:[String],required:true
    },
    tags:{
        type:[String],required:true
    },
    createdAt:{
        type:Date,default:new Date()
    }
})

export const Product = mongoose.model("Product",productSchema);