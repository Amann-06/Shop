import mongoose , { Schema , Document , Types} from "mongoose";

export interface IProduct extends Document {
    userId: Types.ObjectId;
    name:string;
    price:number;
    image:string;
    description:string;
    category:string[];
    tags:string[];
    rating:number;
    quantity:number;
    createdAt:Date;
}

const productSchema : Schema<IProduct> = new Schema({
    userId: {
            type:Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
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
    quantity: {
      type: Number,
      default: 0,
      min: 0
    },
    rating:{
        type:Number
    },
    tags:{
        type:[String],required:true
    },
    createdAt:{
        type:Date,default:new Date()
    }
})

export const Product = mongoose.model("Product",productSchema);