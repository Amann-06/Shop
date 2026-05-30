import app from "./app"
import { Request,Response } from "express";
const PORT = 3000;
app.listen(PORT , ()=>{
    console.log(`Server is running at PORT : ${PORT}`);
})