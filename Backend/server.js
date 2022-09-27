import express from "express";
const app = express();

import dotenv from "dotenv";
import productRoutes from './routes/productRoutes.js'

import connectDB from "./config/db.js";

import {notFound,errorHandler} from './middlewares/errorMiddleware.js'

dotenv.config();

connectDB();

app.use('/api/products',productRoutes)

//  
app.use()

//  global error taken

app.use()
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`server is on at ${port}`);
});
