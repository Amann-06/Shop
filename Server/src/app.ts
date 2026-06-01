import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from "cors";
import config from "./config//config";
import {productRouter , orderRouter , cartRouter , userRouter , authRouter} from './routes/route';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth",authRouter);
app.use("/api/order",orderRouter);
app.use("/api/cart",cartRouter);
app.use("/api/product",productRouter);
app.use("/api/user",userRouter);

mongoose.connect(config.mongoUri).then(()=>{
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

export default app